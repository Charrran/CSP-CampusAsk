import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { createDoubtSchema } from "@/lib/validations";

// POST /api/doubts — create a new doubt (students only)
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return Response.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    if (session.role !== "STUDENT") {
      return Response.json(
        { success: false, error: "Only students can post doubts" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const parsed = createDoubtSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      return Response.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const { title, description, subjectId, chapterId, attachment } = parsed.data;

    // Verify subject and chapter exist and chapter belongs to subject
    const chapter = await db.chapter.findFirst({
      where: { id: chapterId, subjectId },
    });

    if (!chapter) {
      return Response.json(
        { success: false, error: "Invalid subject or chapter selection" },
        { status: 400 }
      );
    }

    const doubt = await db.doubt.create({
      data: {
        title,
        description: attachment ? `${description}\n\n📎 Attachment: ${attachment}` : description,
        userId: session.userId,
        subjectId,
        chapterId,
      },
      include: {
        subject: true,
        chapter: true,
      },
    });

    // Notify all faculty assigned to this subject
    try {
      const assignedFaculty = await db.user.findMany({
        where: {
          role: "FACULTY",
          subjects: { some: { id: subjectId } },
        },
        select: { id: true },
      });

      if (assignedFaculty.length > 0) {
        await db.notification.createMany({
          data: assignedFaculty.map((f) => ({
            userId: f.id,
            message: `New doubt posted in ${doubt.subject.name}: ${title}`,
            referenceId: doubt.id,
          })),
        });
      }
    } catch (notifErr) {
      // Don't fail the doubt creation if notification fails
      console.error("Error creating notifications:", notifErr);
    }

    return Response.json({ success: true, data: doubt }, { status: 201 });
  } catch (error) {
    console.error("Error creating doubt:", error);
    return Response.json(
      { success: false, error: "Failed to create doubt" },
      { status: 500 }
    );
  }
}

// GET /api/doubts — list doubts with filters and pagination
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return Response.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { searchParams } = request.nextUrl;
    const subjectId = searchParams.get("subjectId");
    const chapterId = searchParams.get("chapterId");
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const userId = searchParams.get("userId");
    const saved = searchParams.get("saved");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    // Exclude removed doubts for non-admin users
    if (session.role !== "ADMIN") {
      where.isRemoved = false;
    }

    if (subjectId) where.subjectId = subjectId;
    if (chapterId) where.chapterId = chapterId;
    if (status && ["OPEN", "ANSWERED", "RESOLVED"].includes(status)) {
      where.status = status;
    }
    if (userId) where.userId = userId;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }
    if (saved === "true") {
      where.savedBy = {
        some: { userId: session.userId },
      };
    }

    const [doubts, totalCount] = await Promise.all([
      db.doubt.findMany({
        where,
        include: {
          subject: true,
          chapter: true,
          user: { select: { id: true, name: true } },
          _count: { select: { answers: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.doubt.count({ where }),
    ]);

    return Response.json({
      success: true,
      data: {
        doubts,
        totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching doubts:", error);
    return Response.json(
      { success: false, error: "Failed to fetch doubts" },
      { status: 500 }
    );
  }
}

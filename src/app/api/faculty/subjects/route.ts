import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const updateSubjectsSchema = z.object({
  subjectIds: z.array(z.string()),
});

// GET /api/faculty/subjects — return faculty's assigned subjects + all subjects
export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return Response.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    if (session.role !== "FACULTY") {
      return Response.json(
        { success: false, error: "Faculty only" },
        { status: 403 }
      );
    }

    const [allSubjects, faculty] = await Promise.all([
      db.subject.findMany({
        include: { chapters: { orderBy: { name: "asc" } } },
        orderBy: { name: "asc" },
      }),
      db.user.findUnique({
        where: { id: session.userId },
        select: { subjects: { select: { id: true } } },
      }),
    ]);

    const assignedIds = faculty?.subjects.map((s) => s.id) ?? [];

    return Response.json({
      success: true,
      data: {
        allSubjects,
        assignedSubjectIds: assignedIds,
      },
    });
  } catch (error) {
    console.error("Error fetching faculty subjects:", error);
    return Response.json(
      { success: false, error: "Failed to fetch subjects" },
      { status: 500 }
    );
  }
}

// PUT /api/faculty/subjects — replace faculty's subject assignments
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return Response.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    if (session.role !== "FACULTY") {
      return Response.json(
        { success: false, error: "Faculty only" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const parsed = updateSubjectsSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      return Response.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const { subjectIds } = parsed.data;

    // Replace all subject assignments
    await db.user.update({
      where: { id: session.userId },
      data: {
        subjects: {
          set: subjectIds.map((id) => ({ id })),
        },
      },
    });

    return Response.json({ success: true, data: { assignedSubjectIds: subjectIds } });
  } catch (error) {
    console.error("Error updating faculty subjects:", error);
    return Response.json(
      { success: false, error: "Failed to update subjects" },
      { status: 500 }
    );
  }
}

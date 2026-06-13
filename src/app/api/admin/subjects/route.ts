import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const createSubjectSchema = z.object({
  name: z
    .string()
    .min(2, "Subject name must be at least 2 characters")
    .max(100, "Subject name must be less than 100 characters")
    .trim(),
});

// GET /api/admin/subjects — list all subjects with chapter and doubt counts
export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return Response.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      );
    }

    const subjects = await db.subject.findMany({
      include: {
        chapters: { orderBy: { name: "asc" } },
        _count: {
          select: {
            doubts: true,
            chapters: true,
            faculty: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });

    return Response.json({ success: true, data: subjects });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return Response.json(
      { success: false, error: "Failed to fetch subjects" },
      { status: 500 }
    );
  }
}

// POST /api/admin/subjects — create a new subject
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return Response.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const parsed = createSubjectSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      return Response.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    // Check for duplicate name
    const existing = await db.subject.findUnique({
      where: { name: parsed.data.name },
    });
    if (existing) {
      return Response.json(
        { success: false, error: "A subject with this name already exists" },
        { status: 409 }
      );
    }

    const subject = await db.subject.create({
      data: { name: parsed.data.name },
    });

    return Response.json({ success: true, data: subject }, { status: 201 });
  } catch (error) {
    console.error("Error creating subject:", error);
    return Response.json(
      { success: false, error: "Failed to create subject" },
      { status: 500 }
    );
  }
}

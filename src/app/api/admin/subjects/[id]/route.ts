import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const updateSubjectSchema = z.object({
  name: z
    .string()
    .min(2, "Subject name must be at least 2 characters")
    .max(100, "Subject name must be less than 100 characters")
    .trim(),
});

const createChapterSchema = z.object({
  name: z
    .string()
    .min(2, "Chapter name must be at least 2 characters")
    .max(100, "Chapter name must be less than 100 characters")
    .trim(),
});

// PATCH /api/admin/subjects/[id] — update subject name
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return Response.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      );
    }

    const { id } = await params;

    const body = await request.json();
    const parsed = updateSubjectSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      return Response.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const subject = await db.subject.findUnique({ where: { id } });
    if (!subject) {
      return Response.json(
        { success: false, error: "Subject not found" },
        { status: 404 }
      );
    }

    const updated = await db.subject.update({
      where: { id },
      data: { name: parsed.data.name },
    });

    return Response.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating subject:", error);
    return Response.json(
      { success: false, error: "Failed to update subject" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/subjects/[id] — delete subject (blocked if doubts reference it)
// Design decision: PREVENT deletion if doubts exist to avoid data loss.
// Admin must resolve/move doubts first before deleting a subject.
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return Response.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      );
    }

    const { id } = await params;

    const subject = await db.subject.findUnique({ where: { id } });
    if (!subject) {
      return Response.json(
        { success: false, error: "Subject not found" },
        { status: 404 }
      );
    }

    // Check if doubts reference this subject
    const doubtCount = await db.doubt.count({ where: { subjectId: id } });
    if (doubtCount > 0) {
      return Response.json(
        {
          success: false,
          error: `Cannot delete subject: ${doubtCount} doubt(s) reference it. Remove or reassign them first.`,
        },
        { status: 409 }
      );
    }

    // Cascade will handle chapters
    await db.subject.delete({ where: { id } });

    return Response.json({
      success: true,
      data: { message: "Subject deleted successfully" },
    });
  } catch (error) {
    console.error("Error deleting subject:", error);
    return Response.json(
      { success: false, error: "Failed to delete subject" },
      { status: 500 }
    );
  }
}

// POST /api/admin/subjects/[id]/chapters — add a chapter to a subject
// (Using POST on the subject detail route for convenience)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return Response.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      );
    }

    const { id: subjectId } = await params;

    const subject = await db.subject.findUnique({ where: { id: subjectId } });
    if (!subject) {
      return Response.json(
        { success: false, error: "Subject not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const parsed = createChapterSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      return Response.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const chapter = await db.chapter.create({
      data: {
        name: parsed.data.name,
        subjectId,
      },
    });

    return Response.json({ success: true, data: chapter }, { status: 201 });
  } catch (error) {
    console.error("Error creating chapter:", error);
    return Response.json(
      { success: false, error: "Failed to create chapter" },
      { status: 500 }
    );
  }
}

import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const updateChapterSchema = z.object({
  name: z
    .string()
    .min(2, "Chapter name must be at least 2 characters")
    .max(100, "Chapter name must be less than 100 characters")
    .trim(),
});

// PATCH /api/admin/chapters/[id] — update chapter name
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
    const parsed = updateChapterSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      return Response.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const chapter = await db.chapter.findUnique({ where: { id } });
    if (!chapter) {
      return Response.json(
        { success: false, error: "Chapter not found" },
        { status: 404 }
      );
    }

    const updated = await db.chapter.update({
      where: { id },
      data: { name: parsed.data.name },
    });

    return Response.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating chapter:", error);
    return Response.json(
      { success: false, error: "Failed to update chapter" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/chapters/[id] — delete chapter (blocked if doubts reference it)
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

    const chapter = await db.chapter.findUnique({ where: { id } });
    if (!chapter) {
      return Response.json(
        { success: false, error: "Chapter not found" },
        { status: 404 }
      );
    }

    const doubtCount = await db.doubt.count({ where: { chapterId: id } });
    if (doubtCount > 0) {
      return Response.json(
        {
          success: false,
          error: `Cannot delete chapter: ${doubtCount} doubt(s) reference it. Remove or reassign them first.`,
        },
        { status: 409 }
      );
    }

    await db.chapter.delete({ where: { id } });

    return Response.json({
      success: true,
      data: { message: "Chapter deleted successfully" },
    });
  } catch (error) {
    console.error("Error deleting chapter:", error);
    return Response.json(
      { success: false, error: "Failed to delete chapter" },
      { status: 500 }
    );
  }
}

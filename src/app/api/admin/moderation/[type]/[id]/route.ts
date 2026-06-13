import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const resolveSchema = z.object({
  action: z.enum(["clear", "remove"]),
});

// PATCH /api/admin/moderation/[type]/[id] — resolve a flag
// type = "doubt" | "answer"
// action = "clear" (keep content, remove flag) | "remove" (soft-delete content)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ type: string; id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return Response.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      );
    }

    const { type, id } = await params;

    if (type !== "doubt" && type !== "answer") {
      return Response.json(
        { success: false, error: "Type must be 'doubt' or 'answer'" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const parsed = resolveSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      return Response.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const { action } = parsed.data;

    if (type === "doubt") {
      const doubt = await db.doubt.findUnique({ where: { id } });
      if (!doubt) {
        return Response.json(
          { success: false, error: "Doubt not found" },
          { status: 404 }
        );
      }

      if (action === "clear") {
        await db.doubt.update({
          where: { id },
          data: { isFlagged: false, flagReason: null },
        });
      } else {
        await db.doubt.update({
          where: { id },
          data: { isRemoved: true, isFlagged: false },
        });
      }
    } else {
      const answer = await db.answer.findUnique({ where: { id } });
      if (!answer) {
        return Response.json(
          { success: false, error: "Answer not found" },
          { status: 404 }
        );
      }

      if (action === "clear") {
        await db.answer.update({
          where: { id },
          data: { isFlagged: false, flagReason: null },
        });
      } else {
        await db.answer.update({
          where: { id },
          data: { isRemoved: true, isFlagged: false },
        });
      }
    }

    const actionLabel = action === "clear" ? "Flag cleared" : "Content removed";
    return Response.json({
      success: true,
      data: { message: `${actionLabel} successfully` },
    });
  } catch (error) {
    console.error("Error resolving moderation flag:", error);
    return Response.json(
      { success: false, error: "Failed to resolve flag" },
      { status: 500 }
    );
  }
}

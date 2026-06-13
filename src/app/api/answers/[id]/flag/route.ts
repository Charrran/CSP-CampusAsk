import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const flagSchema = z.object({
  reason: z
    .string()
    .min(5, "Reason must be at least 5 characters")
    .max(500, "Reason must be less than 500 characters")
    .trim(),
});

// POST /api/answers/[id]/flag — any authenticated user flags an answer
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return Response.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const body = await request.json();
    const parsed = flagSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      return Response.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const answer = await db.answer.findUnique({ where: { id } });
    if (!answer) {
      return Response.json(
        { success: false, error: "Answer not found" },
        { status: 404 }
      );
    }

    await db.answer.update({
      where: { id },
      data: {
        isFlagged: true,
        flagReason: parsed.data.reason,
      },
    });

    return Response.json({
      success: true,
      data: { message: "Answer flagged for review" },
    });
  } catch (error) {
    console.error("Error flagging answer:", error);
    return Response.json(
      { success: false, error: "Failed to flag answer" },
      { status: 500 }
    );
  }
}

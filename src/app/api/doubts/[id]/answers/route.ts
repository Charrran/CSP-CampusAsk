import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { createAnswerSchema } from "@/lib/validations";

// POST /api/doubts/[id]/answers — faculty submits an answer
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

    if (session.role !== "FACULTY") {
      return Response.json(
        { success: false, error: "Only faculty can submit answers" },
        { status: 403 }
      );
    }

    const { id: doubtId } = await params;

    // Verify doubt exists
    const doubt = await db.doubt.findUnique({ where: { id: doubtId } });
    if (!doubt) {
      return Response.json(
        { success: false, error: "Doubt not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const parsed = createAnswerSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      return Response.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    // Create answer and update doubt status if it was OPEN
    const answer = await db.answer.create({
      data: {
        content: parsed.data.content,
        doubtId,
        userId: session.userId,
      },
      include: {
        user: { select: { id: true, name: true } },
      },
    });

    // Update doubt status to ANSWERED if it was OPEN
    if (doubt.status === "OPEN") {
      await db.doubt.update({
        where: { id: doubtId },
        data: { status: "ANSWERED" },
      });
    }

    // Notify the doubt owner about the new answer
    try {
      await db.notification.create({
        data: {
          userId: doubt.userId,
          message: `Your doubt "${doubt.title}" received a new answer from ${session.name}`,
          referenceId: doubtId,
        },
      });
    } catch (notifErr) {
      console.error("Error creating notification:", notifErr);
    }

    return Response.json({ success: true, data: answer }, { status: 201 });
  } catch (error) {
    console.error("Error creating answer:", error);
    return Response.json(
      { success: false, error: "Failed to submit answer" },
      { status: 500 }
    );
  }
}

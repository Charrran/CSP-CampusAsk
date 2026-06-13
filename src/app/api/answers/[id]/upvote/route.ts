import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

// POST /api/answers/[id]/upvote — toggle upvote on an answer
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

    const { id: answerId } = await params;

    // Check if answer exists
    const answer = await db.answer.findUnique({ where: { id: answerId } });
    if (!answer) {
      return Response.json(
        { success: false, error: "Answer not found" },
        { status: 404 }
      );
    }

    // Check if user already upvoted
    const existingUpvote = await db.upvote.findUnique({
      where: {
        userId_answerId: {
          userId: session.userId,
          answerId,
        },
      },
    });

    if (existingUpvote) {
      // Remove upvote and decrement count
      await db.$transaction([
        db.upvote.delete({
          where: {
            userId_answerId: {
              userId: session.userId,
              answerId,
            },
          },
        }),
        db.answer.update({
          where: { id: answerId },
          data: { upvoteCount: { decrement: 1 } },
        }),
      ]);

      return Response.json({
        success: true,
        data: { upvoted: false, upvoteCount: answer.upvoteCount - 1 },
      });
    } else {
      // Add upvote and increment count
      await db.$transaction([
        db.upvote.create({
          data: {
            userId: session.userId,
            answerId,
          },
        }),
        db.answer.update({
          where: { id: answerId },
          data: { upvoteCount: { increment: 1 } },
        }),
      ]);

      return Response.json({
        success: true,
        data: { upvoted: true, upvoteCount: answer.upvoteCount + 1 },
      });
    }
  } catch (error) {
    console.error("Error toggling upvote:", error);
    return Response.json(
      { success: false, error: "Failed to toggle upvote" },
      { status: 500 }
    );
  }
}

import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

// GET /api/doubts/[id] — get a single doubt with its answers
export async function GET(
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

    const doubt = await db.doubt.findUnique({
      where: { id },
      include: {
        subject: true,
        chapter: true,
        user: { select: { id: true, name: true } },
        answers: {
          include: {
            user: { select: { id: true, name: true } },
            upvotes: {
              where: { userId: session.userId },
              select: { userId: true },
            },
          },
          orderBy: { upvoteCount: "desc" },
        },
        savedBy: {
          where: { userId: session.userId },
          select: { userId: true },
        },
      },
    });

    if (!doubt) {
      return Response.json(
        { success: false, error: "Doubt not found" },
        { status: 404 }
      );
    }

    // Transform to include user-specific flags
    const data = {
      ...doubt,
      isSaved: doubt.savedBy.length > 0,
      answers: doubt.answers.map((answer) => ({
        ...answer,
        isUpvoted: answer.upvotes.length > 0,
        upvotes: undefined, // don't leak the upvotes array
      })),
      savedBy: undefined, // don't leak the savedBy array
    };

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching doubt:", error);
    return Response.json(
      { success: false, error: "Failed to fetch doubt" },
      { status: 500 }
    );
  }
}

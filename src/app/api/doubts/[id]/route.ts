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

    // Hide removed doubts from non-admin users
    if (doubt.isRemoved && session.role !== "ADMIN") {
      return Response.json(
        { success: false, error: "Doubt not found" },
        { status: 404 }
      );
    }

    // Filter out removed answers for non-admin users
    const visibleAnswers = session.role === "ADMIN"
      ? doubt.answers
      : doubt.answers.filter((a) => !a.isRemoved);

    // Transform to include user-specific flags
    const data = {
      ...doubt,
      isSaved: doubt.savedBy.length > 0,
      answers: visibleAnswers.map((answer) => ({
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

// PATCH /api/doubts/[id] — student resolves their own doubt (ANSWERED → RESOLVED)
export async function PATCH(
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

    const doubt = await db.doubt.findUnique({ where: { id } });
    if (!doubt) {
      return Response.json(
        { success: false, error: "Doubt not found" },
        { status: 404 }
      );
    }

    // Only the student who posted the doubt can resolve it
    if (doubt.userId !== session.userId) {
      return Response.json(
        { success: false, error: "Only the doubt owner can resolve it" },
        { status: 403 }
      );
    }

    if (doubt.status !== "ANSWERED") {
      return Response.json(
        { success: false, error: "Doubt can only be resolved when status is ANSWERED" },
        { status: 400 }
      );
    }

    const updated = await db.doubt.update({
      where: { id },
      data: { status: "RESOLVED" },
      include: {
        subject: true,
        chapter: true,
        user: { select: { id: true, name: true } },
        _count: { select: { answers: true } },
      },
    });

    return Response.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating doubt status:", error);
    return Response.json(
      { success: false, error: "Failed to update doubt" },
      { status: 500 }
    );
  }
}

import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

// POST /api/doubts/[id]/upvote — toggle upvote on a doubt
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) {
      return Response.json({ success: false, error: "Not authenticated" }, { status: 401 });
    }
    if (session.role !== "STUDENT") {
      return Response.json({ success: false, error: "Only students can upvote" }, { status: 403 });
    }

    const { id: doubtId } = await params;

    // Verify doubt exists
    const doubt = await db.doubt.findUnique({ where: { id: doubtId } });
    if (!doubt) {
      return Response.json({ success: false, error: "Doubt not found" }, { status: 404 });
    }

    // Check if already upvoted
    const existing = await db.doubtUpvote.findUnique({
      where: { userId_doubtId: { userId: session.userId, doubtId } },
    });
    if (existing) {
      // Remove upvote
      await db.doubtUpvote.delete({ where: { userId_doubtId: { userId: session.userId, doubtId } } });
      return Response.json({ success: true, data: { upvoted: false } }, { status: 200 });
    } else {
      // Add upvote
      await db.doubtUpvote.create({ data: { userId: session.userId, doubtId } });
      return Response.json({ success: true, data: { upvoted: true } }, { status: 201 });
    }
  } catch (error) {
    console.error("Error toggling doubt upvote:", error);
    return Response.json({ success: false, error: "Failed to toggle upvote" }, { status: 500 });
  }
}

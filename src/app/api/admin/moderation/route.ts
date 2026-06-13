import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

// GET /api/admin/moderation — list all flagged doubts and answers
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return Response.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      );
    }

    const [flaggedDoubts, flaggedAnswers] = await Promise.all([
      db.doubt.findMany({
        where: { isFlagged: true, isRemoved: false },
        include: {
          subject: true,
          chapter: true,
          user: { select: { id: true, name: true, email: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
      db.answer.findMany({
        where: { isFlagged: true, isRemoved: false },
        include: {
          doubt: {
            select: { id: true, title: true },
          },
          user: { select: { id: true, name: true, email: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return Response.json({
      success: true,
      data: {
        flaggedDoubts,
        flaggedAnswers,
        totalFlagged: flaggedDoubts.length + flaggedAnswers.length,
      },
    });
  } catch (error) {
    console.error("Error fetching moderation queue:", error);
    return Response.json(
      { success: false, error: "Failed to fetch moderation queue" },
      { status: 500 }
    );
  }
}

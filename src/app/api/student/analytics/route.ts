import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

// GET /api/student/analytics — per-student metrics
export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return Response.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    if (session.role !== "STUDENT") {
      return Response.json(
        { success: false, error: "Students only" },
        { status: 403 }
      );
    }

    // Doubts posted by status
    const [openDoubts, answeredDoubts, resolvedDoubts, totalDoubts] =
      await Promise.all([
        db.doubt.count({ where: { userId: session.userId, status: "OPEN" } }),
        db.doubt.count({ where: { userId: session.userId, status: "ANSWERED" } }),
        db.doubt.count({ where: { userId: session.userId, status: "RESOLVED" } }),
        db.doubt.count({ where: { userId: session.userId } }),
      ]);

    // Saved doubts count
    const savedCount = await db.savedDoubt.count({
      where: { userId: session.userId },
    });

    // Average time doubts take to get answered
    const doubtsWithAnswers = await db.doubt.findMany({
      where: {
        userId: session.userId,
        answers: { some: {} },
      },
      select: {
        createdAt: true,
        answers: {
          select: { createdAt: true },
          orderBy: { createdAt: "asc" },
          take: 1,
        },
      },
    });

    let avgTimeToAnswerHours = 0;
    if (doubtsWithAnswers.length > 0) {
      const totalMs = doubtsWithAnswers.reduce((sum, d) => {
        const firstAnswer = d.answers[0];
        if (!firstAnswer) return sum;
        return sum + (firstAnswer.createdAt.getTime() - d.createdAt.getTime());
      }, 0);
      avgTimeToAnswerHours =
        Math.round(
          (totalMs / doubtsWithAnswers.length / (1000 * 60 * 60)) * 10
        ) / 10;
    }

    return Response.json({
      success: true,
      data: {
        doubts: {
          total: totalDoubts,
          open: openDoubts,
          answered: answeredDoubts,
          resolved: resolvedDoubts,
        },
        savedCount,
        avgTimeToAnswerHours,
      },
    });
  } catch (error) {
    console.error("Error fetching student analytics:", error);
    return Response.json(
      { success: false, error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}

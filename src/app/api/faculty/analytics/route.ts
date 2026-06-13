import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

// GET /api/faculty/analytics — per-faculty metrics
export async function GET() {
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
        { success: false, error: "Faculty only" },
        { status: 403 }
      );
    }

    // Total answers given
    const totalAnswers = await db.answer.count({
      where: { userId: session.userId },
    });

    // Average upvotes per answer
    const answers = await db.answer.findMany({
      where: { userId: session.userId },
      select: {
        upvoteCount: true,
        createdAt: true,
        doubt: {
          select: {
            createdAt: true,
            subjectId: true,
            subject: { select: { name: true } },
          },
        },
      },
    });

    const avgUpvotes =
      answers.length > 0
        ? Math.round(
            (answers.reduce((sum, a) => sum + a.upvoteCount, 0) /
              answers.length) *
              10
          ) / 10
        : 0;

    // Breakdown by subject
    const subjectBreakdown: Record<string, { name: string; count: number }> = {};
    for (const a of answers) {
      const sid = a.doubt.subjectId;
      if (!subjectBreakdown[sid]) {
        subjectBreakdown[sid] = { name: a.doubt.subject.name, count: 0 };
      }
      subjectBreakdown[sid].count++;
    }
    const answersBySubject = Object.values(subjectBreakdown).sort(
      (a, b) => b.count - a.count
    );

    // Response time stats (time from doubt creation to this faculty's answer)
    let avgResponseTimeHours = 0;
    if (answers.length > 0) {
      const totalMs = answers.reduce((sum, a) => {
        return (
          sum +
          (a.createdAt.getTime() - a.doubt.createdAt.getTime())
        );
      }, 0);
      avgResponseTimeHours =
        Math.round((totalMs / answers.length / (1000 * 60 * 60)) * 10) / 10;
    }

    return Response.json({
      success: true,
      data: {
        totalAnswers,
        avgUpvotesPerAnswer: avgUpvotes,
        answersBySubject,
        avgResponseTimeHours,
      },
    });
  } catch (error) {
    console.error("Error fetching faculty analytics:", error);
    return Response.json(
      { success: false, error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}

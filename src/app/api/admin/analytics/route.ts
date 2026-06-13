import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

// GET /api/admin/analytics — platform-wide metrics
export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return Response.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      );
    }

    // User counts by role
    const [studentCount, facultyCount, adminCount] = await Promise.all([
      db.user.count({ where: { role: "STUDENT" } }),
      db.user.count({ where: { role: "FACULTY" } }),
      db.user.count({ where: { role: "ADMIN" } }),
    ]);

    // Doubt counts by status
    const [openDoubts, answeredDoubts, resolvedDoubts, totalDoubts] =
      await Promise.all([
        db.doubt.count({ where: { status: "OPEN" } }),
        db.doubt.count({ where: { status: "ANSWERED" } }),
        db.doubt.count({ where: { status: "RESOLVED" } }),
        db.doubt.count(),
      ]);

    const totalAnswers = await db.answer.count();

    // Average time to first answer (in hours)
    // Get doubts that have at least one answer, with the earliest answer
    const doubtsWithAnswers = await db.doubt.findMany({
      where: { answers: { some: {} } },
      select: {
        createdAt: true,
        answers: {
          select: { createdAt: true },
          orderBy: { createdAt: "asc" },
          take: 1,
        },
      },
    });

    let avgTimeToFirstAnswer = 0;
    if (doubtsWithAnswers.length > 0) {
      const totalMs = doubtsWithAnswers.reduce((sum, d) => {
        const firstAnswer = d.answers[0];
        if (!firstAnswer) return sum;
        return sum + (firstAnswer.createdAt.getTime() - d.createdAt.getTime());
      }, 0);
      avgTimeToFirstAnswer = Math.round(
        totalMs / doubtsWithAnswers.length / (1000 * 60 * 60) * 10
      ) / 10; // hours, 1 decimal
    }

    // Subject-wise doubt counts
    const subjectStats = await db.subject.findMany({
      select: {
        id: true,
        name: true,
        _count: { select: { doubts: true } },
      },
      orderBy: { name: "asc" },
    });

    // Daily doubt creation for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentDoubts = await db.doubt.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    });

    // Group by day
    const dailyCounts: Record<string, number> = {};
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(d.getDate() - (29 - i));
      const key = d.toISOString().split("T")[0];
      dailyCounts[key] = 0;
    }
    for (const doubt of recentDoubts) {
      const key = doubt.createdAt.toISOString().split("T")[0];
      if (dailyCounts[key] !== undefined) {
        dailyCounts[key]++;
      }
    }

    const dailyDoubtTrend = Object.entries(dailyCounts).map(([date, count]) => ({
      date,
      count,
    }));

    return Response.json({
      success: true,
      data: {
        users: {
          total: studentCount + facultyCount + adminCount,
          students: studentCount,
          faculty: facultyCount,
          admins: adminCount,
        },
        doubts: {
          total: totalDoubts,
          open: openDoubts,
          answered: answeredDoubts,
          resolved: resolvedDoubts,
        },
        totalAnswers,
        avgTimeToFirstAnswerHours: avgTimeToFirstAnswer,
        subjectStats,
        dailyDoubtTrend,
      },
    });
  } catch (error) {
    console.error("Error fetching admin analytics:", error);
    return Response.json(
      { success: false, error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}

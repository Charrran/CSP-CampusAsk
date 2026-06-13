import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

// GET /api/student/stats — dashboard stats for student
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

    const [totalDoubts, openDoubts, answeredDoubts, resolvedDoubts, savedCount, recentDoubts] =
      await Promise.all([
        db.doubt.count({ where: { userId: session.userId } }),
        db.doubt.count({
          where: { userId: session.userId, status: "OPEN" },
        }),
        db.doubt.count({
          where: { userId: session.userId, status: "ANSWERED" },
        }),
        db.doubt.count({
          where: { userId: session.userId, status: "RESOLVED" },
        }),
        db.savedDoubt.count({ where: { userId: session.userId } }),
        db.doubt.findMany({
          where: { userId: session.userId },
          include: {
            subject: true,
            chapter: true,
            _count: { select: { answers: true } },
          },
          orderBy: { createdAt: "desc" },
          take: 5,
        }),
      ]);

    return Response.json({
      success: true,
      data: {
        totalDoubts,
        openDoubts,
        answeredDoubts,
        resolvedDoubts,
        savedCount,
        recentDoubts,
      },
    });
  } catch (error) {
    console.error("Error fetching student stats:", error);
    return Response.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}

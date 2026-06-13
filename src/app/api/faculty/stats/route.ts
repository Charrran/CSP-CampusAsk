import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

// GET /api/faculty/stats — dashboard stats for faculty
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

    const [answeredByMe, totalOpen, recentAnswers] = await Promise.all([
      db.answer.count({ where: { userId: session.userId } }),
      db.doubt.count({ where: { status: "OPEN" } }),
      db.answer.findMany({
        where: { userId: session.userId },
        include: {
          doubt: {
            include: {
              subject: true,
              chapter: true,
              user: { select: { id: true, name: true } },
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    return Response.json({
      success: true,
      data: {
        answeredByMe,
        totalOpen,
        recentAnswers,
      },
    });
  } catch (error) {
    console.error("Error fetching faculty stats:", error);
    return Response.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}

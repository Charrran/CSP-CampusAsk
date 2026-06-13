import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

// GET /api/student/saved — return all doubts saved by the current student, paginated
export async function GET(request: NextRequest) {
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

    const { searchParams } = request.nextUrl;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);

    const [savedDoubts, totalCount] = await Promise.all([
      db.savedDoubt.findMany({
        where: { userId: session.userId },
        include: {
          doubt: {
            include: {
              subject: true,
              chapter: true,
              user: { select: { id: true, name: true } },
              _count: { select: { answers: true } },
            },
          },
        },
        orderBy: { doubt: { createdAt: "desc" } },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.savedDoubt.count({ where: { userId: session.userId } }),
    ]);

    const doubts = savedDoubts.map((sd) => sd.doubt);

    return Response.json({
      success: true,
      data: {
        doubts,
        totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching saved doubts:", error);
    return Response.json(
      { success: false, error: "Failed to fetch saved doubts" },
      { status: 500 }
    );
  }
}

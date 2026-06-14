import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

// GET /api/search?query=...&subjectId=...&chapterId=...&status=...&page=...&limit=...
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return Response.json({ success: false, error: "Not authenticated" }, { status: 401 });
    }

    const { searchParams } = request.nextUrl;
    const query = searchParams.get("query")?.trim();
    const subjectId = searchParams.get("subjectId");
    const chapterId = searchParams.get("chapterId");
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "12", 10);

    // Build where clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    // Exclude removed doubts for non-admin users
    if (session.role !== "ADMIN") {
      where.isRemoved = false;
    }

    if (query) {
      where.OR = [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ];
    }
    if (subjectId) where.subjectId = subjectId;
    if (chapterId) where.chapterId = chapterId;
    if (status && ["OPEN", "ANSWERED", "RESOLVED"].includes(status)) where.status = status as any;

    const [doubts, totalCount] = await Promise.all([
      db.doubt.findMany({
        where,
        include: {
          subject: true,
          chapter: true,
          user: { select: { id: true, name: true } },
          _count: { select: { answers: true, savedBy: true, upvotes: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.doubt.count({ where }),
    ]);

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
    console.error("Error in search API:", error);
    return Response.json({ success: false, error: "Search failed" }, { status: 500 });
  }
}

import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

// GET /api/doubts/check-similar?title=...&subjectId=...
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return Response.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { searchParams } = request.nextUrl;
    const title = searchParams.get("title");
    const subjectId = searchParams.get("subjectId");

    if (!title || title.length < 3) {
      return Response.json({ success: true, data: [] });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
      title: { contains: title, mode: "insensitive" },
    };

    if (subjectId) {
      where.subjectId = subjectId;
    }

    const similar = await db.doubt.findMany({
      where,
      select: {
        id: true,
        title: true,
        status: true,
        _count: { select: { answers: true } },
      },
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    return Response.json({ success: true, data: similar });
  } catch (error) {
    console.error("Error checking similar doubts:", error);
    return Response.json(
      { success: false, error: "Failed to check similar doubts" },
      { status: 500 }
    );
  }
}

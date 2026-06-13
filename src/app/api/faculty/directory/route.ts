import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

// GET /api/faculty/directory?subjectId=xxx — faculty list for a subject with availability summary
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
    const subjectId = searchParams.get("subjectId");

    if (!subjectId) {
      return Response.json(
        { success: false, error: "subjectId is required" },
        { status: 400 }
      );
    }

    // Get all faculty assigned to this subject
    const faculty = await db.user.findMany({
      where: {
        role: "FACULTY",
        isActive: true,
        subjects: { some: { id: subjectId } },
      },
      select: {
        id: true,
        name: true,
        email: true,
        _count: { select: { answers: true } },
        availabilitySlots: {
          where: {
            isBooked: false,
            date: { gte: new Date() },
          },
          orderBy: [{ date: "asc" }, { startTime: "asc" }],
          take: 5,
        },
      },
    });

    const data = faculty.map((f) => ({
      id: f.id,
      name: f.name,
      email: f.email,
      totalAnswers: f._count.answers,
      upcomingSlots: f.availabilitySlots,
      availableSlotCount: f.availabilitySlots.length,
    }));

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching faculty directory:", error);
    return Response.json(
      { success: false, error: "Failed to fetch faculty directory" },
      { status: 500 }
    );
  }
}

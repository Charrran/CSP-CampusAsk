import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const createSlotSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  startTime: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid start time" }),
  endTime: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid end time" }),
});

// GET /api/meetings/slots — list availability slots
// Query params: facultyId (optional, for student browsing), subjectId (optional, filter by assigned faculty)
// If no facultyId, returns current faculty's own slots
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
    const facultyId = searchParams.get("facultyId");

    if (facultyId) {
      // Student browsing a specific faculty's available (unbooked) slots
      const slots = await db.availabilitySlot.findMany({
        where: {
          userId: facultyId,
          isBooked: false,
          date: { gte: new Date() },
        },
        orderBy: [{ date: "asc" }, { startTime: "asc" }],
      });

      return Response.json({ success: true, data: slots });
    }

    // Faculty viewing their own slots
    if (session.role !== "FACULTY") {
      return Response.json(
        { success: false, error: "Faculty only or provide facultyId" },
        { status: 403 }
      );
    }

    const slots = await db.availabilitySlot.findMany({
      where: { userId: session.userId },
      orderBy: [{ date: "asc" }, { startTime: "asc" }],
    });

    return Response.json({ success: true, data: slots });
  } catch (error) {
    console.error("Error fetching availability slots:", error);
    return Response.json(
      { success: false, error: "Failed to fetch slots" },
      { status: 500 }
    );
  }
}

// POST /api/meetings/slots — faculty creates a new availability slot
export async function POST(request: NextRequest) {
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
        { success: false, error: "Only faculty can create slots" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const parsed = createSlotSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      return Response.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const { date, startTime, endTime } = parsed.data;

    if (new Date(endTime) <= new Date(startTime)) {
      return Response.json(
        { success: false, error: "End time must be after start time" },
        { status: 400 }
      );
    }

    const slot = await db.availabilitySlot.create({
      data: {
        userId: session.userId,
        date: new Date(date),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });

    return Response.json({ success: true, data: slot }, { status: 201 });
  } catch (error) {
    console.error("Error creating availability slot:", error);
    return Response.json(
      { success: false, error: "Failed to create slot" },
      { status: 500 }
    );
  }
}

// DELETE /api/meetings/slots?id=xxx — faculty deletes an unbooked slot
export async function DELETE(request: NextRequest) {
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
        { success: false, error: "Only faculty can delete slots" },
        { status: 403 }
      );
    }

    const { searchParams } = request.nextUrl;
    const slotId = searchParams.get("id");
    if (!slotId) {
      return Response.json(
        { success: false, error: "Slot ID is required" },
        { status: 400 }
      );
    }

    const slot = await db.availabilitySlot.findUnique({ where: { id: slotId } });
    if (!slot || slot.userId !== session.userId) {
      return Response.json(
        { success: false, error: "Slot not found" },
        { status: 404 }
      );
    }

    if (slot.isBooked) {
      return Response.json(
        { success: false, error: "Cannot delete a booked slot" },
        { status: 400 }
      );
    }

    await db.availabilitySlot.delete({ where: { id: slotId } });

    return Response.json({ success: true, data: { message: "Slot deleted" } });
  } catch (error) {
    console.error("Error deleting availability slot:", error);
    return Response.json(
      { success: false, error: "Failed to delete slot" },
      { status: 500 }
    );
  }
}

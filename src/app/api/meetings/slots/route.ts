import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

// Validation schema for creating an availability slot
const createSlotSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  startTime: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid start time" }),
  endTime: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid end time" }),
});

// GET /api/meetings/slots – list slots for the authenticated faculty
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return Response.json({ success: false, error: "Not authenticated" }, { status: 401 });
    }
    if (session.role !== "FACULTY") {
      return Response.json({ success: false, error: "Only faculty can manage slots" }, { status: 403 });
    }

    const slots = await db.availabilitySlot.findMany({
      where: { userId: session.userId },
      orderBy: { date: "asc", startTime: "asc" },
    });

    return Response.json({ success: true, data: slots });
  } catch (error) {
    console.error("Error fetching availability slots:", error);
    return Response.json({ success: false, error: "Failed to fetch slots" }, { status: 500 });
  }
}

// POST /api/meetings/slots – create a new availability slot for the faculty
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return Response.json({ success: false, error: "Not authenticated" }, { status: 401 });
    }
    if (session.role !== "FACULTY") {
      return Response.json({ success: false, error: "Only faculty can create slots" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = createSlotSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      return Response.json({ success: false, error: firstError }, { status: 400 });
    }
    const { date, startTime, endTime } = parsed.data;

    // Ensure endTime is after startTime
    if (new Date(endTime) <= new Date(startTime)) {
      return Response.json({ success: false, error: "endTime must be after startTime" }, { status: 400 });
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
    return Response.json({ success: false, error: "Failed to create slot" }, { status: 500 });
  }
}

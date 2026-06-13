import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

// Validation schema for creating a meeting request
const createMeetingSchema = z.object({
  facultyId: z.string().cuid(),
  subjectId: z.string().cuid(),
  slotId: z.string().cuid(),
});

// POST /api/meetings – student requests a meeting with a faculty at a selected slot
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return Response.json({ success: false, error: "Not authenticated" }, { status: 401 });
    }
    if (session.role !== "STUDENT") {
      return Response.json({ success: false, error: "Only students can request meetings" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = createMeetingSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      return Response.json({ success: false, error: firstError }, { status: 400 });
    }
    const { facultyId, subjectId, slotId } = parsed.data;

    // Verify slot belongs to the faculty and is available
    const slot = await db.availabilitySlot.findUnique({
      where: { id: slotId },
    });
    if (!slot || slot.userId !== facultyId) {
      return Response.json({ success: false, error: "Invalid or mismatched availability slot" }, { status: 400 });
    }

    // Create meeting request
    const meeting = await db.meeting.create({
      data: {
        studentId: session.userId,
        facultyId,
        subjectId,
        requestedTime: slot.startTime,
        status: "PENDING",
      },
    });

    return Response.json({ success: true, data: meeting }, { status: 201 });
  } catch (error) {
    console.error("Error creating meeting:", error);
    return Response.json({ success: false, error: "Failed to create meeting" }, { status: 500 });
  }
}

// Validation schema for updating meeting status (faculty side)
const updateMeetingSchema = z.object({
  status: z.enum(["ACCEPTED", "REJECTED", "RESCHEDULED"]),
});

// PATCH /api/meetings/[id] – faculty updates meeting status
export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return Response.json({ success: false, error: "Not authenticated" }, { status: 401 });
    }
    if (session.role !== "FACULTY") {
      return Response.json({ success: false, error: "Only faculty can update meetings" }, { status: 403 });
    }

    const { searchParams } = request.nextUrl;
    const meetingId = searchParams.get("id");
    if (!meetingId) {
      return Response.json({ success: false, error: "Meeting ID missing" }, { status: 400 });
    }

    const body = await request.json();
    const parsed = updateMeetingSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      return Response.json({ success: false, error: firstError }, { status: 400 });
    }
    const { status } = parsed.data;

    // Ensure the faculty owns this meeting
    const meeting = await db.meeting.findUnique({ where: { id: meetingId } });
    if (!meeting || meeting.facultyId !== session.userId) {
      return Response.json({ success: false, error: "Meeting not found or access denied" }, { status: 404 });
    }

    const updated = await db.meeting.update({
      where: { id: meetingId },
      data: { status },
    });

    return Response.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating meeting:", error);
    return Response.json({ success: false, error: "Failed to update meeting" }, { status: 500 });
  }
}

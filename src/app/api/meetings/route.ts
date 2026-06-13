import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const createMeetingSchema = z.object({
  facultyId: z.string().min(1, "Faculty ID is required"),
  subjectId: z.string().min(1, "Subject ID is required"),
  slotId: z.string().min(1, "Slot ID is required"),
  notes: z.string().max(500).optional(),
});

const updateMeetingSchema = z.object({
  status: z.enum(["ACCEPTED", "REJECTED", "RESCHEDULED"]),
  newRequestedTime: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" })
    .optional(),
});

// POST /api/meetings — student requests a meeting at a selected slot
export async function POST(request: NextRequest) {
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
        { success: false, error: "Only students can request meetings" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const parsed = createMeetingSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      return Response.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const { facultyId, subjectId, slotId, notes } = parsed.data;

    // Verify slot exists, belongs to the faculty, and is not booked
    const slot = await db.availabilitySlot.findUnique({ where: { id: slotId } });
    if (!slot || slot.userId !== facultyId) {
      return Response.json(
        { success: false, error: "Invalid availability slot" },
        { status: 400 }
      );
    }

    if (slot.isBooked) {
      return Response.json(
        { success: false, error: "This slot is already booked" },
        { status: 409 }
      );
    }

    // Create meeting and mark slot as booked in a transaction
    const meeting = await db.$transaction(async (tx) => {
      await tx.availabilitySlot.update({
        where: { id: slotId },
        data: { isBooked: true },
      });

      return tx.meeting.create({
        data: {
          studentId: session.userId,
          facultyId,
          subjectId,
          slotId,
          requestedTime: slot.startTime,
          notes: notes || null,
          status: "PENDING",
        },
        include: {
          faculty: { select: { id: true, name: true, email: true } },
          subject: true,
        },
      });
    });

    // Notify the faculty
    try {
      await db.notification.create({
        data: {
          userId: facultyId,
          message: `New meeting request from ${session.name} for ${meeting.subject.name}`,
          referenceId: meeting.id,
        },
      });
    } catch (notifErr) {
      console.error("Error creating meeting notification:", notifErr);
    }

    return Response.json({ success: true, data: meeting }, { status: 201 });
  } catch (error) {
    console.error("Error creating meeting:", error);
    return Response.json(
      { success: false, error: "Failed to create meeting" },
      { status: 500 }
    );
  }
}

// GET /api/meetings — return current user's meetings (as student or faculty)
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
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);
    const status = searchParams.get("status");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (session.role === "STUDENT") {
      where.studentId = session.userId;
    } else if (session.role === "FACULTY") {
      where.facultyId = session.userId;
    } else {
      // Admin can view all
    }

    if (status && ["PENDING", "ACCEPTED", "REJECTED", "RESCHEDULED"].includes(status)) {
      where.status = status;
    }

    const [meetings, totalCount] = await Promise.all([
      db.meeting.findMany({
        where,
        include: {
          student: { select: { id: true, name: true, email: true } },
          faculty: { select: { id: true, name: true, email: true } },
          subject: true,
          slot: true,
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.meeting.count({ where }),
    ]);

    return Response.json({
      success: true,
      data: {
        meetings,
        totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching meetings:", error);
    return Response.json(
      { success: false, error: "Failed to fetch meetings" },
      { status: 500 }
    );
  }
}

// PATCH /api/meetings?id=xxx — faculty updates meeting status
export async function PATCH(request: NextRequest) {
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
        { success: false, error: "Only faculty can update meetings" },
        { status: 403 }
      );
    }

    const { searchParams } = request.nextUrl;
    const meetingId = searchParams.get("id");
    if (!meetingId) {
      return Response.json(
        { success: false, error: "Meeting ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const parsed = updateMeetingSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      return Response.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const { status: newStatus, newRequestedTime } = parsed.data;

    const meeting = await db.meeting.findUnique({ where: { id: meetingId } });
    if (!meeting || meeting.facultyId !== session.userId) {
      return Response.json(
        { success: false, error: "Meeting not found or access denied" },
        { status: 404 }
      );
    }

    // If rejecting, free up the slot
    if (newStatus === "REJECTED" && meeting.slotId) {
      await db.availabilitySlot.update({
        where: { id: meeting.slotId },
        data: { isBooked: false },
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = { status: newStatus };
    if (newStatus === "RESCHEDULED" && newRequestedTime) {
      updateData.requestedTime = new Date(newRequestedTime);
    }

    const updated = await db.meeting.update({
      where: { id: meetingId },
      data: updateData,
      include: {
        student: { select: { id: true, name: true } },
        faculty: { select: { id: true, name: true } },
        subject: true,
      },
    });

    // Notify the student about the status change
    try {
      const statusMessages: Record<string, string> = {
        ACCEPTED: `Your meeting request with ${session.name} has been accepted`,
        REJECTED: `Your meeting request with ${session.name} has been declined`,
        RESCHEDULED: `Your meeting with ${session.name} has been rescheduled`,
      };
      await db.notification.create({
        data: {
          userId: meeting.studentId,
          message: statusMessages[newStatus] || `Meeting status updated to ${newStatus}`,
          referenceId: meetingId,
        },
      });
    } catch (notifErr) {
      console.error("Error creating meeting status notification:", notifErr);
    }

    return Response.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating meeting:", error);
    return Response.json(
      { success: false, error: "Failed to update meeting" },
      { status: 500 }
    );
  }
}

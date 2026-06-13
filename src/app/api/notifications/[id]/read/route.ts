import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

// PATCH /api/notifications/[id]/read — mark a single notification as read
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return Response.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const notification = await db.notification.findUnique({ where: { id } });
    if (!notification || notification.userId !== session.userId) {
      return Response.json(
        { success: false, error: "Notification not found" },
        { status: 404 }
      );
    }

    const updated = await db.notification.update({
      where: { id },
      data: { isRead: true },
    });

    return Response.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return Response.json(
      { success: false, error: "Failed to update notification" },
      { status: 500 }
    );
  }
}

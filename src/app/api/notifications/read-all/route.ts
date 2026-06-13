import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

// PATCH /api/notifications/read-all — mark all notifications as read for current user
export async function PATCH() {
  try {
    const session = await getSession();
    if (!session) {
      return Response.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    await db.notification.updateMany({
      where: { userId: session.userId, isRead: false },
      data: { isRead: true },
    });

    return Response.json({ success: true, data: { message: "All notifications marked as read" } });
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    return Response.json(
      { success: false, error: "Failed to mark all as read" },
      { status: 500 }
    );
  }
}

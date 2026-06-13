import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

// GET /api/notifications/unread-count — lightweight unread count for polling
export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return Response.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const count = await db.notification.count({
      where: { userId: session.userId, isRead: false },
    });

    return Response.json({ success: true, data: { unreadCount: count } });
  } catch (error) {
    console.error("Error fetching unread count:", error);
    return Response.json(
      { success: false, error: "Failed to fetch unread count" },
      { status: 500 }
    );
  }
}

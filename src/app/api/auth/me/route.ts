import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return Response.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    return Response.json({
      success: true,
      data: {
        id: session.userId,
        name: session.name,
        email: session.email,
        role: session.role,
      },
    });
  } catch (error) {
    console.error("Session error:", error);
    return Response.json(
      { success: false, error: "Not authenticated" },
      { status: 401 }
    );
  }
}

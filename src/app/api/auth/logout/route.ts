import { deleteSession } from "@/lib/auth";

export async function POST() {
  try {
    await deleteSession();
    return Response.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return Response.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}

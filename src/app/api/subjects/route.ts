// Removed NextRequest import
import { db } from "@/lib/db";

export async function GET() {
  try {
    const subjects = await db.subject.findMany({
      include: {
        chapters: {
          orderBy: { name: "asc" },
        },
      },
      orderBy: { name: "asc" },
    });

    return Response.json({ success: true, data: subjects });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return Response.json(
      { success: false, error: "Failed to fetch subjects" },
      { status: 500 }
    );
  }
}

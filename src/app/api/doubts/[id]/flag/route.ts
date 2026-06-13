import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const flagSchema = z.object({
  reason: z
    .string()
    .min(5, "Reason must be at least 5 characters")
    .max(500, "Reason must be less than 500 characters")
    .trim(),
});

// POST /api/doubts/[id]/flag — any authenticated user flags a doubt
export async function POST(
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

    const body = await request.json();
    const parsed = flagSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      return Response.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const doubt = await db.doubt.findUnique({ where: { id } });
    if (!doubt) {
      return Response.json(
        { success: false, error: "Doubt not found" },
        { status: 404 }
      );
    }

    await db.doubt.update({
      where: { id },
      data: {
        isFlagged: true,
        flagReason: parsed.data.reason,
      },
    });

    return Response.json({
      success: true,
      data: { message: "Doubt flagged for review" },
    });
  } catch (error) {
    console.error("Error flagging doubt:", error);
    return Response.json(
      { success: false, error: "Failed to flag doubt" },
      { status: 500 }
    );
  }
}

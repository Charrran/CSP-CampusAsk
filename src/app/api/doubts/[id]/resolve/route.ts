import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

// PATCH /api/doubts/[id] — student resolves their own doubt (ANSWERED → RESOLVED)
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

    const doubt = await db.doubt.findUnique({ where: { id } });
    if (!doubt) {
      return Response.json(
        { success: false, error: "Doubt not found" },
        { status: 404 }
      );
    }

    // Only the student who posted the doubt can resolve it
    if (doubt.userId !== session.userId) {
      return Response.json(
        { success: false, error: "Only the doubt owner can resolve it" },
        { status: 403 }
      );
    }

    if (doubt.status !== "ANSWERED") {
      return Response.json(
        { success: false, error: "Doubt can only be resolved when status is ANSWERED" },
        { status: 400 }
      );
    }

    const updated = await db.doubt.update({
      where: { id },
      data: { status: "RESOLVED" },
      include: {
        subject: true,
        chapter: true,
        user: { select: { id: true, name: true } },
        _count: { select: { answers: true } },
      },
    });

    return Response.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating doubt:", error);
    return Response.json(
      { success: false, error: "Failed to update doubt" },
      { status: 500 }
    );
  }
}

import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

// POST /api/doubts/[id]/save — save a doubt
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

    if (session.role !== "STUDENT") {
      return Response.json(
        { success: false, error: "Only students can save doubts" },
        { status: 403 }
      );
    }

    const { id: doubtId } = await params;

    // Verify doubt exists
    const doubt = await db.doubt.findUnique({ where: { id: doubtId } });
    if (!doubt) {
      return Response.json(
        { success: false, error: "Doubt not found" },
        { status: 404 }
      );
    }

    // Check if already saved
    const existing = await db.savedDoubt.findUnique({
      where: {
        userId_doubtId: {
          userId: session.userId,
          doubtId,
        },
      },
    });

    if (existing) {
      return Response.json({
        success: true,
        data: { saved: true },
        message: "Already saved",
      });
    }

    await db.savedDoubt.create({
      data: {
        userId: session.userId,
        doubtId,
      },
    });

    return Response.json({ success: true, data: { saved: true } });
  } catch (error) {
    console.error("Error saving doubt:", error);
    return Response.json(
      { success: false, error: "Failed to save doubt" },
      { status: 500 }
    );
  }
}

// DELETE /api/doubts/[id]/save — unsave a doubt
export async function DELETE(
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

    const { id: doubtId } = await params;

    await db.savedDoubt.deleteMany({
      where: {
        userId: session.userId,
        doubtId,
      },
    });

    return Response.json({ success: true, data: { saved: false } });
  } catch (error) {
    console.error("Error unsaving doubt:", error);
    return Response.json(
      { success: false, error: "Failed to unsave doubt" },
      { status: 500 }
    );
  }
}

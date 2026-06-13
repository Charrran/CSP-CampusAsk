import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const updateUserSchema = z.object({
  role: z.enum(["STUDENT", "FACULTY", "ADMIN"]).optional(),
  isActive: z.boolean().optional(),
});

// PATCH /api/admin/users/[id] — admin updates a user's role or active status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return Response.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      );
    }

    const { id } = await params;

    const body = await request.json();
    const parsed = updateUserSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      return Response.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({ where: { id } });
    if (!user) {
      return Response.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Prevent admin from deactivating themselves
    if (id === session.userId && parsed.data.isActive === false) {
      return Response.json(
        { success: false, error: "Cannot deactivate your own account" },
        { status: 400 }
      );
    }

    const updated = await db.user.update({
      where: { id },
      data: parsed.data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    return Response.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating user:", error);
    return Response.json(
      { success: false, error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users/[id] — soft-delete (deactivate) a user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return Response.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      );
    }

    const { id } = await params;

    if (id === session.userId) {
      return Response.json(
        { success: false, error: "Cannot deactivate your own account" },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({ where: { id } });
    if (!user) {
      return Response.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Soft-delete: deactivate instead of hard delete to preserve referential integrity
    await db.user.update({
      where: { id },
      data: { isActive: false },
    });

    return Response.json({
      success: true,
      data: { message: "User deactivated successfully" },
    });
  } catch (error) {
    console.error("Error deactivating user:", error);
    return Response.json(
      { success: false, error: "Failed to deactivate user" },
      { status: 500 }
    );
  }
}

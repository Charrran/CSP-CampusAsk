import { NextRequest } from "next/server";
import { Prisma, Role } from "@prisma/client";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

// GET /api/admin/users — paginated user list with activity counts, search, and role filter
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return Response.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      );
    }

    const { searchParams } = request.nextUrl;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const search = searchParams.get("search");
    const role = searchParams.get("role");

    const where: Prisma.UserWhereInput = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }
    if (role && ["STUDENT", "FACULTY", "ADMIN"].includes(role)) {
      where.role = role as Role;
    }

    const [users, totalCount] = await Promise.all([
      db.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          createdAt: true,
          _count: {
            select: {
              doubts: true,
              answers: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.user.count({ where }),
    ]);

    return Response.json({
      success: true,
      data: {
        users,
        totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json(
      { success: false, error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

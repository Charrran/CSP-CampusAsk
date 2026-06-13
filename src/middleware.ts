import { NextRequest, NextResponse } from "next/server";
import { verifyTokenEdge, COOKIE_NAME } from "@/lib/auth";

// Routes that don't require authentication
const publicPaths = [
  "/login",
  "/register",
  "/api/auth",
  "/api/doubts",
  "/api/subjects",
  "/api/answers",
  "/api/student",
  "/api/faculty",
];

function isPublicPath(pathname: string): boolean {
  return publicPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );
}

function getRoleDashboard(role: string): string {
  switch (role) {
    case "STUDENT":
      return "/student/dashboard";
    case "FACULTY":
      return "/faculty/dashboard";
    case "ADMIN":
      return "/admin/dashboard";
    default:
      return "/login";
  }
}

function getPathRole(pathname: string): string | null {
  if (pathname.startsWith("/student")) return "STUDENT";
  if (pathname.startsWith("/faculty")) return "FACULTY";
  if (pathname.startsWith("/admin")) return "ADMIN";
  return null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths (API routes handle their own auth)
  if (isPublicPath(pathname)) {
    // If authenticated and visiting login/register, redirect to dashboard
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (token && (pathname === "/login" || pathname === "/register")) {
      const payload = await verifyTokenEdge(token);
      if (payload) {
        return NextResponse.redirect(
          new URL(getRoleDashboard(payload.role), request.url)
        );
      }
    }
    return NextResponse.next();
  }

  // Root path — show landing page for unauthenticated, redirect for authenticated
  if (pathname === "/") {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (token) {
      const payload = await verifyTokenEdge(token);
      if (payload) {
        return NextResponse.redirect(
          new URL(getRoleDashboard(payload.role), request.url)
        );
      }
    }
    // No token or invalid token — let the landing page render
    return NextResponse.next();
  }

  // /doubts/* pages — require authentication but no specific role
  if (pathname.startsWith("/doubts")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    const payload = await verifyTokenEdge(token);
    if (!payload) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
    return NextResponse.next();
  }

  // Check for auth token
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Verify token
  const payload = await verifyTokenEdge(token);

  if (!payload) {
    // Invalid token — clear cookie and redirect to login
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete(COOKIE_NAME);
    return response;
  }

  // Role-based access control
  const requiredRole = getPathRole(pathname);
  if (requiredRole && requiredRole !== payload.role) {
    // User trying to access a dashboard that doesn't match their role
    return NextResponse.redirect(
      new URL(getRoleDashboard(payload.role), request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

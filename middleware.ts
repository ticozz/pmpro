import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { DEFAULT_ROLES } from "@/types/rbac";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Skip middleware for these paths
    if (path === "/" || path === "/auth/login") {
      return NextResponse.next();
    }

    // If accessing admin pages, must be SUPERADMIN
    if (path.startsWith("/admin") && token?.role !== DEFAULT_ROLES.SUPERADMIN) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // If accessing dashboard pages, must be logged in
    if (path.startsWith("/dashboard") && !token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // Let the middleware function handle the auth
    },
  }
);

export const config = {
  matcher: [
    // Skip public files and API routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

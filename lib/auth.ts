import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { DEFAULT_ROLES } from "@/types/rbac";

export type RouteHandler = (
  req: NextRequest,
  context?: { params: Record<string, string> }
) => Promise<NextResponse>;

export function requireSuperAdmin(handler: RouteHandler) {
  return async function (
    req: NextRequest,
    context?: { params: Record<string, string> }
  ) {
    try {
      const session = await getServerSession(authOptions);
      if (!session?.user || session.user.role !== DEFAULT_ROLES.SUPERADMIN) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      return handler(req, context);
    } catch (error) {
      console.error("[AUTH_ERROR]", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}

export function auth(handler: RouteHandler) {
  return async function (
    req: NextRequest,
    context?: { params: Record<string, string> }
  ) {
    try {
      const session = await getServerSession(authOptions);
      if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return handler(req, context);
    } catch (error) {
      console.error("[AUTH_ERROR]", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}

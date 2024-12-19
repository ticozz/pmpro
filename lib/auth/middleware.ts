import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { checkPermission } from "@/lib/auth/permissions";
import { Permission, DEFAULT_ROLES } from "@/types/rbac";
import { UserRole } from "@prisma/client";

type Handler = () => Promise<NextResponse>;

export async function withAuth(
  req: NextRequest,
  handler: Handler,
  requiredPermission?: Permission
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role === DEFAULT_ROLES.SUPERADMIN) {
      return handler();
    }

    if (requiredPermission) {
      const hasPermission = await checkPermission(
        session.user.id,
        session.user.organizationId,
        requiredPermission
      );

      if (!hasPermission) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    return handler();
  } catch (error) {
    console.error("[AUTH_MIDDLEWARE_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

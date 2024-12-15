import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { verifyOrganizationAccess } from "../auth/permissions";

export type Handler = (
  organizationId: string,
  req: NextRequest
) => Promise<NextResponse>;

export async function withOrganization(req: NextRequest, handler: Handler) {
  try {
    // Try getting organization from session first
    const session = await getServerSession(authOptions);
    let organizationId = session?.user?.organizationId;
    let userId = session?.user?.id;

    // If not in session, try headers
    if (!organizationId || !userId) {
      const headerOrgId = req.headers.get("x-organization-id");
      const headerUserId = req.headers.get("x-user-id");

      organizationId = headerOrgId || undefined;
      userId = headerUserId || undefined;
    }

    if (!organizationId || !userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const hasAccess = await verifyOrganizationAccess(userId, organizationId);

    if (!hasAccess) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return handler(organizationId, req);
  } catch (error) {
    console.error("[ORGANIZATION_MIDDLEWARE_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

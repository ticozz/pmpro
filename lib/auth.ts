import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse, NextRequest } from "next/server";
import { Session } from "next-auth";

export async function validateAuthSession(
  request?: NextRequest
): Promise<Session> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    if (request) {
      throw new NextResponse(
        JSON.stringify({ status: "error", message: "Unauthorized" }),
        { status: 401 }
      );
    }
    throw new Error("Unauthorized");
  }

  return session;
}

export async function validateOrganizationAccess(
  request: NextRequest,
  organizationId: string
): Promise<Session> {
  const session = await validateAuthSession(request);

  if (session.user.organizationId !== organizationId) {
    throw new NextResponse(
      JSON.stringify({
        status: "error",
        message: "Forbidden",
      }),
      { status: 403 }
    );
  }

  return session;
}

export const requireSuperAdmin =
  (handler: Function) => async (req: NextRequest) => {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "SUPERADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return handler(req);
  };

export const auth = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

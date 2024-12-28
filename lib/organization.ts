import { prisma } from "@/lib/prisma";
import { validateAuthSession } from "../lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function getOrganization(
  request: NextRequest,
  organizationId: string
) {
  try {
    const session = await validateAuthSession(request);

    const organization = await prisma.organization.findUnique({
      where: {
        id: organizationId,
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!organization) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "Organization not found",
        }),
        { status: 404 }
      );
    }

    // Validate user belongs to organization
    if (session.user.organizationId !== organizationId) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "Unauthorized access to organization",
        }),
        { status: 403 }
      );
    }

    return organization;
  } catch (error) {
    console.error("Organization fetch error:", error);
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error instanceof Error ? error.message : "An error occurred",
      }),
      { status: 500 }
    );
  }
}

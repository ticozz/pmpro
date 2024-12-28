import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateAuthSession } from "../../../../lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await validateAuthSession(request);
    const { organizationId } = await request.json();

    // Verify user has access to this organization
    const membership = await prisma.organizationMember.findUnique({
      where: {
        userId_organizationId: {
          userId: session.user.id,
          organizationId,
        },
      },
    });

    if (!membership) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "User does not have access to this organization",
        }),
        { status: 403 }
      );
    }

    // Update user's current organization
    await prisma.user.update({
      where: { id: session.user.id },
      data: { organizationId },
    });

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Organization switch error:", error);
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error instanceof Error ? error.message : "An error occurred",
      }),
      { status: 500 }
    );
  }
}

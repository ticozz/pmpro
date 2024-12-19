import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSuperAdmin } from "../../../../lib/auth";
import { createAuditLog, AuditActions } from "@/lib/audit";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";
export const GET = requireSuperAdmin(async (req: NextRequest) => {
  try {
    const organizations = await prisma.organization.findMany({
      include: {
        _count: {
          select: { User: true },
        },
      },
    });

    const formattedOrganizations = organizations.map((org) => ({
      id: org.id,
      name: org.name,
      createdAt: org.createdAt,
      userCount: org._count.User,
      status: "ACTIVE", // You might want to add a status field to your schema
    }));

    return NextResponse.json(formattedOrganizations);
  } catch (error) {
    console.error("[ORGANIZATIONS_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
});

export const POST = requireSuperAdmin(async (req: NextRequest) => {
  try {
    const data = await req.json();
    const session = await getServerSession(authOptions);

    const organization = await prisma.organization.create({
      data: {
        name: data.name,
        // Add any additional fields
      },
    });

    // Audit log
    if (session?.user?.id) {
      await createAuditLog({
        userId: session.user.id,
        action: AuditActions.ORGANIZATION.CREATE,
        details: `Created organization ${organization.name}`,
        metadata: { organizationId: organization.id },
      });
    }

    return NextResponse.json(organization, { status: 201 });
  } catch (error) {
    console.error("[ORGANIZATION_CREATE_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
});

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tenants = await prisma.tenant.findMany({
      include: {
        leases: {
          include: {
            unit: {
              include: {
                property: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(tenants);
  } catch (error) {
    console.error("[TENANTS_GET]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    // Check if tenant with same first and last name exists in the same organization
    const existingTenant = await prisma.tenant.findFirst({
      where: {
        AND: [
          { firstName: data.firstName },
          { lastName: data.lastName },
          { organizationId: session.user.organizationId },
        ],
      },
    });

    if (existingTenant) {
      return NextResponse.json(
        { error: "A tenant with this name already exists" },
        { status: 400 }
      );
    }

    const tenant = await prisma.tenant.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || null,
        status: data.status,
        organizationId: session.user.organizationId,
      },
    });

    return NextResponse.json(tenant, { status: 201 });
  } catch (error) {
    console.error("[TENANT_CREATE]", error);
    return NextResponse.json(
      { error: "Failed to create tenant" },
      { status: 500 }
    );
  }
}

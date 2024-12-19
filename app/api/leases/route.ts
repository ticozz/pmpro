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

    const leases = await prisma.lease.findMany({
      where: {
        organizationId: session.user.organizationId,
      },
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
        tenants: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(leases);
  } catch (error) {
    console.error("[LEASES_GET]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("POST /api/leases - Start");

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    console.log("Received data:", data);

    // Format the data according to Prisma schema
    const createData = {
      unit: {
        connect: { id: data.unitId },
      },
      tenants: {
        connect: data.tenantIds.map((id: string) => ({ id })),
      },
      Organization: {
        connect: { id: session.user.organizationId },
      },
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      rentAmount: data.rentAmount,
      depositAmount: data.depositAmount,
      type: data.type,
      terms: data.terms,
      status: "ACTIVE" as const,
    };

    console.log("Creating lease with formatted data:", createData);

    const lease = await prisma.lease.create({
      data: createData,
      include: {
        unit: true,
        tenants: true,
      },
    });

    console.log("Lease created:", lease);
    return NextResponse.json(lease, { status: 201 });
  } catch (error) {
    console.error("[LEASE_CREATE]", error);
    // Add better error handling
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

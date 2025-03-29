import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { leaseSchema } from "@/lib/services/lease-validation";

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
            id: true,
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
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    console.log("Received lease data:", data);

    // Validate the data using the Zod schema
    const validatedData = leaseSchema.parse(data);

    // Check for overlapping leases
    const existingLeases = await prisma.lease.findMany({
      where: {
        unitId: validatedData.unitId,
        OR: [
          {
            AND: [
              { startDate: { lte: validatedData.endDate } },
              { endDate: { gte: validatedData.startDate } },
            ],
          },
        ],
        status: { notIn: ["EXPIRED", "TERMINATED"] },
      },
    });

    if (existingLeases.length > 0) {
      return NextResponse.json(
        { error: "Date range conflicts with existing leases" },
        { status: 400 }
      );
    }

    const lease = await prisma.lease.create({
      data: {
        organizationId: session.user.organizationId,
        unitId: validatedData.unitId,
        startDate: validatedData.startDate,
        endDate: validatedData.endDate,
        rentAmount: validatedData.rentAmount,
        depositAmount: validatedData.depositAmount,
        type: validatedData.type,
        terms: validatedData.terms,
        status: "ACTIVE",
        tenants: {
          connect: validatedData.tenantIds.map((id) => ({ id })),
        },
      },
    });

    return NextResponse.json(lease);
  } catch (error) {
    console.error("[LEASES_CREATE_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to create lease" },
      { status: 500 }
    );
  }
}

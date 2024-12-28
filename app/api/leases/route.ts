import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LeaseValidationService } from "@/lib/services/lease-validation";

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
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    console.log("Received lease data:", data);

    // Add organizationId from session
    const leaseData = {
      ...data,
      organizationId: session.user.organizationId,
    };

    // Validate dates
    const validation = await LeaseValidationService.validateLeaseDates(
      leaseData.unitId,
      new Date(leaseData.startDate),
      new Date(leaseData.endDate)
    );

    if (!validation.isValid) {
      return NextResponse.json({ error: validation.message }, { status: 400 });
    }

    // Determine initial status
    const initialStatus =
      new Date() < new Date(leaseData.startDate) ? "PENDING" : "ACTIVE";

    const lease = await prisma.lease.create({
      data: {
        startDate: new Date(leaseData.startDate),
        endDate: new Date(leaseData.endDate),
        rentAmount: parseFloat(leaseData.rentAmount),
        depositAmount: parseFloat(leaseData.depositAmount),
        type: leaseData.type,
        terms: leaseData.terms,
        status: initialStatus,
        unitId: leaseData.unitId,
        organizationId: leaseData.organizationId,
        tenants: {
          connect: leaseData.tenantIds.map((id: string) => ({ id })),
        },
      },
      include: {
        unit: true,
        tenants: true,
      },
    });

    // If lease is active, update unit status
    if (initialStatus === "ACTIVE") {
      await prisma.unit.update({
        where: { id: leaseData.unitId },
        data: { status: "OCCUPIED" },
      });
    }

    return NextResponse.json(lease);
  } catch (error) {
    console.error("[LEASES_CREATE_ERROR]", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create lease",
      },
      { status: 500 }
    );
  }
}

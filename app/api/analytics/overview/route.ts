import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PaymentStatus, UnitStatus, TenantStatus } from "@prisma/client";

export async function GET() {
  try {
    // Get total revenue
    const revenue = await prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: PaymentStatus.PAID,
        createdAt: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      },
    });

    // Get occupancy rate
    const units = await prisma.unit.findMany({
      select: {
        status: true,
      },
    });

    const occupiedUnits = units.filter(
      (unit) => unit.status === UnitStatus.OCCUPIED
    ).length;
    const occupancyRate = (occupiedUnits / units.length) * 100;

    // Get active tenants
    const activeTenants = await prisma.tenant.count({
      where: {
        status: TenantStatus.ACTIVE,
      },
    });

    return NextResponse.json({
      revenue: revenue._sum.amount || 0,
      occupancyRate: Math.round(occupancyRate),
      activeTenants,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}

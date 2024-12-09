import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PaymentStatus } from "@prisma/client";
import { startOfMonth, endOfMonth, subMonths, format } from "date-fns";

export async function GET() {
  try {
    // Get metrics
    const metrics = await prisma.$transaction(async (tx) => {
      const revenue = await tx.payment.aggregate({
        where: { status: PaymentStatus.PAID },
        _sum: { amount: true },
      });

      const units = await tx.unit.findMany({
        select: { status: true },
      });

      const activeTenants = await tx.tenant.count({
        where: { status: "ACTIVE" },
      });

      return {
        revenue: revenue._sum.amount || 0,
        occupancyRate:
          (units.filter((u) => u.status === "OCCUPIED").length / units.length) *
          100,
        activeTenants,
      };
    });

    // Get trends
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = subMonths(new Date(), i);
      return {
        start: startOfMonth(date),
        end: endOfMonth(date),
        label: format(date, "MMM yyyy"),
      };
    }).reverse();

    const trends = await Promise.all(
      months.map(async ({ start, end, label }) => ({
        date: label,
        revenue:
          (
            await prisma.payment.aggregate({
              where: {
                status: PaymentStatus.PAID,
                createdAt: { gte: start, lte: end },
              },
              _sum: { amount: true },
            })
          )._sum.amount || 0,
        occupancyRate: 85, // Placeholder - implement actual calculation if needed
      }))
    );

    return NextResponse.json({ metrics, trends });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}

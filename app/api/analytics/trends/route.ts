import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PaymentStatus, UnitStatus } from "@prisma/client";

export async function GET() {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    // Get monthly data
    const monthlyData = await prisma.$transaction(async (tx) => {
      const months = Array.from({ length: 6 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        return date;
      }).reverse();

      const occupancyRates = await Promise.all(
        months.map(async (date) => {
          const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
          const endOfMonth = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
          );

          const units = await tx.unit.findMany({
            where: {
              createdAt: {
                lte: endOfMonth,
              },
            },
            select: {
              status: true,
            },
          });

          const occupied = units.filter(
            (unit) => unit.status === UnitStatus.OCCUPIED
          ).length;
          return (occupied / units.length) * 100;
        })
      );

      const revenues = await Promise.all(
        months.map(async (date) => {
          const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
          const endOfMonth = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
          );

          const revenue = await tx.payment.aggregate({
            where: {
              status: PaymentStatus.PAID,
              createdAt: {
                gte: startOfMonth,
                lte: endOfMonth,
              },
            },
            _sum: {
              amount: true,
            },
          });

          return revenue._sum.amount || 0;
        })
      );

      return {
        dates: months.map((date) =>
          date.toLocaleString("default", { month: "short" })
        ),
        occupancyRate: occupancyRates,
        revenue: revenues,
      };
    });

    return NextResponse.json(monthlyData);
  } catch (error) {
    console.error("Error fetching trend data:", error);
    return NextResponse.json(
      { error: "Failed to fetch trend data" },
      { status: 500 }
    );
  }
}

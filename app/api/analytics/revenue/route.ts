import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PaymentStatus } from "@prisma/client";

export async function GET() {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const revenues = await prisma.payment.groupBy({
      by: ["createdAt"],
      _sum: {
        amount: true,
      },
      where: {
        status: "PAID",
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
    });

    // Process data for chart
    const monthlyData = revenues.reduce((acc, curr) => {
      const month = curr.createdAt.toLocaleString("default", {
        month: "short",
      });
      acc[month] = (acc[month] || 0) + (curr._sum.amount || 0);
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      labels: Object.keys(monthlyData),
      values: Object.values(monthlyData),
    });
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    return NextResponse.json(
      { error: "Failed to fetch revenue data" },
      { status: 500 }
    );
  }
}

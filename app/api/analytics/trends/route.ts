import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { PaymentStatus, UnitStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get last 6 months of data
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    // Get monthly revenue
    const monthlyRevenue = await prisma.payment.groupBy({
      by: ["createdAt"],
      where: {
        status: PaymentStatus.PAID,
        createdAt: {
          gte: sixMonthsAgo,
        },
        lease: {
          unit: {
            property: {
              manager: {
                id: session.user.id,
              },
            },
          },
        },
      },
      _sum: {
        amount: true,
      },
    });

    // Process data
    const dates = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return date.toLocaleString("default", { month: "short" });
    }).reverse();

    const revenue = dates.map(() => 0);
    const occupancyRate = dates.map(() => 0);

    // Fill in revenue data
    monthlyRevenue.forEach((entry) => {
      const monthIndex = dates.indexOf(
        entry.createdAt.toLocaleString("default", { month: "short" })
      );
      if (monthIndex !== -1) {
        revenue[monthIndex] = entry._sum?.amount || 0;
      }
    });

    return NextResponse.json({
      dates,
      revenue,
      occupancyRate,
    });
  } catch (error) {
    console.error("[TRENDS_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

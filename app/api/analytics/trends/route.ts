import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { PaymentStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { withOrganization } from "@/lib/api/middleware";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  return withOrganization(req, async () => {
    try {
      const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const organizationId = session.user.organizationId;

      // Get last 6 months of data
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      // Get monthly revenue
      const monthlyRevenue = await prisma.payment.groupBy({
        by: ["createdAt"],
        where: {
          status: PaymentStatus.COMPLETED,
          createdAt: {
            gte: sixMonthsAgo,
          },
          lease: {
            unit: {
              property: {
                organizationId: organizationId,
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
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  });
}

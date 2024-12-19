import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSuperAdmin } from "../../../../../lib/auth";
import { startOfMonth, subMonths, format } from "date-fns";

export const dynamic = "force-dynamic";

export const GET = requireSuperAdmin(async () => {
  try {
    // Get current metrics
    const [totalUsers, totalOrganizations, activeUsers, monthlyRevenue] =
      await Promise.all([
        prisma.user.count(),
        prisma.organization.count(),
        prisma.user.count({
          where: {
            lastLoginAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            },
          },
        }),
        prisma.subscription.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            status: "ACTIVE",
          },
        }),
      ]);

    // Get historical data for charts
    const last6Months = Array.from({ length: 6 })
      .map((_, i) => {
        const date = startOfMonth(subMonths(new Date(), i));
        return format(date, "yyyy-MM");
      })
      .reverse();

    const [userGrowth, organizationGrowth, revenueGrowth] = await Promise.all([
      // User growth by month
      Promise.all(
        last6Months.map(async (month) => {
          const [year, monthNum] = month.split("-");
          const count = await prisma.user.count({
            where: {
              createdAt: {
                gte: new Date(`${year}-${monthNum}-01`),
                lt: new Date(`${year}-${monthNum}-31`),
              },
            },
          });
          return { date: month, value: count };
        })
      ),

      // Organization growth by month
      Promise.all(
        last6Months.map(async (month) => {
          const [year, monthNum] = month.split("-");
          const count = await prisma.organization.count({
            where: {
              createdAt: {
                gte: new Date(`${year}-${monthNum}-01`),
                lt: new Date(`${year}-${monthNum}-31`),
              },
            },
          });
          return { date: month, value: count };
        })
      ),

      // Revenue growth by month
      Promise.all(
        last6Months.map(async (month) => {
          const [year, monthNum] = month.split("-");
          const result = await prisma.subscription.aggregate({
            _sum: {
              amount: true,
            },
            where: {
              createdAt: {
                gte: new Date(`${year}-${monthNum}-01`),
                lt: new Date(`${year}-${monthNum}-31`),
              },
              status: "ACTIVE",
            },
          });
          return {
            date: month,
            value: result._sum.amount || 0,
          };
        })
      ),
    ]);

    const metrics = {
      cards: {
        users: {
          title: "Total Users",
          value: totalUsers,
          description: "All registered users",
          trend: calculateTrend(userGrowth),
        },
        organizations: {
          title: "Organizations",
          value: totalOrganizations,
          description: "Total organizations",
          trend: calculateTrend(organizationGrowth),
        },
        revenue: {
          title: "Monthly Revenue",
          value: `$${(monthlyRevenue._sum.amount || 0).toLocaleString()}`,
          description: "Monthly recurring revenue",
          trend: calculateTrend(revenueGrowth),
        },
        activeUsers: {
          title: "Active Users",
          value: activeUsers,
          description: "Active in last 30 days",
        },
      },
      charts: {
        userGrowth,
        organizationGrowth,
        revenueGrowth,
      },
    };

    return NextResponse.json(metrics);
  } catch (error) {
    console.error("[ANALYTICS_METRICS_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
});

function calculateTrend(data: { value: number }[]): number {
  if (data.length < 2) return 0;
  const current = data[data.length - 1].value;
  const previous = data[data.length - 2].value;
  return previous === 0 ? 0 : ((current - previous) / previous) * 100;
}

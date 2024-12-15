import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PaymentStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { withOrganization } from "@/lib/api/middleware";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  return withOrganization(
    req,
    async (organizationId: string, req: NextRequest) => {
      try {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const revenue = await prisma.payment.aggregate({
          where: {
            status: PaymentStatus.COMPLETED,
            createdAt: { gte: startOfMonth },
            lease: {
              unit: {
                property: { organizationId },
              },
            },
          },
          _sum: { amount: true },
        });

        return NextResponse.json({
          revenue: revenue._sum?.amount || 0,
        });
      } catch (error) {
        console.error("[DASHBOARD_ERROR]", error);
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );
      }
    }
  );
};

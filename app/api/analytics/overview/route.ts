import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { PaymentStatus, UnitStatus } from "@prisma/client";
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

      // Get total properties
      const propertyCount = await prisma.property.count({
        where: {
          organization: { id: organizationId },
        },
      });

      // Get total units
      const unitCount = await prisma.unit.count({
        where: {
          property: {
            organization: { id: organizationId },
          },
        },
      });

      // Get occupied units
      const occupiedUnits = await prisma.unit.count({
        where: {
          property: {
            organization: { id: organizationId },
          },
          status: UnitStatus.OCCUPIED,
        },
      });

      // Get total revenue
      const revenue = await prisma.payment.aggregate({
        where: {
          status: PaymentStatus.COMPLETED,
          lease: {
            unit: {
              property: {
                organization: { id: organizationId },
              },
            },
          },
        },
        _sum: {
          amount: true,
        },
      });

      return NextResponse.json({
        properties: propertyCount,
        units: unitCount,
        occupiedUnits,
        revenue: revenue._sum?.amount || 0,
      });
    } catch (error) {
      console.error("[OVERVIEW_ERROR]", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  });
}

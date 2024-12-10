import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { PaymentStatus, UnitStatus, TenantStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get total revenue from paid payments
    const revenue = await prisma.payment.aggregate({
      where: {
        status: PaymentStatus.PAID,
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

    // Get occupancy rate
    const totalUnits = await prisma.unit.count({
      where: {
        property: {
          manager: {
            id: session.user.id,
          },
        },
      },
    });

    const occupiedUnits = await prisma.unit.count({
      where: {
        status: UnitStatus.OCCUPIED,
        property: {
          manager: {
            id: session.user.id,
          },
        },
      },
    });

    // Get active tenants count
    const activeTenants = await prisma.tenant.count({
      where: {
        status: TenantStatus.ACTIVE,
        leases: {
          some: {
            unit: {
              property: {
                manager: {
                  id: session.user.id,
                },
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      revenue: revenue._sum?.amount || 0,
      occupancyRate: totalUnits ? (occupiedUnits / totalUnits) * 100 : 0,
      activeTenants,
    });
  } catch (error) {
    console.error("[OVERVIEW_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { PaymentStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { withOrganization } from "@/lib/api/middleware";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const organizationId = session.user.organizationId;

    const revenue = await prisma.payment.aggregate({
      where: {
        status: PaymentStatus.COMPLETED,
        lease: {
          unit: {
            property: { organizationId },
          },
        },
      },
      _sum: {
        amount: true,
      },
    });

    return NextResponse.json({
      total: revenue._sum?.amount || 0,
    });
  } catch (error) {
    console.error("[REVENUE_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

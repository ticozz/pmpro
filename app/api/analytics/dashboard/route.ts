import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { PaymentStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!session.user?.organizationId) {
      throw new Error("No organization found for user");
    }

    // Get total revenue this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const revenue = await prisma.payment.aggregate({
      where: {
        status: PaymentStatus.PAID,
        createdAt: {
          gte: startOfMonth,
        },
        lease: {
          unit: {
            property: {
              manager: {
                organizationId: session.user.organizationId,
              },
            },
          },
        },
      },
      _sum: {
        amount: true,
      },
    });

    return NextResponse.json({
      revenue: revenue._sum?.amount || 0,
    });
  } catch (error) {
    console.error("[DASHBOARD_ERROR]", error);
    return new NextResponse(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Internal Server Error",
        stack:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.stack
              : undefined
            : undefined,
      }),
      { status: 500 }
    );
  }
}

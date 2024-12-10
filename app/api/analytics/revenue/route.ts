import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { PaymentStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get payments with PAID status
    const payments = await prisma.payment.findMany({
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
      select: {
        amount: true,
        createdAt: true,
      },
    });

    // Process data
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const values = labels.map(() => 0);

    payments.forEach((payment) => {
      const month = new Date(payment.createdAt).getMonth();
      if (month < labels.length) {
        values[month] += payment.amount;
      }
    });

    return NextResponse.json({ labels, values });
  } catch (error) {
    console.error("[REVENUE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

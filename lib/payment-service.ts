import { prisma } from "@/lib/prisma";
import { validateAuthSession } from "../lib/auth";
import { validateOrganizationAccess } from "../lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function processPayment(request: NextRequest, paymentData: any) {
  try {
    const session = await validateAuthSession(request);

    const payment = await prisma.payment.findUnique({
      where: { id: paymentData.id },
      include: {
        lease: {
          include: {
            unit: {
              include: {
                property: true,
              },
            },
          },
        },
      },
    });

    if (!payment) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "Payment not found",
        }),
        { status: 404 }
      );
    }

    // Validate organization access
    await validateOrganizationAccess(
      request,
      payment.lease.unit.property.organizationId
    );

    // Process payment logic here

    return NextResponse.json({
      status: "success",
      data: payment,
    });
  } catch (error) {
    console.error("Payment processing error:", error);
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error instanceof Error ? error.message : "An error occurred",
      }),
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";
import { handleAPIError, APIError } from "@/lib/api-error";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      throw new APIError("No signature", 400);
    }

    const body = await req.text();
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const { tenantId, leaseId } = paymentIntent.metadata;

        await prisma.payment.update({
          where: {
            id: paymentIntent.id,
          },
          data: {
            status: "COMPLETED",
            paidDate: new Date(),
          },
        });
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await prisma.payment.update({
          where: {
            id: paymentIntent.id,
          },
          data: {
            status: "FAILED",
          },
        });
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return handleAPIError(error);
  }
}

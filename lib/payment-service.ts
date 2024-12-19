import Stripe from "stripe";
import { APIError } from "./api-error";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

export class PaymentService {
  static async createPaymentIntent({
    amount,
    tenantId,
    leaseId,
  }: {
    amount: number;
    tenantId: string;
    leaseId: string;
  }) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          tenantId,
          leaseId,
        },
      });

      return paymentIntent;
    } catch (error) {
      throw new APIError(
        "Failed to create payment intent",
        500,
        "PAYMENT_INTENT_FAILED"
      );
    }
  }

  static async getPaymentStatus(paymentIntentId: string) {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );
      return paymentIntent.status;
    } catch (error) {
      throw new APIError(
        "Failed to get payment status",
        500,
        "PAYMENT_STATUS_FAILED"
      );
    }
  }
}

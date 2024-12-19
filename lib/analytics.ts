import { prisma } from "@/lib/prisma";

export async function trackEvent(params: {
  name: string;
  userId?: string;
  organizationId?: string;
  metadata?: Record<string, any>;
}) {
  try {
    await prisma.analyticsEvent.create({
      data: {
        name: params.name,
        userId: params.userId,
        organizationId: params.organizationId,
        metadata: params.metadata,
      },
    });
  } catch (error) {
    console.error("[ANALYTICS_TRACK_ERROR]", error);
  }
}

export const AnalyticsEvents = {
  USER: {
    LOGIN: "USER" as const,
    SIGNUP: "user.signup",
    INVITE_ACCEPTED: "user.invite_accepted",
  },
  ORGANIZATION: {
    CREATED: "ORGANIZATION" as const,
    UPDATED: "organization.updated",
    MEMBER_ADDED: "organization.member_added",
  },
  SUBSCRIPTION: {
    CREATED: "SUBSCRIPTION" as const,
    UPDATED: "subscription.updated",
    CANCELLED: "subscription.cancelled",
  },
} as const;

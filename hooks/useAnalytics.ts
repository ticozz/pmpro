import { trackEvent, AnalyticsEvents } from "@/lib/analytics";
import { useSession } from "next-auth/react";
import { useOrganization } from "@/hooks/useOrganization";

export function useAnalytics() {
  const { data: session } = useSession();
  const { organization } = useOrganization();

  const track = async (
    eventName: keyof typeof AnalyticsEvents,
    metadata?: Record<string, any>
  ) => {
    if (!session?.user?.id) return;

    await trackEvent({
      name: eventName,
      userId: session.user.id,
      organizationId: organization?.id,
      metadata,
    });
  };

  return { track };
}

import { createAuditLog, AuditActions } from "@/lib/audit";
import { useSession } from "next-auth/react";

export function useAuditLog() {
  const { data: session } = useSession();

  const log = async (
    action: keyof typeof AuditActions,
    details: string,
    metadata?: Record<string, any>
  ) => {
    if (!session?.user?.id) return;

    await createAuditLog({
      userId: session.user.id,
      action,
      details,
      metadata,
    });
  };

  return { log };
}

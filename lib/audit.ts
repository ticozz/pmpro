import { prisma } from "@/lib/prisma";

export async function createAuditLog(params: {
  userId: string;
  action: string;
  details: string;
  metadata?: Record<string, any>;
}) {
  try {
    await prisma.auditLog.create({
      data: {
        userId: params.userId,
        action: params.action,
        details: params.details,
        metadata: params.metadata,
      },
    });
  } catch (error) {
    console.error("[AUDIT_LOG_ERROR]", error);
  }
}

export const AuditActions = {
  USER: {
    CREATE: "user.create",
    UPDATE: "user.update",
    DELETE: "user.delete",
    LOGIN: "user.login",
    LOGOUT: "user.logout",
  },
  ORGANIZATION: {
    CREATE: "organization.create",
    UPDATE: "organization.update",
    DELETE: "organization.delete",
  },
  SETTINGS: {
    UPDATE: "settings.update",
  },
  FEATURE_FLAG: {
    UPDATE: "feature_flag.update",
  },
} as const;

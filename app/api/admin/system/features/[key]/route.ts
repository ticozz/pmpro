import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSuperAdmin } from "../../../../../../lib/auth";
import { createAuditLog, AuditActions } from "@/lib/audit";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

// Update to match Next.js route types
type RouteContext =
  | {
      params: Record<string, string>;
    }
  | undefined;

export const GET = requireSuperAdmin(
  async (req: NextRequest, context: RouteContext) => {
    if (!context?.params.key)
      return NextResponse.json({ error: "Invalid key" }, { status: 400 });

    try {
      const feature = await prisma.systemSetting.findFirst({
        where: {
          key: context.params.key,
          type: "feature",
        },
      });

      return NextResponse.json({
        enabled: feature?.value === "true",
      });
    } catch (error) {
      console.error("[FEATURE_GET_ERROR]", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
);

export const PATCH = requireSuperAdmin(
  async (req: NextRequest, context: RouteContext) => {
    if (!context?.params.key)
      return NextResponse.json({ error: "Invalid key" }, { status: 400 });

    try {
      const { enabled } = await req.json();
      const session = await getServerSession(authOptions);

      const feature = await prisma.systemSetting.upsert({
        where: {
          key: context.params.key,
        },
        update: {
          value: String(enabled),
        },
        create: {
          key: context.params.key,
          value: String(enabled),
          type: "feature",
        },
      });

      // Audit log
      if (session?.user?.id) {
        await createAuditLog({
          userId: session.user.id,
          action: AuditActions.FEATURE_FLAG.UPDATE,
          details: `Updated feature flag ${context.params.key} to ${enabled}`,
          metadata: { key: context.params.key, enabled },
        });
      }

      return NextResponse.json(feature);
    } catch (error) {
      console.error("[FEATURE_UPDATE_ERROR]", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
);

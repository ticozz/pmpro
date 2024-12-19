import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAuditLog, AuditActions } from "@/lib/audit";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";
export const GET = async () => {
  try {
    const features = await prisma.systemSetting.findMany({
      where: {
        type: "feature",
      },
    });

    const formattedFeatures = features.map((feature) => ({
      id: feature.id,
      key: feature.key,
      name: feature.description || feature.key,
      description: feature.description,
      enabled: feature.value === "true",
    }));

    return NextResponse.json(formattedFeatures);
  } catch (error) {
    console.error("[FEATURES_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const session = await getServerSession(authOptions);

    const feature = await prisma.systemSetting.create({
      data: {
        key: data.key,
        value: String(data.enabled),
        description: data.name,
        type: "feature",
      },
    });

    // Audit log
    if (session?.user?.id) {
      await createAuditLog({
        userId: session.user.id,
        action: AuditActions.FEATURE_FLAG.UPDATE,
        details: `Created feature flag ${data.key}`,
        metadata: data,
      });
    }

    return NextResponse.json(feature, { status: 201 });
  } catch (error) {
    console.error("[FEATURE_CREATE_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

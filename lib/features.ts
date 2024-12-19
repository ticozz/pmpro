import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function isFeatureEnabled(key: string): Promise<boolean> {
  try {
    const feature = await prisma.systemSetting.findFirst({
      where: {
        AND: [{ key }, { type: "feature" }],
      },
    } satisfies Prisma.SystemSettingFindFirstArgs);

    return feature?.value === "true";
  } catch (error) {
    console.error("[FEATURE_CHECK_ERROR]", error);
    return false;
  }
}

export async function getEnabledFeatures(): Promise<string[]> {
  try {
    const features = await prisma.systemSetting.findMany({
      where: {
        AND: [{ type: "feature" }, { value: "true" }],
      },
    });

    return features.map((f) => f.key);
  } catch (error) {
    console.error("[FEATURES_GET_ERROR]", error);
    return [];
  }
}

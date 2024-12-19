import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSuperAdmin } from "../../../../../lib/auth";

export const GET = requireSuperAdmin(async () => {
  try {
    const settings = await prisma.systemSetting.findMany();
    const formattedSettings = settings.reduce((acc, setting) => {
      acc[setting.key] =
        setting.type === "boolean"
          ? setting.value === "true"
          : setting.type === "number"
          ? Number(setting.value)
          : setting.value;
      return acc;
    }, {} as Record<string, any>);

    return NextResponse.json(formattedSettings);
  } catch (error) {
    console.error("[SETTINGS_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
});

export const PATCH = requireSuperAdmin(async (req: NextRequest) => {
  try {
    const updates = await req.json();

    for (const [key, value] of Object.entries(updates)) {
      await prisma.systemSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: {
          key,
          value: String(value),
          type: typeof value,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[SETTINGS_UPDATE_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
});

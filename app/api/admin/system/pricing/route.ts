import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSuperAdmin } from "../../../../../lib/auth";

export const dynamic = "force-dynamic";

export const GET = requireSuperAdmin(async () => {
  try {
    const plans = await prisma.pricingPlan.findMany({
      include: {
        features: true,
      },
    });
    return NextResponse.json(plans);
  } catch (error) {
    console.error("[PRICING_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
});

export const POST = requireSuperAdmin(async (req: NextRequest) => {
  try {
    const data = await req.json();
    const plan = await prisma.pricingPlan.create({
      data: {
        ...data,
        features: {
          create: data.features,
        },
      },
      include: {
        features: true,
      },
    });
    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    console.error("[PRICING_CREATE_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
});

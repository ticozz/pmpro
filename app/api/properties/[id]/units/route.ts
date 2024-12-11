import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();

    const unit = await prisma.unit.create({
      data: {
        unitNumber: body.number,
        status: body.status,
        size: body.size,
        rent: body.rent,
        bedrooms: body.bedrooms,
        bathrooms: body.bathrooms,
        propertyId: params.id,
      },
    });

    return NextResponse.json(unit);
  } catch (error) {
    console.error("[UNITS_POST]", error);
    return new NextResponse(
      JSON.stringify({
        error: "Failed to create unit",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 }
    );
  }
}

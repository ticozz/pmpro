import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      include: {
        address: true,
        manager: true,
        _count: {
          select: {
            units: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch properties" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { numberOfUnits, ...propertyData } = body;

    const property = await prisma.property.create({
      data: {
        name: propertyData.name,
        type: propertyData.type,
        status: propertyData.status,
        managerId: propertyData.managerId,
        address: {
          create: {
            street: propertyData.address.street,
            city: propertyData.address.city,
            state: propertyData.address.state,
            zipCode: propertyData.address.zipCode,
            country: propertyData.address.country,
          },
        },
      },
    });

    return NextResponse.json({ property, numberOfUnits });
  } catch (error) {
    console.error("[PROPERTIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

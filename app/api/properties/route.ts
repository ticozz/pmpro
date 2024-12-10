import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
    const data = await request.json();
    console.log("Creating property with data:", data);

    const property = await prisma.property.create({
      data: {
        name: data.name,
        type: data.type,
        status: data.status,
        managerId: data.managerId,
        address: {
          create: {
            street: data.address.street,
            city: data.address.city,
            state: data.address.state,
            zipCode: data.address.zipCode,
            country: data.address.country || "US",
          },
        },
      },
      include: {
        address: true,
      },
    });

    return NextResponse.json(property);
  } catch (error) {
    console.error("Error creating property:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Failed to create property",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

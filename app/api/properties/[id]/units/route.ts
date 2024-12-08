import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const propertyId = params.id;
    
    // Verify the property exists first
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      return new NextResponse(
        JSON.stringify({ error: "Property not found" }),
        { status: 404 }
      );
    }

    const data = await request.json();
    console.log('Creating unit for property:', propertyId, 'with data:', data);

    const unit = await prisma.unit.create({
      data: {
        unitNumber: data.unitNumber,
        type: data.type,
        size: data.size,
        rent: data.rent,
        status: data.status,
        propertyId: propertyId,
      },
    });

    return NextResponse.json(unit);
  } catch (error) {
    console.error("Error creating unit:", error);
    return new NextResponse(
      JSON.stringify({ 
        error: "Failed to create unit",
        details: error instanceof Error ? error.message : String(error)
      }),
      { status: 500 }
    );
  }
} 
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/index";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await request.json();

    // First check if property exists
    const existingProperty = await prisma.property.findUnique({
      where: { id: params.id },
      include: { address: true },
    });

    if (!existingProperty) {
      return new NextResponse("Property not found", { status: 404 });
    }

    // Update property and address in a transaction
    const property = await prisma.$transaction(async (tx) => {
      // Update or create address
      const address = await tx.address.upsert({
        where: {
          propertyId: params.id,
        },
        create: {
          street: data.address.street,
          city: data.address.city,
          state: data.address.state,
          zipCode: data.address.zipCode,
          country: data.address.country,
          propertyId: params.id,
        },
        update: {
          street: data.address.street,
          city: data.address.city,
          state: data.address.state,
          zipCode: data.address.zipCode,
          country: data.address.country,
        },
      });

      // Update property
      const updatedProperty = await tx.property.update({
        where: { id: params.id },
        data: {
          name: data.name,
          type: data.type,
          managerId: data.managerId,
        },
        include: {
          address: true,
        },
      });

      return updatedProperty;
    });

    return NextResponse.json(property);
  } catch (error) {
    console.error("[PROPERTY_UPDATE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

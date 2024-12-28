import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  validateAuthSession,
  validateOrganizationAccess,
} from "../../../../../lib/auth";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const propertyUpdateSchema = z.object({
  name: z.string().optional(),
  type: z.enum(["RESIDENTIAL", "COMMERCIAL", "MIXED"]).optional(),
  managerId: z.string().nullable(),
  address: z
    .object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      zipCode: z.string(),
      country: z.string(),
    })
    .optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { propertyId: string } }
) {
  try {
    const session = await validateAuthSession(request);

    const property = await prisma.property.findUnique({
      where: { id: params.propertyId },
      include: {
        address: true,
        units: {
          orderBy: {
            unitNumber: "asc",
          },
        },
      },
    });

    if (!property) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "Property not found",
        }),
        { status: 404 }
      );
    }

    // Validate organization access
    await validateOrganizationAccess(request, property.organizationId);

    return NextResponse.json(property);
  } catch (error) {
    console.error("Property fetch error:", error);
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error instanceof Error ? error.message : "An error occurred",
      }),
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await validateAuthSession(request);
    const data = await request.json();

    console.log("Update data received:", data);

    const property = await prisma.property.findUnique({
      where: { id: params.id },
      include: { address: true },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    await validateOrganizationAccess(request, property.organizationId);

    const updatedProperty = await prisma.property.update({
      where: { id: params.id },
      data: {
        name: data.name,
        type: data.type,
        address: {
          update: {
            where: { propertyId: params.id },
            data: {
              street: data.address.street,
              city: data.address.city,
              state: data.address.state,
              zipCode: data.address.zipCode,
              country: data.address.country,
            },
          },
        },
      },
      include: {
        address: true,
      },
    });

    return NextResponse.json(updatedProperty);
  } catch (error) {
    console.error("Property update error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to update property",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await validateAuthSession(request);

    const data = await request.json();
    const validatedData = propertyUpdateSchema.parse(data);

    const property = await prisma.property.findUnique({
      where: { id: params.id },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // Validate organization access
    await validateOrganizationAccess(request, property.organizationId);

    const updatedProperty = await prisma.property.update({
      where: { id: params.id },
      data: {
        name: validatedData.name,
        type: validatedData.type,
        address: {
          update: {
            street: validatedData.address?.street,
            city: validatedData.address?.city,
            state: validatedData.address?.state,
            zipCode: validatedData.address?.zipCode,
          },
        },
      },
    });

    return NextResponse.json(updatedProperty);
  } catch (error) {
    console.error("[PROPERTY_UPDATE_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to update property" },
      { status: 500 }
    );
  }
}

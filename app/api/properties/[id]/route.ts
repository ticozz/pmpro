import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const propertyUpdateSchema = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
  managerId: z.string().optional(),
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

export const GET = auth(async (req: NextRequest) => {
  try {
    const organizationId = req.headers.get("x-organization-id");
    if (!organizationId) throw new Error("Organization ID required");

    const id = req.url.split("/").pop();
    if (!id) throw new Error("Property ID required");

    const property = await prisma.property.findFirst({
      where: {
        id,
        organizationId,
      },
      include: {
        address: true,
        units: true,
        manager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error("[PROPERTY_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
});

export const PUT = auth(async (req: NextRequest) => {
  try {
    const organizationId = req.headers.get("x-organization-id");
    if (!organizationId) throw new Error("Organization ID required");

    const id = req.url.split("/").pop();
    if (!id) throw new Error("Property ID required");

    const data = await req.json();
    const validatedData = propertyUpdateSchema.parse(data);

    const property = await prisma.property.update({
      where: {
        id,
        organizationId,
      },
      data: validatedData,
      include: {
        address: true,
        manager: true,
      },
    });

    return NextResponse.json(property);
  } catch (error) {
    console.error("[PROPERTY_UPDATE_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
});

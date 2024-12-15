import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Handler, withOrganization } from "@/lib/api/middleware";
import { z } from "zod";

const propertySchema = z.object({
  name: z.string(),
  type: z.string(),
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

export async function GET(req: NextRequest) {
  return withOrganization(req, (async (
    organizationId: string,
    req: NextRequest
  ) => {
    try {
      const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const organizationId = session.user.organizationId;

      const properties = await prisma.property.findMany({
        where: {
          organizationId: organizationId,
        },
        include: {
          address: true,
          units: true,
          manager: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          _count: true,
        },
      });

      return NextResponse.json(properties);
    } catch (error) {
      console.error("[PROPERTIES_ERROR]", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }) as Handler);
}

export async function POST(req: NextRequest) {
  return withOrganization(req, async () => {
    try {
      const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const data = await req.json();
      const validatedData = propertySchema.parse(data);

      const propertyData = {
        name: validatedData.name,
        type: validatedData.type,
        organizationId: session.user.organizationId,
        managerId: validatedData.managerId || null,
        address: validatedData.address
          ? {
              create: {
                street: validatedData.address.street,
                city: validatedData.address.city,
                state: validatedData.address.state,
                zipCode: validatedData.address.zipCode,
                country: validatedData.address.country,
              },
            }
          : undefined,
      };

      const property = await prisma.property.create({
        data: propertyData,
        include: {
          address: true,
          manager: true,
        },
      });

      return NextResponse.json(
        {
          property,
          numberOfUnits: data.numberOfUnits,
        },
        { status: 201 }
      );
    } catch (error) {
      console.error("[PROPERTY_CREATE_ERROR]", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  });
}

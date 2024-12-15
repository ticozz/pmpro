import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { withOrganization } from "@/lib/api/middleware";

const unitSchema = z.object({
  unitNumber: z.string(),
  size: z.number().optional(),
  rent: z.number(),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  status: z.string(),
});

export async function GET(req: NextRequest) {
  return withOrganization(req, async () => {
    try {
      const organizationId = req.headers.get("x-organization-id");
      if (!organizationId) throw new Error("Organization ID required");

      const propertyId = req.url.split("/")[4];
      if (!propertyId) throw new Error("Property ID required");

      const units = await prisma.unit.findMany({
        where: {
          propertyId,
          property: { organizationId },
        },
        include: {
          property: true,
        },
      });

      return NextResponse.json(units);
    } catch (error) {
      console.error("[UNITS_GET_ERROR]", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return withOrganization(req, async (organizationId: string) => {
    try {
      const data = await req.json();
      console.log("Received unit data:", data);

      // Create single unit
      const unit = await prisma.unit.create({
        data: {
          unitNumber: data.number,
          status: data.status,
          size: data.size,
          rent: data.rent,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          propertyId: params.id,
          organizationId,
        },
      });

      console.log("Created unit:", unit);
      return NextResponse.json(unit, { status: 201 });
    } catch (error) {
      console.error("[UNITS_CREATE_ERROR]", error);
      return NextResponse.json(
        { error: "Failed to create unit" },
        { status: 500 }
      );
    }
  });
}

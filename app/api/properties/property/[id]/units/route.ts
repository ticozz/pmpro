import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { withOrganization } from "@/lib/api/middleware";

export async function GET(
  req: NextRequest,
  { params }: { params: { propertyId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const units = await prisma.unit.findMany({
      where: {
        propertyId: params.propertyId,
        property: {
          organizationId: session.user.organizationId,
        },
      },
      orderBy: {
        unitNumber: "asc",
      },
    });

    return NextResponse.json(units);
  } catch (error) {
    console.error("[UNITS_GET]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return withOrganization(req, async (organizationId: string) => {
    try {
      const data = await req.json();
      console.log("Received unit data:", data);
      console.log("PropertyId:", params.id);
      console.log("OrganizationId:", organizationId);

      const unit = await prisma.unit.create({
        data: {
          unitNumber: data.unitNumber,
          status: data.status,
          size: data.size,
          rent: data.rent,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          propertyId: params.id,
          organizationId,
        },
      });

      return NextResponse.json(unit, { status: 201 });
    } catch (error) {
      console.error("[UNITS_CREATE_ERROR]", error);
      return NextResponse.json(
        {
          error:
            error instanceof Error ? error.message : "Failed to create unit",
        },
        { status: 500 }
      );
    }
  });
}

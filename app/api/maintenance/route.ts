import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  MaintenanceStatus,
  MaintenanceCategory,
  Priority,
} from "@prisma/client";
import { z } from "zod";
import { withOrganization } from "@/lib/api/middleware";
import { Handler } from "@/lib/api/middleware";

const maintenanceSchema = z.object({
  title: z.string(),
  description: z.string(),
  priority: z.nativeEnum(Priority),
  unitId: z.string(),
});

export const GET = async (req: NextRequest) => {
  console.log("Maintenance GET - Headers:", {
    orgId: req.headers.get("x-organization-id"),
    userId: req.headers.get("x-user-id"),
  });

  return withOrganization(
    req,
    async (organizationId: string, req: NextRequest) => {
      try {
        console.log("Maintenance GET - Inside handler:", { organizationId });
        const maintenanceRequests = await prisma.maintenanceRequest.findMany({
          where: {
            unit: {
              property: { organizationId },
            },
          },
          include: {
            unit: {
              include: {
                property: true,
              },
            },
            requestedBy: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        });

        return NextResponse.json(maintenanceRequests);
      } catch (error) {
        console.error("[MAINTENANCE_GET_ERROR]", error);
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );
      }
    }
  );
};

export async function POST(req: NextRequest) {
  return withOrganization(req, (async (
    organizationId: string,
    req: NextRequest
  ) => {
    try {
      const userId = req.headers.get("x-user-id");
      if (!userId) throw new Error("User ID required");

      const data = await req.json();
      const validatedData = maintenanceSchema.parse(data);

      const unit = await prisma.unit.findFirst({
        where: {
          id: validatedData.unitId,
          property: { organizationId },
        },
      });

      if (!unit) {
        return NextResponse.json({ error: "Unit not found" }, { status: 404 });
      }

      const maintenanceRequest = await prisma.maintenanceRequest.create({
        data: {
          ...validatedData,
          status: MaintenanceStatus.OPEN,
          category: MaintenanceCategory.GENERAL,
          requestedById: userId,
        },
        include: {
          unit: {
            include: {
              property: true,
            },
          },
          requestedBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });

      return NextResponse.json(maintenanceRequest, { status: 201 });
    } catch (error) {
      console.error("[MAINTENANCE_CREATE_ERROR]", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }) as Handler);
}

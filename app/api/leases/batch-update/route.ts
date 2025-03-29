import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withOrganization } from "@/lib/api/middleware";

export async function POST(req: NextRequest) {
  return withOrganization(
    req,
    async (organizationId: string, req: NextRequest) => {
      try {
        // Get current date at start of day
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        console.log(
          "[LEASE_BATCH_UPDATE] Starting update at:",
          now.toISOString()
        );

        // First get all active leases to check their dates
        const activeLeases = await prisma.lease.findMany({
          where: {
            status: "ACTIVE",
            unit: {
              property: {
                organizationId,
              },
            },
          },
          select: {
            id: true,
            endDate: true,
            unitId: true,
            status: true,
          },
        });

        // Filter expired leases manually to ensure correct date comparison
        const expiredLeases = activeLeases.filter((lease) => {
          const endDate = new Date(lease.endDate);
          endDate.setHours(0, 0, 0, 0);
          return endDate.getTime() < now.getTime();
        });

        console.log(
          "[LEASE_BATCH_UPDATE] Found expired leases:",
          expiredLeases.map((l) => ({
            id: l.id,
            endDate: new Date(l.endDate).toISOString(),
            daysOverdue: Math.floor(
              (now.getTime() - new Date(l.endDate).getTime()) /
                (1000 * 60 * 60 * 24)
            ),
          }))
        );

        if (expiredLeases.length > 0) {
          await prisma.$transaction(async (tx) => {
            // Update all expired leases at once
            await tx.lease.updateMany({
              where: {
                id: {
                  in: expiredLeases.map((l) => l.id),
                },
              },
              data: {
                status: "EXPIRED",
              },
            });

            // Get unique unit IDs from expired leases
            const unitIds = Array.from(
              new Set(expiredLeases.map((l) => l.unitId))
            );

            // For each unit, check if it has any remaining active leases
            for (const unitId of unitIds) {
              const activeLeaseCount = await tx.lease.count({
                where: {
                  unitId,
                  status: "ACTIVE",
                  id: {
                    notIn: expiredLeases.map((l) => l.id),
                  },
                },
              });

              if (activeLeaseCount === 0) {
                await tx.unit.update({
                  where: { id: unitId },
                  data: { status: "VACANT" },
                });
              }
            }
          });
        }

        return NextResponse.json({
          success: true,
          processedLeases: expiredLeases.length,
          details: expiredLeases.map((l) => ({
            leaseId: l.id,
            endDate: new Date(l.endDate).toISOString(),
            daysOverdue: Math.floor(
              (now.getTime() - new Date(l.endDate).getTime()) /
                (1000 * 60 * 60 * 24)
            ),
          })),
        });
      } catch (error) {
        console.error("[LEASE_BATCH_UPDATE_ERROR]", error);
        return NextResponse.json(
          { error: "Failed to update lease statuses" },
          { status: 500 }
        );
      }
    }
  );
}

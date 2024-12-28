import { prisma } from "@/lib/prisma";
import { LeaseStatus, UnitStatus } from "@prisma/client";

export class LeaseStatusService {
  static async getLeaseStatus(lease: {
    startDate: Date | string;
    endDate: Date | string;
    organizationId: string;
  }): Promise<LeaseStatus> {
    const now = new Date();
    const startDate = new Date(lease.startDate);
    const endDate = new Date(lease.endDate);

    if (now < startDate) return "PENDING";
    if (now > endDate) return "EXPIRED";
    return "ACTIVE";
  }

  static async updateLeaseStatuses(organizationId: string): Promise<void> {
    const now = new Date();

    await prisma.$transaction(async (tx) => {
      // Update expired leases for this organization
      await tx.lease.updateMany({
        where: {
          organizationId,
          endDate: { lt: now },
          status: { not: "EXPIRED" },
        },
        data: { status: "EXPIRED" },
      });

      // Update active leases for this organization
      await tx.lease.updateMany({
        where: {
          organizationId,
          startDate: { lte: now },
          endDate: { gte: now },
          status: "PENDING",
        },
        data: { status: "ACTIVE" },
      });

      // Get all active leases for this organization
      const activeLeases = await tx.lease.findMany({
        where: {
          organizationId,
          status: "ACTIVE",
        },
        select: { unitId: true },
      });

      const activeUnitIds = activeLeases.map((lease) => lease.unitId);

      // Update unit statuses for this organization
      await tx.unit.updateMany({
        where: {
          organizationId,
          id: { in: activeUnitIds },
        },
        data: { status: "OCCUPIED" },
      });

      await tx.unit.updateMany({
        where: {
          organizationId,
          id: { notIn: activeUnitIds },
          status: "OCCUPIED",
        },
        data: { status: "VACANT" },
      });
    });
  }
}

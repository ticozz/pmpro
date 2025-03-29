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
    console.log("[LEASE_STATUS] Current time:", now);

    await prisma.$transaction(async (tx) => {
      // Update expired leases for this organization
      const expiredUpdates = await tx.lease.updateMany({
        where: {
          organizationId,
          endDate: { lt: now },
          status: { not: "EXPIRED" },
        },
        data: { status: "EXPIRED" },
      });
      console.log(
        "[LEASE_STATUS] Expired leases updated:",
        expiredUpdates.count
      );

      // Update pending leases to active
      const pendingLeases = await tx.lease.findMany({
        where: {
          organizationId,
          startDate: { lte: now },
          status: "PENDING",
        },
        select: {
          id: true,
          startDate: true,
          organizationId: true,
        },
      });
      console.log(
        "[LEASE_STATUS] Found pending leases:",
        pendingLeases.map((lease) => ({
          ...lease,
          startDate: new Date(lease.startDate),
          startDateISO: lease.startDate,
          isStartBeforeNow: new Date(lease.startDate) <= now,
        }))
      );

      const pendingUpdates = await tx.lease.updateMany({
        where: {
          organizationId,
          startDate: { lte: now },
          status: "PENDING",
        },
        data: { status: "ACTIVE" },
      });
      console.log(
        "[LEASE_STATUS] Pending leases updated:",
        pendingUpdates.count
      );

      // Get all active leases for this organization
      const activeLeases = await tx.lease.findMany({
        where: {
          organizationId,
          status: "ACTIVE",
        },
        select: {
          unitId: true,
        },
      });

      // Get unique unit IDs with active leases
      const unitIdsWithActiveLeases = Array.from(
        new Set(activeLeases.map((l) => l.unitId))
      );

      // Update unit statuses for this organization
      await tx.unit.updateMany({
        where: {
          organizationId,
          id: { in: unitIdsWithActiveLeases },
        },
        data: { status: "OCCUPIED" },
      });

      await tx.unit.updateMany({
        where: {
          organizationId,
          id: { notIn: unitIdsWithActiveLeases },
        },
        data: { status: "VACANT" },
      });
    });
  }
}

import { CronJob } from "cron";
import { prisma } from "@/lib/prisma";
import { LeaseStatusService } from "../services/lease-status";

// Run every day at midnight
export const leaseStatusJob = new CronJob(
  "0 0 * * *",
  async () => {
    console.log("Running lease status updates");

    // Get all organizations
    const organizations = await prisma.organization.findMany({
      select: { id: true },
    });

    // Update leases for each organization
    for (const org of organizations) {
      await LeaseStatusService.updateLeaseStatuses(org.id);
    }
  },
  null,
  false,
  "UTC"
);

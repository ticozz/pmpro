import { leaseStatusJob } from "@/lib/cron/lease-status";

// Start the cron job when the app initializes
leaseStatusJob.start();

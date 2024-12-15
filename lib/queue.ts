import Bull from "bull";

// Create separate queues for different organization tasks
export function createOrganizationQueue(organizationId: string) {
  return new Bull(`org:${organizationId}:tasks`, process.env.REDIS_URL!, {
    defaultJobOptions: {
      removeOnComplete: true,
      attempts: 3,
    },
  });
}

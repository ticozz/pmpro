import Bull from "bull";

const organizationJobs = new Bull("organization-jobs");

export const scheduleOrganizationTask = async (
  organizationId: string,
  task: string,
  data: any
) => {
  await organizationJobs.add(
    task,
    { organizationId, ...data },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 1000,
      },
    }
  );
};

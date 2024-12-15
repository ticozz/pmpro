import { client, v2 } from "@datadog/datadog-api-client";

const configuration = client.createConfiguration();
const apiInstance = new v2.MetricsApi(configuration);

export const metrics = {
  async trackOrganizationMetrics(organizationId: string, metrics: any) {
    const series = new v2.MetricSeries();
    series.metric = "organization.usage";
    series.type = "gauge";
    series.points = [[Math.floor(Date.now() / 1000), metrics.usage]];
    series.tags = [`org:${organizationId}`];

    const body = new v2.MetricPayload();
    body.series = [series];

    await apiInstance.submitMetrics({ body });
  },
};

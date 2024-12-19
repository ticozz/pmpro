import { MetricsDashboard } from "@/components/admin/analytics/metrics-dashboard";

export default function AnalyticsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
      <MetricsDashboard />
    </div>
  );
} 
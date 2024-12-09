import { Metadata } from 'next'
import { OverviewMetrics } from "@/components/dashboard/analytics/overview-metrics";
import { RevenueChart } from "@/components/dashboard/analytics/revenue-chart";
import { TrendAnalysis } from "@/components/dashboard/analytics/trend-analysis";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export const metadata: Metadata = {
  title: 'Dashboard | PropertyPro',
  description: 'Property management dashboard',
}

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <DashboardHeader />
      <OverviewMetrics />
      <div className="grid gap-6 md:grid-cols-2">
        <RevenueChart />
        <TrendAnalysis />
      </div>
    </div>
  );
} 
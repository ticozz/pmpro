import { Metadata } from 'next'
import { OverviewMetrics } from "@/components/dashboard/analytics/overview-metrics";
import { RevenueChart } from "@/components/dashboard/analytics/revenue-chart";
import { TrendAnalysis } from "@/components/dashboard/analytics/trend-analysis";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { designSystem } from '@/lib/design-system';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Dashboard | PropertyPro',
  description: 'Property management dashboard',
}

export default function DashboardPage() {
  return (
    <div className={cn(
      "space-y-6",
      designSystem.layout.container
    )}>
      <DashboardHeader />
      <OverviewMetrics />
      <div className="grid gap-6 md:grid-cols-2">
        <RevenueChart />
        <TrendAnalysis />
      </div>
    </div>
  );
} 
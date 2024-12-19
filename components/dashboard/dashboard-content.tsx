"use client";

import { OverviewMetrics } from "@/components/dashboard/analytics/overview-metrics";
import { RevenueChart } from "@/components/dashboard/analytics/revenue-chart";
import { TrendAnalysis } from "@/components/dashboard/analytics/trend-analysis";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { designSystem } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { useFeatureFlag } from "@/hooks/useFeatureFlag";

export function DashboardContent() {
  const { enabled: newUIEnabled } = useFeatureFlag("feature.new_ui");
  const { enabled: analyticsEnabled } = useFeatureFlag("feature.analytics");

  return (
    <div className={cn(
      "space-y-6",
      designSystem.layout.container
    )}>
      <DashboardHeader />
      {newUIEnabled ? (
        <div>New UI Content</div>
      ) : (
        <div>Legacy UI Content</div>
      )}
      {analyticsEnabled && (
        <OverviewMetrics />
      )}
      <div className="grid gap-6 md:grid-cols-2">
        {analyticsEnabled && (
          <RevenueChart />
        )}
        {analyticsEnabled && (
          <TrendAnalysis />
        )}
      </div>
    </div>
  );
} 
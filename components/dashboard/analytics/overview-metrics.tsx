'use client';

import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { MetricSkeleton } from "./loading-skeleton";
import { 
  BarChart, 
  TrendingUp, 
  Users, 
  Home,
  DollarSign 
} from "lucide-react";
import useSWR from 'swr';

interface OverviewMetric {
  label: string;
  value: number;
  trend: number;
  icon: React.ReactNode;
}

interface MetricsResponse {
  revenue: number;
  occupancyRate: number;
  activeTenants: number;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function OverviewMetrics() {
  const { data: metrics, error, isLoading } = useSWR<MetricsResponse>(
    '/api/analytics/overview', 
    fetcher, 
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      onError: (err) => {
        toast.error("Failed to load metrics", {
          description: err.message
        });
      }
    }
  );

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <MetricSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    toast.error("Error loading metrics");
    return <div>Failed to load metrics</div>;
  }

  const stats: OverviewMetric[] = [
    {
      label: "Total Revenue",
      value: metrics?.revenue || 0,
      trend: 12.5,
      icon: <DollarSign className="w-4 h-4" />
    },
    {
      label: "Occupancy Rate",
      value: metrics?.occupancyRate || 0,
      trend: 4.2,
      icon: <Home className="w-4 h-4" />
    },
    {
      label: "Active Tenants",
      value: metrics?.activeTenants || 0,
      trend: -2.4,
      icon: <Users className="w-4 h-4" />
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
              <h3 className="text-2xl font-bold mt-2">
                {typeof stat.value === 'number' 
                  ? stat.value.toLocaleString()
                  : stat.value}
              </h3>
            </div>
            <div className={`p-2 rounded-full ${
              stat.trend > 0 ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {stat.icon}
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className={`w-4 h-4 mr-2 ${
              stat.trend > 0 ? 'text-green-500' : 'text-red-500'
            }`} />
            <span className={
              stat.trend > 0 ? 'text-green-600' : 'text-red-600'
            }>
              {Math.abs(stat.trend)}% from last month
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LineChart, BarChart } from "@/components/ui/charts";
import { cn } from "@/lib/utils";
import { designSystem } from "@/lib/design-system";

interface MetricCard {
  title: string;
  value: string | number;
  description: string;
  trend?: number;
}

interface ChartData {
  date: string;
  value: number;
}

interface Metrics {
  cards: {
    users: MetricCard;
    organizations: MetricCard;
    revenue: MetricCard;
    activeUsers: MetricCard;
  };
  charts: {
    userGrowth: ChartData[];
    organizationGrowth: ChartData[];
    revenueGrowth: ChartData[];
  };
}

export function MetricsDashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/admin/analytics/metrics');
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!metrics) return <div>No data available</div>;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard {...metrics.cards.users} />
        <MetricCard {...metrics.cards.organizations} />
        <MetricCard {...metrics.cards.revenue} />
        <MetricCard {...metrics.cards.activeUsers} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New users over time</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={metrics.charts.userGrowth}
              xKey="date"
              yKey="value"
              className="h-[300px]"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Organization Growth</CardTitle>
            <CardDescription>New organizations over time</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={metrics.charts.organizationGrowth}
              xKey="date"
              yKey="value"
              className="h-[300px]"
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Growth</CardTitle>
            <CardDescription>Monthly recurring revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={metrics.charts.revenueGrowth}
              xKey="date"
              yKey="value"
              className="h-[300px]"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ title, value, description, trend }: MetricCard) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend !== undefined && (
          <div
            className={cn(
              "text-xs mt-2",
              trend > 0 ? "text-green-500" : "text-red-500"
            )}
          >
            {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </div>
        )}
      </CardContent>
    </Card>
  );
} 
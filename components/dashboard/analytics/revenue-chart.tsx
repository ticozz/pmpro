'use client';

import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { ChartSkeleton } from "./loading-skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import useSWR from 'swr';
import { CardWrapper } from "@/components/dashboard/analytics/card-wrapper";
import { designSystem } from '@/lib/design-system';
import { cn } from '@/lib/utils';

interface RevenueData {
  labels: string[];
  values: number[];
}

interface ChartDataPoint {
  name: string;
  revenue: number;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function RevenueChart() {
  const { data, error, isLoading } = useSWR<RevenueData>(
    '/api/analytics/revenue', 
    fetcher,
    {
      refreshInterval: 30000,
      onError: (err) => {
        toast.error("Failed to load revenue data", {
          description: err.message
        });
      }
    }
  );

  if (isLoading) return <ChartSkeleton />;

  if (error || !data) {
    return (
      <CardWrapper title="Monthly Revenue">
        <div className={cn(
          "text-center py-10",
          designSystem.colors.text.primary
        )}>
          Failed to load revenue data
        </div>
      </CardWrapper>
    );
  }

  const chartData: ChartDataPoint[] = data?.labels?.map((label: string, index: number) => ({
    name: label,
    revenue: data.values[index]
  })) || [];

  return (
    <CardWrapper title="Monthly Revenue">
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
            <XAxis 
              dataKey="name" 
              className={designSystem.colors.text.muted}
            />
            <YAxis className={designSystem.colors.text.muted} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
            <Legend />
            <Bar 
              dataKey="revenue" 
              fill={designSystem.colors.primary.gradient}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardWrapper>
  );
} 
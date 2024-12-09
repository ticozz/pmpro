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
      refreshInterval: 30000, // Refresh every 30 seconds
      onError: (err) => {
        toast.error("Failed to load revenue data", {
          description: err.message
        });
      }
    }
  );

  if (isLoading) return <ChartSkeleton />;

  if (error) {
    toast.error("Error loading revenue data");
    return <div>Failed to load revenue data</div>;
  }

  const chartData: ChartDataPoint[] = data?.labels.map((label: string, index: number) => ({
    name: label,
    revenue: data.values[index]
  })) || [];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
} 
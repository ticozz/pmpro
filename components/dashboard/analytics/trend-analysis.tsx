'use client';

import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { ChartSkeleton } from "./loading-skeleton";
import useSWR from 'swr';
import { toast } from "sonner";

interface TrendData {
  occupancyRate: number[];
  revenue: number[];
  dates: string[];
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function TrendAnalysis() {
  const { data, error, isLoading } = useSWR<TrendData>(
    '/api/analytics/trends',
    fetcher,
    {
      refreshInterval: 30000,
      onError: (err) => {
        toast.error("Failed to load trend data", {
          description: err.message
        });
      }
    }
  );

  if (isLoading) return <ChartSkeleton />;
  if (error) return <div>Failed to load trend data</div>;

  const chartData = data?.dates.map((date, index) => ({
    date,
    occupancyRate: data.occupancyRate[index],
    revenue: data.revenue[index]
  })) || [];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Performance Trends</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="occupancyRate"
              stroke="#8884d8"
              name="Occupancy Rate (%)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#82ca9d"
              name="Revenue ($)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
} 
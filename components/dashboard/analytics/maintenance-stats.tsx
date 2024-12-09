'use client';

import { Card } from "@/components/ui/card";
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
import { ChartSkeleton } from "./loading-skeleton";
import useSWR from 'swr';
import { toast } from "sonner";

interface MaintenanceData {
  category: string;
  open: number;
  inProgress: number;
  completed: number;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function MaintenanceStats() {
  const { data, error, isLoading } = useSWR<MaintenanceData[]>(
    '/api/analytics/maintenance',
    fetcher,
    {
      refreshInterval: 30000,
      onError: (err) => {
        toast.error("Failed to load maintenance data", {
          description: err.message
        });
      }
    }
  );

  if (isLoading) return <ChartSkeleton />;
  if (error) return <div>Failed to load maintenance data</div>;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Maintenance by Category</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="open" stackId="a" fill="#ff8042" name="Open" />
            <Bar dataKey="inProgress" stackId="a" fill="#ffbb28" name="In Progress" />
            <Bar dataKey="completed" stackId="a" fill="#00c49f" name="Completed" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
} 
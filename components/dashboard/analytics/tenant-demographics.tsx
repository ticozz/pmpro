'use client';

import { Card } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { ChartSkeleton } from "./loading-skeleton";
import useSWR from 'swr';
import { toast } from "sonner";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface DemographicsData {
  label: string;
  value: number;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function TenantDemographics() {
  const { data, error, isLoading } = useSWR<DemographicsData[]>(
    '/api/analytics/demographics',
    fetcher,
    {
      refreshInterval: 30000,
      onError: (err) => {
        toast.error("Failed to load demographics data", {
          description: err.message
        });
      }
    }
  );

  if (isLoading) return <ChartSkeleton />;
  if (error) return <div>Failed to load demographics data</div>;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Tenant Demographics</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
} 
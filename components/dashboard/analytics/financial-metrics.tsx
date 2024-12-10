'use client';

import { Card } from "@/components/ui/card";
import {
  AreaChart,
  Area,
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
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportToExcel, exportToPDF } from "../../../lib/export-utils";

interface FinancialData {
  date: string;
  income: number;
  expenses: number;
  profit: number;
  forecast: number;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function FinancialMetrics() {
  const { data, error, isLoading } = useSWR<FinancialData[]>(
    '/api/analytics/financials',
    fetcher,
    {
      refreshInterval: 30000,
      onError: (err) => {
        toast.error("Failed to load financial data", {
          description: err.message
        });
      }
    }
  );

  const handleExportExcel = () => {
    if (!data) return;
    exportToExcel(data, 'financial_metrics');
    toast.success("Exported to Excel");
  };

  const handleExportPDF = () => {
    if (!data) return;
    exportToPDF(data, 'Financial Metrics');
    toast.success("Exported to PDF");
  };

  if (isLoading) return <ChartSkeleton />;
  if (error) return <div>Failed to load financial data</div>;

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Financial Performance</h3>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={handleExportExcel}>
            <Download className="w-4 h-4 mr-2" />
            Excel
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportPDF}>
            <Download className="w-4 h-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="income"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="profit"
              stackId="2"
              stroke="#ffc658"
              fill="#ffc658"
            />
            <Area
              type="monotone"
              dataKey="forecast"
              stackId="2"
              stroke="#ff7300"
              fill="#ff7300"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
} 
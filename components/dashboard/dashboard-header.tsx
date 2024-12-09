'use client';

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportToExcel, exportToPDF } from "@/lib/export-utils";
import { toast } from "sonner";
import useSWR from 'swr';

interface DashboardData {
  metrics: {
    revenue: number;
    occupancyRate: number;
    activeTenants: number;
  };
  trends: {
    date: string;
    revenue: number;
    occupancyRate: number;
  }[];
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function DashboardHeader() {
  const { data, error } = useSWR<DashboardData>('/api/analytics/dashboard', fetcher, {
    onError: (err) => {
      toast.error("Failed to load dashboard data");
    }
  });

  const handleExportExcel = () => {
    try {
      if (!data) {
        toast.error("No data available to export");
        return;
      }
      exportToExcel(data.trends, 'dashboard_analytics');
      toast.success("Exported to Excel");
    } catch (error) {
      toast.error("Failed to export data");
    }
  };

  const handleExportPDF = () => {
    try {
      if (!data) {
        toast.error("No data available to export");
        return;
      }
      exportToPDF(data.trends, 'Dashboard Analytics');
      toast.success("Exported to PDF");
    } catch (error) {
      toast.error("Failed to export data");
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Your property management analytics overview
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={handleExportExcel}>
          <Download className="w-4 h-4 mr-2" />
          Export Excel
        </Button>
        <Button variant="outline" size="sm" onClick={handleExportPDF}>
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </div>
    </div>
  );
} 
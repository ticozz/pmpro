"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, DollarSign, Calendar, AlertCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";

interface LeaseStatsProps {
  leases: any[];
  totalUnits: number;
}

export function LeaseStats({ leases, totalUnits }: LeaseStatsProps) {
  const totalLeases = leases.length;
  const activeLeases = leases.filter(lease => lease.status === "ACTIVE").length;
  const totalRentRevenue = leases
    .filter(lease => lease.status === "ACTIVE")
    .reduce((sum, lease) => sum + lease.rentAmount, 0);
  
  // Get unique unit IDs with active leases
  const occupiedUnitIds = new Set(
    leases
      .filter(lease => lease.status === "ACTIVE")
      .map(lease => lease.unitId)
  );
  const occupancyRate = totalUnits ? Math.round((occupiedUnitIds.size / totalUnits) * 100) : 0;

  const expiringLeases = leases.filter(lease => {
    const endDate = new Date(lease.endDate);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return endDate <= thirtyDaysFromNow && lease.status === "ACTIVE";
  }).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Leases</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalLeases}</div>
          <p className="text-xs text-muted-foreground">
            {activeLeases} active leases
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalRentRevenue)}</div>
          <p className="text-xs text-muted-foreground">
            From active leases
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{expiringLeases}</div>
          <p className="text-xs text-muted-foreground">
            In the next 30 days
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{occupancyRate}%</div>
          <p className="text-xs text-muted-foreground">
            Of total units
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 
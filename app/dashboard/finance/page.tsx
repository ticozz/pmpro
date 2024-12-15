"use client";

import dynamic from "next/dynamic";
import DashboardLayout from "@/components/layouts/dashboard-layout";

// Dynamically import heavy components
const FinanceOverview = dynamic(() => 
  import("@/components/finance/financial-overview").then(mod => mod.FinancialOverview),
  { ssr: false }
);

const RevenueChart = dynamic(() => 
  import("@/components/finance/revenue-chart").then(mod => mod.RevenueChart),
  { ssr: false }
);

export default function FinancePage() {
  return (
    <>
      <FinanceOverview />
      <RevenueChart />
    </>
  );
} 
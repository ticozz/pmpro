import { Metadata } from "next";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { TransactionList } from "@/components/finance/transaction-list";
import { ExpenseBreakdown } from "@/components/finance/expense-breakdown";

export const metadata: Metadata = {
  title: "Finance",
  description: "Manage your property finances",
};

export default function FinancePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Finance</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <ExpenseBreakdown />
        <TransactionList />
      </div>
    </div>
  );
} 
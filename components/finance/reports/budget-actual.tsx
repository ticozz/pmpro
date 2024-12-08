'use client';
import React from 'react';
import { Card } from '@/components/ui/card';
import { Selectui, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface BudgetItem {
  category: string;
  budgeted: number;
  actual: number;
  variance: number;
  percentageVariance: number;
}

interface BudgetActualProps {
  period: string;
  revenue: BudgetItem[];
  expenses: BudgetItem[];
}

export function BudgetActual({ period, revenue, expenses }: BudgetActualProps) {
  const totalBudgeted = {
    revenue: revenue.reduce((sum, item) => sum + item.budgeted, 0),
    expenses: expenses.reduce((sum, item) => sum + item.budgeted, 0),
  };

  const totalActual = {
    revenue: revenue.reduce((sum, item) => sum + item.actual, 0),
    expenses: expenses.reduce((sum, item) => sum + item.actual, 0),
  };

  const netBudgeted = totalBudgeted.revenue - totalBudgeted.expenses;
  const netActual = totalActual.revenue - totalActual.expenses;
  const netVariance = netActual - netBudgeted;
  const netVariancePercentage = (netVariance / Math.abs(netBudgeted)) * 100;

  const renderBudgetSection = (items: BudgetItem[], title: string) => (
    <div>
      <h3 className="text-base font-medium mb-3">{title}</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-5 gap-4 text-sm">
            <span className="col-span-1">{item.category}</span>
            <span className="text-right">{formatCurrency(item.budgeted)}</span>
            <span className="text-right">{formatCurrency(item.actual)}</span>
            <span className="text-right">
              {formatCurrency(item.variance)}
            </span>
            <span className={`text-right ${
              item.percentageVariance >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {item.percentageVariance.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold">Budget vs Actual</h2>
            <p className="text-sm text-gray-500">{period}</p>
          </div>
          <div className="flex gap-2">
            <Selectui>
              <SelectTrigger>
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { label: 'Current Month', value: 'current' },
                  { label: 'Last Month', value: 'last' },
                  { label: 'Year to Date', value: 'ytd' },
                ].map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Selectui>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-600 border-b pb-2">
            <span className="col-span-1">Category</span>
            <span className="text-right">Budgeted</span>
            <span className="text-right">Actual</span>
            <span className="text-right">Variance</span>
            <span className="text-right">Variance %</span>
          </div>

          {renderBudgetSection(revenue, 'Revenue')}
          
          <div className="border-t pt-2">
            <div className="grid grid-cols-5 gap-4 text-sm font-medium">
              <span className="col-span-1">Total Revenue</span>
              <span className="text-right">{formatCurrency(totalBudgeted.revenue)}</span>
              <span className="text-right">{formatCurrency(totalActual.revenue)}</span>
              <span className="text-right">{formatCurrency(totalActual.revenue - totalBudgeted.revenue)}</span>
              <span className="text-right">
                {((totalActual.revenue - totalBudgeted.revenue) / Math.abs(totalBudgeted.revenue) * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          {renderBudgetSection(expenses, 'Expenses')}
          
          <div className="border-t pt-2">
            <div className="grid grid-cols-5 gap-4 text-sm font-medium">
              <span className="col-span-1">Total Expenses</span>
              <span className="text-right">{formatCurrency(totalBudgeted.expenses)}</span>
              <span className="text-right">{formatCurrency(totalActual.expenses)}</span>
              <span className="text-right">{formatCurrency(totalActual.expenses - totalBudgeted.expenses)}</span>
              <span className="text-right">
                {((totalActual.expenses - totalBudgeted.expenses) / Math.abs(totalBudgeted.expenses) * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="grid grid-cols-5 gap-4 text-base font-semibold">
              <span className="col-span-1">Net Income</span>
              <span className="text-right">{formatCurrency(netBudgeted)}</span>
              <span className="text-right">{formatCurrency(netActual)}</span>
              <span className="text-right">{formatCurrency(netVariance)}</span>
              <span className={`text-right ${
                netVariancePercentage >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {netVariancePercentage.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
} 
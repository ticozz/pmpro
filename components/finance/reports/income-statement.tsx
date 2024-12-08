'use client';
import React from 'react';
import { Card } from '@/components/ui/card';
import { Selectui, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface IncomeStatementProps {
  period: string;
  data: {
    revenue: {
      rent: number;
      lateFees: number;
      otherIncome: number;
    };
    expenses: {
      maintenance: number;
      utilities: number;
      insurance: number;
      propertyTax: number;
      management: number;
      other: number;
    };
  };
}

export function IncomeStatement({ period, data }: IncomeStatementProps) {
  const totalRevenue = Object.values(data.revenue).reduce((a, b) => a + b, 0);
  const totalExpenses = Object.values(data.expenses).reduce((a, b) => a + b, 0);
  const netIncome = totalRevenue - totalExpenses;

  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold">Income Statement</h2>
            <p className="text-sm text-gray-500">{period}</p>
          </div>
          <div className="flex gap-2">
            <Selectui>
              <SelectTrigger>
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { label: 'Last Month', value: 'last-month' },
                  { label: 'Last Quarter', value: 'last-quarter' },
                  { label: 'Year to Date', value: 'ytd' },
                  { label: 'Last Year', value: 'last-year' },
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

        <div className="space-y-6">
          {/* Revenue Section */}
          <div>
            <h3 className="text-base font-medium mb-3">Revenue</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Rental Income</span>
                <span>{formatCurrency(data.revenue.rent)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Late Fees</span>
                <span>{formatCurrency(data.revenue.lateFees)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Other Income</span>
                <span>{formatCurrency(data.revenue.otherIncome)}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Total Revenue</span>
                <span>{formatCurrency(totalRevenue)}</span>
              </div>
            </div>
          </div>

          {/* Expenses Section */}
          <div>
            <h3 className="text-base font-medium mb-3">Expenses</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Maintenance & Repairs</span>
                <span>{formatCurrency(data.expenses.maintenance)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Utilities</span>
                <span>{formatCurrency(data.expenses.utilities)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Insurance</span>
                <span>{formatCurrency(data.expenses.insurance)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Property Tax</span>
                <span>{formatCurrency(data.expenses.propertyTax)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Management Fees</span>
                <span>{formatCurrency(data.expenses.management)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Other Expenses</span>
                <span>{formatCurrency(data.expenses.other)}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Total Expenses</span>
                <span>{formatCurrency(totalExpenses)}</span>
              </div>
            </div>
          </div>

          {/* Net Income */}
          <div className="flex justify-between text-lg font-semibold pt-4 border-t">
            <span>Net Income</span>
            <span className={netIncome >= 0 ? 'text-green-600' : 'text-red-600'}>
              {formatCurrency(netIncome)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
} 
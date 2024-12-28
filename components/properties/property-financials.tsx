import React from 'react';
import { Card } from '@/components/ui/card';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { useAuthContext } from '@/components/providers/auth-provider';

interface PropertyFinancialsProps {
  property: any; // Replace with proper type
}

export function PropertyFinancials({ property }: PropertyFinancialsProps) {
  const { user } = useAuthContext();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
                <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="mt-2 text-3xl font-semibold">
              ${property.financials?.revenue.toLocaleString() ?? 0}
            </p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
                <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
              </div>
              <TrendingDown className="w-4 h-4 text-red-500" />
            </div>
            <p className="mt-2 text-3xl font-semibold">
              ${property.financials?.expenses.toLocaleString() ?? 0}
            </p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
                <h3 className="text-sm font-medium text-gray-500">Net Income</h3>
              </div>
              {(property.financials?.revenue ?? 0) > (property.financials?.expenses ?? 0) ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
            </div>
            <p className="mt-2 text-3xl font-semibold">
              ${((property.financials?.revenue ?? 0) - (property.financials?.expenses ?? 0)).toLocaleString()}
            </p>
          </div>
        </Card>
      </div>

      {/* Add more financial details like transactions, budgets, etc. */}
    </div>
  );
} 
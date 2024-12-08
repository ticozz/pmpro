'use client';
import React from 'react';
import { Card } from '@/components/ui/card';
import { DollarSign, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const stats = [
  {
    name: 'Total Revenue',
    value: 125000,
    trend: '+12.5%',
    trendType: 'up',
    description: 'vs last month',
  },
  {
    name: 'Total Expenses',
    value: 45000,
    trend: '+5.2%',
    trendType: 'up',
    description: 'vs last month',
  },
  {
    name: 'Net Income',
    value: 80000,
    trend: '+15.3%',
    trendType: 'up',
    description: 'vs last month',
  },
  {
    name: 'Outstanding Balance',
    value: 15000,
    trend: '-2.3%',
    trendType: 'down',
    description: 'vs last month',
  },
];

export function FinancialOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.name}>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold mt-1">
                  {formatCurrency(stat.value)}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${
                stat.trendType === 'up' ? 'bg-green-50' : 'bg-red-50'
              }`}>
                {stat.trendType === 'up' ? (
                  <TrendingUp className="w-6 h-6 text-green-600" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-red-600" />
                )}
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className={`font-medium ${
                stat.trendType === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend}
              </span>
              <span className="text-gray-600 ml-2">{stat.description}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
} 
'use client';
import React from 'react';
import { Card } from '@/components/ui/card';
import { Selectui, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '@/lib/utils';

const data = [  
  { month: 'Jan', revenue: 42000, expenses: 28000 },
  { month: 'Feb', revenue: 45000, expenses: 29000 },
  { month: 'Mar', revenue: 48000, expenses: 30000 },
  { month: 'Apr', revenue: 47000, expenses: 31000 },
  { month: 'May', revenue: 51000, expenses: 32000 },
  { month: 'Jun', revenue: 55000, expenses: 33000 },
  { month: 'Jul', revenue: 58000, expenses: 34000 },
  { month: 'Aug', revenue: 57000, expenses: 35000 },
  { month: 'Sep', revenue: 60000, expenses: 36000 },
  { month: 'Oct', revenue: 63000, expenses: 37000 },
  { month: 'Nov', revenue: 65000, expenses: 38000 },
  { month: 'Dec', revenue: 68000, expenses: 39000 },
];

export function RevenueChart() {
  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Revenue vs Expenses</h2>
          <Selectui>
            <SelectTrigger>
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              {[
                { label: 'Last 12 Months', value: '12' },
                { label: 'Last 6 Months', value: '6' },
                { label: 'Last 3 Months', value: '3' },
              ].map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Selectui>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) => formatCurrency(value).split('.')[0]}
              />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                name="Revenue"
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                name="Expenses"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
} 
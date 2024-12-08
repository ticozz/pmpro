'use client';
import React from 'react';
import { Card } from '@/components/ui/card';
import {
  Selectui,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { formatCurrency } from '@/lib/utils';

const data = [
  { name: 'Maintenance', value: 15000, color: '#3b82f6' },
  { name: 'Utilities', value: 8000, color: '#ef4444' },
  { name: 'Insurance', value: 5000, color: '#10b981' },
  { name: 'Property Tax', value: 7000, color: '#f59e0b' },
  { name: 'Management', value: 4000, color: '#6366f1' },
  { name: 'Other', value: 3000, color: '#8b5cf6' },
];

const total = data.reduce((sum, item) => sum + item.value, 0);

export function ExpenseBreakdown() {
  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Expense Breakdown</h2>
          <Selectui>
            <SelectTrigger>
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              {[
                { label: 'Last Month', value: '1' },
                { label: 'Last 3 Months', value: '3' },
                { label: 'Last 6 Months', value: '6' },
                { label: 'Last 12 Months', value: '12' },
              ].map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Selectui>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            {data.map((item) => (
              <div key={item.name} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {formatCurrency(item.value)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {((item.value / total) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
} 
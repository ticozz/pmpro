'use client';
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Selectui, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, Download } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  property: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-03-15',
    description: 'Monthly Rent - Unit 101',
    amount: 2500,
    type: 'INCOME',
    category: 'Rent',
    property: 'Sunset Apartments',
    status: 'COMPLETED',
  },
  // Add more mock transactions...
];

const statusColors = {
  COMPLETED: 'text-green-600 bg-green-50',
  PENDING: 'text-yellow-600 bg-yellow-50',
  FAILED: 'text-red-600 bg-red-50',
};

export function TransactionList() {
  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Input
            placeholder="Search transactions..."
          />
          <Selectui>
            <SelectTrigger>
              <SelectValue placeholder="Transaction Type" />
            </SelectTrigger>
            <SelectContent>
              {[
                { label: 'All Types', value: '' },
                { label: 'Income', value: 'INCOME' },
                { label: 'Expense', value: 'EXPENSE' },
              ].map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Selectui>
          <Selectui>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {[
                { label: 'All Status', value: '' },
                { label: 'Completed', value: 'COMPLETED' },
                { label: 'Pending', value: 'PENDING' },
                { label: 'Failed', value: 'FAILED' },
              ].map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Selectui>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Property</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Category</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-200">
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {transaction.property}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {transaction.category}
                  </td>
                  <td className={`px-4 py-4 text-sm text-right ${
                    transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'INCOME' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusColors[transaction.status]
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
} 
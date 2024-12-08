'use client';
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, Download, Eye, FileText } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  tenant: {
    name: string;
    unit: string;
  };
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    date: '2024-03-01',
    dueDate: '2024-03-15',
    amount: 2500,
    status: 'PAID',
    tenant: {
      name: 'John Doe',
      unit: 'Unit 101',
    },
  },
  // Add more mock invoices...
];

const statusColors = {
  PAID: 'text-green-600 bg-green-50',
  PENDING: 'text-yellow-600 bg-yellow-50',
  OVERDUE: 'text-red-600 bg-red-50',
};

export function InvoiceList() {
  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Invoices</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button>
              <FileText className="w-4 h-4 mr-2" />
              New Invoice
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Input
            placeholder="Search invoices..."
          />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {[
                { label: 'All Status', value: '' },
                { label: 'Paid', value: 'PAID' },
                { label: 'Pending', value: 'PENDING' },
                { label: 'Overdue', value: 'OVERDUE' },
              ].map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              {[
                { label: 'Last 30 Days', value: '30' },
                { label: 'Last 60 Days', value: '60' },
                { label: 'Last 90 Days', value: '90' },
              ].map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Invoice #</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tenant</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Due Date</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-200">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {invoice.invoiceNumber}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    <div>{invoice.tenant.name}</div>
                    <div className="text-xs text-gray-500">{invoice.tenant.unit}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {formatDate(invoice.date)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {formatDate(invoice.dueDate)}
                  </td>
                  <td className="px-4 py-4 text-sm text-right font-medium">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusColors[invoice.status]
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
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
'use client';
import React from 'react';
import { Card } from '@/components/ui/card';
import { Selectui, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Download, Calendar, DollarSign, AlertCircle, FileText, FileSpreadsheet } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PaymentRecord {
  id: string;
  tenant: {
    id: string;
    name: string;
    unit: string;
    property: string;
  };
  dueDate: string;
  paidDate: string | null;
  amount: number;
  status: 'PAID' | 'LATE' | 'PENDING' | 'OVERDUE';
  lateFee: number;
  paymentMethod: string;
  notes?: string;
}

interface TenantPaymentHistoryProps {
  payments: PaymentRecord[];
}

interface ExportData {
  tenant: string;
  property: string;
  unit: string;
  dueDate: string;
  paidDate: string;
  amount: string;
  lateFee: string;
  status: string;
  paymentMethod: string;
}

export function TenantPaymentHistory({ payments }: TenantPaymentHistoryProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('ALL');

  const statusColors = {
    PAID: 'text-green-600 bg-green-50',
    LATE: 'text-yellow-600 bg-yellow-50',
    PENDING: 'text-blue-600 bg-blue-50',
    OVERDUE: 'text-red-600 bg-red-50',
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = searchTerm === '' || 
      payment.tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.tenant.unit.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totals = {
    expected: payments.reduce((sum, p) => sum + p.amount, 0),
    received: payments.reduce((sum, p) => p.status === 'PAID' ? sum + p.amount : sum, 0),
    lateFees: payments.reduce((sum, p) => sum + p.lateFee, 0),
  };

  const prepareExportData = (): ExportData[] => {
    return filteredPayments.map(payment => ({
      tenant: payment.tenant.name,
      property: payment.tenant.property,
      unit: payment.tenant.unit,
      dueDate: formatDate(payment.dueDate),
      paidDate: payment.paidDate ? formatDate(payment.paidDate) : '',
      amount: formatCurrency(payment.amount),
      lateFee: payment.lateFee > 0 ? formatCurrency(payment.lateFee) : '',
      status: payment.status,
      paymentMethod: payment.paymentMethod,
    }));
  };

  const exportToCSV = () => {
    const data = prepareExportData();
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header as keyof ExportData]}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `payment_history_${formatDate(new Date())}.csv`;
    link.click();
  };

  const exportToXLSX = async () => {
    const data = prepareExportData();
    try {
      const XLSX = await import('xlsx');
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Payment History');
      XLSX.writeFile(workbook, `payment_history_${formatDate(new Date())}.xlsx`);
    } catch (error) {
      console.error('Error exporting to XLSX:', error);
    }
  };

  const exportToPDF = async () => {
    const data = prepareExportData();
    try {
      const { jsPDF } = await import('jspdf');
      const autoTable = (await import('jspdf-autotable')).default;
      
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(16);
      doc.text('Payment History Report', 14, 15);
      doc.setFontSize(10);
      doc.text(`Generated on ${formatDate(new Date())}`, 14, 25);

      // Add summary
      doc.text(`Total Expected: ${formatCurrency(totals.expected)}`, 14, 35);
      doc.text(`Total Received: ${formatCurrency(totals.received)}`, 14, 42);
      doc.text(`Total Late Fees: ${formatCurrency(totals.lateFees)}`, 14, 49);

      // Add table
      autoTable(doc, {
        head: [Object.keys(data[0])],
        body: data.map(row => Object.values(row)),
        startY: 60,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [59, 130, 246] }, // Blue color
      });

      doc.save(`payment_history_${formatDate(new Date())}.pdf`);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
    }
  };

  // Replace the existing export button with this dropdown
  const ExportButton = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportToCSV}>
          <FileText className="w-4 h-4 mr-2" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToXLSX}>
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          Export as Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToPDF}>
          <FileText className="w-4 h-4 mr-2" />
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold">Payment History</h2>
            <p className="text-sm text-gray-500">Track tenant payment records</p>
          </div>
          <ExportButton />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-600">Expected Rent</h3>
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <p className="mt-2 text-2xl font-semibold">
                {formatCurrency(totals.expected)}
              </p>
              <p className="mt-1 text-sm text-gray-500">Total for period</p>
            </div>
          </Card>

          <Card>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-600">Received</h3>
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <p className="mt-2 text-2xl font-semibold">
                {formatCurrency(totals.received)}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {((totals.received / totals.expected) * 100).toFixed(1)}% collected
              </p>
            </div>
          </Card>

          <Card>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-600">Late Fees</h3>
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <p className="mt-2 text-2xl font-semibold">
                {formatCurrency(totals.lateFees)}
              </p>
              <p className="mt-1 text-sm text-gray-500">Additional charges</p>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <Input
            placeholder="Search tenants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Selectui onValueChange={setStatusFilter} value={statusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Payment Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="PAID">Paid</SelectItem>
              <SelectItem value="LATE">Late</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="OVERDUE">Overdue</SelectItem>
            </SelectContent>
          </Selectui>
          <Selectui onValueChange={setStatusFilter} value={statusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">Last 30 Days</SelectItem>
              <SelectItem value="60">Last 60 Days</SelectItem>
              <SelectItem value="90">Last 90 Days</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Selectui>
        </div>

        {/* Payment Records Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tenant</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Property/Unit</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Due Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Paid Date</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Amount</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Late Fee</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Method</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-200">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {payment.tenant.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    <div>{payment.tenant.property}</div>
                    <div className="text-xs text-gray-500">{payment.tenant.unit}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {formatDate(payment.dueDate)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {payment.paidDate ? formatDate(payment.paidDate) : '-'}
                  </td>
                  <td className="px-4 py-4 text-sm text-right text-gray-900">
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="px-4 py-4 text-sm text-right text-red-600">
                    {payment.lateFee > 0 ? formatCurrency(payment.lateFee) : '-'}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusColors[payment.status]
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {payment.paymentMethod}
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
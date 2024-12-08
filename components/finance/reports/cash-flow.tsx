'use client';
import React from 'react';
import { Card } from '@/components/ui/card';
import { Selectui, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface CashFlowProps {
  period: string;
  data: {
    operating: {
      netIncome: number;
      depreciation: number;
      accountsReceivableChange: number;
      accountsPayableChange: number;
      otherOperating: number;
    };
    investing: {
      propertyPurchases: number;
      propertyImprovements: number;
      equipmentPurchases: number;
      otherInvesting: number;
    };
    financing: {
      mortgagePayments: number;
      dividendsPaid: number;
      capitalContributions: number;
      otherFinancing: number;
    };
  };
}

export function CashFlow({ period, data }: CashFlowProps) {
  const operatingTotal = Object.values(data.operating).reduce((a, b) => a + b, 0);
  const investingTotal = Object.values(data.investing).reduce((a, b) => a + b, 0);
  const financingTotal = Object.values(data.financing).reduce((a, b) => a + b, 0);
  const netCashFlow = operatingTotal + investingTotal + financingTotal;

  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold">Cash Flow Statement</h2>
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
          {/* Operating Activities */}
          <div>
            <h3 className="text-base font-medium mb-3">Operating Activities</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Net Income</span>
                <span>{formatCurrency(data.operating.netIncome)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Depreciation</span>
                <span>{formatCurrency(data.operating.depreciation)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Changes in Accounts Receivable</span>
                <span>{formatCurrency(data.operating.accountsReceivableChange)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Changes in Accounts Payable</span>
                <span>{formatCurrency(data.operating.accountsPayableChange)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Other Operating Activities</span>
                <span>{formatCurrency(data.operating.otherOperating)}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Net Cash from Operating Activities</span>
                <span>{formatCurrency(operatingTotal)}</span>
              </div>
            </div>
          </div>

          {/* Investing Activities */}
          <div>
            <h3 className="text-base font-medium mb-3">Investing Activities</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Property Purchases</span>
                <span>{formatCurrency(data.investing.propertyPurchases)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Property Improvements</span>
                <span>{formatCurrency(data.investing.propertyImprovements)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Equipment Purchases</span>
                <span>{formatCurrency(data.investing.equipmentPurchases)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Other Investing Activities</span>
                <span>{formatCurrency(data.investing.otherInvesting)}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Net Cash from Investing Activities</span>
                <span>{formatCurrency(investingTotal)}</span>
              </div>
            </div>
          </div>

          {/* Financing Activities */}
          <div>
            <h3 className="text-base font-medium mb-3">Financing Activities</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Mortgage Payments</span>
                <span>{formatCurrency(data.financing.mortgagePayments)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Dividends Paid</span>
                <span>{formatCurrency(data.financing.dividendsPaid)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Capital Contributions</span>
                <span>{formatCurrency(data.financing.capitalContributions)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Other Financing Activities</span>
                <span>{formatCurrency(data.financing.otherFinancing)}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Net Cash from Financing Activities</span>
                <span>{formatCurrency(financingTotal)}</span>
              </div>
            </div>
          </div>

          {/* Net Cash Flow */}
          <div className="flex justify-between text-lg font-semibold pt-4 border-t">
            <span>Net Change in Cash</span>
            <span className={netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}>
              {formatCurrency(netCashFlow)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
} 
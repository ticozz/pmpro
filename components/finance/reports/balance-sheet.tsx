'use client';
import React from 'react';
import { Card } from '@/components/ui/card';
import { Selectui } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface BalanceSheetProps {
  date: string;
  data: {
    assets: {
      cash: number;
      accountsReceivable: number;
      propertyValue: number;
      otherAssets: number;
    };
    liabilities: {
      accountsPayable: number;
      mortgages: number;
      deposits: number;
      otherLiabilities: number;
    };
    equity: {
      ownerEquity: number;
      retainedEarnings: number;
    };
  };
}

export function BalanceSheet({ date, data }: BalanceSheetProps) {
  const totalAssets = Object.values(data.assets).reduce((a, b) => a + b, 0);
  const totalLiabilities = Object.values(data.liabilities).reduce((a, b) => a + b, 0);
  const totalEquity = Object.values(data.equity).reduce((a, b) => a + b, 0);

  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold">Balance Sheet</h2>
            <p className="text-sm text-gray-500">As of {date}</p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        <div className="space-y-6">
          {/* Assets Section */}
          <div>
            <h3 className="text-base font-medium mb-3">Assets</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Cash & Equivalents</span>
                <span>{formatCurrency(data.assets.cash)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Accounts Receivable</span>
                <span>{formatCurrency(data.assets.accountsReceivable)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Property Value</span>
                <span>{formatCurrency(data.assets.propertyValue)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Other Assets</span>
                <span>{formatCurrency(data.assets.otherAssets)}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Total Assets</span>
                <span>{formatCurrency(totalAssets)}</span>
              </div>
            </div>
          </div>

          {/* Liabilities Section */}
          <div>
            <h3 className="text-base font-medium mb-3">Liabilities</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Accounts Payable</span>
                <span>{formatCurrency(data.liabilities.accountsPayable)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Mortgages</span>
                <span>{formatCurrency(data.liabilities.mortgages)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Security Deposits</span>
                <span>{formatCurrency(data.liabilities.deposits)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Other Liabilities</span>
                <span>{formatCurrency(data.liabilities.otherLiabilities)}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Total Liabilities</span>
                <span>{formatCurrency(totalLiabilities)}</span>
              </div>
            </div>
          </div>

          {/* Equity Section */}
          <div>
            <h3 className="text-base font-medium mb-3">Equity</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Owner's Equity</span>
                <span>{formatCurrency(data.equity.ownerEquity)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Retained Earnings</span>
                <span>{formatCurrency(data.equity.retainedEarnings)}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Total Equity</span>
                <span>{formatCurrency(totalEquity)}</span>
              </div>
            </div>
          </div>

          {/* Total Liabilities & Equity */}
          <div className="flex justify-between text-lg font-semibold pt-4 border-t">
            <span>Total Liabilities & Equity</span>
            <span>{formatCurrency(totalLiabilities + totalEquity)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
} 
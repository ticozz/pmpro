'use client';

import { CardWrapper } from "@/components/dashboard/analytics/card-wrapper";
import { designSystem } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";

// Mock data - replace with real data fetching
const transactions = [
  {
    id: '1',
    date: new Date(),
    description: 'Rent Payment - Unit 101',
    amount: 1500,
    type: 'CREDIT',
    category: 'RENT',
    reference: 'TXN123456'
  },
  {
    id: '2',
    date: new Date(),
    description: 'Maintenance Service',
    amount: -250,
    type: 'DEBIT',
    category: 'MAINTENANCE',
    reference: 'TXN123457'
  },
];

interface AccountTransactionsProps {
  accountId: string;
}

export function AccountTransactions({ accountId }: AccountTransactionsProps) {
  return (
    <CardWrapper title="Recent Transactions">
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div 
            key={transaction.id}
            className={cn(
              "flex items-center justify-between p-4 rounded-lg",
              designSystem.effects.card
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "p-2 rounded-full",
                transaction.type === 'CREDIT' 
                  ? "bg-green-50" 
                  : "bg-red-50"
              )}>
                {transaction.type === 'CREDIT' ? (
                  <ArrowDownLeft className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowUpRight className="h-4 w-4 text-red-600" />
                )}
              </div>
              <div>
                <div className={designSystem.colors.text.primary}>
                  {transaction.description}
                </div>
                <div className={cn(
                  "text-sm",
                  designSystem.colors.text.muted
                )}>
                  {formatDate(transaction.date)} • {transaction.reference}
                </div>
              </div>
            </div>
            <div className={cn(
              "font-medium",
              transaction.type === 'CREDIT' 
                ? "text-green-600" 
                : "text-red-600"
            )}>
              {transaction.type === 'CREDIT' ? '+' : '-'}
              ${Math.abs(transaction.amount).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
} 
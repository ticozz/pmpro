'use client';

import { CardWrapper } from "@/components/dashboard/analytics/card-wrapper";
import { designSystem } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { Building2, DollarSign, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data - replace with real data fetching
const accounts = [
  {
    id: '1',
    name: 'Main Operating Account',
    bankName: 'Chase Bank',
    accountNumber: '****1234',
    balance: 50000,
    type: 'CHECKING',
    status: 'ACTIVE'
  },
  {
    id: '2',
    name: 'Security Deposits',
    bankName: 'Wells Fargo',
    accountNumber: '****5678',
    balance: 25000,
    type: 'SAVINGS',
    status: 'ACTIVE'
  }
];

export function BankAccountList() {
  return (
    <div className="space-y-4">
      {accounts.map((account) => (
        <CardWrapper
          key={account.id}
          title={account.name}
          action={
            <Button 
              variant="outline" 
              size="sm"
              className={designSystem.colors.primary.lightHover}
            >
              View Transactions
            </Button>
          }
        >
          <div className="grid gap-6 md:grid-cols-4">
            <div className="space-y-1">
              <div className={cn(
                "text-sm",
                designSystem.colors.text.muted
              )}>
                Bank Name
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span className="font-medium">{account.bankName}</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className={cn(
                "text-sm",
                designSystem.colors.text.muted
              )}>
                Account Number
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span className="font-medium">{account.accountNumber}</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className={cn(
                "text-sm",
                designSystem.colors.text.muted
              )}>
                Current Balance
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium">
                  ${account.balance.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <div className={cn(
                "text-sm",
                designSystem.colors.text.muted
              )}>
                Status
              </div>
              <Badge 
                variant="default"
                className={cn(
                  account.status === 'ACTIVE' 
                    ? "bg-green-50 text-green-700 border-green-200" 
                    : "bg-gray-50 text-gray-700 border-gray-200"
                )}
              >
                {account.status}
              </Badge>
            </div>
          </div>
        </CardWrapper>
      ))}
    </div>
  );
} 
'use client';

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { designSystem } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { BankAccountList } from "@/components/accounting/bank-account-list";

export default function BankAccountsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className={cn(
            "text-2xl font-bold",
            designSystem.colors.text.primary
          )}>
            Bank Accounts
          </h1>
          <p className={designSystem.colors.text.secondary}>
            Manage your business bank accounts
          </p>
        </div>
        <Button 
          className={cn(
            "gap-2",
            designSystem.colors.primary.gradient,
            "text-white hover:opacity-90"
          )}
        >
          <Plus className="h-4 w-4" />
          Add Account
        </Button>
      </div>

      <BankAccountList />
    </div>
  );
} 
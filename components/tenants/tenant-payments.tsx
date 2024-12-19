"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { PaymentService } from "@/lib/payment-service";
import { fetchWithRetry } from "@/lib/api-client";
import { toast } from "@/components/ui/use-toast";

interface Payment {
  id: string;
  amount: number;
  type: string;
  status: string;
  dueDate: string;
  paidDate?: string;
  tenantId: string;
  leaseId: string;
  lease: {
    unit: {
      unitNumber: string;
      property: {
        name: string;
      };
    };
  };
}

interface TenantPaymentsProps {
  tenantId: string;
  payments: Payment[];
}

type BadgeVariant = "default" | "success" | "warning" | "error" | undefined;

export function TenantPayments({ tenantId, payments }: TenantPaymentsProps) {
  const [filter, setFilter] = useState<string>("all");

  const filteredPayments = payments.filter((payment) => {
    if (filter === "pending") return payment.status === "PENDING";
    if (filter === "completed") return payment.status === "COMPLETED";
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "success";
      case "PENDING":
        return "warning";
      case "FAILED":
        return "error";
      default:
        return "default";
    }
  };

  async function processPayment(payment: Payment) {
    const paymentIntent = await PaymentService.createPaymentIntent({
      amount: payment.amount,
      tenantId: payment.tenantId,
      leaseId: payment.leaseId,
    });

    toast({
      title: "Payment Processed",
      description: "Payment has been processed successfully",
    });
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Payment History</CardTitle>
          <div className="space-x-2">
            <Badge
              variant={filter === "all" ? "default" : undefined}
              className="cursor-pointer"
              onClick={() => setFilter("all")}
            >
              All
            </Badge>
            <Badge
              variant={filter === "pending" ? "default" : undefined}
              className="cursor-pointer"
              onClick={() => setFilter("pending")}
            >
              Pending
            </Badge>
            <Badge
              variant={filter === "completed" ? "default" : undefined}
              className="cursor-pointer"
              onClick={() => setFilter("completed")}
            >
              Completed
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredPayments.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{formatCurrency(payment.amount)}</p>
                  <Badge variant={getStatusColor(payment.status)}>
                    {payment.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {payment.lease.unit.property.name} - Unit{" "}
                  {payment.lease.unit.unitNumber}
                </p>
                <p className="text-sm text-muted-foreground">
                  Due: {new Date(payment.dueDate).toLocaleDateString()}
                  {payment.paidDate &&
                    ` • Paid: ${new Date(payment.paidDate).toLocaleDateString()}`}
                </p>
              </div>
            </div>
          ))}
          {filteredPayments.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No payments found
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 
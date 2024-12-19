"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaseRenewal } from "./lease-renewal";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/utils";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { LoadingCard } from "@/components/ui/loading-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface LeaseDetail {
  id: string;
  unit: {
    unitNumber: string;
    property: {
      name: string;
    };
  };
  tenants: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }>;
  startDate: string;
  endDate: string;
  rentAmount: number;
  depositAmount: number;
  status: string;
  type: string;
  terms?: string;
  documents: Array<{
    id: string;
    title: string;
    fileUrl: string;
  }>;
  payments: Array<{
    id: string;
    amount: number;
    status: string;
    dueDate: string;
    paidDate?: string;
  }>;
}

interface LeaseDetailProps {
  leaseId: string;
}

export function LeaseDetail({ leaseId }: LeaseDetailProps) {
  const [lease, setLease] = useState<LeaseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLease = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/leases/${leaseId}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch lease");
        }
        
        const data = await response.json();
        setLease(data);
      } catch (error) {
        console.error("Error fetching lease:", error);
        setError(error instanceof Error ? error.message : "Failed to load lease details");
      } finally {
        setLoading(false);
      }
    };

    fetchLease();
  }, [leaseId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-[300px]" />
          <Skeleton className="h-6 w-[100px]" />
        </div>
        <LoadingCard />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!lease) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Not Found</AlertTitle>
        <AlertDescription>This lease could not be found.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Lease Details - {lease.unit.property.name} Unit {lease.unit.unitNumber}
        </h2>
        <Badge variant={getStatusVariant(lease.status)}>{lease.status}</Badge>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="tenants">Tenants</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="renewal">Renewal</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Start Date</h4>
                  <p>{format(new Date(lease.startDate), "PPP")}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">End Date</h4>
                  <p>{format(new Date(lease.endDate), "PPP")}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Rent Amount</h4>
                  <p>{formatCurrency(lease.rentAmount)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Deposit Amount</h4>
                  <p>{formatCurrency(lease.depositAmount)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Type</h4>
                  <p>{lease.type}</p>
                </div>
              </div>
              {lease.terms && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Additional Terms</h4>
                  <p className="whitespace-pre-wrap">{lease.terms}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tenants">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {lease.tenants.map((tenant) => (
                  <div key={tenant.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{tenant.firstName} {tenant.lastName}</p>
                      <p className="text-sm text-muted-foreground">{tenant.email}</p>
                    </div>
                    <Button variant="outline">
                      <a href={`/dashboard/tenants/${tenant.id}`}>View Profile</a>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {lease.payments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{formatCurrency(payment.amount)}</p>
                      <p className="text-sm text-muted-foreground">
                        Due: {format(new Date(payment.dueDate), "PPP")}
                      </p>
                    </div>
                    <Badge variant={getPaymentStatusVariant(payment.status)}>
                      {payment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {lease.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <p className="font-medium">{doc.title}</p>
                    <Button variant="outline">
                      <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                        View Document
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="renewal">
          <Card>
            <CardHeader>
              <CardTitle>Renew Lease</CardTitle>
            </CardHeader>
            <CardContent>
              <LeaseRenewal
                leaseId={lease.id}
                currentEndDate={new Date(lease.endDate)}
                currentRentAmount={lease.rentAmount}
                onSuccess={() => {
                  // Refresh lease data
                  window.location.reload();
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function getStatusVariant(status: string): "default" | "success" | "warning" | "error" {
  switch (status) {
    case "ACTIVE":
      return "success";
    case "PENDING":
      return "warning";
    case "EXPIRED":
      return "error";
    default:
      return "default";
  }
}

function getPaymentStatusVariant(status: string): "default" | "success" | "warning" | "error" {
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
} 
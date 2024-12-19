"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { TenantNotes } from "./tenant-notes";
import { TenantForm } from "./tenant-form";
import { Pencil, X, Save } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import type { TenantFormValues } from "./tenant-form";

interface TenantDetail {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status: "ACTIVE" | "INACTIVE";
  leases: Array<{
    id: string;
    startDate: string;
    endDate: string;
    unit: {
      unitNumber: string;
      property: {
        name: string;
      };
    };
  }>;
  background?: {
    creditScore?: number;
    criminalRecord: boolean;
    evictionHistory: boolean;
    verifiedIncome?: number;
    status: string;
  };
  notes: Array<{
    id: string;
    content: string;
    createdAt: string;
    createdBy: {
      firstName: string;
      lastName: string;
    };
  }>;
}

interface TenantDetailProps {
  tenantId: string;
}

export function TenantDetail({ tenantId }: TenantDetailProps) {
  const [tenant, setTenant] = useState<TenantDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const response = await fetch(`/api/tenants/${tenantId}`);
        if (!response.ok) throw new Error("Failed to fetch tenant");
        const data = await response.json();
        setTenant(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTenant();
  }, [tenantId]);

  const handleEdit = async (formData: TenantFormValues) => {
    try {
      const response = await fetch(`/api/tenants/${tenantId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update tenant");

      toast({
        title: "Success",
        description: "Tenant updated successfully",
      });
      
      setIsEditing(false);
      // Refresh tenant data
      const updatedTenant = await response.json();
      setTenant(updatedTenant);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update tenant",
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!tenant) return <div>Tenant not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">
          {tenant.firstName} {tenant.lastName}
        </h2>
        <div className="flex items-center gap-2">
          <Badge variant={tenant.status === "ACTIVE" ? "success" : "error"}>
            {tenant.status}
          </Badge>
          {isEditing ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(false)}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="leases">Leases</TabsTrigger>
          <TabsTrigger value="background">Background Check</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          {isEditing ? (
            <TenantForm
              initialData={tenant}
              tenantId={tenant.id}
              onSuccess={() => {
                setIsEditing(false);
                window.location.reload();
              }}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <Card>
              <CardContent className="pt-6">
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                    <dd className="text-sm">{tenant.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
                    <dd className="text-sm">{tenant.phone || "N/A"}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="leases">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {tenant.leases.map((lease) => (
                  <div key={lease.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">
                        {lease.unit.property.name} - Unit {lease.unit.unitNumber}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(lease.startDate).toLocaleDateString()} - {new Date(lease.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Link href={`/dashboard/leases/${lease.id}`}>
                      <Button variant="ghost" size="sm">
                        View Lease
                      </Button>
                    </Link>
                  </div>
                ))}
                {tenant.leases.length === 0 && (
                  <p className="text-sm text-muted-foreground">No leases found</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="background">
          <Card>
            <CardHeader>
              <CardTitle>Background Check</CardTitle>
            </CardHeader>
            <CardContent>
              {tenant.background ? (
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Credit Score</dt>
                    <dd className="text-sm">{tenant.background.creditScore || "N/A"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Criminal Record</dt>
                    <dd className="text-sm">{tenant.background.criminalRecord ? "Yes" : "No"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Eviction History</dt>
                    <dd className="text-sm">{tenant.background.evictionHistory ? "Yes" : "No"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Verified Income</dt>
                    <dd className="text-sm">
                      {tenant.background.verifiedIncome 
                        ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tenant.background.verifiedIncome)
                        : "N/A"}
                    </dd>
                  </div>
                </dl>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground">No background check found</p>
                  <Button className="mt-4">Request Background Check</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <TenantNotes
            tenantId={tenant.id}
            notes={tenant.notes || []}
            onAddNote={() => {
              // Refresh tenant data
              window.location.reload();
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
} 
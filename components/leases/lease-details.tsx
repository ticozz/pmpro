"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { 
  Calendar, 
  Home, 
  Users, 
  FileText, 
  DollarSign,
  Tag,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface LeaseDetailsProps {
  id: string;
}

interface Lease {
  id: string;
  startDate: string;
  endDate: string;
  rentAmount: number;
  depositAmount: number;
  status: string;
  type: string;
  terms: string;
  unit: {
    unitNumber: string;
    property: {
      name: string;
    };
  };
  tenants: {
    firstName: string;
    lastName: string;
  }[];
}

export function LeaseDetails({ id }: LeaseDetailsProps) {
  const router = useRouter();
  const [lease, setLease] = useState<Lease | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLease();
  }, [id]);

  const fetchLease = async () => {
    try {
      const response = await fetch(`/api/leases/${id}`);
      if (!response.ok) throw new Error("Failed to fetch lease");
      const data = await response.json();
      setLease(data);
    } catch (error) {
      toast.error("Error fetching lease details");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!lease) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <p className="text-xl font-semibold text-muted-foreground">Lease not found</p>
        <Button 
          variant="outline" 
          onClick={() => router.push("/dashboard/leases")}
        >
          Back to Leases
        </Button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500/15 text-green-700';
      case 'pending':
        return 'bg-yellow-500/15 text-yellow-700';
      case 'expired':
        return 'bg-red-500/15 text-red-700';
      default:
        return 'bg-gray-500/15 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Lease Details</h2>
          <p className="text-muted-foreground mt-1">
            View lease information
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => router.push("/dashboard/leases")}
        >
          Back to Leases
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Property Information Card */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg font-semibold">
              <Home className="h-5 w-5 mr-2" />
              Property Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Property Name</p>
              <p className="font-medium">{lease.unit.property.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Unit Number</p>
              <p className="font-medium">{lease.unit.unitNumber}</p>
            </div>
          </CardContent>
        </Card>

        {/* Tenant Information Card */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg font-semibold">
              <Users className="h-5 w-5 mr-2" />
              Tenants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {lease.tenants.map((tenant, index) => (
                <li 
                  key={index}
                  className="flex items-center p-2 rounded-md bg-secondary/50"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    {tenant.firstName[0]}{tenant.lastName[0]}
                  </div>
                  <span className="font-medium">
                    {tenant.firstName} {tenant.lastName}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Lease Terms Card */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg font-semibold">
              <FileText className="h-5 w-5 mr-2" />
              Lease Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className={cn("mt-1", getStatusColor(lease.status))}>
                  {lease.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <Badge variant="default" className="mt-1">
                  {lease.type.replace(/_/g, ' ')}
                </Badge>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Duration</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Start Date</p>
                  <p className="font-medium">{format(new Date(lease.startDate), "PPP")}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">End Date</p>
                  <p className="font-medium">{format(new Date(lease.endDate), "PPP")}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Information Card */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg font-semibold">
              <DollarSign className="h-5 w-5 mr-2" />
              Financial Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Rent</p>
                <p className="text-xl font-semibold">${lease.rentAmount}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Security Deposit</p>
                <p className="text-xl font-semibold">${lease.depositAmount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Terms Card */}
        {lease.terms && (
          <Card className="col-span-2">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg font-semibold">
                <Tag className="h-5 w-5 mr-2" />
                Additional Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {lease.terms}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 
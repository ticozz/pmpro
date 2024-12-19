"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface Lease {
  id: string;
  unit: {
    unitNumber: string;
    property: {
      name: string;
    };
  };
  tenants: Array<{
    firstName: string;
    lastName: string;
  }>;
  startDate: string;
  endDate: string;
  rentAmount: number;
  status: string;
  type: string;
}

function getStatusVariant(status: string): "success" | "warning" | "default" | "error" {
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

export function LeaseList() {
  const [leases, setLeases] = useState<Lease[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeases = async () => {
      try {
        const response = await fetch("/api/leases");
        if (!response.ok) throw new Error("Failed to fetch leases");
        const data = await response.json();
        setLeases(data);
      } catch (error) {
        console.error("Error fetching leases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeases();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Leases</h2>
        <Link href="/dashboard/leases/create">
          <Button>Create Lease</Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Rent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leases.map((lease) => (
              <TableRow key={lease.id}>
                <TableCell>{lease.unit.property.name}</TableCell>
                <TableCell>{lease.unit.unitNumber}</TableCell>
                <TableCell>
                  {lease.tenants
                    .map((t) => `${t.firstName} ${t.lastName}`)
                    .join(", ")}
                </TableCell>
                <TableCell>{formatDate(lease.startDate)}</TableCell>
                <TableCell>{formatDate(lease.endDate)}</TableCell>
                <TableCell>${lease.rentAmount}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(lease.status)}>
                    {lease.status}
                  </Badge>
                </TableCell>
                <TableCell>{lease.type}</TableCell>
                <TableCell>
                  <Link href={`/dashboard/leases/${lease.id}`}>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 
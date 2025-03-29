"use client";

import { useEffect, useState, useCallback } from "react";
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
import { LeaseFilters } from './lease-filters';
import { DataTable } from "@/components/ui/data-table";
import { columns, LeaseWithRelations } from "./columns";

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

interface LeaseListProps {
  data: LeaseWithRelations[];
}

export function LeaseList({ data }: LeaseListProps) {
  return <DataTable columns={columns} data={data} />;
} 
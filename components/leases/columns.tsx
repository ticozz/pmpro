import { ColumnDef } from "@tanstack/react-table";
import { Lease, Unit, Tenant } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate, formatCurrency } from "@/lib/utils/format";
import Link from "next/link";

export type LeaseWithRelations = Lease & {
  unit: Unit & {
    unitNumber: string;
    property: {
      name: string;
    };
  };
  tenants: Tenant[];
};

export const columns: ColumnDef<LeaseWithRelations, any>[] = [
  {
    id: "property",
    header: "Property",
    accessorFn: (row) => row.unit?.property.name,
  },
  {
    id: "unit",
    header: "Unit",
    accessorFn: (row) => row.unit?.unitNumber,
  },
  {
    id: "tenant",
    header: "Tenant",
    accessorFn: (row) => row.tenants.map(t => `${t.firstName} ${t.lastName}`).join(", "),
  },
  {
    id: "startDate",
    header: "Start Date",
    cell: ({ row }) => formatDate(row.original.startDate),
  },
  {
    id: "endDate",
    header: "End Date",
    cell: ({ row }) => formatDate(row.original.endDate),
  },
  {
    id: "rentAmount",
    header: "Monthly Rent",
    cell: ({ getValue }) => formatCurrency(getValue()),
    accessorFn: (row) => row.rentAmount,
  },
  {
    id: "status",
    header: "Status",
    cell: ({ getValue }) => (
      <Badge variant={getValue() === "ACTIVE" ? "success" : "default"}>
        {getValue()}
      </Badge>
    ),
    accessorFn: (row) => row.status,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const lease = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/leases/${lease.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/leases/${lease.id}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]; 
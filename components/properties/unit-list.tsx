'use client';

import { Button } from "@/components/ui/button";
import { Plus, Building2, DollarSign, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UnitDialog } from "@/components/properties/unit-dialog";
import { useState } from "react";

interface Unit {
  id: string;
  unitNumber: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  rent: number;
  status: 'VACANT' | 'OCCUPIED' | 'MAINTENANCE';
  leases: {
    tenants: {
      firstName: string;
      lastName: string;
    }[];
  }[];
}

interface UnitListProps {
  propertyId: string;
  units: Unit[];
  onUnitAdded?: () => void;
}

export function UnitList({ propertyId, units, onUnitAdded }: UnitListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Units</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Unit
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Unit Number</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Rent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tenant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {units.map((unit) => (
              <TableRow key={unit.id}>
                <TableCell>
                  <div className="flex items-center">
                    <Building2 className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{unit.unitNumber}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {`${unit.bedrooms ?? 0} bed, ${unit.bathrooms ?? 0} bath, ${unit.squareFootage ?? 0} sqft`}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(unit.rent)}
                    <span className="text-muted-foreground ml-1">/month</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={
                    unit.status === 'OCCUPIED' ? 'success' :
                    unit.status === 'MAINTENANCE' ? 'warning' : 'default'
                  }>
                    {unit.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {unit.leases[0]?.tenants?.[0] ? (
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      {`${unit.leases[0].tenants[0].firstName} ${unit.leases[0].tenants[0].lastName}`}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">No tenant</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <UnitDialog
        propertyId={propertyId}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onUnitAdded={onUnitAdded}
      />
    </div>
  );
} 
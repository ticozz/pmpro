'use client';

import { useState, useEffect } from 'react';
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
import { Plus } from "lucide-react";
import { MaintenanceDialog } from "@/components/maintenance/maintenance-dialog";
import { formatDate } from "@/lib/utils";

interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';
  unit: {
    unitNumber: string;
  };
  requestedBy: {
    name: string;
  };
  createdAt: string;
}

interface MaintenanceListProps {
  property: {
    id: string;
    units?: {
      id: string;
      unitNumber: string;
    }[];
    address?: {
      street: string;
      city: string;
      state: string;
    } | null;
  };
}

export function MaintenanceList({ property }: MaintenanceListProps) {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!property) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    if (property?.id) {
      fetchRequests();
    }
  }, [property.id]);

  async function fetchRequests() {
    try {
      const response = await fetch(`/api/maintenance/${property.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch maintenance requests');
      }
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching maintenance requests:', error);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Maintenance Requests</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Request
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Requested By</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.title}</TableCell>
                <TableCell>{request.unit.unitNumber}</TableCell>
                <TableCell>
                  <Badge variant={
                    request.priority === 'HIGH' ? 'error' :
                    request.priority === 'MEDIUM' ? 'warning' : 'default'
                  }>
                    {request.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={
                    request.status === 'COMPLETED' ? 'success' :
                    request.status === 'IN_PROGRESS' ? 'warning' : 'default'
                  }>
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell>{request.requestedBy.name}</TableCell>
                <TableCell>{formatDate(request.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <MaintenanceDialog
        property={property}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onRequestAdded={fetchRequests}
      />
    </div>
  );
} 
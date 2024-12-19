'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash, Edit, Users } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Organization {
  id: string;
  name: string;
  createdAt: string;
  userCount: number;
  status: string;
}

export function OrganizationList() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const response = await fetch('/api/admin/organizations');
      const data = await response.json();
      setOrganizations(data);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrganization = async (id: string) => {
    if (!confirm('Are you sure you want to delete this organization?')) return;
    
    try {
      await fetch(`/api/admin/organizations/${id}`, {
        method: 'DELETE',
      });
      fetchOrganizations();
    } catch (error) {
      console.error('Error deleting organization:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Users</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {organizations.map((org) => (
          <TableRow key={org.id}>
            <TableCell>{org.name}</TableCell>
            <TableCell>{formatDate(org.createdAt)}</TableCell>
            <TableCell>{org.userCount}</TableCell>
            <TableCell>{org.status}</TableCell>
            <TableCell className="space-x-2">
              <Button size="sm" variant="outline">
                <Edit className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Users className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => deleteOrganization(org.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 
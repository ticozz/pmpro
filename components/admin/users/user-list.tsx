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
import { Lock, UserCog, Trash } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  organizationId: string | null;
  createdAt: string;
}

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (userId: string) => {
    if (!confirm('Are you sure you want to reset this user\'s password?')) return;
    
    try {
      await fetch(`/api/admin/users/${userId}/reset-password`, {
        method: 'POST',
      });
      // Handle success (maybe show a notification)
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Organization</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.organizationId || 'N/A'}</TableCell>
            <TableCell>{formatDate(user.createdAt)}</TableCell>
            <TableCell className="space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => resetPassword(user.id)}
              >
                <Lock className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <UserCog className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost">
                <Trash className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 
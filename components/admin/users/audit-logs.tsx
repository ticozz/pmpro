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
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

interface AuditLog {
  id: string;
  userId: string;
  action: string;
  details: string;
  createdAt: string;
  metadata?: Record<string, any>;
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };
}

interface PaginationData {
  total: number;
  pages: number;
  current: number;
}

export function AuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    pages: 1,
    current: 1,
  });

  useEffect(() => {
    fetchLogs(1);
  }, []);

  const fetchLogs = async (page: number) => {
    try {
      const response = await fetch(`/api/admin/users/audit-logs?page=${page}`);
      const data = await response.json();
      setLogs(data.logs);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{formatDate(log.createdAt)}</TableCell>
              <TableCell>{`${log.user.firstName} ${log.user.lastName}`}</TableCell>
              <TableCell>{log.action}</TableCell>
              <TableCell>{log.details}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center gap-2">
        {Array.from({ length: pagination.pages }, (_, i) => (
          <Button
            key={i + 1}
            variant={pagination.current === i + 1 ? "default" : "outline"}
            size="sm"
            onClick={() => fetchLogs(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  );
} 
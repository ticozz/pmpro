'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
  unit: {
    unitNumber: string;
    property: {
      name: string;
    };
  };
  requestedBy: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export function MaintenanceList() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const response = await fetch('/api/maintenance');
        if (!response.ok) {
          throw new Error('Failed to fetch maintenance requests');
        }
        const data = await response.json();
        setRequests(data);
      } catch (err) {
        console.error('Error fetching maintenance requests:', err);
        setError(err instanceof Error ? err.message : 'Failed to load maintenance requests');
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, []);

  if (loading) {
    return <div>Loading maintenance requests...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (requests.length === 0) {
    return <div>No maintenance requests found.</div>;
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <Card key={request.id} className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{request.title}</h3>
              <p className="text-sm text-gray-600">{request.description}</p>
              <div className="mt-2 space-x-2">
                <Badge>{request.status}</Badge>
                <Badge variant={request.priority === 'HIGH' ? 'error' : 'default'}>
                  {request.priority}
                </Badge>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <p>Property: {request.unit.property.name}</p>
                <p>Unit: {request.unit.unitNumber}</p>
                <p>Requested by: {`${request.requestedBy.firstName} ${request.requestedBy.lastName}`}</p>
                <p>Date: {formatDate(request.createdAt)}</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
} 
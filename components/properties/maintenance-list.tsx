import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Wrench, Clock, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MaintenanceListProps {
  property: any; // Replace with proper type
}

export function MaintenanceList({ property }: MaintenanceListProps) {
    const statusColors = {
    OPEN: 'warning',
    IN_PROGRESS: 'default',
    COMPLETED: 'success',
    CANCELLED: 'error'
  } as const;

  const priorityIcons = {
    LOW: null,
    MEDIUM: <Clock className="w-4 h-4 text-yellow-500" />,
    HIGH: <AlertCircle className="w-4 h-4 text-orange-500" />,
    EMERGENCY: <AlertCircle className="w-4 h-4 text-red-500" />,
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Maintenance Requests</h2>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          New Request
        </Button>
      </div>

      <div className="space-y-4">
        {property.maintenanceRequests?.map((request: any) => (
          <Card key={request.id}>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Wrench className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{request.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {request.description}
                    </p>
                    <div className="flex items-center mt-2 space-x-2">
                      <Badge variant={statusColors[request.status as keyof typeof statusColors]}>
                        {request.status}
                      </Badge>
                      {priorityIcons[request.priority as keyof typeof priorityIcons]}
                      <span className="text-sm text-gray-500">
                        Unit {request.unit.unitNumber}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(request.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 
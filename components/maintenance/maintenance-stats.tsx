import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  AlertTriangle 
} from 'lucide-react';
import { useAuthContext } from '@/components/providers/auth-provider';

const stats = [
  {
    name: 'Open Requests',
    value: '12',
    description: 'Pending maintenance requests',
    icon: AlertCircle,
    color: 'text-yellow-600',
    trend: '+2 from last week',
  },
  {
    name: 'In Progress',
    value: '8',
    description: 'Currently being handled',
    icon: Clock,
    color: 'text-blue-600',
    trend: '-1 from last week',
  },
  {
    name: 'Completed',
    value: '45',
    description: 'This month',
    icon: CheckCircle,
    color: 'text-green-600',
    trend: '+12% vs last month',
  },
  {
    name: 'Emergency',
    value: '2',
    description: 'Require immediate attention',
    icon: AlertTriangle,
    color: 'text-red-600',
    trend: '+1 from yesterday',
  },
];

export function MaintenanceStats() {
  const { user } = useAuthContext();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.name}>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 bg-gray-50 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{stat.description}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.trend}</p>
          </div>
        </Card>
      ))}
    </div>
  );
} 
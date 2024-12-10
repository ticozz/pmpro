'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Building2, MapPin, Calendar, User } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { PropertyTabs } from "./property-tabs";
import { designSystem } from '@/lib/design-system';
import { cn } from '@/lib/utils';

interface PropertyDetailsProps {
  property: {
    id: string;
    name: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    createdAt: string;
    manager: {
      firstName: string;
      lastName: string;
    };
    units: any[];
  };
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
    <div className="space-y-6">
      <Card className={cn(
        designSystem.effects.card,
        "p-6"
      )}>
        <h2 className={cn(
          "text-2xl font-bold mb-4",
          designSystem.colors.text.primary
        )}>
          {property.name}
        </h2>
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className={cn(
              "flex items-center mt-2",
              designSystem.colors.text.muted
            )}>
              <MapPin className="w-4 h-4 mr-2" />
              <span>
                {property.address.street}, {property.address.city},{' '}
                {property.address.state} {property.address.zipCode}, {property.address.country}
              </span>
            </div>
          </div>
          <div className={cn(
            "text-sm",
            designSystem.colors.text.muted
          )}>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Added {formatDate(property.createdAt)}
            </div>
            <div className="flex items-center mt-1">
              <User className="w-4 h-4 mr-2" />
              Managed by {property.manager.firstName} {property.manager.lastName}
            </div>
          </div>
        </div>

        {/* Property Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              label: 'Total Units',
              value: property.units.length,
              icon: Building2
            },
            {
              label: 'Occupied Units',
              value: property.units.filter((unit: any) => unit.status === 'OCCUPIED').length,
              color: 'text-green-600'
            },
            {
              label: 'Vacant Units',
              value: property.units.filter((unit: any) => unit.status === 'VACANT').length,
              color: 'text-orange-600'
            }
          ].map((stat, index) => (
            <div 
              key={index}
              className={cn(
                designSystem.effects.card,
                "p-4 hover:shadow-md transition-all duration-200"
              )}
            >
              <div className={cn(
                "text-sm font-medium",
                designSystem.colors.text.secondary
              )}>
                {stat.label}
              </div>
              <div className={cn(
                "mt-1 text-2xl font-semibold",
                stat.color || designSystem.colors.text.primary
              )}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 
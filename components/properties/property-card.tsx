import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Property } from '@prisma/client';
import { MapPin, Building2, Home, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PropertyWithAddress } from '@/types/property';
import { useState } from 'react';
import { PropertyEditFormClient } from './property-edit-form-client';
import { designSystem } from '@/lib/design-system';
import { cn } from '@/lib/utils';


interface PropertyCardProps {
  property: PropertyWithAddress;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <Card className={cn(
      "flex flex-col",
      designSystem.effects.card,
      designSystem.effects.cardHover
    )}>
      <CardHeader>
        <h3 className={cn(
          "text-lg font-semibold",
          designSystem.colors.text.primary
        )}>
          {property.name}
        </h3>
        <div className="flex gap-2 mt-2">
          <Badge 
            variant={property.status === 'ACTIVE' ? 'success' : 'default'}
            className={cn(
              property.status === 'ACTIVE' 
                ? "bg-green-100 text-green-700" 
                : "bg-gray-100 text-gray-700"
            )}
          >
            {property.status}
          </Badge>
          <Badge 
            variant={property.type === 'RESIDENTIAL' ? 'success' : 'default'}
            className={cn(
              property.type === 'RESIDENTIAL' 
                ? "bg-blue-100 text-blue-700" 
                : "bg-gray-100 text-gray-700"
            )}
          >
            {property.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2">
          {property.address && (
            <div className={cn(
              "flex items-center text-sm",
              designSystem.colors.text.muted
            )}>
              <MapPin className="w-4 h-4 mr-2" />
              <span>
                {property.address.street}, {property.address.city}, {property.address.state} {property.address.zipCode}, {property.address.country}
              </span>
            </div>
          )}
          <div className={cn(
            "flex items-center text-sm",
            designSystem.colors.text.muted
          )}>
            <Building2 className="w-4 h-4 mr-2" />
            <span>{property._count?.units || 0} Units</span>
          </div>
          {property.manager && (
            <div className={cn(
              "flex items-center text-sm",
              designSystem.colors.text.muted
            )}>
              <User className="w-4 h-4 mr-2" />
              <span>Manager: {property.manager.firstName}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/dashboard/properties/${property.id}`}>
          <Button 
            variant="outline" 
            size="sm"
            className={designSystem.colors.primary.lightHover}
          >
            View Details
          </Button>
        </Link>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            className={designSystem.colors.primary.lightHover}
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-600 hover:bg-red-50"
          >
            Delete
          </Button>
        </div>
      </CardFooter>
      <PropertyEditFormClient
        property={property}
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSuccess={() => {
          window.location.reload();
        }}
      />
    </Card>
  );
} 
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Property } from '@prisma/client';
import { MapPin, Building2, Home, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PropertyWithAddress } from '@/types/property';
import { useState } from 'react';
import { PropertyEditFormClient } from './property-edit-form-client';


interface PropertyCardProps {
  property: PropertyWithAddress;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <h3 className="text-lg font-semibold">{property.name}</h3>
        <div className="flex gap-2 mt-2">
          <Badge variant={property.status === 'ACTIVE' ? 'success' : 'default'}>
            {property.status}
          </Badge>
          <Badge variant={property.type === 'RESIDENTIAL' ? 'success' : 'default'}>
            {property.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2">
          {property.address && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-2" />
              <span>
                {property.address.street}, {property.address.city}, {property.address.state} {property.address.zipCode}, {property.address.country}
              </span>
            </div>
          )}
          <div className="flex items-center text-sm text-gray-500">
            <Building2 className="w-4 h-4 mr-2" />
            <span>{property._count?.units || 0} Units</span>
          </div>
          {property.manager && (
            <div className="flex items-center text-sm text-gray-500">
              <User className="w-4 h-4 mr-2" />
              <span>Manager: {property.manager.firstName}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/properties/${property.id}`}>
          <Button variant="outline" size="sm">View Details</Button>
        </Link>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit
          </Button>
          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">Delete</Button>
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
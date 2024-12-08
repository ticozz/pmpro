import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Property } from '@prisma/client';
import { MapPin, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PropertyWithAddress } from '@/types/property';


interface PropertyListItemProps {
  property: PropertyWithAddress;
}

export function PropertyListItem({ property }: PropertyListItemProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold">{property.name}</h3>
            <div className="flex gap-2">
              <Badge variant={property.status === 'ACTIVE' ? 'success' : 'default'}>
                {property.status}
              </Badge>
              <Badge variant={property.type === 'RESIDENTIAL' ? 'success' : 'default'}>
                {property.type}
              </Badge>
            </div>
          </div>
          
          <div className="mt-2 space-y-1">
            {property.address && (
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="w-4 h-4 mr-2" />
                <span>
                  {property.address.street}, {property.address.city}, {property.address.state} {property.address.zipCode}
                </span>
              </div>
            )}
            <div className="flex items-center text-sm text-gray-500">
              <Building2 className="w-4 h-4 mr-2" />
              <span>{property._count?.units || 0} Units</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/properties/${property.id}`} passHref>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>
          <Button variant="outline" size="sm">Edit</Button>
          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">Delete</Button>
        </div>
      </CardContent>
    </Card>
  );
} 
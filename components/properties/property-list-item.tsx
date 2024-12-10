import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PropertyWithAddress } from '@/types/property';
import { MapPin, Building2, User } from 'lucide-react';
import { designSystem } from '@/lib/design-system';
import { cn } from '@/lib/utils';

interface PropertyListItemProps {
  property: PropertyWithAddress;
}

export function PropertyListItem({ property }: PropertyListItemProps) {
  return (
    <div className={cn(
      "flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4",
      designSystem.effects.card,
      designSystem.effects.cardHover
    )}>
      {/* Property Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className={cn(
            "text-lg font-semibold truncate",
            designSystem.colors.text.primary
          )}>
            {property.name}
          </h3>
          <div className="flex gap-2">
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
        </div>

        <div className="mt-2 space-y-1">
          {property.address && (
            <div className={cn(
              "flex items-center text-sm",
              designSystem.colors.text.muted
            )}>
              <MapPin className="w-4 h-4 mr-2 shrink-0" />
              <span className="truncate">
                {property.address.street}, {property.address.city}, {property.address.state} {property.address.zipCode}
              </span>
            </div>
          )}
          <div className="flex gap-4">
            <div className={cn(
              "flex items-center text-sm",
              designSystem.colors.text.muted
            )}>
              <Building2 className="w-4 h-4 mr-2 shrink-0" />
              <span>{property._count?.units || 0} Units</span>
            </div>
            {property.manager && (
              <div className={cn(
                "flex items-center text-sm",
                designSystem.colors.text.muted
              )}>
                <User className="w-4 h-4 mr-2 shrink-0" />
                <span>Manager: {property.manager.firstName}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Link href={`/properties/${property.id}`} className="w-full sm:w-auto">
          <Button 
            variant="outline" 
            size="sm"
            className={cn(
              "w-full sm:w-auto",
              designSystem.colors.primary.lightHover
            )}
          >
            View Details
          </Button>
        </Link>
        <Button 
          variant="outline" 
          size="sm"
          className={cn(
            "w-full sm:w-auto",
            designSystem.colors.primary.lightHover
          )}
        >
          Edit
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-red-600 hover:bg-red-50 w-full sm:w-auto"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
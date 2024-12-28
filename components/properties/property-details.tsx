'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Edit, Trash2, Users, Home, Calendar, DollarSign } from "lucide-react";
import { PropertyTabs } from "./property-tabs";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { PropertyWithAddress } from '@/types/property';
import { Status } from "@prisma/client";

interface PropertyDetailsProps {
  property: {
    id: string;
    name: string;
    units: any[];
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    } | null;
    type: string;
    status: Status;
    createdAt: Date;
    totalUnits: number;
    occupiedUnits: number;
    monthlyRevenue: number;
  };
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/properties/${property.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        router.push('/dashboard/properties');
      }
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-4">
                <CardTitle className="flex items-center">
                  <Building2 className="mr-2 h-6 w-6 text-primary" />
                  {property.name}
                </CardTitle>
                <Badge variant={
                  property.status === 'PENDING' ? 'warning' : 'default'
                }>
                  {property.status}
                </Badge>
              </div>
              {property.address && (
                <CardDescription className="flex items-center mt-2">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  {`${property.address.street}, ${property.address.city}, ${property.address.state} ${property.address.zipCode}`}
                </CardDescription>
              )}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/dashboard/properties/${property.id}/edit`)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the
                      property and all associated data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Units
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Home className="mr-2 h-4 w-4 text-primary" />
                  <span className="text-2xl font-bold">{property.totalUnits}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Occupied Units
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-primary" />
                  <span className="text-2xl font-bold">{property.occupiedUnits}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Monthly Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4 text-primary" />
                  <span className="text-2xl font-bold">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(property.monthlyRevenue)}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Added
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-primary" />
                  <span className="text-sm">{new Date(property.createdAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      <PropertyTabs property={property} />
    </div>
  );
} 
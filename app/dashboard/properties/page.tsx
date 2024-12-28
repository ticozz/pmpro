'use client';

import { PropertyList } from "@/components/properties/property-list";
import { useProperties } from "@/hooks/use-properties";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Home, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { designSystem } from "@/lib/design-system";

export default function PropertiesPage() {
  const { properties, isLoading, deleteProperty } = useProperties();
  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const totalProperties = properties.length;
  const totalUnits = properties.reduce((acc, property) => acc + (property.units?.length || 0), 0);
  const activeProperties = properties.filter(p => p.status === "ACTIVE").length;
    
  
  const totalRevenue = properties.reduce((acc, property) => acc + (property.units?.reduce((sum, unit) => sum + (unit.rent || 0), 0) || 0), 0);
  

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className={cn(
            "text-2xl font-bold",
            designSystem.colors.text.primary
          )}>
            Properties
          </h1>
          <p className={designSystem.colors.text.secondary}>
            Manage your property portfolio
          </p>
        </div>
        <Button onClick={() => router.push('/dashboard/properties/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Add Property
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProperties}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Units</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUnits}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Properties</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProperties}</div>
          </CardContent>
        </Card>
      </div>

      <PropertyList 
        properties={properties}
        onDelete={deleteProperty}
      />
    </div>
  );
} 
'use client';
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { UnitList } from './unit-list';
import { PropertyFinancials } from './property-financials';
import { MaintenanceList } from './maintenance-list';
import { DocumentList } from './document-list';

interface PropertyTabsProps {
  property: {
    id: string;
    units?: any[];
    documents?: {
      id: string;
      title: string;
      type: "LEASE" | "INVOICE" | "MAINTENANCE" | "INSPECTION" | "INSURANCE" | "LEGAL" | "OTHER";
      createdAt: string;
    }[];
  };
}

export function PropertyTabs({ property }: PropertyTabsProps) {
  console.log('PropertyTabs property:', property); // Debug log

  return (
    <Tabs defaultValue="units" className="w-full">
      <TabsList>
        <TabsTrigger value="units">Units</TabsTrigger>
        <TabsTrigger value="financials">Financials</TabsTrigger>
        <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
      </TabsList>
      <TabsContent value="units">
        <UnitList 
          propertyId={property.id} 
          units={property.units || []} 
          onUnitAdded={() => {
            // Refresh property data
            window.location.reload();
          }}
        />
      </TabsContent>
      <TabsContent value="financials">
        <PropertyFinancials property={property} />
      </TabsContent>
      <TabsContent value="maintenance">
        <MaintenanceList property={property} />
      </TabsContent>
      <TabsContent value="documents">
        <DocumentList property={property} />
      </TabsContent>
    </Tabs>
  );
} 
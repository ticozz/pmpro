'use client';
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { UnitList } from './unit-list';
import { PropertyFinancials } from './property-financials';
import { MaintenanceList } from '../maintenance/maintenance-list';
import { DocumentList } from './document-list';
import { Building2, DollarSign, Wrench, FileText } from "lucide-react";

interface Property {
  id: string;
  units?: any[];
  documents?: {
    id: string;
    title: string;
    type: "MAINTENANCE" | "LEASE" | "INVOICE" | "INSPECTION" | "INSURANCE" | "LEGAL" | "OTHER";
    createdAt: string;
  }[];
}

export function PropertyTabs({ property }: { property: Property }) {
  return (
    <Tabs defaultValue="units" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="units" className="flex items-center">
          <Building2 className="mr-2 h-4 w-4" />
          Units
        </TabsTrigger>
        <TabsTrigger value="financials" className="flex items-center">
          <DollarSign className="mr-2 h-4 w-4" />
          Financials
        </TabsTrigger>
        <TabsTrigger value="maintenance" className="flex items-center">
          <Wrench className="mr-2 h-4 w-4" />
          Maintenance
        </TabsTrigger>
        <TabsTrigger value="documents" className="flex items-center">
          <FileText className="mr-2 h-4 w-4" />
          Documents
        </TabsTrigger>
      </TabsList>
      <TabsContent value="units" className="mt-6">
        <UnitList 
          propertyId={property.id} 
          units={property.units || []} 
          onUnitAdded={() => {
            window.location.reload();
          }}
        />
      </TabsContent>
      <TabsContent value="financials" className="mt-6">
        <PropertyFinancials property={property} />
      </TabsContent>
      <TabsContent value="maintenance" className="mt-6">
        <MaintenanceList property={property} />
      </TabsContent>
      <TabsContent value="documents" className="mt-6">
        <DocumentList property={property} />
      </TabsContent>
    </Tabs>
  );
} 
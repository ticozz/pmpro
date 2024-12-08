'use client';
import { PropertyListContainer } from '@/components/properties/property-list-container';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function PropertiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Properties</h1>
          <p className="text-gray-600">Manage your property portfolio</p>
        </div>
        <Link href="/properties/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </Button>
        </Link>
      </div>
      <PropertyListContainer />
    </div>
  );
} 
'use client';
import React from 'react';
import { Search, LayoutGrid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Selectui, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const propertyTypes = [
  { label: 'All Types', value: 'all' },
  { label: 'Residential', value: 'RESIDENTIAL' },
  { label: 'Commercial', value: 'COMMERCIAL' },
  { label: 'Mixed Use', value: 'MIXED' },
];

const statusOptions = [
  { label: 'All Status', value: 'all' },
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Inactive', value: 'INACTIVE' },
];

interface PropertyFiltersProps {
  viewType: 'grid' | 'list';
  onViewChange: (value: 'grid' | 'list') => void;
}

export function PropertyFilters({ viewType, onViewChange }: PropertyFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="flex items-center h-10">
            <Input
              placeholder="Search properties..."
              className="h-full"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Selectui>
            <SelectTrigger className="h-10 w-[180px]">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Selectui>
          <Selectui>
            <SelectTrigger className="h-10 w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Selectui>
          <ToggleGroup type="single" value={viewType} onValueChange={onViewChange} className="h-10">
            <ToggleGroupItem 
              value="grid" 
              aria-label="Grid view"
              className="data-[state=on]:bg-blue-600 data-[state=on]:text-white hover:text-blue-600 hover:bg-blue-50 px-3"
            >
              <LayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="list" 
              aria-label="List view"
              className="data-[state=on]:bg-blue-600 data-[state=on]:text-white hover:text-blue-600 hover:bg-blue-50 px-3"
            >
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
} 
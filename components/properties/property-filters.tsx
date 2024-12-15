'use client';

import React from 'react';
import { Search, LayoutGrid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Selectui, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { designSystem } from '@/lib/design-system';
import { cn } from '@/lib/utils';

const propertyTypes = [
  { label: 'All Types', value: 'all' },
  { label: 'Residential', value: 'RESIDENTIAL' },
  { label: 'Commercial', value: 'COMMERCIAL' },
  { label: 'Mixed Use', value: 'MIXED' },
] as const;

const statusOptions = [
  { label: 'All Status', value: 'all' },
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Inactive', value: 'INACTIVE' },
] as const;

export function PropertyFilters() {
  return (
    <div className={cn(
      "p-4 rounded-lg",
      designSystem.effects.card,
      "mb-6"
    )}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="flex items-center h-10">
            <Input
              placeholder="Search properties..."
              className={cn(
                "h-full",
                "border-input bg-background",
                designSystem.effects.blur
              )}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Selectui>
            <SelectTrigger className={cn(
              "h-10 w-[180px]",
              "border-input bg-background",
              designSystem.effects.blur
            )}>
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent className={cn(designSystem.dropdown.content.base)}>
              <div className={designSystem.dropdown.content.inner}>
                {propertyTypes.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className={cn(
                      designSystem.dropdown.content.item.base,
                      designSystem.dropdown.content.item.hover
                    )}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </div>
            </SelectContent>
          </Selectui>
          <Selectui>
            <SelectTrigger className={cn(
              "h-10 w-[140px]",
              "border-input bg-background",
              designSystem.effects.blur
            )}>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className={cn(designSystem.dropdown.content.base)}>
              <div className={designSystem.dropdown.content.inner}>
                {statusOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className={cn(
                      designSystem.dropdown.content.item.base,
                      designSystem.dropdown.content.item.hover
                    )}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </div>
            </SelectContent>
          </Selectui>
        </div>
      </div>
    </div>
  );
} 
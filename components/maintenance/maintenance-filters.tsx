'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Selectui, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { designSystem } from '@/lib/design-system';
import { cn } from '@/lib/utils';

const statusOptions = [
  { label: 'All Status', value: 'all' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Completed', value: 'COMPLETED' },
];

const priorityOptions = [
  { label: 'All Priorities', value: 'all' },
  { label: 'Low', value: 'LOW' },
  { label: 'Medium', value: 'MEDIUM' },
  { label: 'High', value: 'HIGH' },
  { label: 'Emergency', value: 'EMERGENCY' },
];

const categoryOptions = [
  { label: 'All Categories', value: 'all' },
  { label: 'Plumbing', value: 'PLUMBING' },
  { label: 'Electrical', value: 'ELECTRICAL' },
  { label: 'HVAC', value: 'HVAC' },
  { label: 'General', value: 'GENERAL' },
];

export function MaintenanceFilters() {
  return (
    <div className={cn(
      "bg-white p-4 rounded-lg shadow-sm mb-6",
      designSystem.effects.card
    )}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search requests..."
            className={cn(
              "h-10",
              "border-input bg-background",
              designSystem.effects.blur
            )}
          />
        </div>
        <div className="flex items-center gap-4">
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

          {/* Similar Select components for Priority and Category */}
          
          <Button variant="outline">More Filters</Button>
          <Button variant="outline">Clear Filters</Button>
        </div>
      </div>
    </div>
  );
} 
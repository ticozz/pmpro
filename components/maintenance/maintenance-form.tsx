'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

const maintenanceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'EMERGENCY']),
  category: z.enum(['PLUMBING', 'ELECTRICAL', 'HVAC', 'APPLIANCE', 'STRUCTURAL', 'GENERAL']),
  unitId: z.string().min(1, 'Unit is required'),
  scheduledDate: z.string().optional(),
  assignedToId: z.string().optional(),
});

type MaintenanceFormData = z.infer<typeof maintenanceSchema>;

interface MaintenanceFormProps {
  initialData?: Partial<MaintenanceFormData>;
  units: Array<{ id: string; unitNumber: string; property: { name: string } }>;
  staff: Array<{ id: string; name: string }>;
  isEditing?: boolean;
}

export function MaintenanceForm({ initialData, units, staff, isEditing }: MaintenanceFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, control } = useForm<MaintenanceFormData>({
    resolver: zodResolver(maintenanceSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: MaintenanceFormData) => {
    try {
      setIsLoading(true);
      // ... submission logic here
      router.push('/dashboard/maintenance');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <Input
              {...register('title')}
            />
            <Textarea
              {...register('description')}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        { label: 'Low', value: 'LOW' },
                        { label: 'Medium', value: 'MEDIUM' },
                        { label: 'High', value: 'HIGH' },
                        { label: 'Emergency', value: 'EMERGENCY' },
                      ].map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        { label: 'Plumbing', value: 'PLUMBING' },
                        { label: 'Electrical', value: 'ELECTRICAL' },
                        { label: 'HVAC', value: 'HVAC' },
                        { label: 'Appliance', value: 'APPLIANCE' },
                        { label: 'Structural', value: 'STRUCTURAL' },
                        { label: 'General', value: 'GENERAL' },
                      ].map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={control}
              name="unitId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit.id} value={unit.id}>
                          {`${unit.property.name} - Unit ${unit.unitNumber}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="assignedToId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assign To</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select staff" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">Unassigned</SelectItem>
                      {staff.map((person) => (
                        <SelectItem key={person.id} value={person.id}>
                          {person.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Input
            type="datetime-local"
            {...register('scheduledDate')}
          />
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
          >
            {isEditing ? 'Update' : 'Create'} Work Order
          </Button>
        </div>
      </Card>
    </form>
  );
} 
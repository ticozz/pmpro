'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UnitStatus } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const unitSchema = z.object({
  number: z.string().min(1, "Unit number is required"),
  status: z.nativeEnum(UnitStatus).default(UnitStatus.VACANT),
  size: z.number().min(0).optional(),
  rent: z.number().min(0, "Rent must be 0 or greater"),
  bedrooms: z.number().min(0, "Number of bedrooms must be 0 or greater"),
  bathrooms: z.number().min(0, "Number of bathrooms must be 0 or greater"),
});

const formSchema = z.object({
  units: z.array(unitSchema)
});

type FormValues = z.infer<typeof formSchema>;

interface BulkUnitFormProps {
  propertyId: string;
  unitCount: number;
}

export function BulkUnitForm({ propertyId, unitCount }: BulkUnitFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      units: Array(unitCount).fill({
        number: '',
        status: UnitStatus.VACANT,
        size: 0,
        rent: 0,
        bedrooms: 0,
        bathrooms: 0,
      })
    },
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    setError(null);
    try {
      for (const unit of data.units) {
        const response = await fetch(`/api/properties/${propertyId}/units`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(unit),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || 'Failed to create unit');
        }
      }

      router.push(`/dashboard/properties/${propertyId}`);
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'Failed to create units');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {error && (
          <div className="bg-destructive/15 text-destructive px-4 py-2 rounded-md">
            {error}
          </div>
        )}
        <div className="space-y-4">
          {Array.from({ length: unitCount }).map((_, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="grid grid-cols-6 gap-4">
                <FormField
                  control={form.control}
                  name={`units.${index}.number`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit {index + 1}</FormLabel>
                      <FormControl>
                        <Input placeholder="Unit number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`units.${index}.bedrooms`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bedrooms</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`units.${index}.bathrooms`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bathrooms</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0"
                          step="0.5"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`units.${index}.size`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Size (sq ft)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`units.${index}.rent`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Rent</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => router.push(`/properties/${propertyId}`)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="mr-2">Creating Units...</span>
                <LoadingSpinner />
              </>
            ) : (
              "Create Units"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
} 
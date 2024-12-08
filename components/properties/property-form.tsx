'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Selectui } from '@/components/ui/select';
import { PropertyType } from '@prisma/client';
import { z } from 'zod';
import Select from 'react-select';
import { countries } from 'countries-list';

const propertySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.nativeEnum(PropertyType),
  managerId: z.string().min(1, 'Property Manager is required'),
  address: z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string().min(1, 'ZIP code is required'),
    country: z.string().min(1, 'Country is required'),
  }),
});

type PropertyFormData = z.infer<typeof propertySchema>;

// Mock data for managers - in a real app, this would come from your API
const managers = [
  { id: '1', name: 'Manager 1' },
  { id: '2', name: 'Manager 2' },
  { id: '3', name: 'Manager 3' },
];

// Convert countries object to array of options
const countryOptions = Object.entries(countries).map(([code, country]) => ({
  value: code,
  label: country.name
}));

export function PropertyForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
  });

  const onSubmit = async (data: PropertyFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create property');
      }

      router.push('/dashboard/properties');
      router.refresh();
    } catch (error) {
      console.error('Error creating property:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name">Property Name</label>
          <Input id="name" {...register('name')} />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="type">Property Type</label>
          <Selectui {...register('type')}>
            <option value="">Select type</option>
            {Object.values(PropertyType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Selectui>
          {errors.type && (
            <p className="text-red-500 text-sm">{errors.type.message}</p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="managerId">Property Manager</label>
          <Selectui {...register('managerId')}>
            <option value="">Select manager</option>
            {managers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.name}
              </option>
            ))}
          </Selectui>
          {errors.managerId && (
            <p className="text-red-500 text-sm">{errors.managerId.message}</p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Address</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="street">Street</label>
            <Input id="street" {...register('address.street')} />
            {errors.address?.street && (
              <p className="text-red-500 text-sm">{errors.address.street.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="city">City</label>
            <Input id="city" {...register('address.city')} />
            {errors.address?.city && (
              <p className="text-red-500 text-sm">{errors.address.city.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="state">State</label>
            <Input id="state" {...register('address.state')} />
            {errors.address?.state && (
              <p className="text-red-500 text-sm">{errors.address.state.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="zipCode">ZIP Code</label>
            <Input id="zipCode" {...register('address.zipCode')} />
            {errors.address?.zipCode && (
              <p className="text-red-500 text-sm">{errors.address.zipCode.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="country">Country</label>
            <Select
              options={countryOptions}
              isSearchable={true}
              placeholder="Start typing..."
              className="react-select"
              classNamePrefix="react-select"
              value={countryOptions.find(option => option.value === watch('address.country'))}
              onChange={(option) => setValue('address.country', option?.value || '')}
            />
            {errors.address?.country && (
              <p className="text-red-500 text-sm">{errors.address.country.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button 
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Property'}
        </Button>
      </div>
    </form>
  );
} 
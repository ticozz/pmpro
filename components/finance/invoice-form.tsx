'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Selectui, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

const invoiceSchema = z.object({
  tenant: z.string().min(1, 'Tenant is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  items: z.array(z.object({
    description: z.string().min(1, 'Description is required'),
    amount: z.number().min(0, 'Amount must be positive'),
  })),
  notes: z.string().optional(),
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

interface InvoiceFormProps {
  tenants: Array<{ id: string; name: string }>;
}

export function InvoiceForm({ tenants }: InvoiceFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const onSubmit = async (data: InvoiceFormData) => {
    try {
      setIsLoading(true);
      await fetch('/api/invoices', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      router.push('/dashboard/finance/invoices');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const { register, handleSubmit, formState: { errors }, control } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
  });

  const [items, setItems] = React.useState([{ description: '', amount: 0 }]);

  const addItem = () => {
    setItems([...items, { description: '', amount: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <div className="p-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={control}
              name="tenant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tenant</FormLabel>
                  <Selectui onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tenant" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tenants.map((tenant) => (
                        <SelectItem key={tenant.id} value={tenant.id}>
                          {tenant.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Selectui>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Input
              type="date"
              {...register('dueDate')}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Invoice Items</h3>
              <Button type="button" variant="outline" onClick={addItem}>
                Add Item
              </Button>
            </div>

            {items.map((item, index) => (
              <div key={index} className="grid gap-4 md:grid-cols-3 items-start">
                <div className="md:col-span-2">
                  <Input
                    {...register(`items.${index}.description`)}
                  />
                </div>
                <div className="flex gap-2 items-end">
                  <Input
                    type="number"
                    {...register(`items.${index}.amount`, {
                      valueAsNumber: true,
                    })}
                  />
                  {items.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <div className="flex justify-end text-lg font-medium">
              Total: ${total.toFixed(2)}
            </div>
          </div>

          <Textarea
            {...register('notes')}
          />
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Create Invoice
          </Button>
        </div>
      </Card>
    </form>
  );
} 
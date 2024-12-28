'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Selectui,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { designSystem } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { Plus } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const formSchema = z.object({
  unitNumber: z.string().min(1, "Unit number is required"),
  type: z.string().min(1, "Unit type is required"),
  bedrooms: z.number().min(0, "Must be 0 or greater"),
  bathrooms: z.number().min(0, "Must be 0 or greater"),
  size: z.number().min(0, "Must be 0 or greater"),
  rent: z.number().min(0, "Must be 0 or greater"),
  features: z.array(z.string()).default([]),
});

type UnitFormValues = z.infer<typeof formSchema>;

interface UnitFormProps {
  propertyId: string;
  onSuccess?: () => void;
}

export function UnitForm({ propertyId, onSuccess }: UnitFormProps) {
  const [open, setOpen] = useState(false);
  console.log('UnitForm propertyId:', propertyId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      unitNumber: "",
      type: "",
      bedrooms: 0,
      bathrooms: 0,
      size: 0,
      rent: 0,
      features: [],
    },
  });

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      console.log("Submitting unit data:", data);
      const response = await fetch(`/api/properties/${propertyId}/units`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          status: 'VACANT',
        }),
      });

      console.log("Response status:", response.status);
      const responseData = await response.json();
      console.log("Response data:", responseData);

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to create unit');
      }

      setOpen(false);
      form.reset();
      router.push(`/dashboard/properties/${propertyId}`);
      router.refresh();
    } catch (error) {
      console.error('Error creating unit:', error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className={cn(
            "gap-2",
            designSystem.colors.primary.gradient,
            "text-white hover:opacity-90"
          )}
        >
          <Plus className="h-4 w-4" />
          Add Unit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add New Unit
          </DialogTitle>
          <DialogDescription>
            Add a new unit to this property. Fill in all the required information below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="unitNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bedrooms</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bathrooms</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size (sq ft)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Rent</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button 
              type="submit"
              className={cn(
                "w-full",
                designSystem.colors.primary.gradient,
                "text-white hover:opacity-90"
              )}
            >
              Create Unit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 
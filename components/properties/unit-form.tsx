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

const unitSchema = z.object({
  unitNumber: z.string().min(1, "Unit number is required"),
  type: z.string().min(1, "Unit type is required"),
  size: z.coerce.number().min(1, "Size is required"),
  rent: z.coerce.number().min(0, "Rent must be 0 or greater"),
  status: z.enum(["VACANT", "OCCUPIED", "MAINTENANCE"]),
});

type UnitFormValues = z.infer<typeof unitSchema>;

interface UnitFormProps {
  propertyId: string;
  onSuccess?: () => void;
}

export function UnitForm({ propertyId, onSuccess }: UnitFormProps) {
  console.log('UnitForm propertyId:', propertyId);

  const form = useForm<UnitFormValues>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      unitNumber: "",
      type: "",
      size: 0,
      rent: 0,
      status: "VACANT",
    },
  });

  async function onSubmit(data: UnitFormValues) {
    try {
      console.log('Submitting with propertyId:', propertyId);
      const response = await fetch(`/api/properties/${propertyId}/units`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Server response:', error);
        throw new Error(error.error || "Failed to create unit");
      }
      
      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error("Error creating unit:", error);
    }
  }

  return (
    <Dialog>
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
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Selectui onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className={cn(
                          "border-input bg-background",
                          designSystem.effects.blur
                        )}>
                          <SelectValue placeholder="Select unit type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className={cn(
                        designSystem.dropdown.content.base,
                        "min-w-[8rem]"
                      )}>
                        <div className={designSystem.dropdown.content.inner}>
                          {[
                            { value: "STUDIO", label: "Studio" },
                            { value: "1BR", label: "1 Bedroom" },
                            { value: "2BR", label: "2 Bedroom" },
                            { value: "3BR", label: "3 Bedroom" },
                          ].map((option) => (
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
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Selectui onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className={cn(
                          "border-input bg-background",
                          designSystem.effects.blur
                        )}>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className={cn(
                        designSystem.dropdown.content.base,
                        "min-w-[8rem]"
                      )}>
                        <div className={designSystem.dropdown.content.inner}>
                          {[
                            { value: "VACANT", label: "Vacant" },
                            { value: "OCCUPIED", label: "Occupied" },
                            { value: "MAINTENANCE", label: "Maintenance" },
                          ].map((option) => (
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
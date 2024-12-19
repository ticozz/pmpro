"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "../../components/ui/use-toast";

const renewalSchema = z.object({
  newStartDate: z.date(),
  newEndDate: z.date(),
  newRentAmount: z.number().min(0, "Rent amount must be positive"),
});

type RenewalFormValues = z.infer<typeof renewalSchema>;

interface LeaseRenewalProps {
  leaseId: string;
  currentEndDate: Date;
  currentRentAmount: number;
  onSuccess?: () => void;
}

export function LeaseRenewal({ leaseId, currentEndDate, currentRentAmount, onSuccess }: LeaseRenewalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RenewalFormValues>({
    resolver: zodResolver(renewalSchema),
    defaultValues: {
      newStartDate: new Date(currentEndDate),
      newRentAmount: currentRentAmount,
    },
  });

  const onSubmit = async (data: RenewalFormValues) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/leases/${leaseId}/renewals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to renew lease");
      }

      toast({
        title: "Success",
        description: "Lease renewal request submitted successfully",
      });
      
      onSuccess?.();
    } catch (error) {
      console.error("Error renewing lease:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit renewal request",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="newStartDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newEndDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="newRentAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Rent Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Renew Lease"}
        </Button>
      </form>
    </Form>
  );
} 
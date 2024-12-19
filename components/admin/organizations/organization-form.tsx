'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useRouter } from "next/navigation";

const organizationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  maxUsers: z.coerce.number().min(1, "Must allow at least 1 user"),
  storageLimit: z.coerce.number().min(1, "Must provide storage limit in GB"),
});

type FormValues = z.infer<typeof organizationSchema>;

export function OrganizationForm() {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
      maxUsers: 5,
      storageLimit: 10,
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      const response = await fetch('/api/admin/organizations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create organization');

      router.push('/admin/organizations');
      router.refresh();
    } catch (error) {
      console.error('Error creating organization:', error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxUsers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Users</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="storageLimit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Storage Limit (GB)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create Organization</Button>
      </form>
    </Form>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface FeatureFlag {
  id: string;
  key: string;
  name: string;
  description: string;
  enabled: boolean;
}

const featureFlagSchema = z.object({
  key: z.string().min(1, "Key is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string(),
  enabled: z.boolean().default(false),
});

export function FeatureFlagsList() {
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(featureFlagSchema),
    defaultValues: {
      key: "",
      name: "",
      description: "",
      enabled: false,
    },
  });

  useEffect(() => {
    fetchFlags();
  }, []);

  const fetchFlags = async () => {
    try {
      const response = await fetch('/api/admin/system/features');
      const data = await response.json();
      setFlags(data);
    } catch (error) {
      console.error('Error fetching feature flags:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof featureFlagSchema>) => {
    try {
      await fetch('/api/admin/system/features', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      fetchFlags();
      setDialogOpen(false);
      form.reset();
    } catch (error) {
      console.error('Error creating feature flag:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Feature Flags</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Feature
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Feature Flag</DialogTitle>
              <DialogDescription>
                Create a new feature flag to control feature availability.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="key">Key</Label>
                <Input
                  id="key"
                  {...form.register("key")}
                  placeholder="feature.new_ui"
                />
                {form.formState.errors.key && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.key.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  {...form.register("name")}
                  placeholder="New UI"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  {...form.register("description")}
                  placeholder="Enable the new UI components"
                />
              </div>
              <Button type="submit">Create Feature Flag</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {flags.map((flag) => (
          <Card key={flag.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{flag.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {flag.description}
                </p>
                <code className="text-xs bg-muted px-1 py-0.5 rounded mt-1 block">
                  {flag.key}
                </code>
              </div>
              <div className="flex items-center gap-4">
                <Switch
                  checked={flag.enabled}
                  onCheckedChange={async (checked: boolean) => {
                    try {
                      await fetch(`/api/admin/system/features/${flag.key}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ enabled: checked }),
                      });
                      fetchFlags();
                    } catch (error) {
                      console.error('Error updating feature flag:', error);
                    }
                  }}
                />
                <div className="space-x-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 
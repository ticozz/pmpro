'use client';

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash } from "lucide-react";

interface FeatureFlag {
  id: string;
  key: string;
  name: string;
  description: string;
  enabled: boolean;
}

export function FeatureFlags() {
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [loading, setLoading] = useState(true);

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

  const toggleFlag = async (id: string, enabled: boolean) => {
    try {
      await fetch(`/api/admin/system/features/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled }),
      });
      fetchFlags();
    } catch (error) {
      console.error('Error updating feature flag:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Feature Flags</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Feature
        </Button>
      </div>

      <div className="grid gap-4">
        {flags.map((flag) => (
          <Card key={flag.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{flag.name}</h3>
                <p className="text-sm text-muted-foreground">{flag.description}</p>
                <code className="text-xs bg-muted px-1 py-0.5 rounded mt-1 block">
                  {flag.key}
                </code>
              </div>
              <div className="flex items-center gap-4">
                <Switch
                  checked={flag.enabled}
                  onCheckedChange={(checked: boolean) => toggleFlag(flag.id, checked)}
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
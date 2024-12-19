'use client';

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";

interface SystemSettings {
  siteName: string;
  maintenanceMode: boolean;
  signupsEnabled: boolean;
  maxFileSize: number;
  supportEmail: string;
  analyticsEnabled: boolean;
  defaultUserRole: string;
}

export function SystemSettings() {
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/system/settings');
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<SystemSettings>) => {
    try {
      await fetch('/api/admin/system/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
      fetchSettings();
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!settings) return <div>No settings available</div>;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">General Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Site Name</label>
            <Input
              value={settings.siteName}
              onChange={(e) => updateSettings({ siteName: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Support Email</label>
            <Input
              type="email"
              value={settings.supportEmail}
              onChange={(e) => updateSettings({ supportEmail: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Max File Size (MB)</label>
            <Input
              type="number"
              value={settings.maxFileSize}
              onChange={(e) =>
                updateSettings({ maxFileSize: parseInt(e.target.value) })
              }
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">System Controls</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Maintenance Mode</p>
              <p className="text-sm text-muted-foreground">
                Enable to show maintenance page to all users
              </p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(checked: boolean) =>
                updateSettings({ maintenanceMode: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">New Signups</p>
              <p className="text-sm text-muted-foreground">
                Allow new users to register
              </p>
            </div>
            <Switch
              checked={settings.signupsEnabled}
              onCheckedChange={(checked: boolean) =>
                updateSettings({ signupsEnabled: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Analytics</p>
              <p className="text-sm text-muted-foreground">
                Enable usage tracking and analytics
              </p>
            </div>
            <Switch
              checked={settings.analyticsEnabled}
              onCheckedChange={(checked: boolean) =>
                updateSettings({ analyticsEnabled: checked })
              }
            />
          </div>
        </div>
      </Card>
    </div>
  );
} 
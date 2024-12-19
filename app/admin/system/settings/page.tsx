import { SystemSettings } from "@/components/admin/system/settings";

export default function SettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">System Settings</h1>
      <SystemSettings />
    </div>
  );
} 
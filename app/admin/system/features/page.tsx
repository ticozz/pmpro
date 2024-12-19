import { FeatureFlagsList } from "@/components/admin/system/feature-flags-list";

export default function FeatureFlagsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Feature Flags</h1>
      <FeatureFlagsList />
    </div>
  );
} 
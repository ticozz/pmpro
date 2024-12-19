import { useEffect, useState } from "react";

export function useFeatureFlag(key: string) {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatureFlag = async () => {
      try {
        const response = await fetch(`/api/admin/system/features/${key}`);
        const data = await response.json();
        setEnabled(data.enabled);
      } catch (error) {
        console.error("Error fetching feature flag:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatureFlag();
  }, [key]);

  return { enabled, loading };
}

"use client";

import { useState, useEffect } from "react";
import { Property, Unit } from "@prisma/client";
import { useOrganization } from "@/components/providers/organization-provider";

interface PropertyWithUnits extends Property {
  units: Unit[];
}

export function useProperties() {
  const [properties, setProperties] = useState<PropertyWithUnits[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { organization } = useOrganization();

  useEffect(() => {
    if (organization) {
      fetchProperties();
    }
  }, [organization]);

  const fetchProperties = async () => {
    try {
      const response = await fetch("/api/properties");
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      await fetch(`/api/properties/${id}`, {
        method: "DELETE",
      });
      setProperties(properties.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  return {
    properties,
    isLoading,
    deleteProperty,
  };
}

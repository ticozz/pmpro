'use client';

import { useRouter } from "next/navigation";
import { BulkUnitForm } from "@/components/units/bulk-unit-form";

interface BulkCreateUnitsPageProps {
  params: {
    id: string;
  };
  searchParams: {
    count: string;
  };
}

export default function BulkCreateUnitsPage({
  params,
  searchParams,
}: BulkCreateUnitsPageProps) {
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      // ... create units logic

      // Update the redirect path to include /dashboard/
      router.push(`/dashboard/properties/${params.id}`);
    } catch (error) {
      console.error("Failed to create units:", error);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Create Multiple Units</h1>
      <BulkUnitForm 
        propertyId={params.id} 
        unitCount={parseInt(searchParams.count)} 
      />
    </div>
  );
} 
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PropertyEditFormClient } from "@/components/properties/property-edit-form-client";

interface PropertyEditPageProps {
  params: {
    id: string;
  };
}

export default async function PropertyEditPage({ params }: PropertyEditPageProps) {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
    include: {
      address: true,
      manager: true,
    },
  });

  if (!property) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Property</h1>
        <p className="text-muted-foreground">
          Make changes to your property information here.
        </p>
      </div>
      <PropertyEditFormClient property={property as any} />
    </div>
  );
} 
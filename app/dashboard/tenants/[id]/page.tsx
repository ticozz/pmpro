import { TenantDetail } from "@/components/tenants/tenant-detail";

interface TenantPageProps {
  params: {
    id: string;
  };
}

export default function TenantPage({ params }: TenantPageProps) {
  return (
    <div className="container mx-auto py-6">
      <TenantDetail tenantId={params.id} />
    </div>
  );
} 
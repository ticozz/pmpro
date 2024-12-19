import { TenantForm } from "@/components/tenants/tenant-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateTenantPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Add New Tenant</h1>
        <Link href="/dashboard/tenants">
          <Button variant="outline">Back to Tenants</Button>
        </Link>
      </div>
      <div className="border rounded-lg p-6 bg-card">
        <TenantForm />
      </div>
    </div>
  );
} 
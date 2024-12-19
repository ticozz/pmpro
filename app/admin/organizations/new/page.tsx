import { OrganizationForm } from "@/components/admin/organizations/organization-form";

export default function NewOrganizationPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create Organization</h1>
      <div className="max-w-2xl">
        <OrganizationForm />
      </div>
    </div>
  );
} 
import { OrganizationList } from "@/components/admin/organizations/organization-list";

export default function OrganizationsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Organizations</h1>
      <OrganizationList />
    </div>
  );
} 
import { LeaseForm } from "@/components/leases/lease-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateLeasePage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Create New Lease</h1>
        <Button variant="outline">
          <Link href="/dashboard/leases">Back to Leases</Link>
        </Button>
      </div>
      <div className="border rounded-lg p-6 bg-card">
        <LeaseForm />
      </div>
    </div>
  );
} 
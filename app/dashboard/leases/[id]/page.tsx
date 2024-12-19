import { LeaseDetails } from "@/components/leases/lease-details";

interface LeasePageProps {
  params: {
    id: string;
  };
}

export default function LeasePage({ params }: LeasePageProps) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <LeaseDetails id={params.id} />
    </div>
  );
} 
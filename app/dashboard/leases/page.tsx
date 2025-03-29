import { LeaseList } from "@/components/leases/lease-list";
import { LeaseStats } from "@/components/leases/lease-stats";
import { prisma } from "@/lib/prisma";

export default async function LeasesPage() {
  const [leases, totalUnits] = await Promise.all([
    prisma.lease.findMany({
      include: {
        unit: {
          include: {
            property: true,
          },
        },
        tenants: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.unit.count(),
  ]);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Leases</h2>
      </div>
      <LeaseStats leases={leases} totalUnits={totalUnits} />
      <LeaseList data={leases} />
    </div>
  );
} 
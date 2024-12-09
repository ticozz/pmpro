import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const tenants = await prisma.tenant.groupBy({
      by: ["status"],
      _count: {
        _all: true,
      },
    });

    const leaseTypes = await prisma.lease.groupBy({
      by: ["type"],
      _count: {
        _all: true,
      },
    });

    const propertyTypes = await prisma.property.groupBy({
      by: ["type"],
      _count: {
        _all: true,
      },
    });

    return NextResponse.json({
      tenantStatus: tenants.map((t) => ({
        label: t.status,
        value: t._count._all,
      })),
      leaseTypes: leaseTypes.map((l) => ({
        label: l.type,
        value: l._count._all,
      })),
      propertyTypes: propertyTypes.map((p) => ({
        label: p.type,
        value: p._count._all,
      })),
    });
  } catch (error) {
    console.error("Error fetching demographics:", error);
    return NextResponse.json(
      { error: "Failed to fetch demographics" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Protect the route with a secret header
const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(req: Request) {
  try {
    // Verify the request is from the cron job
    const authHeader = req.headers.get("x-cron-secret");
    if (authHeader !== CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    // Update all expired leases
    await prisma.$transaction(async (tx) => {
      // Update lease statuses
      const { count: updatedLeases } = await tx.lease.updateMany({
        where: {
          status: "ACTIVE",
          endDate: {
            lt: now,
          },
        },
        data: {
          status: "EXPIRED",
        },
      });

      // Update unit statuses for units with no active leases
      await tx.unit.updateMany({
        where: {
          leases: {
            none: {
              status: "ACTIVE",
            },
          },
        },
        data: {
          status: "VACANT",
        },
      });

      return { updatedLeases };
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[LEASE_CRON_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

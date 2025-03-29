import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LeaseStatusService } from "@/lib/services/lease-status";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get organization ID from session
    const organizationId = session.user.organizationId;
    if (!organizationId) {
      return NextResponse.json(
        { error: "No organization found" },
        { status: 400 }
      );
    }

    console.log(
      "[LEASE_STATUS_UPDATE] Starting update for org:",
      organizationId
    );
    // Update lease statuses for the organization
    await LeaseStatusService.updateLeaseStatuses(organizationId);
    console.log("[LEASE_STATUS_UPDATE] Update completed");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[LEASE_STATUS_UPDATE]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

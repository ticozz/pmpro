import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MaintenanceStatus, MaintenanceCategory } from "@prisma/client";

export async function GET() {
  try {
    const categories = Object.values(MaintenanceCategory);
    const statuses = Object.values(MaintenanceStatus);

    const maintenanceData = await Promise.all(
      categories.map(async (category) => {
        const statusCounts = await Promise.all(
          statuses.map(async (status) => {
            const count = await prisma.maintenanceRequest.count({
              where: {
                category,
                status,
              },
            });
            return { status, count };
          })
        );

        return {
          category,
          open:
            statusCounts.find((s) => s.status === MaintenanceStatus.OPEN)
              ?.count || 0,
          inProgress:
            statusCounts.find((s) => s.status === MaintenanceStatus.IN_PROGRESS)
              ?.count || 0,
          completed:
            statusCounts.find((s) => s.status === MaintenanceStatus.COMPLETED)
              ?.count || 0,
        };
      })
    );

    return NextResponse.json(maintenanceData);
  } catch (error) {
    console.error("Error fetching maintenance stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch maintenance statistics" },
      { status: 500 }
    );
  }
}

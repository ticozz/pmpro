import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const managers = await prisma.user.findMany({
      where: {
        role: "MANAGER",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });

    const formattedManagers = managers.map((manager) => ({
      id: manager.id,
      name: `${manager.firstName} ${manager.lastName}`,
    }));

    return NextResponse.json(formattedManagers);
  } catch (error) {
    console.error("Error fetching managers:", error);
    return NextResponse.json(
      { error: "Failed to fetch managers" },
      { status: 500 }
    );
  }
}

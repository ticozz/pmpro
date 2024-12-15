import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { UserRole } from "@prisma/client";

export async function GET() {
  try {
    const managers = await prisma.user.findMany({
      where: {
        role: {
          in: [UserRole.ADMIN, UserRole.MANAGER],
        },
        status: "ACTIVE",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });

    // Format the response to include full name
    const formattedManagers = managers.map((manager) => ({
      id: manager.id,
      name: `${manager.firstName} ${manager.lastName}`.trim(),
    }));

    return NextResponse.json(formattedManagers);
  } catch (error) {
    console.error("[MANAGERS_GET]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

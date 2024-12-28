import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma-client";

export async function GET(
  request: Request,
  { params }: { params: { propertyId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const requests = await prisma.maintenanceRequest.findMany({
      where: {
        unit: {
          propertyId: params.propertyId,
        },
      },
      include: {
        unit: {
          include: {
            property: true,
          },
        },
        requestedBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(requests);
  } catch (error) {
    console.error("Error fetching maintenance requests:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

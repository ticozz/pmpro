import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "next-auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = (await getServerSession(authOptions)) as Session & {
      user: {
        id: string;
        name?: string;
        email?: string;
      };
    };
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const maintenanceRequests = await prisma.maintenanceRequest.findMany({
      where: {
        unit: {
          propertyId: params.id,
        },
      },
      include: {
        unit: true,
        requestedBy: true,
        assignedVendor: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(maintenanceRequests);
  } catch (error) {
    console.error("Error fetching maintenance requests:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = (await getServerSession(authOptions)) as Session & {
      user: {
        id: string;
        name?: string;
        email?: string;
      };
    };
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await request.json();
    const maintenanceRequest = await prisma.maintenanceRequest.create({
      data: {
        title: json.title,
        description: json.description,
        priority: json.priority,
        status: json.status || "OPEN",
        category: json.category,
        unitId: json.unitId,
        requestedById: session.user.id,
        ...(json.vendorId && { vendorId: json.vendorId }),
        ...(json.scheduledDate && {
          scheduledDate: new Date(json.scheduledDate),
        }),
        ...(json.cost && { cost: parseFloat(json.cost) }),
        ...(json.notes && { notes: json.notes }),
        ...(json.images && { images: json.images }),
      },
    });

    return NextResponse.json(maintenanceRequest);
  } catch (error) {
    console.error("Error creating maintenance request:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

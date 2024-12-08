import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from "@/lib/auth-utils";

interface RouteParams {
  params: { id: string };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const user = await requireAuth();
    if ('error' in user) {
      return user;
    }

    const maintenanceRequest = await prisma.maintenanceRequest.findUnique({
      where: { id: params.id },
      include: {
        unit: {
          include: {
            property: true
          }
        },
        requestedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        assignedVendor: true
      }
    });

    if (!maintenanceRequest) {
      return NextResponse.json(
        { error: "Maintenance request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(maintenanceRequest);
  } catch (error) {
    console.error('Maintenance GET error:', error);
    return NextResponse.json(
      { error: "Failed to fetch maintenance request" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const user = await requireAuth();
    if ('error' in user) {
      return user;
    }

    const body = await request.json();
    const maintenance = await prisma.maintenanceRequest.update({
      where: { id: params.id },
      data: body
    });

    return NextResponse.json(maintenance);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const user = await requireAuth();
    if ('error' in user) {
      return user;
    }

    await prisma.maintenanceRequest.delete({
      where: { id: params.id }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
} 
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-utils';
import { MaintenanceCategory, MaintenanceStatus } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const user = await requireAuth();
    if ('error' in user) {
      return user;
    }

    const maintenanceRequests = await prisma.maintenanceRequest.findMany({
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
        }
      }
    });

    return NextResponse.json(maintenanceRequests);
  } catch (error) {
    console.error('Maintenance GET error:', error);
    return NextResponse.json(
      { error: "Failed to fetch maintenance requests" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAuth();
    if ('error' in user) {
      return user;
    }

    const body = await request.json();
    const { title, description, priority, unitId } = body;

    const newMaintenanceRequest = await prisma.maintenanceRequest.create({
      data: {
        title,
        description,
        priority,
        status: MaintenanceStatus.OPEN,
        category: MaintenanceCategory.GENERAL,
        unitId,
        requestedById: user.id,
      },
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
        }
      }
    });

    return NextResponse.json(newMaintenanceRequest, { status: 201 });
  } catch (error) {
    console.error('Maintenance POST error:', error);
    return NextResponse.json(
      { error: "Failed to create maintenance request" },
      { status: 500 }
    );
  }
} 
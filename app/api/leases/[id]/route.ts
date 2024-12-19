import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const lease = await prisma.lease.findUnique({
      where: {
        id: params.id,
        organizationId: session.user.organizationId,
      },
      include: {
        unit: {
          include: {
            property: {
              select: {
                name: true,
              },
            },
          },
        },
        tenants: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!lease) {
      return NextResponse.json({ error: "Lease not found" }, { status: 404 });
    }

    return NextResponse.json(lease);
  } catch (error) {
    console.error("[LEASE_GET]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.lease.delete({
      where: {
        id: params.id,
        organizationId: session.user.organizationId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[LEASE_DELETE]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

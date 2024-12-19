import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { handleAPIError, APIError } from "@/lib/api-error";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new APIError("Unauthorized", 401);
    }

    const notes = await prisma.tenantNote.findMany({
      where: {
        tenantId: params.id,
      },
      include: {
        createdBy: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(notes);
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new APIError("Unauthorized", 401);
    }

    const { content } = await req.json();
    if (!content?.trim()) {
      throw new APIError("Content is required", 400);
    }

    const note = await prisma.tenantNote.create({
      data: {
        content,
        tenantId: params.id,
        createdById: session.user.id,
      },
      include: {
        createdBy: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    return handleAPIError(error);
  }
}

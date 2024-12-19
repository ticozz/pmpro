import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { handleAPIError, APIError } from "@/lib/api-error";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new APIError("Unauthorized", 401);
    }

    const searchParams = new URL(req.url).searchParams;
    const includeUnits = searchParams.get("include") === "units";

    const properties = await prisma.property.findMany({
      where: {
        organizationId: session.user.organizationId,
      },
      include: {
        _count: {
          select: {
            units: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(properties);
  } catch (error) {
    return handleAPIError(error);
  }
}

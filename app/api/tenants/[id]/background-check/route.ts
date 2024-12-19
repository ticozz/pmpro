import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const backgroundCheck = await prisma.backgroundCheck.create({
      data: {
        ...data,
        status: "COMPLETED",
        tenantId: params.id,
        completedAt: new Date(),
      },
    });

    return NextResponse.json(backgroundCheck, { status: 201 });
  } catch (error) {
    console.error("[BACKGROUND_CHECK_CREATE]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

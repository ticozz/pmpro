import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { DocumentType } from "@prisma/client";
import { StorageService } from "@/lib/storage-service";
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

    const documents = await prisma.document.findMany({
      where: {
        tenantId: params.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(documents);
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

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const type = formData.get("type") as DocumentType;

    if (!file || !title || !type) {
      throw new APIError("Missing required fields", 400);
    }

    const path = `tenants/${params.id}/documents/${Date.now()}-${file.name}`;
    const fileUrl = await StorageService.uploadFile(file, path);

    const document = await prisma.document.create({
      data: {
        title,
        type,
        fileUrl,
        tenantId: params.id,
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    return handleAPIError(error);
  }
}

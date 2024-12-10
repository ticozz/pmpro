import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { OrgType, UserRole, SubStatus } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName, organizationName } =
      await req.json();

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse("User already exists", { status: 400 });
    }

    // Start a transaction to ensure both organization and user are created
    const result = await prisma.$transaction(async (tx) => {
      // Create organization
      const organization = await tx.organization.create({
        data: {
          name: organizationName || `${firstName}'s Organization`,
          type: OrgType.PROPERTY_MANAGER,
          subscription: {
            create: {
              plan: "FREE",
              status: SubStatus.ACTIVE,
              startDate: new Date(),
            },
          },
        },
      });

      // Hash password
      const hashedPassword = await hash(password, 10);

      // Create user and link to organization
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          role: UserRole.ADMIN,
          status: "ACTIVE",
          organization: {
            connect: {
              id: organization.id,
            },
          },
        },
        include: {
          organization: true,
        },
      });

      return { user, organization };
    });

    // Return success response
    return NextResponse.json({
      user: {
        id: result.user.id,
        email: result.user.email,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        organizationId: result.organization.id,
        organizationName: result.organization.name,
      },
    });
  } catch (error) {
    console.error("[REGISTRATION_ERROR]", error);
    return new NextResponse(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Registration failed",
      }),
      { status: 500 }
    );
  }
}

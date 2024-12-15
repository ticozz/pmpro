import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("Received registration data:", data);

    const { email, password, firstName, lastName, organizationName } = data;

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !organizationName) {
      console.log("Missing fields:", {
        email,
        password,
        firstName,
        lastName,
        organizationName,
      });
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Create organization and user in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create organization
      const organization = await tx.organization.create({
        data: { name: organizationName },
      });

      // Hash password
      const hashedPassword = await hash(password, 10);

      // Create user
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          organizationId: organization.id,
          role: UserRole.ADMIN,
        },
      });

      return { user, organization };
    });

    // Return success without sensitive data
    return NextResponse.json({
      user: {
        id: result.user.id,
        email: result.user.email,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
      },
      organization: {
        id: result.organization.id,
        name: result.organization.name,
      },
    });
  } catch (error) {
    console.error("[REGISTER_ERROR]", error);
    return NextResponse.json({ error: "Failed to register" }, { status: 500 });
  }
}

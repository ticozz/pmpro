import { PrismaClient, UserRole } from "@prisma/client";
import { DEFAULT_ROLES } from "../types/rbac";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  try {
    // First, clear existing data
    await prisma.organizationMember.deleteMany();
    await prisma.user.deleteMany();
    await prisma.organization.deleteMany();

    // Create a default organization first
    const organization = await prisma.organization.create({
      data: {
        name: "Default Organization",
      },
    });

    console.log("Created organization:", organization);

    // Hash the password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create an admin user with the organization reference
    const adminUser = await prisma.user.create({
      data: {
        email: "admin@example.com",
        firstName: "Admin",
        lastName: "User",
        password: hashedPassword,
        role: "ADMIN" as UserRole,
        organizationId: organization.id, // Reference the created organization
      },
    });

    console.log("Created admin user:", adminUser);

    // Create organization member relationship
    const orgMember = await prisma.organizationMember.create({
      data: {
        organizationId: organization.id,
        userId: adminUser.id,
        role: DEFAULT_ROLES.ADMIN,
      },
    });

    console.log("Created organization member:", orgMember);
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { prisma } from "./prisma";

export async function verifyOrganizationAccess(
  userId: string,
  organizationId: string
) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      organizationId: organizationId,
    },
  });

  return !!user;
}

export async function setOrganizationContext(organizationId: string) {
  // If using Prisma, you might want to extend the context
  // If using raw SQL, you can set the RLS context here
  return prisma.$executeRaw`SELECT set_config('app.current_organization_id', ${organizationId}, true)`;
}

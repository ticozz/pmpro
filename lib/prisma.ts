import { PrismaClient, Prisma } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export function createPrismaClient(organizationId?: string) {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
  }).$use(async (params, next) => {
    if (organizationId && shouldAddOrgFilter(params.model)) {
      params.args.where = {
        ...params.args.where,
        organization: { id: organizationId },
      };
    }
    return next(params);
  });
}

function shouldAddOrgFilter(model?: string): boolean {
  const orgModels = ["Property", "Unit", "Lease", "Report"];
  return model ? orgModels.includes(model) : false;
}

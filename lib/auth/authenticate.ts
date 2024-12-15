import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";

export async function authenticate(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      password: true,
      role: true,
      organizationId: true,
    },
  });

  if (!user || !(await compare(password, user.password))) {
    return null;
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

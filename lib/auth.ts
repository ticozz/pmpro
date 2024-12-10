import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "661e137b98d5d688ff5a866bcaea56430d60e1d07fb49907efaace2e0f302e1d";

export async function auth() {
  const token = cookies().get("token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
    };
    if (!decoded) return null;

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        organizationId: true,
      },
    });

    return { user };
  } catch (error) {
    return null;
  }
}

export async function authenticate(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
  cookies().set("token", token, { httpOnly: true });

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

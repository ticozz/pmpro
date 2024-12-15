import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        console.log("Authorizing user:", credentials.email);

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            password: true,
            firstName: true,
            lastName: true,
            role: true,
            organizationId: true,
          },
        });

        console.log("Found user in authorize:", {
          ...user,
          password: user?.password ? "[REDACTED]" : null,
        });

        if (!user || !(await compare(credentials.password, user.password))) {
          return null;
        }

        const userData = {
          id: user.id,
          email: user.email,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          role: user.role,
          organizationId: user.organizationId || "",
        };

        console.log("Returning user data:", userData);
        return userData;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      console.log("Session Callback - Initial:", { session, token });

      if (session.user) {
        session.user = {
          ...session.user,
          id: token.sub!,
          firstName: token.firstName as string,
          lastName: token.lastName as string,
          email: token.email!,
          role: token.role as string,
          organizationId: token.organizationId as string,
        };

        console.log("Session Callback - Final Session:", session);
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user: any }) {
      console.log("JWT Callback - Input:", { token, user });

      if (user) {
        // Copy all user data to token
        token = {
          ...token,
          sub: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          organizationId: user.organizationId,
        };

        console.log("JWT Callback - Updated Token:", token);
      }
      return token;
    },
    redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl + "/dashboard";
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { getServerSession } from "next-auth/next";
import { DEFAULT_ROLES } from "@/types/rbac";

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
          console.log("Missing credentials");
          return null;
        }

        try {
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

          console.log("Found user:", {
            ...user,
            password: "[REDACTED]",
            role: user?.role,
          });

          if (!user) {
            console.log("User not found");
            return null;
          }

          const isValidPassword = await compare(
            credentials.password,
            user.password
          );
          if (!isValidPassword) {
            console.log("Invalid password");
            return null;
          }

          // Create the user object to return
          const returnUser = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            organizationId: user.organizationId ?? undefined,
          };

          console.log("Auth successful - returning user:", returnUser);
          return returnUser;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      console.log("JWT Callback - Input:", { token, user });

      // If we have a user, update the token
      if (user) {
        token = {
          ...token,
          sub: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          organizationId: user.organizationId ?? "",
        };
      }

      // Always return the token (don't clear it)
      return token;
    },

    async session({ session, token }): Promise<Session> {
      console.log("Session Callback - Input:", { session, token });

      if (session.user && token) {
        session.user = {
          ...session.user,
          id: token.sub!,
          firstName: token.firstName as string,
          lastName: token.lastName as string,
          email: token.email!,
          role: token.role as string,
          organizationId: token.organizationId as string,
        };
      }

      console.log("Session Callback - Output:", session);
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Just return the URL as is
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  events: {
    signOut: async () => {
      // Clear all auth-related storage
      if (typeof window !== "undefined") {
        window.localStorage.clear();
        window.sessionStorage.clear();
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

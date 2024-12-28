import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      organizationId: string;
    };
  }

  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    organizationId?: string;
  }
}

interface AuthError extends Error {
  type: "AuthError";
  code: "UNAUTHORIZED" | "SESSION_EXPIRED" | "INVALID_CREDENTIALS";
}

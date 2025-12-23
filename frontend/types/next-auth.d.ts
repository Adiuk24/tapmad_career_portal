import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: "applicant" | "hr" | "admin";
    };
  }

  interface User {
    role: "applicant" | "hr" | "admin";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "applicant" | "hr" | "admin";
  }
}


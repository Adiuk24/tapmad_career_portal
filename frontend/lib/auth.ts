import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import bcrypt from "bcryptjs";

// Lazy Prisma access - only load when actually needed
// This prevents connection errors on module load
async function getPrisma() {
  if (!process.env.DATABASE_URL) {
    return null;
  }
  
  try {
    const prismaModule = await import("./prisma");
    return prismaModule.default;
  } catch (error) {
    console.warn("Prisma not available:", error);
    return null;
  }
}

// Don't use Prisma adapter - causes database connection errors
// NextAuth works perfectly in JWT-only mode without adapter
let adapter: any = undefined;

// Validate authOptions before export
function createAuthOptions(): NextAuthOptions {
  try {
    return {
      // Only include adapter if it's available
      ...(adapter ? { adapter } : {}),
      providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null; // NextAuth expects null for invalid credentials
          }

          // Check if database is available
          if (!process.env.DATABASE_URL) {
            console.warn("Database not configured - authentication unavailable");
            return null;
          }

          // Lazy load Prisma only when needed
          const prisma = await getPrisma();
          if (!prisma) {
            console.warn("Database not available - authentication unavailable");
            return null;
          }

          try {
            const user = await prisma.user.findUnique({
              where: { email: credentials.email },
            });

            if (!user || !user.passwordHash) {
              return null; // Invalid credentials
            }

            const isValid = await bcrypt.compare(
              credentials.password,
              user.passwordHash
            );

            if (!isValid) {
              return null; // Invalid password
            }

            return {
              id: user.id,
              email: user.email,
              name: user.fullName,
              role: user.role,
            };
          } catch (dbError: any) {
            console.error("Database error during authentication:", dbError);
            // If database connection fails, return null instead of throwing
            // This prevents HTML error pages
            if (dbError.code === 'P1001' || 
                dbError.code === 'P2002' ||
                dbError.message?.includes('connect') ||
                dbError.message?.includes('Can\'t reach database')) {
              console.warn("Database connection failed - authentication unavailable");
              return null;
            }
            // For other errors, also return null to prevent HTML error pages
            return null;
          }
        } catch (error: any) {
          console.error("Auth error:", error);
          // Return null instead of throwing to prevent HTML error pages
          return null;
        }
      },
    }),
    // Only add OAuth providers if credentials are configured
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })]
      : []),
    ...(process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET
      ? [LinkedInProvider({
          clientId: process.env.LINKEDIN_CLIENT_ID,
          clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        })]
      : []),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
      secret: process.env.NEXTAUTH_SECRET || "fallback-secret-change-in-production",
      debug: process.env.NODE_ENV === 'development',
    };
  } catch (error) {
    console.error("Error creating authOptions:", error);
    // Return minimal valid config if there's an error
    return {
      providers: [],
      session: { strategy: "jwt" },
      secret: process.env.NEXTAUTH_SECRET || "fallback-secret-change-in-production",
    };
  }
}

export const authOptions = createAuthOptions();


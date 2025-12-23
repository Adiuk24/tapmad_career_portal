import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// Create handler once - wrap in try-catch to handle initialization errors
let handler: any = null;
try {
  handler = NextAuth(authOptions);
} catch (error) {
  console.error("NextAuth initialization error:", error);
  // Create a fallback handler that returns JSON errors
  handler = async (req: NextRequest, context: any) => {
    return NextResponse.json(
      { error: "AuthNotConfigured", message: "Authentication is not properly configured" },
      { status: 500 }
    );
  };
}

// Wrap handlers to catch errors and return JSON
async function handleAuth(
  req: NextRequest,
  context: { params: Promise<{ nextauth: string[] }> }
) {
  try {
    // NextAuth v5 expects the handler to be called with req and resolved params
    const resolvedParams = await context.params;
    const response = await handler(req, { params: resolvedParams });
    
    // Ensure response is always JSON
    if (response && response.headers?.get('content-type')?.includes('text/html')) {
      return NextResponse.json(
        { error: "AuthError", message: "Authentication endpoint returned HTML instead of JSON" },
        { status: 500 }
      );
    }
    
    return response;
  } catch (error: any) {
    console.error("NextAuth handler error:", error);
    
    // Ensure we always return JSON, not HTML
    return NextResponse.json(
      {
        error: "AuthenticationError",
        message: error?.message || "An authentication error occurred",
        ...(process.env.NODE_ENV === 'development' && { 
          stack: error?.stack,
          details: String(error)
        }),
      },
      { 
        status: error?.status || 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

export const GET = handleAuth;
export const POST = handleAuth;

export const dynamic = "force-dynamic";

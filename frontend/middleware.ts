import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname;

  // Protected routes that require authentication
  const isProtectedRoute = 
    path.startsWith("/dashboard") || 
    path.startsWith("/apply") ||
    path.startsWith("/applications");

  // If it's a protected route, we'll let the layout components handle auth
  // The middleware just allows the request through
  // Authentication checks are done in the layout components
  if (isProtectedRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/apply/:path*",
    "/applications/:path*",
  ],
};

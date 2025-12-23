"use client";

import { api } from "./api";

/**
 * Exchange NextAuth session for backend JWT token after login
 * Call this after successful NextAuth login
 */
export async function exchangeTokenAfterLogin() {
  try {
    // Get NextAuth session
    const sessionResponse = await fetch("/api/auth/session");
    if (!sessionResponse.ok) {
      return false;
    }
    
    const session = await sessionResponse.json();
    if (!session?.user?.id) {
      return false;
    }

    // Exchange for backend token (this will cache it)
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
    const exchangeResponse = await fetch(`${API_URL}/auth/exchange-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session.user.id,
        email: session.user.email,
        role: session.user.role,
      }),
    });

    if (!exchangeResponse.ok) {
      return false;
    }

    const { token } = await exchangeResponse.json();
    
    // Cache the token
    if (token) {
      localStorage.setItem("backend_jwt_token", token);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Error exchanging token:", error);
    return false;
  }
}

/**
 * Clear backend JWT token (call on logout)
 */
export function clearBackendToken() {
  localStorage.removeItem("backend_jwt_token");
}


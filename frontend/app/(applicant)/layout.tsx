"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { clearBackendToken } from "@/lib/auth-helper";

export default function ApplicantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold">Tapmad Careers</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/jobs">
              <Button variant="ghost">Browse Jobs</Button>
            </Link>
            <Link href="/applications">
              <Button variant="ghost">My Applications</Button>
            </Link>
            <span className="text-sm text-gray-600">{session.user.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                clearBackendToken();
                signOut({ callbackUrl: "/" });
              }}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}


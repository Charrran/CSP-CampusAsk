"use client";

import { useAuth } from "@/context/auth-context";

export function LogoutButton({ children, className }: { children: React.ReactNode, className?: string }) {
  const { logout } = useAuth();

  return (
    <button onClick={logout} className={className}>
      {children}
    </button>
  );
}

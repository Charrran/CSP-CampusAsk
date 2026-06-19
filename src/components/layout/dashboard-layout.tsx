"use client";

import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import type { NavItem } from "@/types";

interface DashboardLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
  pageTitle: string;
}

export function DashboardLayout({
  children,
  navItems,
  pageTitle,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar navItems={navItems} />

      {/* Main content area */}
      <div className="flex min-h-screen min-w-0 flex-col lg:ml-[260px]">
        <Topbar title={pageTitle} />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

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

      {/* Main content area — offset by sidebar width */}
      <div className="lg:ml-[260px] flex flex-col min-h-screen">
        <Topbar title={pageTitle} />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

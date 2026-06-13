"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ADMIN_NAV_ITEMS } from "@/types";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout navItems={ADMIN_NAV_ITEMS} pageTitle="Admin Dashboard">
      {children}
    </DashboardLayout>
  );
}

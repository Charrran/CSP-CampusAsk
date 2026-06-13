"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { STUDENT_NAV_ITEMS } from "@/types";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout navItems={STUDENT_NAV_ITEMS} pageTitle="Student Dashboard">
      {children}
    </DashboardLayout>
  );
}

"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { FACULTY_NAV_ITEMS } from "@/types";

export default function FacultyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout navItems={FACULTY_NAV_ITEMS} pageTitle="Faculty Dashboard">
      {children}
    </DashboardLayout>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen font-body bg-[#faf5ee] text-[#3a302a]">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 w-full bg-[#3a302a] text-white p-4 flex justify-between items-center z-20 shadow-md">
        <h1 className="font-display text-xl font-bold tracking-tight">CampusAsk</h1>
        <button onClick={() => setIsSidebarOpen(true)} className="text-white p-2">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </header>

      {/* Sidebar (Espresso SideNavBar) */}
      <aside className={`fixed left-0 top-0 h-full flex flex-col py-6 z-40 bg-[#3a302a] w-64 shadow-sm transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="px-6 mb-10 flex justify-between items-start">
          <div>
            <h1 className="font-display text-xl text-white font-bold tracking-tight">CampusAsk</h1>
            <p className="font-label text-xs text-[#e8dccc] tracking-widest uppercase opacity-85 mt-1">Academic Portal</p>
          </div>
          <button className="md:hidden text-white/70 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="flex-1 space-y-2 px-4">
          <Link
            href="/admin/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              pathname === "/admin/dashboard"
                ? "bg-[#e08850] text-[#401a08]"
                : "text-[#ece6dc] hover:bg-white/10"
            }`}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-label font-medium text-sm">Dashboard</span>
          </Link>
          <Link
            href="/admin/users"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              pathname === "/admin/users"
                ? "bg-[#e08850] text-[#401a08]"
                : "text-[#ece6dc] hover:bg-white/10"
            }`}
          >
            <span className="material-symbols-outlined">group</span>
            <span className="font-label font-medium text-sm">User Management</span>
          </Link>
          <Link
            href="/admin/moderation"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              pathname === "/admin/moderation"
                ? "bg-[#e08850] text-[#401a08]"
                : "text-[#ece6dc] hover:bg-white/10"
            }`}
          >
            <span className="material-symbols-outlined">gavel</span>
            <span className="font-label font-medium text-sm">Moderation</span>
          </Link>
          <Link
            href="/admin/analytics"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              pathname === "/admin/analytics"
                ? "bg-[#e08850] text-[#401a08]"
                : "text-[#ece6dc] hover:bg-white/10"
            }`}
          >
            <span className="material-symbols-outlined">analytics</span>
            <span className="font-label font-medium text-sm">System Logs</span>
          </Link>
        </nav>
        <div className="mt-auto px-4 space-y-2">
          <LogoutButton className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-[#ece6dc] hover:bg-white/10 text-left">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label font-medium text-sm">Logout</span>
          </LogoutButton>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="md:ml-64 flex-1 p-4 md:p-8 lg:p-12 mt-16 md:mt-0 overflow-x-hidden max-w-full">
        {children}
      </main>
    </div>
  );
}

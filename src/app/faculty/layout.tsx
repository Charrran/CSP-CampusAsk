"use client";

import Link from "next/link";
import { ReactNode, useState, useEffect } from "react";
import { LogoutButton } from "@/components/logout-button";
import { usePathname } from "next/navigation";

export default function FacultyLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen font-body bg-[#F4F1ED] text-[#3a302a]">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 w-full bg-[#291B15] text-white p-4 flex justify-between items-center z-20 shadow-md">
        <h1 className="font-inter text-xl font-extrabold uppercase tracking-widest text-primary-fixed">
          CampusAsk
        </h1>
        <button onClick={() => setIsSidebarOpen(true)} className="text-white p-2">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </header>

      {/* Sidebar Section */}
      <aside className={`w-64 fixed left-0 top-0 h-screen bg-[#291B15] text-surface-container-lowest flex flex-col py-8 z-40 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="px-8 mb-12 flex justify-between items-start">
          <div>
            <h1 className="font-inter text-2xl font-extrabold uppercase tracking-widest text-primary-fixed">
              CampusAsk
            </h1>
            <p className="text-[10px] text-primary-fixed/60 font-inter uppercase tracking-[0.2em] mt-1">
              Academic Hub
            </p>
          </div>
          <button className="md:hidden text-white/70 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="flex-1 space-y-2 px-4">
          <Link
            href="/faculty/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-secondary-fixed-dim/70 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              dashboard
            </span>
            <span className="font-inter font-medium text-sm">Dashboard</span>
          </Link>
          <Link
            href="/faculty/slots"
            className="flex items-center gap-3 px-4 py-3 text-secondary-fixed-dim/70 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200"
          >
            <span className="material-symbols-outlined">event</span>
            <span className="font-inter font-medium text-sm">Slot Manager</span>
          </Link>
          <Link
            href="/faculty/qa"
            className="flex items-center gap-3 px-4 py-3 text-secondary-fixed-dim/70 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200"
          >
            <span className="material-symbols-outlined">forum</span>
            <span className="font-inter font-medium text-sm">Questions</span>
          </Link>

          <Link
            href="/faculty/analytics"
            className="flex items-center gap-3 px-4 py-3 text-secondary-fixed-dim/70 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200"
          >
            <span className="material-symbols-outlined">analytics</span>
            <span className="font-inter font-medium text-sm">Analytics</span>
          </Link>
        </nav>
        <div className="px-4 mt-auto space-y-2">
          <button className="w-full flex items-center justify-center gap-2 bg-primary py-3 rounded-xl text-white font-inter font-bold text-sm hover:bg-primary-container transition-all active:scale-95 mb-6">
            <span className="material-symbols-outlined text-sm">add</span>
            New Inquiry
          </button>
          <div className="h-px bg-white/10 mx-4 mb-4"></div>

          <LogoutButton className="w-full flex items-center gap-3 px-4 py-3 text-secondary-fixed-dim/50 hover:text-white transition-colors text-left">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-inter font-medium text-sm">Logout</span>
          </LogoutButton>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 min-h-screen p-4 md:p-8 lg:p-12 mt-16 md:mt-0 max-w-full overflow-x-hidden">{children}</main>
    </div>
  );
}

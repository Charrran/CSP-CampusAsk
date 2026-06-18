import Link from "next/link";
import { ReactNode } from "react";
import { LogoutButton } from "@/components/logout-button";

export default function FacultyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen font-body bg-[#F4F1ED] text-[#3a302a]">
      {/* Sidebar Section */}
      <aside className="w-64 fixed left-0 top-0 h-screen bg-[#291B15] text-surface-container-lowest flex flex-col py-8 z-50">
        <div className="px-8 mb-12">
          <h1 className="font-inter text-2xl font-extrabold uppercase tracking-widest text-primary-fixed">
            CampusAsk
          </h1>
          <p className="text-[10px] text-primary-fixed/60 font-inter uppercase tracking-[0.2em] mt-1">
            Academic Hub
          </p>
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
            href="/faculty/groups"
            className="flex items-center gap-3 px-4 py-3 text-secondary-fixed-dim/70 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200"
          >
            <span className="material-symbols-outlined">groups</span>
            <span className="font-inter font-medium text-sm">Study Groups</span>
          </Link>
          <Link
            href="/faculty/library"
            className="flex items-center gap-3 px-4 py-3 text-secondary-fixed-dim/70 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200"
          >
            <span className="material-symbols-outlined">local_library</span>
            <span className="font-inter font-medium text-sm">Library</span>
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
          <Link
            href="/faculty/settings"
            className="flex items-center gap-3 px-4 py-3 text-secondary-fixed-dim/50 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-inter font-medium text-sm">Settings</span>
          </Link>
          <Link
            href="/faculty/support"
            className="flex items-center gap-3 px-4 py-3 text-secondary-fixed-dim/50 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">help</span>
            <span className="font-inter font-medium text-sm">Support</span>
          </Link>
          <LogoutButton className="w-full flex items-center gap-3 px-4 py-3 text-secondary-fixed-dim/50 hover:text-white transition-colors text-left">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-inter font-medium text-sm">Logout</span>
          </LogoutButton>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen p-8 lg:p-12">{children}</main>
    </div>
  );
}

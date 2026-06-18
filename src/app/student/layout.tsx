import Link from "next/link";
import { ReactNode } from "react";
import { LogoutButton } from "@/components/logout-button";

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="antialiased min-h-screen flex w-full overflow-x-hidden font-body bg-[#F4F1ED] text-[#291B15]">
      {/* Left Sidebar (Rich Umber/Espresso) */}
      <aside
        className="w-[280px] flex-shrink-0 sticky top-0 h-screen text-white flex flex-col p-6 z-10 hidden md:flex"
        style={{ backgroundColor: "#291B15" }}
      >
        <div className="mb-10 pl-2">
          <h1 className="text-white text-3xl font-semibold font-body tracking-tight">
            CampusAsk
          </h1>
        </div>
        <nav className="flex flex-col gap-2 flex-1">
          <Link
            href="/student/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-all hover:bg-primary/20"
          >
            <span
              className="material-symbols-outlined text-white"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              grid_view
            </span>
            <span className="text-sm font-semibold tracking-tight">Dashboard</span>
          </Link>
          <Link
            href="/student/qa"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-all hover:bg-primary/20"
          >
            <span className="material-symbols-outlined">forum</span>
            <span className="text-sm font-medium tracking-tight">Q&A</span>
          </Link>
          <Link
            href="/student/booking"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-all hover:bg-primary/20"
          >
            <span className="material-symbols-outlined">calendar_today</span>
            <span className="text-sm font-medium tracking-tight">Bookings</span>
          </Link>
          <div className="mt-auto pt-4 border-t border-white/10">
            <LogoutButton className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-all text-left">
              <span className="material-symbols-outlined">logout</span>
              <span className="text-sm font-medium tracking-tight">Logout</span>
            </LogoutButton>
          </div>
        </nav>
      </aside>

      {/* Mobile Top Bar */}
      <header
        className="md:hidden fixed top-0 w-full text-white p-4 flex justify-between items-center z-20"
        style={{ backgroundColor: "rgb(41, 27, 21)" }}
      >
        <h1 className="text-white text-2xl font-bold font-heading">CampusAsk</h1>
        <button className="text-white">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </header>

      {/* Main Content Layout */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 mt-14 md:mt-0 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}

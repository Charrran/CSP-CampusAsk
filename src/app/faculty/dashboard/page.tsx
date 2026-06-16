"use client";

import React from "react";

export default function FacultyDashboardPage() {
  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h2 className="font-inter text-3xl font-extrabold text-[#291B15] tracking-tight">Faculty Portal</h2>
          <p className="text-on-surface-variant font-inter text-sm font-medium opacity-70">
            Welcome back, Mr. Julian Thorne
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative">
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">
              notifications
            </span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-clay-accent rounded-full border-2 border-background"></span>
          </div>
          <div className="flex items-center gap-3 pl-6 border-l border-outline-variant/40">
            <div className="text-right">
              <p className="font-inter font-bold text-sm text-[#291B15]">Mr. Julian Thorne</p>
              <p className="font-inter text-xs text-on-surface-variant">Senior Teacher, History</p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm bg-surface-container-high flex items-center justify-center">
              <span className="material-symbols-outlined">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Performance Metrics (Top Row) */}
        <section className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
          <div className="bg-[#FCFAF8] p-6 rounded-2xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] flex items-center gap-5 border border-outline-variant/30">
            <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-[#B85D38]">
              <span className="material-symbols-outlined">bolt</span>
            </div>
            <div>
              <p className="text-xs font-inter font-bold uppercase tracking-widest text-on-surface-variant/60">
                Response Rate
              </p>
              <p className="text-2xl font-inter font-extrabold text-[#291B15]">94%</p>
            </div>
          </div>
          <div className="bg-[#FCFAF8] p-6 rounded-2xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] flex items-center gap-5 border border-outline-variant/30">
            <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-container">
              <span className="material-symbols-outlined">star</span>
            </div>
            <div>
              <p className="text-xs font-inter font-bold uppercase tracking-widest text-on-surface-variant/60">
                Student Rating
              </p>
              <p className="text-2xl font-inter font-extrabold text-[#291B15]">4.9/5.0</p>
            </div>
          </div>
          <div className="bg-[#FCFAF8] p-6 rounded-2xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] flex items-center gap-5 border border-outline-variant/30">
            <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed-variant">
              <span className="material-symbols-outlined">history_edu</span>
            </div>
            <div>
              <p className="text-xs font-inter font-bold uppercase tracking-widest text-on-surface-variant/60">
                Resolved Threads
              </p>
              <p className="text-2xl font-inter font-extrabold text-[#291B15]">1,248</p>
            </div>
          </div>
        </section>

        {/* Pending Questions (Main Column) */}
        <section className="col-span-12 lg:col-span-8 bg-[#FCFAF8] p-8 rounded-2xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-outline-variant/30">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-inter text-xl font-extrabold text-[#291B15] uppercase tracking-tight">
              Pending Questions
            </h3>
            <button className="text-primary font-inter font-bold text-sm flex items-center gap-1 hover:underline">
              View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          <div className="space-y-6">
            {/* Question Item 1 */}
            <div className="group p-6 rounded-xl bg-white/50 border border-transparent hover:border-outline-variant/60 hover:shadow-sm transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-inter font-bold rounded-full uppercase tracking-tighter">
                  History
                </span>
                <span className="text-xs font-inter text-on-surface-variant opacity-60">12m ago</span>
              </div>
              <h4 className="font-cormorant text-2xl text-[#291B15] mb-2 group-hover:text-[#B85D38] transition-colors font-bold">
                The impact of industrial revolution on modern bridge design?
              </h4>
              <p className="font-inter text-sm text-on-secondary-container line-clamp-2 leading-relaxed mb-4">
                Mr. Thorne, I'm analyzing the 19th century data. Could the specific steel techniques we discussed last Tuesday be applied to coastal foundations?
              </p>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center text-[10px]">
                  MC
                </div>
                <span className="font-cormorant italic text-[#291B15] font-medium text-lg">Marcus Chen</span>
                <span className="w-1 h-1 bg-outline rounded-full"></span>
                <span className="font-inter text-xs text-on-surface-variant font-bold">11th Grade</span>
              </div>
            </div>

            {/* Question Item 2 */}
            <div className="group p-6 rounded-xl bg-white/50 border border-transparent hover:border-outline-variant/60 hover:shadow-sm transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-inter font-bold rounded-full uppercase tracking-tighter">
                  World History
                </span>
                <span className="text-xs font-inter text-on-surface-variant opacity-60">2h ago</span>
              </div>
              <h4 className="font-cormorant text-2xl text-[#291B15] mb-2 group-hover:text-[#B85D38] transition-colors font-bold">
                Provenance protocols for the Valley of Kings findings?
              </h4>
              <p className="font-inter text-sm text-on-secondary-container line-clamp-2 leading-relaxed mb-4">
                I'm having trouble categorizing the pottery shards found in Chapter 4. The textbook doesn't seem to match the physical tagging system from our class project...
              </p>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center text-[10px]">
                  ER
                </div>
                <span className="font-cormorant italic text-[#291B15] font-medium text-lg">Elena Rodriguez</span>
                <span className="w-1 h-1 bg-outline rounded-full"></span>
                <span className="font-inter text-xs text-on-surface-variant font-bold">12th Grade</span>
              </div>
            </div>
          </div>
        </section>

        {/* Office Hours & Schedule (Side Column) */}
        <aside className="col-span-12 lg:col-span-4 space-y-6">
          {/* Today's Schedule */}
          <div className="bg-[#FCFAF8] p-8 rounded-2xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-outline-variant/30">
            <h3 className="font-inter text-xl font-extrabold text-[#291B15] uppercase tracking-tight mb-6">
              Today's Schedule
            </h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="font-inter font-bold text-sm text-[#291B15]">09:00</span>
                  <div className="w-[2px] flex-1 bg-outline-variant/30 my-2"></div>
                </div>
                <div className="flex-1 pb-6">
                  <div className="bg-white p-4 rounded-xl border-l-4 border-[#B85D38] shadow-sm">
                    <p className="font-inter text-xs font-bold text-[#B85D38] uppercase tracking-tighter mb-1">
                      Office Hours
                    </p>
                    <p className="font-cormorant font-bold text-lg text-[#291B15]">Room 402 - Project Review</p>
                    <p className="font-inter text-xs text-on-surface-variant opacity-70">4 Students Registered</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="font-inter font-bold text-sm text-[#291B15]">14:30</span>
                  <div className="w-[2px] flex-1 bg-outline-variant/30 my-2"></div>
                </div>
                <div className="flex-1 pb-6">
                  <div className="bg-white p-4 rounded-xl border-l-4 border-secondary shadow-sm">
                    <p className="font-inter text-xs font-bold text-secondary uppercase tracking-tighter mb-1">
                      Class
                    </p>
                    <p className="font-cormorant font-bold text-lg text-[#291B15]">Modern History Ethics</p>
                    <p className="font-inter text-xs text-on-surface-variant opacity-70">Room 201</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="font-inter font-bold text-sm text-[#291B15]">16:00</span>
                </div>
                <div className="flex-1">
                  <div className="bg-white p-4 rounded-xl border-l-4 border-outline shadow-sm">
                    <p className="font-inter text-xs font-bold text-on-surface-variant uppercase tracking-tighter mb-1">
                      Staff Meeting
                    </p>
                    <p className="font-cormorant font-bold text-lg text-[#291B15]">Quarterly Review</p>
                    <p className="font-inter text-xs text-on-surface-variant opacity-70">Admin Wing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Groups / Research */}
          <div className="bg-[#291B15] p-8 rounded-2xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] text-surface overflow-hidden relative group">
            <div className="relative z-10">
              <h3 className="font-inter text-lg font-bold text-primary-fixed mb-4">Teaching Overview</h3>
              <p className="font-inter text-sm text-primary-fixed/80 leading-relaxed mb-6">
                Your latest class notes "The Sands of Giza" has received 14 new views this week.
              </p>
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                <div>
                  <p className="text-[10px] font-inter font-bold uppercase text-white/40 mb-1">Student Engagement Rating</p>
                  <p className="text-xl font-bold font-inter">8.42</p>
                </div>
                <span className="material-symbols-outlined text-primary-fixed text-3xl">trending_up</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

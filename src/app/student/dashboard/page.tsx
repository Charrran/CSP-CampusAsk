"use client";

import React from "react";

export default function StudentDashboardPage() {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-4xl font-bold font-heading text-[#291B15] mb-2">Student Portal</h2>
        <p className="text-[#6B5A50] font-medium text-sm">Welcome back, Jordan. Here is what's happening today.</p>
      </div>

      {/* CSS Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
        {/* Left/Main Column */}
        <div className="flex flex-col gap-6">
          {/* Course Shortcuts (Horizontal Scroll) */}
          <div className="bg-[#FCFAF8] border border-[#E3DACD] rounded-xl p-5 shadow-[0_4px_20px_rgba(41,27,21,0.06)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[10px] font-bold text-[#6B5A50] uppercase tracking-[0.2em] font-body">Quick Filters</h2>
            </div>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
              {['All Classes', 'CS101', 'PHY204', 'MAT300'].map((course, idx) => (
                <button
                  key={idx}
                  className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-md bg-white border border-[#E3DACD] px-5 transition-all hover:border-[#b34d19] hover:text-[#b34d19] font-semibold text-xs font-body"
                >
                  <span>{course}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Threads */}
          <div className="bg-[#FCFAF8] border border-[#E3DACD] rounded-xl p-6 shadow-[0_4px_20px_rgba(41,27,21,0.06)] flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold font-heading text-[#291B15]">Active Threads</h2>
              <button className="h-11 px-6 rounded-md bg-[#b34d19] text-white text-xs font-bold hover:brightness-110 shadow-lg shadow-[#b34d19]/20 transition-all flex items-center gap-2 uppercase tracking-wider font-body">
                <span className="material-symbols-outlined text-[18px]">add</span>
                Ask Question
              </button>
            </div>
            <div className="flex flex-col gap-5">
              {/* Thread Item 1 */}
              <div className="group p-5 rounded-lg border border-[#E3DACD] hover:border-[#b34d19]/40 hover:shadow-md transition-all cursor-pointer bg-white/50 hover:-translate-y-[2px]">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex gap-2 items-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#211711] text-white uppercase tracking-widest font-body">CS101</span>
                    <span className="px-2 py-0.5 rounded bg-orange-50 text-orange-700 text-[10px] font-bold border border-orange-100 flex items-center gap-1 uppercase tracking-widest font-body">
                      <span className="material-symbols-outlined text-[12px] font-bold">pending</span>
                      Pending
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-[#6B5A50] font-body">2h ago</span>
                </div>
                <h3 className="text-2xl font-bold text-[#291B15] mb-2 group-hover:text-[#b34d19] transition-colors leading-tight font-heading">
                  How to implement quicksort efficiently in C?
                </h3>
                <p className="text-sm text-[#6B5A50] leading-relaxed line-clamp-2 font-body">
                  I understand the basic concept of pivot selection, but I'm struggling with the in-place partitioning logic without creating additional arrays...
                </p>
              </div>

              {/* Thread Item 2 */}
              <div className="group p-5 rounded-lg border border-[#E3DACD] hover:border-[#b34d19]/40 hover:shadow-md transition-all cursor-pointer bg-white/50 hover:-translate-y-[2px]">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex gap-2 items-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#211711] text-white uppercase tracking-widest font-body">PHY204</span>
                    <span className="px-2 py-0.5 rounded bg-green-50 text-green-700 text-[10px] font-bold border border-green-100 flex items-center gap-1 uppercase tracking-widest font-body">
                      <span className="material-symbols-outlined text-[12px] font-bold">check_circle</span>
                      Resolved
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-[#6B5A50] font-body">1d ago</span>
                </div>
                <h3 className="text-2xl font-bold text-[#291B15] mb-2 group-hover:text-[#b34d19] transition-colors leading-tight font-heading">
                  Chapter 4 Reading Clarification: Wave Functions
                </h3>
                <p className="text-sm text-[#6B5A50] leading-relaxed line-clamp-2 font-body">
                  Could someone explain the physical interpretation of the square of the wave function in the context of probability density?
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#FCFAF8] border border-[#E3DACD] rounded-xl p-6 shadow-[0_10px_40px_-10px_rgba(33,23,17,0.15)] h-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold font-heading text-[#291B15]">Upcoming</h2>
            </div>
            <div className="flex flex-col gap-5">
              {/* Booking Item 1 */}
              <div className="border border-[#E3DACD] rounded-xl p-5 bg-white relative overflow-hidden">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#F4F1ED] flex items-center justify-center border border-[#E3DACD]">
                    <span className="material-symbols-outlined text-[#291B15]">person</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#291B15] leading-tight font-heading">Mr. Smith</h4>
                    <p className="text-[10px] font-bold text-[#6B5A50] uppercase tracking-widest font-body">CS101 Office Hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#b34d19] font-bold mb-5 bg-[#b34d19]/5 py-2.5 px-3 rounded-lg border border-[#b34d19]/10 font-body">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                  <span>Today, 2:00 PM</span>
                </div>
                <button className="w-full h-10 rounded-md bg-[#211711] text-white text-[10px] font-bold hover:bg-[#3D2B21] transition-all flex items-center justify-center gap-2 uppercase tracking-[0.15em] font-body">
                  <span className="material-symbols-outlined text-[18px]">videocam</span>
                  Join Zoom
                </button>
              </div>

              {/* Booking Item 2 */}
              <div className="border border-[#E3DACD] rounded-xl p-5 bg-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#F4F1ED] flex items-center justify-center border border-[#E3DACD]">
                    <span className="material-symbols-outlined text-[#291B15]">person</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#291B15] leading-tight font-heading">Ms. Davis</h4>
                    <p className="text-[10px] font-bold text-[#6B5A50] uppercase tracking-widest font-body">MAT300 Mentorship</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#291B15] font-semibold mb-3 px-3 font-body">
                  <span className="material-symbols-outlined text-[18px] text-[#b34d19]">calendar_today</span>
                  <span>Tomorrow, 10:00 AM</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-[#6B5A50] font-medium px-3 font-body">
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                  <span>Room 302, Science Wing</span>
                </div>
              </div>

              {/* Book Action */}
              <button className="mt-4 w-full h-12 rounded-md border-2 border-[#b34d19] text-[#b34d19] text-[11px] font-bold hover:bg-[#b34d19] hover:text-white transition-all flex items-center justify-center gap-2 uppercase tracking-[0.2em] font-body">
                <span className="material-symbols-outlined text-[20px]">event_available</span>
                New Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

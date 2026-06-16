"use client";

import React from "react";

export default function SlotManagerPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        {/* Header Controls */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-headline text-4xl text-on-surface leading-tight">Manage Availability</h2>
            <p className="text-on-surface-variant mt-1">Week of Oct 23 – Oct 27, 2023</p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center bg-surface-container rounded-lg p-1 border border-outline-variant/30">
              <button className="p-2 hover:bg-surface-container-high rounded transition-colors material-symbols-outlined text-on-surface-variant">
                chevron_left
              </button>
              <span className="px-4 text-sm font-medium">Today</span>
              <button className="p-2 hover:bg-surface-container-high rounded transition-colors material-symbols-outlined text-on-surface-variant">
                chevron_right
              </button>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#B85D38] text-white rounded-lg font-medium shadow-sm hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined">event_available</span>
              <span>Update Schedule</span>
            </button>
          </div>
        </div>

        {/* Calendar Container */}
        <div className="bg-[#FCFAF8] rounded-xl border border-outline-variant/40 shadow-sm overflow-hidden">
          {/* Day Header */}
          <div className="grid grid-cols-[80px_repeat(5,1fr)] bg-surface-container-low border-b border-outline-variant/50">
            <div className="flex items-center justify-center border-r border-outline-variant/30">
              <span className="material-symbols-outlined text-on-surface-variant opacity-40">schedule</span>
            </div>
            <div className="flex flex-col items-center justify-center py-3">
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Mon</span>
              <span className="text-xl font-headline">23</span>
            </div>
            <div className="flex flex-col items-center justify-center py-3 bg-primary/5">
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Tue</span>
              <span className="text-xl font-headline text-primary">24</span>
            </div>
            <div className="flex flex-col items-center justify-center py-3">
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Wed</span>
              <span className="text-xl font-headline">25</span>
            </div>
            <div className="flex flex-col items-center justify-center py-3">
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Thu</span>
              <span className="text-xl font-headline">26</span>
            </div>
            <div className="flex flex-col items-center justify-center py-3">
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Fri</span>
              <span className="text-xl font-headline">27</span>
            </div>
          </div>

          {/* Calendar Content */}
          <div className="relative h-[768px] overflow-y-auto custom-scrollbar">
            {/* Grid Lines Layer */}
            <div className="absolute inset-0 grid grid-cols-[80px_repeat(5,1fr)] grid-rows-[repeat(12,minmax(64px,1fr))] pointer-events-none">
              {[
                "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
                "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
              ].map((time, idx) => (
                <React.Fragment key={time}>
                  <div className="font-body text-xs text-[#605850] text-right pr-4 pt-4 border-r border-outline-variant/40">
                    {time}
                  </div>
                  <div className="border-b border-r border-outline-variant/30"></div>
                  <div className="border-b border-r border-outline-variant/30 bg-primary/[0.02]"></div>
                  <div className="border-b border-r border-outline-variant/30"></div>
                  <div className="border-b border-r border-outline-variant/30"></div>
                  <div className="border-b border-outline-variant/30"></div>
                </React.Fragment>
              ))}
            </div>

            {/* Interactive Slots Layer */}
            <div className="absolute inset-0 grid grid-cols-[80px_repeat(5,1fr)] grid-rows-[repeat(12,64px)]">
              {/* Monday: Available Block */}
              <div className="col-start-2 row-start-2 row-span-3 p-1">
                <div className="h-full w-full bg-[#B85D38]/10 border-l-4 border-[#B85D38] rounded-lg p-3 group hover:bg-[#B85D38]/20 cursor-pointer transition-all">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">Available</span>
                    <button className="material-symbols-outlined text-primary text-sm opacity-0 group-hover:opacity-100">edit</button>
                  </div>
                  <p className="text-xs font-semibold text-on-surface mt-1">Open Office Hours</p>
                  <p className="text-[10px] text-on-surface-variant">09:00 - 12:00</p>
                </div>
              </div>

              {/* Monday: Booked Slot */}
              <div className="col-start-2 row-start-6 row-span-1 p-1">
                <div className="h-full w-full bg-surface-container border-l-4 border-on-surface-variant/40 rounded-lg p-3 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center text-[8px]">ER</div>
                    <span className="font-cormorant text-sm font-semibold text-on-surface">Elena Rossi</span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">topic</span> Project Review
                  </p>
                </div>
              </div>

              {/* Tuesday: Long Available Block */}
              <div className="col-start-3 row-start-4 row-span-6 p-1">
                <div className="h-full w-full bg-[#B85D38]/10 border-l-4 border-[#B85D38] rounded-lg p-3 group hover:bg-[#B85D38]/20 cursor-pointer transition-all">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">Teaching Slot</span>
                  <p className="text-xs font-semibold text-on-surface mt-1">Class: Modern Ethics</p>
                  <p className="text-[10px] text-on-surface-variant">11:00 - 17:00</p>
                </div>
              </div>

              {/* Wednesday: Booked Slots */}
              <div className="col-start-4 row-start-2 row-span-1 p-1">
                <div className="h-full w-full bg-surface-container border-l-4 border-on-surface-variant/40 rounded-lg p-3 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center text-[8px]">MT</div>
                    <span className="font-cormorant text-sm font-semibold text-on-surface">Marcus Thorne</span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">chat</span> Quick Consultation
                  </p>
                </div>
              </div>

              <div className="col-start-4 row-start-3 row-span-1 p-1">
                <div className="h-full w-full bg-surface-container border-l-4 border-on-surface-variant/40 rounded-lg p-3 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center text-[8px]">SJ</div>
                    <span className="font-cormorant text-sm font-semibold text-on-surface">Sarah Jenkins</span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">grade</span> Grade Discussion
                  </p>
                </div>
              </div>

              {/* Friday: Afternoon Availability */}
              <div className="col-start-6 row-start-7 row-span-3 p-1">
                <div className="h-full w-full bg-[#B85D38]/5 border border-dashed border-[#B85D38]/40 rounded-lg p-3 flex flex-col items-center justify-center gap-2 hover:bg-[#B85D38]/10 cursor-pointer transition-colors group">
                  <span className="material-symbols-outlined text-[#B85D38] opacity-40 group-hover:opacity-100">add_circle</span>
                  <span className="text-[10px] font-bold text-[#B85D38] uppercase">Open Slot</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Upcoming Widget */}
          <div className="bg-[#FCFAF8] p-7 rounded-2xl border border-outline-variant/30 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline text-2xl">Upcoming Today</h3>
              <span className="text-xs font-bold text-primary bg-primary-fixed px-2 py-1 rounded">2 BOOKED</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 bg-white rounded-xl shadow-sm border border-outline-variant/20 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 flex flex-col items-center justify-center bg-primary-fixed rounded-lg">
                  <span className="text-xs font-bold text-on-primary-fixed">14</span>
                  <span className="text-[8px] uppercase tracking-tighter text-on-primary-fixed">OCT</span>
                </div>
                <div className="flex-1">
                  <p className="font-cormorant text-base font-bold leading-none">Elena Rossi</p>
                  <p className="text-[10px] text-on-surface-variant mt-1">Project Review · 14:00</p>
                </div>
                <button className="material-symbols-outlined text-on-surface-variant/40 hover:text-primary">more_vert</button>
              </div>

              <div className="flex items-start gap-4 p-3 bg-white rounded-xl shadow-sm border border-outline-variant/20 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 flex flex-col items-center justify-center bg-surface-container-highest rounded-lg">
                  <span className="text-xs font-bold">15</span>
                  <span className="text-[8px] uppercase tracking-tighter">OCT</span>
                </div>
                <div className="flex-1">
                  <p className="font-cormorant text-base font-bold leading-none">Marcus Thorne</p>
                  <p className="text-[10px] text-on-surface-variant mt-1">Quick Consultation · 15:30</p>
                </div>
                <button className="material-symbols-outlined text-on-surface-variant/40 hover:text-primary">more_vert</button>
              </div>
            </div>
            <button className="mt-auto pt-6 text-sm font-bold text-primary hover:underline flex items-center gap-1">
              View all appointments <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Stats Widget */}
          <div className="bg-[#FCFAF8] p-7 rounded-2xl border border-outline-variant/30">
            <h3 className="font-headline text-2xl mb-6">Engagement</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-on-surface-variant font-medium">Slot Fill Rate</span>
                  <span className="font-bold">78%</span>
                </div>
                <div className="w-full bg-outline-variant/30 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[78%]"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-outline-variant/20">
                  <p className="text-xs text-on-surface-variant font-medium">Total Sessions</p>
                  <p className="text-2xl font-headline font-bold text-primary">124</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-outline-variant/20">
                  <p className="text-xs text-on-surface-variant font-medium">Waitlisted</p>
                  <p className="text-2xl font-headline font-bold text-tertiary">12</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Settings */}
          <div className="bg-[#291B15] p-7 rounded-2xl border border-outline-variant/10 text-white flex flex-col">
            <h3 className="font-headline text-2xl text-primary-fixed mb-4">Quick Preferences</h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">Auto-approve Requests</span>
                <div className="relative inline-block w-10 h-5">
                  <input className="sr-only peer" type="checkbox" />
                  <div className="w-full h-full bg-white/20 rounded-full peer-checked:bg-primary transition-colors"></div>
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                </div>
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">Virtual Meeting Only</span>
                <div className="relative inline-block w-10 h-5">
                  <input className="sr-only peer" type="checkbox" defaultChecked />
                  <div className="w-full h-full bg-white/20 rounded-full peer-checked:bg-primary transition-colors"></div>
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                </div>
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">Buffer (15 mins)</span>
                <div className="relative inline-block w-10 h-5">
                  <input className="sr-only peer" type="checkbox" defaultChecked />
                  <div className="w-full h-full bg-white/20 rounded-full peer-checked:bg-primary transition-colors"></div>
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                </div>
              </label>
            </div>
            <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-[10px] font-bold text-primary-fixed-dim uppercase tracking-widest mb-1">Public Link</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/60 truncate">campusask.edu/vance/slots</span>
                <button className="material-symbols-outlined text-sm text-primary-fixed hover:text-white">content_copy</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

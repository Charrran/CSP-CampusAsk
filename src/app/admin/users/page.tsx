"use client";

import React from "react";

export default function AdminUsersPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 flex flex-col md:flex-row md:justify-between items-start md:items-center w-full pb-8 bg-[#faf5ee]">
        <div className="mb-4 md:mb-0">
          <h2 className="font-headline text-4xl font-bold text-primary tracking-tight">Admin User Management</h2>
          <p className="text-secondary font-body mt-1">Managing Vidya Setu scholars and shikshaks</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
            <input 
              className="pl-10 pr-4 py-2 bg-white border border-outline-variant/60 rounded-full text-sm focus:ring-1 focus:ring-primary focus:border-primary w-64 transition-all shadow-sm" 
              placeholder="Global search..." 
              type="text"
            />
          </div>
          <button className="p-2 text-primary hover:bg-[#fbe8d8]/50 rounded-full transition-colors relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#8c3c3c] rounded-full border-2 border-[#faf5ee]"></span>
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/60 shadow-sm">
            <img 
              alt="Admin" 
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8owNYIzPOW2KRhNxHqIBbl4qSuX9rIq8uS-1Koj6NjoPvgV_XQy4EuKZYwjaS-7HrRZ36lNgGFPmZncuKMWOwdSglDL-UxcNCROLELXjW5B-C5GAid__IvRKaBUJjnOUuGxtZoQ68S0SIfNbvjgD2T1Md-vqNFm-qmzw31uZFJ8cASf8U5lgO7yOqmCmmvBXMv05VhgKpH5uxr-9ytHFmS0yq_SjkKQ8LZIx9peHp_BGA7pSmjb6fFPOqx8sOi8PgUAWBBKEakw"
            />
          </div>
        </div>
      </header>

      {/* Metrics Bento Grid */}
      <section className="grid grid-cols-12 gap-6 mb-10">
        {/* Metric Card 1 */}
        <div className="col-span-12 md:col-span-4 bg-[#f6f0e8] p-8 rounded-xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined">school</span>
            </div>
            <p className="font-label text-sm text-secondary uppercase tracking-widest font-semibold">Total Scholars</p>
            <h3 className="font-headline text-5xl font-bold text-[#3a302a] mt-2">12,842</h3>
          </div>
          <div className="mt-6 flex items-center text-xs text-green-700 font-bold gap-1 bg-green-50 border border-green-100 w-fit px-2 py-1 rounded">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span>+12.5% this month</span>
          </div>
        </div>

        {/* Metric Card 2 */}
        <div className="col-span-12 md:col-span-4 bg-[#f6f0e8] p-8 rounded-xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-12 h-12 bg-[#fce0e0] rounded-lg flex items-center justify-center text-[#8c3c3c] mb-4">
              <span className="material-symbols-outlined">groups</span>
            </div>
            <p className="font-label text-sm text-secondary uppercase tracking-widest font-semibold">Active Shikshaks</p>
            <h3 className="font-headline text-5xl font-bold text-[#3a302a] mt-2">1,405</h3>
          </div>
          <div className="mt-6 flex items-center text-xs text-[#3a302a] font-bold gap-1 bg-[#ece6dc] border border-outline-variant/40 w-fit px-2 py-1 rounded">
            <span className="material-symbols-outlined text-sm">fiber_manual_record</span>
            <span>94% Attendance rate</span>
          </div>
        </div>

        {/* Metric Card 3 (Hero Metric) */}
        <div className="col-span-12 md:col-span-4 bg-primary text-[#fbe8d8] p-8 rounded-xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform duration-500">
            <span className="material-symbols-outlined text-9xl">verified_user</span>
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-white mb-4 shadow-sm backdrop-blur-sm">
              <span className="material-symbols-outlined">verified</span>
            </div>
            <p className="font-label text-sm text-white/90 uppercase tracking-widest font-bold">Verification Rate</p>
            <h3 className="font-headline text-5xl font-bold text-white mt-2">98.2%</h3>
          </div>
          <p className="text-sm text-white/80 relative z-10 mt-6 font-medium">Historical high for Q4 2024</p>
        </div>
      </section>

      {/* Detailed Table Section */}
      <section className="bg-white rounded-xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-outline-variant/40 overflow-hidden">
        <div className="p-6 border-b border-outline-variant/40 flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-[#f6f0e8]/50">
          <h3 className="font-headline text-2xl font-bold text-[#3a302a]">Manage Members</h3>
          <div className="flex items-center flex-wrap gap-3">
            <div className="relative flex-1 sm:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
              <input 
                className="pl-9 pr-4 py-2 w-full bg-white border border-outline-variant/60 rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary shadow-sm" 
                placeholder="Filter by name or email..." 
                type="text"
              />
            </div>
            <div className="flex bg-white border border-outline-variant/60 rounded-lg p-1 shadow-sm">
              <button className="px-4 py-1 text-xs font-bold bg-primary text-white rounded-md shadow-sm">All</button>
              <button className="px-4 py-1 text-xs font-bold text-secondary hover:text-primary transition-colors">Scholars</button>
              <button className="px-4 py-1 text-xs font-bold text-secondary hover:text-primary transition-colors">Shikshaks</button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant/60 rounded-lg text-sm font-semibold text-[#3a302a] hover:bg-[#f6f0e8] transition-all shadow-sm">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              More Filters
            </button>
            <button className="p-2 bg-white border border-outline-variant/60 rounded-lg text-[#3a302a] hover:bg-[#f6f0e8] transition-all shadow-sm">
              <span className="material-symbols-outlined">file_download</span>
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f2ece4] text-[#605850] text-xs uppercase tracking-widest font-bold border-b border-outline-variant/40">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Join Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 text-sm">
              {/* Table Row 1 */}
              <tr className="hover:bg-[#fbe8d8]/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#ece6dc] flex items-center justify-center font-bold text-primary">AM</div>
                    <div>
                      <p className="font-bold text-[#3a302a]">Ananya Mishra</p>
                      <p className="text-xs text-secondary mt-0.5">ananya.m@vidyasetu.edu</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-[#fbe8d8] text-[#8a4518] text-[10px] font-bold uppercase rounded tracking-wider">Scholar</span>
                </td>
                <td className="px-6 py-4 text-[#605850] font-medium">Mathematics</td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-xs text-green-700 font-semibold bg-green-50 w-fit px-2 py-1 rounded border border-green-100">
                    <span className="w-2 h-2 rounded-full bg-green-600"></span> Verified
                  </span>
                </td>
                <td className="px-6 py-4 text-secondary font-medium">Oct 12, 2023</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-outline hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </td>
              </tr>
              
              {/* Table Row 2 */}
              <tr className="hover:bg-[#fbe8d8]/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img alt="Vikram" className="w-10 h-10 rounded-full object-cover border border-outline-variant/40" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGuHynxJT3zF0ocuSxCcTjUSi3KC1MmTeNsOpBUT4CQ1m_VEBPNw1sSlB74gUp8UPtIefIvO9BpwowBS3DAGzBxcJpkCxcAFI-MGTJygTgY57MwuMcIkDPnwBl7kpPs79RBS5o7FdZNHherbJ2WNmgOFIWMoTeui6VvL8cL3O8G7hfn8P0qgnvegK0HDJnIaNYwzFiE4YAWGbPG_APvAxrNWm9xCSL0q0IUECc99zoenAYaema6ZGdeS1aS6GRRFat7zNgOjv9HQ"/>
                    <div>
                      <p className="font-bold text-[#3a302a]">Dr. Vikram Singh</p>
                      <p className="text-xs text-secondary mt-0.5">v.singh@faculty.vidya.in</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-[#eae2da] text-[#504840] text-[10px] font-bold uppercase rounded tracking-wider">Shikshak</span>
                </td>
                <td className="px-6 py-4 text-[#605850] font-medium">Literature</td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-xs text-green-700 font-semibold bg-green-50 w-fit px-2 py-1 rounded border border-green-100">
                    <span className="w-2 h-2 rounded-full bg-green-600"></span> Verified
                  </span>
                </td>
                <td className="px-6 py-4 text-secondary font-medium">Feb 05, 2022</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-outline hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </td>
              </tr>
              
              {/* Table Row 3 */}
              <tr className="hover:bg-[#fbe8d8]/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#fce0e0] flex items-center justify-center font-bold text-[#8c3c3c]">RP</div>
                    <div>
                      <p className="font-bold text-[#3a302a]">Rahul Prasad</p>
                      <p className="text-xs text-secondary mt-0.5">rahul.p@vidyasetu.edu</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-[#fbe8d8] text-[#8a4518] text-[10px] font-bold uppercase rounded tracking-wider">Scholar</span>
                </td>
                <td className="px-6 py-4 text-[#605850] font-medium">Physics</td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-xs text-primary font-semibold bg-primary/10 w-fit px-2 py-1 rounded border border-primary/20">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Pending
                  </span>
                </td>
                <td className="px-6 py-4 text-secondary font-medium">Mar 20, 2024</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-outline hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </td>
              </tr>
              
              {/* Table Row 4 */}
              <tr className="hover:bg-[#fbe8d8]/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#ece6dc] flex items-center justify-center font-bold text-primary">SC</div>
                    <div>
                      <p className="font-bold text-[#3a302a]">Sunita Chatterjee</p>
                      <p className="text-xs text-secondary mt-0.5">s.chat@vidyasetu.edu</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-[#fbe8d8] text-[#8a4518] text-[10px] font-bold uppercase rounded tracking-wider">Scholar</span>
                </td>
                <td className="px-6 py-4 text-[#605850] font-medium">History</td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-xs text-green-700 font-semibold bg-green-50 w-fit px-2 py-1 rounded border border-green-100">
                    <span className="w-2 h-2 rounded-full bg-green-600"></span> Verified
                  </span>
                </td>
                <td className="px-6 py-4 text-secondary font-medium">Jan 11, 2023</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-outline hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 bg-[#f2ece4]/50 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-secondary font-medium">Showing <span className="font-bold text-[#3a302a]">4</span> of <span className="font-bold text-[#3a302a]">14,247</span> users</p>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-white border border-outline-variant/60 rounded-lg text-secondary hover:bg-[#f6f0e8] disabled:opacity-50 shadow-sm" disabled>
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="px-3.5 py-1 text-sm font-bold bg-primary text-white rounded-lg shadow-sm">1</button>
            <button className="px-3.5 py-1 text-sm font-bold bg-white border border-outline-variant/60 text-secondary hover:bg-[#f6f0e8] rounded-lg shadow-sm transition-colors">2</button>
            <button className="px-3.5 py-1 text-sm font-bold bg-white border border-outline-variant/60 text-secondary hover:bg-[#f6f0e8] rounded-lg shadow-sm transition-colors">3</button>
            <button className="p-2 bg-white border border-outline-variant/60 rounded-lg text-secondary hover:bg-[#f6f0e8] shadow-sm transition-colors">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import React, { useState } from "react";

export default function AdminModerationPage() {
  const [flaggedItems, setFlaggedItems] = useState([
    {
      id: "VS-9021",
      title: "Regarding the Advanced Vedic Mathematics Seminar...",
      reporter: { initials: "AR", name: "Arjun R." },
      reason: "Spam Policy",
      status: "Pending Review",
      time: "2h ago",
    },
    {
      id: "VS-8842",
      title: "Urgent: Misleading source cited in Faculty Forum",
      reporter: { initials: "PK", name: "Priya K." },
      reason: "Misinformation",
      status: "Awaiting Info",
      time: "5h ago",
    },
    {
      id: "VS-7940",
      title: "Language violation in Sanskrit Etymology discussion",
      reporter: { initials: "ML", name: "Moderator-Bot" },
      reason: "Inappropriate",
      status: "Pending Review",
      time: "12h ago",
    }
  ]);

  const handleAction = (id: string) => {
    setFlaggedItems(flaggedItems.filter(item => item.id !== id));
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h2 className="font-headline text-4xl md:text-5xl text-[#3a302a] leading-tight font-bold">Admin Moderation</h2>
          <p className="font-body text-secondary mt-2 max-w-md">Oversee community integrity and review flagged inquiries within the Vidya Setu platform.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-[#ece6dc] px-4 py-2 rounded-lg flex items-center gap-3 shadow-sm border border-outline-variant/30">
            <span className="material-symbols-outlined text-primary">notifications</span>
            <span className="font-label text-sm font-bold text-[#3a302a]">12 Alerts</span>
          </div>
          <div className="h-12 w-12 rounded-full bg-[#fbe8d8] flex items-center justify-center border border-outline-variant/60 shadow-sm">
            <span className="material-symbols-outlined text-[#8a4518]">account_circle</span>
          </div>
        </div>
      </header>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* User Management Card */}
        <div className="bg-[#f6f0e8] p-8 rounded-xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-outline-variant/30 col-span-1 md:col-span-2 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="relative z-10">
            <h3 className="font-headline text-3xl font-bold text-[#3a302a] mb-6">User Management</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-12">
              <div>
                <p className="font-label text-xs uppercase tracking-widest text-secondary mb-1 font-bold">Total Scholars</p>
                <p className="font-headline text-4xl md:text-5xl text-primary font-bold">12,482</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-green-700 font-bold bg-green-50 px-2 py-1 rounded w-fit border border-green-100">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  <span>12% this month</span>
                </div>
              </div>
              <div className="hidden sm:block w-px h-20 bg-outline-variant/60"></div>
              <div>
                <p className="font-label text-xs uppercase tracking-widest text-secondary mb-1 font-bold">Active Teachers</p>
                <p className="font-headline text-4xl md:text-5xl text-[#8c3c3c] font-bold">845</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-green-700 font-bold bg-green-50 px-2 py-1 rounded w-fit border border-green-100">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  <span>4% this month</span>
                </div>
              </div>
            </div>
          </div>
          {/* Abstract visual element */}
          <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
            <span className="material-symbols-outlined text-[160px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
          </div>
        </div>

        {/* Quick Action Card */}
        <div className="bg-[#3a302a] p-8 rounded-xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="material-symbols-outlined text-[#f0a878] mb-4 text-3xl">verified_user</span>
            <h3 className="font-headline text-3xl text-white font-bold mb-2">System Health</h3>
            <p className="font-body text-[#ece6dc] text-sm mt-2 leading-relaxed opacity-90">Auto-moderation is currently active for 98.4% of incoming threads.</p>
          </div>
          <button className="text-[#f0a878] font-label text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all mt-6">
            View Logs <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Moderation Queue Table */}
      <section className="bg-white rounded-xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-outline-variant/40 overflow-hidden">
        <div className="px-8 py-6 border-b border-outline-variant/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#f6f0e8]/50">
          <h3 className="font-headline text-2xl font-bold text-[#3a302a]">Flagged Inquiries</h3>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-outline-variant/60 rounded-lg text-sm font-label font-bold text-[#605850] hover:bg-[#f6f0e8] transition-colors shadow-sm">Export CSV</button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-label font-bold shadow-md hover:bg-[#B85D38] transition-colors">Bulk Actions</button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f2ece4] border-b border-outline-variant/40">
                <th className="px-8 py-4 font-label text-xs uppercase tracking-widest text-secondary font-bold">Inquiry Details</th>
                <th className="px-8 py-4 font-label text-xs uppercase tracking-widest text-secondary font-bold">Reporter</th>
                <th className="px-8 py-4 font-label text-xs uppercase tracking-widest text-secondary font-bold">Reason</th>
                <th className="px-8 py-4 font-label text-xs uppercase tracking-widest text-secondary font-bold">Status</th>
                <th className="px-8 py-4 font-label text-xs uppercase tracking-widest text-secondary font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {flaggedItems.map((item) => (
                <tr key={item.id} className="hover:bg-[#f6f0e8] transition-colors group">
                  <td className="px-8 py-6 max-w-xs">
                    <p className="font-label font-bold text-[#3a302a] truncate">{item.title}</p>
                    <p className="font-body text-xs text-secondary mt-1 font-medium">ID: #{item.id} • {item.time}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#eae2da] flex items-center justify-center text-xs font-bold text-[#605850] border border-outline-variant/30">{item.reporter.initials}</div>
                      <span className="font-label text-sm font-semibold text-[#3a302a]">{item.reporter.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="bg-[#fce0e0]/50 text-[#8c3c3c] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-[#fce0e0]">
                      {item.reason}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${item.status === 'Pending Review' ? 'bg-primary animate-pulse' : 'bg-secondary'}`}></span>
                      <span className={`font-label text-xs font-bold ${item.status === 'Pending Review' ? 'text-primary' : 'text-secondary'}`}>
                        {item.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleAction(item.id)} className="p-2 text-green-700 hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-200" title="Approve">
                        <span className="material-symbols-outlined">check_circle</span>
                      </button>
                      <button onClick={() => handleAction(item.id)} className="p-2 text-primary hover:bg-[#fbe8d8] rounded-lg transition-colors border border-transparent hover:border-primary/20" title="Warn User">
                        <span className="material-symbols-outlined">warning</span>
                      </button>
                      <button onClick={() => handleAction(item.id)} className="p-2 text-error hover:bg-error-container rounded-lg transition-colors border border-transparent hover:border-error/20" title="Remove">
                        <span className="material-symbols-outlined">delete_forever</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {flaggedItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-secondary font-medium">
                    No flagged items to review.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-8 py-4 border-t border-outline-variant/40 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#f2ece4]/30">
          <p className="font-label text-xs text-secondary font-medium">Showing {flaggedItems.length} of 14 flagged items</p>
          <div className="flex gap-1">
            <button className="p-2 hover:bg-white border border-transparent hover:border-outline-variant/40 rounded-lg transition-all disabled:opacity-30 shadow-sm" disabled>
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="px-3 py-1 bg-primary text-white rounded-lg text-xs font-bold shadow-sm">1</button>
            <button className="px-3 py-1 bg-transparent hover:bg-white border border-transparent hover:border-outline-variant/40 rounded-lg text-xs font-bold text-secondary transition-all shadow-sm">2</button>
            <button className="px-3 py-1 bg-transparent hover:bg-white border border-transparent hover:border-outline-variant/40 rounded-lg text-xs font-bold text-secondary transition-all shadow-sm">3</button>
            <button className="p-2 bg-transparent hover:bg-white border border-transparent hover:border-outline-variant/40 rounded-lg transition-all shadow-sm">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

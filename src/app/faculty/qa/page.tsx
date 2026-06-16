"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function FacultyQAHubPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const inquiries = [
    {
      id: 1,
      studentName: "Rohan Varma",
      program: "B.Tech - II",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzfserjiIYYuPULln7m9d9zVjLacYk3SDaMNFBwBLypmv2eoD73H-p04w_ySGj2cypqZhJY8FJtSEId3e3cqxGDoVuz87nDCgYHfmEs_tbE3WX8WT18RxFfxFQc2TcCRhQoy8qYYbtF7nhwB3p_e3WldHSvM7RrN1g4_miezfmbbvR9k2-7KK2woS44Ao6zqwNSGIcsTvZuMyxsbn62YiiZANnAOonIOYF8aNOH-xPUKFbQzLPbrpR53OsoLjLJA7SIA0UxFnbZA",
      title: "Complex Integration regarding Cauchy's Theorem",
      domain: "Physics",
      snippet: "Could you please clarify the application of the residue theorem when the poles are on the real axis? I am specifically struggling with the Jordan's Lemma application in Exercise 4.2...",
      time: "14 mins ago",
      starred: false,
    },
    {
      id: 2,
      studentName: "Isha Gupta",
      program: "B.Sc - III",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUo93-eiZgq2eh23_rFUUOlZdtEpaoefYDmRLF7GsQslnEU_gaWGlCMDiUHWRWlJeedohdF9GUWUZbsJl4uuSK3MMMceWefezn6HBIbb2PQY3wIsRwKYVguqKN5N2yPsUUcRMZUAVcGhGNPEyyscIduCgFCgTi7VbIKuEcKJfjmqlPavxVSZSbfgZuYtcQ4CQOw7KA01gEDyoINnN1beAt66xbaEUkCzJ_MH2976htgSXHMuqqOG-A796fAfIx_Z0Mos9MhXP-xg",
      title: "Relativity Paradox: The Twins Revisited",
      domain: "Theoretical",
      snippet: "In the twin paradox scenario, if the traveling twin changes frames, does the actual aging process occur instantaneously in the calculation or is it gradual?",
      time: "2 hours ago",
      starred: false,
    },
    {
      id: 3,
      studentName: "Ankit Deshmukh",
      program: "PHD - I",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCN6Hto2pllbmcUn-qFQFi5nXUCWhrCzDmEWXUkI-C5Ljg0JWpws34-K0hsbjtRJfXoTnYfYCoXyDcreCo24VtCDt4Y5bTVZy_rL78ki1QRRdmeenIAcmDReYnh0euNP3TInQ1VWMls1ksm6zWJgjlSpopK0ju06gORDull-v7nxWtICwJxL3UYS9bSrnKH_eKiBDdUO27KObYTEdN1RX1mpoMZnQYhcsrirI9eWGDvYxppGbSOxCPJl-5ST4VZDw9aBrjH6VqDHA",
      title: "Data Analysis for Gravitational Waves Project",
      domain: "Research",
      snippet: "I have encountered some noise anomalies in the latest dataset from the LIGO simulator. I need your guidance on whether we should apply a band-pass filter...",
      time: "5 hours ago",
      starred: true,
    },
    {
      id: 4,
      studentName: "Sneha Roy",
      program: "B.Tech - IV",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7RlHHEXEJIDjlSDI9sxrViiecNWalPQWuqOfVX-1zkM3lirH12anpkOgBQbmp6StprLY9GNi9orNmgl5IXJQKRDE6eTYf-JYcrRP9Fg6SNplaY0h_wsDPsBreK6nq_1qTikRPsPYoXitFjM-YeDEFSh4uv3FbUI4U_5YFOxdDonN3AI6rcLbrC6SOz1nMaZxGLAWWmiabfD6HFyfOE99ISHvfQSc3XBMwVzTHzwiUSmEsa5KFjtAEuYm7Y-jYAjCTN8e_R4cDeA",
      title: "Quantum Tunneling Probabilities",
      domain: "Physics",
      snippet: "When calculating the transmission coefficient for a rectangular potential barrier, how do we handle cases where E is exactly equal to V0?",
      time: "Yesterday",
      starred: false,
    }
  ];

  const filteredInquiries = inquiries.filter(inc => 
    inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inc.snippet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* TopAppBar Anchor */}
      <header className="flex justify-between items-center w-full pb-6 border-b border-outline-variant/60">
        <div className="flex flex-col">
          <h2 className="font-headline text-3xl font-bold text-primary tracking-tight">Faculty Q&amp;A Hub</h2>
          <p className="font-label text-sm text-on-surface-variant">Reviewing pending academic doubts and student queries.</p>
        </div>
        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="relative group hidden md:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
            <input 
              className="bg-white border border-outline-variant/60 rounded-full pl-10 pr-4 py-2 text-sm font-label focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary w-64 transition-all" 
              placeholder="Search inquiries..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 border-l border-outline-variant/60 pl-6">
            <button className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors active:opacity-70">notifications</button>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/60">
                <img 
                  className="w-full h-full object-cover" 
                  alt="Dr. Aranya Sharma" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9DSCSE1vb7FOj0l1WvLjHeGON4dn7e_p3E7lsbzyycvwFweTGjyJE2sOYtDTbByxd3jo6aFornX6Q0U8vvY71VS3Oam-eS7km2w1N_5CHzXj9MhqMKgsrYXJAvLEHLEj0h22xdioLSBdxmny2NDxx_eVBLOywEAYeHbrxx49UcpI_1losjmf3XX68XwKN2rUWHWQFr-bFtiM5QzNle9A3mTQtQHuEhF06mfY00cjJjvP7RBzVn2XyRDv9T-vHS24BHkB6BrX62A"
                />
              </div>
              <div className="hidden lg:block text-right">
                <p className="font-label text-sm font-bold text-[#3a302a] leading-none mb-1">Dr. Aranya Sharma</p>
                <p className="font-label text-xs text-secondary leading-none">Senior Faculty</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Q&A Content Canvas */}
      <section className="flex-1 overflow-hidden flex pt-6 gap-6">
        {/* Filters Sidebar (Sub-navigation) */}
        <aside className="w-72 bg-white rounded-xl p-6 border border-outline-variant/40 flex flex-col gap-8 shadow-sm hidden md:flex">
          <div>
            <h3 className="font-inter text-xs font-bold uppercase tracking-widest text-secondary mb-4">Query Status</h3>
            <ul className="space-y-2">
              <li>
                <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-primary/10 text-primary font-bold transition-all">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-xl">pending_actions</span>
                    <span className="font-inter text-sm">Unresolved</span>
                  </div>
                  <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full">14</span>
                </button>
              </li>
              <li>
                <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-variant/40 transition-all font-medium">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-xl">star</span>
                    <span className="font-inter text-sm">Starred</span>
                  </div>
                  <span className="bg-[#ece6dc] text-on-surface-variant text-[10px] px-2 py-0.5 rounded-full">08</span>
                </button>
              </li>
              <li>
                <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-variant/40 transition-all font-medium">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-xl">history</span>
                    <span className="font-inter text-sm">Resolved</span>
                  </div>
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-inter text-xs font-bold uppercase tracking-widest text-secondary mb-4">Department</h3>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 rounded-full border border-outline-variant text-[11px] font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-all">Quantum Physics</button>
              <button className="px-3 py-1 rounded-full border border-primary bg-primary/5 text-[11px] font-bold text-primary transition-all">Thermodynamics</button>
              <button className="px-3 py-1 rounded-full border border-outline-variant text-[11px] font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-all">Optics</button>
              <button className="px-3 py-1 rounded-full border border-outline-variant text-[11px] font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-all">Mechanics</button>
            </div>
          </div>
          <div className="mt-auto">
            <div className="p-4 rounded-xl bg-[#fce0e0] border border-[#fce0e0]/20">
              <p className="font-inter text-xs text-[#8c3c3c] font-bold mb-1">Quick Tip</p>
              <p className="font-inter text-[11px] leading-relaxed text-[#8c3c3c]">Press <kbd className="bg-white/60 px-1 rounded">Cmd + K</kbd> to quickly search through specific student IDs.</p>
            </div>
          </div>
        </aside>

        {/* Main Thread List */}
        <div className="flex-1 overflow-y-auto pr-2 pb-10">
          <div className="flex items-center justify-between mb-8">
            <h4 className="font-headline text-2xl text-[#3a302a] italic">Recent Academic Doubts</h4>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg border border-outline-variant/60 bg-white hover:bg-[#f6f0e8] transition-all text-on-surface-variant shadow-sm">
                <span className="material-symbols-outlined text-lg">sort</span>
              </button>
              <button className="p-2 rounded-lg border border-outline-variant/60 bg-white hover:bg-[#f6f0e8] transition-all text-on-surface-variant shadow-sm">
                <span className="material-symbols-outlined text-lg">filter_list</span>
              </button>
            </div>
          </div>

          {/* Thread List Container */}
          <div className="space-y-4">
            {filteredInquiries.map((inquiry) => (
              <div 
                key={inquiry.id}
                className={`group bg-white p-6 rounded-2xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] border transition-all cursor-pointer ${
                  inquiry.starred ? 'border-l-4 border-l-primary border-outline-variant/30' : 'border-outline-variant/30 hover:border-primary/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex flex-row sm:flex-col items-center gap-3 sm:gap-1 min-w-[64px]">
                    <div className="w-12 h-12 rounded-full overflow-hidden mb-0 sm:mb-2 border border-outline-variant/30">
                      <img className="w-full h-full object-cover" src={inquiry.avatarUrl} alt={inquiry.studentName} />
                    </div>
                    <span className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-tighter">{inquiry.program}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Link href={`/student/qa/${inquiry.id}`}>
                          <h5 className="font-headline text-xl font-medium text-[#3a302a] group-hover:text-primary transition-colors">{inquiry.title}</h5>
                        </Link>
                        {inquiry.starred && <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>}
                      </div>
                      <span className="text-[11px] font-bold text-[#605850] bg-[#f2ece4] px-2 py-1 rounded uppercase tracking-widest ml-2 shrink-0">{inquiry.domain}</span>
                    </div>
                    <p className="font-body text-sm text-secondary mb-4 line-clamp-2">{inquiry.snippet}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="font-headline italic text-sm text-primary font-bold">Student: {inquiry.studentName}</span>
                        <span className="text-[11px] font-medium text-secondary flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">schedule</span> {inquiry.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!inquiry.starred && <button className="material-symbols-outlined text-outline hover:text-tertiary">star</button>}
                        <Link href={`/student/qa/${inquiry.id}`}>
                          <button className="bg-primary text-white text-xs px-4 py-1.5 rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-sm">Reply</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <button className="w-10 h-10 rounded-full bg-white border border-outline-variant/60 flex items-center justify-center text-secondary hover:bg-[#f6f0e8] hover:text-primary transition-all shadow-sm">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <div className="flex gap-2">
              <span className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shadow-sm">1</span>
              <span className="w-10 h-10 rounded-full bg-white border border-outline-variant/30 text-secondary flex items-center justify-center text-sm font-bold hover:bg-[#f6f0e8] cursor-pointer transition-colors shadow-sm">2</span>
              <span className="w-10 h-10 rounded-full bg-white border border-outline-variant/30 text-secondary flex items-center justify-center text-sm font-bold hover:bg-[#f6f0e8] cursor-pointer transition-colors shadow-sm">3</span>
            </div>
            <button className="w-10 h-10 rounded-full bg-white border border-outline-variant/60 flex items-center justify-center text-secondary hover:bg-[#f6f0e8] hover:text-primary transition-all shadow-sm">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

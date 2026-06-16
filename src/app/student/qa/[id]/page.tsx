"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ThreadDetailPage() {
  const params = useParams();
  const threadId = params.id;

  return (
    <div className="flex-grow max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-12 mt-6">
      {/* Left Content Area */}
      <div className="flex-grow lg:w-2/3 space-y-12">
        {/* Question Thread Header */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-secondary uppercase tracking-widest text-[10px] font-label font-bold">
            <Link href="/student/qa" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Hub
            </Link>
            <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
            <span>Physics 301</span>
            <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
            <span>Quantum Mechanics</span>
            <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
            <span className="text-[#8c3c3c]">Unsolved</span>
          </div>
          <h1 className="font-headline text-5xl md:text-6xl text-[#3a302a] leading-tight font-medium">
            The interpretation of wave-function collapse in the EPR Paradox?
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#e08850] flex items-center justify-center text-white font-bold">A</div>
            <div>
              <p className="font-label font-bold text-sm text-[#3a302a]">Arjun Mehta</p>
              <p className="text-xs text-secondary">Posted 3 hours ago • Undergraduate</p>
            </div>
          </div>
          <div className="text-on-surface-variant leading-relaxed text-lg max-w-3xl font-body">
            I'm struggling to reconcile the concept of non-locality with the standard Copenhagen interpretation during the collapse. If the measurement of one particle affects the other instantaneously, does this imply a transfer of information or merely a statistical correlation?
          </div>
        </section>

        {/* Responses Section */}
        <section className="space-y-10 pt-8 border-t border-outline-variant/30">
          <h3 className="font-label text-sm uppercase tracking-widest text-secondary font-bold">Faculty Responses</h3>
          
          {/* Faculty Response Card */}
          <div className="border-l-4 border-[#B85D38] pl-8 py-2">
            <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <img 
                  className="w-12 h-12 rounded-full object-cover shadow-sm" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuArJtQ-7Ow6Y9W3E8uHSEpyfgX_dv6c2CurEFvm8Kvsm4QtP0lzbolyMOE3h8hbi1ip2vX_CXapRimZj_qs0Z3fR4BpBidCD0Td36rLnMVZGwTKeZTimLvuk8GVt0BAbB5aHL-eLtFEjsdQlv43dobYH9sVEz3vaKrIAEPa_wCru6zIrRntUMnTznvn2SotBxnbaXjGAapOT2CsGBByhYV-cozEElwutKfv3YYodDUb9By85Mgq4r7fTFh8PA5RvasFwQnaDzRhbQ" 
                  alt="Faculty" 
                />
                <div>
                  <h4 className="font-headline text-2xl text-primary font-medium italic">Dr. Elias Thorne</h4>
                  <p className="font-label text-[10px] uppercase text-[#8c3c3c] font-extrabold tracking-tighter">Senior Faculty • Quantum Physics</p>
                </div>
              </div>
              <span className="text-[10px] font-label text-secondary uppercase bg-[#ece6dc] px-2 py-1 rounded font-bold">Verified Expert</span>
            </div>
            <div className="space-y-4 text-[#3a302a] leading-relaxed font-body">
              <p>This is the fundamental tension that led Einstein to label it "spooky action at a distance." In the Vidya Setu framework, we emphasize that the collapse is not a physical 'wave' breaking, but a resolution of potential states into a singular observable.</p>
              <p>It is important to note that no <i>classical</i> information is transferred. The correlation exists in the entangled system as a whole, which is spatially distributed yet physically inseparable until the measurement event occurs.</p>
              <div className="flex gap-4 pt-4">
                <button className="flex items-center gap-2 text-xs font-label text-primary hover:bg-primary/5 px-3 py-1 rounded transition-all font-semibold">
                  <span className="material-symbols-outlined text-sm">thumb_up</span>
                  <span>Insightful (42)</span>
                </button>
                <button className="flex items-center gap-2 text-xs font-label text-secondary hover:bg-secondary/5 px-3 py-1 rounded transition-all font-semibold">
                  <span className="material-symbols-outlined text-sm">reply</span>
                  <span>Clarify</span>
                </button>
              </div>
            </div>
          </div>

          {/* Secondary Faculty Response */}
          <div className="border-l-4 border-[#B85D38] pl-8 py-2 opacity-90 mt-8">
            <div className="flex items-center gap-4 mb-4">
              <img 
                className="w-12 h-12 rounded-full object-cover shadow-sm" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGD2z61YyvlsDbwq_I77AK9-EVIC-xSzQRGdtTDpS45k1cSxkxyp-UOVL6qp4kAPhZAwndihFC3FoQ367yb6gHrNwBzRaDAT9d3jlyR9urg2iehKyaESiP5uIIrDviqXR3XxFQHH67PMZvMPDihqrREjYLw2VkUl_AwrXcz-jlrK_eTX6bVrMujZ5oFr0e-dJElnVb7umxC4bW2B5mzLUoqApcRd-bAnxAyO2afLoFyd1U8aLVj2gwJEhHgkI6-AnoFfwnI2AXjw" 
                alt="Faculty" 
              />
              <div>
                <h4 className="font-headline text-2xl text-primary font-medium italic">Prof. Sarah Chen</h4>
                <p className="font-label text-[10px] uppercase text-[#8c3c3c] font-extrabold tracking-tighter">Research Lead • Particle Dynamics</p>
              </div>
            </div>
            <div className="space-y-4 text-[#3a302a] leading-relaxed font-body">
              <p>Building on Dr. Thorne's point, think of the Bell Inequalities as the boundary of this discussion. The math doesn't lie—local realism is what's being sacrificed here, not necessarily causality.</p>
            </div>
          </div>
        </section>

        {/* Reply Input */}
        <section className="pt-8">
          <div className="bg-[#f6f0e8] rounded-xl p-6 border border-outline-variant/30 shadow-sm">
            <label className="font-label text-xs uppercase font-bold text-secondary mb-3 block">Contribute to the Discussion</label>
            <textarea 
              className="w-full bg-white border-outline-variant/60 rounded-lg p-4 focus:ring-1 focus:ring-primary focus:border-primary font-body text-sm min-h-[120px] placeholder:text-outline/50" 
              placeholder="Ask a follow-up or add your perspective..."
            ></textarea>
            <div className="flex flex-wrap gap-4 justify-between items-center mt-4">
              <div className="flex gap-2">
                <button className="material-symbols-outlined text-secondary hover:text-primary transition-all p-2 rounded hover:bg-[#ece6dc]">attach_file</button>
                <button className="material-symbols-outlined text-secondary hover:text-primary transition-all p-2 rounded hover:bg-[#ece6dc]">functions</button>
              </div>
              <button className="bg-primary text-white font-label font-bold px-6 py-2 rounded-md hover:bg-[#B85D38] transition-all shadow-sm">
                Post Response
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Sidebar - Bento Grid Metadata */}
      <aside className="lg:w-1/3 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {/* Stats Card */}
          <div className="bg-white/40 backdrop-blur-md border border-outline-variant/40 p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:-translate-y-1 transition-transform duration-300">
            <span className="material-symbols-outlined text-[#B85D38] mb-4">analytics</span>
            <div>
              <p className="text-3xl font-headline font-bold text-[#3a302a]">1.2k</p>
              <p className="font-label text-xs uppercase tracking-wider text-secondary font-bold">Active Views</p>
            </div>
          </div>
          
          {/* Timeline Card */}
          <div className="bg-white/40 backdrop-blur-md border border-outline-variant/40 p-6 rounded-2xl shadow-sm hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-[#B85D38]">event</span>
              <span className="text-[10px] font-label font-bold text-[#8c3c3c] bg-[#8c3c3c]/10 px-2 py-1 rounded">URGENT</span>
            </div>
            <p className="font-label text-xs uppercase tracking-wider text-secondary mb-1 font-bold">Office Hours Close</p>
            <p className="font-headline text-xl text-[#3a302a] font-bold">Today, 4:00 PM</p>
          </div>
          
          {/* Suggested Readings Card (Bento Large) */}
          <div className="sm:col-span-2 lg:col-span-1 bg-[#f2ece4] p-6 rounded-2xl shadow-sm border border-outline-variant/30">
            <h5 className="font-label text-xs uppercase font-extrabold text-[#3a302a] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">auto_stories</span>
              Suggested Resources
            </h5>
            <ul className="space-y-4">
              <li className="group cursor-pointer">
                <p className="font-body text-sm font-semibold text-[#3a302a] group-hover:text-primary transition-colors">Bell's Theorem &amp; Non-Locality</p>
                <p className="text-xs text-secondary mt-1">PDF • 14.2 MB • Physics Archive</p>
              </li>
              <li className="group cursor-pointer border-t border-outline-variant/30 pt-4">
                <p className="font-body text-sm font-semibold text-[#3a302a] group-hover:text-primary transition-colors">Lecture Notes: EPR Paradox</p>
                <p className="text-xs text-secondary mt-1">Vidya Setu Portal • Interactive</p>
              </li>
            </ul>
          </div>
          
          {/* Collaborative Session */}
          <div className="sm:col-span-2 lg:col-span-1 bg-[#3a302a] text-[#faf5ee] p-6 rounded-2xl relative overflow-hidden shadow-md group">
            <div className="relative z-10">
              <h5 className="font-display text-2xl italic mb-2">Live Session</h5>
              <p className="font-body text-xs text-[#ece6dc] mb-6 opacity-80 leading-relaxed">
                Join Dr. Thorne for a live visualization of quantum entanglement states.
              </p>
              <button className="bg-[#faf5ee] text-[#3a302a] w-full py-3 rounded-md font-label font-bold text-sm hover:bg-primary-fixed transition-colors">
                Enter Room
              </button>
            </div>
            {/* Decorative element */}
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-4">
          <span className="px-3 py-1 bg-[#ece6dc] rounded-full text-[10px] font-label font-bold text-secondary">#Quantum</span>
          <span className="px-3 py-1 bg-[#ece6dc] rounded-full text-[10px] font-label font-bold text-secondary">#EPRParadox</span>
          <span className="px-3 py-1 bg-[#ece6dc] rounded-full text-[10px] font-label font-bold text-secondary">#Physics301</span>
          <span className="px-3 py-1 bg-[#ece6dc] rounded-full text-[10px] font-label font-bold text-secondary">#AdvancedTheory</span>
        </div>
      </aside>
    </div>
  );
}

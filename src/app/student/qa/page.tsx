"use client";

import React from "react";
import Link from "next/link";

export default function StudentQAPage() {
  return (
    <>
      {/* Header & Filters */}
      <section className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-display font-bold text-on-surface mb-2">Q&A Hub</h2>
          <p className="text-on-surface-variant max-w-lg">
            Explore the collective intelligence of CampusAsk. Filter by department, urgency, or trending academic topics.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-tertiary text-on-tertiary rounded-full text-sm font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">local_fire_department</span>
            Trending
          </button>
          <button className="px-4 py-2 bg-surface-container border border-outline-variant rounded-full text-sm font-medium text-on-surface-variant hover:border-primary transition-colors">
            Computer Science
          </button>
          <button className="px-4 py-2 bg-surface-container border border-outline-variant rounded-full text-sm font-medium text-on-surface-variant hover:border-primary transition-colors">
            Mathematics
          </button>
          <button className="px-4 py-2 bg-surface-container border border-outline-variant rounded-full text-sm font-medium text-on-surface-variant hover:border-primary transition-colors">
            Literature
          </button>
          <button className="px-4 py-2 bg-surface-container border border-outline-variant rounded-full text-sm font-medium text-on-surface-variant hover:border-primary transition-colors flex items-center gap-1">
            More <span className="material-symbols-outlined text-sm">expand_more</span>
          </button>
        </div>
      </section>

      {/* Bento Grid Feed */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Featured Question */}
        <article className="md:col-span-8 bg-surface-container-lowest border border-outline-variant/40 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed text-[10px] uppercase font-bold tracking-widest rounded-full">
                High Urgency
              </span>
              <span className="text-on-surface-variant text-sm font-medium">32 minutes ago</span>
            </div>
            <Link href="/student/qa/1">
              <h3 className="text-3xl font-display font-bold text-on-surface mb-4 leading-tight group-hover:text-primary transition-colors">
                How does the "Self" in Existentialism differ from the Buddhist concept of "Anatta"?
              </h3>
            </Link>
            <p className="text-on-surface-variant leading-relaxed mb-6 line-clamp-3">
              I'm currently writing a comparative thesis on Sartre and Early Buddhist texts. While Sartre emphasizes radical freedom and the "nothingness" of consciousness, the concept of Anatta seems to deny the permanent self entirely. Is there a point of convergence in their understanding of...
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="text-xs font-semibold px-2 py-1 bg-surface-container text-on-secondary-container rounded">
                #Existentialism
              </span>
              <span className="text-xs font-semibold px-2 py-1 bg-surface-container text-on-secondary-container rounded">
                #Philosophy
              </span>
              <span className="text-xs font-semibold px-2 py-1 bg-surface-container text-on-secondary-container rounded">
                #ComparativeTheology
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-6 border-t border-outline-variant/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant">person</span>
              </div>
              <div>
                <p className="text-sm font-bold font-display text-on-surface">Ms. Elena Sterling</p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">Department of Philosophy</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-on-surface-variant">
                <span className="material-symbols-outlined text-lg">chat_bubble</span>
                <span className="text-xs font-bold">14</span>
              </div>
              <div className="flex items-center gap-1 text-on-surface-variant">
                <span className="material-symbols-outlined text-lg">thumb_up</span>
                <span className="text-xs font-bold">89</span>
              </div>
            </div>
          </div>
        </article>

        {/* Sidebar Bento Element: Stats */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-primary text-on-primary rounded-lg p-6 shadow-lg shadow-primary/10">
            <h4 className="font-display text-xl font-bold mb-4">Your Influence</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-80">Questions Solved</span>
                <span className="text-xl font-bold">42</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-80">School Rank</span>
                <span className="text-xl font-bold">Top 5%</span>
              </div>
              <div className="pt-2">
                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-white h-full w-[72%]"></div>
                </div>
                <p className="text-[10px] mt-2 opacity-80">850/1000 XP to Master Level</p>
              </div>
            </div>
          </div>
          <div className="bg-surface-container border border-outline-variant/60 rounded-lg p-6">
            <h4 className="font-display text-lg font-bold text-on-surface mb-4">Live Study Groups</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm font-bold truncate">Computer Science 101</p>
                  <p className="text-[10px] text-on-surface-variant">12 students online</p>
                </div>
                <button className="text-primary material-symbols-outlined">arrow_forward</button>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm font-bold truncate">Latex Formatting Clinic</p>
                  <p className="text-[10px] text-on-surface-variant">4 students online</p>
                </div>
                <button className="text-primary material-symbols-outlined">arrow_forward</button>
              </div>
            </div>
          </div>
        </div>

        {/* Smaller Question Cards */}
        <article className="md:col-span-4 bg-surface-container-low border border-outline-variant/40 rounded-lg p-6 hover:border-primary transition-all group">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-tertiary uppercase tracking-wider">Mathematics</span>
            <span className="material-symbols-outlined text-on-surface-variant/40 group-hover:text-primary transition-colors">
              push_pin
            </span>
          </div>
          <h3 className="text-xl font-display font-bold text-on-surface mb-3 line-clamp-2">
            Proof verification for non-linear differential equations?
          </h3>
          <p className="text-sm text-on-surface-variant mb-6 line-clamp-3">
            Need a second pair of eyes on my approach for Lemma 3.2. I suspect there's a flaw in the integration by parts...
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center text-[8px] font-bold text-on-surface-variant">
                SR
              </div>
              <p className="text-xs font-bold font-display text-on-surface">Mr. Samuel R.</p>
            </div>
            <span className="text-[10px] font-medium text-on-surface-variant">2 hrs ago</span>
          </div>
        </article>

        <article className="md:col-span-4 bg-surface-container-low border border-outline-variant/40 rounded-lg p-6 hover:border-primary transition-all group">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-on-secondary-container uppercase tracking-wider">History</span>
          </div>
          <h3 className="text-xl font-display font-bold text-on-surface mb-3 line-clamp-2">
            The impact of digital nomads on traditional social structures?
          </h3>
          <p className="text-sm text-on-surface-variant mb-6 line-clamp-3">
            Has anyone conducted field research on the shift in communal land ownership since 2018? Looking for specific case studies...
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center text-[8px] font-bold text-on-surface-variant">
                LT
              </div>
              <p className="text-xs font-bold font-display text-on-surface">Ms. Lisa Tan</p>
            </div>
            <span className="text-[10px] font-medium text-on-surface-variant">5 hrs ago</span>
          </div>
        </article>

        <article className="md:col-span-4 bg-surface-container-low border border-outline-variant/40 rounded-lg p-6 hover:border-primary transition-all group">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-on-secondary-container uppercase tracking-wider">Chemistry</span>
          </div>
          <h3 className="text-xl font-display font-bold text-on-surface mb-3 line-clamp-2">
            Efficient methods for filtering micro-plastics in residential runoff?
          </h3>
          <p className="text-sm text-on-surface-variant mb-6 line-clamp-3">
            Seeking suggestions for low-cost, high-surface-area catalytic materials that could be integrated into existing storm drains.
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center text-[8px] font-bold text-on-surface-variant">
                JK
              </div>
              <p className="text-xs font-bold font-display text-on-surface">Mr. James K.</p>
            </div>
            <span className="text-[10px] font-medium text-on-surface-variant">1 day ago</span>
          </div>
        </article>

        {/* Community Banner */}
        <div className="md:col-span-12 relative h-48 rounded-lg overflow-hidden bg-on-primary-fixed flex items-center p-12">
          <div className="absolute inset-0 opacity-20"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-display font-bold text-primary-fixed mb-2">Join the Advanced Seminar</h2>
            <p className="text-primary-fixed-dim/70 max-w-xl mb-4">
              A private space for students to discuss methodology, peer-review papers, and share academic opportunities.
            </p>
            <button className="px-6 py-2 bg-primary-fixed text-on-primary-fixed rounded-lg font-bold hover:scale-105 transition-transform">
              Request Invitation
            </button>
          </div>
        </div>
      </div>

      {/* Footer / Load More */}
      <div className="mt-12 text-center pb-20">
        <button className="px-8 py-3 border border-outline-variant text-on-surface-variant font-bold rounded-lg hover:bg-surface-container transition-colors">
          Load More Insights
        </button>
        <p className="mt-6 text-xs text-on-surface-variant/60 font-medium">
          CampusAsk — Preserving academic integrity through open inquiry.
        </p>
      </div>

      {/* Floating Action Button */}
      <Link href="/student/qa/new" className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined text-3xl">edit_note</span>
      </Link>
    </>
  );
}

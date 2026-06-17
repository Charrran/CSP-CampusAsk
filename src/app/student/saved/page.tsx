"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { fetchJson } from "@/lib/api";
import type { ApiResponse, Doubt, DoubtListResponse } from "@/types";

export default function SavedDoubtsPage() {
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchJson<ApiResponse<DoubtListResponse>>("/api/student/saved")
      .then((response) => setDoubts(response.data?.doubts ?? []))
      .catch(() => toast.error("Failed to load saved doubts"))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredDoubts = useMemo(
    () => doubts.filter((doubt) => `${doubt.title} ${doubt.description}`.toLowerCase().includes(query.toLowerCase())),
    [doubts, query]
  );

  return (
    <div className="flex flex-col min-h-full">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-display font-bold text-on-surface mb-2">Saved Doubts</h2>
          <p className="text-on-surface-variant max-w-lg">Keep important academic threads close for review and follow-up.</p>
        </div>
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="pl-10 pr-4 py-2 bg-white border border-outline-variant/60 rounded-full text-sm focus:ring-1 focus:ring-primary focus:border-primary w-full transition-all shadow-sm"
            placeholder="Search saved doubts..."
          />
        </div>
      </header>

      <section className="bg-surface-container-lowest border border-outline-variant/40 rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-[#f6f0e8]/70 border-b border-outline-variant/40 flex items-center justify-between">
          <h3 className="font-headline text-2xl text-[#3a302a]">Bookmarked Threads</h3>
          <span className="text-xs font-bold text-secondary uppercase tracking-widest">{filteredDoubts.length} saved</span>
        </div>
        <div className="divide-y divide-outline-variant/30">
          {filteredDoubts.map((doubt) => (
            <Link key={doubt.id} href={`/student/qa/${doubt.id}`} className="block p-6 hover:bg-[#fbe8d8]/30 transition-colors group">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#211711] text-white uppercase tracking-widest font-body">
                      {doubt.subject?.name ?? "Subject"}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#ece6dc] text-[#605850] text-[10px] font-bold uppercase tracking-widest font-body">
                      {doubt.status}
                    </span>
                  </div>
                  <h4 className="font-headline text-2xl font-bold text-[#291B15] group-hover:text-primary transition-colors">{doubt.title}</h4>
                  <p className="text-sm text-on-surface-variant mt-2 line-clamp-2">{doubt.description}</p>
                </div>
                <div className="text-xs text-secondary font-bold shrink-0">
                  {new Date(doubt.createdAt).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })}
                </div>
              </div>
            </Link>
          ))}
          {!filteredDoubts.length && (
            <div className="px-6 py-16 text-center text-secondary">
              <span className="material-symbols-outlined text-4xl mb-3 text-outline">bookmark</span>
              <p className="font-label font-bold">{isLoading ? "Loading saved doubts..." : "No saved doubts found."}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { fetchJson } from "@/lib/api";
import type { ApiResponse, Doubt, DoubtListResponse, DoubtStatus, FacultySubjectsResponse } from "@/types";

export default function FacultyQAHubPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState<DoubtStatus | "ALL">("OPEN");
  const [subjectId, setSubjectId] = useState("");
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [subjects, setSubjects] = useState<FacultySubjectsResponse["allSubjects"]>([]);

  const queryString = useMemo(() => {
    const params = new URLSearchParams({ limit: "20" });
    if (searchQuery) params.set("search", searchQuery);
    if (status !== "ALL") params.set("status", status);
    if (subjectId) params.set("subjectId", subjectId);
    return params.toString();
  }, [searchQuery, status, subjectId]);

  useEffect(() => {
    fetchJson<ApiResponse<FacultySubjectsResponse>>("/api/faculty/subjects")
      .then((response) => setSubjects(response.data?.allSubjects ?? []))
      .catch(() => toast.error("Failed to load subjects"));
  }, []);

  useEffect(() => {
    fetchJson<ApiResponse<DoubtListResponse>>(`/api/doubts?${queryString}`)
      .then((response) => setDoubts(response.data?.doubts ?? []))
      .catch(() => toast.error("Failed to load inquiries"));
  }, [queryString]);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <header className="flex justify-between items-center w-full pb-6 border-b border-outline-variant/60">
        <div className="flex flex-col">
          <h2 className="font-headline text-3xl font-bold text-primary tracking-tight">Faculty Q&amp;A Hub</h2>
          <p className="font-label text-sm text-[#605850]">Review pending academic doubts and student queries.</p>
        </div>
        <div className="flex items-center gap-6">
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
        </div>
      </header>

      <section className="flex-1 overflow-hidden flex pt-6 gap-6">
        <aside className="w-72 bg-white rounded-xl p-6 border border-outline-variant/40 flex flex-col gap-8 shadow-sm hidden md:flex">
          <div>
            <h3 className="font-inter text-xs font-bold uppercase tracking-widest text-[#605850] mb-4">Query Status</h3>
            <ul className="space-y-2">
              {(["OPEN", "ANSWERED", "RESOLVED", "ALL"] as const).map((item) => (
                <li key={item}>
                  <button
                    onClick={() => setStatus(item)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${status === item ? "bg-primary/10 text-primary font-bold" : "text-[#605850] hover:bg-surface-variant/40 font-medium"}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-xl">{item === "OPEN" ? "pending_actions" : "history"}</span>
                      <span className="font-inter text-sm">{item}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-inter text-xs font-bold uppercase tracking-widest text-[#605850] mb-4">Department</h3>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setSubjectId("")} className={`px-3 py-1 rounded-full border text-[11px] font-bold transition-all ${!subjectId ? "border-primary bg-primary/5 text-primary" : "border-outline-variant text-[#605850] hover:border-primary hover:text-primary"}`}>All</button>
              {subjects.map((subject) => (
                <button key={subject.id} onClick={() => setSubjectId(subject.id)} className={`px-3 py-1 rounded-full border text-[11px] font-bold transition-all ${subjectId === subject.id ? "border-primary bg-primary/5 text-primary" : "border-outline-variant text-[#605850] hover:border-primary hover:text-primary"}`}>
                  {subject.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-1 overflow-y-auto pr-2 pb-10">
          <div className="flex items-center justify-between mb-8">
            <h4 className="font-headline text-2xl text-[#3a302a] italic">Recent Academic Doubts</h4>
          </div>

          <div className="space-y-4">
            {doubts.map((inquiry) => (
              <div key={inquiry.id} className="group bg-white p-6 rounded-2xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-outline-variant/30 hover:border-primary/40 transition-all cursor-pointer">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex flex-row sm:flex-col items-center gap-3 sm:gap-1 min-w-[64px]">
                    <div className="w-12 h-12 rounded-full overflow-hidden mb-0 sm:mb-2 border border-outline-variant/30 bg-[#fbe8d8] text-primary flex items-center justify-center font-bold">
                      {(inquiry.user?.name ?? "S").slice(0, 1)}
                    </div>
                    <span className="text-[10px] font-bold text-[#605850] uppercase tracking-tighter">{inquiry.status}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Link href={`/faculty/qa/${inquiry.id}`}>
                          <h5 className="font-headline text-xl font-medium text-[#3a302a] group-hover:text-primary transition-colors">{inquiry.title}</h5>
                        </Link>
                      </div>
                      <span className="text-[11px] font-bold text-[#605850] bg-[#f2ece4] px-2 py-1 rounded uppercase tracking-widest ml-2 shrink-0">{inquiry.subject?.name ?? "Subject"}</span>
                    </div>
                    <p className="font-body text-sm text-[#605850] mb-4 line-clamp-2">{inquiry.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="font-headline italic text-sm text-primary font-bold">Student: {inquiry.user?.name ?? "Student"}</span>
                        <span className="text-[11px] font-medium text-[#605850] flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">schedule</span> {new Date(inquiry.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <Link href={`/faculty/qa/${inquiry.id}`} className="bg-primary text-white text-xs px-4 py-1.5 rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-sm">
                        Reply
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {!doubts.length && <div className="bg-white p-10 rounded-2xl border border-dashed border-outline-variant/40 text-center text-[#605850]">No inquiries found.</div>}
          </div>
        </div>
      </section>
    </div>
  );
}

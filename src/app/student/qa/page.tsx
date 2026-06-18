"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { fetchJson } from "@/lib/api";
import type { ApiResponse, Doubt, DoubtListResponse, DoubtStatus, Subject } from "@/types";

const statusFilters: Array<DoubtStatus | "ALL"> = ["ALL", "OPEN", "ANSWERED", "RESOLVED"];

export default function StudentQAPage() {
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<DoubtStatus | "ALL">("ALL");
  const [subjectId, setSubjectId] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const params = useMemo(() => {
    const searchParams = new URLSearchParams({ page: String(page), limit: "9" });
    if (query) searchParams.set("search", query);
    if (status !== "ALL") searchParams.set("status", status);
    if (subjectId) searchParams.set("subjectId", subjectId);
    return searchParams.toString();
  }, [page, query, status, subjectId]);

  useEffect(() => {
    fetchJson<ApiResponse<Subject[]>>("/api/subjects")
      .then((response) => setSubjects(response.data ?? []))
      .catch(() => toast.error("Failed to load subjects"));
  }, []);

  useEffect(() => {
    fetchJson<ApiResponse<DoubtListResponse>>(`/api/doubts?${params}`)
      .then((response) => {
        setDoubts(response.data?.doubts ?? []);
        setTotalPages(response.data?.totalPages ?? 1);
      })
      .catch(() => toast.error("Failed to load doubts"))
      .finally(() => setIsLoading(false));
  }, [params]);

  return (
    <>
      <section className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-display font-bold text-on-surface mb-2">Q&amp;A Hub</h2>
          <p className="text-on-surface-variant max-w-lg">Explore the collective intelligence of CampusAsk. Filter by department, status, or academic topics.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
            <input
              value={query}
              onChange={(event) => {
                setPage(1);
                setQuery(event.target.value);
              }}
              className="pl-10 pr-4 py-2 bg-white border border-outline-variant/60 rounded-full text-sm focus:ring-1 focus:ring-primary focus:border-primary w-64 transition-all shadow-sm"
              placeholder="Search doubts..."
            />
          </div>
          {statusFilters.map((item) => (
            <button
              key={item}
              onClick={() => {
                setPage(1);
                setStatus(item);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${status === item ? "bg-tertiary text-on-tertiary border-tertiary" : "bg-surface-container border-outline-variant text-on-surface-variant hover:border-primary"}`}
            >
              {item}
            </button>
          ))}
          <select
            value={subjectId}
            onChange={(event) => {
              setPage(1);
              setSubjectId(event.target.value);
            }}
            className="px-4 py-2 bg-surface-container border border-outline-variant rounded-full text-sm font-medium text-on-surface-variant hover:border-primary transition-colors"
          >
            <option value="">All Subjects</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {doubts.map((doubt, index) => (
          <article key={doubt.id} className={`${index === 0 ? "md:col-span-8" : "md:col-span-4"} bg-surface-container-lowest border border-outline-variant/40 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between`}>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed text-[10px] uppercase font-bold tracking-widest rounded-full">
                  {doubt.subject?.name ?? "Subject"}
                </span>
                <span className="text-on-surface-variant text-sm font-medium">{new Date(doubt.createdAt).toLocaleDateString()}</span>
              </div>
              <Link href={`/student/qa/${doubt.id}`}>
                <h3 className={`${index === 0 ? "text-3xl" : "text-xl"} font-display font-bold text-on-surface mb-4 leading-tight group-hover:text-primary transition-colors`}>
                  {doubt.title}
                </h3>
              </Link>
              <p className="text-on-surface-variant leading-relaxed mb-6 line-clamp-3">{doubt.description}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {(doubt.tags.length ? doubt.tags : [doubt.status]).slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs font-semibold px-2 py-1 bg-surface-container text-on-secondary-container rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-outline-variant/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant">person</span>
                </div>
                <div>
                  <p className="text-sm font-bold font-display text-on-surface">{doubt.user?.name ?? "Student"}</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">{doubt.chapter?.name ?? doubt.status}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-on-surface-variant">
                <span className="material-symbols-outlined text-lg">chat_bubble</span>
                <span className="text-xs font-bold">{doubt._count?.answers ?? 0}</span>
              </div>
            </div>
          </article>
        ))}

        {!doubts.length && (
          <div className="md:col-span-12 bg-surface-container border border-outline-variant/60 rounded-lg p-12 text-center text-on-surface-variant">
            {isLoading ? "Loading doubts..." : "No doubts match your filters."}
          </div>
        )}
      </div>

      <div className="mt-12 text-center pb-20 flex items-center justify-center gap-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage((current) => Math.max(1, current - 1))}
          className="px-5 py-3 border border-outline-variant text-on-surface-variant font-bold rounded-lg hover:bg-surface-container transition-colors disabled:opacity-40"
        >
          Previous
        </button>
        <span className="text-xs text-on-surface-variant/60 font-medium">Page {page} of {totalPages}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
          className="px-5 py-3 border border-outline-variant text-on-surface-variant font-bold rounded-lg hover:bg-surface-container transition-colors disabled:opacity-40"
        >
          Next
        </button>
      </div>

      <Link href="/student/qa/new" className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined text-3xl">edit_note</span>
      </Link>
    </>
  );
}

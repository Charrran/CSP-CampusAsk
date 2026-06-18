"use client";

import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { fetchJson } from "@/lib/api";
import type { AdminSubjectItem, ApiResponse } from "@/types";

export default function AdminSubjectsPage() {
  const [subjects, setSubjects] = useState<AdminSubjectItem[]>([]);
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadSubjects = () => {
    fetchJson<ApiResponse<AdminSubjectItem[]>>("/api/admin/subjects")
      .then((response) => setSubjects(response.data ?? []))
      .catch(() => toast.error("Failed to load subjects"));
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  const filteredSubjects = useMemo(
    () => subjects.filter((subject) => subject.name.toLowerCase().includes(query.toLowerCase())),
    [subjects, query]
  );

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      await fetchJson<ApiResponse<AdminSubjectItem>>("/api/admin/subjects", {
        method: "POST",
        body: JSON.stringify({ name }),
      });
      setName("");
      toast.success("Subject created");
      loadSubjects();
    } catch {
      toast.error("Failed to create subject");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <header className="sticky top-0 z-50 flex flex-col md:flex-row md:justify-between items-start md:items-center w-full pb-8 bg-[#faf5ee]">
        <div className="mb-4 md:mb-0">
          <h2 className="font-headline text-4xl font-bold text-primary tracking-tight">Subject Management</h2>
          <p className="text-[#605850] font-body mt-1">Maintain academic domains, faculty coverage, and chapter readiness.</p>
        </div>
        <div className="relative w-full md:w-72">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="pl-10 pr-4 py-2 bg-white border border-outline-variant/60 rounded-full text-sm focus:ring-1 focus:ring-primary focus:border-primary w-full transition-all shadow-sm"
            placeholder="Search subjects..."
          />
        </div>
      </header>

      <section className="grid grid-cols-12 gap-6 mb-10">
        <div className="col-span-12 md:col-span-4 bg-[#f6f0e8] p-8 rounded-xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-outline-variant/30">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
            <span className="material-symbols-outlined">menu_book</span>
          </div>
          <p className="font-label text-sm text-[#605850] uppercase tracking-widest font-semibold">Total Subjects</p>
          <h3 className="font-headline text-5xl font-bold text-[#3a302a] mt-2">{subjects.length}</h3>
        </div>
        <div className="col-span-12 md:col-span-4 bg-[#f6f0e8] p-8 rounded-xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-outline-variant/30">
          <div className="w-12 h-12 bg-[#fce0e0] rounded-lg flex items-center justify-center text-[#8c3c3c] mb-4">
            <span className="material-symbols-outlined">segment</span>
          </div>
          <p className="font-label text-sm text-[#605850] uppercase tracking-widest font-semibold">Chapters</p>
          <h3 className="font-headline text-5xl font-bold text-[#3a302a] mt-2">{subjects.reduce((sum, subject) => sum + subject._count.chapters, 0)}</h3>
        </div>
        <form onSubmit={handleCreate} className="col-span-12 md:col-span-4 bg-primary text-[#fbe8d8] p-8 rounded-xl shadow-[0_2px_16px_rgba(58,48,42,0.04)]">
          <p className="font-label text-sm text-[#f6f0e8] uppercase tracking-widest font-bold">Create Subject</p>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-4 w-full bg-white/95 border border-white/20 rounded-lg px-4 py-2.5 font-body text-sm text-[#3a302a] focus:border-[#401a08] focus:ring-1 focus:ring-[#401a08] outline-none"
            placeholder="Subject name"
          />
          <button disabled={isSubmitting} className="mt-4 w-full bg-[#3a302a] text-white py-2.5 rounded-lg text-sm font-bold disabled:opacity-70">
            {isSubmitting ? "Creating..." : "Add Subject"}
          </button>
        </form>
      </section>

      <section className="bg-white rounded-xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-outline-variant/40 overflow-hidden">
        <div className="p-6 border-b border-outline-variant/40 bg-[#f6f0e8]/50">
          <h3 className="font-headline text-2xl font-bold text-[#3a302a]">Academic Catalog</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f2ece4] text-[#605850] text-xs uppercase tracking-widest font-bold border-b border-outline-variant/40">
              <tr>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Chapters</th>
                <th className="px-6 py-4">Doubts</th>
                <th className="px-6 py-4">Faculty</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 text-sm">
              {filteredSubjects.map((subject) => (
                <tr key={subject.id} className="hover:bg-[#fbe8d8]/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-[#3a302a]">{subject.name}</p>
                    <p className="text-xs text-[#605850] mt-0.5">ID: {subject.id}</p>
                  </td>
                  <td className="px-6 py-4 text-[#605850] font-medium">{subject._count.chapters}</td>
                  <td className="px-6 py-4 text-[#605850] font-medium">{subject._count.doubts}</td>
                  <td className="px-6 py-4 text-[#605850] font-medium">{subject._count.faculty}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center gap-1.5 text-xs text-green-700 font-semibold bg-green-50 px-2 py-1 rounded border border-green-100">
                      <span className="w-2 h-2 rounded-full bg-green-600"></span> Active
                    </span>
                  </td>
                </tr>
              ))}
              {!filteredSubjects.length && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[#605850] font-medium">No subjects found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

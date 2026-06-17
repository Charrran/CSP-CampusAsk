"use client";

import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { fetchJson } from "@/lib/api";
import type { ApiResponse, FacultySubjectsResponse } from "@/types";

export default function FacultySubjectsPage() {
  const [subjects, setSubjects] = useState<FacultySubjectsResponse["allSubjects"]>([]);
  const [assignedIds, setAssignedIds] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchJson<ApiResponse<FacultySubjectsResponse>>("/api/faculty/subjects")
      .then((response) => {
        setSubjects(response.data?.allSubjects ?? []);
        setAssignedIds(response.data?.assignedSubjectIds ?? []);
      })
      .catch(() => toast.error("Failed to load subjects"));
  }, []);

  const filteredSubjects = useMemo(
    () => subjects.filter((subject) => subject.name.toLowerCase().includes(query.toLowerCase())),
    [subjects, query]
  );

  const toggleSubject = (subjectId: string) => {
    setAssignedIds((current) =>
      current.includes(subjectId) ? current.filter((id) => id !== subjectId) : [...current, subjectId]
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetchJson<ApiResponse<{ assignedSubjectIds: string[] }>>("/api/faculty/subjects", {
        method: "PUT",
        body: JSON.stringify({ subjectIds: assignedIds }),
      });
      setAssignedIds(response.data?.assignedSubjectIds ?? assignedIds);
      toast.success("Subjects updated");
    } catch {
      toast.error("Failed to update subjects");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="font-headline text-4xl text-on-surface leading-tight">My Subjects</h2>
          <p className="text-on-surface-variant mt-1">Choose the academic domains where student doubts should be routed to you.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#B85D38] text-white rounded-lg font-medium shadow-sm hover:opacity-90 transition-opacity disabled:opacity-70"
        >
          <span className="material-symbols-outlined">save</span>
          <span>{isSaving ? "Saving..." : "Save Assignments"}</span>
        </button>
      </header>

      <section className="grid grid-cols-12 gap-6">
        <aside className="col-span-12 lg:col-span-4 bg-[#291B15] p-8 rounded-2xl text-white">
          <h3 className="font-headline text-3xl text-primary-fixed mb-4">Teaching Load</h3>
          <p className="font-body text-sm text-primary-fixed/80 leading-relaxed mb-8">
            Assigned subjects determine which open inquiries appear in your faculty queue.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-[10px] font-bold uppercase text-white/40 mb-1">Assigned</p>
              <p className="text-3xl font-headline font-bold">{assignedIds.length}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-[10px] font-bold uppercase text-white/40 mb-1">Available</p>
              <p className="text-3xl font-headline font-bold">{subjects.length}</p>
            </div>
          </div>
        </aside>

        <div className="col-span-12 lg:col-span-8 bg-[#FCFAF8] p-8 rounded-2xl border border-outline-variant/30 shadow-[0_2px_16px_rgba(58,48,42,0.04)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="font-inter text-xl font-extrabold text-[#291B15] uppercase tracking-tight">Subject Directory</h3>
            <div className="relative sm:w-72">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-outline-variant/60 rounded-full text-sm focus:ring-1 focus:ring-primary focus:border-primary w-full transition-all shadow-sm"
                placeholder="Search subjects..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSubjects.map((subject) => {
              const isAssigned = assignedIds.includes(subject.id);
              return (
                <button
                  key={subject.id}
                  type="button"
                  onClick={() => toggleSubject(subject.id)}
                  className={`text-left p-5 rounded-xl border transition-all ${
                    isAssigned
                      ? "bg-primary-fixed border-primary text-on-primary-fixed"
                      : "bg-white border-outline-variant/30 hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-headline text-2xl font-bold">{subject.name}</h4>
                      <p className="text-xs text-on-surface-variant mt-1">{subject.chapters?.length ?? 0} chapters available</p>
                    </div>
                    <span className={`material-symbols-outlined ${isAssigned ? "text-primary" : "text-outline"}`}>
                      {isAssigned ? "check_circle" : "radio_button_unchecked"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

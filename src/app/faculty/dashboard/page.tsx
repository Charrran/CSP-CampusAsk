"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";
import { fetchJson } from "@/lib/api";
import type { ApiResponse, FacultyStatsResponse, Meeting, MeetingListResponse } from "@/types";

export default function FacultyDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<FacultyStatsResponse | null>(null);
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    Promise.all([
      fetchJson<ApiResponse<FacultyStatsResponse>>("/api/faculty/stats"),
      fetchJson<ApiResponse<MeetingListResponse>>("/api/meetings?limit=3"),
    ])
      .then(([statsResponse, meetingsResponse]) => {
        setStats(statsResponse.data ?? null);
        setMeetings(meetingsResponse.data?.meetings ?? []);
      })
      .catch(() => toast.error("Failed to load faculty dashboard"));
  }, []);

  const recentAnswers = stats?.recentAnswers ?? [];

  return (
    <>
      <header className="flex justify-between items-center mb-10">
        <div>
          <h2 className="font-inter text-3xl font-extrabold text-[#291B15] tracking-tight">Faculty Portal</h2>
          <p className="text-on-surface-variant font-inter text-sm font-medium opacity-70">
            Welcome back, {user?.name ?? "Faculty"}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative">
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">notifications</span>
          </div>
          <div className="flex items-center gap-3 pl-6 border-l border-outline-variant/40">
            <div className="text-right">
              <p className="font-inter font-bold text-sm text-[#291B15]">{user?.name ?? "Faculty"}</p>
              <p className="font-inter text-xs text-on-surface-variant">Faculty</p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm bg-surface-container-high flex items-center justify-center">
              <span className="material-symbols-outlined">person</span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        <section className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
          {[
            ["Answered By Me", stats?.answeredByMe ?? 0, "bolt", "bg-primary-fixed text-[#B85D38]"],
            ["Open In My Subjects", stats?.openInMySubjects ?? 0, "forum", "bg-secondary-fixed text-on-secondary-container"],
            ["Assigned Subjects", stats?.assignedSubjectCount ?? 0, "history_edu", "bg-tertiary-fixed text-on-tertiary-fixed-variant"],
          ].map(([label, value, icon, color]) => (
            <div key={label} className="bg-[#FCFAF8] p-6 rounded-2xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] flex items-center gap-5 border border-outline-variant/30">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
                <span className="material-symbols-outlined">{icon}</span>
              </div>
              <div>
                <p className="text-xs font-inter font-bold uppercase tracking-widest text-on-surface-variant/60">{label}</p>
                <p className="text-2xl font-inter font-extrabold text-[#291B15]">{value}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="col-span-12 lg:col-span-8 bg-[#FCFAF8] p-8 rounded-2xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-outline-variant/30">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-inter text-xl font-extrabold text-[#291B15] uppercase tracking-tight">Recent Answers</h3>
            <Link href="/faculty/qa" className="text-primary font-inter font-bold text-sm flex items-center gap-1 hover:underline">
              View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="space-y-6">
            {recentAnswers.map((answer) => (
              <Link key={answer.id} href={`/student/qa/${answer.doubt.id}`} className="block group p-6 rounded-xl bg-white/50 border border-transparent hover:border-outline-variant/60 hover:shadow-sm transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-inter font-bold rounded-full uppercase tracking-tighter">
                    {answer.doubt.subject?.name ?? "Subject"}
                  </span>
                  <span className="text-xs font-inter text-on-surface-variant opacity-60">{new Date(answer.createdAt).toLocaleDateString()}</span>
                </div>
                <h4 className="font-cormorant text-2xl text-[#291B15] mb-2 group-hover:text-[#B85D38] transition-colors font-bold">{answer.doubt.title}</h4>
                <p className="font-inter text-sm text-on-secondary-container line-clamp-2 leading-relaxed mb-4">{answer.content}</p>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center text-[10px]">
                    {(answer.doubt.user?.name ?? "S").slice(0, 2).toUpperCase()}
                  </div>
                  <span className="font-cormorant italic text-[#291B15] font-medium text-lg">{answer.doubt.user?.name ?? "Student"}</span>
                </div>
              </Link>
            ))}
            {!recentAnswers.length && <div className="p-10 rounded-xl border border-dashed border-outline-variant/60 text-center text-sm text-on-surface-variant">No answers posted yet.</div>}
          </div>
        </section>

        <aside className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-[#FCFAF8] p-8 rounded-2xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-outline-variant/30">
            <h3 className="font-inter text-xl font-extrabold text-[#291B15] uppercase tracking-tight mb-6">Consultations</h3>
            <div className="space-y-6">
              {meetings.map((meeting) => (
                <div key={meeting.id} className="bg-white p-4 rounded-xl border-l-4 border-[#B85D38] shadow-sm">
                  <p className="font-inter text-xs font-bold text-[#B85D38] uppercase tracking-tighter mb-1">{meeting.status}</p>
                  <p className="font-cormorant font-bold text-lg text-[#291B15]">{meeting.student?.name ?? "Student"}</p>
                  <p className="font-inter text-xs text-on-surface-variant opacity-70">{new Date(meeting.requestedTime).toLocaleString()}</p>
                </div>
              ))}
              {!meetings.length && <p className="text-sm text-on-surface-variant">No meeting requests yet.</p>}
            </div>
          </div>

          <div className="bg-[#291B15] p-8 rounded-2xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] text-surface overflow-hidden relative group">
            <div className="relative z-10">
              <h3 className="font-inter text-lg font-bold text-primary-fixed mb-4">Teaching Overview</h3>
              <p className="font-inter text-sm text-primary-fixed/80 leading-relaxed mb-6">
                You currently cover {stats?.assignedSubjectCount ?? 0} subjects with {stats?.openInMySubjects ?? 0} open student doubts.
              </p>
              <Link href="/faculty/subjects" className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                <div>
                  <p className="text-[10px] font-inter font-bold uppercase text-white/40 mb-1">Subject Assignments</p>
                  <p className="text-xl font-bold font-inter">Manage</p>
                </div>
                <span className="material-symbols-outlined text-primary-fixed text-3xl">arrow_forward</span>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

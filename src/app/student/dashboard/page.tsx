"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";
import { fetchJson } from "@/lib/api";
import type { ApiResponse, Meeting, MeetingListResponse, StudentStatsResponse } from "@/types";

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<StudentStatsResponse | null>(null);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchJson<ApiResponse<StudentStatsResponse>>("/api/student/stats"),
      fetchJson<ApiResponse<MeetingListResponse>>("/api/meetings?limit=2"),
    ])
      .then(([statsResponse, meetingsResponse]) => {
        setStats(statsResponse.data ?? null);
        setMeetings(meetingsResponse.data?.meetings ?? []);
      })
      .catch(() => toast.error("Failed to load dashboard"))
      .finally(() => setIsLoading(false));
  }, []);

  const recentDoubts = stats?.recentDoubts ?? [];

  return (
    <>
      <div className="mb-8">
        <h2 className="text-4xl font-bold font-heading text-[#291B15] mb-2">Student Portal</h2>
        <p className="text-[#6B5A50] font-medium text-sm">Welcome back, {user?.name?.split(" ")[0] ?? "Student"}. Here is what is happening today.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
        <div className="flex flex-col gap-6">
          <div className="bg-[#FCFAF8] border border-[#E3DACD] rounded-xl p-5 shadow-[0_4px_20px_rgba(41,27,21,0.06)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[10px] font-bold text-[#6B5A50] uppercase tracking-[0.2em] font-body">Quick Filters</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                ["Total", stats?.totalDoubts ?? 0],
                ["Open", stats?.openDoubts ?? 0],
                ["Answered", stats?.answeredDoubts ?? 0],
                ["Saved", stats?.savedCount ?? 0],
              ].map(([label, value]) => (
                <div key={label} className="flex h-16 shrink-0 flex-col justify-center rounded-md bg-white border border-[#E3DACD] px-5 font-body">
                  <span className="text-[10px] font-bold text-[#6B5A50] uppercase tracking-widest">{label}</span>
                  <span className="text-2xl font-bold text-[#291B15]">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#FCFAF8] border border-[#E3DACD] rounded-xl p-6 shadow-[0_4px_20px_rgba(41,27,21,0.06)] flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold font-heading text-[#291B15]">Active Threads</h2>
              <Link href="/student/qa/new" className="h-11 px-6 rounded-md bg-[#b34d19] text-white text-xs font-bold hover:brightness-110 shadow-lg shadow-[#b34d19]/20 transition-all flex items-center gap-2 uppercase tracking-wider font-body">
                <span className="material-symbols-outlined text-[18px]">add</span>
                Ask Question
              </Link>
            </div>
            <div className="flex flex-col gap-5">
              {recentDoubts.map((doubt) => (
                <Link key={doubt.id} href={`/student/qa/${doubt.id}`} className="group p-5 rounded-lg border border-[#E3DACD] hover:border-[#b34d19]/40 hover:shadow-md transition-all cursor-pointer bg-white/50 hover:-translate-y-[2px]">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-2 items-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#211711] text-white uppercase tracking-widest font-body">{doubt.subject?.name ?? "Subject"}</span>
                      <span className="px-2 py-0.5 rounded bg-orange-50 text-orange-700 text-[10px] font-bold border border-orange-100 flex items-center gap-1 uppercase tracking-widest font-body">
                        <span className="material-symbols-outlined text-[12px] font-bold">pending</span>
                        {doubt.status}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-[#6B5A50] font-body">{new Date(doubt.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#291B15] mb-2 group-hover:text-[#b34d19] transition-colors leading-tight font-heading">{doubt.title}</h3>
                  <p className="text-sm text-[#6B5A50] leading-relaxed line-clamp-2 font-body">{doubt.description}</p>
                </Link>
              ))}
              {!recentDoubts.length && (
                <div className="p-10 rounded-lg border border-dashed border-[#E3DACD] text-center text-sm text-[#6B5A50]">
                  {isLoading ? "Loading threads..." : "No doubts yet. Start your first academic thread."}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-[#FCFAF8] border border-[#E3DACD] rounded-xl p-6 shadow-[0_10px_40px_-10px_rgba(33,23,17,0.15)] h-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold font-heading text-[#291B15]">Upcoming</h2>
            </div>
            <div className="flex flex-col gap-5">
              {meetings.map((meeting) => (
                <div key={meeting.id} className="border border-[#E3DACD] rounded-xl p-5 bg-white relative overflow-hidden">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#F4F1ED] flex items-center justify-center border border-[#E3DACD]">
                      <span className="material-symbols-outlined text-[#291B15]">person</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-[#291B15] leading-tight font-heading">{meeting.faculty?.name ?? "Faculty"}</h4>
                      <p className="text-[10px] font-bold text-[#6B5A50] uppercase tracking-widest font-body">{meeting.subject?.name ?? "Consultation"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#b34d19] font-bold mb-5 bg-[#b34d19]/5 py-2.5 px-3 rounded-lg border border-[#b34d19]/10 font-body">
                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                    <span>{new Date(meeting.requestedTime).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                  <span className="w-full h-10 rounded-md bg-[#211711] text-white text-[10px] font-bold flex items-center justify-center gap-2 uppercase tracking-[0.15em] font-body">
                    {meeting.status}
                  </span>
                </div>
              ))}
              {!meetings.length && (
                <div className="border border-dashed border-[#E3DACD] rounded-xl p-8 bg-white text-center text-sm text-[#6B5A50]">No upcoming meetings.</div>
              )}
              <Link href="/student/booking" className="mt-4 w-full h-12 rounded-md border-2 border-[#b34d19] text-[#b34d19] text-[11px] font-bold hover:bg-[#b34d19] hover:text-white transition-all flex items-center justify-center gap-2 uppercase tracking-[0.2em] font-body">
                <span className="material-symbols-outlined text-[20px]">event_available</span>
                New Booking
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

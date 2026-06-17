"use client";

import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchJson } from "@/lib/api";
import type { ApiResponse, Meeting, MeetingListResponse, MeetingStatus } from "@/types";

const statuses: MeetingStatus[] = ["PENDING", "ACCEPTED", "REJECTED", "RESCHEDULED"];

export default function FacultyMeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [activeStatus, setActiveStatus] = useState<MeetingStatus | "ALL">("ALL");
  const [isLoading, setIsLoading] = useState(true);

  const loadMeetings = useCallback((status: MeetingStatus | "ALL") => {
    const suffix = status === "ALL" ? "" : `?status=${status}`;
    fetchJson<ApiResponse<MeetingListResponse>>(`/api/meetings${suffix}`)
      .then((response) => setMeetings(response.data?.meetings ?? []))
      .catch(() => toast.error("Failed to load meeting requests"))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    loadMeetings("ALL");
  }, [loadMeetings]);

  const updateMeeting = async (meetingId: string, status: "ACCEPTED" | "REJECTED") => {
    try {
      await fetchJson<ApiResponse<Meeting>>(`/api/meetings?id=${meetingId}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      toast.success(`Meeting ${status.toLowerCase()}`);
      loadMeetings(activeStatus);
    } catch {
      toast.error("Failed to update meeting");
    }
  };

  const changeFilter = (status: MeetingStatus | "ALL") => {
    setActiveStatus(status);
    setIsLoading(true);
    loadMeetings(status);
  };

  return (
    <div className="flex flex-col min-h-full">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="font-headline text-4xl text-on-surface leading-tight">Meeting Requests</h2>
          <p className="text-on-surface-variant mt-1">Review consultation requests and keep your schedule aligned.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["ALL", ...statuses] as const).map((status) => (
            <button
              key={status}
              onClick={() => changeFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                activeStatus === status
                  ? "bg-primary text-white border-primary"
                  : "bg-white border-outline-variant text-on-surface-variant hover:border-primary"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </header>

      <section className="bg-[#FCFAF8] rounded-2xl border border-outline-variant/30 shadow-[0_2px_16px_rgba(58,48,42,0.04)] overflow-hidden">
        <div className="px-8 py-6 bg-[#f6f0e8]/50 border-b border-outline-variant/40">
          <h3 className="font-headline text-2xl font-bold text-[#3a302a]">Consultation Queue</h3>
        </div>
        <div className="divide-y divide-outline-variant/30">
          {meetings.map((meeting) => (
            <div key={meeting.id} className="p-6 hover:bg-[#fbe8d8]/20 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed text-[10px] uppercase font-bold tracking-widest rounded-full">
                      {meeting.subject?.name ?? "Subject"}
                    </span>
                    <span className="px-3 py-1 bg-[#ece6dc] text-[#605850] text-[10px] uppercase font-bold tracking-widest rounded-full">
                      {meeting.status}
                    </span>
                  </div>
                  <h4 className="font-headline text-2xl text-[#291B15] font-bold">{meeting.student?.name ?? "Student request"}</h4>
                  <p className="text-sm text-on-surface-variant mt-1">
                    {new Date(meeting.requestedTime).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                  {meeting.notes && <p className="text-sm text-secondary mt-3 max-w-2xl">{meeting.notes}</p>}
                </div>
                {meeting.status === "PENDING" && (
                  <div className="flex gap-2">
                    <button onClick={() => updateMeeting(meeting.id, "ACCEPTED")} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-sm">
                      Accept
                    </button>
                    <button onClick={() => updateMeeting(meeting.id, "REJECTED")} className="px-4 py-2 bg-white border border-outline-variant/60 rounded-lg text-sm font-bold text-[#605850] hover:bg-[#f6f0e8]">
                      Decline
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {!meetings.length && (
            <div className="px-8 py-16 text-center text-secondary">
              <span className="material-symbols-outlined text-4xl mb-3 text-outline">event_busy</span>
              <p className="font-label font-bold">{isLoading ? "Loading requests..." : "No meeting requests found."}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

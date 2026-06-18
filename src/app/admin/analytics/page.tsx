"use client";

import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { fetchJson } from "@/lib/api";
import type { AdminAnalyticsResponse, ApiResponse } from "@/types";

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AdminAnalyticsResponse | null>(null);

  useEffect(() => {
    fetchJson<ApiResponse<AdminAnalyticsResponse>>("/api/admin/analytics")
      .then((response) => setAnalytics(response.data ?? null))
      .catch(() => toast.error("Failed to load analytics"));
  }, []);

  const maxDailyCount = useMemo(
    () => Math.max(1, ...(analytics?.dailyDoubtTrend.map((day) => day.count) ?? [0])),
    [analytics]
  );

  return (
    <div className="flex flex-col min-h-full">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-headline text-5xl text-[#3a302a] tracking-tight font-bold">System Analytics</h2>
          <p className="font-label text-[#605850] mt-2">Platform-wide usage, doubt health, and response performance.</p>
        </div>
        <div className="bg-[#ece6dc] px-4 py-2 rounded-lg flex items-center gap-3 shadow-sm border border-outline-variant/30">
          <span className="material-symbols-outlined text-primary">analytics</span>
          <span className="font-label text-sm font-bold text-[#3a302a]">30 day window</span>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          ["Users", analytics?.users.total ?? 0, "group"],
          ["Doubts", analytics?.doubts.total ?? 0, "forum"],
          ["Answers", analytics?.totalAnswers ?? 0, "question_answer"],
          ["Avg Response", `${analytics?.avgTimeToFirstAnswerHours ?? 0}h`, "schedule"],
        ].map(([label, value, icon]) => (
          <div key={label} className="bg-[#f6f0e8] p-6 rounded-xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-outline-variant/30">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined">{icon}</span>
            </div>
            <p className="font-label text-xs text-[#605850] uppercase tracking-widest font-semibold">{label}</p>
            <h3 className="font-headline text-4xl font-bold text-[#3a302a] mt-2">{value}</h3>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-12 gap-6">
        <section className="col-span-12 lg:col-span-8 bg-white rounded-xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-outline-variant/40 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-headline text-2xl font-bold text-[#3a302a]">Daily Doubt Trend</h3>
              <p className="text-sm text-[#605850] mt-1">New doubts created over the last 30 days.</p>
            </div>
            <span className="text-xs font-bold text-[#605850] uppercase tracking-widest">Live</span>
          </div>
          <div className="flex items-end justify-between h-72 gap-1 border-b border-outline-variant/40 pb-2">
            {(analytics?.dailyDoubtTrend ?? []).map((day) => (
              <div key={day.date} className="flex-1 flex flex-col items-center justify-end gap-2">
                <div
                  className="w-full max-w-4 bg-primary rounded-t-sm min-h-1 hover:bg-[#8c3c3c] transition-colors"
                  style={{ height: `${Math.max(4, (day.count / maxDailyCount) * 240)}px` }}
                  title={`${day.date}: ${day.count}`}
                />
              </div>
            ))}
          </div>
        </section>

        <aside className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-[#3a302a] rounded-xl p-8 text-white shadow-lg">
            <h3 className="font-headline text-3xl text-primary-fixed mb-6">Doubt Status</h3>
            <div className="space-y-4">
              {[
                ["Open", analytics?.doubts.open ?? 0],
                ["Answered", analytics?.doubts.answered ?? 0],
                ["Resolved", analytics?.doubts.resolved ?? 0],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4">
                  <span className="text-sm text-white/80">{label}</span>
                  <span className="font-headline text-2xl font-bold">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 border border-outline-variant/40 shadow-[0_2px_16px_rgba(58,48,42,0.04)]">
            <h3 className="font-headline text-2xl font-bold text-[#3a302a] mb-6">Top Subjects</h3>
            <div className="space-y-4">
              {(analytics?.subjectStats ?? []).slice(0, 5).map((subject) => (
                <div key={subject.id} className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#3a302a]">{subject.name}</span>
                  <span className="text-xs font-bold text-primary bg-primary-fixed px-2 py-1 rounded">{subject._count.doubts}</span>
                </div>
              ))}
              {!analytics?.subjectStats.length && <p className="text-sm text-[#605850]">No subject data available.</p>}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

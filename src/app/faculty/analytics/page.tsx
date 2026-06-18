"use client";

import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";
import { fetchJson } from "@/lib/api";
import type { ApiResponse, FacultyAnalyticsResponse } from "@/types";

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<FacultyAnalyticsResponse | null>(null);

  useEffect(() => {
    fetchJson<ApiResponse<FacultyAnalyticsResponse>>("/api/faculty/analytics")
      .then((response) => setAnalytics(response.data ?? null))
      .catch(() => toast.error("Failed to load analytics"));
  }, []);

  const maxSubjectCount = useMemo(
    () => Math.max(1, ...(analytics?.answersBySubject.map((subject) => subject.count) ?? [0])),
    [analytics]
  );

  return (
    <div className="flex flex-col min-h-full">
      <header className="flex justify-between items-center w-full pb-8">
        <div className="flex items-center gap-8">
          <h2 className="font-display text-3xl font-bold text-primary">Analytics</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <input className="bg-white border border-outline-variant/40 rounded-full py-2 pl-10 pr-4 text-sm font-inter focus:ring-1 focus:ring-primary focus:border-primary outline-none w-64 shadow-sm" placeholder="Search data..." type="text" />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">search</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#fbe8d8] flex items-center justify-center border border-outline-variant/40 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity font-bold text-primary">
            {(user?.name ?? "F").slice(0, 1)}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="font-inter text-[#8c3c3c] font-bold tracking-widest uppercase text-xs mb-2">Faculty Performance</p>
          <h1 className="font-display text-5xl text-[#3a302a] font-semibold leading-tight">Teaching Impact Dashboard</h1>
          <p className="font-body text-[#605850] mt-3 text-lg max-w-2xl">A curated overview of your academic impact, answer volume, and response performance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-outline-variant/60 shadow-[0_2px_16px_rgba(58,48,42,0.04)] rounded-xl col-span-1 lg:row-span-2 p-8 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="material-symbols-outlined text-[#8c3c3c] p-2 bg-[#fce0e0] rounded-lg">speed</span>
                <span className="font-inter text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Live</span>
              </div>
              <h3 className="font-inter text-[#3a302a] font-semibold mb-2 text-sm uppercase tracking-wider">Avg Response Time</h3>
              <div className="font-headline text-7xl text-[#8c3c3c] font-bold leading-none tracking-tighter">
                {analytics?.avgResponseTimeHours ?? 0}<span className="text-3xl">h</span>
              </div>
              <p className="font-inter text-sm text-[#605850] mt-4 leading-relaxed">Average time from student doubt creation to your faculty response.</p>
            </div>
          </div>

          <div className="bg-white border border-outline-variant/60 shadow-[0_2px_16px_rgba(58,48,42,0.04)] rounded-xl col-span-1 md:col-span-2 p-8 hover:shadow-lg transition-shadow duration-300">
            <h3 className="font-inter text-[#3a302a] font-semibold mb-1 text-sm uppercase tracking-wider">Answer Quality</h3>
            <p className="font-inter text-xs text-[#605850] mb-4 uppercase tracking-wider font-semibold">Average Upvotes Per Answer</p>
            <div className="flex items-baseline gap-2">
              <span className="font-headline text-6xl text-[#3a302a] font-bold">{analytics?.avgUpvotesPerAnswer ?? 0}</span>
              <span className="font-inter text-lg text-outline font-medium">votes</span>
            </div>
          </div>

          <div className="bg-[#3a302a] rounded-xl col-span-1 p-6 text-white shadow-lg hover:-translate-y-1 transition-transform duration-300">
            <h3 className="font-inter font-bold text-[#fbe8d8] mb-4 text-xs uppercase tracking-wider">Total Answers</h3>
            <div className="font-headline text-5xl font-bold mb-2">{analytics?.totalAnswers ?? 0}</div>
            <p className="text-[#ece6dc] text-xs font-inter leading-relaxed">Across your assigned academic modules.</p>
          </div>

          <div className="bg-white border border-outline-variant/60 shadow-[0_2px_16px_rgba(58,48,42,0.04)] rounded-xl col-span-1 md:col-span-2 lg:col-span-3 p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-inter text-[#3a302a] font-semibold text-sm uppercase tracking-wider">Answers By Subject</h3>
                <p className="font-inter text-sm text-[#605850] mt-1">Distribution of your faculty responses.</p>
              </div>
            </div>
            <div className="space-y-5">
              {(analytics?.answersBySubject ?? []).map((subject) => (
                <div key={subject.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#3a302a] font-bold">{subject.name}</span>
                    <span className="text-[#605850] font-bold">{subject.count}</span>
                  </div>
                  <div className="w-full bg-[#f2ece4] rounded-full h-2 overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${(subject.count / maxSubjectCount) * 100}%` }}></div>
                  </div>
                </div>
              ))}
              {!analytics?.answersBySubject.length && <p className="text-sm text-[#605850]">No answer distribution available yet.</p>}
            </div>
          </div>

          <div className="bg-white border border-outline-variant/60 shadow-[0_2px_16px_rgba(58,48,42,0.04)] rounded-xl col-span-1 p-8 hover:shadow-lg transition-shadow duration-300">
            <h3 className="font-inter text-[#3a302a] font-semibold mb-6 text-sm uppercase tracking-wider">Summary</h3>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#8c3c3c]"></div>
                <span className="font-inter text-sm text-[#3a302a] font-medium">Subjects Covered</span>
                <span className="ml-auto font-headline text-xl font-bold italic text-[#3a302a]">{analytics?.answersBySubject.length ?? 0}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="font-inter text-sm text-[#3a302a] font-medium">Total Impact</span>
                <span className="ml-auto font-headline text-xl font-bold italic text-[#3a302a]">{analytics?.totalAnswers ?? 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

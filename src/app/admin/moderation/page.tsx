"use client";

import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { fetchJson } from "@/lib/api";
import type { Answer, ApiResponse, Doubt, ModerationQueueResponse } from "@/types";

type QueueItem =
  | { type: "doubt"; id: string; title: string; reporter: { initials: string; name: string }; reason: string; status: string; time: string }
  | { type: "answer"; id: string; title: string; reporter: { initials: string; name: string }; reason: string; status: string; time: string };

function initials(name: string) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

export default function AdminModerationPage() {
  const [queue, setQueue] = useState<ModerationQueueResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadQueue = () => {
    fetchJson<ApiResponse<ModerationQueueResponse>>("/api/admin/moderation")
      .then((response) => setQueue(response.data ?? null))
      .catch(() => toast.error("Failed to load moderation queue"))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadQueue();
  }, []);

  const items = useMemo<QueueItem[]>(() => {
    const doubts = (queue?.flaggedDoubts ?? []).map((doubt: Doubt): QueueItem => ({
      type: "doubt",
      id: doubt.id,
      title: doubt.title,
      reporter: { initials: initials(doubt.user?.name ?? "Student"), name: doubt.user?.name ?? "Student" },
      reason: doubt.flagReason ?? "Flagged doubt",
      status: "Pending Review",
      time: new Date(doubt.createdAt).toLocaleString(),
    }));
    const answers = (queue?.flaggedAnswers ?? []).map((answer: Answer): QueueItem => ({
      type: "answer",
      id: answer.id,
      title: answer.content,
      reporter: { initials: initials(answer.user?.name ?? "Faculty"), name: answer.user?.name ?? "Faculty" },
      reason: answer.flagReason ?? "Flagged answer",
      status: "Pending Review",
      time: new Date(answer.createdAt).toLocaleString(),
    }));
    return [...doubts, ...answers];
  }, [queue]);

  const handleAction = async (item: QueueItem, action: "clear" | "remove") => {
    try {
      await fetchJson<ApiResponse<{ message: string }>>(`/api/admin/moderation/${item.type}/${item.id}`, {
        method: "PATCH",
        body: JSON.stringify({ action }),
      });
      toast.success(action === "clear" ? "Flag cleared" : "Content removed");
      loadQueue();
    } catch {
      toast.error("Failed to resolve flag");
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h2 className="font-headline text-4xl md:text-5xl text-[#3a302a] leading-tight font-bold">Admin Moderation</h2>
          <p className="font-body text-secondary mt-2 max-w-md">Oversee community integrity and review flagged inquiries within CampusAsk.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-[#ece6dc] px-4 py-2 rounded-lg flex items-center gap-3 shadow-sm border border-outline-variant/30">
            <span className="material-symbols-outlined text-primary">notifications</span>
            <span className="font-label text-sm font-bold text-[#3a302a]">{queue?.totalFlagged ?? 0} Alerts</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#f6f0e8] p-8 rounded-xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-outline-variant/30 col-span-1 md:col-span-2 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="relative z-10">
            <h3 className="font-headline text-3xl font-bold text-[#3a302a] mb-6">Moderation Queue</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-12">
              <div>
                <p className="font-label text-xs uppercase tracking-widest text-secondary mb-1 font-bold">Flagged Doubts</p>
                <p className="font-headline text-4xl md:text-5xl text-primary font-bold">{queue?.flaggedDoubts.length ?? 0}</p>
              </div>
              <div className="hidden sm:block w-px h-20 bg-outline-variant/60"></div>
              <div>
                <p className="font-label text-xs uppercase tracking-widest text-secondary mb-1 font-bold">Flagged Answers</p>
                <p className="font-headline text-4xl md:text-5xl text-[#8c3c3c] font-bold">{queue?.flaggedAnswers.length ?? 0}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#3a302a] p-8 rounded-xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="material-symbols-outlined text-[#f0a878] mb-4 text-3xl">verified_user</span>
            <h3 className="font-headline text-3xl text-white font-bold mb-2">System Health</h3>
            <p className="font-body text-[#ece6dc] text-sm mt-2 leading-relaxed opacity-90">Flagged content is pulled directly from the moderation API.</p>
          </div>
        </div>
      </div>

      <section className="bg-white rounded-xl shadow-[0_2px_16px_rgba(58,48,42,0.04)] border border-outline-variant/40 overflow-hidden">
        <div className="px-8 py-6 border-b border-outline-variant/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#f6f0e8]/50">
          <h3 className="font-headline text-2xl font-bold text-[#3a302a]">Flagged Items</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f2ece4] border-b border-outline-variant/40">
                <th className="px-8 py-4 font-label text-xs uppercase tracking-widest text-secondary font-bold">Details</th>
                <th className="px-8 py-4 font-label text-xs uppercase tracking-widest text-secondary font-bold">Reporter</th>
                <th className="px-8 py-4 font-label text-xs uppercase tracking-widest text-secondary font-bold">Reason</th>
                <th className="px-8 py-4 font-label text-xs uppercase tracking-widest text-secondary font-bold">Type</th>
                <th className="px-8 py-4 font-label text-xs uppercase tracking-widest text-secondary font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {items.map((item) => (
                <tr key={`${item.type}-${item.id}`} className="hover:bg-[#f6f0e8] transition-colors group">
                  <td className="px-8 py-6 max-w-xs">
                    <p className="font-label font-bold text-[#3a302a] truncate">{item.title}</p>
                    <p className="font-body text-xs text-secondary mt-1 font-medium">ID: #{item.id} | {item.time}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#eae2da] flex items-center justify-center text-xs font-bold text-[#605850] border border-outline-variant/30">{item.reporter.initials}</div>
                      <span className="font-label text-sm font-semibold text-[#3a302a]">{item.reporter.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="bg-[#fce0e0]/50 text-[#8c3c3c] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-[#fce0e0]">{item.reason}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-label text-xs font-bold text-primary">{item.type}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleAction(item, "clear")} className="p-2 text-green-700 hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-200" title="Clear">
                        <span className="material-symbols-outlined">check_circle</span>
                      </button>
                      <button onClick={() => handleAction(item, "remove")} className="p-2 text-error hover:bg-error-container rounded-lg transition-colors border border-transparent hover:border-error/20" title="Remove">
                        <span className="material-symbols-outlined">delete_forever</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!items.length && (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-secondary font-medium">
                    {isLoading ? "Loading flagged items..." : "No flagged items to review."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

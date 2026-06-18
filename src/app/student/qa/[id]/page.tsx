"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";
import { fetchJson } from "@/lib/api";
import type { Answer, ApiResponse, Doubt } from "@/types";

type DoubtDetail = Doubt & { answers: Answer[] };

export default function ThreadDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const [doubt, setDoubt] = useState<DoubtDetail | null>(null);
  const [reply, setReply] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadDoubt = useCallback(() => {
    fetchJson<ApiResponse<DoubtDetail>>(`/api/doubts/${params.id}`)
      .then((response) => setDoubt(response.data ?? null))
      .catch(() => {
        toast.error("Failed to load thread");
        router.push(user?.role === "FACULTY" ? "/faculty/qa" : "/student/qa");
      })
      .finally(() => setIsLoading(false));
  }, [params.id, router, user?.role]);

  useEffect(() => {
    loadDoubt();
  }, [loadDoubt]);

  const submitAnswer = async () => {
    if (!reply.trim()) {
      toast.error("Please write a response");
      return;
    }
    setIsSubmitting(true);
    try {
      await fetchJson<ApiResponse<Answer>>(`/api/doubts/${params.id}/answers`, {
        method: "POST",
        body: JSON.stringify({ content: reply }),
      });
      setReply("");
      toast.success("Response posted");
      loadDoubt();
    } catch {
      toast.error("Failed to post response");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSave = async () => {
    if (!doubt) return;
    try {
      await fetchJson<ApiResponse<{ saved: boolean }>>(`/api/doubts/${doubt.id}/save`, {
        method: doubt.isSaved ? "DELETE" : "POST",
      });
      setDoubt({ ...doubt, isSaved: !doubt.isSaved });
    } catch {
      toast.error("Failed to update saved state");
    }
  };

  const resolveDoubt = async () => {
    if (!doubt) return;
    try {
      const response = await fetchJson<ApiResponse<Doubt>>(`/api/doubts/${doubt.id}`, { method: "PATCH" });
      if (response.data) setDoubt({ ...doubt, ...response.data });
      toast.success("Doubt marked resolved");
    } catch {
      toast.error("Failed to resolve doubt");
    }
  };

  const toggleAnswerUpvote = async (answerId: string) => {
    try {
      const response = await fetchJson<ApiResponse<{ upvoted: boolean; upvoteCount: number }>>(`/api/answers/${answerId}/upvote`, { method: "POST" });
      setDoubt((current) => current ? {
        ...current,
        answers: current.answers.map((answer) => answer.id === answerId ? {
          ...answer,
          isUpvoted: response.data?.upvoted ?? answer.isUpvoted,
          upvoteCount: response.data?.upvoteCount ?? answer.upvoteCount,
        } : answer),
      } : current);
    } catch {
      toast.error("Failed to update vote");
    }
  };

  if (!doubt) {
    return (
      <div className="flex-grow max-w-7xl mx-auto w-full mt-6">
        <div className="bg-[#f6f0e8] rounded-xl p-10 border border-outline-variant/30 text-[#605850]">
          {isLoading ? "Loading thread..." : "Thread not found."}
        </div>
      </div>
    );
  }

  const backHref = user?.role === "FACULTY" ? "/faculty/qa" : "/student/qa";

  return (
    <div className="flex-grow max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-12 mt-6">
      <div className="flex-grow lg:w-2/3 space-y-12">
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-[#605850] uppercase tracking-widest text-[10px] font-label font-bold">
            <Link href={backHref} className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Hub
            </Link>
            <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
            <span>{doubt.subject?.name ?? "Subject"}</span>
            <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
            <span>{doubt.chapter?.name ?? "Chapter"}</span>
            <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
            <span className="text-[#8c3c3c]">{doubt.status}</span>
          </div>
          <h1 className="font-headline text-5xl md:text-6xl text-[#3a302a] leading-tight font-medium">{doubt.title}</h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#e08850] flex items-center justify-center text-white font-bold">
              {(doubt.user?.name ?? "S").slice(0, 1)}
            </div>
            <div>
              <p className="font-label font-bold text-sm text-[#3a302a]">{doubt.user?.name ?? "Student"}</p>
              <p className="text-xs text-[#605850]">Posted {new Date(doubt.createdAt).toLocaleString()}</p>
            </div>
          </div>
          <div className="text-on-surface-variant leading-relaxed text-lg max-w-3xl font-body whitespace-pre-line">{doubt.description}</div>
          <div className="flex flex-wrap gap-3">
            {user?.role === "STUDENT" && (
              <button onClick={toggleSave} className="px-4 py-2 rounded-lg bg-[#ece6dc] text-[#3a302a] text-xs font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">{doubt.isSaved ? "bookmark" : "bookmark_add"}</span>
                {doubt.isSaved ? "Saved" : "Save"}
              </button>
            )}
            {user?.id === doubt.userId && doubt.status === "ANSWERED" && (
              <button onClick={resolveDoubt} className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                Mark Resolved
              </button>
            )}
          </div>
        </section>

        <section className="space-y-10 pt-8 border-t border-outline-variant/30">
          <h3 className="font-label text-sm uppercase tracking-widest text-[#605850] font-bold">Faculty Responses</h3>
          {doubt.answers.map((answer) => (
            <div key={answer.id} className="border-l-4 border-[#B85D38] pl-8 py-2">
              <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#fbe8d8] flex items-center justify-center shadow-sm text-primary font-bold">
                    {(answer.user?.name ?? "F").slice(0, 1)}
                  </div>
                  <div>
                    <h4 className="font-headline text-2xl text-primary font-medium italic">{answer.user?.name ?? "Faculty"}</h4>
                    <p className="font-label text-[10px] uppercase text-[#8c3c3c] font-extrabold tracking-tighter">Verified Expert</p>
                  </div>
                </div>
                <span className="text-[10px] font-label text-[#605850] uppercase bg-[#ece6dc] px-2 py-1 rounded font-bold">{new Date(answer.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="space-y-4 text-[#3a302a] leading-relaxed font-body">
                <p className="whitespace-pre-line">{answer.content}</p>
                {answer.summary && <p className="bg-[#f6f0e8] border border-outline-variant/30 rounded-lg p-4 text-sm">{answer.summary}</p>}
                <div className="flex gap-4 pt-4">
                  <button onClick={() => toggleAnswerUpvote(answer.id)} className="flex items-center gap-2 text-xs font-label text-primary hover:bg-primary/5 px-3 py-1 rounded transition-all font-semibold">
                    <span className="material-symbols-outlined text-sm">thumb_up</span>
                    <span>Insightful ({answer.upvoteCount})</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {!doubt.answers.length && <div className="text-sm text-[#605850] bg-[#f6f0e8] rounded-xl p-6 border border-outline-variant/30">No faculty responses yet.</div>}
        </section>

        {user?.role === "FACULTY" && (
          <section className="pt-8">
            <div className="bg-[#f6f0e8] rounded-xl p-6 border border-outline-variant/30 shadow-sm">
              <label className="font-label text-xs uppercase font-bold text-[#605850] mb-3 block">Contribute to the Discussion</label>
              <textarea
                value={reply}
                onChange={(event) => setReply(event.target.value)}
                className="w-full bg-white border-outline-variant/60 rounded-lg p-4 focus:ring-1 focus:ring-primary focus:border-primary font-body text-sm min-h-[120px] placeholder:text-outline/50"
                placeholder="Write a faculty response..."
              />
              <div className="flex flex-wrap gap-4 justify-between items-center mt-4">
                <div className="flex gap-2">
                  <button type="button" className="material-symbols-outlined text-[#605850] hover:text-primary transition-all p-2 rounded hover:bg-[#ece6dc]">attach_file</button>
                  <button type="button" className="material-symbols-outlined text-[#605850] hover:text-primary transition-all p-2 rounded hover:bg-[#ece6dc]">functions</button>
                </div>
                <button disabled={isSubmitting} onClick={submitAnswer} className="bg-primary text-white font-label font-bold px-6 py-2 rounded-md hover:bg-[#B85D38] transition-all shadow-sm disabled:opacity-70">
                  {isSubmitting ? "Posting..." : "Post Response"}
                </button>
              </div>
            </div>
          </section>
        )}
      </div>

      <aside className="lg:w-1/3 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          <div className="bg-white/40 backdrop-blur-md border border-outline-variant/40 p-6 rounded-2xl flex flex-col justify-between shadow-sm">
            <span className="material-symbols-outlined text-[#B85D38] mb-4">analytics</span>
            <div>
              <p className="text-3xl font-headline font-bold text-[#3a302a]">{doubt.answers.length}</p>
              <p className="font-label text-xs uppercase tracking-wider text-[#605850] font-bold">Faculty Responses</p>
            </div>
          </div>
          <div className="bg-white/40 backdrop-blur-md border border-outline-variant/40 p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-[#B85D38]">event</span>
              <span className="text-[10px] font-label font-bold text-[#8c3c3c] bg-[#8c3c3c]/10 px-2 py-1 rounded">{doubt.status}</span>
            </div>
            <p className="font-label text-xs uppercase tracking-wider text-[#605850] mb-1 font-bold">Created</p>
            <p className="font-headline text-xl text-[#3a302a] font-bold">{new Date(doubt.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="sm:col-span-2 lg:col-span-1 bg-[#f2ece4] p-6 rounded-2xl shadow-sm border border-outline-variant/30">
            <h5 className="font-label text-xs uppercase font-extrabold text-[#3a302a] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">auto_stories</span>
              Thread Taxonomy
            </h5>
            <div className="flex flex-wrap gap-2">
              {(doubt.tags.length ? doubt.tags : [doubt.subject?.name, doubt.chapter?.name].filter(Boolean) as string[]).map((tag) => (
                <span key={tag} className="px-3 py-1 bg-[#ece6dc] rounded-full text-[10px] font-label font-bold text-[#605850]">#{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

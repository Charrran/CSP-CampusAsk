"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

export default function NewInquiryPage() {
  const [subject, setSubject] = useState<string>("Mathematics");
  const [inquiryText, setInquiryText] = useState("");
  const [tags, setTags] = useState<string[]>(["Calculus", "Derivatives"]);
  const [tagInput, setTagInput] = useState("");
  const [priority, setPriority] = useState("Standard Inquiry");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryText.trim()) {
      toast.error("Please provide an inquiry premise");
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Inquiry submitted successfully!");
      router.push("/student/qa");
    }, 1500);
  };

  return (
    <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-start mt-6">
      {/* Left Side: Context/Editorial Header */}
      <div className="md:col-span-4 flex flex-col gap-6">
        <div className="p-8 bg-[#faf5ee] rounded-xl border border-outline-variant/40 shadow-sm transition-all duration-300 hover:shadow-md">
          <h1 className="font-headline text-5xl text-primary leading-tight">Commence New Inquiry</h1>
          <p className="mt-4 text-on-surface-variant font-body leading-relaxed">
            Formalize your academic doubts within our ecosystem. Your inquiry will be triaged to the appropriate faculty member for a detailed resolution.
          </p>
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-sm text-secondary font-label">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: "20px" }}>info</span>
              <span>Response time: ~24 Academic Hours</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-secondary font-label">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: "20px" }}>visibility</span>
              <span>Private to Faculty &amp; Moderators</span>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden h-64 rounded-xl border border-outline-variant/40 shadow-sm hover:shadow-md transition-all duration-300">
          <img 
            className="w-full h-full object-cover opacity-80" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDi5P5UoMsa2guXv2JS6bFAsbImmQkk4TcaRdr78Z4x68GcWMPKPMNLogmBFPW3B_ct-PK3irIwLlLCOqcF16symb6eWN4iwdvMvIDdA_H6VyEC2Kc9K6pjKT9kXUdaD3pzzNMHf_97JEd6VMVByTbfwC22vkhSXnKQ0PpUczzfaVlXEn5Sd7aj8YYWwo_kJmxBP3MLiLZYh7znAxugkKmTyrukvn8jkF3VryjQje8UwNARy8JGSYijrDqhU3sRZV0fvB0PIJoivQ" 
            alt="Library Book" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf5ee]/90 to-transparent flex flex-col justify-end p-6">
            <span className="font-label text-xs uppercase tracking-[0.2em] text-primary font-bold">Vidya Setu Legacy</span>
            <span className="font-headline text-xl mt-1 italic text-[#3a302a]">Knowledge bridge for the modern scholar.</span>
          </div>
        </div>
      </div>

      {/* Right Side: The Bento Form */}
      <form onSubmit={handleSubmit} className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: Subject Selection */}
        <div className="p-6 bg-[#faf5ee] rounded-xl border border-outline-variant/40 shadow-sm hover:shadow-md transition-all duration-300 md:col-span-2">
          <label className="block font-label text-xs uppercase tracking-widest text-secondary mb-3 font-bold">Academic Domain</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: "Mathematics", icon: "functions" },
              { id: "Science", icon: "biotech" },
              { id: "Literature", icon: "history_edu" },
              { id: "Engineering", icon: "architecture" },
            ].map((domain) => (
              <button
                key={domain.id}
                type="button"
                onClick={() => setSubject(domain.id)}
                className={`py-3 px-4 flex flex-col gap-2 items-start rounded-md transition-colors border ${
                  subject === domain.id
                    ? "bg-[#e08850] border-[#c2652a] text-[#fbe8d8]"
                    : "bg-white border-outline-variant/60 hover:bg-[#fbe8d8] text-[#3a302a]"
                }`}
              >
                <span className={`material-symbols-outlined ${subject === domain.id ? "text-white" : "text-primary"}`}>
                  {domain.icon}
                </span>
                <span className="font-label text-sm font-medium">{domain.id}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Inquiry Premise (Rich Text Area) */}
        <div className="p-6 bg-[#faf5ee] rounded-xl border border-outline-variant/40 shadow-sm hover:shadow-md transition-all duration-300 md:col-span-2">
          <label className="block font-label text-xs uppercase tracking-widest text-secondary mb-3 font-bold">Inquiry Premise</label>
          <div className="border border-outline-variant/60 bg-white rounded-md focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all overflow-hidden">
            <div className="flex items-center gap-2 p-2 border-b border-outline-variant/40 bg-[#f6f0e8]">
              <button type="button" className="material-symbols-outlined p-1 rounded hover:bg-[#ece6dc] transition-colors text-sm" title="Bold">format_bold</button>
              <button type="button" className="material-symbols-outlined p-1 rounded hover:bg-[#ece6dc] transition-colors text-sm" title="Italic">format_italic</button>
              <button type="button" className="material-symbols-outlined p-1 rounded hover:bg-[#ece6dc] transition-colors text-sm" title="List">format_list_bulleted</button>
              <button type="button" className="material-symbols-outlined p-1 rounded hover:bg-[#ece6dc] transition-colors text-sm" title="Link">link</button>
              <div className="w-px h-4 bg-outline-variant mx-1"></div>
              <button type="button" className="material-symbols-outlined p-1 rounded hover:bg-[#ece6dc] transition-colors text-sm" title="Attach">attach_file</button>
            </div>
            <textarea
              value={inquiryText}
              onChange={(e) => setInquiryText(e.target.value)}
              className="w-full min-h-[160px] p-4 bg-transparent border-none focus:ring-0 font-body leading-relaxed text-[#3a302a] placeholder:text-outline/60 text-sm"
              placeholder="Describe the complexity of your academic hurdle..."
            ></textarea>
          </div>
        </div>

        {/* Section 3: Tag Input */}
        <div className="p-6 bg-[#faf5ee] rounded-xl border border-outline-variant/40 shadow-sm hover:shadow-md transition-all duration-300">
          <label className="block font-label text-xs uppercase tracking-widest text-secondary mb-3 font-bold">Relevant Taxonomies</label>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-[#fbe8d8] text-[#8a4518] rounded text-xs font-label flex items-center gap-1 font-semibold border border-[#c2652a]/20">
                {tag}
                <button type="button" onClick={() => handleRemoveTag(tag)} className="material-symbols-outlined text-[14px] hover:text-[#c2652a]">close</button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            className="w-full px-3 py-2 border border-outline-variant/60 rounded-md bg-white focus:ring-1 focus:ring-primary focus:border-primary font-label text-sm text-[#3a302a] placeholder:text-outline/60"
            placeholder="Add tag + Enter"
          />
        </div>

        {/* Section 4: Urgency & Submission */}
        <div className="p-6 bg-[#faf5ee] rounded-xl border border-outline-variant/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <div>
            <label className="block font-label text-xs uppercase tracking-widest text-secondary mb-3 font-bold">Priority level</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 border border-outline-variant/60 rounded-md bg-white focus:ring-1 focus:ring-primary focus:border-primary font-label text-sm text-[#3a302a]"
            >
              <option>Standard Inquiry</option>
              <option>Exam Impending</option>
              <option>Thesis Critical</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full py-4 bg-primary text-white rounded-md font-label font-bold uppercase tracking-widest text-sm hover:bg-primary/90 active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin" style={{ fontSize: "18px" }}>progress_activity</span>
                Submitting...
              </>
            ) : (
              "Submit Inquiry"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

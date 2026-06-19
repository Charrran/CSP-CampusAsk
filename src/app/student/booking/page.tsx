"use client";

import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { fetchJson } from "@/lib/api";
import type { ApiResponse, AvailabilitySlot, FacultyDirectoryItem, Meeting, MeetingListResponse, Subject } from "@/types";

export default function BookingPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [faculty, setFaculty] = useState<FacultyDirectoryItem[]>([]);
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [selectedFacultyId, setSelectedFacultyId] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedFaculty = useMemo(
    () => faculty.find((member) => member.id === selectedFacultyId),
    [faculty, selectedFacultyId]
  );

  useEffect(() => {
    Promise.all([
      fetchJson<ApiResponse<Subject[]>>("/api/subjects"),
      fetchJson<ApiResponse<MeetingListResponse>>("/api/meetings?limit=4"),
    ])
      .then(([subjectResponse, meetingResponse]) => {
        const nextSubjects = subjectResponse.data ?? [];
        setSubjects(nextSubjects);
        setMeetings(meetingResponse.data?.meetings ?? []);
        setSelectedSubjectId(nextSubjects[0]?.id ?? "");
      })
      .catch(() => toast.error("Failed to load booking data"))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedSubjectId) return;

    fetchJson<ApiResponse<FacultyDirectoryItem[]>>(`/api/faculty/directory?subjectId=${selectedSubjectId}`)
      .then((response) => {
        setFaculty(response.data ?? []);
      })
      .catch(() => toast.error("Failed to load faculty"));
  }, [selectedSubjectId]);

  useEffect(() => {
    if (!selectedFacultyId) return;

    fetchJson<ApiResponse<AvailabilitySlot[]>>(`/api/meetings/slots?facultyId=${selectedFacultyId}`)
      .then((response) => setSlots(response.data ?? []))
      .catch(() => toast.error("Failed to load slots"));
  }, [selectedFacultyId]);

  const handleSubmit = async () => {
    if (!selectedSubjectId || !selectedFacultyId || !selectedSlotId) {
      toast.error("Choose a subject, faculty member, and slot");
      return;
    }

    setIsSubmitting(true);
    try {
      await fetchJson<ApiResponse<Meeting>>("/api/meetings", {
        method: "POST",
        body: JSON.stringify({
          subjectId: selectedSubjectId,
          facultyId: selectedFacultyId,
          slotId: selectedSlotId,
          notes,
        }),
      });
      toast.success("Meeting requested successfully");
      const meetingResponse = await fetchJson<ApiResponse<MeetingListResponse>>("/api/meetings?limit=4");
      setMeetings(meetingResponse.data?.meetings ?? []);
      setSelectedSlotId("");
      setNotes("");
    } catch {
      toast.error("Failed to request meeting");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-12">
        <div>
          <h2 className="text-5xl font-headline italic mb-2">Faculty Bookings</h2>
          <p className="text-[#605850] font-body">Reserve office hours with available faculty for focused academic guidance.</p>
        </div>
        <div className="bg-[#ece6dc] px-4 py-2 rounded-lg flex items-center gap-3 shadow-sm border border-outline-variant/30">
          <span className="material-symbols-outlined text-primary">event_available</span>
          <span className="font-label text-sm font-bold text-[#3a302a]">{meetings.length} recent requests</span>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        <section className="col-span-12 lg:col-span-8 bg-surface-container-low p-8 rounded-md border border-sand-border/40">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-headline">Schedule Consultation</h3>
            {isLoading && <span className="text-xs font-bold text-[#605850] uppercase tracking-widest">Loading</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#605850] uppercase tracking-widest mb-2">Subject</label>
              <select
                value={selectedSubjectId}
                onChange={(event) => {
                  setSelectedSubjectId(event.target.value);
                  setFaculty([]);
                  setSelectedFacultyId("");
                  setSlots([]);
                  setSelectedSlotId("");
                }}
                className="w-full bg-white border border-sand-border focus:ring-primary focus:border-primary rounded-md px-4 py-3 font-body text-on-surface outline-none"
              >
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#605850] uppercase tracking-widest mb-2">Faculty</label>
              <select
                value={selectedFacultyId}
                onChange={(event) => {
                  setSelectedFacultyId(event.target.value);
                  setSlots([]);
                  setSelectedSlotId("");
                }}
                className="w-full bg-white border border-sand-border focus:ring-primary focus:border-primary rounded-md px-4 py-3 font-body text-on-surface outline-none"
              >
                <option value="">Select faculty</option>
                {faculty.map((member) => (
                  <option key={member.id} value={member.id}>{member.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8">
            <label className="block text-xs font-bold text-[#605850] uppercase tracking-widest mb-3">Available Slots</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {slots.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setSelectedSlotId(slot.id)}
                  className={`py-3 px-4 border rounded-md text-left transition-colors ${
                    selectedSlotId === slot.id
                      ? "border-primary bg-primary-container text-on-primary-container"
                      : "bg-white border-sand-border hover:border-primary hover:text-primary"
                  }`}
                >
                  <span className="block font-label text-sm font-bold">
                    {new Date(slot.startTime).toLocaleDateString([], { month: "short", day: "numeric" })}
                  </span>
                  <span className="block text-xs mt-1">
                    {new Date(slot.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {new Date(slot.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </button>
              ))}
              {!slots.length && (
                <div className="sm:col-span-2 xl:col-span-3 border border-dashed border-sand-border rounded-md p-8 text-center text-sm text-[#605850]">
                  {selectedFacultyId ? "No available slots for this faculty member." : "Select a faculty member to view slots."}
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <label className="block text-xs font-bold text-[#605850] uppercase tracking-widest mb-2">Discussion Notes</label>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="w-full bg-white border border-sand-border focus:ring-primary focus:border-primary rounded-md px-4 py-3 font-body text-on-surface outline-none"
              placeholder="Briefly describe what you'd like to focus on..."
              rows={4}
            />
          </div>

          <button
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="mt-6 bg-primary text-on-primary px-8 py-3 rounded-md shadow-sm font-bold transition-transform active:scale-95 disabled:opacity-70"
          >
            {isSubmitting ? "Requesting..." : "Request Meeting"}
          </button>
        </section>

        <aside className="col-span-12 lg:col-span-4 bg-umber-brand text-on-primary-container p-8 rounded-md flex flex-col gap-8">
          <div>
            <span className="material-symbols-outlined text-4xl opacity-50 mb-4">calendar_month</span>
            <h3 className="text-3xl font-headline leading-tight mb-4">Upcoming Requests</h3>
            <p className="text-sm text-[#b08a57]">Track faculty responses and consultation times from your latest booking requests.</p>
          </div>

          <div className="space-y-4">
            {meetings.map((meeting) => (
              <div key={meeting.id} className="bg-white/10 border border-white/10 rounded-md p-4">
                <p className="font-professor text-xl text-white">{meeting.faculty?.name ?? selectedFaculty?.name ?? "Faculty"}</p>
                <p className="mt-1 text-xs text-[#e7c98f]">{meeting.subject?.name ?? "Academic consultation"}</p>
                <div className="mt-3 flex items-center justify-between text-xs font-bold">
                  <span>{new Date(meeting.requestedTime).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                  <span className="bg-surface text-on-surface px-2 py-1 rounded">{meeting.status}</span>
                </div>
              </div>
            ))}
            {!meetings.length && (
              <div className="bg-white/10 border border-white/10 rounded-md p-6 text-sm text-[#e7c98f]">
                No meetings requested yet.
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}

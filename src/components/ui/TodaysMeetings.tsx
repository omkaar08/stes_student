"use client";

import React, { useEffect, useMemo, useState } from "react";
import { TodaysMeetingsProps } from "@/types";
import {
  Calendar,
  ChevronRight,
  Clock,
  ClipboardList,
  Link2,
  MapPin,
  Timer,
  User,
  Users,
  Video,
  Building2,
  X,
} from "lucide-react";

const TodaysMeetings: React.FC<TodaysMeetingsProps> = ({ data }) => {
  const [openMeetingId, setOpenMeetingId] = useState<string | null>(null);

  // Combine today's and upcoming meetings
  const allMeetings = useMemo(
    () => [...data.meetings, ...data.upcomingMeetings],
    [data.meetings, data.upcomingMeetings],
  );

  const selectedMeeting = useMemo(
    () => allMeetings.find((m) => m.id === openMeetingId) ?? null,
    [allMeetings, openMeetingId],
  );

  useEffect(() => {
    if (!openMeetingId) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMeetingId(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [openMeetingId]);

  const getMeetingIcon = (icon?: string) => {
    const common = { size: 18 };
    switch (icon) {
      case "faculty":
        return <Building2 {...common} style={{ color: '#0A6E8A' }} />;
      case "project":
        return <ClipboardList {...common} style={{ color: '#0A6E8A' }} />;
      case "online":
        return <Video {...common} style={{ color: '#0A6E8A' }} />;
      default:
        return <Users {...common} style={{ color: '#0A6E8A' }} />;
    }
  };

  const headerClass =
    selectedMeeting?.headerVariant === "blue" ? "bg-[#0A6E8A]" : "bg-[#0A6E8A]";

  const renderMeetingCard = (meeting: typeof data.meetings[0]) => (
    <button
      key={meeting.id}
      type="button"
      onClick={() => setOpenMeetingId(meeting.id)}
      className="group w-full text-left bg-white border border-gray-200 rounded-lg p-4 transition-all hover:shadow-sm"
      style={{ borderColor: meeting.id === openMeetingId ? '#0A6E8A' : undefined, borderWidth: meeting.id === openMeetingId ? '2px' : '1px' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-4 min-w-0">
          <div className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0">
            {getMeetingIcon(meeting.icon)}
          </div>

          <div className="min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-bold text-gray-900 text-sm truncate transition-colors" style={{ color: meeting.id === openMeetingId ? '#0A6E8A' : undefined }}>
                {meeting.title}
              </h3>
            </div>

            <div className="mt-2 space-y-1.5 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-gray-500" />
                <span>{meeting.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-gray-500" />
                <span className="truncate">{meeting.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={14} className="text-gray-500" />
                <span>{meeting.participants} participants</span>
              </div>
            </div>
          </div>
        </div>

        <ChevronRight size={18} className="text-gray-400 flex-shrink-0" />
      </div>
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Today's Meetings Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="heading-lg">Today&apos;s Meetings</h2>
            <p className="body-text">Scheduled for today</p>
          </div>
          <button className="bg-white border border-[#0A6E8A]/30 text-[#0A6E8A] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#0A6E8A]/5 transition-colors">
            {data.meetings.length} Meetings
          </button>
        </div>

        <div className="space-y-4">
          {data.meetings.map((meeting) => renderMeetingCard(meeting))}
        </div>
      </div>

      {/* Upcoming Meetings Section */}
      {data.upcomingMeetings.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="heading-lg">Upcoming Meetings</h2>
              <p className="body-text">Next scheduled meetings</p>
            </div>
            <button className="bg-white border border-[#0A6E8A]/30 text-[#0A6E8A] text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#0A6E8A]/5 transition-colors">
              {Math.min(data.upcomingMeetings.length, 3)} Meetings
            </button>
          </div>

          <div className="space-y-4">
            {data.upcomingMeetings.slice(0, 3).map((meeting) => renderMeetingCard(meeting))}
          </div>
        </div>
      )}

      {/* Meeting Details Modal */}
      {selectedMeeting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <button
            type="button"
            aria-label="Close meeting details"
            onClick={() => setOpenMeetingId(null)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <div className="relative w-[92%] max-w-3xl h-[85vh] max-h-[760px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            <div className="flex flex-col h-full">
              <div className={`${headerClass} px-8 py-6 flex-shrink-0`}>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setOpenMeetingId(null)}
                  className="absolute right-6 top-6 text-white/90 hover:text-white"
                >
                  <X size={20} />
                </button>

                <h3 className="text-2xl font-extrabold text-white truncate">
                  {selectedMeeting.title}
                </h3>
                <div className="mt-3 flex items-center gap-2 text-white/90 font-semibold">
                  <Calendar size={18} className="text-white/90" />
                  <span>{selectedMeeting.dateLabel}</span>
                </div>
              </div>

              <div className="bg-white px-8 py-7 flex-1 overflow-y-auto">
                <div className="grid grid-cols-2 gap-5">
                  <div className="bg-white border border-gray-200 rounded-2xl p-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Clock size={18} className="text-[#0A6E8A]" />
                      Time
                    </div>
                    <div className="mt-2 text-sm font-extrabold text-gray-900">
                      {selectedMeeting.time}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl p-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Timer size={18} className="text-[#0A6E8A]" />
                      Duration
                    </div>
                    <div className="mt-2 text-sm font-extrabold text-gray-900">
                      {selectedMeeting.duration}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl p-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <MapPin size={18} className="text-[#0A6E8A]" />
                      Location
                    </div>
                    <div className="mt-2 text-sm font-extrabold text-gray-900">
                      {selectedMeeting.location}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl p-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Users size={18} className="text-[#0A6E8A]" />
                      Participants
                    </div>
                    <div className="mt-2 text-sm font-extrabold text-gray-900">
                      {selectedMeeting.participants}
                    </div>
                  </div>
                </div>

                {selectedMeeting.meetingLink && (
                  <div className="mt-5 border-2 border-[#0A6E8A] rounded-2xl p-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                      <Link2 size={18} className="text-[#0A6E8A]" />
                      Meeting Link
                    </div>
                    <a
                      href={selectedMeeting.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 block text-[#0A6E8A] hover:underline overflow-hidden text-ellipsis whitespace-nowrap"
                      title={selectedMeeting.meetingLink}
                    >
                      {selectedMeeting.meetingLink}
                    </a>
                    <a
                      href={selectedMeeting.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 block w-full bg-[#0A6E8A] hover:bg-[#085a70] text-white font-bold text-center py-3.5 rounded-2xl transition-colors"
                    >
                      Join Meeting
                    </a>
                  </div>
                )}

                <div className="mt-5 bg-white border border-gray-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <User size={18} className="text-[#0A6E8A]" />
                    Organized by
                  </div>
                  <div className="mt-2 text-sm font-extrabold text-gray-900">
                    {selectedMeeting.organizedBy}
                  </div>
                </div>

                <div className="mt-7 flex items-center gap-2 text-gray-900 font-bold">
                  <ClipboardList size={18} className="text-[#0A6E8A]" />
                  Agenda
                </div>

                <div className="mt-4 space-y-4">
                  {selectedMeeting.agenda.map((item, idx) => (
                    <div
                      key={`${idx}-${item}`}
                      className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#0A6E8A] text-white font-extrabold flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="font-semibold text-gray-900">{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodaysMeetings;

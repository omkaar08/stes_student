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

  const selectedMeeting = useMemo(
    () => data.meetings.find((m) => m.id === openMeetingId) ?? null,
    [data.meetings, openMeetingId],
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
    const common = { size: 18, className: "text-blue-700" };
    switch (icon) {
      case "faculty":
        return <Building2 {...common} />;
      case "project":
        return <ClipboardList {...common} />;
      case "online":
        return <Video {...common} />;
      default:
        return <Users {...common} />;
    }
  };

  const headerClass =
    selectedMeeting?.headerVariant === "blue" ? "bg-blue-600" : "bg-[#1e3a8a]";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Today&apos;s Meetings
          </h2>
          <p className="text-sm text-gray-600">Scheduled for today</p>
        </div>
        <button className="bg-white border border-gray-200 text-gray-900 text-sm font-semibold px-4 py-2 rounded-xl">
          {data.total} Meetings
        </button>
      </div>

      <div className="space-y-4">
        {data.meetings.map((meeting) => (
          <button
            key={meeting.id}
            type="button"
            onClick={() => setOpenMeetingId(meeting.id)}
            className="group w-full text-left bg-white border-2 border-gray-200 rounded-2xl p-4 transition-all hover:border-blue-700 hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-4 min-w-0">
                <div className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center flex-shrink-0">
                  {getMeetingIcon(meeting.icon)}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-gray-900 text-sm truncate group-hover:text-blue-700 transition-colors">
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
        ))}
      </div>

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
                      <Clock size={18} className="text-blue-600" />
                      Time
                    </div>
                    <div className="mt-2 text-sm font-extrabold text-gray-900">
                      {selectedMeeting.time}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl p-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Timer size={18} className="text-blue-600" />
                      Duration
                    </div>
                    <div className="mt-2 text-sm font-extrabold text-gray-900">
                      {selectedMeeting.duration}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl p-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <MapPin size={18} className="text-blue-600" />
                      Location
                    </div>
                    <div className="mt-2 text-sm font-extrabold text-gray-900">
                      {selectedMeeting.location}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl p-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Users size={18} className="text-blue-600" />
                      Participants
                    </div>
                    <div className="mt-2 text-sm font-extrabold text-gray-900">
                      {selectedMeeting.participants}
                    </div>
                  </div>
                </div>

                {selectedMeeting.meetingLink && (
                  <div className="mt-5 border-2 border-blue-700 rounded-2xl p-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                      <Link2 size={18} className="text-blue-700" />
                      Meeting Link
                    </div>
                    <a
                      href={selectedMeeting.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 block text-blue-600 hover:underline overflow-hidden text-ellipsis whitespace-nowrap"
                      title={selectedMeeting.meetingLink}
                    >
                      {selectedMeeting.meetingLink}
                    </a>
                    <a
                      href={selectedMeeting.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 block w-full bg-[#1e3a8a] hover:bg-[#1a3276] text-white font-bold text-center py-3.5 rounded-2xl transition-colors"
                    >
                      Join Meeting
                    </a>
                  </div>
                )}

                <div className="mt-5 bg-white border border-gray-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <User size={18} className="text-blue-600" />
                    Organized by
                  </div>
                  <div className="mt-2 text-sm font-extrabold text-gray-900">
                    {selectedMeeting.organizedBy}
                  </div>
                </div>

                <div className="mt-7 flex items-center gap-2 text-gray-900 font-bold">
                  <ClipboardList size={18} className="text-blue-600" />
                  Agenda
                </div>

                <div className="mt-4 space-y-4">
                  {selectedMeeting.agenda.map((item, idx) => (
                    <div
                      key={`${idx}-${item}`}
                      className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center flex-shrink-0">
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

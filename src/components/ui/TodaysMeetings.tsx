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
        return <Building2 {...common} style={{ color: "#024698" }} />;
      case "project":
        return <ClipboardList {...common} style={{ color: "#024698" }} />;
      case "online":
        return <Video {...common} style={{ color: "#024698" }} />;
      default:
        return <Users {...common} style={{ color: "#024698" }} />;
    }
  };

  const headerClass =
    selectedMeeting?.headerVariant === "blue" ? "bg-[#026892]" : "bg-[#026892]";

  const renderMeetingCard = (meeting: (typeof data.meetings)[0]) => (
    <button
      key={meeting.id}
      type="button"
      onClick={() => setOpenMeetingId(meeting.id)}
      className="group w-full text-left bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 transition-all hover:bg-gray-100"
      style={{
        borderColor: meeting.id === openMeetingId ? "#026892" : undefined,
        borderWidth: meeting.id === openMeetingId ? "2px" : "1px",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5 min-w-0 flex-1">
          <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
            {getMeetingIcon(meeting.icon)}
          </div>

          <div className="min-w-0 flex-1">
            <h3
              className="font-medium text-gray-900 text-sm truncate transition-colors mb-1"
              style={{
                color: meeting.id === openMeetingId ? "#026892" : undefined,
              }}
            >
              {meeting.title}
            </h3>

            <div className="space-y-0.5 text-xs text-gray-600">
              <div className="flex items-center gap-1.5">
                <Clock size={12} className="text-gray-500 flex-shrink-0" />
                <span>{meeting.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={12} className="text-gray-500 flex-shrink-0" />
                <span className="truncate">{meeting.location}</span>
              </div>
            </div>
          </div>
        </div>

        <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
      </div>
    </button>
  );

  return (
    <>
      {/* Single Parent Card Container */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm h-[280px] flex flex-col">
        <div className="flex items-start justify-between mb-2.5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Upcoming Meetings</h2>
          </div>
          <button className="bg-white border border-gray-200 text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
            {data.meetings.length} Meetings
          </button>
        </div>

        {/* Meeting Items Container */}
        <div className="space-y-2 flex-1 overflow-y-auto">
          {data.meetings.map((meeting) => renderMeetingCard(meeting))}
        </div>
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

              <div className="bg-white px-6 py-6 flex-1 overflow-y-auto text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-200 rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Clock size={18} className="text-primary-500" />
                      Time
                    </div>
                    <div className="mt-2 text-sm font-extrabold text-gray-900">
                      {selectedMeeting.time}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Timer size={18} className="text-primary-500" />
                      Duration
                    </div>
                    <div className="mt-2 text-sm font-extrabold text-gray-900">
                      {selectedMeeting.duration}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <MapPin size={18} className="text-primary-500" />
                      Location
                    </div>
                    <div className="mt-2 text-sm font-extrabold text-gray-900">
                      {selectedMeeting.location}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Users size={18} className="text-primary-500" />
                      Participants
                    </div>
                    <div className="mt-2 text-sm font-extrabold text-gray-900">
                      {selectedMeeting.participants}
                    </div>
                  </div>
                </div>

                {selectedMeeting.meetingLink && (
                  <div className="mt-5 border-2 border-primary-500 rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                      <Link2 size={18} className="text-primary-500" />
                      Meeting Link
                    </div>
                    <a
                      href={selectedMeeting.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 block text-primary-500 hover:underline overflow-hidden text-ellipsis whitespace-nowrap"
                      title={selectedMeeting.meetingLink}
                    >
                      {selectedMeeting.meetingLink}
                    </a>
                    <a
                      href={selectedMeeting.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 block w-full bg-primary-500 hover:bg-primary-600 text-white font-bold text-center py-3 rounded-2xl transition-colors text-sm"
                    >
                      Join Meeting
                    </a>
                  </div>
                )}

                  <div className="mt-5 bg-white border border-gray-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <User size={18} className="text-primary-500" />
                    Organized by
                  </div>
                  <div className="mt-2 text-sm font-extrabold text-gray-900">
                    {selectedMeeting.organizedBy}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-gray-900 font-bold text-sm">
                  <ClipboardList size={18} className="text-primary-500" />
                  Agenda
                </div>

                <div className="mt-3 space-y-3">
                  {selectedMeeting.agenda.map((item, idx) => (
                    <div
                      key={`${idx}-${item}`}
                      className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary-500 text-white font-extrabold flex items-center justify-center flex-shrink-0">
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
    </>
  );
};

export default TodaysMeetings;



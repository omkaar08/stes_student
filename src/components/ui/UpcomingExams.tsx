"use client";

import React, { useEffect, useMemo, useState } from "react";
import { UpcomingExamsProps } from "@/types";
import {
  ChevronRight,
  Clock,
  ClipboardList,
  MapPin,
  Timer,
  X,
} from "lucide-react";

const UpcomingExams: React.FC<UpcomingExamsProps> = ({ data }) => {
  const [openExamId, setOpenExamId] = useState<string | null>(null);

  const selectedExam = useMemo(
    () => data.exams.find((e) => e.id === openExamId) ?? null,
    [data.exams, openExamId],
  );

  useEffect(() => {
    if (!openExamId) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenExamId(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [openExamId]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm h-[320px] flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Upcoming Exams</h2>
        </div>
        <button className="bg-white border border-gray-200 text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
          {data.total} Exams
        </button>
      </div>

      <div className="space-y-2 flex-1 overflow-y-auto">
        {data.exams.map((exam) => (
          <button
            key={exam.id}
            type="button"
            onClick={() => setOpenExamId(exam.id)}
            className="group w-full text-left bg-gray-50 border border-gray-200 rounded-lg px-3 py-3.5 flex items-center justify-between gap-3 transition-all hover:bg-gray-100"
            style={{ borderColor: exam.id === openExamId ? '#026892' : undefined, borderWidth: exam.id === openExamId ? '2px' : '1px' }}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Icon */}
              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                <ClipboardList size={18} style={{ color: '#026892' }} />
              </div>
              
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-medium text-sm truncate text-gray-900 transition-colors flex-1" style={{ color: exam.id === openExamId ? '#026892' : undefined }}>
                    {exam.title}
                  </h3>
                  <span className="text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#026892' }}>
                    {exam.courseCode}
                  </span>
                </div>
                {/* Additional Information */}
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Clock size={12} className="text-gray-500 flex-shrink-0" />
                  <span>{exam.time}</span>
                </div>
              </div>
            </div>

            <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
          </button>
        ))}
      </div>

      {/* Exam Details Modal */}
      {selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <button
            type="button"
            aria-label="Close exam details"
            onClick={() => setOpenExamId(null)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <div className="relative w-[92%] max-w-3xl rounded-xl overflow-hidden shadow-2xl border border-gray-200">
            {/* Header */}
            <div className="px-8 py-6 text-white" style={{ backgroundColor: '#026892' }}>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpenExamId(null)}
                className="absolute right-6 top-6 text-white/90 hover:text-white"
              >
                <X size={20} />
              </button>

              <h3 className="text-2xl font-extrabold">
                {selectedExam.title}
              </h3>
              <div className="mt-3 flex items-center gap-3">
                <span className="bg-white/15 text-white font-bold text-sm px-4 py-1.5 rounded-full">
                  {selectedExam.courseCode}
                </span>
                <span className="text-white/90 font-semibold text-sm">
                  {selectedExam.dateLabel}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="bg-white px-8 py-7">
              <div className="grid grid-cols-4 gap-5">
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Clock size={18} style={{ color: '#024698' }} />
                    Time
                  </div>
                  <div className="mt-2 text-sm font-extrabold text-gray-900">
                    {selectedExam.time}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <MapPin size={18} style={{ color: '#024698' }} />
                    Room
                  </div>
                  <div className="mt-2 text-sm font-extrabold text-gray-900">
                    {selectedExam.room}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Timer size={18} style={{ color: '#024698' }} />
                    Duration
                  </div>
                  <div className="mt-2 text-sm font-extrabold text-gray-900">
                    {selectedExam.duration}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <ClipboardList size={18} className="text-primary-500" />
                    Total Marks
                  </div>
                  <div className="mt-2 text-sm font-extrabold text-gray-900">
                    {selectedExam.totalMarks}
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <div className="text-sm font-bold text-gray-900 mb-3">
                  Topics Covered
                </div>
                <div className="flex flex-wrap gap-3">
                  {selectedExam.topicsCovered.map((topic) => (
                    <span
                      key={topic}
                      className="px-4 py-2 rounded-xl border border-primary-200 text-primary-500 font-semibold text-sm bg-primary-50 hover:bg-primary-100 transition-colors"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-7">
                <div className="text-sm font-bold text-gray-900 mb-3">
                  Instructions
                </div>
                <div className="border border-gray-200 rounded-2xl px-5 py-4 text-gray-900">
                  {selectedExam.instructions}
                </div>
              </div>

              <div className="mt-6">
                <div className="border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 font-semibold">
                  {selectedExam.enrolledStudents} students enrolled for this
                  exam
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingExams;



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
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Upcoming Exams</h2>
          <p className="text-sm text-gray-600">Scheduled examinations</p>
        </div>
        <button className="bg-white border border-gray-200 text-gray-900 text-sm font-semibold px-4 py-2 rounded-xl">
          {data.total} Exams
        </button>
      </div>

      <div className="space-y-4">
        {data.exams.map((exam) => (
          <button
            key={exam.id}
            type="button"
            onClick={() => setOpenExamId(exam.id)}
            className="group w-full text-left bg-white border-2 border-gray-200 rounded-2xl p-4 flex items-center justify-between gap-4 transition-all hover:border-blue-700 hover:shadow-sm"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-14 h-14 rounded-2xl border-2 border-gray-200 flex flex-col items-center justify-center flex-shrink-0">
                <div className="text-xl font-extrabold text-blue-700 leading-none">
                  {exam.day}
                </div>
                <div className="text-xs font-semibold text-gray-700 uppercase mt-1">
                  {exam.month}
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-sm truncate text-gray-900 group-hover:text-blue-700 transition-colors">
                    {exam.title}
                  </h3>
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {exam.courseCode}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700 mt-2">
                  <Clock size={14} className="text-gray-500" />
                  <span>{exam.time}</span>
                </div>
              </div>
            </div>

            <ChevronRight size={18} className="text-gray-400 flex-shrink-0" />
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

          <div className="relative w-[92%] max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            {/* Header */}
            <div className="bg-[#1e3a8a] px-8 py-6">
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpenExamId(null)}
                className="absolute right-6 top-6 text-white/90 hover:text-white"
              >
                <X size={20} />
              </button>

              <h3 className="text-2xl font-extrabold text-white">
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
                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Clock size={18} className="text-blue-600" />
                    Time
                  </div>
                  <div className="mt-2 text-sm font-extrabold text-gray-900">
                    {selectedExam.time}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <MapPin size={18} className="text-blue-600" />
                    Room
                  </div>
                  <div className="mt-2 text-sm font-extrabold text-gray-900">
                    {selectedExam.room}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Timer size={18} className="text-blue-600" />
                    Duration
                  </div>
                  <div className="mt-2 text-sm font-extrabold text-gray-900">
                    {selectedExam.duration}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <ClipboardList size={18} className="text-blue-600" />
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
                      className="px-4 py-2 rounded-xl border border-gray-200 text-blue-700 font-semibold text-sm bg-white"
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

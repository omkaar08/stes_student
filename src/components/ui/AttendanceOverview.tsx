"use client";

import React from "react";
import { CheckCircle2, XCircle, FileText } from "lucide-react";

type AttendanceOverviewProps = {
  present: number;
  absent: number;
  excused: number;
  totalSessions: number;
  overallRate: number;
  minimumRequired: number;
};

const BRAND_BLUE = "#026892";

const AttendanceOverview: React.FC<AttendanceOverviewProps> = ({
  present,
  absent,
  excused,
  totalSessions,
  overallRate,
  minimumRequired,
}) => {
  const progress = Math.max(0, Math.min(100, overallRate));
  const onTrack = overallRate >= minimumRequired;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900">Attendance Overview</h2>
      <p className="text-sm text-gray-500 mt-1">
        Your attendance summary across all courses
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-700 leading-tight">
              {present}
            </div>
            <div className="text-sm font-semibold text-emerald-700">
              Present
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-red-200 bg-red-50 p-4 flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-red-100 text-red-600 grid place-items-center">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-bold text-red-700 leading-tight">
              {absent}
            </div>
            <div className="text-sm font-semibold text-red-700">Absent</div>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 grid place-items-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-700 leading-tight">
              {excused}
            </div>
            <div className="text-sm font-semibold text-blue-700">
              Excused Absence
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-900">
            Overall Attendance Rate
          </div>
          <div className="text-sm font-bold text-[#026892]">
            {overallRate.toFixed(1)}%
          </div>
        </div>

        <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden mt-3">
          <div
            className="h-full rounded-full"
            style={{ width: `${progress}%`, backgroundColor: BRAND_BLUE }}
          />
        </div>

        <div className="mt-2 text-xs text-gray-600">
          Total sessions: <span className="font-semibold">{totalSessions}</span>
          <span className="mx-1">•</span>
          Minimum Required:{" "}
          <span className="font-semibold">{minimumRequired}%</span>
          <span className="mx-1">•</span>
          <span
            className={
              onTrack
                ? "text-emerald-600 font-semibold"
                : "text-red-600 font-semibold"
            }
          >
            {onTrack ? "You're on track!" : "Needs improvement"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceOverview;

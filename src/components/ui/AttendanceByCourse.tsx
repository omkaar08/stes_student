"use client";

import React from "react";

export type AttendanceByCourseItem = {
  courseCode: string;
  attendancePercent: number;
};

type AttendanceByCourseProps = {
  items: AttendanceByCourseItem[];
};

const clampPercent = (value: number) => Math.max(0, Math.min(100, value));

const AttendanceByCourse: React.FC<AttendanceByCourseProps> = ({ items }) => {
  const safeItems = items.map((item) => ({
    ...item,
    attendancePercent: clampPercent(item.attendancePercent),
  }));

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <h2 className="text-xl font-bold text-gray-900">Attendance Overview</h2>
      <p className="text-sm text-gray-500 mt-1">
        Course-wise attendance percentage
      </p>

      <div className="mt-4">
        <div className="grid grid-cols-[44px_1fr] gap-3">
          {/* Y Axis */}
          <div className="flex flex-col justify-between text-xs text-gray-500 h-44 pb-5">
            <div>100%</div>
            <div>75%</div>
            <div>50%</div>
            <div>25%</div>
            <div>0%</div>
          </div>

          {/* Chart */}
          <div className="min-w-0">
            <div className="relative h-44">
              {/* grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div key={idx} className="h-px bg-gray-100" />
                ))}
              </div>

              <div className="relative h-full flex items-end gap-3 px-1">
                {safeItems.map((item) => (
                  <div
                    key={item.courseCode}
                    className="flex-1 min-w-0 flex flex-col items-center gap-2"
                  >
                    <div className="text-xs font-semibold text-gray-700">
                      {item.attendancePercent.toFixed(0)}%
                    </div>
                    <div className="w-full h-32 flex items-end">
                      <div
                        className="w-full rounded-md bg-[#026892]/90"
                        style={{
                          height: `${(item.attendancePercent / 100) * 100}%`,
                        }}
                        aria-label={`${item.courseCode} attendance ${item.attendancePercent.toFixed(0)}%`}
                        role="img"
                      />
                    </div>
                    <div className="text-xs font-semibold text-gray-700 truncate w-full text-center">
                      {item.courseCode}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceByCourse;

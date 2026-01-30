"use client";

import React from "react";
import { CheckCircle } from "lucide-react";

export type AttendanceByCourseItem = {
  courseCode: string;
  attendancePercent: number;
};

type AttendanceByCourseProps = {
  items: AttendanceByCourseItem[];
};

const clampPercent = (value: number) => Math.max(0, Math.min(100, value));

const AttendanceByCourse: React.FC<AttendanceByCourseProps> = ({ items }) => {
  // Mock data with specified percentages
  const mockData = [
    { courseCode: "CS101", attendancePercent: 60 },
    { courseCode: "MATH202", attendancePercent: 70 },
    { courseCode: "ENG150", attendancePercent: 80 }, // Only one above 75%
    { courseCode: "PHY110", attendancePercent: 72 },
    { courseCode: "HIST130", attendancePercent: 50 }
  ];

  const safeItems = mockData.map((item) => ({
    ...item,
    attendancePercent: clampPercent(item.attendancePercent),
  }));

  const targetPercentage = 75;
  const exceededCount = safeItems.filter(item => item.attendancePercent > targetPercentage).length;
  const averageAttendance = safeItems.reduce((sum, item) => sum + item.attendancePercent, 0) / safeItems.length;

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm h-[400px] flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Attendance Overview</h2>
          <p className="text-sm text-gray-500 mt-1">Course-wise attendance percentage</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-700">Target Exceeded (75%)</span>
        </div>
      </div>

      {/* Chart container with background */}
      <div className="flex bg-gray-50 rounded-lg p-4">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between text-xs text-gray-500 pr-3 h-48">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>

        {/* Chart area */}
        <div className="flex-1 relative h-48">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[100, 75, 50, 25, 0].map((value) => (
              <div key={value} className="h-px bg-gray-200" />
            ))}
          </div>

          {/* Target line at 75% position */}
          <div className="absolute w-full top-1/4">
            <div className="flex items-center">
              <span className="text-xs font-medium text-green-600 mr-2 bg-gray-50 pr-1">Target 75%</span>
              <div className="flex-1 border-t-2 border-dashed border-green-400"></div>
            </div>
          </div>

          {/* Bars container */}
          <div className="absolute bottom-0 w-full flex items-end justify-center gap-6 h-full">
            {safeItems.map((item) => (
              <div key={item.courseCode} className="flex flex-col items-center h-full">
                {/* Bar with correct height calculation */}
                <div className="flex items-end h-full">
                  <div
                    className="w-12 bg-[#026892] rounded-t-md relative group cursor-pointer transition-colors hover:bg-[#024a73]"
                    style={{
                      height: `${(item.attendancePercent / 100) * 100}%`,
                      minHeight: item.attendancePercent > 0 ? '4px' : '0px'
                    }}
                  >
                    {/* Hover tooltip */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {item.attendancePercent}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course codes below chart */}
      <div className="flex justify-center gap-6 mt-2 ml-12">
        {safeItems.map((item) => (
          <div key={item.courseCode} className="w-12 text-center">
            <div className="text-xs font-medium text-gray-700">
              {item.courseCode}
            </div>
          </div>
        ))}
      </div>

      {/* Summary line */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-sm text-gray-600 text-center">
          Average attendance: <span className="font-semibold text-[#026892]">{averageAttendance.toFixed(1)}%</span> • {exceededCount} of {safeItems.length} courses above target
        </p>
      </div>
    </div>
  );
};

export default AttendanceByCourse;
"use client";

import React from "react";
import { UpcomingExamsProps } from "@/types";
import {
  Clock,
} from "lucide-react";

const UpcomingExams: React.FC<UpcomingExamsProps> = ({ data }) => (
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
        {data.exams.map((exam, index) => (
          <div
            key={exam.id}
            className="rounded-lg border p-3 border-gray-200 flex items-center gap-3"
            style={{
              backgroundColor:
                index % 2 === 0 ? "#E8F4F8" : "#F0F9FF",
            }}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Date Display */}
              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white border border-gray-200 flex flex-col items-center justify-center">
                <span className="text-[10px] font-semibold leading-none" style={{ color: '#026892' }}>
                  {exam.month}
                </span>
                <span className="text-[13px] font-bold leading-none mt-0.5" style={{ color: '#026892' }}>
                  {exam.day}
                </span>
              </div>
              
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-medium text-sm truncate text-gray-900 flex-1">
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
          </div>
        ))}
      </div>
    </div>
  );

export default UpcomingExams;



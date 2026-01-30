"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import type { StudentGrade } from "@/data/studentDashboard.mock";

type RecentGradesProps = {
  items: StudentGrade[];
};

const RecentGrades: React.FC<RecentGradesProps> = ({ items }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Grades</h2>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 px-4 py-4 rounded-xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="h-11 w-11 rounded-full bg-gray-100 text-gray-700 grid place-items-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-base font-semibold text-gray-900 truncate">
                {item.title}
              </div>
              <div className="text-sm text-gray-500 truncate">
                {item.course} <span className="mx-1">•</span> {item.postedText}
              </div>
            </div>

            <div className="flex-shrink-0">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-[#026892] text-white">
                {item.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentGrades;

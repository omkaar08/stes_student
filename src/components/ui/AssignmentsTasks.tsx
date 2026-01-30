"use client";

import React from "react";
import { Activity, FileText, AlertCircle } from "lucide-react";
import type { StudentAssignment } from "@/data/studentDashboard.mock";

type AssignmentsTasksProps = {
  items: StudentAssignment[];
};

const AssignmentsTasks: React.FC<AssignmentsTasksProps> = ({ items }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Assignments &amp; Tasks
      </h2>

      <div className="space-y-3">
        {items.map((item, index) => {
          const isWarning = item.tone === "warning";
          const bg = isWarning
            ? "bg-[#FEF3E7] border-orange-200"
            : "bg-[#EFF6FF] border-blue-200";
          const iconWrap = isWarning
            ? "bg-[#FDE7D2] text-orange-700"
            : "bg-[#DBEAFE] text-[#026892]";
          const Icon = isWarning
            ? AlertCircle
            : index === 0
              ? Activity
              : FileText;

          const titleClass = isWarning ? "text-orange-800" : "text-[#0B4D8A]";

          const metaClass = isWarning ? "text-orange-700" : "text-[#026892]";

          return (
            <div
              key={item.id}
              className={`rounded-xl border px-4 py-4 flex items-center gap-4 shadow-sm ${bg}`}
            >
              <div
                className={`h-11 w-11 rounded-full grid place-items-center ${iconWrap}`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div className="min-w-0 flex-1">
                <div
                  className={`text-base font-semibold truncate ${titleClass}`}
                >
                  {item.title}
                </div>
                <div className={`text-sm truncate ${metaClass}`}>
                  {item.course} <span className="text-gray-500">•</span>{" "}
                  {item.dueText}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssignmentsTasks;

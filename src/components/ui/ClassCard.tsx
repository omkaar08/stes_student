"use client";

import React from "react";
import Link from "next/link";
import { ClassCardProps, ClassStatus } from "@/types";

const ClassCard: React.FC<ClassCardProps> = ({ session }) => {
  const getActionButtonStyle = (status: ClassStatus) => {
    if (status === "ongoing") {
      return "bg-[#026892] text-white border-transparent hover:opacity-95";
    }

    if (status === "completed") {
      return "bg-white text-gray-700 border-gray-300 hover:bg-gray-50";
    }

    return "bg-white text-gray-700 border-gray-300 hover:bg-gray-50";
  };

  const getActionLabel = (status: ClassStatus) => {
    if (status === "completed") return "View";
    if (status === "ongoing") return "Next";
    return "Later";
  };

  const isNext = session.status === "ongoing";

  return (
    <div
      className={`rounded-lg border p-3 transition-all duration-200 ${
        isNext ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div
            className={`text-sm font-medium truncate ${
              isNext ? "text-[#026892]" : "text-gray-900"
            }`}
          >
            {session.name}
          </div>
          <div className={`text-xs truncate mt-1 ${isNext ? "text-[#026892]" : "text-gray-600"}`}>
            {session.location} <span className="mx-1">•</span> {session.time}
          </div>
        </div>

        <Link href="/teaching/timetable" className="flex-shrink-0">
          <button
            type="button"
            className={`
              inline-flex items-center justify-center
              px-3.5 py-1.5 rounded-lg font-semibold text-xs
              border transition-all duration-200 active:scale-95 whitespace-nowrap
              ${getActionButtonStyle(session.status)}
            `}
          >
            {getActionLabel(session.status)}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ClassCard;



"use client";

import React from "react";
import Link from "next/link";
import { ClassCardProps, ClassStatus } from "@/types";

const ClassCard: React.FC<ClassCardProps> = ({ session }) => {
  const getActionButtonStyle = (status: ClassStatus) => {
    if (status === "ongoing") {
      return "bg-[#0A6E8A] text-white border-transparent hover:opacity-95";
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
      className={`rounded-2xl border p-4 transition-shadow duration-200 ${
        isNext ? "bg-[#DDEBFF] border-[#BBD7FF]" : "bg-white border-gray-200"
      } hover:shadow-sm`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div
            className={`font-semibold truncate ${isNext ? "text-blue-800" : "text-gray-900"}`}
          >
            {session.name}
          </div>
          <div className="text-sm text-gray-700 truncate">
            {session.location} <span className="mx-1">•</span> {session.time}
          </div>
        </div>

        <Link href="/teaching/timetable" className="flex-shrink-0">
          <button
            type="button"
            className={`
              inline-flex items-center justify-center
              px-4 py-1.5 rounded-full font-semibold text-sm
              border transition-all duration-200 active:scale-95
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

"use client";

import React from "react";
import { useAcademicContext } from "@/contexts/AcademicContext";

interface WelcomeSectionProps {
  userName: string;
  employeeId?: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  userName,
  employeeId,
}) => {
  const { academicYear, semester } = useAcademicContext();

  // Get current date dynamically
  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full bg-gradient-to-r from-slate-50 via-blue-50/30 to-slate-50 backdrop-blur-sm">
      <div className="px-6 py-4 sm:py-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
          <span className="text-gray-900">Hello,</span>{" "}
          <span className="text-gray-900">{userName}</span>
        </h1>

        <p className="text-base sm:text-lg text-gray-600 font-medium mb-0 leading-relaxed">
          Inspire minds, shape futures, and empower the next generation of
          leaders
        </p>
      </div>
    </div>
  );
};

export default WelcomeSection;

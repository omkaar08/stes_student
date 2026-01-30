"use client";

import React from "react";
import { useAcademicContext } from "@/contexts/AcademicContext";

interface WelcomeSectionProps {
  userName: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ userName }) => {
  useAcademicContext();

  return (
    <div className="w-full">
      <div className="px-4 py-3 pt-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1 leading-tight text-gray-900">
          Welcome back, {userName}!
        </h1>

        <p className="text-sm text-gray-500 font-normal mb-0 leading-relaxed max-w-4xl">
          Here&apos;s what&apos;s happening with your academic journey today.
        </p>
      </div>
    </div>
  );
};

export default WelcomeSection;

'use client';

import React from 'react';
import { useAcademicContext } from '@/contexts/AcademicContext';

interface WelcomeSectionProps {
  userName: string;
  employeeId?: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ userName, employeeId }) => {
  const { academicYear, semester } = useAcademicContext();

  // Get current date dynamically
  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="px-6 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Hello, {userName} 🎓
        </h1>
        
        <p className="text-base sm:text-lg text-gray-600 mb-4">
          Inspire minds, shape futures, and empower the next generation of leaders
        </p>

        <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base text-gray-700">
          <span className="font-medium">{semester} Semester {academicYear}</span>
          {employeeId && (
            <>
              <span className="text-gray-400">•</span>
              <span className="font-medium">Employee ID: {employeeId}</span>
            </>
          )}
          <span className="text-gray-400 hidden sm:inline">•</span>
          <span className="w-full sm:w-auto font-medium">{getCurrentDate()}</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;

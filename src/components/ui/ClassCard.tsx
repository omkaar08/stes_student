'use client';

import React, { useState } from 'react';
import { ClassCardProps, ClassStatus } from '@/types';

const ClassCard: React.FC<ClassCardProps> = ({ session }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const getStatusStyles = (status: ClassStatus) => {
    const styles = {
      completed: 'bg-orange-100 text-orange-700',
      ongoing: 'bg-blue-100 text-blue-700',
      upcoming: 'bg-gray-100 text-gray-700',
    };
    return styles[status];
  };

  const getStatusLabel = (status: ClassStatus) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        bg-white rounded-lg p-6 cursor-pointer transition-all duration-200
        border-2
        ${isHovered || isSelected 
          ? 'border-blue-900 shadow-lg' 
          : 'border-gray-200 shadow-sm hover:shadow-md hover:border-blue-100'}
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <span className={`
          px-3 py-1 rounded-full text-xs font-semibold
          ${getStatusStyles(session.status)}
          flex items-center gap-1
        `}>
          <span className="inline-block w-2 h-2 rounded-full bg-current"></span>
          {getStatusLabel(session.status)}
        </span>
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>

      <h3 className="text-base font-bold text-gray-900 mb-1">{session.name}</h3>
      <p className="text-gray-500 text-xs mb-4">{session.code}</p>

      <div className="space-y-2 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{session.time}</span>
        </div>

        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{session.location}</span>
        </div>

        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>{session.studentCount} students</span>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;

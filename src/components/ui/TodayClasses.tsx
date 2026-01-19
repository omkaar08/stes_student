import React from 'react';
import { TodayClassesProps } from '@/types';
import ClassCard from '@/components/ui/ClassCard';

const TodayClasses: React.FC<TodayClassesProps> = ({ data }) => {
  return (
    <div className="mt-10 bg-white border border-gray-200 rounded-lg p-8">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Today's Classes</h2>
          <p className="text-gray-600 text-xs mt-1">{data.date}</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-colors">
          {data.totalClasses} Classes
        </button>
      </div>

      {/* 4 Cards in One Row */}
      <div className="grid grid-cols-4 gap-6">
        {data.classes.map((session) => (
          <ClassCard key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
};

export default TodayClasses;

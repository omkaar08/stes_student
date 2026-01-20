import React from 'react';
import { TodayClassesProps } from '@/types';
import ClassCard from '@/components/ui/ClassCard';

const TodayClasses: React.FC<TodayClassesProps> = ({ data }) => {
  return (
    <div className="mt-10 bg-white border border-gray-200 rounded-xl p-6">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="heading-lg">Today's Classes</h2>
          <p className="muted-text mt-1">{data.date}</p>
        </div>
        <button style={{ backgroundColor: '#0A6E8A' }} className="hover:opacity-90 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-all">
          {data.totalClasses} Classes
        </button>
      </div>

      {/* Responsive equal-width cards */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 w-full">
        {data.classes.map((session) => (
          <ClassCard key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
};

export default TodayClasses;

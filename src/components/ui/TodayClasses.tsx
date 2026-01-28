import React from "react";
import { TodayClassesProps } from "@/types";
import ClassCard from "@/components/ui/ClassCard";

const TodayClasses: React.FC<TodayClassesProps> = ({ data }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 h-[320px] flex flex-col">
      <h2 className="text-lg font-bold text-gray-900 mb-3">Today's Schedule</h2>

      {/* Content */}
      {data.totalClasses === 0 ? (
        <div className="flex-1 flex items-center justify-center text-center">
          <div>
            <p className="text-gray-500 text-sm">No classes scheduled today</p>
            <p className="text-gray-400 text-xs mt-1">Enjoy your day!</p>
          </div>
        </div>
      ) : (
        <div className="space-y-2 flex-1 overflow-y-auto">
          {data.classes.map((session) => (
            <ClassCard key={session.id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodayClasses;



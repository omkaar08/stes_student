"use client";

import React, { useState } from "react";
import { RecentActivityProps, ActivityItem } from "@/types";
import {
  FileText,
  CheckSquare,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  X,
} from "lucide-react";

const RecentActivity: React.FC<RecentActivityProps> = ({ data }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(
    null,
  );

  const getActivityIcon = (type: string) => {
    const iconProps = { size: 18, className: "text-primary-500" };
    switch (type) {
      case "submission":
        return <FileText {...iconProps} className="text-blue-600" />;
      case "attendance":
        return <CheckSquare {...iconProps} className="text-blue-600" />;
      case "message":
        return <MessageSquare {...iconProps} className="text-orange-600" />;
      case "deadline":
        return <AlertCircle {...iconProps} className="text-orange-600" />;
      case "grading":
        return <CheckCircle2 {...iconProps} className="text-green-600" />;
      default:
        return <FileText {...iconProps} />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "submission":
        return "bg-blue-50";
      case "attendance":
        return "bg-blue-50";
      case "message":
        return "bg-orange-50";
      case "deadline":
        return "bg-orange-50";
      case "grading":
        return "bg-green-50";
      default:
        return "bg-gray-50";
    }
  };

  const displayedActivities = data.activities.slice(0, 3);

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm h-[280px] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-2.5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
          </div>
          <button
            onClick={() => alert("View All Activities")}
            className="bg-white border border-gray-200 text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View All
          </button>
        </div>

        {/* Activity List */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hide">
            {displayedActivities.map((activity) => (
              <button
                key={activity.id}
                type="button"
                onClick={() => setSelectedActivity(activity)}
                onMouseEnter={() => setHoveredId(activity.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`w-full text-left border border-gray-200 rounded-lg p-3 transition-all group text-sm ${getActivityColor(activity.type)} ${
                  hoveredId === activity.id
                    ? "shadow-md"
                    : "hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getActivityIcon(activity.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-primary-500">
                      {activity.title}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs">
                      <span className="text-gray-600 flex-1 min-w-0 truncate">
                        {activity.description}
                      </span>
                      <span className="text-gray-400">-</span>
                      <span className="text-gray-500 whitespace-nowrap">
                        {activity.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Details Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <button
            type="button"
            onClick={() => setSelectedActivity(null)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <div className="relative w-[92%] max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  {getActivityIcon(selectedActivity.type)}
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {selectedActivity.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedActivity(null)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <div className="text-xs font-semibold text-gray-600 mb-2">
                    Activity Type
                  </div>
                  <div className="text-lg font-bold text-gray-900 capitalize">
                    {selectedActivity.type}
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <div className="text-xs font-semibold text-gray-600 mb-2">
                    Time
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {selectedActivity.timestamp}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <div className="text-xs font-semibold text-gray-600 mb-3">
                  Details
                </div>
                <div className="text-sm text-gray-900 leading-relaxed">
                  {selectedActivity.description}
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedActivity(null)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert(`Action taken on: ${selectedActivity.title}`);
                    setSelectedActivity(null);
                  }}
                  className="flex-1 px-4 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Take Action
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecentActivity;



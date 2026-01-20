'use client';

import React, { useState } from 'react';
import { RecentActivityProps, ActivityItem } from '@/types';
import { FileText, CheckSquare, MessageSquare, AlertCircle, CheckCircle2, X } from 'lucide-react';

const RecentActivity: React.FC<RecentActivityProps> = ({ data }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);

  const getActivityIcon = (type: string) => {
    const iconProps = { size: 18, className: 'text-[#0A6E8A]' };
    switch (type) {
      case 'submission':
        return <FileText {...iconProps} className="text-green-600" />;
      case 'attendance':
        return <CheckSquare {...iconProps} className="text-[#0A6E8A]" />;
      case 'message':
        return <MessageSquare {...iconProps} className="text-purple-600" />;
      case 'deadline':
        return <AlertCircle {...iconProps} className="text-orange-600" />;
      case 'grading':
        return <CheckCircle2 {...iconProps} className="text-green-600" />;
      default:
        return <FileText {...iconProps} />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'submission':
        return 'bg-green-50';
      case 'attendance':
        return 'bg-[#0A6E8A]/10';
      case 'message':
        return 'bg-purple-50';
      case 'deadline':
        return 'bg-orange-50';
      case 'grading':
        return 'bg-green-50';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="heading-lg">Recent Activity</h2>
            <p className="body-text">Latest updates and notifications</p>
          </div>
          <button 
            onClick={() => alert('View All Activities')}
            className="font-semibold text-sm transition-colors hover:opacity-90"
            style={{ color: '#0A6E8A' }}
          >
            View All
          </button>
        </div>

        {/* Activity List */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-2">
            {data.activities.map((activity) => (
              <button
                key={activity.id}
                type="button"
                onClick={() => setSelectedActivity(activity)}
                onMouseEnter={() => setHoveredId(activity.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`w-full text-left border border-gray-200 rounded-lg p-3 transition-all group ${
                  hoveredId === activity.id
                    ? `${getActivityColor(activity.type)} border-gray-300 shadow-sm`
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getActivityIcon(activity.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 transition-colors" style={{ color: hoveredId === activity.id ? '#0A6E8A' : undefined }}>
                      {activity.title}
                    </div>
                    <div className="text-xs text-gray-600 line-clamp-2 mt-1">
                      {activity.description}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {activity.timestamp}
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
            <div className="bg-gradient-to-r from-[#0A6E8A] to-[#0a5d75] px-8 py-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  {getActivityIcon(selectedActivity.type)}
                </div>
                <h2 className="text-2xl font-bold text-white">{selectedActivity.title}</h2>
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
                  <div className="text-xs font-semibold text-gray-600 mb-2">Activity Type</div>
                  <div className="text-lg font-bold text-gray-900 capitalize">{selectedActivity.type}</div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <div className="text-xs font-semibold text-gray-600 mb-2">Time</div>
                  <div className="text-lg font-bold text-gray-900">{selectedActivity.timestamp}</div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <div className="text-xs font-semibold text-gray-600 mb-3">Details</div>
                <div className="text-sm text-gray-900 leading-relaxed">{selectedActivity.description}</div>
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
                  className="flex-1 px-4 py-2.5 bg-[#0A6E8A] hover:bg-[#085a70] text-white font-semibold rounded-lg transition-colors"
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

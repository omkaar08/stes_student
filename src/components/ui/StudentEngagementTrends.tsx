'use client';

import React, { useState } from 'react';
import { StudentEngagementTrendsProps } from '@/types/engagement';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

/**
 * StudentEngagementTrends Component - REDESIGNED
 * 
 * Premium vertical bar chart featuring:
 * - Tall, visually strong bars
 * - Blue-only color palette
 * - Smooth animations
 * - Tight spacing between bars
 * - Interactive hover tooltips
 * - Backend-ready structure
 */
const StudentEngagementTrends: React.FC<StudentEngagementTrendsProps> = ({ data }) => {
  const [view, setView] = useState<'weekly' | 'monthly'>('weekly');

  // Get current data based on view
  const currentData = view === 'weekly' ? data.weekly : data.monthly;

  // Custom tooltip for hover
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-semibold">
          {payload[0].value}%
        </div>
      );
    }
    return null;
  };

  // Smooth transition on view change
  const handleViewChange = (newView: 'weekly' | 'monthly') => {
    setView(newView);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 w-full">
      {/* Header with Title and Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-gray-900">Student Engagement Trends</h2>
          <div className="flex items-center gap-1.5 bg-blue-50 px-2 py-1 rounded-md">
            <TrendingUp size={16} className="text-blue-700" />
            <span className="text-sm font-semibold text-blue-800">+{currentData.growth}%</span>
          </div>
        </div>

        {/* Weekly / Monthly Toggle */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => handleViewChange('weekly')}
            className={`px-4 py-1.5 rounded-md font-semibold text-sm transition-all duration-300 ${
              view === 'weekly'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            WEEKLY
          </button>
          <button
            onClick={() => handleViewChange('monthly')}
            className={`px-4 py-1.5 rounded-md font-semibold text-sm transition-all duration-300 ${
              view === 'monthly'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            MONTHLY
          </button>
        </div>
      </div>

      {/* Metrics Row - Soft Blue Palette */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Average */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">Average</p>
          <p className="text-2xl font-bold text-blue-900">{currentData.average}%</p>
        </div>

        {/* Peak */}
        <div className="bg-blue-100 rounded-lg p-4 border border-blue-200">
          <p className="text-xs font-semibold text-blue-800 uppercase tracking-wide mb-2">Peak</p>
          <p className="text-2xl font-bold text-blue-950">{currentData.peak}%</p>
        </div>

        {/* Growth */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">Growth</p>
          <p className="text-2xl font-bold text-blue-800">+{currentData.growth}%</p>
        </div>
      </div>

      {/* Vertical Bar Chart - SOFT BLUE PALETTE */}
      <div className="bg-white rounded-lg p-4 border border-gray-100" style={{ height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={currentData.chartData}
            margin={{ top: 20, right: 20, left: 10, bottom: 30 }}
          >
            {/* Clean Grid - Very Light */}
            <CartesianGrid strokeDasharray="0" stroke="#e0e7ff" vertical={false} />

            {/* X-Axis */}
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 600 }}
            />

            {/* Y-Axis */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              ticks={[0, 25, 50, 75, 100]}
              domain={[0, 100]}
              label={{ value: '% Engagement', angle: -90, position: 'insideLeft' }}
            />

            {/* Custom Tooltip */}
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
              wrapperStyle={{ outline: 'none' }}
            />

            {/* Bars - SOFT MUTED BLUE */}
            <Bar
              dataKey="engagement"
              fill="#7c9ed4"
              radius={[8, 8, 0, 0]}
              animationDuration={300}
              animationEasing="ease-out"
              onMouseEnter={(state) => {
                // Hover effect via bar opacity
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Animation on view change */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .recharts-bar-rectangles rect {
          transition: all 0.2s ease-out;
        }
        
        .recharts-bar-rectangles rect:hover {
          fill: #5a7eb8 !important;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.08));
        }
      `}</style>
    </div>
  );
};

export default StudentEngagementTrends;

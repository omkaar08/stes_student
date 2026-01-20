'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PerformanceChartProps } from '@/types';

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-3.5 text-xs animate-in fade-in duration-200">
          <div className="font-semibold text-gray-900 mb-2.5 text-sm">{label}</div>
          <div className="space-y-2">
            {payload.reverse().map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: entry.stroke }}
                  ></div>
                  <span className="text-gray-600 capitalize text-xs">{entry.name}:</span>
                </div>
                <span className="font-bold text-gray-900 text-xs">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="heading-lg mb-1 text-gray-900">{data.title}</h2>
          <p className="text-xs text-gray-500 mt-1">{data.subtitle}</p>
        </div>
        <div className="flex items-center gap-5 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#0A6E8A' }}></div>
            <span className="text-gray-600 font-medium">Attendance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#14B8A6' }}></div>
            <span className="text-gray-600 font-medium">Engagement</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#10B981' }}></div>
            <span className="text-gray-600 font-medium">Assignments</span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="w-full" style={{ height: '340px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data.data}
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          >
            {/* Gradient Definitions */}
            <defs>
              {/* Deep Navy Blue - Attendance */}
              <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e3a8a" stopOpacity={0.4} />
                <stop offset="50%" stopColor="#1e3a8a" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#1e3a8a" stopOpacity={0.05} />
              </linearGradient>
              {/* Soft Blue - Engagement */}
              <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.03} />
              </linearGradient>
              {/* Teal - Assignments */}
              <linearGradient id="colorAssignments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.35} />
                <stop offset="50%" stopColor="#14b8a6" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity={0.03} />
              </linearGradient>
            </defs>

            {/* Clean horizontal grid lines only */}
            <CartesianGrid 
              strokeDasharray="0" 
              stroke="#e5e7eb" 
              vertical={false}
              horizontalPoints={[0, 25, 50, 75, 100]}
            />

            {/* X-Axis: Mon to Sun evenly spaced */}
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 13, fill: '#6b7280', fontWeight: 500 }}
              dy={12}
              interval={0}
            />

            {/* Y-Axis: 0-100 range */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 500 }}
              ticks={[0, 25, 50, 75, 100]}
              domain={[0, 100]}
              dx={-5}
            />

            {/* Smooth tooltip with cursor */}
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ 
                stroke: '#cbd5e1', 
                strokeWidth: 1.5, 
                strokeDasharray: '5 5' 
              }} 
              animationDuration={200}
              animationEasing="ease-out"
            />

            {/* Area Charts - Layered from bottom to top */}
            
            {/* Teal - Assignments (bottom layer) */}
            <Area
              type="monotone"
              dataKey="assignments"
              stroke="#14b8a6"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorAssignments)"
              dot={false}
              activeDot={{ 
                r: 5, 
                fill: '#14b8a6', 
                stroke: '#fff', 
                strokeWidth: 2.5 
              }}
              animationDuration={1000}
              animationEasing="ease-in-out"
            />

            {/* Soft Blue - Engagement (middle layer) */}
            <Area
              type="monotone"
              dataKey="engagement"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorEngagement)"
              dot={false}
              activeDot={{ 
                r: 5, 
                fill: '#3b82f6', 
                stroke: '#fff', 
                strokeWidth: 2.5 
              }}
              animationDuration={1000}
              animationEasing="ease-in-out"
            />

            {/* Deep Navy - Attendance (top layer) */}
            <Area
              type="monotone"
              dataKey="attendance"
              stroke="#1e3a8a"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorAttendance)"
              dot={false}
              activeDot={{ 
                r: 5, 
                fill: '#1e3a8a', 
                stroke: '#fff', 
                strokeWidth: 2.5 
              }}
              animationDuration={1000}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;

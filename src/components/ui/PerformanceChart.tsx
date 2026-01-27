"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PerformanceChartProps } from "@/types";

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-3.5 text-xs animate-in fade-in duration-200">
          <div className="font-semibold text-gray-900 mb-2.5 text-sm">
            {label}
          </div>
          <div className="space-y-2">
            {[...payload].reverse().map((entry: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between gap-6"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: entry.stroke }}
                  ></div>
                  <span className="text-gray-600 capitalize text-xs">
                    {entry.name}:
                  </span>
                </div>
                <span className="font-bold text-gray-900 text-xs">
                  {entry.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full flex flex-col p-4">
      {/* Header Section */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900 leading-tight">
            {data.title}
          </h2>
          <p className="text-xs text-gray-500 mt-1">{data.subtitle}</p>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "#1e3a8a" }}
            ></div>
            <span className="text-gray-600 font-medium">Attendance</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "#3b82f6" }}
            ></div>
            <span className="text-gray-600 font-medium">Engagement</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "#14b8a6" }}
            ></div>
            <span className="text-gray-600 font-medium">Assignments</span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="w-full flex-1 min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data.data}
            margin={{ top: 8, right: 18, left: 0, bottom: 0 }}
          >
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
              tick={{ fontSize: 12, fill: "#6b7280", fontWeight: 500 }}
              dy={10}
              interval={0}
            />

            {/* Y-Axis: 0-100 range */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9ca3af", fontWeight: 500 }}
              ticks={[0, 25, 50, 75, 100]}
              domain={[0, 100]}
              dx={-5}
            />

            {/* Smooth tooltip with cursor */}
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#cbd5e1",
                strokeWidth: 1.5,
                strokeDasharray: "5 5",
              }}
              animationDuration={200}
              animationEasing="ease-out"
            />

            {/* Lines */}
            <Line
              type="monotone"
              dataKey="assignments"
              stroke="#14b8a6"
              strokeWidth={2.75}
              dot={false}
              activeDot={{
                r: 5,
                fill: "#14b8a6",
                stroke: "#fff",
                strokeWidth: 2.5,
              }}
              animationDuration={900}
              animationEasing="ease-in-out"
            />
            <Line
              type="monotone"
              dataKey="engagement"
              stroke="#3b82f6"
              strokeWidth={2.75}
              dot={false}
              activeDot={{
                r: 5,
                fill: "#3b82f6",
                stroke: "#fff",
                strokeWidth: 2.5,
              }}
              animationDuration={900}
              animationEasing="ease-in-out"
            />
            <Line
              type="monotone"
              dataKey="attendance"
              stroke="#1e3a8a"
              strokeWidth={2.75}
              dot={false}
              activeDot={{
                r: 5,
                fill: "#1e3a8a",
                stroke: "#fff",
                strokeWidth: 2.5,
              }}
              animationDuration={900}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;

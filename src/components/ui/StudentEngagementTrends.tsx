"use client";

import React, { useState } from "react";
import { StudentEngagementTrendsProps } from "@/types/engagement";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";

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
const StudentEngagementTrends: React.FC<StudentEngagementTrendsProps> = ({
  data,
}) => {
  const [view, setView] = useState<"weekly" | "monthly">("weekly");

  // Get current data based on view
  const currentData = view === "weekly" ? data.weekly : data.monthly;

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
  const handleViewChange = (newView: "weekly" | "monthly") => {
    setView(newView);
  };

  return (
    <div className="h-full flex flex-col p-4">
      {/* Header with Title and Toggle */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-gray-900">
            Student Engagement Trends
          </h2>
          <div
            className="flex items-center gap-1.5 px-2 py-1 rounded-md"
            style={{ backgroundColor: "#F0FDFA" }}
          >
            <TrendingUp size={16} style={{ color: "#0A6E8A" }} />
            <span className="label-text" style={{ color: "#0A6E8A" }}>
              +{currentData.growth}%
            </span>
          </div>
        </div>

        {/* Weekly / Monthly Toggle */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => handleViewChange("weekly")}
            className={`px-3 py-1 rounded-md font-semibold text-xs transition-all duration-300 ${
              view === "weekly"
                ? "text-white shadow-md"
                : "bg-transparent text-gray-600 hover:text-gray-900"
            }`}
            style={view === "weekly" ? { backgroundColor: "#0A6E8A" } : {}}
          >
            WEEKLY
          </button>
          <button
            onClick={() => handleViewChange("monthly")}
            className={`px-3 py-1 rounded-md font-semibold text-xs transition-all duration-300 ${
              view === "monthly"
                ? "text-white shadow-md"
                : "bg-transparent text-gray-600 hover:text-gray-900"
            }`}
            style={view === "monthly" ? { backgroundColor: "#0A6E8A" } : {}}
          >
            MONTHLY
          </button>
        </div>
      </div>

      {/* Vertical Bar Chart - SOFT BLUE PALETTE */}
      <div className="w-full flex-1 min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={currentData.chartData}
            margin={{ top: 8, right: 18, left: 0, bottom: 0 }}
          >
            {/* Clean Grid - Very Light */}
            <CartesianGrid
              strokeDasharray="0"
              stroke="#e0e7ff"
              vertical={false}
            />

            {/* X-Axis */}
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280", fontWeight: 600 }}
            />

            {/* Y-Axis */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              ticks={[0, 25, 50, 75, 100]}
              domain={[0, 100]}
              label={{
                value: "% Engagement",
                angle: -90,
                position: "insideLeft",
              }}
            />

            {/* Custom Tooltip */}
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
              wrapperStyle={{ outline: "none" }}
            />

            {/* Bars - TEAL */}
            <Bar
              dataKey="engagement"
              fill="#0A6E8A"
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

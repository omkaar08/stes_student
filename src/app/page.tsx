"use client";

import { useMemo, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import StatCard from "@/components/ui/StatCard";
import TodayClasses from "@/components/ui/TodayClasses";
import QuickActions from "@/components/ui/QuickActions";
import PerformanceChart from "@/components/ui/PerformanceChart";
import UpcomingExams from "@/components/ui/UpcomingExams";
import TodaysMeetings from "@/components/ui/TodaysMeetings";
import RecentActivity from "@/components/ui/RecentActivity";
import WelcomeSection from "@/components/ui/WelcomeSection";
import ModuleSelector from "@/components/ui/ModuleSelector";
import {
  getDashboardData,
  currentUser,
  getTimetableSessions,
  modulesList,
  modulePerformanceData,
  moduleEngagementData,
  moduleStatsData,
} from "@/data/dummyData";
import { useAcademicContext } from "@/contexts/AcademicContext";
import {
  getTodaySessions,
  convertSessionToClassCard,
  getFormattedTodayDate,
  type TimetableSession,
} from "@/utils/timetableSync";
import { type ClassSession } from "@/types";

export default function HomePage() {
  const { academicYear, semester } = useAcademicContext();
  const [selectedModule, setSelectedModule] = useState("advanced-math");

  const {
    dashboardStats,
    alertsData,
    upcomingExamsData,
    todaysMeetingsData,
    recentActivityData,
  } = useMemo(
    () => getDashboardData(academicYear, semester),
    [academicYear, semester],
  );

  // Get module-specific performance and engagement data
  const performanceChartData = useMemo(
    () => modulePerformanceData[selectedModule],
    [selectedModule],
  );

  const engagementTrendsData = useMemo(
    () => moduleEngagementData[selectedModule],
    [selectedModule],
  );

  // Update Active Courses to match total modules
  const updatedStats = useMemo(() => {
    const moduleStats = moduleStatsData[selectedModule];
    return dashboardStats.map((stat) => {
      if (stat.id === "active-courses") {
        return {
          ...stat,
          value: modulesList.length,
        };
      }
      if (stat.id === "total-students") {
        return {
          ...stat,
          value: moduleStats.students,
        };
      }
      if (stat.id === "pending-tasks") {
        return {
          ...stat,
          value: moduleStats.pendingTasks,
        };
      }
      if (stat.id === "avg-performance") {
        return {
          ...stat,
          value: `${moduleStats.avgPerformance}%`,
        };
      }
      return stat;
    });
  }, [dashboardStats, selectedModule]);

  // Sync today's schedule with timetable data
  const todayClassesData = useMemo(() => {
    const allTimetableSessions = getTimetableSessions();
    const todaySessions = getTodaySessions(allTimetableSessions);

    const classes: ClassSession[] = todaySessions.map((session) =>
      convertSessionToClassCard(session, session.slotIndex),
    );

    return {
      date: getFormattedTodayDate(),
      totalClasses: classes.length,
      classes,
    };
  }, []);

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100 pt-16">
        {/* Welcome Section */}
        <WelcomeSection
          userName={currentUser.name}
          employeeId={currentUser.id}
        />

        {/* Stats Section - Professional Grid */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-end mb-2">
            <ModuleSelector
              modules={modulesList}
              selectedModule={selectedModule}
              onModuleChange={setSelectedModule}
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {updatedStats.map((stat) => (
              <StatCard
                key={stat.id}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                change={stat.change}                iconColor={stat.iconColor}              />
            ))}
          </div>
        </div>

        {/* Main Content Section */}
        <div className="px-4 py-2 pb-10">
          {/* Quick Actions + Today's Schedule - 2 Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
            {/* Left Column - Quick Actions */}
            <div className="h-full">
              <QuickActions />
            </div>

            {/* Right Column - Today's Schedule + Upcoming Exams */}
            <div className="lg:col-span-2 grid grid-cols-1 xl:grid-cols-2 gap-3">
              <TodayClasses data={todayClassesData} />
              <UpcomingExams data={upcomingExamsData} />
            </div>
          </div>

          {/* Performance & Analytics - 3 Column Layout in One Line */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
            {/* Column 1: Weekly Performance Trends */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <PerformanceChart data={performanceChartData} />
            </div>

            {/* Column 2: Upcoming Meetings */}
            <TodaysMeetings data={todaysMeetingsData} />

            {/* Column 3: Recent Activity */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <RecentActivity data={recentActivityData} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}



"use client";

import { useMemo } from "react";
import MainLayout from "@/layouts/MainLayout";
import StatCard from "@/components/ui/StatCard";
import TodayClasses from "@/components/ui/TodayClasses";
import QuickActions from "@/components/ui/QuickActions";
import PerformanceChart from "@/components/ui/PerformanceChart";
import StudentEngagementTrends from "@/components/ui/StudentEngagementTrends";
import UpcomingExams from "@/components/ui/UpcomingExams";
import TodaysMeetings from "@/components/ui/TodaysMeetings";
import RecentActivity from "@/components/ui/RecentActivity";
import WelcomeSection from "@/components/ui/WelcomeSection";
import {
  getDashboardData,
  currentUser,
  getTimetableSessions,
} from "@/data/dummyData";
import { useAcademicContext } from "@/contexts/AcademicContext";
import {
  getTodaySessions,
  convertSessionToClassCard,
  getFormattedTodayDate,
  type TimetableSession,
} from "@/utils/timetableSync";

export default function HomePage() {
  const { academicYear, semester } = useAcademicContext();
  const {
    dashboardStats,
    performanceChartData,
    alertsData,
    engagementTrendsData,
    upcomingExamsData,
    todaysMeetingsData,
    recentActivityData,
  } = useMemo(
    () => getDashboardData(academicYear, semester),
    [academicYear, semester],
  );

  // Sync today's schedule with timetable data
  const todayClassesData = useMemo(() => {
    const allTimetableSessions = getTimetableSessions();
    const todaySessions = getTodaySessions(allTimetableSessions);

    const classes = todaySessions.map((session) =>
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
      <div className="w-full min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100">
        {/* Welcome Section */}
        <WelcomeSection
          userName={currentUser.name}
          employeeId={currentUser.id}
        />

        {/* Stats Section - Professional Grid */}
        <div className="px-6 py-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {dashboardStats.map((stat) => (
              <StatCard
                key={stat.id}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                change={stat.change}
              />
            ))}
          </div>
        </div>

        {/* Main Content Section */}
        <div className="px-6 py-2 pb-12">
          {/* Quick Actions + Today's Schedule - 2 Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-3 items-stretch">
            {/* Left Column - Quick Actions */}
            <div className="flex flex-col h-full">
              <QuickActions />
            </div>

            {/* Right Column - Today's Schedule */}
            <div className="lg:col-span-2 flex flex-col h-full">
              <TodayClasses data={todayClassesData} />
            </div>
          </div>

          {/* Performance & Analytics - 2 Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-3 items-stretch">
            {/* Left Column - Performance Chart (2 cols) */}
            <div className="lg:col-span-2 flex flex-col space-y-3 h-full">
              <div className="h-[360px] md:h-[380px] bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                <PerformanceChart data={performanceChartData} />
              </div>

              <div className="h-[360px] md:h-[380px] bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                <StudentEngagementTrends data={engagementTrendsData} />
              </div>
            </div>

            {/* Right Column - Exams & Meetings (1 col) */}
            <div className="flex flex-col space-y-3 h-full">
              <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                <UpcomingExams data={upcomingExamsData} />
              </div>

              <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                <TodaysMeetings data={todaysMeetingsData} />
              </div>

              <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                <RecentActivity data={recentActivityData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

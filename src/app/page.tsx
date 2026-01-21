"use client";

import { useMemo } from 'react';
import MainLayout from '@/layouts/MainLayout';
import StatCard from '@/components/ui/StatCard';
import TodayClasses from '@/components/ui/TodayClasses';
import PerformanceChart from '@/components/ui/PerformanceChart';
import AlertsNotifications from '@/components/ui/AlertsNotifications';
import StudentEngagementTrends from '@/components/ui/StudentEngagementTrends';
import UpcomingExams from '@/components/ui/UpcomingExams';
import MarkAttendance from '@/components/ui/MarkAttendance';
import TodaysMeetings from '@/components/ui/TodaysMeetings';
import LeaveManagement from '@/components/ui/LeaveManagement';
import RecentActivity from '@/components/ui/RecentActivity';
import WelcomeSection from '@/components/ui/WelcomeSection';
import { getDashboardData, currentUser } from '@/data/dummyData';
import { useAcademicContext } from '@/contexts/AcademicContext';

export default function HomePage() {
  const { academicYear, semester } = useAcademicContext();
  const {
    dashboardStats,
    todayClassesData,
    performanceChartData,
    alertsData,
    engagementTrendsData,
    upcomingExamsData,
    todaysMeetingsData,
    markAttendanceData,
    leaveManagementData,
    recentActivityData,
  } = useMemo(() => getDashboardData(academicYear, semester), [academicYear, semester]);

  return (
    <MainLayout>
      <div className="w-full">
        {/* Welcome Section */}
        <WelcomeSection userName={currentUser.name} employeeId={currentUser.id} />
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8 px-6 py-8">
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

        {/* Today's Classes Section */}
        <div className="px-6 mb-8">
          <TodayClasses data={todayClassesData} />
        </div>

        {/* Performance Chart & Alerts Section - 70% + 30% layout */}
        <div className="flex flex-col lg:flex-row gap-6 px-6">
          <div className="w-full lg:w-[66.666%]">
            <PerformanceChart data={performanceChartData} />

            {/* Student Engagement Trends Section - Same spacing as column gap */}
            <div className="mt-6">
              <StudentEngagementTrends data={engagementTrendsData} />
            </div>

            <div className="mt-6">
              <MarkAttendance data={markAttendanceData} />
            </div>
          </div>
          <div className="w-full lg:w-[33.333%]">
            <div className="space-y-6">
              <AlertsNotifications data={alertsData} />
              <UpcomingExams data={upcomingExamsData} />
              <TodaysMeetings data={todaysMeetingsData} />
            </div>
          </div>
        </div>

        {/* Leave Management & Recent Activity Section - 50% + 50% layout */}
        <div className="mt-8 flex flex-col lg:flex-row gap-6 px-6 pb-8">
          <div className="w-full lg:w-1/2">
            <LeaveManagement data={leaveManagementData} />
          </div>
          <div className="w-full lg:w-1/2">
            <RecentActivity data={recentActivityData} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

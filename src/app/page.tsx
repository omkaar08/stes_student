import MainLayout from "@/layouts/MainLayout";
import StatCard from "@/components/ui/StatCard";
import TodayClasses from "@/components/ui/TodayClasses";
import PerformanceChart from "@/components/ui/PerformanceChart";
import AlertsNotifications from "@/components/ui/AlertsNotifications";
import StudentEngagementTrends from "@/components/ui/StudentEngagementTrends";
import UpcomingExams from "@/components/ui/UpcomingExams";
import MarkAttendance from "@/components/ui/MarkAttendance";
import TodaysMeetings from "@/components/ui/TodaysMeetings";
import {
  dashboardStats,
  todayClassesData,
  performanceChartData,
  alertsData,
  engagementTrendsData,
  upcomingExamsData,
  todaysMeetingsData,
  markAttendanceData,
} from "@/data/dummyData";

export default function HomePage() {
  return (
    <MainLayout>
      <div className="p-8 w-full">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
        <TodayClasses data={todayClassesData} />

        {/* Performance Chart & Alerts Section - 70% + 30% layout */}
        <div className="mt-8 grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <PerformanceChart data={performanceChartData} />

            <div className="mt-6">
              <MarkAttendance data={markAttendanceData} />
            </div>

            {/* Student Engagement Trends Section - Same spacing as column gap */}
            <div className="mt-6">
              <StudentEngagementTrends data={engagementTrendsData} />
            </div>
          </div>
          <div className="col-span-4">
            <div className="space-y-6">
              <AlertsNotifications data={alertsData} />
              <UpcomingExams data={upcomingExamsData} />
              <TodaysMeetings data={todaysMeetingsData} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

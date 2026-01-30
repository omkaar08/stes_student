"use client";

import MainLayout from "@/layouts/MainLayout";
import StatCard from "@/components/ui/StatCard";
import TodayClasses from "@/components/ui/TodayClasses";
import QuickActions from "@/components/ui/QuickActions";
import WelcomeSection from "@/components/ui/WelcomeSection";
import FinancialStatus from "@/components/ui/FinancialStatus";
import AssignmentsTasks from "@/components/ui/AssignmentsTasks";
import RecentGrades from "@/components/ui/RecentGrades";
import AttendanceByCourse from "@/components/ui/AttendanceByCourse";
import EnrolledModulesTable from "@/components/ui/EnrolledModulesTable";
import { currentUser } from "@/data/studentUser";
import {
  studentAssignments,
  studentAttendanceByCourse,
  studentDashboardStats,
  studentEnrolledModules,
  studentFinance,
  studentRecentGrades,
  studentTodayClasses,
} from "@/data/studentDashboard.mock";

export default function HomePage() {
  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-slate-50 pt-16">
        <WelcomeSection userName={currentUser.name} />

        {/* Stats */}
        <div className="px-4 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {studentDashboardStats.map((stat) => (
              <StatCard
                key={stat.id}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                iconColor={stat.iconColor}
                change={stat.change}
              />
            ))}
          </div>
        </div>

        <div className="px-4 py-2 pb-10">
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
            <QuickActions />
            <div className="lg:col-span-2 grid grid-cols-1 xl:grid-cols-2 gap-3">
              <TodayClasses data={studentTodayClasses} />
              <FinancialStatus
                semesterFeesMasked={studentFinance.semesterFeesMasked}
                paidMasked={studentFinance.paidMasked}
                remainingMasked={studentFinance.remainingMasked}
                paidProgress={studentFinance.paidProgress}
                nextPaymentDue={studentFinance.nextPaymentDue}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
            <AssignmentsTasks items={studentAssignments} />
            <RecentGrades items={studentRecentGrades} />
          </div>

          {/* Attendance + Modules */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <AttendanceByCourse items={studentAttendanceByCourse} />
            <EnrolledModulesTable items={studentEnrolledModules} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

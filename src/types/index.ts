// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  initials?: string;
}

// Notification types
export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: "info" | "warning" | "success" | "error";
}

// Search result types
export interface SearchResult {
  id: string;
  title: string;
  type: "resource" | "student" | "course";
  description?: string;
}

// Module types
export type ModuleStatus = "active" | "completed" | "upcoming";
export type Semester = "1" | "2" | "both";

export interface Module {
  id: string;
  code: string;
  name: string;
  status: ModuleStatus;
  students: number;
  credits: number;
  schedule: string;
  room: string;
  progress: number;
  semester?: Semester;
}

export interface AssignedModulesData {
  modules: Module[];
  stats: {
    activeModules: number;
    totalStudents: number;
    totalCredits: number;
    teachingHoursPerWeek: number;
  };
}

// Component props types
export interface HeaderProps {
  user?: User;
  onToggleSidebar?: () => void;
}

export interface SidebarProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  badge?: number;
  className?: string;
}

// Sidebar navigation types
export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  color?: string;
  children?: NavItem[];
}

export interface SidebarProps {
  className?: string;
}

// Dashboard Stats types
export interface StatCard {
  id: string;
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value?: number;
    isPositive?: boolean;
    text?: string;
    variant?: "positive" | "negative" | "warning" | "neutral";
  };
}

// Class/Course types
export type ClassStatus = "completed" | "ongoing" | "upcoming";

export interface ClassSession {
  id: string;
  name: string;
  code: string;
  status: ClassStatus;
  time: string;
  location: string;
  studentCount: number;
  icon?: React.ReactNode;
}

export interface TodayClassesData {
  date: string;
  totalClasses: number;
  classes: ClassSession[];
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value?: number;
    isPositive?: boolean;
    text?: string;
    variant?: "positive" | "negative" | "warning" | "neutral";
  };
}

export interface ClassCardProps {
  session: ClassSession;
}

export interface TodayClassesProps {
  data: TodayClassesData;
}

// Performance Chart types
export interface ChartDataPoint {
  day: string;
  attendance: number;
  engagement: number;
  assignments: number;
}

export interface PerformanceChartData {
  title: string;
  subtitle: string;
  data: ChartDataPoint[];
}

export interface PerformanceChartProps {
  data: PerformanceChartData;
}

// Alerts & Notifications types - DEPRECATED, use types/alerts.ts instead
// export type AlertType = 'urgent' | 'important' | 'info';
// export interface Alert {...}
// See: /src/types/alerts.ts for the new backend-ready alert types

// Today's Meetings types
export interface TodaysMeeting {
  id: string;
  title: string;
  dateLabel: string;
  time: string;
  duration: string;
  location: string;
  participants: number;
  organizedBy: string;
  agenda: string[];
  icon?: string;
  headerVariant?: string;
  meetingLink?: string;
}

export interface TodaysMeetingsData {
  total: number;
  meetings: TodaysMeeting[];
  upcomingMeetings: TodaysMeeting[];
}

export interface TodaysMeetingsProps {
  data: TodaysMeetingsData;
}

// Leave Management types
export interface LeaveBalance {
  type: "casual" | "medical" | "earned";
  label: string;
  remaining: number;
  total: number;
  used: number;
}

export interface LeaveApplication {
  id: string;
  type: "casual" | "medical" | "earned";
  dateRange: string;
  duration: number;
  status: "approved" | "pending" | "rejected";
  reason: string;
  authority: string;
  appliedDate: string;
}

export interface LeaveManagementData {
  balances: LeaveBalance[];
  applications: LeaveApplication[];
}

export interface LeaveManagementProps {
  data: LeaveManagementData;
}

// Recent Activity types
export interface ActivityItem {
  id: string;
  type: "submission" | "attendance" | "message" | "deadline" | "grading";
  title: string;
  description: string;
  timestamp: string;
  icon?: React.ReactNode;
}

export interface RecentActivityData {
  activities: ActivityItem[];
}

export interface RecentActivityProps {
  data: RecentActivityData;
}

// Mark Attendance types
export type AttendanceStatus = "present" | "absent";

export interface AttendanceStudent {
  id: string;
  name: string;
  rollNumber: string;
  initials: string;
}

export interface AttendanceClass {
  id: string;
  label: string;
  meta: string;
  students: AttendanceStudent[];
}

export interface MarkAttendanceData {
  classes: AttendanceClass[];
}

export interface MarkAttendanceProps {
  data: MarkAttendanceData;
}

// Upcoming Exams types
export interface UpcomingExam {
  id: string;
  day: number;
  month: string;
  title: string;
  courseCode: string;
  time: string;
  dateLabel: string;
  room: string;
  duration: string;
  totalMarks: number;
  topicsCovered: string[];
  instructions: string;
  enrolledStudents: number;
}

export interface UpcomingExamsData {
  total: number;
  exams: UpcomingExam[];
}

export interface UpcomingExamsProps {
  data: UpcomingExamsData;
}

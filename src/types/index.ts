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

// Component props types
export interface HeaderProps {
  user?: User;
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
  href: string;
  color?: string;
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
    value: number;
    isPositive: boolean;
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
    value: number;
    isPositive: boolean;
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

// Upcoming Exams types
export interface UpcomingExam {
  id: string;
  day: number;
  month: string; // e.g. 'JAN'
  title: string;
  courseCode: string;
  time: string;
  dateLabel: string; // e.g. '15 Jan 2026'
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

// Today's Meetings types
export interface TodaysMeeting {
  id: string;
  title: string;
  dateLabel: string; // e.g. 'Jan 15, 2026'
  time: string;
  duration: string;
  location: string;
  participants: number;
  organizedBy: string;
  agenda: string[];
  meetingLink?: string;
  icon?: "faculty" | "project" | "online" | "general";
  headerVariant?: "navy" | "blue";
}

export interface TodaysMeetingsData {
  total: number;
  meetings: TodaysMeeting[];
}

export interface TodaysMeetingsProps {
  data: TodaysMeetingsData;
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

// Alerts & Notifications types - DEPRECATED, use types/alerts.ts instead
// export type AlertType = 'urgent' | 'important' | 'info';
// export interface Alert {...}
// See: /src/types/alerts.ts for the new backend-ready alert types

import {
  User,
  StatCard,
  TodayClassesData,
  PerformanceChartData,
  UpcomingExamsData,
  TodaysMeetingsData,
  MarkAttendanceData,
  LeaveManagementData,
  RecentActivityData,
  AssignedModulesData,
} from "@/types";
import { AlertsData } from "@/types/alerts";
import { EngagementTrendsData } from "@/types/engagement";
import { dashboardIcons } from "@/data/icons";
import { Semester } from "@/contexts/AcademicContext";

type DashboardBundle = {
  dashboardStats: StatCard[];
  todayClassesData: TodayClassesData;
  performanceChartData: PerformanceChartData;
  alertsData: AlertsData;
  engagementTrendsData: EngagementTrendsData;
  upcomingExamsData: UpcomingExamsData;
  todaysMeetingsData: TodaysMeetingsData;
  markAttendanceData: MarkAttendanceData;
  leaveManagementData: LeaveManagementData;
  recentActivityData: RecentActivityData;
};

// Use a fixed reference time to avoid SSR/CSR mismatches from Date.now()
const FIXED_TIME = new Date("2026-01-21T10:00:00Z").getTime();
const isoMinutesAgo = (minutes: number) =>
  new Date(FIXED_TIME - minutes * 60 * 1000).toISOString();

// Dummy user data
export const currentUser: User = {
  id: "1",
  name: "Kunal",
  email: "kunal@example.com",
  role: "Lecturer",
  initials: "K",
};

// Dummy dashboard stats
export const dashboardStats: StatCard[] = [
  {
    id: "total-students",
    title: "Total Students",
    value: 234,
    change: { text: "+12% from last semester", variant: "positive" },
    icon: dashboardIcons.totalStudents,
    iconColor: "blue",
  },
  {
    id: "active-courses",
    title: "Active Courses",
    value: 8,
    change: { text: "+2.1% from last week", variant: "positive" },
    icon: dashboardIcons.activeCourses,
    iconColor: "green",
  },
  {
    id: "pending-tasks",
    title: "Pending Tasks",
    value: 15,
    change: { text: "5 high priority", variant: "warning" },
    icon: dashboardIcons.pendingTasks,
    iconColor: "red",
  },
  {
    id: "avg-performance",
    title: "Avg. Performance",
    value: "87%",
    change: { text: "+1.2% from last week", variant: "positive" },
    icon: dashboardIcons.avgPerformance,
    iconColor: "blue",
  },
];

// Module list
export const modulesList = [
  { id: "advanced-math", name: "Advanced Math" },
  { id: "statistics", name: "Statistics" },
  { id: "programming", name: "Programming" },
  { id: "networks", name: "Networks" },
  { id: "database", name: "Database" },
];

// Module-specific stats data
export const moduleStatsData: Record<string, { students: number; pendingTasks: number; avgPerformance: number }> = {
  "advanced-math": {
    students: 42,
    pendingTasks: 8,
    avgPerformance: 87,
  },
  "statistics": {
    students: 38,
    pendingTasks: 6,
    avgPerformance: 84,
  },
  "programming": {
    students: 48,
    pendingTasks: 12,
    avgPerformance: 92,
  },
  "networks": {
    students: 35,
    pendingTasks: 5,
    avgPerformance: 79,
  },
  "database": {
    students: 41,
    pendingTasks: 9,
    avgPerformance: 86,
  },
};

// Dummy today's classes data
export const todayClassesData: TodayClassesData = {
  date: "Thursday, January 15, 2026",
  totalClasses: 4,
  classes: [
    {
      id: "class-1",
      name: "Advanced Algorithms",
      code: "CS301",
      status: "completed",
      time: "09:00 AM - 10:30 PM",
      location: "Room A-204",
      studentCount: 42,
    },
    {
      id: "class-2",
      name: "Data Structures Lab",
      code: "CS201L",
      status: "ongoing",
      time: "11:00 AM - 12:30 PM",
      location: "Lab C-102",
      studentCount: 35,
    },
    {
      id: "class-3",
      name: "Web Development",
      code: "CS405",
      status: "upcoming",
      time: "02:00 PM - 03:30 PM",
      location: "Online - Zoom",
      studentCount: 48,
    },
    {
      id: "class-4",
      name: "Machine Learning",
      code: "CS502",
      status: "upcoming",
      time: "04:00 PM - 05:30 PM",
      location: "Room B-301",
      studentCount: 38,
    },
  ],
};

// Module-specific performance data
export const modulePerformanceData: Record<string, PerformanceChartData> = {
  "advanced-math": {
    title: "Weekly Performance Trends",
    subtitle: "Tracking student metrics across the week",
    data: [
      { day: "Mon", attendance: 85, engagement: 78, assignments: 65 },
      { day: "Tue", attendance: 92, engagement: 85, assignments: 72 },
      { day: "Wed", attendance: 88, engagement: 82, assignments: 78 },
      { day: "Thu", attendance: 95, engagement: 88, assignments: 85 },
      { day: "Fri", attendance: 90, engagement: 86, assignments: 88 },
      { day: "Sat", attendance: 75, engagement: 70, assignments: 68 },
      { day: "Sun", attendance: 68, engagement: 65, assignments: 60 },
    ],
  },
  "statistics": {
    title: "Weekly Performance Trends",
    subtitle: "Tracking student metrics across the week",
    data: [
      { day: "Mon", attendance: 90, engagement: 85, assignments: 80 },
      { day: "Tue", attendance: 88, engagement: 83, assignments: 78 },
      { day: "Wed", attendance: 92, engagement: 88, assignments: 85 },
      { day: "Thu", attendance: 87, engagement: 82, assignments: 79 },
      { day: "Fri", attendance: 85, engagement: 80, assignments: 76 },
      { day: "Sat", attendance: 78, engagement: 75, assignments: 70 },
      { day: "Sun", attendance: 72, engagement: 68, assignments: 65 },
    ],
  },
  "programming": {
    title: "Weekly Performance Trends",
    subtitle: "Tracking student metrics across the week",
    data: [
      { day: "Mon", attendance: 88, engagement: 92, assignments: 88 },
      { day: "Tue", attendance: 90, engagement: 94, assignments: 90 },
      { day: "Wed", attendance: 85, engagement: 90, assignments: 86 },
      { day: "Thu", attendance: 92, engagement: 95, assignments: 92 },
      { day: "Fri", attendance: 87, engagement: 91, assignments: 88 },
      { day: "Sat", attendance: 80, engagement: 85, assignments: 82 },
      { day: "Sun", attendance: 75, engagement: 80, assignments: 78 },
    ],
  },
  "networks": {
    title: "Weekly Performance Trends",
    subtitle: "Tracking student metrics across the week",
    data: [
      { day: "Mon", attendance: 82, engagement: 75, assignments: 70 },
      { day: "Tue", attendance: 85, engagement: 78, assignments: 74 },
      { day: "Wed", attendance: 80, engagement: 76, assignments: 72 },
      { day: "Thu", attendance: 88, engagement: 82, assignments: 80 },
      { day: "Fri", attendance: 84, engagement: 79, assignments: 76 },
      { day: "Sat", attendance: 76, engagement: 72, assignments: 68 },
      { day: "Sun", attendance: 70, engagement: 66, assignments: 62 },
    ],
  },
  "database": {
    title: "Weekly Performance Trends",
    subtitle: "Tracking student metrics across the week",
    data: [
      { day: "Mon", attendance: 86, engagement: 82, assignments: 78 },
      { day: "Tue", attendance: 89, engagement: 85, assignments: 82 },
      { day: "Wed", attendance: 84, engagement: 80, assignments: 76 },
      { day: "Thu", attendance: 90, engagement: 87, assignments: 84 },
      { day: "Fri", attendance: 88, engagement: 84, assignments: 80 },
      { day: "Sat", attendance: 77, engagement: 73, assignments: 70 },
      { day: "Sun", attendance: 71, engagement: 67, assignments: 64 },
    ],
  },
};

// Dummy performance chart data (default)
export const performanceChartData: PerformanceChartData = modulePerformanceData["advanced-math"];

// Module-specific engagement data
export const moduleEngagementData: Record<string, EngagementTrendsData> = {
  "advanced-math": {
    weekly: {
      average: 83,
      peak: 95,
      growth: 30,
      chartData: [
        { month: "SEPT", engagement: 72 },
        { month: "SEPT", engagement: 78 },
        { month: "SEPT", engagement: 80 },
        { month: "OCT", engagement: 85 },
        { month: "OCT", engagement: 90 },
        { month: "OCT", engagement: 88 },
        { month: "NOV", engagement: 92 },
        { month: "NOV", engagement: 95 },
      ],
    },
    monthly: {
      average: 82,
      peak: 92,
      growth: 28,
      chartData: [
        { month: "SEPT", engagement: 75 },
        { month: "OCT", engagement: 88 },
        { month: "NOV", engagement: 91 },
        { month: "DEC", engagement: 85 },
        { month: "JAN", engagement: 90 },
        { month: "FEB", engagement: 87 },
        { month: "MAR", engagement: 93 },
        { month: "APR", engagement: 96 },
      ],
    },
  },
  "statistics": {
    weekly: {
      average: 80,
      peak: 92,
      growth: 25,
      chartData: [
        { month: "SEPT", engagement: 70 },
        { month: "SEPT", engagement: 75 },
        { month: "SEPT", engagement: 78 },
        { month: "OCT", engagement: 82 },
        { month: "OCT", engagement: 85 },
        { month: "OCT", engagement: 83 },
        { month: "NOV", engagement: 88 },
        { month: "NOV", engagement: 92 },
      ],
    },
    monthly: {
      average: 79,
      peak: 89,
      growth: 24,
      chartData: [
        { month: "SEPT", engagement: 72 },
        { month: "OCT", engagement: 82 },
        { month: "NOV", engagement: 86 },
        { month: "DEC", engagement: 81 },
        { month: "JAN", engagement: 85 },
        { month: "FEB", engagement: 83 },
        { month: "MAR", engagement: 88 },
        { month: "APR", engagement: 89 },
      ],
    },
  },
  "programming": {
    weekly: {
      average: 88,
      peak: 98,
      growth: 35,
      chartData: [
        { month: "SEPT", engagement: 78 },
        { month: "SEPT", engagement: 84 },
        { month: "SEPT", engagement: 86 },
        { month: "OCT", engagement: 90 },
        { month: "OCT", engagement: 94 },
        { month: "OCT", engagement: 92 },
        { month: "NOV", engagement: 96 },
        { month: "NOV", engagement: 98 },
      ],
    },
    monthly: {
      average: 87,
      peak: 96,
      growth: 33,
      chartData: [
        { month: "SEPT", engagement: 80 },
        { month: "OCT", engagement: 90 },
        { month: "NOV", engagement: 94 },
        { month: "DEC", engagement: 88 },
        { month: "JAN", engagement: 92 },
        { month: "FEB", engagement: 90 },
        { month: "MAR", engagement: 95 },
        { month: "APR", engagement: 96 },
      ],
    },
  },
  "networks": {
    weekly: {
      average: 76,
      peak: 88,
      growth: 20,
      chartData: [
        { month: "SEPT", engagement: 65 },
        { month: "SEPT", engagement: 70 },
        { month: "SEPT", engagement: 72 },
        { month: "OCT", engagement: 76 },
        { month: "OCT", engagement: 80 },
        { month: "OCT", engagement: 78 },
        { month: "NOV", engagement: 84 },
        { month: "NOV", engagement: 88 },
      ],
    },
    monthly: {
      average: 75,
      peak: 85,
      growth: 22,
      chartData: [
        { month: "SEPT", engagement: 68 },
        { month: "OCT", engagement: 76 },
        { month: "NOV", engagement: 82 },
        { month: "DEC", engagement: 74 },
        { month: "JAN", engagement: 78 },
        { month: "FEB", engagement: 76 },
        { month: "MAR", engagement: 83 },
        { month: "APR", engagement: 85 },
      ],
    },
  },
  "database": {
    weekly: {
      average: 81,
      peak: 90,
      growth: 27,
      chartData: [
        { month: "SEPT", engagement: 71 },
        { month: "SEPT", engagement: 76 },
        { month: "SEPT", engagement: 79 },
        { month: "OCT", engagement: 83 },
        { month: "OCT", engagement: 86 },
        { month: "OCT", engagement: 84 },
        { month: "NOV", engagement: 88 },
        { month: "NOV", engagement: 90 },
      ],
    },
    monthly: {
      average: 80,
      peak: 88,
      growth: 26,
      chartData: [
        { month: "SEPT", engagement: 73 },
        { month: "OCT", engagement: 81 },
        { month: "NOV", engagement: 85 },
        { month: "DEC", engagement: 79 },
        { month: "JAN", engagement: 83 },
        { month: "FEB", engagement: 81 },
        { month: "MAR", engagement: 87 },
        { month: "APR", engagement: 88 },
      ],
    },
  },
};

// Dummy student engagement trends data (default)
export const engagementTrendsData: EngagementTrendsData = moduleEngagementData["advanced-math"];

// Dummy alerts data (Backend-ready)
export const alertsData: AlertsData = {
  unreadCount: 4,
  alerts: [
    {
      id: "alert-1",
      title: "Emergency Faculty Meeting",
      message:
        "All faculty members are required to attend the emergency meeting scheduled for today at 4:00 PM in Conference Hall A.",
      from: "Dean of Academics",
      time: isoMinutesAgo(10),
      priority: "high",
      isNew: true,
    },
    {
      id: "alert-2",
      title: "Guest Lecture - Machine Learning",
      message:
        "Dr Rajesh Kumar from IIT Delhi will deliver a guest lecture on Advanced Machine Learning on Jan 18, 2026 at 2:00 PM.",
      from: "HOD - Computer Science",
      time: isoMinutesAgo(60),
      priority: "medium",
      isNew: true,
    },
    {
      id: "alert-3",
      title: "Exam Schedule Update",
      message:
        "The final exam schedule has been updated. Please check the academic portal for the revised timetable.",
      from: "Examination Department",
      time: isoMinutesAgo(120),
      priority: "medium",
      isNew: true,
    },
    {
      id: "alert-4",
      title: "Research Grant Applications Open",
      message:
        "Applications for research grants are now open. Submit your proposals by Jan 25, 2026.",
      from: "Research & Development Cell",
      time: isoMinutesAgo(300),
      priority: "low",
      isNew: false,
    },
  ],
};

// Dummy upcoming exams data
export const upcomingExamsData: UpcomingExamsData = {
  total: 3,
  exams: [
    {
      id: "exam-1",
      day: 15,
      month: "JAN",
      title: "Data Structures Midterm",
      courseCode: "CS201",
      time: "09:00 AM - 11:00 AM",
      dateLabel: "15 Jan 2026",
      room: "Hall A-301",
      duration: "2 hours",
      totalMarks: 100,
      topicsCovered: [
        "Arrays & Linked Lists",
        "Stacks & Queues",
        "Trees & Graphs",
      ],
      instructions: "Bring student ID and calculator",
      enrolledStudents: 42,
    },
    {
      id: "exam-2",
      day: 22,
      month: "JAN",
      title: "Advanced Algorithms Final",
      courseCode: "CS301",
      time: "02:00 PM - 04:30 PM",
      dateLabel: "22 Jan 2026",
      room: "Hall B-204",
      duration: "2.5 hours",
      totalMarks: 100,
      topicsCovered: [
        "Dynamic Programming",
        "Graph Algorithms",
        "Greedy & NP-Completeness",
      ],
      instructions:
        "Carry student ID and admit card. No electronic devices allowed.",
      enrolledStudents: 38,
    },
    {
      id: "exam-3",
      day: 28,
      month: "JAN",
      title: "Web Development Quiz",
      courseCode: "CS405",
      time: "10:00 AM - 11:00 AM",
      dateLabel: "28 Jan 2026",
      room: "Lab C-102",
      duration: "1 hour",
      totalMarks: 50,
      topicsCovered: ["HTML & CSS", "JavaScript Basics", "React Fundamentals"],
      instructions: "Arrive 10 minutes early. Bring your ID card.",
      enrolledStudents: 48,
    },
  ],
};

// Dummy today's meetings data
export const todaysMeetingsData: TodaysMeetingsData = {
  total: 2,
  meetings: [
    {
      id: "meet-1",
      title: "Department Faculty Meeting",
      dateLabel: "Jan 15, 2026",
      time: "10:00 AM - 11:00 AM",
      duration: "1 hour",
      location: "Conference Room A",
      participants: 12,
      organizedBy: "Dr. Sarah Johnson",
      agenda: ["Curriculum Review", "Student Performance Analysis"],
      icon: "faculty",
      headerVariant: "navy",
    },
    {
      id: "meet-2",
      title: "Project Guidance - Final Year",
      dateLabel: "Jan 15, 2026",
      time: "03:00 PM - 04:00 PM",
      duration: "1 hour",
      location: "Google Meet",
      participants: 8,
      organizedBy: "Prof. Kunal Sharma",
      agenda: ["Review milestones", "Next steps & deadlines"],
      meetingLink: "https://meet.google.com/abc-defg-hij",
      icon: "online",
      headerVariant: "blue",
    },
  ],
  upcomingMeetings: [
    {
      id: "meet-3",
      title: "Curriculum Planning Workshop",
      dateLabel: "Jan 21, 2026",
      time: "09:00 AM - 10:30 AM",
      duration: "1.5 hours",
      location: "Board Room",
      participants: 15,
      organizedBy: "Dr. Rajesh Kumar",
      agenda: [
        "Review course structure",
        "Plan semester topics",
        "Resource allocation",
      ],
      icon: "faculty",
      headerVariant: "navy",
    },
    {
      id: "meet-4",
      title: "Research Collaboration Meeting",
      dateLabel: "Jan 22, 2026",
      time: "02:00 PM - 03:30 PM",
      duration: "1.5 hours",
      location: "Zoom",
      participants: 6,
      organizedBy: "Prof. Anjali Mehta",
      agenda: [
        "Discuss research proposal",
        "Timeline planning",
        "Budget review",
      ],
      meetingLink: "https://zoom.us/j/123456789",
      icon: "online",
      headerVariant: "blue",
    },
    {
      id: "meet-5",
      title: "Lab Equipment Review",
      dateLabel: "Jan 23, 2026",
      time: "11:00 AM - 12:00 PM",
      duration: "1 hour",
      location: "Lab 5, Building B",
      participants: 10,
      organizedBy: "Dr. Priya Sharma",
      agenda: [
        "Inspect equipment condition",
        "Maintenance schedule",
        "Purchase requests",
      ],
      icon: "faculty",
      headerVariant: "navy",
    },
    {
      id: "meet-6",
      title: "Parent-Teacher Conference",
      dateLabel: "Jan 24, 2026",
      time: "02:00 PM - 04:00 PM",
      duration: "2 hours",
      location: "Main Auditorium",
      participants: 25,
      organizedBy: "Prof. Kunal Sharma",
      agenda: [
        "Student progress discussion",
        "Academic concerns",
        "Future planning",
      ],
      icon: "project",
      headerVariant: "navy",
    },
  ],
};

// Dummy mark attendance data
export const markAttendanceData: MarkAttendanceData = {
  classes: [
    {
      id: "att-1",
      label: "CS301 - Advanced Algorithms",
      meta: "3rd Year • 6 Students",
      students: [
        {
          id: "s1",
          name: "Sarah Johnson",
          rollNumber: "CS001",
          initials: "SJ",
        },
        { id: "s2", name: "Mike Chen", rollNumber: "CS002", initials: "MC" },
        { id: "s3", name: "Emma Wilson", rollNumber: "CS003", initials: "EW" },
        { id: "s4", name: "James Brown", rollNumber: "CS004", initials: "JB" },
        {
          id: "s5",
          name: "Lisa Anderson",
          rollNumber: "CS005",
          initials: "LA",
        },
        { id: "s6", name: "David Lee", rollNumber: "CS006", initials: "DL" },
      ],
    },
    {
      id: "att-2",
      label: "CS201 - Data Structures",
      meta: "2nd Year • 6 Students",
      students: [
        { id: "s7", name: "Neha Verma", rollNumber: "DS101", initials: "NV" },
        { id: "s8", name: "Arjun Singh", rollNumber: "DS102", initials: "AS" },
        { id: "s9", name: "Ishaan Gupta", rollNumber: "DS103", initials: "IG" },
        { id: "s10", name: "Meera Iyer", rollNumber: "DS104", initials: "MI" },
        { id: "s11", name: "Kabir Das", rollNumber: "DS105", initials: "KD" },
        { id: "s12", name: "Ananya Rao", rollNumber: "DS106", initials: "AR" },
      ],
    },
    {
      id: "att-3",
      label: "CS101 - Programming Fundamentals",
      meta: "1st Year • 6 Students",
      students: [
        { id: "s13", name: "Aarav Patel", rollNumber: "PF001", initials: "AP" },
        { id: "s14", name: "Sana Ali", rollNumber: "PF002", initials: "SA" },
        { id: "s15", name: "Vikram Rao", rollNumber: "PF003", initials: "VR" },
        { id: "s16", name: "Nisha Jain", rollNumber: "PF004", initials: "NJ" },
        { id: "s17", name: "Rahul Kumar", rollNumber: "PF005", initials: "RK" },
        { id: "s18", name: "Ira Sen", rollNumber: "PF006", initials: "IS" },
      ],
    },
    {
      id: "att-4",
      label: "CS405 - Web Development",
      meta: "4th Year • 6 Students",
      students: [
        { id: "s19", name: "Karan Gupta", rollNumber: "WD001", initials: "KG" },
        { id: "s20", name: "Mehul Shah", rollNumber: "WD002", initials: "MS" },
        { id: "s21", name: "Riya Nair", rollNumber: "WD003", initials: "RN" },
        { id: "s22", name: "Dev Patel", rollNumber: "WD004", initials: "DP" },
        { id: "s23", name: "Anjali Bose", rollNumber: "WD005", initials: "AB" },
        {
          id: "s24",
          name: "Siddharth Roy",
          rollNumber: "WD006",
          initials: "SR",
        },
      ],
    },
  ],
};

// Dummy leave management data
export const leaveManagementData: LeaveManagementData = {
  balances: [
    {
      type: "casual",
      label: "Casual Leave",
      remaining: 8,
      total: 10,
      used: 2,
    },
    {
      type: "medical",
      label: "Medical Leave",
      remaining: 9,
      total: 10,
      used: 1,
    },
    {
      type: "earned",
      label: "Earned Leave",
      remaining: 15,
      total: 20,
      used: 5,
    },
  ],
  applications: [
    {
      id: "leave-1",
      type: "casual",
      dateRange: "Jan 25 - Jan 27, 2026",
      duration: 3,
      status: "pending",
      reason: "Personal work",
      authority: "Dr. Rajesh Kumar",
      appliedDate: "Jan 20, 2026",
    },
    {
      id: "leave-2",
      type: "medical",
      dateRange: "Jan 18 - Jan 19, 2026",
      duration: 2,
      status: "approved",
      reason: "Medical checkup",
      authority: "Dr. Rajesh Kumar",
      appliedDate: "Jan 17, 2026",
    },
    {
      id: "leave-3",
      type: "casual",
      dateRange: "Jan 10 - Jan 12, 2026",
      duration: 3,
      status: "approved",
      reason: "Family visit",
      authority: "Dr. Rajesh Kumar",
      appliedDate: "Jan 8, 2026",
    },
  ],
};

// Dummy recent activity data
export const recentActivityData: RecentActivityData = {
  activities: [
    {
      id: "activity-1",
      type: "submission",
      title: "Assignment Submitted",
      description: "Sarah Johnson submitted CS301 Assignment 2",
      timestamp: "2 hours ago",
    },
    {
      id: "activity-2",
      type: "attendance",
      title: "Attendance Marked",
      description: "CS301 - Advanced Algorithms (28/30 present)",
      timestamp: "4 hours ago",
    },
    {
      id: "activity-3",
      type: "message",
      title: "New Student Message",
      description: "Mike Chen: Question about Assignment 1",
      timestamp: "5 hours ago",
    },
    {
      id: "activity-4",
      type: "deadline",
      title: "Upcoming Deadline",
      description: "CS201 Project submission due in 2 days",
      timestamp: "1 day ago",
    },
    {
      id: "activity-5",
      type: "grading",
      title: "Grading Completed",
      description: "All CS101 midterm exams graded",
      timestamp: "2 days ago",
    },
  ],
};

// Term-specific variants
const dashboardStatsSpring: StatCard[] = dashboardStats.map((stat) => {
  if (typeof stat.value === "number") {
    return { ...stat, value: (stat.value as number) + 4 };
  }
  if (stat.id === "avg-performance") {
    return { ...stat, value: "89%" };
  }
  return stat;
});

const dashboardStats2025Fall: StatCard[] = dashboardStats.map((stat) => {
  if (typeof stat.value === "number") {
    return { ...stat, value: (stat.value as number) + 18 };
  }
  if (stat.id === "avg-performance") {
    return { ...stat, value: "90%" };
  }
  return stat;
});

const dashboardStats2025Spring: StatCard[] = dashboardStats.map((stat) => {
  if (typeof stat.value === "number") {
    return { ...stat, value: (stat.value as number) + 22 };
  }
  if (stat.id === "avg-performance") {
    return { ...stat, value: "91%" };
  }
  return stat;
});

const todayClassesDataSpring: TodayClassesData = {
  date: "Monday, March 9, 2026",
  totalClasses: 3,
  classes: [
    {
      id: "class-s1",
      name: "Database Systems",
      code: "CS310",
      status: "ongoing",
      time: "10:00 AM - 11:30 AM",
      location: "Room C-210",
      studentCount: 40,
    },
    {
      id: "class-s2",
      name: "AI Ethics",
      code: "CS380",
      status: "completed",
      time: "08:00 AM - 09:30 AM",
      location: "Room B-110",
      studentCount: 36,
    },
    {
      id: "class-s3",
      name: "Cloud Computing",
      code: "CS420",
      status: "upcoming",
      time: "02:00 PM - 03:30 PM",
      location: "Online - Teams",
      studentCount: 44,
    },
  ],
};

const todayClassesData2025Fall: TodayClassesData = {
  date: "Tuesday, September 14, 2026",
  totalClasses: 4,
  classes: [
    {
      id: "class-f25-1",
      name: "Data Visualization",
      code: "CS415",
      status: "completed",
      time: "08:00 AM - 09:15 AM",
      location: "Room A-102",
      studentCount: 41,
    },
    {
      id: "class-f25-2",
      name: "Distributed Systems",
      code: "CS505",
      status: "ongoing",
      time: "10:00 AM - 11:30 AM",
      location: "Room D-201",
      studentCount: 39,
    },
    {
      id: "class-f25-3",
      name: "Cybersecurity",
      code: "CS470",
      status: "upcoming",
      time: "01:00 PM - 02:30 PM",
      location: "Lab C-305",
      studentCount: 45,
    },
    {
      id: "class-f25-4",
      name: "Advanced Databases",
      code: "CS520",
      status: "upcoming",
      time: "03:00 PM - 04:30 PM",
      location: "Online - Zoom",
      studentCount: 42,
    },
  ],
};

const todayClassesData2025Spring: TodayClassesData = {
  date: "Wednesday, February 18, 2027",
  totalClasses: 5,
  classes: [
    {
      id: "class-sp25-1",
      name: "Human-Computer Interaction",
      code: "CS330",
      status: "completed",
      time: "08:30 AM - 09:30 AM",
      location: "Room A-205",
      studentCount: 38,
    },
    {
      id: "class-sp25-2",
      name: "Software Architecture",
      code: "CS410",
      status: "completed",
      time: "10:00 AM - 11:00 AM",
      location: "Room B-320",
      studentCount: 40,
    },
    {
      id: "class-sp25-3",
      name: "Reinforcement Learning",
      code: "CS560",
      status: "ongoing",
      time: "11:30 AM - 12:45 PM",
      location: "Room C-101",
      studentCount: 37,
    },
    {
      id: "class-sp25-4",
      name: "Blockchain Systems",
      code: "CS535",
      status: "upcoming",
      time: "02:00 PM - 03:15 PM",
      location: "Lab D-210",
      studentCount: 34,
    },
    {
      id: "class-sp25-5",
      name: "Applied NLP",
      code: "CS545",
      status: "upcoming",
      time: "03:30 PM - 04:30 PM",
      location: "Online - Teams",
      studentCount: 33,
    },
  ],
};

const performanceChartDataSpring: PerformanceChartData = {
  ...performanceChartData,
  title: "Weekly Performance Trends (Spring)",
  data: performanceChartData.data.map((point) => ({
    ...point,
    attendance: point.attendance + 2,
    engagement: point.engagement + 1,
    assignments: point.assignments + 1,
  })),
};

const performanceChartData2025Fall: PerformanceChartData = {
  ...performanceChartData,
  title: "Weekly Performance Trends (2025 Fall)",
  data: performanceChartData.data.map((point) => ({
    ...point,
    attendance: Math.min(100, point.attendance + 4),
    engagement: Math.min(100, point.engagement + 3),
    assignments: Math.min(100, point.assignments + 2),
  })),
};

const performanceChartData2025Spring: PerformanceChartData = {
  ...performanceChartData,
  title: "Weekly Performance Trends (2025 Spring)",
  data: performanceChartData.data.map((point) => ({
    ...point,
    attendance: Math.min(100, point.attendance + 6),
    engagement: Math.min(100, point.engagement + 4),
    assignments: Math.min(100, point.assignments + 3),
  })),
};

const alertsDataSpring: AlertsData = {
  unreadCount: 3,
  alerts: [
    {
      id: "alert-s1",
      title: "Spring Orientation Briefing",
      message:
        "Share updated syllabi with students before the semester kickoff meeting.",
      from: "Dean of Academics",
      time: isoMinutesAgo(20),
      priority: "medium",
      isNew: true,
    },
    {
      id: "alert-s2",
      title: "Grade Submission Reminder",
      message: "Submit mid-term grades for Spring courses by Friday 5:00 PM.",
      from: "Examination Cell",
      time: isoMinutesAgo(90),
      priority: "high",
      isNew: true,
    },
    {
      id: "alert-s3",
      title: "Guest Seminar - Robotics",
      message:
        "Prof. Aditi Rao will host a seminar on Robotics in Education next week.",
      from: "HOD - Mechanical",
      time: isoMinutesAgo(180),
      priority: "low",
      isNew: false,
    },
  ],
};

const alertsData2025Fall: AlertsData = {
  unreadCount: 5,
  alerts: [
    {
      id: "alert-f25-1",
      title: "New Research Cohort Launch",
      message: "Introduce the 2025 research cohort to your labs this Friday.",
      from: "Research & Development Cell",
      time: isoMinutesAgo(15),
      priority: "high",
      isNew: true,
    },
    {
      id: "alert-f25-2",
      title: "Infrastructure Maintenance",
      message:
        "Network maintenance tonight 9 PM - 11 PM. Save your work beforehand.",
      from: "IT Services",
      time: isoMinutesAgo(50),
      priority: "medium",
      isNew: true,
    },
    {
      id: "alert-f25-3",
      title: "Grant Review Panel",
      message:
        "Panel schedules available for the Fall grant applications. Confirm slots.",
      from: "Research & Development Cell",
      time: isoMinutesAgo(120),
      priority: "medium",
      isNew: true,
    },
    {
      id: "alert-f25-4",
      title: "Faculty Development Workshop",
      message: "Sign up for the “Active Learning at Scale” workshop next week.",
      from: "Academic Services",
      time: isoMinutesAgo(240),
      priority: "low",
      isNew: false,
    },
    {
      id: "alert-f25-5",
      title: "Exam Blueprint Update",
      message: "Revised blueprint for Fall 2025 exams has been published.",
      from: "Examination Department",
      time: isoMinutesAgo(360),
      priority: "high",
      isNew: false,
    },
  ],
};

const alertsData2025Spring: AlertsData = {
  unreadCount: 2,
  alerts: [
    {
      id: "alert-sp25-1",
      title: "Capstone Jury Allocation",
      message: "Confirm your availability for Spring capstone project juries.",
      from: "Department Office",
      time: isoMinutesAgo(35),
      priority: "medium",
      isNew: true,
    },
    {
      id: "alert-sp25-2",
      title: "Curriculum Review Draft",
      message:
        "Review the proposed 2026 curriculum changes and share feedback.",
      from: "Academic Council",
      time: isoMinutesAgo(120),
      priority: "high",
      isNew: true,
    },
    {
      id: "alert-sp25-3",
      title: "Alumni Networking Evening",
      message: "Join the alumni-student mixer scheduled for next Thursday.",
      from: "Alumni Office",
      time: isoMinutesAgo(300),
      priority: "low",
      isNew: false,
    },
  ],
};

const dashboardDataByTerm: Record<string, Record<Semester, DashboardBundle>> = {
  "2024-2025": {
    Fall: {
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
    },
    Spring: {
      dashboardStats: dashboardStatsSpring,
      todayClassesData: todayClassesDataSpring,
      performanceChartData: performanceChartDataSpring,
      alertsData: alertsDataSpring,
      engagementTrendsData,
      upcomingExamsData,
      todaysMeetingsData,
      markAttendanceData,
      leaveManagementData,
      recentActivityData,
    },
  },
  "2025-2026": {
    Fall: {
      dashboardStats: dashboardStats2025Fall,
      todayClassesData: todayClassesData2025Fall,
      performanceChartData: performanceChartData2025Fall,
      alertsData: alertsData2025Fall,
      engagementTrendsData,
      upcomingExamsData,
      todaysMeetingsData,
      markAttendanceData,
      leaveManagementData,
      recentActivityData,
    },
    Spring: {
      dashboardStats: dashboardStats2025Spring,
      todayClassesData: todayClassesData2025Spring,
      performanceChartData: performanceChartData2025Spring,
      alertsData: alertsData2025Spring,
      engagementTrendsData,
      upcomingExamsData,
      todaysMeetingsData,
      markAttendanceData,
      leaveManagementData,
      recentActivityData,
    },
  },
};

export const getDashboardData = (
  academicYear: string,
  semester: Semester,
): DashboardBundle => {
  const yearData = dashboardDataByTerm[academicYear];
  const termData = yearData?.[semester];
  if (termData) return termData;
  return dashboardDataByTerm["2024-2025"].Fall;
};

export const getAlertsDataForTerm = (
  academicYear: string,
  semester: Semester,
): AlertsData => {
  return getDashboardData(academicYear, semester).alertsData;
};

// Assigned modules data
export const assignedModulesData: AssignedModulesData = {
  stats: {
    activeModules: 5,
    totalStudents: 205,
    totalCredits: 85,
    teachingHoursPerWeek: 18,
  },
  modules: [
    {
      id: "module-1",
      code: "CSC3101",
      name: "Data Structures & Algorithms",
      status: "active",
      students: 45,
      credits: 15,
      schedule: "Mon, Wed 08:00-10:00",
      room: "Lab A-204",
      progress: 65,
      semester: "1",
    },
    {
      id: "module-2",
      code: "CSC4201",
      name: "Software Engineering",
      status: "active",
      students: 38,
      credits: 20,
      schedule: "Tue, Thu 10:30-12:30",
      room: "Room B-105",
      progress: 72,
      semester: "1",
    },
    {
      id: "module-3",
      code: "CSC2105",
      name: "Web Development",
      status: "active",
      students: 52,
      credits: 15,
      schedule: "Fri 14:00-17:00",
      room: "Lab C-301",
      progress: 58,
      semester: "1",
    },
    {
      id: "module-4",
      code: "CSC3301",
      name: "Database Management Systems",
      status: "active",
      students: 40,
      credits: 20,
      schedule: "Mon, Wed 14:00-16:00",
      room: "Lab B-202",
      progress: 68,
      semester: "2",
    },
    {
      id: "module-5",
      code: "CSC1101",
      name: "Introduction to Programming",
      status: "active",
      students: 30,
      credits: 15,
      schedule: "Tue, Thu 09:00-11:00",
      room: "Lab A-101",
      progress: 55,
      semester: "2",
    },
  ],
};

// Timetable sessions data - synced with Teaching → Timetable
export const timetableSessions = [
  {
    id: "s-1",
    dayIndex: 0, // Monday
    slotIndex: 0, // 09:00 – 10:30
    moduleCode: "CS301",
    moduleName: "Advanced Algorithms",
    location: "Room A-204",
    type: "lecture" as const,
  },
  {
    id: "s-2",
    dayIndex: 2, // Wednesday
    slotIndex: 0, // 09:00 – 10:30
    moduleCode: "CS301",
    moduleName: "Advanced Algorithms",
    location: "Room A-204",
    type: "lecture" as const,
  },
  {
    id: "s-3",
    dayIndex: 1, // Tuesday
    slotIndex: 1, // 11:00 – 12:30
    moduleCode: "CS420",
    moduleName: "Software Engineering",
    location: "Room B-105",
    type: "lecture" as const,
  },
  {
    id: "s-4",
    dayIndex: 2, // Wednesday
    slotIndex: 1, // 11:00 – 12:30
    moduleCode: "CS410",
    moduleName: "AI Fundamentals",
    location: "Room B-203",
    type: "lecture" as const,
  },
  {
    id: "s-5",
    dayIndex: 3, // Thursday
    slotIndex: 1, // 11:00 – 12:30
    moduleCode: "CS420",
    moduleName: "Software Engineering",
    location: "Room B-105",
    type: "tutorial" as const,
  },
  {
    id: "s-6",
    dayIndex: 0, // Monday
    slotIndex: 2, // 14:00 – 15:30
    moduleCode: "CS305",
    moduleName: "Database Systems",
    location: "Lab A-205",
    type: "lab" as const,
  },
  {
    id: "s-7",
    dayIndex: 3, // Thursday
    slotIndex: 2, // 14:00 – 15:30
    moduleCode: "CS305",
    moduleName: "Database Systems",
    location: "Lab A-205",
    type: "lab" as const,
  },
  {
    id: "s-8",
    dayIndex: 4, // Friday
    slotIndex: 2, // 14:00 – 15:30
    moduleCode: "CS210",
    moduleName: "Web Development",
    location: "Lab C-301",
    type: "lab" as const,
  },
];

/**
 * Retrieves all timetable sessions
 * @returns Array of timetable sessions
 */
export function getTimetableSessions() {
  return timetableSessions;
}

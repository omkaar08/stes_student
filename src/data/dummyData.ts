import {
  User,
  StatCard,
  TodayClassesData,
  PerformanceChartData,
  UpcomingExamsData,
  TodaysMeetingsData,
  MarkAttendanceData,
} from "@/types";
import { AlertsData } from "@/types/alerts";
import { EngagementTrendsData } from "@/types/engagement";
import { dashboardIcons } from "@/data/icons";

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
    change: { value: 12, isPositive: true },
    icon: dashboardIcons.totalStudents,
  },
  {
    id: "active-courses",
    title: "Active Courses",
    value: 8,
    change: { value: 2, isPositive: true },
    icon: dashboardIcons.activeCourses,
  },
  {
    id: "pending-tasks",
    title: "Pending Tasks",
    value: 15,
    change: { value: -5, isPositive: false },
    icon: dashboardIcons.pendingTasks,
  },
  {
    id: "avg-performance",
    title: "Avg. Performance",
    value: "87%",
    change: { value: 3, isPositive: true },
    icon: dashboardIcons.avgPerformance,
  },
];

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

// Dummy performance chart data
export const performanceChartData: PerformanceChartData = {
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
};

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
      time: "10 mins ago",
      priority: "high",
      isNew: true,
    },
    {
      id: "alert-2",
      title: "Guest Lecture - Machine Learning",
      message:
        "Dr Rajesh Kumar from IIT Delhi will deliver a guest lecture on Advanced Machine Learning on Jan 18, 2026 at 2:00 PM.",
      from: "HOD - Computer Science",
      time: "1 hour ago",
      priority: "medium",
      isNew: true,
    },
    {
      id: "alert-3",
      title: "Exam Schedule Update",
      message:
        "The final exam schedule has been updated. Please check the academic portal for the revised timetable.",
      from: "Examination Department",
      time: "2 hours ago",
      priority: "medium",
      isNew: true,
    },
    {
      id: "alert-4",
      title: "Research Grant Applications Open",
      message:
        "Applications for research grants are now open. Submit your proposals by Jan 25, 2026.",
      from: "Research & Development Cell",
      time: "5 hours ago",
      priority: "low",
      isNew: false,
    },
  ],
};

// Dummy student engagement trends data
export const engagementTrendsData: EngagementTrendsData = {
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

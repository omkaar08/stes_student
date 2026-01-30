import React from "react";
import type { StatCard, TodayClassesData } from "@/types";
import { BookOpen, CheckCircle2, Layers, BarChart3, Users } from "lucide-react";

const percentageToGpa4 = (percentage: number) =>
  Math.max(0, Math.min(4, (percentage / 100) * 4));

const currentPercentage = 92;
const currentGpa4 = percentageToGpa4(currentPercentage);

export const studentDashboardStats: StatCard[] = [
  {
    id: "current-gpa",
    title: "Current Percentage",
    value: `${currentPercentage}%`,
    icon: React.createElement(BookOpen),
    iconColor: "blue",
    change: {
      text: `Equivalent GPA: ${currentGpa4.toFixed(2)}/4.00`,
      variant: "positive",
    },
  },
  {
    id: "attendance-rate",
    title: "Attendance Rate",
    value: "80.4%",
    icon: React.createElement(CheckCircle2),
    iconColor: "green",
    change: {
      text: "45/56 sessions",
      variant: "positive",
      icon: React.createElement(Users),
    },
  },
  {
    id: "pending-tasks",
    title: "Total Courses",
    value: 5,
    icon: React.createElement(Layers),
    iconColor: "orange",
    change: { text: "In this Academic Year", variant: "positive" },
  },
  {
    id: "credits-earned",
    title: "Credits Earned",
    value: "45/120",
    icon: React.createElement(BarChart3),
    iconColor: "purple",
    change: { text: "18 credits this semester", variant: "positive" },
  },
];

export const studentTodayClasses: TodayClassesData = {
  date: "",
  totalClasses: 2,
  classes: [
    {
      id: "class-1",
      name: "CS101 - Operating Systems",
      code: "CS101",
      status: "ongoing",
      time: "10:00-11:30",
      location: "Science Building, Room 302",
      studentCount: 0,
    },
    {
      id: "class-2",
      name: "MATH202 - Calculus II",
      code: "MATH202",
      status: "upcoming",
      time: "14:00-15:30",
      location: "Mathematics Building, Room 105",
      studentCount: 0,
    },
  ],
};

export type StudentAssignment = {
  id: string;
  title: string;
  course: string;
  dueText: string;
  tone: "info" | "warning";
};

export const studentAssignments: StudentAssignment[] = [
  {
    id: "a1",
    title: "Programming Assignment #3",
    course: "CS101 - Introduction to Programming",
    dueText: "Due tomorrow, 11:59 PM",
    tone: "info",
  },
  {
    id: "a2",
    title: "Research Paper Outline",
    course: "ENG150 - Academic Writing",
    dueText: "Due May 5, 2025",
    tone: "info",
  },
  {
    id: "a3",
    title: "Problem Set 5",
    course: "MATH202 - Calculus II",
    dueText: "Due May 7, 2025",
    tone: "warning",
  },
];

export type StudentGrade = {
  id: string;
  title: string;
  course: string;
  postedText: string;
  badge: string;
};

export const studentRecentGrades: StudentGrade[] = [
  {
    id: "g1",
    title: "Midterm Exam",
    course: "CS101 - Introduction to Programming",
    postedText: "Posted Apr 15, 2025",
    badge: "A (92%)",
  },
  {
    id: "g2",
    title: "Essay Assignment",
    course: "ENG150 - Academic Writing",
    postedText: "Posted Apr 10, 2025",
    badge: "B+ (87%)",
  },
  {
    id: "g3",
    title: "Quiz 3",
    course: "MATH202 - Calculus II",
    postedText: "Posted Apr 8, 2025",
    badge: "B (83%)",
  },
];

export const studentAttendance = {
  present: 45,
  absent: 8,
  excused: 3,
  totalSessions: 56,
  overallRate: 80.4,
  minimumRequired: 75,
};

export const studentAttendanceByCourse = [
  { courseCode: "CS101", attendancePercent: 86 },
  { courseCode: "MATH202", attendancePercent: 78 },
  { courseCode: "ENG150", attendancePercent: 91 },
  { courseCode: "PHY110", attendancePercent: 74 },
  { courseCode: "HIST130", attendancePercent: 83 },
];

export const studentEnrolledModules = [
  { code: "CS101", name: "Operating Systems", credits: 10 },
  { code: "MATH202", name: "Calculus II", credits: 10 },
  { code: "ENG150", name: "Academic Writing", credits: 10 },
  { code: "PHY110", name: "Physics I", credits: 10 },
  { code: "HIST130", name: "History of Computing", credits: 10 },
];

export const studentFinance = {
  semesterFeesMasked: "RWF ******",
  paidMasked: "RWF ******",
  remainingMasked: "RWF ******",
  paidProgress: 0.78,
  nextPaymentDue: "May 15, 2025",
};

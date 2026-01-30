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
  onToggleSidebar?: () => void;
}

export interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
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

// Dashboard Stats types
export interface StatCard {
  id: string;
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconColor?: string;
  change?: {
    value?: number;
    isPositive?: boolean;
    text?: string;
    icon?: React.ReactNode;
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
  iconColor?: string;
  change?: {
    value?: number;
    isPositive?: boolean;
    text?: string;
    icon?: React.ReactNode;
    variant?: "positive" | "negative" | "warning" | "neutral";
  };
}

export interface ClassCardProps {
  session: ClassSession;
  index?: number;
}

export interface TodayClassesProps {
  data: TodayClassesData;
}

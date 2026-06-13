export type UserRole = "STUDENT" | "FACULTY" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon: string;
}

export const ROLE_DASHBOARDS: Record<UserRole, string> = {
  STUDENT: "/student/dashboard",
  FACULTY: "/faculty/dashboard",
  ADMIN: "/admin/dashboard",
};

export const STUDENT_NAV_ITEMS: NavItem[] = [
  { title: "Dashboard", href: "/student/dashboard", icon: "LayoutDashboard" },
  { title: "Post Doubt", href: "/student/post-doubt", icon: "PlusCircle" },
  { title: "Browse Doubts", href: "/student/browse", icon: "Search" },
  { title: "Saved", href: "/student/saved", icon: "Bookmark" },
  { title: "Meetings", href: "/student/meetings", icon: "Calendar" },
];

export const FACULTY_NAV_ITEMS: NavItem[] = [
  { title: "Dashboard", href: "/faculty/dashboard", icon: "LayoutDashboard" },
  { title: "My Subjects", href: "/faculty/subjects", icon: "BookOpen" },
  { title: "Answer Doubts", href: "/faculty/answer", icon: "MessageSquare" },
  { title: "Meeting Requests", href: "/faculty/meetings", icon: "Calendar" },
];

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { title: "Dashboard", href: "/admin/dashboard", icon: "LayoutDashboard" },
  { title: "Users", href: "/admin/users", icon: "Users" },
  { title: "Subjects", href: "/admin/subjects", icon: "BookOpen" },
  { title: "Moderation", href: "/admin/moderation", icon: "Shield" },
  { title: "Analytics", href: "/admin/analytics", icon: "BarChart3" },
];

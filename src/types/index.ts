// ─── Core Enums & Types ──────────────────────────────────

export type UserRole = "STUDENT" | "FACULTY" | "ADMIN";
export type DoubtStatus = "OPEN" | "ANSWERED" | "RESOLVED";
export type MeetingStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "RESCHEDULED";

// ─── Entity Types ────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Subject {
  id: string;
  name: string;
  chapters?: Chapter[];
}

export interface Chapter {
  id: string;
  name: string;
  subjectId: string;
}

export interface Doubt {
  id: string;
  title: string;
  description: string;
  status: DoubtStatus;
  tags: string[];
  isFlagged: boolean;
  flagReason?: string | null;
  isRemoved: boolean;
  createdAt: string;
  userId: string;
  subjectId: string;
  chapterId: string;
  user?: { id: string; name: string };
  subject?: Subject;
  chapter?: Chapter;
  _count?: { answers: number };
  isSaved?: boolean;
}

export interface Answer {
  id: string;
  content: string;
  summary?: string | null;
  upvoteCount: number;
  isFlagged: boolean;
  flagReason?: string | null;
  isRemoved: boolean;
  createdAt: string;
  doubtId: string;
  userId: string;
  user?: { id: string; name: string };
  isUpvoted?: boolean;
}

export interface Meeting {
  id: string;
  status: MeetingStatus;
  requestedTime: string;
  notes?: string | null;
  createdAt: string;
  studentId: string;
  facultyId: string;
  subjectId: string;
  slotId?: string | null;
  student?: { id: string; name: string; email?: string };
  faculty?: { id: string; name: string; email?: string };
  subject?: Subject;
  slot?: AvailabilitySlot | null;
}

export interface AvailabilitySlot {
  id: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface Notification {
  id: string;
  message: string;
  isRead: boolean;
  referenceId?: string | null;
  createdAt: string;
  userId: string;
}

// ─── API Response Types ──────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── Doubt API ───────────────────────────────────────────

export interface DoubtListResponse {
  doubts: Doubt[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SimilarDoubt {
  id: string;
  title: string;
  description: string;
  status: DoubtStatus;
  _count: { answers: number };
  similarityScore: number;
}

// ─── Notification API ────────────────────────────────────

export interface NotificationListResponse {
  notifications: Notification[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UnreadCountResponse {
  unreadCount: number;
}

// ─── Student API ─────────────────────────────────────────

export interface StudentStatsResponse {
  totalDoubts: number;
  openDoubts: number;
  answeredDoubts: number;
  resolvedDoubts: number;
  savedCount: number;
  recentDoubts: Doubt[];
}

export interface StudentAnalyticsResponse {
  doubts: {
    total: number;
    open: number;
    answered: number;
    resolved: number;
  };
  savedCount: number;
  avgTimeToAnswerHours: number;
}

// ─── Faculty API ─────────────────────────────────────────

export interface FacultyStatsResponse {
  answeredByMe: number;
  openInMySubjects: number;
  assignedSubjectCount: number;
  recentAnswers: Array<Answer & { doubt: Doubt }>;
}

export interface FacultySubjectsResponse {
  allSubjects: Subject[];
  assignedSubjectIds: string[];
}

export interface FacultyDirectoryItem {
  id: string;
  name: string;
  email: string;
  totalAnswers: number;
  upcomingSlots: AvailabilitySlot[];
  availableSlotCount: number;
}

export interface FacultyAnalyticsResponse {
  totalAnswers: number;
  avgUpvotesPerAnswer: number;
  answersBySubject: Array<{ name: string; count: number }>;
  avgResponseTimeHours: number;
}

// ─── Meeting API ─────────────────────────────────────────

export interface MeetingListResponse {
  meetings: Meeting[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateMeetingInput {
  facultyId: string;
  subjectId: string;
  slotId: string;
  notes?: string;
}

export interface UpdateMeetingInput {
  status: "ACCEPTED" | "REJECTED" | "RESCHEDULED";
  newRequestedTime?: string;
}

// ─── Admin API ───────────────────────────────────────────

export interface AdminUserItem extends User {
  _count: {
    doubts: number;
    answers: number;
  };
}

export interface AdminUserListResponse {
  users: AdminUserItem[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UpdateUserInput {
  role?: UserRole;
  isActive?: boolean;
}

export interface AdminSubjectItem extends Subject {
  _count: {
    doubts: number;
    chapters: number;
    faculty: number;
  };
}

export interface ModerationQueueResponse {
  flaggedDoubts: Doubt[];
  flaggedAnswers: Answer[];
  totalFlagged: number;
}

export interface ResolveModerationType {
  action: "clear" | "remove";
}

export interface AdminAnalyticsResponse {
  users: {
    total: number;
    students: number;
    faculty: number;
    admins: number;
  };
  doubts: {
    total: number;
    open: number;
    answered: number;
    resolved: number;
  };
  totalAnswers: number;
  avgTimeToFirstAnswerHours: number;
  subjectStats: Array<{
    id: string;
    name: string;
    _count: { doubts: number };
  }>;
  dailyDoubtTrend: Array<{ date: string; count: number }>;
}

// ─── AI API ──────────────────────────────────────────────

export interface GenerateTagsResponse {
  tags: string[];
}

export interface SummarizeResponse {
  summary: string;
  cached: boolean;
  note?: string;
}

// ─── Navigation ──────────────────────────────────────────

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

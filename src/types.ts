export type UserRole = 
  | 'SUPER_ADMIN' 
  | 'SCHOOL_ADMIN' 
  | 'TEACHER' 
  | 'ACCOUNTANT' 
  | 'PARENT' 
  | 'STUDENT' 
  | 'SCHOOL_OWNER';

export type RiskLevel = 'ON_TRACK' | 'NEEDS_ATTENTION' | 'AT_RISK';

export type AttendanceStatus = 'PRESENT' | 'LATE' | 'ABSENT' | 'EXCUSED';

export interface Student {
  id: string;
  name: string;
  admissionNo: string;
  class: string;
  arm: string; // e.g. SS2A, JSS3B
  gender: 'MALE' | 'FEMALE';
  avatar: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  overallAverage: number;
  projectedFinal: number;
  attendanceRate: number;
  assignmentCompletionRate: number;
  riskLevel: RiskLevel;
  riskScore: number; // 0 - 100
  riskDrivers: string[];
  positiveIndicators: string[];
  fees: {
    total: number;
    paid: number;
    outstanding: number;
    dueDate: string;
    status: 'PAID' | 'PARTIAL' | 'OVERDUE';
  };
}

export interface TopicMastery {
  id: string;
  name: string;
  masteryPercent: number;
  status: RiskLevel;
  commonMistakes?: string[];
  recommendedExercise?: string;
  teacherRecommendation?: string;
}

export interface SubjectPerformance {
  subject: string;
  code: string;
  currentScore: number;
  trend: number; // e.g. -7 or +4
  projectedScore: number;
  teacher: string;
  breakdown: {
    classwork: number;
    assignments: number;
    quizzes: number;
    examinations: number;
  };
  topics: TopicMastery[];
}

export interface AttendanceRecord {
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  arrivalTime?: string;
  expectedTime?: string;
  missedClass?: string;
  teacherNote?: string;
  subjectRecorded?: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  class: string;
  teacher: string;
  dueDate: string;
  status: 'UPCOMING' | 'DUE_TODAY' | 'SUBMITTED' | 'OVERDUE' | 'COMPLETED';
  score?: number;
  totalPoints: number;
  topic: string;
  isAiRecommended?: boolean;
  remedialFor?: string;
}

export interface GradebookEntry {
  studentId: string;
  studentName: string;
  admissionNo: string;
  classArm: string;
  cw1: number | null;
  cw2: number | null;
  quiz: number | null;
  exam: number | null;
  average: number;
  status: RiskLevel;
  topicWeakness?: string;
  suggestedIntervention?: string;
}

export interface Intervention {
  id: string;
  studentId: string;
  studentName: string;
  studentClass?: string;
  classArm?: string;
  subject?: string;
  title?: string;
  category?: 'ACADEMIC' | 'ATTENDANCE' | 'BEHAVIORAL' | 'COMBINED';
  riskScore?: number;
  reason?: string;
  recommendedAction?: string;
  aiRecommendedNotes?: string;
  assignedTeacher: string;
  status: 'PENDING_REVIEW' | 'APPROVED' | 'IN_PROGRESS' | 'COMPLETED' | 'MEASURING' | 'ACTIVE';
  outcomeVelocity?: string; // e.g. "+14% score recovery over 3 weeks"
  measurableVelocity?: string;
  actionPlan?: string[];
  startDate?: string;
  targetDate?: string;
  parentNotified?: boolean;
  outcomes?: any[];
  createdAt?: string;
  reviewedBy?: string;
  notes?: string;
}

export interface FeeTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'PAID' | 'PENDING' | 'OVERDUE' | 'FAILED';
  method: 'Card' | 'Bank Transfer' | 'USSD' | 'Cash/Cheque';
  receiptNo: string;
  studentName: string;
  studentClass: string;
}

export interface AiInsight {
  id: string;
  type: 'ACADEMIC' | 'ATTENDANCE' | 'RISK' | 'ENGAGEMENT' | 'FINANCE';
  title: string;
  summary: string;
  description?: string;
  metricChange?: number;
  suggestedAction?: string;
  confidence: number; // e.g. 78
  whatHappened: string;
  whyItMatters: string;
  supportingData: string[];
  recommendedAction: string;
  whoShouldAct: string;
  reviewTimeline: string;
  relatedStudentId?: string;
  relatedClass?: string;
}

export interface NotificationItem {
  id: string;
  category: 'ACADEMIC' | 'ATTENDANCE' | 'FINANCE' | 'ASSIGNMENT' | 'INTERVENTION' | 'SYSTEM' | 'AI_INSIGHT';
  title: string;
  message: string;
  timestamp: string;
  relatedStudent?: string;
  ctaLabel?: string;
  ctaAction?: string;
  read: boolean;
  priority?: 'HIGH' | 'MEDIUM' | 'NORMAL';
}

export interface AuditLogItem {
  id: string;
  user: string;
  role: string;
  action: string;
  student?: string;
  subject?: string;
  oldValue: string;
  newValue: string;
  timestamp: string;
  ip: string;
  module: string;
}

export interface PredictionHistoryItem {
  period: string;
  prediction: number;
  actual: number;
  error: number;
  confidence: number;
  modelVersion: string;
  date: string;
}

export interface ClassSummary {
  id: string;
  name: string;
  level: string; // JSS1, JSS2, JSS3, SS1, SS2, SS3
  studentCount: number;
  classTeacher: string;
  averageScore: number;
  attendanceRate: number;
  atRiskCount: number;
  topWeakness: string;
}

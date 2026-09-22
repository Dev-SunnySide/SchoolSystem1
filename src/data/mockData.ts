import { 
  Student, 
  SubjectPerformance, 
  AttendanceRecord, 
  Assignment, 
  GradebookEntry, 
  Intervention, 
  FeeTransaction, 
  AiInsight, 
  NotificationItem, 
  AuditLogItem, 
  PredictionHistoryItem, 
  ClassSummary 
} from '../types';

export const SCHOOL_INFO = {
  name: "Apex Crest Academy, Lagos",
  tagline: "Excellence in Academics & Moral Integrity",
  term: "First Term 2026/2027 Session",
  currentDate: "2026-09-21",
  address: "Plot 14 Admiralty Way, Lekki Phase 1, Lagos, Nigeria",
  phone: "+234 1 234 5678",
  email: "admin@apexcrestacademy.edu.ng",
  currency: "₦"
};

export const MOCK_STUDENTS: Student[] = [
  {
    id: "std-001",
    name: "John Attah",
    admissionNo: "ACA/2023/0481",
    class: "Senior Secondary",
    arm: "SS2A",
    gender: "MALE",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    parentName: "Mr. Emmanuel Attah",
    parentPhone: "+234 803 555 0192",
    parentEmail: "e.attah@gmail.com",
    overallAverage: 68,
    projectedFinal: 71,
    attendanceRate: 92,
    assignmentCompletionRate: 86,
    riskLevel: "ON_TRACK",
    riskScore: 28,
    riskDrivers: [
      "Mathematics quiz performance dropped 7% in week 3",
      "Late arrival recorded twice in September"
    ],
    positiveIndicators: [
      "Consistent high score in English Language (84%)",
      "Excellent classroom engagement in Physics",
      "100% submission rate in Chemistry assignments"
    ],
    fees: {
      total: 250000,
      paid: 180000,
      outstanding: 70000,
      dueDate: "2026-10-15",
      status: "PARTIAL"
    }
  },
  {
    id: "std-002",
    name: "Sarah Attah",
    admissionNo: "ACA/2024/0912",
    class: "Junior Secondary",
    arm: "JSS3B",
    gender: "FEMALE",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    parentName: "Mr. Emmanuel Attah",
    parentPhone: "+234 803 555 0192",
    parentEmail: "e.attah@gmail.com",
    overallAverage: 79,
    projectedFinal: 82,
    attendanceRate: 96,
    assignmentCompletionRate: 94,
    riskLevel: "ON_TRACK",
    riskScore: 14,
    riskDrivers: [],
    positiveIndicators: [
      "Ranked Top 3 in Basic Science and Technology",
      "Zero unexcused absences",
      "Active participant in STEM club"
    ],
    fees: {
      total: 220000,
      paid: 220000,
      outstanding: 0,
      dueDate: "2026-10-15",
      status: "PAID"
    }
  },
  {
    id: "std-003",
    name: "David Adeyemi",
    admissionNo: "ACA/2023/0488",
    class: "Senior Secondary",
    arm: "SS2A",
    gender: "MALE",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    parentName: "Chief Femi Adeyemi",
    parentPhone: "+234 802 331 4488",
    parentEmail: "femi.adeyemi@yahoo.com",
    overallAverage: 47,
    projectedFinal: 51,
    attendanceRate: 74,
    assignmentCompletionRate: 58,
    riskLevel: "AT_RISK",
    riskScore: 72,
    riskDrivers: [
      "Mathematics performance below threshold (43%)",
      "Four consecutive missed homework assignments",
      "High frequency of Monday morning tardiness",
      "Declining quiz scores over 4 assessments"
    ],
    positiveIndicators: [
      "Demonstrated interest in Visual Arts & Technical Drawing",
      "Courteous and cooperative when participating"
    ],
    fees: {
      total: 250000,
      paid: 100000,
      outstanding: 150000,
      dueDate: "2026-09-30",
      status: "OVERDUE"
    }
  },
  {
    id: "std-004",
    name: "Mary Okafor",
    admissionNo: "ACA/2023/0501",
    class: "Senior Secondary",
    arm: "SS2A",
    gender: "FEMALE",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    parentName: "Dr. Ngozi Okafor",
    parentPhone: "+234 803 777 2201",
    parentEmail: "n.okafor@medlagos.org",
    overallAverage: 89,
    projectedFinal: 92,
    attendanceRate: 98,
    assignmentCompletionRate: 98,
    riskLevel: "ON_TRACK",
    riskScore: 6,
    riskDrivers: [],
    positiveIndicators: [
      "Consistent Grade A across all 9 subjects",
      "Math Olympiad school representative",
      "Mentors peers in Biology study circle"
    ],
    fees: {
      total: 250000,
      paid: 250000,
      outstanding: 0,
      dueDate: "2026-10-15",
      status: "PAID"
    }
  },
  {
    id: "std-005",
    name: "Zainab Bello",
    admissionNo: "ACA/2023/0512",
    class: "Senior Secondary",
    arm: "SS2A",
    gender: "FEMALE",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    parentName: "Alhaji Musa Bello",
    parentPhone: "+234 805 112 9900",
    parentEmail: "musa.bello@consult.ng",
    overallAverage: 63,
    projectedFinal: 65,
    attendanceRate: 88,
    assignmentCompletionRate: 72,
    riskLevel: "NEEDS_ATTENTION",
    riskScore: 54,
    riskDrivers: [
      "Physics lab report submissions overdue",
      "Struggles with Algebraic graphing"
    ],
    positiveIndicators: [
      "Strong spoken English and debate performance",
      "Punctual attendance"
    ],
    fees: {
      total: 250000,
      paid: 200000,
      outstanding: 50000,
      dueDate: "2026-10-15",
      status: "PARTIAL"
    }
  }
];

export const MOCK_JOHN_SUBJECTS: SubjectPerformance[] = [
  {
    subject: "Mathematics",
    code: "MTH 201",
    currentScore: 58,
    trend: -7,
    projectedScore: 61,
    teacher: "Mrs. Funke Adebayo",
    breakdown: {
      classwork: 64,
      assignments: 52,
      quizzes: 57,
      examinations: 61
    },
    topics: [
      {
        id: "top-1",
        name: "Fractions & Algebraic Fractions",
        masteryPercent: 43,
        status: "AT_RISK",
        commonMistakes: [
          "Finding common denominators in algebraic terms",
          "Sign inversion when subtracting fractional expressions"
        ],
        recommendedExercise: "10-question stepped remedial worksheet on simplifying rational terms",
        teacherRecommendation: "Recommend peer-study buddy session with Mary Okafor and 15 mins daily practice on fractions."
      },
      {
        id: "top-2",
        name: "Simultaneous Equations",
        masteryPercent: 62,
        status: "NEEDS_ATTENTION",
        commonMistakes: [
          "Substitution arithmetic errors",
          "Selecting optimal elimination multiplier"
        ],
        recommendedExercise: "Elimination method drill with real-world word problems",
        teacherRecommendation: "Needs 2 guided practice sessions on word-problem translation."
      },
      {
        id: "top-3",
        name: "Euclidean Geometry & Circle Theorems",
        masteryPercent: 84,
        status: "ON_TRACK",
        commonMistakes: [
          "Tangent-chord angle theorem edge cases"
        ],
        recommendedExercise: "Advanced circle theorem proof challenges",
        teacherRecommendation: "Excels in geometric reasoning and construction."
      },
      {
        id: "top-4",
        name: "Descriptive Statistics",
        masteryPercent: 64,
        status: "NEEDS_ATTENTION",
        commonMistakes: [
          "Interpolating grouped frequency median"
        ],
        recommendedExercise: "Grouped data histogram and cumulative frequency graph exercise",
        teacherRecommendation: "Solid grasp of mean; needs refresher on ogive curves."
      }
    ]
  },
  {
    subject: "English Language",
    code: "ENG 201",
    currentScore: 84,
    trend: 6,
    projectedScore: 87,
    teacher: "Mr. Ibrahim Garba",
    breakdown: {
      classwork: 86,
      assignments: 88,
      quizzes: 82,
      examinations: 80
    },
    topics: [
      { id: "top-e1", name: "Essay & Expository Writing", masteryPercent: 88, status: "ON_TRACK" },
      { id: "top-e2", name: "Comprehension & Summary", masteryPercent: 85, status: "ON_TRACK" },
      { id: "top-e3", name: "Grammar & Register", masteryPercent: 80, status: "ON_TRACK" }
    ]
  },
  {
    subject: "Physics",
    code: "PHY 201",
    currentScore: 69,
    trend: 2,
    projectedScore: 72,
    teacher: "Engr. Patrick Okonkwo",
    breakdown: {
      classwork: 72,
      assignments: 68,
      quizzes: 65,
      examinations: 71
    },
    topics: [
      { id: "top-p1", name: "Kinematics & Projectiles", masteryPercent: 74, status: "ON_TRACK" },
      { id: "top-p2", name: "Optics & Reflection", masteryPercent: 68, status: "NEEDS_ATTENTION" },
      { id: "top-p3", name: "Electricity & Circuitry", masteryPercent: 65, status: "NEEDS_ATTENTION" }
    ]
  },
  {
    subject: "Chemistry",
    code: "CHM 201",
    currentScore: 71,
    trend: 3,
    projectedScore: 73,
    teacher: "Mrs. Blessing Danjuma",
    breakdown: {
      classwork: 75,
      assignments: 70,
      quizzes: 69,
      examinations: 70
    },
    topics: [
      { id: "top-c1", name: "Periodic Table & Bonding", masteryPercent: 82, status: "ON_TRACK" },
      { id: "top-c2", name: "Stoichiometry & Mole Concept", masteryPercent: 63, status: "NEEDS_ATTENTION" }
    ]
  },
  {
    subject: "Economics",
    code: "ECO 201",
    currentScore: 76,
    trend: 5,
    projectedScore: 78,
    teacher: "Mr. Segun Adeleke",
    breakdown: {
      classwork: 78,
      assignments: 80,
      quizzes: 74,
      examinations: 72
    },
    topics: [
      { id: "top-ec1", name: "Price Elasticity of Demand", masteryPercent: 78, status: "ON_TRACK" },
      { id: "top-ec2", name: "Market Structures", masteryPercent: 74, status: "ON_TRACK" }
    ]
  },
  {
    subject: "Computer Science",
    code: "CSC 201",
    currentScore: 82,
    trend: 4,
    projectedScore: 85,
    teacher: "Mr. Chinedu Eze",
    breakdown: {
      classwork: 84,
      assignments: 85,
      quizzes: 80,
      examinations: 79
    },
    topics: [
      { id: "top-cs1", name: "Python Algorithms & Loops", masteryPercent: 86, status: "ON_TRACK" },
      { id: "top-cs2", name: "Data Structures & Relational SQL", masteryPercent: 78, status: "ON_TRACK" }
    ]
  }
];

export const MOCK_ATTENDANCE_SEPTEMBER: AttendanceRecord[] = [
  { date: "2026-09-01", status: "PRESENT", arrivalTime: "07:35 AM", expectedTime: "07:45 AM" },
  { date: "2026-09-02", status: "PRESENT", arrivalTime: "07:40 AM", expectedTime: "07:45 AM" },
  { date: "2026-09-03", status: "PRESENT", arrivalTime: "07:32 AM", expectedTime: "07:45 AM" },
  { date: "2026-09-04", status: "PRESENT", arrivalTime: "07:41 AM", expectedTime: "07:45 AM" },
  { date: "2026-09-07", status: "PRESENT", arrivalTime: "07:38 AM", expectedTime: "07:45 AM" },
  { date: "2026-09-08", status: "PRESENT", arrivalTime: "07:42 AM", expectedTime: "07:45 AM" },
  { date: "2026-09-09", status: "PRESENT", arrivalTime: "07:36 AM", expectedTime: "07:45 AM" },
  { 
    date: "2026-09-10", 
    status: "LATE", 
    arrivalTime: "08:17 AM", 
    expectedTime: "07:45 AM", 
    missedClass: "Mathematics (Period 1)", 
    teacherNote: "Heavy traffic along Lekki-Epe expressway reported by parent. Student arrived halfway through Fractions review.",
    subjectRecorded: "Homeroom / Math"
  },
  { date: "2026-09-11", status: "PRESENT", arrivalTime: "07:39 AM", expectedTime: "07:45 AM" },
  { date: "2026-09-14", status: "PRESENT", arrivalTime: "07:30 AM", expectedTime: "07:45 AM" },
  { 
    date: "2026-09-15", 
    status: "ABSENT", 
    teacherNote: "Parent phoned office to log medical checkup. Medical certificate submitted to school nurse.",
    missedClass: "Full day (6 periods)"
  },
  { date: "2026-09-16", status: "PRESENT", arrivalTime: "07:44 AM", expectedTime: "07:45 AM" },
  { date: "2026-09-17", status: "PRESENT", arrivalTime: "07:35 AM", expectedTime: "07:45 AM" },
  { 
    date: "2026-09-18", 
    status: "LATE", 
    arrivalTime: "08:05 AM", 
    expectedTime: "07:45 AM", 
    missedClass: "Assembly & Form Period",
    teacherNote: "Late arrival due to car tire puncture."
  },
  { date: "2026-09-21", status: "PRESENT", arrivalTime: "07:38 AM", expectedTime: "07:45 AM" }
];

export const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: "asg-01",
    title: "Rational Algebraic Expressions Worksheet",
    subject: "Mathematics",
    class: "SS2A",
    teacher: "Mrs. Funke Adebayo",
    dueDate: "2026-09-23",
    status: "DUE_TODAY",
    totalPoints: 20,
    topic: "Fractions & Rational Terms",
    isAiRecommended: true,
    remedialFor: "Low Quiz 2 performance in Fractions"
  },
  {
    id: "asg-02",
    title: "Essay: Sustainable Energy Alternatives in Nigeria",
    subject: "English Language",
    class: "SS2A",
    teacher: "Mr. Ibrahim Garba",
    dueDate: "2026-09-26",
    status: "UPCOMING",
    totalPoints: 30,
    topic: "Expository Composition"
  },
  {
    id: "asg-03",
    title: "Projectile Trajectory Calculation Lab",
    subject: "Physics",
    class: "SS2A",
    teacher: "Engr. Patrick Okonkwo",
    dueDate: "2026-09-18",
    status: "SUBMITTED",
    score: 18,
    totalPoints: 20,
    topic: "Kinematics"
  },
  {
    id: "asg-04",
    title: "Stoichiometric Equations Practice",
    subject: "Chemistry",
    class: "SS2A",
    teacher: "Mrs. Blessing Danjuma",
    dueDate: "2026-09-14",
    status: "COMPLETED",
    score: 15,
    totalPoints: 20,
    topic: "Mole Concept"
  },
  {
    id: "asg-05",
    title: "Quadratic & Simultaneous Equations Problem Set",
    subject: "Mathematics",
    class: "SS2A",
    teacher: "Mrs. Funke Adebayo",
    dueDate: "2026-09-12",
    status: "OVERDUE",
    score: 0,
    totalPoints: 20,
    topic: "Simultaneous Equations"
  }
];

export const MOCK_GRADEBOOK_SS2A: GradebookEntry[] = [
  {
    studentId: "std-001",
    studentName: "John Attah",
    admissionNo: "ACA/2023/0481",
    classArm: "SS2A",
    cw1: 72,
    cw2: 68,
    quiz: 61,
    exam: null,
    average: 67,
    status: "ON_TRACK",
    topicWeakness: "Algebraic Fractions",
    suggestedIntervention: "15-minute stepped fractions remedial drill"
  },
  {
    studentId: "std-004",
    studentName: "Mary Okafor",
    admissionNo: "ACA/2023/0501",
    classArm: "SS2A",
    cw1: 89,
    cw2: 91,
    quiz: 87,
    exam: null,
    average: 89,
    status: "ON_TRACK"
  },
  {
    studentId: "std-003",
    studentName: "David Adeyemi",
    admissionNo: "ACA/2023/0488",
    classArm: "SS2A",
    cw1: 51,
    cw2: 46,
    quiz: 43,
    exam: null,
    average: 47,
    status: "AT_RISK",
    topicWeakness: "Fractions & Factorization",
    suggestedIntervention: "Immediate 1-on-1 teacher conference and targeted remedial worksheet"
  },
  {
    studentId: "std-005",
    studentName: "Zainab Bello",
    admissionNo: "ACA/2023/0512",
    classArm: "SS2A",
    cw1: 65,
    cw2: 62,
    quiz: 58,
    exam: null,
    average: 62,
    status: "NEEDS_ATTENTION",
    topicWeakness: "Simultaneous substitution",
    suggestedIntervention: "Peer review exercise and guided homework support"
  },
  {
    studentId: "std-006",
    studentName: "Chidi Eze",
    admissionNo: "ACA/2023/0520",
    classArm: "SS2A",
    cw1: 78,
    cw2: 74,
    quiz: 76,
    exam: null,
    average: 76,
    status: "ON_TRACK"
  },
  {
    studentId: "std-007",
    studentName: "Fatima Aliyu",
    admissionNo: "ACA/2023/0533",
    classArm: "SS2A",
    cw1: 59,
    cw2: 60,
    quiz: 54,
    exam: null,
    average: 58,
    status: "NEEDS_ATTENTION",
    topicWeakness: "Circle Theorems",
    suggestedIntervention: "Visual geometry review worksheet"
  },
  {
    studentId: "std-008",
    studentName: "Emeka Nwosu",
    admissionNo: "ACA/2023/0545",
    classArm: "SS2A",
    cw1: 82,
    cw2: 85,
    quiz: 79,
    exam: null,
    average: 82,
    status: "ON_TRACK"
  }
];

export const MOCK_INTERVENTIONS: Intervention[] = [
  {
    id: "int-101",
    studentId: "std-003",
    studentName: "David Adeyemi",
    studentClass: "SS2A",
    subject: "Mathematics",
    riskScore: 72,
    reason: "Consistent drop in Quiz (43%) and 4 consecutive missed homework submissions",
    recommendedAction: "Fractions Remedial Worksheet + 20-min weekly teacher clinic + Parent call",
    assignedTeacher: "Mrs. Funke Adebayo",
    status: "IN_PROGRESS",
    outcomeVelocity: "+9% improvement on weekly diagnostic check",
    createdAt: "2026-09-14",
    reviewedBy: "Vice Principal (Academics) Mr. Kolade",
    notes: "Chief Adeyemi acknowledged call. Home tutor instructed to enforce 45 min evening math schedule."
  },
  {
    id: "int-102",
    studentId: "std-001",
    studentName: "John Attah",
    studentClass: "SS2A",
    subject: "Mathematics",
    riskScore: 35,
    reason: "Declining quiz trend on Rational Algebraic terms (-7% over 4 assessments)",
    recommendedAction: "Targeted 10-Question Fractions Remedial Worksheet with step explanations",
    assignedTeacher: "Mrs. Funke Adebayo",
    status: "APPROVED",
    outcomeVelocity: "Pending assignment submission",
    createdAt: "2026-09-18",
    reviewedBy: "Mrs. Funke Adebayo"
  },
  {
    id: "int-103",
    studentId: "std-005",
    studentName: "Zainab Bello",
    studentClass: "SS2A",
    subject: "Physics",
    riskScore: 54,
    reason: "Missed 2 experimental lab summaries; scores fluctuating on kinematics",
    recommendedAction: "Peer study group assignment with Mary Okafor + Makeup lab session",
    assignedTeacher: "Engr. Patrick Okonkwo",
    status: "MEASURING",
    outcomeVelocity: "+14% score recovery over 2 weeks",
    createdAt: "2026-09-08",
    reviewedBy: "Engr. Patrick Okonkwo"
  },
  {
    id: "int-104",
    studentId: "std-007",
    studentName: "Fatima Aliyu",
    studentClass: "SS2A",
    subject: "Mathematics",
    riskScore: 48,
    reason: "Struggling with geometric theorems and angle proofs",
    recommendedAction: "Interactive visual geometry aids + Guided step-by-step proofs revision",
    assignedTeacher: "Mrs. Funke Adebayo",
    status: "PENDING_REVIEW",
    createdAt: "2026-09-20"
  }
];

export const MOCK_FEE_TRANSACTIONS: FeeTransaction[] = [
  {
    id: "txn-901",
    date: "2026-09-10",
    description: "Term 1 School Fees (Part Payment)",
    amount: 100000,
    status: "PAID",
    method: "Card",
    receiptNo: "REC-2026-09101",
    studentName: "John Attah",
    studentClass: "SS2A"
  },
  {
    id: "txn-902",
    date: "2026-08-02",
    description: "Annual Development & Capital Levy",
    amount: 50000,
    status: "PAID",
    method: "Bank Transfer",
    receiptNo: "REC-2026-08022",
    studentName: "John Attah",
    studentClass: "SS2A"
  },
  {
    id: "txn-903",
    date: "2026-07-10",
    description: "ICT & Science Laboratory Subscription",
    amount: 30000,
    status: "PAID",
    method: "Card",
    receiptNo: "REC-2026-07103",
    studentName: "John Attah",
    studentClass: "SS2A"
  },
  {
    id: "txn-904",
    date: "2026-09-14",
    description: "Term 1 Tuition Balance",
    amount: 70000,
    status: "PENDING",
    method: "Card",
    receiptNo: "INV-2026-09941",
    studentName: "John Attah",
    studentClass: "SS2A"
  }
];

export const MOCK_AI_INSIGHTS: AiInsight[] = [
  {
    id: "ins-01",
    type: "ACADEMIC",
    title: "Declining Mathematics Trajectory in SS2A",
    summary: "Your child's mathematics performance has declined over the last four assessments, primarily due to lower quiz scores and incomplete assignments.",
    confidence: 78,
    whatHappened: "John's Mathematics assessment score dropped from 65% to 58% over the past 4 weeks, with the steepest decline occurring in Fractions & Algebraic Fractions (43% mastery).",
    whyItMatters: "Fractions and algebraic expressions form 35% of the upcoming Mid-Term Examination syllabus and are foundational for higher-level calculus in SS3.",
    supportingData: [
      "Quiz 1: 68% → Quiz 2: 57% (-11% change)",
      "Homework 3: Not submitted (0/20)",
      "Attendance correlation: Missed 1 period of Fractions instruction on Sep 10 due to traffic"
    ],
    recommendedAction: "Complete the 10-question AI-generated remedial fractions worksheet; allocate 20 minutes daily for structured algebraic problem review.",
    whoShouldAct: "Student & Parent (with Teacher feedback)",
    reviewTimeline: "Review progress on September 28 diagnostic check",
    relatedStudentId: "std-001",
    relatedClass: "SS2A"
  },
  {
    id: "ins-02",
    type: "ACADEMIC",
    title: "Classwide Conceptual Bottleneck: Simultaneous Equations",
    summary: "38% of SS2A students struggled with simultaneous equations in the latest assessment.",
    confidence: 86,
    whatHappened: "In the latest common formative assessment, 14 out of 38 students scored below 50% on questions requiring the elimination method with fractional coefficients.",
    whyItMatters: "Without resolving this foundation, upcoming modules on quadratic curves and linear programming will exhibit cascading failures.",
    supportingData: [
      "Average class score on Question 4 (Word problem setup): 42%",
      "Common algebraic error: sign inversion during subtraction step (76% of incorrect answers)",
      "Top performers (Mary Okafor, Emeka Nwosu) solved via substitution in < 3 mins"
    ],
    recommendedAction: "Schedule a 30-minute interactive reteaching session focusing specifically on sign handling in elimination method, followed by small-group peer instruction.",
    whoShouldAct: "Mrs. Funke Adebayo (Subject Teacher)",
    reviewTimeline: "Next scheduled class: Wednesday 9:00 AM",
    relatedClass: "SS2A"
  },
  {
    id: "ins-03",
    type: "ENGAGEMENT",
    title: "Negative Engagement Velocity Alert: David Adeyemi",
    summary: "Significant decline in student engagement detected: Velocity -29% across 4 weeks.",
    confidence: 84,
    whatHappened: "Weekly assignment submission and attendance engagement dropped from 92% in Week 1 to 63% in Week 4 (-29% velocity).",
    whyItMatters: "Historical association detected: students with > 25% negative engagement velocity face an 82% probability of failing the end-of-term promotional threshold.",
    supportingData: [
      "Week 1: 92% participation",
      "Week 2: 88% participation",
      "Week 3: 76% participation",
      "Week 4: 63% participation (4 assignments skipped)"
    ],
    recommendedAction: "Immediate counselor/guardian conference. Do not apply punitive measures; investigate root cause (health, transport, or home environment).",
    whoShouldAct: "Head of Guidance & Counseling + Class Teacher",
    reviewTimeline: "Immediate action required (within 48 hours)",
    relatedStudentId: "std-003",
    relatedClass: "SS2A"
  },
  {
    id: "ins-04",
    type: "FINANCE",
    title: "Fee Collection Trend & Liquidity Projection",
    summary: "Current fee collection velocity is 8% ahead of same period in 2025/2026 session.",
    confidence: 91,
    whatHappened: "₦98,000,000 collected out of ₦125,000,000 expected (78.4% collection rate) with 24 days remaining until final term deadline.",
    whyItMatters: "Ensures operational reserves for scheduled laboratory ICT refurbishment and faculty professional development bonuses.",
    supportingData: [
      "Senior Secondary collection rate: 84.2%",
      "Junior Secondary collection rate: 71.6%",
      "Online payment gateway adoption: 74% (Card/Transfer)"
    ],
    recommendedAction: "Automate gentle SMS reminders for remaining ₦27M outstanding balances prior to the Oct 15 cutoff.",
    whoShouldAct: "Bursary & Accounts Department",
    reviewTimeline: "Weekly Bursary Audit"
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-01",
    category: "ACADEMIC",
    title: "Mathematics Performance Alert",
    message: "John's Mathematics performance has declined by 7% over the last four weeks. Remedial exercise available.",
    timestamp: "10 mins ago",
    relatedStudent: "John Attah (SS2A)",
    ctaLabel: "View Insight",
    ctaAction: "ai_insight",
    read: false,
    priority: "HIGH"
  },
  {
    id: "notif-02",
    category: "ASSIGNMENT",
    title: "New AI Remedial Assignment",
    message: "Mrs. Adebayo assigned 'Rational Algebraic Expressions Worksheet' due Sep 23.",
    timestamp: "1 hour ago",
    relatedStudent: "John Attah (SS2A)",
    ctaLabel: "View Assignment",
    ctaAction: "assignment",
    read: false,
    priority: "MEDIUM"
  },
  {
    id: "notif-03",
    category: "ATTENDANCE",
    title: "Late Arrival Recorded",
    message: "John was logged arriving at 8:17 AM on Sep 10 (Late by 32 minutes).",
    timestamp: "Sep 10, 2026",
    relatedStudent: "John Attah (SS2A)",
    ctaLabel: "View Attendance",
    ctaAction: "attendance",
    read: true,
    priority: "NORMAL"
  },
  {
    id: "notif-04",
    category: "FINANCE",
    title: "Payment Receipt Issued",
    message: "Payment of ₦100,000 received successfully for Term 1 Tuition. Receipt #REC-2026-09101.",
    timestamp: "Sep 10, 2026",
    relatedStudent: "John Attah (SS2A)",
    ctaLabel: "Download Receipt",
    ctaAction: "receipt",
    read: true,
    priority: "NORMAL"
  },
  {
    id: "notif-05",
    category: "ACADEMIC",
    title: "Commendation: English Language",
    message: "Sarah scored 92% on the Expository Writing Assessment, placing in the top 2% of JSS3.",
    timestamp: "Yesterday",
    relatedStudent: "Sarah Attah (JSS3B)",
    ctaLabel: "View Progress",
    ctaAction: "academics",
    read: false,
    priority: "NORMAL"
  }
];

export const MOCK_CLASSES: ClassSummary[] = [
  { id: "cls-01", name: "SS2A", level: "SS2", studentCount: 38, classTeacher: "Mrs. Funke Adebayo", averageScore: 68.4, attendanceRate: 91.2, atRiskCount: 3, topWeakness: "Simultaneous Equations" },
  { id: "cls-02", name: "SS2B", level: "SS2", studentCount: 36, classTeacher: "Mr. Tunde Bakare", averageScore: 71.0, attendanceRate: 93.5, atRiskCount: 2, topWeakness: "Physics Thermodynamics" },
  { id: "cls-03", name: "JSS3B", level: "JSS3", studentCount: 40, classTeacher: "Mrs. Ngozi Eke", averageScore: 76.8, attendanceRate: 94.6, atRiskCount: 1, topWeakness: "Introductory Chemistry" },
  { id: "cls-04", name: "SS3 Science", level: "SS3", studentCount: 34, classTeacher: "Dr. Alabi Johnson", averageScore: 74.2, attendanceRate: 95.1, atRiskCount: 2, topWeakness: "Organic Chemistry" },
  { id: "cls-05", name: "JSS1A", level: "JSS1", studentCount: 42, classTeacher: "Miss Amina Sule", averageScore: 78.5, attendanceRate: 96.0, atRiskCount: 0, topWeakness: "Fractions Addition" },
  { id: "cls-06", name: "SS1 Commerce", level: "SS1", studentCount: 35, classTeacher: "Mr. Segun Adeleke", averageScore: 65.1, attendanceRate: 88.4, atRiskCount: 4, topWeakness: "Bookkeeping Ledger" }
];

export const MOCK_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: "aud-001",
    user: "Mrs. Funke Adebayo",
    role: "TEACHER",
    action: "UPDATE_GRADE",
    student: "John Attah (ACA/2023/0481)",
    subject: "Mathematics",
    oldValue: "CW2: 60",
    newValue: "CW2: 68",
    timestamp: "2026-09-19 08:14:22",
    ip: "102.89.23.11 (Lekki, NG)",
    module: "Gradebook"
  },
  {
    id: "aud-002",
    user: "Mr. Kolade Adele",
    role: "SCHOOL_ADMIN",
    action: "CREATE_INTERVENTION",
    student: "David Adeyemi (ACA/2023/0488)",
    subject: "Mathematics",
    oldValue: "Status: Unflagged",
    newValue: "Status: High Risk - Remedial Clinic Assigned",
    timestamp: "2026-09-18 14:02:11",
    ip: "197.210.45.90 (Victoria Island, NG)",
    module: "Intervention Center"
  },
  {
    id: "aud-003",
    user: "Mrs. Folashade Coker",
    role: "ACCOUNTANT",
    action: "RECORD_FEE_PAYMENT",
    student: "John Attah (ACA/2023/0481)",
    subject: "Bursary",
    oldValue: "Outstanding: ₦170,000",
    newValue: "Outstanding: ₦70,000 (Paid ₦100,000)",
    timestamp: "2026-09-10 11:30:45",
    ip: "102.89.44.102 (Lagos, NG)",
    module: "Finance / Invoicing"
  },
  {
    id: "aud-004",
    user: "Mrs. Funke Adebayo",
    role: "TEACHER",
    action: "SUBMIT_ATTENDANCE",
    student: "SS2A Class (38 Students)",
    subject: "Morning Roll Call",
    oldValue: "Draft status",
    newValue: "Finalized: 35 Present, 2 Late, 1 Absent",
    timestamp: "2026-09-10 08:45:10",
    ip: "102.89.23.11 (Lekki, NG)",
    module: "Attendance"
  },
  {
    id: "aud-005",
    user: "SuperAdmin - Dr. K. Balogun",
    role: "SUPER_ADMIN",
    action: "MODIFY_RBAC_POLICY",
    student: "N/A",
    subject: "System Security",
    oldValue: "Teachers: View Financials (NO)",
    newValue: "Verified Strict Financial Sandbox for Teachers",
    timestamp: "2026-09-01 09:12:00",
    ip: "105.112.18.4 (Ikoyi, NG)",
    module: "RBAC Management"
  }
];

export const MOCK_PREDICTION_HISTORY: PredictionHistoryItem[] = [
  { period: "Week 4", prediction: 71, actual: 70, error: 1.0, confidence: 82, modelVersion: "EduPredict v2.4", date: "2026-09-05" },
  { period: "Week 6", prediction: 67, actual: 66, error: 1.0, confidence: 85, modelVersion: "EduPredict v2.4", date: "2026-09-12" },
  { period: "Week 8 (Projected)", prediction: 63, actual: 61, error: 2.0, confidence: 78, modelVersion: "EduPredict v2.4", date: "2026-09-19" },
  { period: "Term Final Forecast", prediction: 61, actual: 0, error: 0.0, confidence: 78, modelVersion: "EduPredict v2.4", date: "2026-10-25" }
];

export const MOCK_HISTORICAL_PREDICTIONS = [
  { week: "Week 4 Diagnostic", predicted: 64, actual: 61, error: -3, confidence: 82, notes: "Early term baseline assessment across SS2A mathematics" },
  { week: "Week 6 Formative Quiz", predicted: 63, actual: 64, error: 1, confidence: 86, notes: "Calibration stabilized following CW2 submission adjustments" },
  { week: "Week 8 Mid-Term Exam", predicted: 65, actual: 66, error: 1, confidence: 89, notes: "High model confidence; aligns with remedial clinic progress" }
];

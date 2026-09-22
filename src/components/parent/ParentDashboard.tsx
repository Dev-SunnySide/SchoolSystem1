import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Calendar, 
  CreditCard, 
  BookOpen, 
  CheckSquare, 
  ChevronRight, 
  ArrowUpRight, 
  ExternalLink,
  Clock,
  Download,
  Info,
  Layers,
  Award
} from 'lucide-react';
import { Student, SubjectPerformance, TopicMastery, AttendanceRecord } from '../../types';
import { MOCK_STUDENTS, MOCK_JOHN_SUBJECTS, MOCK_ATTENDANCE_SEPTEMBER, MOCK_ASSIGNMENTS, MOCK_FEE_TRANSACTIONS, SCHOOL_INFO } from '../../data/mockData';
import { RiskBadge, ExplainabilityCard, Drawer, Modal } from '../common/UIComponents';

interface ParentDashboardProps {
  onNavigate: (section: string) => void;
  onOpenPaymentModal: () => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  onNavigate,
  onOpenPaymentModal
}) => {
  // Student Switcher (John Attah SS2A vs Sarah Attah JSS3B)
  const [selectedStudentId, setSelectedStudentId] = useState<string>('std-001');
  const [trendTimeframe, setTrendTimeframe] = useState<'4w' | '8w' | 'term'>('4w');
  const [selectedTopic, setSelectedTopic] = useState<TopicMastery | null>(null);
  const [isWhyPanelOpen, setIsWhyPanelOpen] = useState(false);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<AttendanceRecord | null>(null);

  const currentStudent = MOCK_STUDENTS.find(s => s.id === selectedStudentId) || MOCK_STUDENTS[0];
  const otherStudent = MOCK_STUDENTS.find(s => s.id !== selectedStudentId && s.parentName === currentStudent.parentName) || MOCK_STUDENTS[1];

  // Academic trend data points for chart
  const trendData = {
    '4w': [
      { week: 'Wk 1', score: 74, projected: 73 },
      { week: 'Wk 2', score: 71, projected: 72 },
      { week: 'Wk 3', score: 65, projected: 69 },
      { week: 'Wk 4', score: 68, projected: 71 }
    ],
    '8w': [
      { week: 'Wk 1', score: 78, projected: 77 },
      { week: 'Wk 2', score: 75, projected: 76 },
      { week: 'Wk 3', score: 74, projected: 74 },
      { week: 'Wk 4', score: 71, projected: 73 },
      { week: 'Wk 5', score: 69, projected: 71 },
      { week: 'Wk 6', score: 65, projected: 70 },
      { week: 'Wk 7', score: 67, projected: 70 },
      { week: 'Wk 8', score: 68, projected: 71 }
    ],
    'term': [
      { week: 'Sep W1', score: 74, projected: 73 },
      { week: 'Sep W2', score: 71, projected: 72 },
      { week: 'Sep W3', score: 65, projected: 69 },
      { week: 'Sep W4', score: 68, projected: 71 },
      { week: 'Midterm (Proj)', score: null, projected: 70 },
      { week: 'Final (Proj)', score: null, projected: 71 }
    ]
  };

  const activeTrend = trendData[trendTimeframe];

  return (
    <div className="space-y-6">
      
      {/* 1. Parent Welcome Header & Student Selector */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Parent Portal • {SCHOOL_INFO.term}
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mt-0.5">
              Good morning, {currentStudent.parentName}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Active student view: <strong className="text-slate-800">{currentStudent.name}</strong> ({currentStudent.arm})
            </p>
          </div>

          {/* Student Selector Switcher */}
          <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
            <span className="text-[11px] font-medium text-slate-500 pl-2">Child:</span>
            <button
              id="switch-child-john"
              onClick={() => setSelectedStudentId('std-001')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                selectedStudentId === 'std-001'
                  ? 'bg-white text-indigo-700 shadow-xs border border-indigo-100'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                J
              </div>
              <span>John Attah (SS2A)</span>
            </button>

            <button
              id="switch-child-sarah"
              onClick={() => setSelectedStudentId('std-002')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                selectedStudentId === 'std-002'
                  ? 'bg-white text-indigo-700 shadow-xs border border-indigo-100'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                S
              </div>
              <span>Sarah Attah (JSS3B)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Three Core Questions at a Glance (Current Trajectory Card) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Trajectory Status */}
        <div className="bg-gradient-to-br from-indigo-900 via-indigo-850 to-slate-900 text-white rounded-2xl p-5 shadow-sm md:col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-indigo-200 uppercase tracking-wider">Overall Trajectory</span>
              <RiskBadge level={currentStudent.riskLevel} size="sm" />
            </div>
            <div className="text-3xl font-black font-display tracking-tight text-white mt-2">
              {currentStudent.overallAverage}%
            </div>
            <div className="text-xs text-indigo-200 mt-1 flex items-center gap-1">
              <span>Projected Final:</span>
              <strong className="text-white text-sm font-semibold">{currentStudent.projectedFinal}%</strong>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-indigo-800/60">
            <div className="flex items-center justify-between text-xs text-indigo-200 mb-1.5">
              <span>Term Progress</span>
              <span className="text-white font-medium">Week 4 of 12</span>
            </div>
            <div className="w-full bg-indigo-950 rounded-full h-2 overflow-hidden border border-indigo-800">
              <div className="bg-emerald-400 h-full rounded-full transition-all" style={{ width: '33%' }} />
            </div>
            <p className="text-[11px] text-indigo-300 mt-2 leading-relaxed">
              {currentStudent.riskLevel === 'ON_TRACK'
                ? "Academic performance is within expected promotional parameters."
                : "Intervention required to stabilize subject averages."}
            </p>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              <span>Attendance Rate</span>
              <Calendar className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-slate-900 font-display">
              {currentStudent.attendanceRate}%
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>2 Late • 1 Medical Absence</span>
            <span className="text-emerald-600 font-semibold">Above 90% Target</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              <span>Assignments</span>
              <CheckSquare className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-slate-900 font-display">
              {currentStudent.assignmentCompletionRate}%
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>4 Completed • 1 Due Today</span>
            <button 
              onClick={() => onNavigate('assignments')}
              className="text-indigo-600 font-semibold hover:underline"
            >
              View (1)
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              <span>Term Fees Status</span>
              <CreditCard className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-slate-900 font-display">
              ₦{currentStudent.fees.outstanding.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Outstanding of ₦{currentStudent.fees.total.toLocaleString()}
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">Due 15 Oct</span>
            {currentStudent.fees.outstanding > 0 ? (
              <button
                id="parent-quick-pay-btn"
                onClick={onOpenPaymentModal}
                className="px-2.5 py-1 rounded-md bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition cursor-pointer shadow-xs"
              >
                Pay Now
              </button>
            ) : (
              <span className="text-xs font-semibold text-emerald-600">Fully Cleared</span>
            )}
          </div>
        </div>

      </div>

      {/* 3. Attention Required & Positive Development Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Attention Required Card */}
        <div className="bg-rose-50/60 rounded-2xl border border-rose-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded-md bg-rose-100 text-rose-700">
              <AlertCircle className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-rose-950 uppercase tracking-wider">
              Attention Required
            </h3>
          </div>
          <div className="flex items-start justify-between gap-3 bg-white p-3.5 rounded-xl border border-rose-100 mt-2">
            <div>
              <div className="text-sm font-bold text-slate-900">
                🔴 Mathematics requires attention
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Current average: <strong className="text-slate-900">58%</strong> • Trend: <strong className="text-rose-600">↓ 7% over 4 weeks</strong>
              </p>
              <div className="text-xs text-slate-500 mt-1">
                Weakness isolated: <strong>Fractions & Algebraic Fractions (43% mastery)</strong>
              </div>
            </div>
            <button
              id="view-math-mastery-btn"
              onClick={() => onNavigate('academics')}
              className="shrink-0 px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition cursor-pointer shadow-xs"
            >
              Examine
            </button>
          </div>
        </div>

        {/* Positive Development Card */}
        <div className="bg-emerald-50/60 rounded-2xl border border-emerald-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded-md bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-emerald-950 uppercase tracking-wider">
              Positive Development
            </h3>
          </div>
          <div className="flex items-start justify-between gap-3 bg-white p-3.5 rounded-xl border border-emerald-100 mt-2">
            <div>
              <div className="text-sm font-bold text-slate-900">
                ✓ English Language performance improving
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Current average: <strong className="text-slate-900">84%</strong> • Trend: <strong className="text-emerald-600">↑ 6% gain</strong>
              </p>
              <div className="text-xs text-slate-500 mt-1">
                Ranked in top 5% of SS2 for Expository Composition & Register.
              </div>
            </div>
            <button
              id="view-english-mastery-btn"
              onClick={() => onNavigate('academics')}
              className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition cursor-pointer shadow-xs"
            >
              View
            </button>
          </div>
        </div>

      </div>

      {/* 4. AI Insight Banner with "Why am I seeing this?" */}
      <div className="bg-white rounded-2xl border border-indigo-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                  Automated AI Academic Diagnostic
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 font-semibold">
                  78% Confidence
                </span>
              </div>
              <p className="text-sm text-slate-800 font-medium mt-1 leading-relaxed">
                "Your child's mathematics performance has declined over the last four assessments, primarily due to lower quiz scores and incomplete assignments."
              </p>
            </div>
          </div>

          <button
            id="parent-why-seeing-this-btn"
            onClick={() => setIsWhyPanelOpen(true)}
            className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 text-xs font-semibold transition cursor-pointer shadow-2xs"
          >
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            <span>Why am I seeing this?</span>
          </button>
        </div>
      </div>

      {/* 5. Academic Performance Over Time (Interactive Chart) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-display">Academic Performance Trend</h2>
            <p className="text-xs text-slate-500">Weekly recorded average vs projected promotional benchmark</p>
          </div>

          {/* Timeframe switch */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
            <button
              onClick={() => setTrendTimeframe('4w')}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                trendTimeframe === '4w' ? 'bg-white text-indigo-700 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              4 Weeks
            </button>
            <button
              onClick={() => setTrendTimeframe('8w')}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                trendTimeframe === '8w' ? 'bg-white text-indigo-700 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              8 Weeks
            </button>
            <button
              onClick={() => setTrendTimeframe('term')}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                trendTimeframe === 'term' ? 'bg-white text-indigo-700 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              Full Term
            </button>
          </div>
        </div>

        {/* Clean SVG Trend Chart */}
        <div className="h-56 w-full pt-4">
          <div className="h-full flex items-end gap-3 sm:gap-6 justify-between px-2 sm:px-6 border-b border-slate-200 pb-2 relative">
            
            {/* Target 70% threshold line */}
            <div className="absolute left-0 right-0 top-[30%] border-b border-dashed border-slate-300 pointer-events-none">
              <span className="text-[10px] font-semibold text-slate-400 absolute right-2 -top-4">
                Promotional Benchmark: 70%
              </span>
            </div>

            {activeTrend.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                
                {/* Score value hover tooltip */}
                <div className="mb-2 opacity-90 group-hover:scale-110 transition-transform text-center">
                  {item.score !== null ? (
                    <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded shadow-2xs">
                      {item.score}%
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded shadow-2xs">
                      ~{item.projected}%
                    </span>
                  )}
                </div>

                {/* Bar/Pillar */}
                <div className="w-full max-w-[40px] flex items-end justify-center h-40">
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      item.score !== null
                        ? item.score >= 70 ? 'bg-indigo-600' : 'bg-amber-500'
                        : 'bg-indigo-300 border-2 border-dashed border-indigo-400'
                    }`}
                    style={{ height: `${(item.score ?? item.projected) * 1.3}px` }}
                  />
                </div>

                {/* X Axis Label */}
                <span className="text-[11px] font-medium text-slate-500 mt-2 whitespace-nowrap">
                  {item.week}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 mt-4 px-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-indigo-600" />
              <span>Above Target (≥70%)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-amber-500" />
              <span>Needs Attention (&lt;70%)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-indigo-300 border border-dashed border-indigo-400" />
              <span>Projected Forecast</span>
            </span>
          </div>
          <button
            onClick={() => onNavigate('predictive')}
            className="text-indigo-600 font-semibold hover:underline inline-flex items-center gap-1"
          >
            <span>View Predictive Model</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 6. Subject Drilldown & Topic Mastery Hierarchy */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-display">Subject Hierarchy & Topic Mastery</h2>
            <p className="text-xs text-slate-500">Hierarchy: Subject → Assessment → Topic → Trend</p>
          </div>
          <button
            onClick={() => onNavigate('academics')}
            className="text-xs text-indigo-600 font-semibold hover:underline"
          >
            All 6 Subjects →
          </button>
        </div>

        <div className="space-y-4">
          {MOCK_JOHN_SUBJECTS.slice(0, 3).map((sub) => (
            <div 
              key={sub.code}
              className="border border-slate-200 rounded-xl p-4.5 hover:border-slate-300 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{sub.subject}</span>
                    <span className="text-[11px] text-slate-400 font-mono">({sub.code})</span>
                    <span className="text-xs text-slate-500">• Teacher: {sub.teacher}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span>Classwork: <strong>{sub.breakdown.classwork}%</strong></span>
                    <span>Assignments: <strong>{sub.breakdown.assignments}%</strong></span>
                    <span>Quizzes: <strong>{sub.breakdown.quizzes}%</strong></span>
                    <span>Exams: <strong>{sub.breakdown.examinations}%</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-lg font-bold text-slate-900">{sub.currentScore}%</div>
                    <div className="text-[11px] text-slate-500">
                      Trend: <span className={sub.trend >= 0 ? "text-emerald-600 font-bold" : "text-rose-600 font-bold"}>
                        {sub.trend > 0 ? `+${sub.trend}%` : `${sub.trend}%`}
                      </span>
                    </div>
                  </div>
                  <div className="text-right pl-3 border-l border-slate-200">
                    <div className="text-xs text-slate-400 font-medium">Projected</div>
                    <div className="text-sm font-bold text-indigo-700">{sub.projectedScore}%</div>
                  </div>
                </div>
              </div>

              {/* Topics breakdown chips */}
              <div className="mt-3">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Topic Mastery Levels:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                  {sub.topics.map(topic => (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic)}
                      className="text-left p-2.5 rounded-lg border border-slate-100 bg-slate-50/70 hover:bg-indigo-50/50 hover:border-indigo-200 transition cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-800 truncate pr-1">{topic.name}</span>
                        <RiskBadge level={topic.status} size="sm" showIcon={false} />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>Mastery:</span>
                        <span className="font-bold text-slate-700">{topic.masteryPercent}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1 mt-1.5 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            topic.masteryPercent >= 75 ? 'bg-emerald-500' : topic.masteryPercent >= 55 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${topic.masteryPercent}%` }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Interactive Attendance Calendar Preview (September 2026) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-display">Attendance Calendar • September 2026</h2>
            <p className="text-xs text-slate-500">Click any date to inspect arrival times, notes, and missed periods.</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 font-medium text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Present (12)
            </span>
            <span className="flex items-center gap-1 font-medium text-amber-700">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Late (2)
            </span>
            <span className="flex items-center gap-1 font-medium text-rose-700">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> Absent (1)
            </span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-5 gap-2 text-center text-xs">
          {['MON', 'TUE', 'WED', 'THU', 'FRI'].map(day => (
            <div key={day} className="py-1 font-bold text-slate-400 text-[11px] uppercase tracking-wider">
              {day}
            </div>
          ))}

          {MOCK_ATTENDANCE_SEPTEMBER.map((rec, idx) => {
            const dayNum = parseInt(rec.date.split('-')[2]);
            const isLate = rec.status === 'LATE';
            const isAbsent = rec.status === 'ABSENT';

            return (
              <button
                key={idx}
                id={`calendar-day-${rec.date}`}
                onClick={() => setSelectedCalendarDate(rec)}
                className={`p-3 rounded-xl border transition-all text-left flex flex-col justify-between h-20 cursor-pointer ${
                  isLate 
                    ? 'bg-amber-50/80 border-amber-200 hover:border-amber-300' 
                    : isAbsent 
                    ? 'bg-rose-50/80 border-rose-200 hover:border-rose-300' 
                    : 'bg-emerald-50/40 border-emerald-100 hover:border-emerald-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-sm">{dayNum}</span>
                  <span className={`w-2 h-2 rounded-full ${
                    isLate ? 'bg-amber-500' : isAbsent ? 'bg-rose-500' : 'bg-emerald-500'
                  }`} />
                </div>
                <div className="text-[10px] font-medium">
                  {isLate ? (
                    <span className="text-amber-800 font-bold">Late (8:17a)</span>
                  ) : isAbsent ? (
                    <span className="text-rose-800 font-bold">Medical Exc.</span>
                  ) : (
                    <span className="text-emerald-700">On Time</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>
            <strong>Association Note:</strong> Historical data shows a data-supported correlation between punctual Monday morning arrival and higher quiz retention (association, not proof of causation).
          </span>
          <button
            onClick={() => onNavigate('attendance')}
            className="text-indigo-600 font-semibold hover:underline shrink-0 ml-2"
          >
            Full Calendar →
          </button>
        </div>
      </div>

      {/* 8. DRAWER: "Why am I seeing this?" AI Explanation Drawer */}
      <Drawer
        id="ai-why-drawer"
        isOpen={isWhyPanelOpen}
        onClose={() => setIsWhyPanelOpen(false)}
        title="Why am I seeing this AI recommendation?"
        subtitle="Transparent diagnostic reasoning behind John's mathematics alert"
      >
        <ExplainabilityCard
          id="john-math-explain-card"
          title="Mathematics Trend Diagnostic"
          confidence={78}
          whatHappened="John's mathematics assessment average fell from 65% to 58% across the past 4 weeks, with the steepest decline occurring in Fractions & Algebraic Fractions (43% mastery)."
          whyItMatters="Fractions and algebraic simplification form 35% of the upcoming Mid-Term Examination syllabus and are foundational prerequisites for SS3 Calculus."
          supportingData={[
            "Quiz 1: 68% → Quiz 2: 57% (-11% change)",
            "Homework 3: Not submitted (0/20 points)",
            "Attendance: Arrived 32 mins late during Period 1 Fractions lesson on Sep 10"
          ]}
          recommendedAction="Complete the 10-question AI-generated remedial fractions worksheet; allocate 20 minutes daily for structured algebraic problem review."
          whoShouldAct="Student & Parent (supported by Mrs. Adebayo)"
          reviewTimeline="Re-evaluate during Sep 28 diagnostic review"
          onTakeAction={() => {
            setIsWhyPanelOpen(false);
            onNavigate('assignments');
          }}
          actionLabel="Open Remedial Fractions Worksheet"
        />

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
          <div className="font-bold text-slate-900 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-indigo-600" />
            <span>Ethical Safeguard & AI Governance</span>
          </div>
          <p className="leading-relaxed">
            This platform uses predictive models purely for early supportive intervention. AI predictions are never used to penalize, grade, stream, or punish students. Every recommendation requires human teacher review.
          </p>
        </div>
      </Drawer>

      {/* 9. DRAWER: Concept Mastery Drilldown */}
      <Drawer
        id="concept-mastery-drawer"
        isOpen={!!selectedTopic}
        onClose={() => setSelectedTopic(null)}
        title={selectedTopic?.name || "Topic Mastery"}
        subtitle="Concept diagnosis, common pitfalls, and targeted exercises"
      >
        {selectedTopic && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Mastery Score</span>
                <span className="text-2xl font-bold font-display text-slate-900">{selectedTopic.masteryPercent}%</span>
              </div>
              <RiskBadge level={selectedTopic.status} />
            </div>

            {selectedTopic.commonMistakes && (
              <div className="p-4 rounded-xl border border-rose-100 bg-rose-50/50">
                <span className="font-bold text-rose-900 block mb-1">Identified Pitfalls & Common Mistakes</span>
                <ul className="list-disc list-inside text-slate-700 space-y-1">
                  {selectedTopic.commonMistakes.map((m, idx) => (
                    <li key={idx}>{m}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedTopic.recommendedExercise && (
              <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/50">
                <span className="font-bold text-indigo-900 block mb-1">Recommended Remedial Activity</span>
                <p className="text-slate-700">{selectedTopic.recommendedExercise}</p>
              </div>
            )}

            {selectedTopic.teacherRecommendation && (
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <span className="font-bold text-slate-800 block mb-1">Teacher's Note (Mrs. Adebayo)</span>
                <p className="text-slate-600 italic">"{selectedTopic.teacherRecommendation}"</p>
              </div>
            )}

            <button
              onClick={() => {
                setSelectedTopic(null);
                onNavigate('assignments');
              }}
              className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700 transition shadow-xs cursor-pointer text-center"
            >
              Start Practice Session
            </button>
          </div>
        )}
      </Drawer>

      {/* 10. MODAL: Attendance Day Inspection Modal */}
      <Modal
        id="attendance-day-modal"
        isOpen={!!selectedCalendarDate}
        onClose={() => setSelectedCalendarDate(null)}
        title={`Attendance Record: ${selectedCalendarDate?.date}`}
        subtitle={`Recorded by Form Teacher: ${selectedCalendarDate?.subjectRecorded || 'Homeroom'}`}
      >
        {selectedCalendarDate && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Status</span>
                <span className={`font-bold text-sm ${
                  selectedCalendarDate.status === 'LATE' ? 'text-amber-700' : selectedCalendarDate.status === 'ABSENT' ? 'text-rose-700' : 'text-emerald-700'
                }`}>
                  {selectedCalendarDate.status}
                </span>
              </div>
              {selectedCalendarDate.arrivalTime && (
                <div className="text-right">
                  <span className="text-[11px] text-slate-500 block">Arrival Time</span>
                  <span className="font-bold text-slate-900">{selectedCalendarDate.arrivalTime}</span>
                  <span className="text-[10px] text-slate-400 block">(Expected: {selectedCalendarDate.expectedTime})</span>
                </div>
              )}
            </div>

            {selectedCalendarDate.missedClass && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                <span className="font-bold block mb-0.5">Missed Instruction:</span>
                <span>{selectedCalendarDate.missedClass}</span>
              </div>
            )}

            {selectedCalendarDate.teacherNote && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">Teacher / Office Note:</span>
                <p className="text-slate-600 italic">"{selectedCalendarDate.teacherNote}"</p>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedCalendarDate(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-white font-medium text-xs hover:bg-slate-900 transition"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

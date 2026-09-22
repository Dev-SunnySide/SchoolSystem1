import React from 'react';
import { 
  CalendarCheck, 
  ClipboardCheck, 
  CheckSquare, 
  Sparkles, 
  Users, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  BookOpen, 
  Bell,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { MOCK_STUDENTS, MOCK_AI_INSIGHTS, MOCK_ASSIGNMENTS, SCHOOL_INFO } from '../../data/mockData';
import { RiskBadge, KpiCard } from '../common/UIComponents';

interface TeacherDashboardProps {
  onNavigate: (section: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  onNavigate
}) => {
  const atRiskStudents = MOCK_STUDENTS.filter(s => s.riskLevel !== 'ON_TRACK');

  return (
    <div className="space-y-6">
      {/* Teacher Greeting & Quick Actions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Faculty Cockpit • {SCHOOL_INFO.term}
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mt-0.5">
              Welcome back, Mrs. Funke Adebayo
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Mathematics & Further Math Faculty • Form Teacher: <strong>SS2A (38 Enrolled)</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Period 1 Roll Call Pending</span>
            </span>
          </div>
        </div>

        {/* 4 Quick Actions Header */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-100">
          <button
            id="qa-take-attendance"
            onClick={() => onNavigate('attendance')}
            className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100/70 text-indigo-900 transition flex items-center gap-3 cursor-pointer group shadow-2xs"
          >
            <div className="p-2 rounded-lg bg-indigo-600 text-white shrink-0 group-hover:scale-105 transition-transform">
              <CalendarCheck className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold">Take Attendance</div>
              <div className="text-[10px] text-indigo-700">SS2A Period 1</div>
            </div>
          </button>

          <button
            id="qa-enter-grades"
            onClick={() => onNavigate('gradebook')}
            className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 transition flex items-center gap-3 cursor-pointer group shadow-2xs"
          >
            <div className="p-2 rounded-lg bg-emerald-600 text-white shrink-0 group-hover:scale-105 transition-transform">
              <ClipboardCheck className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold">Enter Grades</div>
              <div className="text-[10px] text-slate-500">Continuous Assessment</div>
            </div>
          </button>

          <button
            id="qa-create-assignment"
            onClick={() => onNavigate('ai-assistant')}
            className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 transition flex items-center gap-3 cursor-pointer group shadow-2xs"
          >
            <div className="p-2 rounded-lg bg-violet-600 text-white shrink-0 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold">AI Worksheet Copilot</div>
              <div className="text-[10px] text-slate-500">Targeted Remedial</div>
            </div>
          </button>

          <button
            id="qa-view-insights"
            onClick={() => onNavigate('class-insights')}
            className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 transition flex items-center gap-3 cursor-pointer group shadow-2xs"
          >
            <div className="p-2 rounded-lg bg-amber-600 text-white shrink-0 group-hover:scale-105 transition-transform">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold">Class Bottlenecks</div>
              <div className="text-[10px] text-slate-500">SS2A 38% Simultaneous</div>
            </div>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          id="teacher-kpi-attendance"
          title="Today's Attendance (SS2A)"
          value="Pending"
          subtitle="38 students awaiting mark"
          riskState="NEEDS_ATTENTION"
          icon={<CalendarCheck className="w-4 h-4 text-amber-600" />}
          onClick={() => onNavigate('attendance')}
        />
        <KpiCard
          id="teacher-kpi-class-avg"
          title="Class Average (Math)"
          value="68.4%"
          change={-2.1}
          changeDirection="down"
          changePeriod="vs previous quiz"
          icon={<BookOpen className="w-4 h-4 text-indigo-600" />}
        />
        <KpiCard
          id="teacher-kpi-at-risk"
          title="Requiring Attention"
          value="3 Students"
          subtitle="David Adeyemi, Zainab Bello..."
          riskState="AT_RISK"
          icon={<AlertCircle className="w-4 h-4 text-rose-600" />}
          onClick={() => onNavigate('interventions')}
        />
        <KpiCard
          id="teacher-kpi-assignments"
          title="Assignments Active"
          value="2 Pending"
          subtitle="Rational Fractions Worksheet"
          icon={<CheckSquare className="w-4 h-4 text-emerald-600" />}
          onClick={() => onNavigate('assignments')}
        />
      </div>

      {/* Main Grid: Today's Schedule & Students Requiring Attention */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Students Requiring Attention & AI Class Insight */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Students Requiring Attention */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Students Requiring Attention</h2>
                <p className="text-xs text-slate-500">Auto-flagged based on continuous assessment drops and missing homework</p>
              </div>
              <button
                onClick={() => onNavigate('interventions')}
                className="text-xs text-indigo-600 font-semibold hover:underline"
              >
                Interventions Center →
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {atRiskStudents.map(student => (
                <div 
                  key={student.id}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center border border-slate-200">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-slate-900">{student.name}</span>
                        <RiskBadge level={student.riskLevel} size="sm" />
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Math Average: <strong className="text-slate-700">{student.overallAverage}%</strong> • Attendance: {student.attendanceRate}%
                      </div>
                      <div className="text-[11px] text-rose-600 mt-0.5">
                        ⚠️ {student.riskDrivers[0] || "Struggling with prerequisite concepts"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigate('gradebook')}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition cursor-pointer"
                    >
                      View Grades
                    </button>
                    <button
                      onClick={() => onNavigate('ai-assistant')}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition cursor-pointer shadow-xs"
                    >
                      Remediate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent AI Class Insight Card */}
          <div className="bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/40 rounded-2xl border border-indigo-200 p-5 shadow-xs">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-indigo-600 text-white">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                  Automated Class Diagnostics
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-bold">
                Confidence: 86%
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 mt-1">
              "38% of SS2A students struggled with simultaneous equations in the latest assessment."
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Common error isolated: Sign inversion during equation subtraction (76% of missed marks). Recommended action: schedule a 30-minute interactive reteaching session before advancing to quadratic curves.
            </p>

            <div className="mt-4 pt-3 border-t border-indigo-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Formative assessment • 14 students flagged</span>
              <button
                onClick={() => onNavigate('class-insights')}
                className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
              >
                <span>Inspect Distribution</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Col: Today's Schedule & Pending Tasks */}
        <div className="space-y-6">
          
          {/* Today's Classes Schedule */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 font-display">Today's Timetable</h2>
              <span className="text-xs font-medium text-slate-400">Monday</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl border border-indigo-200 bg-indigo-50/50 flex items-center justify-between">
                <div>
                  <span className="font-bold text-indigo-950 block">Period 1: 08:00 - 08:45</span>
                  <span className="text-slate-700">Mathematics • Class SS2A</span>
                  <span className="text-[11px] text-amber-700 block mt-0.5">● Roll call pending</span>
                </div>
                <button
                  onClick={() => onNavigate('attendance')}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-semibold text-[11px] hover:bg-indigo-700 cursor-pointer shadow-xs"
                >
                  Start
                </button>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">Period 3: 09:35 - 10:20</span>
                  <span className="text-slate-600">Further Math • Class SS3 Science</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Room 204</span>
                </div>
                <span className="text-[10px] text-slate-400">Upcoming</span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">Period 5: 11:30 - 12:15</span>
                  <span className="text-slate-600">Mathematics • Class SS2B</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Room 108</span>
                </div>
                <span className="text-[10px] text-slate-400">Upcoming</span>
              </div>
            </div>
          </div>

          {/* Pending Tasks & Submissions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 font-display mb-3">Pending Tasks</h2>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Submit Week 4 Continuous Assessment</span>
                  <span className="text-[11px] text-slate-500">Due Friday • 28 of 38 scores entered</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Approve AI Remedial Worksheet</span>
                  <span className="text-[11px] text-slate-500">Draft ready for David Adeyemi</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

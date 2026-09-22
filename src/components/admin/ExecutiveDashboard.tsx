import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  Layers, 
  CalendarCheck, 
  BookOpen, 
  AlertCircle, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight, 
  Sparkles, 
  CreditCard, 
  Download,
  Filter,
  BarChart3,
  ShieldAlert
} from 'lucide-react';
import { KpiCard, RiskBadge } from '../common/UIComponents';
import { MOCK_STUDENTS, MOCK_CLASSES, MOCK_AI_INSIGHTS, SCHOOL_INFO } from '../../data/mockData';

interface ExecutiveDashboardProps {
  onNavigate: (section: string) => void;
  onSelectStudent?: (studentId: string) => void;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  onNavigate,
  onSelectStudent
}) => {
  const [selectedTerm, setSelectedTerm] = useState('Term 1');

  return (
    <div className="space-y-6">
      {/* Executive Command Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">School Command Center</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
              Executive View
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time institutional intelligence across <strong>{SCHOOL_INFO.name}</strong> • {SCHOOL_INFO.term}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('academic-intelligence')}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Academic Intelligence</span>
          </button>

          <button
            onClick={() => onNavigate('financial-intelligence')}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Financial Intelligence</span>
          </button>
        </div>
      </div>

      {/* 6 Core Executive KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <KpiCard
          id="kpi-students"
          title="Students"
          value="1,240"
          subtitle="Enrolled"
          change={4.2}
          changeDirection="up"
          changePeriod="YoY"
          icon={<Users className="w-4 h-4 text-indigo-600" />}
          onClick={() => onNavigate('students')}
        />
        <KpiCard
          id="kpi-teachers"
          title="Teachers"
          value="76"
          subtitle="Academic Staff"
          icon={<GraduationCap className="w-4 h-4 text-emerald-600" />}
          onClick={() => onNavigate('teachers')}
        />
        <KpiCard
          id="kpi-classes"
          title="Classes"
          value="38"
          subtitle="JSS1 to SS3"
          icon={<Layers className="w-4 h-4 text-violet-600" />}
          onClick={() => onNavigate('classes')}
        />
        <KpiCard
          id="kpi-attendance"
          title="Attendance"
          value="91%"
          change={1.4}
          changeDirection="up"
          subtitle="Avg Daily"
          riskState="ON_TRACK"
          icon={<CalendarCheck className="w-4 h-4 text-emerald-600" />}
          onClick={() => onNavigate('attendance')}
        />
        <KpiCard
          id="kpi-avg-score"
          title="Avg Academic Score"
          value="68%"
          change={-1.2}
          changeDirection="down"
          subtitle="Term Continuous"
          icon={<BookOpen className="w-4 h-4 text-amber-600" />}
          onClick={() => onNavigate('academic-intelligence')}
        />
        <KpiCard
          id="kpi-at-risk"
          title="Students At Risk"
          value="84"
          subtitle="6.7% of cohort"
          riskState="AT_RISK"
          icon={<AlertCircle className="w-4 h-4 text-rose-600" />}
          onClick={() => onNavigate('interventions')}
        />
      </div>

      {/* AI Emerging Risk Notification Banner */}
      <div className="bg-gradient-to-r from-rose-900 via-rose-850 to-slate-900 text-white rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-rose-600 text-white shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-rose-200 uppercase tracking-wider">Early Risk Warning Engine</span>
                <span className="px-2 py-0.2 rounded text-[10px] bg-rose-500 text-white font-bold">84 Flagged</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold font-display mt-0.5 text-white">
                Early intervention needed: 84 students across Junior and Senior secondary display multiple risk drivers.
              </h2>
              <p className="text-xs text-rose-200 mt-1 leading-relaxed max-w-3xl">
                Primary contributing vectors: homework non-completion (42%), Monday tardiness (28%), and mathematics continuous assessment dips (30%).
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('interventions')}
            className="shrink-0 px-4 py-2.5 rounded-xl bg-white text-rose-950 font-bold text-xs hover:bg-rose-50 transition cursor-pointer shadow-sm"
          >
            Open Intervention Center →
          </button>
        </div>
      </div>

      {/* Class Benchmarks & Topic Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Class Performance Benchmarks (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 font-display">Academic Performance by Class</h2>
              <p className="text-xs text-slate-500">Drill down: School → Class → Student</p>
            </div>
            <button
              onClick={() => onNavigate('classes')}
              className="text-xs text-indigo-600 font-semibold hover:underline"
            >
              All 38 Classes →
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {MOCK_CLASSES.map(cls => (
              <div 
                key={cls.id}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{cls.name}</span>
                    <span className="text-xs text-slate-500 font-normal">({cls.level})</span>
                    <span className="text-[11px] text-slate-400">• Teacher: {cls.classTeacher}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {cls.studentCount} Students • Attendance: <strong>{cls.attendanceRate}%</strong> • Main Weakness: <span className="text-rose-600 font-medium">{cls.topWeakness}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Class Avg</span>
                    <span className={`text-base font-bold font-display ${
                      cls.averageScore >= 75 ? 'text-emerald-600' : cls.averageScore >= 68 ? 'text-indigo-600' : 'text-amber-600'
                    }`}>
                      {cls.averageScore}%
                    </span>
                  </div>

                  <div className="text-right pl-3 border-l border-slate-200">
                    <span className="text-xs text-slate-400 block">At Risk</span>
                    <span className={`text-sm font-bold ${
                      cls.atRiskCount > 2 ? 'text-rose-600' : 'text-slate-700'
                    }`}>
                      {cls.atRiskCount}
                    </span>
                  </div>

                  <button
                    onClick={() => onNavigate('academic-intelligence')}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Snapshot Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-slate-900 font-display">Bursary Liquidity</h2>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700">
                  78.4% Collected
                </span>
              </div>

              <div className="space-y-3 my-4">
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Expected Fee Target</span>
                    <span className="font-bold text-slate-900">₦125,000,000</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '78.4%' }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Collected</span>
                    <span className="text-base font-bold font-display text-slate-900">₦98.0M</span>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100">
                    <span className="text-[10px] text-amber-700 uppercase tracking-wider block">Outstanding</span>
                    <span className="text-base font-bold font-display text-amber-900">₦27.0M</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Collection velocity is 8% ahead of previous academic session. Automated SMS reminder cycle active.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100">
              <button
                onClick={() => onNavigate('financial-intelligence')}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Open Financial Intelligence</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Audit Trail snippet */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-slate-900 font-display">System Integrity</h2>
              <button
                onClick={() => onNavigate('audit-logs')}
                className="text-xs text-indigo-600 font-semibold hover:underline"
              >
                Audit Logs →
              </button>
            </div>
            <div className="text-xs text-slate-600 space-y-2">
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span>Grade Updates Logged</span>
                <strong className="text-slate-800">42 today</strong>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span>Payment Receipts Issued</span>
                <strong className="text-slate-800">18 today</strong>
              </div>
              <div className="flex items-center justify-between py-1">
                <span>RBAC Policy Violations</span>
                <strong className="text-emerald-600">0 (Strict)</strong>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

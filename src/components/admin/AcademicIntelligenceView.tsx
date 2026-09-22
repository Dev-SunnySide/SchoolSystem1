import React, { useState } from 'react';
import { 
  BarChart3, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Layers, 
  BookOpen, 
  CalendarCheck, 
  AlertCircle, 
  Search, 
  Download,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { MOCK_CLASSES, MOCK_STUDENTS, SCHOOL_INFO } from '../../data/mockData';
import { RiskBadge } from '../common/UIComponents';

interface AcademicIntelligenceViewProps {
  onNavigateToStudent?: (studentId: string) => void;
  onNavigateToClass?: (classId: string) => void;
}

export const AcademicIntelligenceView: React.FC<AcademicIntelligenceViewProps> = ({
  onNavigateToStudent,
  onNavigateToClass
}) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [drilldownStep, setDrilldownStep] = useState<'SCHOOL' | 'CLASS' | 'STUDENT'>('SCHOOL');
  const [activeClassId, setActiveClassId] = useState<string>('cls-01'); // SS2A default

  const filteredClasses = selectedLevel === 'ALL'
    ? MOCK_CLASSES
    : MOCK_CLASSES.filter(c => c.level.startsWith(selectedLevel));

  const activeClassObj = MOCK_CLASSES.find(c => c.id === activeClassId) || MOCK_CLASSES[0];
  const classStudents = MOCK_STUDENTS.filter(s => s.arm === activeClassObj.name);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">Academic Intelligence & Analytics</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
              Cohort Level
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Multilevel hierarchy drill-down: <strong>School → Class → Student</strong> across all academic departments.
          </p>
        </div>

        {/* Drilldown breadcrumb indicator */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl text-xs font-semibold text-slate-700">
          <button
            onClick={() => setDrilldownStep('SCHOOL')}
            className={`px-3 py-1 rounded-lg transition cursor-pointer ${
              drilldownStep === 'SCHOOL' ? 'bg-white text-indigo-700 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            1. School Overview
          </button>
          <span className="text-slate-400">/</span>
          <button
            onClick={() => setDrilldownStep('CLASS')}
            className={`px-3 py-1 rounded-lg transition cursor-pointer ${
              drilldownStep === 'CLASS' ? 'bg-white text-indigo-700 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            2. Class Cohort ({activeClassObj.name})
          </button>
          <span className="text-slate-400">/</span>
          <button
            onClick={() => setDrilldownStep('STUDENT')}
            className={`px-3 py-1 rounded-lg transition cursor-pointer ${
              drilldownStep === 'STUDENT' ? 'bg-white text-indigo-700 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            3. Student 360°
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-500">Academic Level:</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-800 outline-none"
            >
              <option value="ALL">All Levels (JSS1 - SS3)</option>
              <option value="SS">Senior Secondary (SS1 - SS3)</option>
              <option value="JSS">Junior Secondary (JSS1 - JSS3)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-500">Subject Department:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-800 outline-none"
            >
              <option value="ALL">All Departments</option>
              <option value="MATH">Mathematics & Further Math</option>
              <option value="SCI">Sciences (Physics, Chem, Bio)</option>
              <option value="HUM">Humanities & Languages</option>
              <option value="BUS">Commercial & Business</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Analytics</span>
          </button>
        </div>
      </div>

      {/* Step 1: School Overview */}
      {drilldownStep === 'SCHOOL' && (
        <div className="space-y-6">
          {/* Class Performance Comparison Bars */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Average Score Comparison Across Classes</h2>
                <p className="text-xs text-slate-500">Click any class to drill down into cohort topic bottlenecks</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClasses.map(cls => (
                <div
                  key={cls.id}
                  id={`class-card-${cls.id}`}
                  onClick={() => {
                    setActiveClassId(cls.id);
                    setDrilldownStep('CLASS');
                  }}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-sm font-bold text-slate-900">{cls.name}</span>
                        <span className="text-xs text-slate-400 block">{cls.classTeacher}</span>
                      </div>
                      <span className="text-base font-bold font-display text-indigo-700">{cls.averageScore}%</span>
                    </div>

                    <div className="my-3 space-y-1.5 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span>Students Enrolled:</span>
                        <strong className="text-slate-800">{cls.studentCount}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Attendance Rate:</span>
                        <strong className="text-emerald-700">{cls.attendanceRate}%</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Flagged for Intervention:</span>
                        <strong className={cls.atRiskCount > 0 ? "text-rose-600" : "text-emerald-600"}>
                          {cls.atRiskCount} students
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 truncate pr-2">Weakness: {cls.topWeakness}</span>
                    <span className="text-indigo-600 font-semibold shrink-0 flex items-center gap-0.5">
                      <span>Inspect</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Class Cohort Breakdown */}
      {drilldownStep === 'CLASS' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Class Cohort Analysis</span>
                <h2 className="text-xl font-bold text-slate-900 font-display mt-0.5">{activeClassObj.name} • {activeClassObj.level}</h2>
                <p className="text-xs text-slate-500">
                  Form Teacher: <strong>{activeClassObj.classTeacher}</strong> • Enrolled: <strong>{activeClassObj.studentCount}</strong> • Average: <strong>{activeClassObj.averageScore}%</strong>
                </p>
              </div>

              <button
                onClick={() => setDrilldownStep('SCHOOL')}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 hover:bg-slate-50"
              >
                ← Back to School Overview
              </button>
            </div>

            {/* Students List in this class */}
            <div className="mt-5">
              <h3 className="text-sm font-bold text-slate-800 mb-3">Enrolled Students in {activeClassObj.name}</h3>
              <div className="divide-y divide-slate-100">
                {classStudents.map(student => (
                  <div
                    key={student.id}
                    onClick={() => {
                      onNavigateToStudent?.(student.id);
                      setDrilldownStep('STUDENT');
                    }}
                    className="py-3 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition cursor-pointer rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center border border-indigo-100">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{student.name}</div>
                        <div className="text-xs text-slate-400 font-mono">{student.admissionNo} • Parent: {student.parentName}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Average</span>
                        <span className="font-bold text-slate-800 text-sm">{student.overallAverage}%</span>
                      </div>
                      <div className="pl-3 border-l border-slate-200">
                        <span className="text-slate-400 block text-[10px]">Attendance</span>
                        <span className="font-semibold text-slate-700">{student.attendanceRate}%</span>
                      </div>
                      <div className="pl-3 border-l border-slate-200">
                        <RiskBadge level={student.riskLevel} size="sm" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Student 360 View */}
      {drilldownStep === 'STUDENT' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto font-bold text-lg">
            360°
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Student 360° Profile Loaded</h3>
            <p className="text-xs text-slate-500">Navigate to Student Directory to view full 360 degree dossier.</p>
          </div>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setDrilldownStep('CLASS')}
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              ← Back to Class
            </button>
            <button
              onClick={() => onNavigateToStudent?.('std-001')}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 shadow-xs"
            >
              Open Full 360 Dossier
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

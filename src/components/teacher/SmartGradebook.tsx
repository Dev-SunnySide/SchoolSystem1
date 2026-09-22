import React, { useState } from 'react';
import { 
  Save, 
  Sparkles, 
  HelpCircle, 
  Filter, 
  Download, 
  AlertCircle, 
  CheckCircle2, 
  TrendingDown, 
  TrendingUp, 
  ChevronRight,
  Plus
} from 'lucide-react';
import { GradebookEntry, RiskLevel } from '../../types';
import { MOCK_GRADEBOOK_SS2A } from '../../data/mockData';
import { RiskBadge, Drawer } from '../common/UIComponents';

interface SmartGradebookProps {
  onOpenRemedialModal?: (student: GradebookEntry) => void;
}

export const SmartGradebook: React.FC<SmartGradebookProps> = ({
  onOpenRemedialModal
}) => {
  const [rows, setRows] = useState<GradebookEntry[]>(MOCK_GRADEBOOK_SS2A);
  const [selectedStudent, setSelectedStudent] = useState<GradebookEntry | null>(null);
  const [hasSaved, setHasSaved] = useState(false);

  // Recalculate average dynamically when teacher changes CW1, CW2, or Quiz
  const updateScore = (studentId: string, field: 'cw1' | 'cw2' | 'quiz' | 'exam', valStr: string) => {
    const val = valStr === '' ? null : Math.min(100, Math.max(0, Number(valStr)));
    setRows(prev => prev.map(entry => {
      if (entry.studentId !== studentId) return entry;

      const updated = { ...entry, [field]: val };
      // Weighting: CW1 (20%), CW2 (20%), Quiz (20%), Exam (40% if present, or equal 33.3% across existing continuous assessments)
      const count = (updated.cw1 !== null ? 1 : 0) + (updated.cw2 !== null ? 1 : 0) + (updated.quiz !== null ? 1 : 0);
      const sum = (updated.cw1 || 0) + (updated.cw2 || 0) + (updated.quiz || 0);
      const avg = count > 0 ? Math.round(sum / count) : 0;

      let status: RiskLevel = 'ON_TRACK';
      if (avg < 50) status = 'AT_RISK';
      else if (avg < 65) status = 'NEEDS_ATTENTION';

      return {
        ...updated,
        average: avg,
        status
      };
    }));
  };

  const handleSave = () => {
    setHasSaved(true);
    setTimeout(() => setHasSaved(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 font-display">Smart Gradebook</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Auto-Calculating
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Subject: <strong>Mathematics (SS2A)</strong> • Continuous Assessment Weight: 20% CW1, 20% CW2, 20% Quiz, 40% Exam
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            id="gradebook-save-btn"
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{hasSaved ? 'Scores Saved ✓' : 'Save Gradebook'}</span>
          </button>
        </div>
      </div>

      {/* Spreadsheet Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-3 text-center w-24">CW 1 (100)</th>
                <th className="py-3 px-3 text-center w-24">CW 2 (100)</th>
                <th className="py-3 px-3 text-center w-24">Quiz (100)</th>
                <th className="py-3 px-3 text-center w-24">Exam (100)</th>
                <th className="py-3 px-4 text-center w-28">Avg Score</th>
                <th className="py-3 px-4 text-center w-36">Status</th>
                <th className="py-3 px-4 text-right">Diagnostic Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => {
                const isSelected = selectedStudent?.studentId === row.studentId;

                return (
                  <tr 
                    key={row.studentId}
                    id={`gradebook-row-${row.studentId}`}
                    className={`hover:bg-indigo-50/30 transition ${
                      row.status === 'AT_RISK' ? 'bg-rose-50/20' : ''
                    } ${isSelected ? 'bg-indigo-50/60' : ''}`}
                  >
                    {/* Student Name */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{row.studentName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{row.admissionNo} • {row.classArm}</div>
                    </td>

                    {/* CW 1 */}
                    <td className="py-3 px-3 text-center">
                      <input
                        type="number"
                        id={`input-cw1-${row.studentId}`}
                        value={row.cw1 ?? ''}
                        onChange={(e) => updateScore(row.studentId, 'cw1', e.target.value)}
                        className="w-16 py-1 px-1.5 text-center font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      />
                    </td>

                    {/* CW 2 */}
                    <td className="py-3 px-3 text-center">
                      <input
                        type="number"
                        id={`input-cw2-${row.studentId}`}
                        value={row.cw2 ?? ''}
                        onChange={(e) => updateScore(row.studentId, 'cw2', e.target.value)}
                        className="w-16 py-1 px-1.5 text-center font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      />
                    </td>

                    {/* Quiz */}
                    <td className="py-3 px-3 text-center">
                      <input
                        type="number"
                        id={`input-quiz-${row.studentId}`}
                        value={row.quiz ?? ''}
                        onChange={(e) => updateScore(row.studentId, 'quiz', e.target.value)}
                        className="w-16 py-1 px-1.5 text-center font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      />
                    </td>

                    {/* Exam (Placeholder / Pending) */}
                    <td className="py-3 px-3 text-center">
                      <span className="text-slate-400 font-mono text-xs">--</span>
                    </td>

                    {/* Auto Average */}
                    <td className="py-3 px-4 text-center">
                      <span className={`text-sm font-bold font-display px-2 py-0.5 rounded ${
                        row.average >= 70 ? 'text-indigo-800 bg-indigo-50' : row.average >= 50 ? 'text-amber-800 bg-amber-50' : 'text-rose-800 bg-rose-50'
                      }`}>
                        {row.average}%
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 text-center">
                      <RiskBadge level={row.status} size="sm" />
                    </td>

                    {/* Diagnostic Action Button */}
                    <td className="py-3 px-4 text-right">
                      <button
                        id={`inspect-student-${row.studentId}`}
                        onClick={() => setSelectedStudent(row)}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-medium transition cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Insight</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Zero manual calculations. Teachers enter scores; the system updates grade boundaries, class ranking, and student risks in real time.</span>
          <span className="font-semibold text-slate-700">7 Students in SS2A</span>
        </div>
      </div>

      {/* STUDENT INSIGHT DRAWER (Triggered by clicking any student, especially David Adeyemi) */}
      <Drawer
        id="student-gradebook-insight-drawer"
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        title={selectedStudent ? `${selectedStudent.studentName} • Diagnostic Insight` : ''}
        subtitle="Automatic weakness isolation and remedial recommendations"
      >
        {selectedStudent && (
          <div className="space-y-4 text-xs">
            {/* Student Header */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[11px]">Current Mathematics Average</span>
                <span className="text-2xl font-bold text-slate-900 font-display">{selectedStudent.average}%</span>
              </div>
              <RiskBadge level={selectedStudent.status} size="md" />
            </div>

            {/* Weaknesses */}
            <div className="p-4 rounded-xl border border-rose-100 bg-rose-50/50 space-y-2">
              <span className="font-bold text-rose-950 block">Primary Weakness Drivers:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li><strong>Fractions & Factorization:</strong> Sub-50% mastery on recent diagnostic quiz</li>
                <li><strong>Continuous Assessment:</strong> CW2 dropped by 5 points compared to baseline</li>
                <li><strong>Homework Submissions:</strong> 4 incomplete homework sheets logged this month</li>
              </ul>
            </div>

            {/* Suggested Interventions */}
            <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/50 space-y-2">
              <span className="font-bold text-indigo-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>AI Suggested Interventions:</span>
              </span>
              <p className="text-slate-700">
                {selectedStudent.suggestedIntervention || "15-minute stepped fractions remedial drill with teacher clinic."}
              </p>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-2">
              <button
                id="assign-remedial-btn"
                onClick={() => {
                  const student = selectedStudent;
                  setSelectedStudent(null);
                  onOpenRemedialModal?.(student);
                }}
                className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700 transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Targeted Remedial Worksheet</span>
              </button>

              <button
                onClick={() => setSelectedStudent(null)}
                className="w-full py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs transition cursor-pointer"
              >
                Close Diagnostic
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

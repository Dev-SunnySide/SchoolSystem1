import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  CalendarCheck, 
  CreditCard, 
  ShieldAlert, 
  Sparkles, 
  ChevronRight, 
  ExternalLink,
  Award,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { Student } from '../../types';
import { MOCK_STUDENTS, MOCK_INTERVENTIONS, MOCK_FEE_TRANSACTIONS, SCHOOL_INFO } from '../../data/mockData';
import { RiskBadge, Modal } from '../common/UIComponents';

interface StudentManagementViewProps {
  initialSelectedStudentId?: string | null;
  onOpenInterventionForStudent?: (student: Student) => void;
}

export const StudentManagementView: React.FC<StudentManagementViewProps> = ({
  initialSelectedStudentId,
  onOpenInterventionForStudent
}) => {
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('ALL');
  const [selectedStudentFor360, setSelectedStudentFor360] = useState<Student | null>(
    initialSelectedStudentId 
      ? MOCK_STUDENTS.find(s => s.id === initialSelectedStudentId) || null
      : null
  );
  const [activeProfileTab, setActiveProfileTab] = useState<'overview' | 'academics' | 'attendance' | 'finance' | 'interventions'>('overview');
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

  // New Student Form State
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentArm, setNewStudentArm] = useState('SS2A');
  const [newParentName, setNewParentName] = useState('');
  const [newParentPhone, setNewParentPhone] = useState('');

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                          s.admissionNo.toLowerCase().includes(search.toLowerCase()) ||
                          s.arm.toLowerCase().includes(search.toLowerCase());
    const matchesRisk = riskFilter === 'ALL' || s.riskLevel === riskFilter;
    return matchesSearch && matchesRisk;
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    const created: Student = {
      id: `std-00${students.length + 1}`,
      name: newStudentName,
      admissionNo: `ACA/2026/0${Math.floor(100 + Math.random() * 900)}`,
      class: "Senior Secondary",
      arm: newStudentArm,
      gender: "MALE",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      parentName: newParentName || "Guardian",
      parentPhone: newParentPhone || "+234 800 000 0000",
      parentEmail: "parent@apexcrest.edu.ng",
      overallAverage: 70,
      projectedFinal: 72,
      attendanceRate: 95,
      assignmentCompletionRate: 90,
      riskLevel: "ON_TRACK",
      riskScore: 20,
      riskDrivers: [],
      positiveIndicators: ["Newly registered student"],
      fees: {
        total: 250000,
        paid: 0,
        outstanding: 250000,
        dueDate: "2026-10-15",
        status: "OVERDUE"
      }
    };

    setStudents([created, ...students]);
    setIsAddStudentOpen(false);
    setNewStudentName('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">Student Directory & 360° Dossier</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
              1,240 Enrolled
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Complete learner profiles uniting academics, attendance patterns, fee status, and intervention history.
          </p>
        </div>

        <button
          id="add-student-btn"
          onClick={() => setIsAddStudentOpen(true)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Student</span>
        </button>
      </div>

      {/* Directory Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            id="student-directory-search-input"
            type="text"
            placeholder="Search by name, admission no, or class..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-500">Risk Filter:</span>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-800 outline-none"
          >
            <option value="ALL">All Risk Statuses</option>
            <option value="ON_TRACK">🟢 On Track</option>
            <option value="NEEDS_ATTENTION">🟡 Needs Attention</option>
            <option value="AT_RISK">🔴 At Risk</option>
          </select>
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-3">Class</th>
                <th className="py-3 px-3">Parent Contact</th>
                <th className="py-3 px-3 text-center">Average</th>
                <th className="py-3 px-3 text-center">Attendance</th>
                <th className="py-3 px-4 text-center">Risk Level</th>
                <th className="py-3 px-3 text-center">Fee Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map(student => (
                <tr 
                  key={student.id} 
                  id={`student-row-${student.id}`}
                  className="hover:bg-indigo-50/20 transition cursor-pointer"
                  onClick={() => setSelectedStudentFor360(student)}
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{student.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{student.admissionNo}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3 font-semibold text-slate-700">{student.arm}</td>

                  <td className="py-3.5 px-3">
                    <div className="text-slate-800">{student.parentName}</div>
                    <div className="text-[11px] text-slate-400">{student.parentPhone}</div>
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    <span className="font-bold text-slate-900">{student.overallAverage}%</span>
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    <span className="font-medium text-emerald-700">{student.attendanceRate}%</span>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <RiskBadge level={student.riskLevel} size="sm" />
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      student.fees.outstanding === 0
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      {student.fees.outstanding === 0 ? 'CLEARED' : `₦${student.fees.outstanding.toLocaleString()} DUE`}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStudentFor360(student);
                      }}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-medium transition cursor-pointer"
                    >
                      360° Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 360° STUDENT PROFILE MODAL */}
      <Modal
        id="student-360-modal"
        isOpen={!!selectedStudentFor360}
        onClose={() => setSelectedStudentFor360(null)}
        title={selectedStudentFor360 ? `Student 360° Dossier: ${selectedStudentFor360.name}` : ''}
        subtitle={selectedStudentFor360 ? `${selectedStudentFor360.admissionNo} • Class: ${selectedStudentFor360.arm}` : ''}
        maxWidth="2xl"
      >
        {selectedStudentFor360 && (
          <div className="space-y-5 text-xs">
            {/* Top Identity Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white font-bold text-lg flex items-center justify-center">
                  {selectedStudentFor360.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedStudentFor360.name}</h3>
                  <div className="text-slate-500">
                    Parent: <strong>{selectedStudentFor360.parentName}</strong> ({selectedStudentFor360.parentPhone})
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <RiskBadge level={selectedStudentFor360.riskLevel} size="md" />
                <button
                  onClick={() => {
                    const std = selectedStudentFor360;
                    setSelectedStudentFor360(null);
                    onOpenInterventionForStudent?.(std);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700 shadow-xs cursor-pointer"
                >
                  Create Intervention
                </button>
              </div>
            </div>

            {/* Profile Tabs */}
            <div className="flex border-b border-slate-200 gap-4 font-semibold text-slate-500">
              <button
                onClick={() => setActiveProfileTab('overview')}
                className={`pb-2 border-b-2 transition ${
                  activeProfileTab === 'overview' ? 'border-indigo-600 text-indigo-700' : 'border-transparent hover:text-slate-800'
                }`}
              >
                Overview & Risk Score
              </button>
              <button
                onClick={() => setActiveProfileTab('academics')}
                className={`pb-2 border-b-2 transition ${
                  activeProfileTab === 'academics' ? 'border-indigo-600 text-indigo-700' : 'border-transparent hover:text-slate-800'
                }`}
              >
                Academic History
              </button>
              <button
                onClick={() => setActiveProfileTab('attendance')}
                className={`pb-2 border-b-2 transition ${
                  activeProfileTab === 'attendance' ? 'border-indigo-600 text-indigo-700' : 'border-transparent hover:text-slate-800'
                }`}
              >
                Attendance Log
              </button>
              <button
                onClick={() => setActiveProfileTab('finance')}
                className={`pb-2 border-b-2 transition ${
                  activeProfileTab === 'finance' ? 'border-indigo-600 text-indigo-700' : 'border-transparent hover:text-slate-800'
                }`}
              >
                Bursary Ledger
              </button>
            </div>

            {/* Tab: Overview */}
            {activeProfileTab === 'overview' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-white border border-slate-200 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">Academic Average</span>
                    <span className="text-xl font-bold font-display text-slate-900">{selectedStudentFor360.overallAverage}%</span>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">Projected Final</span>
                    <span className="text-xl font-bold font-display text-indigo-700">{selectedStudentFor360.projectedFinal}%</span>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">Attendance Rate</span>
                    <span className="text-xl font-bold font-display text-emerald-700">{selectedStudentFor360.attendanceRate}%</span>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">Student Risk Index</span>
                    <span className="text-xl font-bold font-display text-rose-700">{selectedStudentFor360.riskScore} / 100</span>
                  </div>
                </div>

                {/* Risk Drivers vs Positive Indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl border border-rose-100 bg-rose-50/40">
                    <span className="font-bold text-rose-950 block mb-1">Contributing Risk Drivers:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      {selectedStudentFor360.riskDrivers.length > 0 ? (
                        selectedStudentFor360.riskDrivers.map((d, i) => <li key={i}>{d}</li>)
                      ) : (
                        <li>No significant risk triggers detected.</li>
                      )}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/40">
                    <span className="font-bold text-emerald-950 block mb-1">Positive Indicators:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      {selectedStudentFor360.positiveIndicators.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Academics */}
            {activeProfileTab === 'academics' && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">Current Continuous Assessment Snapshot</span>
                <p className="text-slate-600">
                  Mathematics: 58% (CW1: 64%, CW2: 52%, Quiz: 57%) • English Language: 84% • Physics: 69% • Chemistry: 71% • Economics: 76%
                </p>
                <div className="pt-2 text-indigo-700 font-semibold cursor-pointer hover:underline">
                  Download Full Historical Transcript (PDF) →
                </div>
              </div>
            )}

            {/* Tab: Attendance */}
            {activeProfileTab === 'attendance' && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">September 2026 Roll History</span>
                <p className="text-slate-600">
                  Total Sessions: 15 • Present: 12 (80%) • Late: 2 (13.3%) • Medical: 1 (6.7%)
                </p>
                <span className="text-[11px] text-amber-700 block">Recent Note: Arrived late on Sep 10 (8:17 AM - traffic).</span>
              </div>
            )}

            {/* Tab: Finance */}
            {activeProfileTab === 'finance' && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Term 1 Fee Invoiced:</span>
                  <span>₦{selectedStudentFor360.fees.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Total Payments Cleared:</span>
                  <span>₦{selectedStudentFor360.fees.paid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-rose-700 font-bold border-t border-slate-200 pt-1">
                  <span>Outstanding Balance:</span>
                  <span>₦{selectedStudentFor360.fees.outstanding.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* ADD STUDENT MODAL */}
      <Modal
        id="add-student-modal"
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
        title="Enroll New Student"
        subtitle="Register learner into Apex Crest Academy database"
        maxWidth="md"
      >
        <form onSubmit={handleAddStudent} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Student Full Name</label>
            <input
              id="new-student-name-input"
              type="text"
              required
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
              placeholder="E.g. David Chukwuemeka"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Class Arm</label>
              <select
                value={newStudentArm}
                onChange={(e) => setNewStudentArm(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none bg-white"
              >
                <option value="SS2A">SS2A</option>
                <option value="SS2B">SS2B</option>
                <option value="SS1 Science">SS1 Science</option>
                <option value="JSS3B">JSS3B</option>
                <option value="JSS1A">JSS1A</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Gender</label>
              <select className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none bg-white">
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Parent / Guardian Name</label>
            <input
              type="text"
              value={newParentName}
              onChange={(e) => setNewParentName(e.target.value)}
              placeholder="E.g. Mrs. Ngozi Chukwuemeka"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Parent Phone Number</label>
            <input
              type="tel"
              value={newParentPhone}
              onChange={(e) => setNewParentPhone(e.target.value)}
              placeholder="+234 803 000 0000"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddStudentOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              id="submit-new-student-btn"
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700 cursor-pointer shadow-xs"
            >
              Complete Enrollment
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

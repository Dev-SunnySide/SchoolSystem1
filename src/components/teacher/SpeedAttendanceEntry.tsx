import React, { useState } from 'react';
import { 
  Check, 
  Clock, 
  X, 
  ShieldCheck, 
  Search, 
  Save, 
  Send, 
  Sparkles, 
  Filter, 
  CheckCircle2, 
  Users 
} from 'lucide-react';
import { AttendanceStatus } from '../../types';
import { MOCK_STUDENTS } from '../../data/mockData';

interface SpeedAttendanceEntryProps {
  onAttendanceSubmitted?: () => void;
}

interface StudentAttendanceState {
  studentId: string;
  status: AttendanceStatus;
  note?: string;
}

export const SpeedAttendanceEntry: React.FC<SpeedAttendanceEntryProps> = ({
  onAttendanceSubmitted
}) => {
  const [selectedClass, setSelectedClass] = useState('SS2A');
  const [selectedDate, setSelectedDate] = useState('2026-09-21');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  // Initial attendance state for students in SS2A
  const [attendanceMap, setAttendanceMap] = useState<Record<string, AttendanceStatus>>({
    'std-001': 'PRESENT',
    'std-004': 'PRESENT',
    'std-003': 'LATE',
    'std-005': 'PRESENT'
  });

  const [notesMap, setNotesMap] = useState<Record<string, string>>({
    'std-003': 'Traffic delay at Toll Gate'
  });

  const students = MOCK_STUDENTS;

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.admissionNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const setStatus = (id: string, status: AttendanceStatus) => {
    setAttendanceMap(prev => ({ ...prev, [id]: status }));
  };

  const handleMarkAll = (status: AttendanceStatus) => {
    const updated: Record<string, AttendanceStatus> = {};
    students.forEach(s => {
      updated[s.id] = status;
    });
    setAttendanceMap(updated);
  };

  const markedCount = Object.keys(attendanceMap).length;
  const totalCount = students.length;

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onAttendanceSubmitted?.();
    }, 2000);
  };

  return (
    <div className="space-y-5">
      {/* Header bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 font-display">Rapid Attendance Register</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              One-Tap Mode
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Log morning roll call in under 45 seconds. System calculates attendance rates automatically.
          </p>
        </div>

        {/* Class and Date picker */}
        <div className="flex items-center gap-3">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-800 outline-none"
          >
            <option value="SS2A">Class: SS2A (Senior)</option>
            <option value="SS2B">Class: SS2B (Senior)</option>
            <option value="JSS3B">Class: JSS3B (Junior)</option>
          </select>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-800 outline-none"
          />
        </div>
      </div>

      {/* Progress & Quick Bulk Actions */}
      <div className="bg-slate-900 text-white rounded-2xl p-4.5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <div>
              <span className="text-xs text-slate-300 block">Class Roll Progress</span>
              <div className="text-lg font-bold font-display text-white">
                {markedCount} / {totalCount} Students Marked
              </div>
            </div>
          </div>

          <div className="hidden lg:block w-36 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
            <div 
              className="bg-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${(markedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>

        {/* Bulk Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            id="attendance-bulk-present"
            onClick={() => handleMarkAll('PRESENT')}
            className="px-3 py-1.5 rounded-lg bg-emerald-600/90 text-white hover:bg-emerald-600 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark All Present</span>
          </button>

          <button
            onClick={() => handleMarkAll('ABSENT')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
          >
            Reset
          </button>

          <button
            id="attendance-save-draft"
            onClick={() => {
              setIsDraftSaved(true);
              setTimeout(() => setIsDraftSaved(false), 2000);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition flex items-center gap-1 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isDraftSaved ? 'Draft Saved ✓' : 'Save Draft'}</span>
          </button>

          <button
            id="attendance-submit-final"
            onClick={handleSubmit}
            className="px-4 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitted ? 'Attendance Submitted ✓' : 'Submit Final'}</span>
          </button>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-3 border-b border-slate-100 flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter student in class..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs outline-none focus:border-indigo-400"
            />
          </div>
          <span className="text-xs text-slate-400">Class: {selectedClass} • Period 1 Roll</span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredStudents.map(student => {
            const currentStatus = attendanceMap[student.id];

            return (
              <div 
                key={student.id} 
                className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center border border-indigo-100">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{student.name}</div>
                    <div className="text-xs text-slate-500">{student.admissionNo} • Overall Att: {student.attendanceRate}%</div>
                  </div>
                </div>

                {/* 1-Tap Status Selector Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    id={`att-present-${student.id}`}
                    onClick={() => setStatus(student.id, 'PRESENT')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                      currentStatus === 'PRESENT'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                    <span>Present</span>
                  </button>

                  <button
                    type="button"
                    id={`att-late-${student.id}`}
                    onClick={() => setStatus(student.id, 'LATE')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                      currentStatus === 'LATE'
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700'
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    <span>Late</span>
                  </button>

                  <button
                    type="button"
                    id={`att-absent-${student.id}`}
                    onClick={() => setStatus(student.id, 'ABSENT')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                      currentStatus === 'ABSENT'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-700'
                    }`}
                  >
                    <X className="w-3 h-3" />
                    <span>Absent</span>
                  </button>

                  <button
                    type="button"
                    id={`att-excused-${student.id}`}
                    onClick={() => setStatus(student.id, 'EXCUSED')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                      currentStatus === 'EXCUSED'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'
                    }`}
                  >
                    <ShieldCheck className="w-3 h-3" />
                    <span>Excused</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

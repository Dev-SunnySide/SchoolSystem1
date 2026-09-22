import React, { useState, useMemo } from 'react';
import { Search, User, FileText, CheckSquare, Layers, BookOpen, ArrowRight, X } from 'lucide-react';
import { MOCK_STUDENTS, MOCK_ASSIGNMENTS, MOCK_CLASSES, MOCK_FEE_TRANSACTIONS } from '../../data/mockData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string, payload?: any) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) {
      return {
        students: MOCK_STUDENTS.slice(0, 3),
        assignments: MOCK_ASSIGNMENTS.slice(0, 2),
        invoices: MOCK_FEE_TRANSACTIONS.slice(0, 2),
        classes: MOCK_CLASSES.slice(0, 2)
      };
    }

    const q = query.toLowerCase();
    return {
      students: MOCK_STUDENTS.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.admissionNo.toLowerCase().includes(q) || 
        s.arm.toLowerCase().includes(q)
      ),
      assignments: MOCK_ASSIGNMENTS.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.subject.toLowerCase().includes(q)
      ),
      invoices: MOCK_FEE_TRANSACTIONS.filter(t => 
        t.receiptNo.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q) ||
        t.studentName.toLowerCase().includes(q)
      ),
      classes: MOCK_CLASSES.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.level.toLowerCase().includes(q)
      )
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div id="global-search-modal" className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative mx-auto max-w-2xl transform divide-y divide-slate-100 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 transition-all">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
          <input
            id="global-search-input"
            type="text"
            className="h-12 w-full border-0 bg-transparent pl-11 pr-10 text-slate-900 placeholder:text-slate-400 focus:ring-0 text-sm outline-none"
            placeholder="Search students, invoices, assignments, classes, or reports... (e.g. John, SS2A, ₦70,000)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="max-h-96 scroll-py-2 overflow-y-auto p-3 space-y-4">
          {/* Students */}
          {results.students.length > 0 && (
            <div>
              <div className="px-3 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Students ({results.students.length})
              </div>
              <div className="mt-1 space-y-1">
                {results.students.map(student => (
                  <div
                    key={student.id}
                    id={`search-student-${student.id}`}
                    onClick={() => {
                      onNavigate('students', student);
                      onClose();
                    }}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-indigo-50/70 cursor-pointer group transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900 group-hover:text-indigo-900">
                          {student.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {student.arm} • {student.admissionNo} • Average: {student.overallAverage}%
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Assignments */}
          {results.assignments.length > 0 && (
            <div>
              <div className="px-3 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Assignments ({results.assignments.length})
              </div>
              <div className="mt-1 space-y-1">
                {results.assignments.map(asg => (
                  <div
                    key={asg.id}
                    id={`search-asg-${asg.id}`}
                    onClick={() => {
                      onNavigate('assignments', asg);
                      onClose();
                    }}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                        <CheckSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900">{asg.title}</div>
                        <div className="text-xs text-slate-500">{asg.subject} • {asg.class} • Due: {asg.dueDate}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Invoices */}
          {results.invoices.length > 0 && (
            <div>
              <div className="px-3 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Invoices & Receipts ({results.invoices.length})
              </div>
              <div className="mt-1 space-y-1">
                {results.invoices.map(inv => (
                  <div
                    key={inv.id}
                    id={`search-inv-${inv.id}`}
                    onClick={() => {
                      onNavigate('finance', inv);
                      onClose();
                    }}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900">
                          {inv.receiptNo} - {inv.description}
                        </div>
                        <div className="text-xs text-slate-500">
                          ₦{inv.amount.toLocaleString()} • {inv.studentName} ({inv.studentClass})
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      inv.status === 'PAID' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {inv.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Classes */}
          {results.classes.length > 0 && (
            <div>
              <div className="px-3 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Classes ({results.classes.length})
              </div>
              <div className="mt-1 space-y-1">
                {results.classes.map(cls => (
                  <div
                    key={cls.id}
                    id={`search-cls-${cls.id}`}
                    onClick={() => {
                      onNavigate('classes', cls);
                      onClose();
                    }}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-violet-50 text-violet-600">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900">{cls.name}</div>
                        <div className="text-xs text-slate-500">Teacher: {cls.classTeacher} • {cls.studentCount} Students</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-600">Avg {cls.averageScore}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 text-[11px] text-slate-500">
          <span>Tip: Press <strong>Esc</strong> to exit search</span>
          <span>Showing verified records for Apex Crest Academy</span>
        </div>
      </div>
    </div>
  );
};

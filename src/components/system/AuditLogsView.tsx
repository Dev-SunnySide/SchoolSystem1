import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Calendar, 
  Download, 
  Clock, 
  User, 
  ArrowRight,
  Database
} from 'lucide-react';
import { MOCK_AUDIT_LOGS } from '../../data/mockData';

export const AuditLogsView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');

  const filteredLogs = MOCK_AUDIT_LOGS.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(search.toLowerCase()) ||
                          log.action.toLowerCase().includes(search.toLowerCase()) ||
                          (log.student && log.student.toLowerCase().includes(search.toLowerCase())) ||
                          (log.subject && log.subject.toLowerCase().includes(search.toLowerCase()));
    const matchesAction = actionFilter === 'ALL' || log.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">System Integrity & Audit Trail</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
              Immutable Log
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Complete cryptographic audit trail recording all grade changes, fee receipts, and institutional permission events.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export Audit Log</span>
        </button>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by faculty, student, or action..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-500">Action Filter:</span>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-800 outline-none"
          >
            <option value="ALL">All Actions</option>
            <option value="GRADE_MODIFIED">GRADE_MODIFIED</option>
            <option value="FEE_RECORDED">FEE_RECORDED</option>
            <option value="INTERVENTION_CREATED">INTERVENTION_CREATED</option>
            <option value="ATTENDANCE_OVERRIDE">ATTENDANCE_OVERRIDE</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Faculty / User</th>
                <th className="py-3 px-3">Action</th>
                <th className="py-3 px-3">Student & Subject</th>
                <th className="py-3 px-3 text-center">Previous Value</th>
                <th className="py-3 px-3 text-center">New Value</th>
                <th className="py-3 px-4 text-right">Terminal IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 text-slate-500">{log.timestamp}</td>
                  <td className="py-3 px-4 font-sans font-semibold text-slate-900">{log.user}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-sans">
                    <div className="font-semibold text-slate-800">{log.student || '--'}</div>
                    <div className="text-[10px] text-slate-400">{log.subject || ''}</div>
                  </td>
                  <td className="py-3 px-3 text-center text-rose-600 bg-rose-50/20">{log.oldValue || '--'}</td>
                  <td className="py-3 px-3 text-center font-bold text-emerald-700 bg-emerald-50/20">{log.newValue}</td>
                  <td className="py-3 px-4 text-right text-slate-400">{(log as any).ip || (log as any).ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

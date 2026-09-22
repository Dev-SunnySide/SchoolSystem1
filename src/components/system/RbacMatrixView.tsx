import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Check, 
  X, 
  AlertTriangle, 
  HelpCircle,
  Users
} from 'lucide-react';
import { UserRole } from '../../types';

interface RbacMatrixViewProps {
  currentRole: UserRole;
  onSwitchRole?: (role: UserRole) => void;
}

export const RbacMatrixView: React.FC<RbacMatrixViewProps> = ({
  currentRole,
  onSwitchRole
}) => {
  const roles: { id: UserRole; label: string; desc: string }[] = [
    { id: 'SUPER_ADMIN', label: 'Super Admin', desc: 'Full multi-tenant system control and global configurations.' },
    { id: 'SCHOOL_ADMIN', label: 'School Admin', desc: 'Principal & VP access across all school operations.' },
    { id: 'TEACHER', label: 'Teacher', desc: 'Gradebook, attendance, and assignment management. Zero financial access.' },
    { id: 'ACCOUNTANT', label: 'Accountant', desc: 'Bursary fee ledgers, invoicing, and bank reconciliation.' },
    { id: 'PARENT', label: 'Parent', desc: 'Read-only access restricted strictly to linked children.' },
    { id: 'STUDENT', label: 'Student', desc: 'Read-only access to assignments, timetable, and study materials.' },
    { id: 'SCHOOL_OWNER', label: 'School Owner', desc: 'High-level financial KPIs and executive academic performance.' }
  ];

  const modules = [
    {
      module: "Gradebook & Assessment Entry",
      permissions: {
        SUPER_ADMIN: "FULL",
        SCHOOL_ADMIN: "FULL",
        TEACHER: "ASSIGNED_ONLY",
        ACCOUNTANT: "NONE",
        PARENT: "READ_CHILD",
        STUDENT: "READ_SELF",
        SCHOOL_OWNER: "READ_ONLY"
      }
    },
    {
      module: "Roll Call Attendance Register",
      permissions: {
        SUPER_ADMIN: "FULL",
        SCHOOL_ADMIN: "FULL",
        TEACHER: "ASSIGNED_ONLY",
        ACCOUNTANT: "NONE",
        PARENT: "READ_CHILD",
        STUDENT: "READ_SELF",
        SCHOOL_OWNER: "READ_ONLY"
      }
    },
    {
      module: "Bursary & Fee Management",
      permissions: {
        SUPER_ADMIN: "FULL",
        SCHOOL_ADMIN: "FULL",
        TEACHER: "NONE", // Strict constraint: Teachers never see finance!
        ACCOUNTANT: "FULL",
        PARENT: "PAY_CHILD",
        STUDENT: "NONE",
        SCHOOL_OWNER: "FULL"
      }
    },
    {
      module: "AI Interventions & Prescriptions",
      permissions: {
        SUPER_ADMIN: "FULL",
        SCHOOL_ADMIN: "FULL",
        TEACHER: "CREATE_MANAGE",
        ACCOUNTANT: "NONE",
        PARENT: "READ_CHILD",
        STUDENT: "NONE",
        SCHOOL_OWNER: "READ_ONLY"
      }
    },
    {
      module: "Audit Trail & System Logs",
      permissions: {
        SUPER_ADMIN: "FULL",
        SCHOOL_ADMIN: "READ_ONLY",
        TEACHER: "NONE",
        ACCOUNTANT: "NONE",
        PARENT: "NONE",
        STUDENT: "NONE",
        SCHOOL_OWNER: "READ_ONLY"
      }
    }
  ];

  const renderBadge = (perm: string) => {
    switch (perm) {
      case 'FULL':
        return <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">FULL ACCESS</span>;
      case 'ASSIGNED_ONLY':
      case 'CREATE_MANAGE':
        return <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold text-[10px]">ASSIGNED ONLY</span>;
      case 'READ_CHILD':
      case 'PAY_CHILD':
        return <span className="px-2 py-0.5 rounded bg-violet-50 text-violet-700 font-bold text-[10px]">CHILD ONLY</span>;
      case 'READ_SELF':
        return <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px]">SELF ONLY</span>;
      case 'READ_ONLY':
        return <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[10px]">READ ONLY</span>;
      case 'NONE':
      default:
        return <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-semibold text-[10px]">NO ACCESS</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">Role-Based Access Control (RBAC)</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
              Zero-Trust Model
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Enforces strict data boundaries: faculty cannot view financial records, and guardians can only view their linked children.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Current Simulated Role:</span>
          <span className="font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
            {currentRole}
          </span>
        </div>
      </div>

      {/* Role Switcher Sandbox Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {roles.map(r => (
          <button
            key={r.id}
            id={`role-btn-${r.id}`}
            onClick={() => onSwitchRole?.(r.id)}
            className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
              currentRole === r.id
                ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
            }`}
          >
            <div>
              <div className="text-xs font-bold leading-tight">{r.label}</div>
              <div className={`text-[10px] mt-1 line-clamp-2 ${currentRole === r.id ? 'text-indigo-100' : 'text-slate-400'}`}>
                {r.desc}
              </div>
            </div>
            {currentRole === r.id && (
              <span className="text-[10px] font-bold mt-2 uppercase tracking-wider text-indigo-200">Active</span>
            )}
          </button>
        ))}
      </div>

      {/* Permissions Matrix Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">Enterprise Entitlements & Guardrails Matrix</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200 text-[10px]">
              <tr>
                <th className="py-3 px-4">Functional Module</th>
                <th className="py-3 px-2 text-center">School Admin</th>
                <th className="py-3 px-2 text-center">Teacher</th>
                <th className="py-3 px-2 text-center">Accountant</th>
                <th className="py-3 px-2 text-center">Parent</th>
                <th className="py-3 px-2 text-center">Student</th>
                <th className="py-3 px-2 text-center">School Owner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {modules.map((m, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{m.module}</td>
                  <td className="py-3.5 px-2 text-center">{renderBadge(m.permissions.SCHOOL_ADMIN)}</td>
                  <td className="py-3.5 px-2 text-center">{renderBadge(m.permissions.TEACHER)}</td>
                  <td className="py-3.5 px-2 text-center">{renderBadge(m.permissions.ACCOUNTANT)}</td>
                  <td className="py-3.5 px-2 text-center">{renderBadge(m.permissions.PARENT)}</td>
                  <td className="py-3.5 px-2 text-center">{renderBadge(m.permissions.STUDENT)}</td>
                  <td className="py-3.5 px-2 text-center">{renderBadge(m.permissions.SCHOOL_OWNER)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

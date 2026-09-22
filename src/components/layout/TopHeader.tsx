import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  ChevronDown, 
  Smartphone, 
  Tablet, 
  Monitor, 
  School, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  ExternalLink,
  BookOpen,
  UserCheck
} from 'lucide-react';
import { UserRole, NotificationItem } from '../../types';
import { SCHOOL_INFO, MOCK_NOTIFICATIONS } from '../../data/mockData';

interface TopHeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  viewportMode: 'desktop' | 'tablet' | 'mobile';
  onViewportModeChange: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  onOpenSearch: () => void;
  onOpenOnboarding: () => void;
  onOpenAuth: () => void;
  onNavigate: (section: string) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentRole,
  onRoleChange,
  viewportMode,
  onViewportModeChange,
  onOpenSearch,
  onOpenOnboarding,
  onOpenAuth,
  onNavigate
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const roles: { role: UserRole; label: string; description: string; badge: string }[] = [
    { role: 'SUPER_ADMIN', label: 'Super Admin', description: 'Enterprise Multi-School & RBAC Matrix', badge: 'Full Access' },
    { role: 'SCHOOL_ADMIN', label: 'School Admin', description: 'Executive Dashboard & Operations', badge: 'Leadership' },
    { role: 'TEACHER', label: 'Teacher', description: 'Speed Attendance, Smart Gradebook & AI Copilot', badge: 'Classroom' },
    { role: 'PARENT', label: 'Parent Portal', description: 'Child Trajectory, Concept Mastery & Fee Payments', badge: 'Family' },
    { role: 'STUDENT', label: 'Student Portal', description: 'Assignments, Progress & Study Guides', badge: 'Learner' },
    { role: 'ACCOUNTANT', label: 'Bursar / Accountant', description: 'Fee Collections, Invoicing & Reconciliation', badge: 'Finance' },
    { role: 'SCHOOL_OWNER', label: 'School Owner / Trustee', description: 'High-Level Growth & Financial Health', badge: 'Executive' }
  ];

  const currentRoleInfo = roles.find(r => r.role === currentRole) || roles[0];

  const unreadNotifs = MOCK_NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 lg:px-6 py-2.5 transition-all">
      <div className="flex items-center justify-between gap-3 max-w-7xl mx-auto">
        
        {/* Left: Branding & School badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200">
              <span className="font-display tracking-tight text-lg">K</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-base text-slate-900 tracking-tight">Kura<span className="text-indigo-600">OS</span></span>
                <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  School OS
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500">
                <School className="w-3 h-3 text-slate-400" />
                <span className="truncate max-w-[150px] sm:max-w-[200px]">{SCHOOL_INFO.name}</span>
              </div>
            </div>
          </div>

          <div className="hidden xl:flex items-center gap-2 pl-3 border-l border-slate-200">
            <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {SCHOOL_INFO.term}
            </span>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-md mx-2 hidden md:block">
          <button
            id="top-search-trigger"
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-400 hover:border-slate-300 hover:bg-slate-100/70 transition text-xs shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search students, classes, invoices, reports...</span>
            </div>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 rounded shadow-xs">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Controls: Viewport toggle + Role Switcher + Notifs + User */}
        <div className="flex items-center gap-2">
          
          {/* Viewport Simulator Toggle (Crucial to test mobile-first parent portal & tablet view) */}
          <div className="hidden lg:flex items-center p-0.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600">
            <button
              id="viewport-desktop"
              title="Desktop View"
              onClick={() => onViewportModeChange('desktop')}
              className={`p-1.5 rounded-md text-xs flex items-center gap-1 transition cursor-pointer ${
                viewportMode === 'desktop' ? 'bg-white shadow-xs font-semibold text-indigo-700' : 'hover:text-slate-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              id="viewport-tablet"
              title="Tablet Simulation (768px)"
              onClick={() => onViewportModeChange('tablet')}
              className={`p-1.5 rounded-md text-xs flex items-center gap-1 transition cursor-pointer ${
                viewportMode === 'tablet' ? 'bg-white shadow-xs font-semibold text-indigo-700' : 'hover:text-slate-900'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              id="viewport-mobile"
              title="Mobile Simulation (390px iPhone)"
              onClick={() => onViewportModeChange('mobile')}
              className={`p-1.5 rounded-md text-xs flex items-center gap-1 transition cursor-pointer ${
                viewportMode === 'mobile' ? 'bg-white shadow-xs font-semibold text-indigo-700' : 'hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Onboarding Button */}
          <button
            id="header-onboarding-btn"
            onClick={onOpenOnboarding}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-700 text-xs font-medium hover:bg-indigo-100 transition shadow-2xs cursor-pointer"
            title="Launch School Setup Wizard"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Onboarding Wizard</span>
          </button>

          {/* Role Switcher Dropdown */}
          <div className="relative">
            <button
              id="role-switcher-dropdown"
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition text-xs font-medium text-slate-800 shadow-2xs cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span className="font-semibold">{currentRoleInfo.label}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div 
                className="absolute right-0 mt-2 w-72 rounded-xl bg-white shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                onClick={() => setShowRoleMenu(false)}
              >
                <div className="px-3 py-1.5 border-b border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Switch Active Persona
                  </span>
                </div>
                {roles.map(r => (
                  <button
                    key={r.role}
                    id={`select-role-${r.role}`}
                    onClick={() => {
                      onRoleChange(r.role);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-start justify-between hover:bg-slate-50 transition cursor-pointer ${
                      currentRole === r.role ? 'bg-indigo-50/60 font-semibold text-indigo-900' : 'text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-medium flex items-center gap-1.5">
                        {r.label}
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-normal">
                          {r.badge}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{r.description}</div>
                    </div>
                    {currentRole === r.role && <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              id="top-notif-btn"
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 relative transition cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </button>

            {showNotifMenu && (
              <div 
                className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
              >
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Notifications ({MOCK_NOTIFICATIONS.length})</span>
                  <button 
                    onClick={() => {
                      onNavigate('notifications');
                      setShowNotifMenu(false);
                    }}
                    className="text-xs text-indigo-600 hover:underline font-medium"
                  >
                    View All
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {MOCK_NOTIFICATIONS.slice(0, 4).map(notif => (
                    <div 
                      key={notif.id} 
                      className={`p-3 text-xs hover:bg-slate-50 cursor-pointer transition ${!notif.read ? 'bg-indigo-50/30' : ''}`}
                      onClick={() => {
                        onNavigate('notifications');
                        setShowNotifMenu(false);
                      }}
                    >
                      <div className="flex items-center justify-between font-semibold text-slate-900 mb-1">
                        <span>{notif.title}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{notif.timestamp}</span>
                      </div>
                      <p className="text-slate-600 leading-snug">{notif.message}</p>
                      {notif.relatedStudent && (
                        <span className="inline-block mt-1.5 text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                          {notif.relatedStudent}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar / Sign In */}
          <button
            id="user-profile-btn"
            onClick={onOpenAuth}
            className="flex items-center gap-2 pl-1 cursor-pointer"
            title="Account & Security"
          >
            <div className="w-8 h-8 rounded-full ring-2 ring-indigo-500/20 bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {currentRole === 'PARENT' ? 'EA' : currentRole === 'TEACHER' ? 'FA' : 'KA'}
            </div>
          </button>

        </div>
      </div>
    </header>
  );
};

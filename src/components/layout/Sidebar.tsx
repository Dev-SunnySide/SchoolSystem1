import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Layers, 
  CalendarCheck, 
  ClipboardCheck, 
  FileText, 
  CreditCard, 
  Sparkles, 
  ShieldAlert, 
  BarChart3, 
  History, 
  Settings, 
  Bell, 
  BookOpen, 
  Bot, 
  CheckSquare, 
  Lock, 
  ChevronLeft, 
  ChevronRight,
  HelpCircle,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';
import { UserRole } from '../../types';

interface SidebarProps {
  currentRole: UserRole;
  activeSection: string;
  onNavigate: (section: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRole,
  activeSection,
  onNavigate,
  isCollapsed,
  onToggleCollapse
}) => {

  const getNavItems = (): { group: string; items: NavItem[] }[] => {
    switch (currentRole) {
      case 'PARENT':
        return [
          {
            group: 'Parent Portal',
            items: [
              { id: 'parent-home', label: 'Child Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: 'academics', label: 'Academics & Mastery', icon: <BookOpen className="w-4 h-4" />, badge: 'Math Alert', badgeColor: 'bg-rose-100 text-rose-700' },
              { id: 'attendance', label: 'Attendance Calendar', icon: <CalendarCheck className="w-4 h-4" /> },
              { id: 'assignments', label: 'Assignments', icon: <CheckSquare className="w-4 h-4" />, badge: '1 Due Today', badgeColor: 'bg-amber-100 text-amber-700' },
              { id: 'finance', label: 'Fees & Payments', icon: <CreditCard className="w-4 h-4" />, badge: '₦70k Due', badgeColor: 'bg-indigo-100 text-indigo-700' },
              { id: 'ai-insights', label: 'AI Diagnostic Insights', icon: <Sparkles className="w-4 h-4" /> },
              { id: 'notifications', label: 'Alerts & Messages', icon: <Bell className="w-4 h-4" /> }
            ]
          }
        ];

      case 'STUDENT':
        return [
          {
            group: 'Student Portal',
            items: [
              { id: 'student-home', label: 'My Learning Hub', icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: 'academics', label: 'Subject Progress', icon: <BookOpen className="w-4 h-4" /> },
              { id: 'assignments', label: 'My Assignments', icon: <CheckSquare className="w-4 h-4" />, badge: '2 Pending', badgeColor: 'bg-amber-100 text-amber-700' },
              { id: 'attendance', label: 'Attendance Record', icon: <CalendarCheck className="w-4 h-4" /> },
              { id: 'concept-mastery', label: 'Concept Quests', icon: <GraduationCap className="w-4 h-4" /> },
              { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> }
            ]
          }
        ];

      case 'TEACHER':
        return [
          {
            group: 'Teaching Suite',
            items: [
              { id: 'teacher-dashboard', label: 'Teacher Cockpit', icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: 'classes', label: 'My Classes (SS2A)', icon: <Layers className="w-4 h-4" /> },
              { id: 'attendance', label: 'Rapid Attendance', icon: <CalendarCheck className="w-4 h-4" />, badge: 'Pending', badgeColor: 'bg-amber-100 text-amber-700' },
              { id: 'gradebook', label: 'Smart Gradebook', icon: <ClipboardCheck className="w-4 h-4" /> },
              { id: 'assignments', label: 'Assignments', icon: <CheckSquare className="w-4 h-4" /> },
              { id: 'assessments', label: 'Assessments', icon: <FileText className="w-4 h-4" /> },
              { id: 'ai-assistant', label: 'AI Teaching Copilot', icon: <Bot className="w-4 h-4" />, badge: 'Assistant', badgeColor: 'bg-indigo-100 text-indigo-700' },
              { id: 'class-insights', label: 'Class Insights & Bottlenecks', icon: <Sparkles className="w-4 h-4" /> },
              { id: 'interventions', label: 'Interventions Center', icon: <ShieldAlert className="w-4 h-4" /> },
              { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> }
            ]
          }
        ];

      case 'ACCOUNTANT':
        return [
          {
            group: 'Bursary & Finance',
            items: [
              { id: 'financial-intelligence', label: 'Financial Analytics', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'finance', label: 'Invoices & Ledger', icon: <CreditCard className="w-4 h-4" />, badge: '78.4% Paid', badgeColor: 'bg-emerald-100 text-emerald-700' },
              { id: 'students', label: 'Student Billing List', icon: <Users className="w-4 h-4" /> },
              { id: 'reports', label: 'Financial Statements', icon: <FileText className="w-4 h-4" /> },
              { id: 'audit-logs', label: 'Audit Trail', icon: <History className="w-4 h-4" /> },
              { id: 'notifications', label: 'Bursary Alerts', icon: <Bell className="w-4 h-4" /> }
            ]
          }
        ];

      case 'SUPER_ADMIN':
      case 'SCHOOL_OWNER':
      case 'SCHOOL_ADMIN':
      default:
        return [
          {
            group: 'Intelligence & Command',
            items: [
              { id: 'admin-dashboard', label: 'Executive Command', icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: 'academic-intelligence', label: 'Academic Intelligence', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'financial-intelligence', label: 'Financial Intelligence', icon: <TrendingUp className="w-4 h-4" /> },
              { id: 'ai-intelligence', label: 'AI Predictions Center', icon: <BrainCircuit className="w-4 h-4" />, badge: 'v2.4', badgeColor: 'bg-violet-100 text-violet-700' },
              { id: 'interventions', label: 'Intervention Engine', icon: <ShieldAlert className="w-4 h-4" />, badge: '4 Active', badgeColor: 'bg-rose-100 text-rose-700' }
            ]
          },
          {
            group: 'School Operations',
            items: [
              { id: 'students', label: 'Students (360° View)', icon: <Users className="w-4 h-4" /> },
              { id: 'teachers', label: 'Faculty & Workload', icon: <GraduationCap className="w-4 h-4" /> },
              { id: 'classes', label: 'Class Directory', icon: <Layers className="w-4 h-4" /> },
              { id: 'attendance', label: 'Attendance Monitor', icon: <CalendarCheck className="w-4 h-4" /> },
              { id: 'assessments', label: 'Assessments & Exams', icon: <FileText className="w-4 h-4" /> },
              { id: 'finance', label: 'Fees & Invoicing', icon: <CreditCard className="w-4 h-4" /> },
              { id: 'gradebook', label: 'Gradebook Overview', icon: <ClipboardCheck className="w-4 h-4" /> }
            ]
          },
          {
            group: 'Governance & System',
            items: [
              { id: 'reports', label: 'Reports Generator', icon: <FileText className="w-4 h-4" /> },
              { id: 'audit-logs', label: 'Enterprise Audit Logs', icon: <History className="w-4 h-4" /> },
              { id: 'rbac', label: 'Role & RBAC Policies', icon: <Lock className="w-4 h-4" /> },
              { id: 'settings', label: 'School OS Settings', icon: <Settings className="w-4 h-4" /> }
            ]
          }
        ];
    }
  };

  const navGroups = getNavItems();

  return (
    <aside 
      className={`hidden md:flex flex-col bg-white border-r border-slate-200 transition-all duration-300 select-none ${
        isCollapsed ? 'w-18' : 'w-64'
      }`}
    >
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                {group.group}
              </div>
            )}
            {group.items.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                    isActive 
                      ? 'bg-indigo-600 text-white font-semibold shadow-xs shadow-indigo-200' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <span className={`${isActive ? 'text-white' : 'text-slate-500'}`}>
                    {item.icon}
                  </span>
                  
                  {!isCollapsed && (
                    <div className="flex-1 flex items-center justify-between overflow-hidden">
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${item.badgeColor || 'bg-slate-100 text-slate-600'}`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Collapse Toggle & System Status */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/60">
        {!isCollapsed && (
          <div className="mb-2 p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
              <span className="font-semibold text-slate-700">AI Intelligence Core</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              Model EduPredict v2.4 • 99.8% Uptime
            </div>
          </div>
        )}

        <button
          id="sidebar-collapse-toggle"
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition text-xs cursor-pointer"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : (
            <span className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse Navigation</span>
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

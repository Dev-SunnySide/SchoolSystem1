import React from 'react';
import { 
  Home, 
  BookOpen, 
  CalendarCheck, 
  CreditCard, 
  CheckSquare, 
  Sparkles, 
  ClipboardCheck, 
  Layers, 
  Bell 
} from 'lucide-react';
import { UserRole } from '../../types';

interface MobileBottomNavProps {
  currentRole: UserRole;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentRole,
  activeSection,
  onNavigate
}) => {
  const getTabs = () => {
    if (currentRole === 'PARENT') {
      return [
        { id: 'parent-home', label: 'Home', icon: <Home className="w-5 h-5" /> },
        { id: 'academics', label: 'Academics', icon: <BookOpen className="w-5 h-5" /> },
        { id: 'attendance', label: 'Attendance', icon: <CalendarCheck className="w-5 h-5" /> },
        { id: 'assignments', label: 'Tasks', icon: <CheckSquare className="w-5 h-5" /> },
        { id: 'finance', label: 'Fees', icon: <CreditCard className="w-5 h-5" /> }
      ];
    }

    if (currentRole === 'TEACHER') {
      return [
        { id: 'teacher-dashboard', label: 'Today', icon: <Home className="w-5 h-5" /> },
        { id: 'attendance', label: 'Roll Call', icon: <CalendarCheck className="w-5 h-5" /> },
        { id: 'gradebook', label: 'Grades', icon: <ClipboardCheck className="w-5 h-5" /> },
        { id: 'ai-assistant', label: 'AI Copilot', icon: <Sparkles className="w-5 h-5" /> },
        { id: 'interventions', label: 'At-Risk', icon: <Layers className="w-5 h-5" /> }
      ];
    }

    // Default for Admin / Student / Accountant
    return [
      { id: 'admin-dashboard', label: 'Overview', icon: <Home className="w-5 h-5" /> },
      { id: 'academic-intelligence', label: 'Academics', icon: <BookOpen className="w-5 h-5" /> },
      { id: 'students', label: 'Students', icon: <Layers className="w-5 h-5" /> },
      { id: 'finance', label: 'Bursary', icon: <CreditCard className="w-5 h-5" /> },
      { id: 'notifications', label: 'Alerts', icon: <Bell className="w-5 h-5" /> }
    ];
  };

  const tabs = getTabs();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 shadow-lg">
      <div className="flex items-center justify-around">
        {tabs.map(tab => {
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              id={`mobile-nav-${tab.id}`}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-medium transition cursor-pointer min-w-[54px] ${
                isActive ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className={`p-1 rounded-md transition ${isActive ? 'bg-indigo-50 text-indigo-600' : ''}`}>
                {tab.icon}
              </div>
              <span className="mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

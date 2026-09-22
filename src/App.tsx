import React, { useState } from 'react';
import { UserRole } from './types';
import { MOCK_STUDENTS, MOCK_CLASSES } from './data/mockData';

// Layout Components
import { TopHeader } from './components/layout/TopHeader';
import { Sidebar } from './components/layout/Sidebar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';

// Parent Views
import { ParentDashboard } from './components/parent/ParentDashboard';
import { FeePaymentModal } from './components/parent/FeePaymentModal';

// Teacher Views
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { SpeedAttendanceEntry } from './components/teacher/SpeedAttendanceEntry';
import { SmartGradebook } from './components/teacher/SmartGradebook';
import { TeacherAiAssistant } from './components/teacher/TeacherAiAssistant';
import { ClassInsightsView } from './components/teacher/ClassInsightsView';

// Admin & Intelligence Views
import { ExecutiveDashboard } from './components/admin/ExecutiveDashboard';
import { AcademicIntelligenceView } from './components/admin/AcademicIntelligenceView';
import { FinancialIntelligenceView } from './components/admin/FinancialIntelligenceView';
import { StudentManagementView } from './components/admin/StudentManagementView';
import { InterventionCenter } from './components/interventions/InterventionCenter';
import { AiIntelligenceCenter } from './components/ai/AiIntelligenceCenter';
import { ReportsCenter } from './components/reports/ReportsCenter';
import { AuditLogsView } from './components/system/AuditLogsView';
import { RbacMatrixView } from './components/system/RbacMatrixView';
import { SchoolOnboardingWizard } from './components/system/SchoolOnboardingWizard';
import { AuthSecurityModal } from './components/system/AuthSecurityModal';

export default function App() {
  // Navigation & Role State
  const [currentRole, setCurrentRole] = useState<UserRole>('SCHOOL_ADMIN');
  const [activeSection, setActiveSection] = useState<string>('executive-dashboard');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Modals & Drawers State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  
  // Cross-component context passing
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>('std-002'); // David Adeyemi default
  const [selectedCopilotStudent, setSelectedCopilotStudent] = useState<any | null>(null);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Switch role handler: auto-adjusts primary view according to persona
  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'PARENT') {
      setActiveSection('parent-dashboard');
    } else if (role === 'TEACHER') {
      setActiveSection('teacher-dashboard');
    } else if (role === 'ACCOUNTANT') {
      setActiveSection('financial-intelligence');
    } else if (role === 'STUDENT') {
      setActiveSection('student-courses');
    } else {
      setActiveSection('executive-dashboard');
    }
    showToast(`Switched active view persona to ${role.replace('_', ' ')}`);
  };

  const handleGlobalNavigate = (targetSection: string) => {
    setActiveSection(targetSection);
    // If navigating to a parent view from admin
    if (targetSection === 'parent-dashboard' && currentRole !== 'PARENT') {
      setCurrentRole('PARENT');
    } else if ((targetSection === 'teacher-dashboard' || targetSection === 'attendance' || targetSection === 'gradebook') && currentRole === 'PARENT') {
      setCurrentRole('TEACHER');
    }
  };

  // Render appropriate primary view
  const renderMainContent = () => {
    // 1. Parent Dashboard
    if (activeSection === 'parent-dashboard' || currentRole === 'PARENT') {
      return (
        <ParentDashboard
          onOpenPaymentModal={() => setIsFeeModalOpen(true)}
          onNavigate={(sec) => setActiveSection(sec)}
        />
      );
    }

    // 2. Teacher Specific Views
    if (activeSection === 'teacher-dashboard') {
      return (
        <TeacherDashboard
          onNavigate={(sec) => setActiveSection(sec)}
        />
      );
    }

    if (activeSection === 'attendance') {
      return (
        <SpeedAttendanceEntry
          onAttendanceSubmitted={() => showToast('Attendance register successfully submitted and locked.')}
        />
      );
    }

    if (activeSection === 'gradebook') {
      return (
        <SmartGradebook
          onOpenRemedialModal={(entry) => {
            setSelectedCopilotStudent(entry);
            setActiveSection('ai-assistant');
          }}
        />
      );
    }

    if (activeSection === 'ai-assistant') {
      return (
        <TeacherAiAssistant
          initialStudent={selectedCopilotStudent}
          onPublishAssignment={(title) => showToast(`Assignment "${title}" reviewed, approved and published to SS2A.`)}
        />
      );
    }

    if (activeSection === 'class-insights') {
      return (
        <ClassInsightsView
          onOpenCopilotWithTopic={(topic) => {
            setActiveSection('ai-assistant');
            showToast(`Loaded "${topic}" into AI Copilot for remedial drill creation.`);
          }}
        />
      );
    }

    // 3. Admin, Academic & Institutional Views
    if (activeSection === 'academic-intelligence' || activeSection === 'classes') {
      return (
        <AcademicIntelligenceView
          onNavigateToStudent={(stdId) => {
            setSelectedStudentId(stdId);
            setActiveSection('students');
          }}
        />
      );
    }

    if (activeSection === 'financial-intelligence') {
      return <FinancialIntelligenceView />;
    }

    if (activeSection === 'students') {
      return (
        <StudentManagementView
          initialSelectedStudentId={selectedStudentId}
          onOpenInterventionForStudent={(std) => {
            setSelectedStudentId(std.id);
            setActiveSection('interventions');
          }}
        />
      );
    }

    if (activeSection === 'interventions') {
      const targetStudent = MOCK_STUDENTS.find(s => s.id === selectedStudentId);
      return (
        <InterventionCenter
          initialStudent={targetStudent}
        />
      );
    }

    if (activeSection === 'ai-intelligence') {
      return <AiIntelligenceCenter />;
    }

    if (activeSection === 'reports') {
      return <ReportsCenter />;
    }

    if (activeSection === 'audit-logs') {
      return <AuditLogsView />;
    }

    if (activeSection === 'rbac' || activeSection === 'settings') {
      return (
        <RbacMatrixView
          currentRole={currentRole}
          onSwitchRole={handleRoleChange}
        />
      );
    }

    // Default Fallback: Executive Dashboard
    return (
      <ExecutiveDashboard
        onNavigate={(sec) => setActiveSection(sec)}
        onSelectStudent={(stdId) => {
          setSelectedStudentId(stdId);
          setActiveSection('students');
        }}
      />
    );
  };

  // Viewport Container Styling
  const getViewportWrapperClass = () => {
    switch (viewportMode) {
      case 'mobile':
        return 'max-w-[430px] my-6 mx-auto border-[8px] border-slate-800 rounded-[40px] shadow-2xl overflow-hidden bg-slate-50 min-h-[844px]';
      case 'tablet':
        return 'max-w-[820px] my-6 mx-auto border-[6px] border-slate-700 rounded-[32px] shadow-2xl overflow-hidden bg-slate-50 min-h-[900px]';
      case 'desktop':
      default:
        return 'w-full min-h-screen bg-slate-50';
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 animate-bounce duration-300">
          <div className="bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Top Header */}
      <TopHeader
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        viewportMode={viewportMode}
        onViewportModeChange={setViewportMode}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        onOpenAuth={() => setIsSecurityOpen(true)}
        onNavigate={handleGlobalNavigate}
      />

      {/* Main Shell (Sidebar + Content Stage) */}
      <div className={getViewportWrapperClass()}>
        <div className="flex h-full min-h-[calc(100vh-65px)]">
          {/* Role-Adaptive Sidebar (Hidden on mobile simulator or small screen) */}
          {viewportMode !== 'mobile' && (
            <Sidebar
              currentRole={currentRole}
              activeSection={activeSection}
              onNavigate={setActiveSection}
              isCollapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />
          )}

          {/* Primary Viewport Stage */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 md:pb-8 max-w-7xl mx-auto w-full transition-all">
            {renderMainContent()}
          </main>
        </div>

        {/* Mobile Bottom Navigation (Visible on mobile screens or mobile viewport simulator) */}
        {(viewportMode === 'mobile' || typeof window !== 'undefined' && window.innerWidth < 768) && (
          <MobileBottomNav
            currentRole={currentRole}
            activeSection={activeSection}
            onNavigate={setActiveSection}
          />
        )}
      </div>

      {/* Global Command / Search Modal (⌘K) */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(section, payload) => {
          if (payload?.studentId) {
            setSelectedStudentId(payload.studentId);
          }
          handleGlobalNavigate(section);
        }}
      />

      {/* Fee Payment Modal */}
      <FeePaymentModal
        isOpen={isFeeModalOpen}
        onClose={() => setIsFeeModalOpen(false)}
        studentName="David Adeyemi"
        studentClass="SS2A"
        outstandingAmount={135000}
      />

      {/* School Onboarding 10-Step Wizard */}
      <SchoolOnboardingWizard
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={() => {
          showToast('Apex Crest Academy onboarding completed! All school registers active.');
        }}
      />

      {/* Identity & Security Modal */}
      <AuthSecurityModal
        isOpen={isSecurityOpen}
        onClose={() => setIsSecurityOpen(false)}
        currentRole={currentRole}
        onSwitchRole={handleRoleChange}
      />
    </div>
  );
}

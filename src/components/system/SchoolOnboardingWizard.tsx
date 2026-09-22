import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  Layers, 
  Users, 
  UserPlus, 
  CreditCard, 
  BookOpen, 
  Bell, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Upload,
  Check,
  Rocket
} from 'lucide-react';
import { Modal } from '../common/UIComponents';

interface SchoolOnboardingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const SchoolOnboardingWizard: React.FC<SchoolOnboardingWizardProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [step, setStep] = useState(1);

  // Form states
  const [schoolName, setSchoolName] = useState('Apex Crest Academy');
  const [schoolType, setSchoolType] = useState('Combined Secondary (JSS & SS)');
  const [caWeight, setCaWeight] = useState('40');
  const [examWeight, setExamWeight] = useState('60');

  const stepsList = [
    { num: 1, title: 'School Info' },
    { num: 2, title: 'Academic Structure' },
    { num: 3, title: 'Staff Roster' },
    { num: 4, title: 'Student Import' },
    { num: 5, title: 'Guardian Link' },
    { num: 6, title: 'Fee Structure' },
    { num: 7, title: 'Grading Scale' },
    { num: 8, title: 'Notifications' },
    { num: 9, title: 'Review & Launch' },
    { num: 10, title: 'Go Live' }
  ];

  const handleNext = () => {
    if (step < 10) setStep(step + 1);
    else {
      onComplete();
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <Modal
      id="school-onboarding-modal"
      isOpen={isOpen}
      onClose={onClose}
      title="Institutional Onboarding Wizard"
      subtitle={`Step ${step} of 10 • Enterprise Setup Experience`}
      maxWidth="2xl"
    >
      <div className="space-y-6 text-xs">
        {/* Progress Bar & Indicators */}
        <div className="flex items-center justify-between overflow-x-auto pb-2 border-b border-slate-100 gap-1 text-[11px]">
          {stepsList.map(s => (
            <div 
              key={s.num} 
              className={`flex items-center gap-1 shrink-0 ${
                step === s.num ? 'text-indigo-600 font-bold' : step > s.num ? 'text-emerald-600 font-medium' : 'text-slate-400'
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step === s.num ? 'bg-indigo-600 text-white' : step > s.num ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
              }`}>
                {step > s.num ? '✓' : s.num}
              </div>
              <span className="hidden sm:inline">{s.title}</span>
            </div>
          ))}
        </div>

        {/* STEP 1: School Info */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">1. Welcome & Institutional Identity</h3>
            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official Registered School Name</label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">School Type & Curriculum</label>
                <select
                  value={schoolType}
                  onChange={(e) => setSchoolType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none bg-white"
                >
                  <option value="Combined Secondary (JSS & SS)">Combined Secondary (JSS & SS - WAEC/NECO/IGCSE)</option>
                  <option value="Senior Secondary Only (SS1-SS3)">Senior Secondary Only (SS1-SS3)</option>
                  <option value="K-12 Full Institution">K-12 Full Academy (Nursery, Primary, Secondary)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Physical Campus Address</label>
                <input
                  type="text"
                  defaultValue="Plot 14 Admiralty Way, Lekki Phase 1, Lagos State, Nigeria"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Academic Structure */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">2. Academic Structure & Class Arms</h3>
            <p className="text-slate-500">Define academic divisions and class arms active for the 2026/2027 academic session.</p>
            <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/50 space-y-2">
              <span className="font-bold text-indigo-950 block">Default Secondary Division:</span>
              <div className="grid grid-cols-2 gap-2 text-slate-700 font-medium">
                <div>✓ Junior Secondary: JSS1, JSS2, JSS3</div>
                <div>✓ Senior Secondary: SS1, SS2, SS3</div>
                <div>✓ Active Arms: Arm A, Arm B, Arm C</div>
                <div>✓ Session System: 3 Terms (Term 1, Term 2, Term 3)</div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Staff Setup */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">3. Faculty & Staff Roster Onboarding</h3>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center space-y-2">
              <Upload className="w-8 h-8 text-indigo-500 mx-auto" />
              <div className="font-bold text-slate-800">Drag & Drop Staff CSV Template</div>
              <div className="text-[11px] text-slate-500">Columns: Name, Email, Phone, Role (Admin, Teacher, Accountant), Subjects Assigned</div>
              <button 
                type="button"
                className="mt-2 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200"
              >
                Download Sample CSV Template
              </button>
            </div>
            <div className="text-emerald-700 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>76 Faculty Members Pre-staged for Apex Crest Academy</span>
            </div>
          </div>
        )}

        {/* STEP 4: Student Setup */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">4. Learner Enrollment & Admission Registry</h3>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-semibold text-slate-800">1,240 Enrolled Students Processed</div>
              <p className="text-slate-600">
                Automatic admission numbers issued in standard format: <code>ACA/2026/XXXX</code>.
              </p>
            </div>
          </div>
        )}

        {/* STEP 5: Guardian Link */}
        {step === 5 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">5. Parent & Guardian Linkage</h3>
            <p className="text-slate-600 leading-relaxed">
              Every learner is securely linked to one or more primary guardians with multi-factor SMS delivery and WhatsApp instant grade notifications.
            </p>
            <div className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
              <span>Automatic Parent Portal Access SMS Invites</span>
              <span className="font-bold text-emerald-700">Ready to Broadcast</span>
            </div>
          </div>
        )}

        {/* STEP 6: Fee Structure */}
        {step === 6 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">6. Statutory Fee Structure & Payment Gateways</h3>
            <div className="space-y-2 text-slate-700">
              <div className="p-3 rounded-lg border border-slate-200 flex justify-between">
                <span>Tuition Fee (Term 1)</span>
                <strong>₦170,000 / student</strong>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 flex justify-between">
                <span>Development & ICT Infrastructure Levy</span>
                <strong>₦40,000 / student</strong>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 flex justify-between">
                <span>Lab Materials & Science Practical Fee</span>
                <strong>₦25,000 / student</strong>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: Grading Scale */}
        {step === 7 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">7. Continuous Assessment & WAEC Grading Scale</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Continuous Assessment Weight (%)</label>
                <input
                  type="number"
                  value={caWeight}
                  onChange={(e) => setCaWeight(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Terminal Examination Weight (%)</label>
                <input
                  type="number"
                  value={examWeight}
                  onChange={(e) => setExamWeight(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
              Grade Boundaries: A1 (75-100%), B2 (70-74%), B3 (65-69%), C4 (60-64%), C5 (55-59%), C6 (50-54%), P7 (45-49%), P8 (40-44%), F9 (0-39%).
            </div>
          </div>
        )}

        {/* STEP 8: Notifications */}
        {step === 8 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">8. Multichannel Notification Channels</h3>
            <div className="space-y-2 text-slate-700">
              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200">
                <input type="checkbox" defaultChecked className="rounded text-indigo-600 h-4 w-4" />
                <span>Instant Daily Roll Call Absence SMS (Sent at 09:30 AM)</span>
              </label>
              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200">
                <input type="checkbox" defaultChecked className="rounded text-indigo-600 h-4 w-4" />
                <span>WhatsApp Weekly Academic Progress Digest</span>
              </label>
              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200">
                <input type="checkbox" defaultChecked className="rounded text-indigo-600 h-4 w-4" />
                <span>Automated Bursary Payment Receipts</span>
              </label>
            </div>
          </div>
        )}

        {/* STEP 9: Review & Confirmation */}
        {step === 9 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">9. Institutional Audit & Ready to Deploy</h3>
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
              <div className="font-bold text-emerald-950 flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>All 8 Operational Checklists Passed</span>
              </div>
              <ul className="space-y-1 text-slate-700 text-[11px]">
                <li>✓ Campus verified: Plot 14 Admiralty Way, Lekki</li>
                <li>✓ 76 Teachers mapped to class cohorts</li>
                <li>✓ 1,240 Students enrolled with unique admission tokens</li>
                <li>✓ Fee targets initialized: ₦125,000,000</li>
                <li>✓ Zero-Trust RBAC security enforced</li>
              </ul>
            </div>
          </div>
        )}

        {/* STEP 10: Celebration / Go-Live */}
        {step === 10 && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Rocket className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-display text-slate-900">Apex Crest Academy is Live on KuraOS</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                Your AI School Operating System is primed for active term roll call, real-time grade calculations, and explainable student interventions.
              </p>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 disabled:opacity-40 cursor-pointer flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <button
            id="onboarding-next-btn"
            type="button"
            onClick={handleNext}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <span>{step === 10 ? 'Enter KuraOS Dashboard' : step === 9 ? 'Deploy School System' : 'Save & Continue'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

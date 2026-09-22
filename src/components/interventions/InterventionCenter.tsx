import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Plus, 
  User, 
  Calendar, 
  TrendingUp, 
  AlertCircle,
  FileCheck,
  Send,
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { Intervention, Student } from '../../types';
import { MOCK_INTERVENTIONS, MOCK_STUDENTS } from '../../data/mockData';
import { RiskBadge, Modal } from '../common/UIComponents';

interface InterventionCenterProps {
  initialStudent?: Student | null;
}

export const InterventionCenter: React.FC<InterventionCenterProps> = ({
  initialStudent
}) => {
  const [interventions, setInterventions] = useState<Intervention[]>(MOCK_INTERVENTIONS);
  const [selectedIntervention, setSelectedIntervention] = useState<Intervention | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(!!initialStudent);

  // New Intervention Form State
  const [studentId, setStudentId] = useState(initialStudent?.id || 'std-002');
  const [title, setTitle] = useState(
    initialStudent ? `Remedial Mastery Intervention for ${initialStudent.name}` : 'Algebraic Fractions Foundation Clinic'
  );
  const [category, setCategory] = useState<'ACADEMIC' | 'ATTENDANCE' | 'BEHAVIORAL' | 'COMBINED'>('ACADEMIC');
  const [assignedTeacher, setAssignedTeacher] = useState('Mrs. Funke Adebayo');
  const [targetDate, setTargetDate] = useState('2026-10-30');
  const [notifyParent, setNotifyParent] = useState(true);
  const [actionSteps, setActionSteps] = useState('1. 2x weekly after-school peer tutoring\n2. Weekly diagnostic quizzes on fractions\n3. Parent weekly attendance check-in');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const student = MOCK_STUDENTS.find(s => s.id === studentId) || MOCK_STUDENTS[0];

    const newIntervention: Intervention = {
      id: `int-00${interventions.length + 1}`,
      studentId: student.id,
      studentName: student.name,
      classArm: student.arm,
      title,
      category,
      assignedTeacher,
      startDate: '2026-09-22',
      targetDate,
      status: 'ACTIVE',
      measurableVelocity: '+12% projected improvement in 3 weeks',
      aiRecommendedNotes: 'Recommended by Gemini EduPredict based on diagnostic quiz weaknesses and recent assignment drop.',
      actionPlan: actionSteps.split('\n').filter(s => s.trim().length > 0),
      parentNotified: notifyParent,
      outcomes: []
    };

    setInterventions([newIntervention, ...interventions]);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">Targeted Intervention Center</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
              Human-in-the-Loop Protocol
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Standard Operating Procedure: <strong>AI Detection → Teacher Review → Human Decision → Intervention Plan → Measurable Velocity Tracking</strong>
          </p>
        </div>

        <button
          id="create-intervention-btn"
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Launch New Intervention</span>
        </button>
      </div>

      {/* Ethical Governance Box */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4.5 text-xs text-amber-950 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block text-sm mb-0.5">Strict AI Governance & Child Safeguarding Policy</span>
          <p className="text-amber-900/90 leading-relaxed">
            KuraOS adheres strictly to ethical school operating standards: The platform <strong>never automatically punishes, expels, denies admission, alters official grades, or permanently labels students</strong> based on algorithmic risk scores. All interventions require formal faculty sign-off and continuous human review.
          </p>
        </div>
      </div>

      {/* Active Interventions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {interventions.map((item) => (
          <div
            key={item.id}
            id={`intervention-card-${item.id}`}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:border-indigo-300 transition"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 uppercase tracking-wider">
                  {item.category}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  item.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                }`}>
                  {item.status}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-snug">{item.title}</h3>
              <div className="text-xs text-slate-500 mt-1">
                Student: <strong>{item.studentName}</strong> • {item.classArm}
              </div>

              {/* Measurable velocity badge */}
              <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-2 text-xs text-emerald-900">
                <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">{item.measurableVelocity}</span>
              </div>

              {/* Action Plan items */}
              <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Prescribed Action Steps:</span>
                {(item.actionPlan || [item.recommendedAction || 'Targeted coursework review']).map((step, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Mentor: {item.assignedTeacher}</span>
              <button
                onClick={() => setSelectedIntervention(item)}
                className="text-indigo-600 font-semibold hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE INTERVENTION MODAL */}
      <Modal
        id="create-intervention-modal"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Formulate Targeted Student Intervention"
        subtitle="Approved human intervention plan with measurable recovery target"
        maxWidth="lg"
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Target Student</label>
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none bg-white font-medium"
            >
              {MOCK_STUDENTS.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.arm}) • Current Avg: {s.overallAverage}% • {s.riskLevel}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Intervention Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none bg-white font-medium"
              >
                <option value="ACADEMIC">Academic Remedial</option>
                <option value="ATTENDANCE">Attendance Recovery</option>
                <option value="BEHAVIORAL">Engagement & Study Habit</option>
                <option value="COMBINED">Combined Academic & Roll</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Assigned Supervising Teacher</label>
              <select
                value={assignedTeacher}
                onChange={(e) => setAssignedTeacher(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none bg-white font-medium"
              >
                <option value="Mrs. Funke Adebayo">Mrs. Funke Adebayo (Maths)</option>
                <option value="Mr. Kenneth Okon">Mr. Kenneth Okon (English)</option>
                <option value="Dr. Ibrahim Danladi">Dr. Ibrahim Danladi (Physics)</option>
                <option value="Mrs. Amaka Obi">Mrs. Amaka Obi (Guidance)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Plan Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g. Algebraic Fractions Mastery & After-School Clinic"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Prescribed Action Steps (One per line)</label>
            <textarea
              rows={3}
              required
              value={actionSteps}
              onChange={(e) => setActionSteps(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Completion Date</label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none bg-white font-medium"
              />
            </div>
            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={notifyParent}
                  onChange={(e) => setNotifyParent(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
                <span>Send SMS to Guardian</span>
              </label>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              id="submit-intervention-plan-btn"
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 cursor-pointer shadow-xs"
            >
              Approve & Launch Plan
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

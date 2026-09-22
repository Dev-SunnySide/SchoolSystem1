import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Edit3, 
  RefreshCw, 
  FileCheck, 
  AlertTriangle,
  Lightbulb,
  Clock,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { GradebookEntry } from '../../types';

interface GeneratedQuiz {
  title: string;
  topic: string;
  targetAudience: string;
  difficulty: string;
  questions: {
    number: number;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
}

interface TeacherAiAssistantProps {
  initialStudent?: GradebookEntry | null;
  onPublishAssignment?: (title: string) => void;
}

export const TeacherAiAssistant: React.FC<TeacherAiAssistantProps> = ({
  initialStudent,
  onPublishAssignment
}) => {
  const [prompt, setPrompt] = useState(
    initialStudent 
      ? `Create a 10-question fractions remedial exercise for ${initialStudent.studentName} scoring below 50%.`
      : "Create a 10-question fractions exercise for students scoring below 50%."
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState<GeneratedQuiz | null>({
    title: "Remedial Mastery Drill: Rational Fractions & Common Denominators",
    topic: "Fractions & Algebraic Terms",
    targetAudience: "Students with < 50% Quiz Diagnostic (SS2A)",
    difficulty: "Beginner → Intermediate (Stepped Progression)",
    questions: [
      {
        number: 1,
        question: "Simplify the algebraic fraction: (3x / 4) + (2x / 5)",
        options: ["(5x / 9)", "(23x / 20)", "(6x² / 20)", "(5x / 20)"],
        correctAnswer: "B: (23x / 20)",
        explanation: "Find LCD of 4 and 5 (which is 20). Convert terms: (15x / 20) + (8x / 20) = 23x / 20."
      },
      {
        number: 2,
        question: "Subtract the rational terms: (5 / 2y) - (1 / y)",
        options: ["(4 / y)", "(3 / 2y)", "(4 / 2y)", "(3 / y)"],
        correctAnswer: "B: (3 / 2y)",
        explanation: "Common denominator is 2y. Second term becomes 2 / 2y. Result: (5 - 2) / 2y = 3 / 2y."
      },
      {
        number: 3,
        question: "Solve for x: (2x / 3) = 8",
        options: ["x = 12", "x = 16", "x = 8", "x = 24"],
        correctAnswer: "A: x = 12",
        explanation: "Multiply both sides by 3 to get 2x = 24. Divide by 2: x = 12."
      },
      {
        number: 4,
        question: "Reduce to lowest terms: (4a²b) / (12ab³)",
        options: ["(a / 3b²)", "(a² / 3b)", "(4a / 12b²)", "(1 / 3b)"],
        correctAnswer: "A: (a / 3b²)",
        explanation: "Cancel common factor 4ab: numerator becomes a, denominator becomes 3b²."
      },
      {
        number: 5,
        question: "What is the lowest common denominator (LCD) for 1/(x-1) and 2/(x+1)?",
        options: ["(x - 1)", "(x + 1)", "(x - 1)(x + 1)", "2(x - 1)"],
        correctAnswer: "C: (x - 1)(x + 1)",
        explanation: "Since denominators are distinct linear polynomials with no common factors, LCD is their product."
      }
    ]
  });

  const [isApproved, setIsApproved] = useState(false);
  const [activeTab, setActiveTab] = useState<'questions' | 'answers'>('questions');

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsApproved(false);
    }, 1200);
  };

  const handleApproveAndPublish = () => {
    setIsApproved(true);
    if (generatedQuiz) {
      onPublishAssignment?.(generatedQuiz.title);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 font-display">AI Teacher Assistant Copilot</h1>
            <p className="text-xs text-slate-500">
              Generate differentiated remedial worksheets, quizzes, and lesson adaptations in seconds.
            </p>
          </div>
        </div>
      </div>

      {/* Prompt Composer & Quick Suggestions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Teaching Prompt Instructions
          </label>
          <span className="text-[11px] text-slate-400">Model: Gemini 2.0 Education Fine-Tune</span>
        </div>

        <div className="flex gap-2">
          <textarea
            id="teacher-copilot-prompt-input"
            rows={2}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 p-3 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            placeholder="E.g. Create a 10-question fractions exercise for students scoring below 50%..."
          />
          <button
            id="generate-copilot-btn"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition flex flex-col items-center justify-center gap-1 cursor-pointer disabled:opacity-60 shadow-xs"
          >
            {isGenerating ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>{isGenerating ? "Generating..." : "Generate"}</span>
          </button>
        </div>

        {/* Quick prompt templates */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-[11px] text-slate-400 font-medium">Quick Presets:</span>
          <button
            onClick={() => setPrompt("Create a 10-question fractions exercise for students scoring below 50%.")}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] transition cursor-pointer"
          >
            Fractions Sub-50% Remedial
          </button>
          <button
            onClick={() => setPrompt("Draft a 5-question simultaneous equations quiz with word problems for SS2A.")}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] transition cursor-pointer"
          >
            Simultaneous Equations Quiz
          </button>
          <button
            onClick={() => setPrompt("Generate a warm, encouraging SMS notification for parents of students with improved attendance.")}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] transition cursor-pointer"
          >
            Positive Parent Note
          </button>
        </div>
      </div>

      {/* Generated Material Inspection & Human-in-the-Loop Approval */}
      {generatedQuiz && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Top Bar with Status & Actions */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-50/60 via-slate-50 to-white border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800 uppercase tracking-wider">
                  AI Generated Draft
                </span>
                <span className="text-xs text-slate-500">• {generatedQuiz.targetAudience}</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 font-display mt-1">
                {generatedQuiz.title}
              </h2>
              <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                <span>Topic: <strong>{generatedQuiz.topic}</strong></span>
                <span>Progression: <strong>{generatedQuiz.difficulty}</strong></span>
              </div>
            </div>

            {/* Action Buttons: Review, Edit, Regenerate, Approve & Publish */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleGenerate()}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                <span>Regenerate</span>
              </button>

              <button
                id="approve-publish-quiz-btn"
                onClick={handleApproveAndPublish}
                disabled={isApproved}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs ${
                  isApproved 
                    ? 'bg-emerald-600 text-white cursor-default' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                <FileCheck className="w-4 h-4" />
                <span>{isApproved ? 'Approved & Published ✓' : 'Approve & Publish'}</span>
              </button>
            </div>
          </div>

          {/* Teacher Review Guard Notice */}
          <div className="px-5 py-2.5 bg-amber-50/80 border-b border-amber-200/60 text-xs text-amber-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Teacher Governance Requirement:</strong> You must review curriculum alignment and answer keys before publishing educational content to students.
            </span>
          </div>

          {/* Toggle between Questions and Answer Key */}
          <div className="border-b border-slate-100 px-5 flex gap-4 text-xs">
            <button
              onClick={() => setActiveTab('questions')}
              className={`py-3 font-semibold border-b-2 transition cursor-pointer ${
                activeTab === 'questions' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Questions View ({generatedQuiz.questions.length})
            </button>
            <button
              onClick={() => setActiveTab('answers')}
              className={`py-3 font-semibold border-b-2 transition cursor-pointer ${
                activeTab === 'answers' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Teacher Answer Key & Explanations
            </button>
          </div>

          {/* Questions Content */}
          <div className="p-5 space-y-4 text-xs">
            {activeTab === 'questions' && (
              <div className="space-y-4">
                {generatedQuiz.questions.map((q) => (
                  <div key={q.number} className="p-4 rounded-xl border border-slate-200 bg-slate-50/40">
                    <div className="flex items-start justify-between font-semibold text-slate-900 mb-2">
                      <span>{q.number}. {q.question}</span>
                      <button className="text-slate-400 hover:text-indigo-600">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {q.options.map((opt, oIdx) => (
                        <div key={oIdx} className="p-2 bg-white rounded-lg border border-slate-200 text-slate-700">
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'answers' && (
              <div className="space-y-3">
                {generatedQuiz.questions.map((q) => (
                  <div key={q.number} className="p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/40">
                    <div className="font-semibold text-slate-900 mb-1">
                      Question {q.number}: {q.question}
                    </div>
                    <div className="text-emerald-800 font-bold mb-1">
                      Answer: {q.correctAnswer}
                    </div>
                    <div className="text-slate-600 italic">
                      Explanation: {q.explanation}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

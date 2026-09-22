import React from 'react';
import { 
  Sparkles, 
  AlertTriangle, 
  Users, 
  ArrowRight, 
  TrendingDown, 
  CheckCircle2, 
  Layers, 
  BookOpen,
  PieChart
} from 'lucide-react';
import { RiskBadge } from '../common/UIComponents';

interface ClassInsightsViewProps {
  onOpenCopilotWithTopic?: (topic: string) => void;
}

export const ClassInsightsView: React.FC<ClassInsightsViewProps> = ({
  onOpenCopilotWithTopic
}) => {
  const topics = [
    {
      name: "Simultaneous Equations (Elimination Method)",
      strugglePercent: 38,
      status: "AT_RISK" as const,
      strugglingCount: 14,
      totalCount: 38,
      difficultyRating: "High Error Frequency",
      commonError: "Sign inversion during equation subtraction (76% of missed marks)",
      recommendedAction: "Reteach 30-min targeted session on negative signs before linear programming",
      remedialActivity: "5-question elimination drill with step-by-step sign checks"
    },
    {
      name: "Fractions & Algebraic Terms",
      strugglePercent: 29,
      status: "NEEDS_ATTENTION" as const,
      strugglingCount: 11,
      totalCount: 38,
      difficultyRating: "Moderate Error Frequency",
      commonError: "Finding common denominators in polynomial denominators",
      recommendedAction: "Pair struggling students with top performers for 20-min peer practice",
      remedialActivity: "Rational fractions stepped worksheet"
    },
    {
      name: "Circle Theorems (Tangent & Alternate Segment)",
      strugglePercent: 18,
      status: "ON_TRACK" as const,
      strugglingCount: 7,
      totalCount: 38,
      difficultyRating: "Normal Distribution",
      commonError: "Distinguishing inscribed angles vs central angles",
      recommendedAction: "Visual geometry dynamic compass exercises",
      remedialActivity: "Theorem proof recognition flash cards"
    },
    {
      name: "Descriptive Statistics (Mean, Median, Mode)",
      strugglePercent: 12,
      status: "ON_TRACK" as const,
      strugglingCount: 5,
      totalCount: 38,
      difficultyRating: "High Mastery",
      commonError: "Interpolating grouped median class intervals",
      recommendedAction: "Maintain current progression; introduce standard deviation",
      remedialActivity: "Advanced variance extension problems"
    }
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 font-display">SS2A Class-Level Intelligence</h1>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                Mathematics Cohort
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Aggregated concept bottlenecks and student distributions across 38 enrolled learners.
            </p>
          </div>
          <div className="text-xs text-slate-500">
            Form Teacher: <strong className="text-slate-800">Mrs. Funke Adebayo</strong>
          </div>
        </div>
      </div>

      {/* Primary Highlight Alert */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-850 to-slate-900 text-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-indigo-700/80 text-white shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5 text-indigo-300" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider">
                Critical Cohort Bottleneck Detected
              </span>
              <span className="px-2 py-0.2 rounded text-[10px] bg-rose-500 text-white font-bold">
                Action Required
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold font-display mt-1 text-white">
              "38% of SS2A students struggled with simultaneous equations in the latest assessment."
            </h2>
            <p className="text-xs text-indigo-200 mt-2 leading-relaxed max-w-3xl">
              14 out of 38 students failed Question 4 (Word Problem & Elimination Method). The prevailing root cause is arithmetic sign confusion when subtracting negative terms. Without remedial reinforcement, upcoming quadratic curves will compound the deficit.
            </p>

            <div className="mt-4 pt-3 border-t border-indigo-800 flex flex-wrap gap-3">
              <button
                id="generate-remedial-from-bottleneck-btn"
                onClick={() => onOpenCopilotWithTopic?.("Simultaneous Equations")}
                className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Launch AI Copilot for this Topic</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Topic Weakness & Student Distribution Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topics.map((t, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-sm font-bold text-slate-900 leading-snug">{t.name}</h3>
                <RiskBadge level={t.status} size="sm" />
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-xs text-slate-600 my-3 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px]">Struggling Cohort</span>
                  <span className="text-base font-bold text-slate-900">{t.strugglePercent}%</span>
                  <span className="text-[11px] text-slate-500"> ({t.strugglingCount}/{t.totalCount} students)</span>
                </div>
                <div className="pl-4 border-l border-slate-200">
                  <span className="text-slate-400 block text-[10px]">Difficulty Metric</span>
                  <span className="font-semibold text-slate-700">{t.difficultyRating}</span>
                </div>
              </div>

              {/* Common Pitfall */}
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-bold text-slate-700 block text-[11px]">Primary Error Pattern:</span>
                  <p className="text-slate-600 mt-0.5">{t.commonError}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-indigo-900 block text-[11px]">Suggested Teaching Action:</span>
                  <p className="text-slate-700 mt-0.5">{t.recommendedAction}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Remedial: {t.remedialActivity}</span>
              <button
                onClick={() => onOpenCopilotWithTopic?.(t.name)}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Generate Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

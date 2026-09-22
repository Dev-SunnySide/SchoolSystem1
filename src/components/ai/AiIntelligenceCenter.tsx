import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  BrainCircuit, 
  AlertTriangle, 
  CalendarCheck, 
  BookOpen, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle,
  BarChart2,
  Cpu,
  History,
  Activity
} from 'lucide-react';
import { MOCK_AI_INSIGHTS, MOCK_HISTORICAL_PREDICTIONS } from '../../data/mockData';

export const AiIntelligenceCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'insights' | 'correlation' | 'model-monitoring'>('insights');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">AI Intelligence & Model Governance</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
              EduPredict v2.4
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Explainable institutional pattern recognition, engagement velocity tracking, and model calibration history.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeTab === 'insights' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Insights Feed
          </button>
          <button
            onClick={() => setActiveTab('correlation')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeTab === 'correlation' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Attendance-Grade Analytics
          </button>
          <button
            onClick={() => setActiveTab('model-monitoring')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeTab === 'model-monitoring' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Model Verification
          </button>
        </div>
      </div>

      {/* TAB 1: Insights Feed */}
      {activeTab === 'insights' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_AI_INSIGHTS.map((insight) => (
              <div
                key={insight.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 uppercase tracking-wider">
                      {insight.type.replace('_', ' ')}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      Confidence: <strong>{insight.confidence}%</strong>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{insight.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{insight.description || insight.summary}</p>

                  {/* Impact & Metric Change */}
                  <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Observed Shift:</span>
                    <span className={`font-bold font-display ${
                      insight.metricChange && insight.metricChange < 0 ? 'text-rose-600' : 'text-emerald-600'
                    }`}>
                      {insight.metricChange ? `${insight.metricChange > 0 ? '+' : ''}${insight.metricChange}%` : 'Pattern Detected'}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider">Suggested Administrative Action:</div>
                  <div className="text-xs text-slate-700 mt-0.5">{insight.suggestedAction || insight.recommendedAction}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Attendance-Performance Analytics */}
      {activeTab === 'correlation' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900 font-display">Multivariable Cohort Correlation</h2>
              <p className="text-xs text-slate-500">
                Cross-sectional study across 1,240 students analyzing Roll Call Attendance, Homework Completion, and Academic Test Averages.
              </p>
            </div>

            {/* Core Finding Card */}
            <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-950 space-y-2">
              <span className="font-bold text-sm block">Core Empirical Relationship:</span>
              <p className="text-base font-semibold leading-relaxed font-display text-indigo-900">
                "Students with attendance above 90% and assignment completion above 85% achieve an average score of 76%, compared to 52% for students below these thresholds."
              </p>
              <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-1.5 italic">
                <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
                <span><strong>Ethical Guardrail Note:</strong> Historical association detected, not proof of causation. Environmental, health, and socioeconomic factors affect individual outcomes.</span>
              </div>
            </div>

            {/* Comparison Bar Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
                <span className="font-bold text-emerald-950 block text-sm">High Engagement Cohort (780 Students)</span>
                <div className="flex justify-between text-slate-700">
                  <span>Attendance Rate:</span>
                  <strong className="text-slate-900">&gt; 90%</strong>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Assignment Completion:</span>
                  <strong className="text-slate-900">&gt; 85%</strong>
                </div>
                <div className="flex justify-between text-emerald-800 font-bold border-t border-emerald-200/60 pt-2 text-sm">
                  <span>Average Academic Score:</span>
                  <span className="text-base font-display">76.4%</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-2">
                <span className="font-bold text-rose-950 block text-sm">Low Engagement Cohort (140 Students)</span>
                <div className="flex justify-between text-slate-700">
                  <span>Attendance Rate:</span>
                  <strong className="text-slate-900">&lt; 85%</strong>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Assignment Completion:</span>
                  <strong className="text-slate-900">&lt; 70%</strong>
                </div>
                <div className="flex justify-between text-rose-800 font-bold border-t border-rose-200/60 pt-2 text-sm">
                  <span>Average Academic Score:</span>
                  <span className="text-base font-display">52.1%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Model Monitoring & Prediction History */}
      {activeTab === 'model-monitoring' && (
        <div className="space-y-6">
          {/* Engine Metadata Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm block">EduPredict v2.4 (Calibrated Classifier)</span>
                <span className="text-slate-500">Training Cutoff: 31 July 2026 • Accuracy: 91.4% • Cross-Validation F1: 0.89</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                Calibration Drift: 0.8% (Normal)
              </span>
            </div>
          </div>

          {/* Historical Prediction Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Historical Term 1 Prediction Audits</h3>
              <span className="text-xs text-slate-400">Verifying algorithmic projections against realized student marks</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Evaluation Interval</th>
                    <th className="py-3 px-4">Projected Term Score</th>
                    <th className="py-3 px-4">Actual Realized Score</th>
                    <th className="py-3 px-4 text-center">Variance / Error</th>
                    <th className="py-3 px-4 text-center">Confidence Interval</th>
                    <th className="py-3 px-4">Governance Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_HISTORICAL_PREDICTIONS.map((pred, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{pred.week}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">{pred.predicted}%</td>
                      <td className="py-3.5 px-4 font-semibold text-indigo-700">{pred.actual}%</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded font-mono font-bold ${
                          Math.abs(pred.error) <= 2 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {pred.error > 0 ? `+${pred.error}%` : `${pred.error}%`}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-semibold text-slate-800">
                        {pred.confidence}%
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">{pred.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

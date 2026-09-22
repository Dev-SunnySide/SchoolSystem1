import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Filter, 
  Eye, 
  CheckCircle2, 
  Calendar, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SCHOOL_INFO, MOCK_STUDENTS } from '../../data/mockData';
import { Modal } from '../common/UIComponents';

export const ReportsCenter: React.FC = () => {
  const [selectedReportType, setSelectedReportType] = useState<string>('ACADEMIC_REPORT_CARD');
  const [selectedClass, setSelectedClass] = useState<string>('SS2A');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const reportTypes = [
    {
      id: 'ACADEMIC_REPORT_CARD',
      name: 'Terminal Student Report Card',
      desc: 'Official comprehensive terminal dossier with subject marks, teacher remarks, attendance, and principal seal.',
      category: 'Academic'
    },
    {
      id: 'ATTENDANCE_SUMMARY',
      name: 'Monthly Roll Call Attendance Register',
      desc: 'Aggregated roll call records, daily percentages, excused medical leaves, and habitual tardiness warnings.',
      category: 'Attendance'
    },
    {
      id: 'FEE_COLLECTION',
      name: 'Bursary Fee Collection & Debt Ledger',
      desc: 'Institutional breakdown of collected vs outstanding balances, revenue by fee type, and bank settlement refs.',
      category: 'Finance'
    },
    {
      id: 'INTERVENTION_VELOCITY',
      name: 'Intervention Effectiveness & Velocity Audit',
      desc: 'Pre/post intervention performance evaluation, student recovery trajectories, and teacher clinic sign-offs.',
      category: 'Interventions'
    },
    {
      id: 'AI_INSIGHTS_SUMMARY',
      name: 'School AI Intelligence & Bottleneck Briefing',
      desc: 'Executive summary of syllabus bottlenecks, engagement drops, and risk driver correlations for governors.',
      category: 'Executive'
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleExportCsv = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      // Trigger download
      const csvContent = "data:text/csv;charset=utf-8,AdmissionNo,Name,Class,Average,Attendance,RiskLevel\n" + 
        MOCK_STUDENTS.map(s => `${s.admissionNo},${s.name},${s.arm},${s.overallAverage}%,${s.attendanceRate}%,${s.riskLevel}`).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `KuraOS_Report_${selectedReportType}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">Institutional Reports & Document Generator</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
              Printable & Exportable
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Generate audited PDF report cards, financial reconciliations, and executive intelligence briefings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCsv}
            disabled={isExporting}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>{isExporting ? 'Exporting CSV...' : 'Download CSV'}</span>
          </button>

          <button
            onClick={() => setPreviewOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Open Print Preview</span>
          </button>
        </div>
      </div>

      {/* Report Types List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportTypes.map((rpt) => {
          const isSelected = selectedReportType === rpt.id;
          return (
            <div
              key={rpt.id}
              onClick={() => setSelectedReportType(rpt.id)}
              className={`p-5 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                isSelected 
                  ? 'border-indigo-600 bg-indigo-50/30 shadow-sm ring-1 ring-indigo-500' 
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {rpt.category}
                  </span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                </div>
                <h3 className="text-sm font-bold text-slate-900 font-display">{rpt.name}</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{rpt.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                <span>Select for Generation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* PRINT PREVIEW MODAL (Simulated Formal Document with Apex Crest Academy Branding) */}
      <Modal
        id="report-preview-modal"
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title="Official Document Print Preview"
        subtitle="Formatted for A4 Standard Print & Archive"
        maxWidth="2xl"
      >
        <div className="space-y-4">
          <div className="flex justify-end gap-2 pb-2 border-b border-slate-100">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold text-xs flex items-center gap-1.5 hover:bg-indigo-700 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save to PDF</span>
            </button>
          </div>

          {/* Printable Document Sheet */}
          <div className="bg-white border border-slate-300 rounded-xl p-6 text-slate-900 font-serif text-xs space-y-5 shadow-inner">
            {/* School Header */}
            <div className="text-center border-b-2 border-slate-900 pb-4">
              <h2 className="text-xl font-bold uppercase tracking-wider font-display text-slate-900">{SCHOOL_INFO.name}</h2>
              <p className="text-[11px] text-slate-600 font-sans mt-0.5">{SCHOOL_INFO.address}</p>
              <p className="text-[10px] text-slate-500 font-sans">Motto: "Excellence, Integrity, Innovation" • Established 2012</p>
              <div className="mt-2 text-xs font-bold font-sans uppercase tracking-widest text-indigo-900 bg-slate-100 py-1 rounded">
                Official Continuous Assessment & Terminal Transcript
              </div>
            </div>

            {/* Student Meta Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-sans text-[11px] bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div>
                <span className="text-slate-400 block text-[9px] uppercase">Learner</span>
                <strong>David Adeyemi</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase">Admission Number</span>
                <strong>ACA/2026/0142</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase">Class Arm</span>
                <strong>SS2A (Senior Secondary)</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase">Term / Session</span>
                <strong>{SCHOOL_INFO.term}</strong>
              </div>
            </div>

            {/* Grades Table */}
            <table className="w-full text-left font-sans text-[11px] border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                  <th className="p-2 border border-slate-300">Subject</th>
                  <th className="p-2 text-center border border-slate-300">CW 1</th>
                  <th className="p-2 text-center border border-slate-300">CW 2</th>
                  <th className="p-2 text-center border border-slate-300">Quiz</th>
                  <th className="p-2 text-center border border-slate-300">Total Avg</th>
                  <th className="p-2 text-center border border-slate-300">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-2 font-medium border border-slate-300">Mathematics</td>
                  <td className="p-2 text-center border border-slate-300">51</td>
                  <td className="p-2 text-center border border-slate-300">46</td>
                  <td className="p-2 text-center border border-slate-300">43</td>
                  <td className="p-2 text-center font-bold text-rose-700 border border-slate-300">47%</td>
                  <td className="p-2 text-center font-bold text-rose-700 border border-slate-300">P7</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium border border-slate-300">English Language</td>
                  <td className="p-2 text-center border border-slate-300">82</td>
                  <td className="p-2 text-center border border-slate-300">86</td>
                  <td className="p-2 text-center border border-slate-300">80</td>
                  <td className="p-2 text-center font-bold text-emerald-700 border border-slate-300">83%</td>
                  <td className="p-2 text-center font-bold text-emerald-700 border border-slate-300">A1</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium border border-slate-300">Physics</td>
                  <td className="p-2 text-center border border-slate-300">65</td>
                  <td className="p-2 text-center border border-slate-300">60</td>
                  <td className="p-2 text-center border border-slate-300">62</td>
                  <td className="p-2 text-center font-bold text-slate-800 border border-slate-300">62%</td>
                  <td className="p-2 text-center font-bold text-slate-800 border border-slate-300">C4</td>
                </tr>
              </tbody>
            </table>

            {/* Principal Signature & Stamp */}
            <div className="pt-6 font-sans flex justify-between items-end text-[11px]">
              <div>
                <div className="text-slate-400">Class Form Teacher:</div>
                <div className="font-bold">Mrs. Funke Adebayo</div>
                <div className="text-slate-500 italic mt-1">"Shows strong aptitude in languages; requires dedicated practice in algebraic fractions."</div>
              </div>
              <div className="text-right">
                <div className="w-24 h-12 border-b border-dashed border-slate-400 mb-1 ml-auto flex items-end justify-center pb-1 text-slate-400 font-mono text-[9px]">
                  [VERIFIED DIGITAL SEAL]
                </div>
                <div className="font-bold">Dr. Olumide Johnson</div>
                <div className="text-slate-500">Principal & Head of School</div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

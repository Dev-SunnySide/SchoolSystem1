import React, { useState } from 'react';
import { 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  Filter, 
  Download, 
  DollarSign, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Layers,
  PieChart,
  Search,
  Building2,
  Calendar
} from 'lucide-react';
import { MOCK_FEE_TRANSACTIONS, MOCK_STUDENTS, SCHOOL_INFO } from '../../data/mockData';
import { KpiCard } from '../common/UIComponents';

export const FinancialIntelligenceView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'invoices' | 'revenue-by-class'>('overview');
  const [filterQuery, setFilterQuery] = useState('');

  const classRevenue = [
    { class: "SS3 Science", expected: 18000000, collected: 15400000, rate: 85.5 },
    { class: "SS2A", expected: 16500000, collected: 13500000, rate: 81.8 },
    { class: "SS2B", expected: 16000000, collected: 12800000, rate: 80.0 },
    { class: "SS1 Science", expected: 17000000, collected: 13200000, rate: 77.6 },
    { class: "JSS3B", expected: 15000000, collected: 11100000, rate: 74.0 },
    { class: "JSS1A", expected: 17500000, collected: 12900000, rate: 73.7 },
  ];

  const feeTypes = [
    { type: "Tuition Fees", expected: 85000000, collected: 68000000, percent: 80.0 },
    { type: "Development & Capital Levy", expected: 20000000, collected: 16000000, percent: 80.0 },
    { type: "ICT & Science Laboratory Sub", expected: 12000000, collected: 9000000, percent: 75.0 },
    { type: "Co-Curricular & Sports Kit", expected: 8000000, collected: 5000000, percent: 62.5 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">Bursary Financial Intelligence</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
              Audited Ledger
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Institutional revenue tracking, fee collection velocity, and student invoice ledger • {SCHOOL_INFO.term}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Financial Audit</span>
          </button>
        </div>
      </div>

      {/* 4 Core Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          id="fin-kpi-expected"
          title="Expected Fees"
          value="₦125,000,000"
          subtitle="Target Term 1 Invoiced"
          icon={<DollarSign className="w-4 h-4 text-slate-600" />}
        />
        <KpiCard
          id="fin-kpi-collected"
          title="Collected Revenue"
          value="₦98,000,000"
          change={8.2}
          changeDirection="up"
          changePeriod="vs same week 2025"
          riskState="ON_TRACK"
          icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
        />
        <KpiCard
          id="fin-kpi-outstanding"
          title="Outstanding Balance"
          value="₦27,000,000"
          subtitle="Cutoff Date: 15 Oct 2026"
          riskState="NEEDS_ATTENTION"
          icon={<AlertCircle className="w-4 h-4 text-amber-600" />}
        />
        <KpiCard
          id="fin-kpi-rate"
          title="Collection Rate"
          value="78.4%"
          change={3.1}
          changeDirection="up"
          subtitle="Liquidity Healthy"
          icon={<TrendingUp className="w-4 h-4 text-indigo-600" />}
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl transition cursor-pointer ${
            activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Overview & Revenue Breakdown
        </button>
        <button
          onClick={() => setActiveTab('invoices')}
          className={`px-4 py-2 rounded-xl transition cursor-pointer ${
            activeTab === 'invoices' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Student Invoices & Receipts
        </button>
        <button
          onClick={() => setActiveTab('revenue-by-class')}
          className={`px-4 py-2 rounded-xl transition cursor-pointer ${
            activeTab === 'revenue-by-class' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Class Collection Ranking
        </button>
      </div>

      {/* TAB 1: Overview & Revenue by Fee Type */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue by Fee Type */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 font-display mb-1">Revenue by Fee Classification</h2>
            <p className="text-xs text-slate-500 mb-4">Collection breakdown across statutory fee categories</p>

            <div className="space-y-4 text-xs">
              {feeTypes.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="font-semibold">{item.type}</span>
                    <span className="font-bold text-slate-900">
                      ₦{(item.collected / 1000000).toFixed(1)}M / ₦{(item.expected / 1000000).toFixed(1)}M ({item.percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        item.percent >= 80 ? 'bg-emerald-500' : item.percent >= 70 ? 'bg-indigo-600' : 'bg-amber-500'
                      }`}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method Distribution */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 shadow-xs flex flex-col justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 font-display mb-1">Payment Gateway Channels</h2>
              <p className="text-xs text-slate-500 mb-4">Channel distribution for incoming school fee settlements</p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100">
                  <div className="text-[10px] text-indigo-700 font-bold uppercase tracking-wider">Debit Card (Online)</div>
                  <div className="text-xl font-bold font-display text-slate-900 mt-1">₦54.8M</div>
                  <span className="text-[11px] text-slate-500">56% of total volume</span>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <div className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">Virtual Bank Transfer</div>
                  <div className="text-xl font-bold font-display text-slate-900 mt-1">₦31.2M</div>
                  <span className="text-[11px] text-slate-500">32% of total volume</span>
                </div>

                <div className="p-3.5 rounded-xl bg-violet-50/60 border border-violet-100">
                  <div className="text-[10px] text-violet-700 font-bold uppercase tracking-wider">Mobile USSD</div>
                  <div className="text-xl font-bold font-display text-slate-900 mt-1">₦7.8M</div>
                  <span className="text-[11px] text-slate-500">8% of total volume</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Bank Draft / Cash</div>
                  <div className="text-xl font-bold font-display text-slate-900 mt-1">₦4.2M</div>
                  <span className="text-[11px] text-slate-500">4% of total volume</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
              Zero manual paper reconciliations. All transactions reconcile directly against student admission records.
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Invoices & Receipts */}
      {activeTab === 'invoices' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Filter invoice or student name..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs outline-none focus:border-indigo-400"
              />
            </div>
            <span className="text-xs text-slate-400">Drilldown: School → Class → Student → Invoice</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Receipt / Ref</th>
                  <th className="py-3 px-4">Student & Class</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Payment Method</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_FEE_TRANSACTIONS.map((txn) => (
                  <tr key={txn.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-700">{txn.receiptNo}</td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{txn.studentName}</div>
                      <div className="text-[11px] text-slate-400">{txn.studentClass}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-700">{txn.description}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">₦{txn.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-slate-600">{txn.method}</td>
                    <td className="py-3 px-4 text-slate-500">{txn.date}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        txn.status === 'PAID' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Revenue by Class */}
      {activeTab === 'revenue-by-class' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 font-display mb-1">Fee Collection Velocity by Class</h2>
          <p className="text-xs text-slate-500 mb-4">Ranking of classes based on percentage of term fees recovered</p>

          <div className="space-y-4">
            {classRevenue.map((c, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-slate-900 text-sm">{c.class}</div>
                  <div className="text-xs text-slate-500">
                    Collected: <strong>₦{(c.collected / 1000000).toFixed(2)}M</strong> / Expected: ₦{(c.expected / 1000000).toFixed(2)}M
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-32 bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${c.rate}%` }} />
                  </div>
                  <span className="font-bold font-display text-slate-900 text-sm w-12 text-right">{c.rate}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

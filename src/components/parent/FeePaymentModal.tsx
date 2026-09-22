import React, { useState } from 'react';
import { 
  CreditCard, 
  Building2, 
  Smartphone, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Printer, 
  FileText,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { Modal } from '../common/UIComponents';
import { SCHOOL_INFO } from '../../data/mockData';

interface FeePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  outstandingAmount: number;
  studentName: string;
  studentClass: string;
}

export const FeePaymentModal: React.FC<FeePaymentModalProps> = ({
  isOpen,
  onClose,
  outstandingAmount,
  studentName,
  studentClass
}) => {
  const [step, setStep] = useState<'SELECT' | 'PAYING' | 'SUCCESS'>('SELECT');
  const [amount, setAmount] = useState<number>(outstandingAmount || 70000);
  const [paymentMethod, setPaymentMethod] = useState<'Card' | 'Bank Transfer' | 'USSD'>('Card');
  const [copied, setCopied] = useState(false);
  const [receiptNumber] = useState(`REC-${new Date().getFullYear()}-09${Math.floor(1000 + Math.random() * 9000)}`);

  const handlePay = () => {
    setStep('PAYING');
    setTimeout(() => {
      setStep('SUCCESS');
    }, 1400);
  };

  const handleReset = () => {
    setStep('SELECT');
    onClose();
  };

  const handleCopyAccount = () => {
    navigator.clipboard?.writeText("0123456789");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      id="fee-payment-flow-modal"
      isOpen={isOpen}
      onClose={handleReset}
      title={step === 'SUCCESS' ? "Payment Receipt" : "Secure School Fee Payment"}
      subtitle={`Apex Crest Academy Bursary • ${studentName} (${studentClass})`}
      maxWidth={step === 'SUCCESS' ? 'lg' : 'md'}
    >
      {step === 'SELECT' && (
        <div className="space-y-4 text-xs">
          {/* Amount selection */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Payment Amount (₦)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-500 font-bold text-sm">₦</span>
              <input
                id="fee-payment-amount-input"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-xl font-bold text-base text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="flex gap-2 mt-1.5">
              <button 
                type="button" 
                onClick={() => setAmount(70000)}
                className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-medium text-[11px] hover:bg-indigo-100"
              >
                Pay Full Outstanding (₦70,000)
              </button>
              <button 
                type="button" 
                onClick={() => setAmount(35000)}
                className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px] hover:bg-slate-200"
              >
                50% Instalment (₦35,000)
              </button>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">Select Payment Method</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                id="pay-method-card"
                onClick={() => setPaymentMethod('Card')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition cursor-pointer ${
                  paymentMethod === 'Card'
                    ? 'border-indigo-600 bg-indigo-50/60 text-indigo-700 font-bold shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <CreditCard className="w-5 h-5 text-indigo-600" />
                <span>Debit Card</span>
              </button>

              <button
                type="button"
                id="pay-method-transfer"
                onClick={() => setPaymentMethod('Bank Transfer')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition cursor-pointer ${
                  paymentMethod === 'Bank Transfer'
                    ? 'border-indigo-600 bg-indigo-50/60 text-indigo-700 font-bold shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Building2 className="w-5 h-5 text-indigo-600" />
                <span>Bank Transfer</span>
              </button>

              <button
                type="button"
                id="pay-method-ussd"
                onClick={() => setPaymentMethod('USSD')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition cursor-pointer ${
                  paymentMethod === 'USSD'
                    ? 'border-indigo-600 bg-indigo-50/60 text-indigo-700 font-bold shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Smartphone className="w-5 h-5 text-indigo-600" />
                <span>USSD Code</span>
              </button>
            </div>
          </div>

          {/* Method Details */}
          {paymentMethod === 'Card' && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Direct Gateway: Paystack / Flutterwave</span>
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" /> 256-bit Encrypted
                </span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800">Mastercard / Visa / Verve</div>
                  <div className="text-[11px] text-slate-400">Card ending in •••• 4128</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">Verified</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-snug">
                Raw card credentials are never stored on the school server. All transactions run via licensed CBN-compliant PCI-DSS payment gateways.
              </p>
            </div>
          )}

          {paymentMethod === 'Bank Transfer' && (
            <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-900">Virtual Dedicated Account</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">Instant Credit</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-indigo-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400">Bank: Providus Bank / Apex Crest Collection</div>
                  <div className="font-mono text-sm font-bold text-slate-900">9934 0021 88</div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyAccount}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-[10px] text-slate-500">
                Transfer exactly <strong>₦{amount.toLocaleString()}</strong>. Account expires in 25 minutes.
              </div>
            </div>
          )}

          {paymentMethod === 'USSD' && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-center">
              <span className="font-semibold text-slate-700 block">Dial USSD string on registered phone:</span>
              <div className="font-mono text-base font-bold text-indigo-700 bg-white py-2 px-3 rounded-lg border border-slate-200 inline-block">
                *737*000*2890#
              </div>
              <p className="text-[10px] text-slate-500">Supported on GTBank, Zenith, Access, and First Bank</p>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2">
            <button
              id="confirm-pay-fees-btn"
              type="button"
              onClick={handlePay}
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-200"
            >
              <span>PAY ₦{amount.toLocaleString()} NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {step === 'PAYING' && (
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-12 h-12 rounded-full border-3 border-indigo-600 border-t-transparent animate-spin" />
          <h4 className="text-sm font-bold text-slate-900">Contacting Payment Gateway...</h4>
          <p className="text-xs text-slate-500 max-w-xs">
            Authorizing payment of ₦{amount.toLocaleString()} for {studentName}. Please do not refresh.
          </p>
        </div>
      )}

      {step === 'SUCCESS' && (
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-1.5" />
            <h4 className="text-base font-bold text-emerald-900">Payment Successful!</h4>
            <p className="text-xs text-emerald-700 mt-0.5">
              ₦{amount.toLocaleString()} credited to Apex Crest Academy Bursary.
            </p>
          </div>

          {/* Official Printable Receipt Preview */}
          <div id="printable-fee-receipt" className="p-4 bg-slate-50 rounded-xl border border-slate-300 space-y-3">
            <div className="flex justify-between items-start border-b border-slate-200 pb-2">
              <div>
                <div className="font-bold text-slate-900 text-sm">{SCHOOL_INFO.name}</div>
                <div className="text-[10px] text-slate-500">{SCHOOL_INFO.address}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-500">RECEIPT NO.</span>
                <div className="font-bold font-mono text-indigo-700 text-xs">{receiptNumber}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-400 block">Student:</span>
                <span className="font-bold text-slate-800">{studentName} ({studentClass})</span>
              </div>
              <div>
                <span className="text-slate-400 block">Payer:</span>
                <span className="font-bold text-slate-800">Mr. Emmanuel Attah</span>
              </div>
              <div>
                <span className="text-slate-400 block">Session & Term:</span>
                <span className="font-semibold text-slate-700">{SCHOOL_INFO.term}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Date & Time:</span>
                <span className="font-semibold text-slate-700">{new Date().toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Payment Method:</span>
                <span className="font-semibold text-slate-700">{paymentMethod}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Gateway Auth:</span>
                <span className="font-mono text-emerald-700 font-semibold">AUTH-SUCCESS-200</span>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-sm font-bold text-slate-900">
              <span>Total Paid:</span>
              <span className="text-indigo-700 font-display text-base">₦{amount.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex-1 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-semibold text-xs hover:bg-slate-50 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print Official Receipt</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700 transition cursor-pointer shadow-xs"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Smartphone, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  LogOut,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import { Modal } from '../common/UIComponents';
import { UserRole } from '../../types';

interface AuthSecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onSwitchRole: (role: UserRole) => void;
}

export const AuthSecurityModal: React.FC<AuthSecurityModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onSwitchRole
}) => {
  const [tab, setTab] = useState<'sessions' | 'mfa' | 'governance'>('sessions');
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [mfaMethod, setMfaMethod] = useState<'SMS' | 'WHATSAPP' | 'AUTHENTICATOR'>('WHATSAPP');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);

  const handleSendOtp = () => {
    setOtpSent(true);
    setTimeout(() => {
      setOtpCode('824190');
    }, 1000);
  };

  const handleVerifyOtp = () => {
    if (otpCode === '824190') {
      setOtpVerified(true);
      setTimeout(() => {
        setOtpVerified(false);
        setOtpSent(false);
      }, 2000);
    }
  };

  return (
    <Modal
      id="auth-security-modal"
      isOpen={isOpen}
      onClose={onClose}
      title="Identity, MFA & Privacy Governance"
      subtitle="Enterprise Zero-Trust Security & NDPR Compliance"
      maxWidth="lg"
    >
      <div className="space-y-5 text-xs">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-4 font-semibold text-slate-500">
          <button
            onClick={() => setTab('sessions')}
            className={`pb-2 border-b-2 transition ${
              tab === 'sessions' ? 'border-indigo-600 text-indigo-700' : 'border-transparent hover:text-slate-800'
            }`}
          >
            Active Sessions
          </button>
          <button
            onClick={() => setTab('mfa')}
            className={`pb-2 border-b-2 transition ${
              tab === 'mfa' ? 'border-indigo-600 text-indigo-700' : 'border-transparent hover:text-slate-800'
            }`}
          >
            2FA Multi-Factor Auth
          </button>
          <button
            onClick={() => setTab('governance')}
            className={`pb-2 border-b-2 transition ${
              tab === 'governance' ? 'border-indigo-600 text-indigo-700' : 'border-transparent hover:text-slate-800'
            }`}
          >
            NDPR & Child Safeguarding
          </button>
        </div>

        {/* Tab 1: Sessions */}
        {tab === 'sessions' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Current Active Session</span>
                  <span className="text-slate-500">MacBook Pro (Chrome 124.0) • Lagos, Nigeria</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Active Now
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                IP: 102.89.44.12 • Session Token: jwt_kura_9f4088... • Timeout: 30 mins idle
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">Mobile Web Portal (iPhone 15)</span>
                  <span className="text-slate-500">Safari Mobile • MTN Nigeria LTE</span>
                </div>
                <button className="text-rose-600 font-semibold text-xs hover:underline cursor-pointer">
                  Revoke Token
                </button>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                Last Activity: Today, 11:24 AM
              </div>
            </div>

            <button
              onClick={() => {
                alert("All other sessions revoked.");
              }}
              className="w-full py-2.5 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-rose-700 font-semibold text-xs transition cursor-pointer"
            >
              Terminate All Other Active Sessions
            </button>
          </div>
        )}

        {/* Tab 2: MFA */}
        {tab === 'mfa' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block text-sm">Two-Factor Authentication (2FA)</span>
                  <p className="text-slate-500 mt-0.5">Protect faculty accounts and fee transactions with mandatory OTP verification.</p>
                </div>
                <input
                  type="checkbox"
                  checked={mfaEnabled}
                  onChange={(e) => setMfaEnabled(e.target.checked)}
                  className="rounded text-indigo-600 h-5 w-5"
                />
              </div>

              {mfaEnabled && (
                <div className="pt-3 border-t border-slate-200 space-y-2">
                  <span className="font-semibold text-slate-700 block">Preferred OTP Delivery Channel:</span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setMfaMethod('WHATSAPP')}
                      className={`p-2.5 rounded-lg border text-center transition cursor-pointer ${
                        mfaMethod === 'WHATSAPP' ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold' : 'border-slate-200 bg-white'
                      }`}
                    >
                      WhatsApp OTP
                    </button>
                    <button
                      type="button"
                      onClick={() => setMfaMethod('SMS')}
                      className={`p-2.5 rounded-lg border text-center transition cursor-pointer ${
                        mfaMethod === 'SMS' ? 'border-indigo-600 bg-indigo-50 text-indigo-800 font-bold' : 'border-slate-200 bg-white'
                      }`}
                    >
                      SMS Cellular
                    </button>
                    <button
                      type="button"
                      onClick={() => setMfaMethod('AUTHENTICATOR')}
                      className={`p-2.5 rounded-lg border text-center transition cursor-pointer ${
                        mfaMethod === 'AUTHENTICATOR' ? 'border-violet-600 bg-violet-50 text-violet-800 font-bold' : 'border-slate-200 bg-white'
                      }`}
                    >
                      Authenticator App
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Test OTP Simulator */}
            <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/40 space-y-3">
              <span className="font-bold text-indigo-950 block">Simulate OTP Challenge</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700 cursor-pointer shadow-xs"
                >
                  {otpSent ? 'OTP Sent (Check below)' : 'Send Test OTP Token'}
                </button>
              </div>

              {otpSent && (
                <div className="space-y-2 pt-2">
                  <div className="text-[11px] text-slate-600">Simulated WhatsApp SMS received: <strong>Code: 824190</strong></div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="Enter 6-digit code"
                      className="px-3 py-1.5 rounded-lg border border-slate-300 font-mono text-xs w-36 outline-none text-center font-bold"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 cursor-pointer shadow-xs"
                    >
                      {otpVerified ? 'Verified ✓' : 'Verify'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Governance & NDPR */}
        {tab === 'governance' && (
          <div className="space-y-3 leading-relaxed text-slate-700">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Nigeria Data Protection Regulation (NDPR) & GDPR Alignment</span>
              </div>
              <p>
                All student performance records, attendance biometric logs, and financial ledgers are encrypted in transit with TLS 1.3 and at rest with AES-256 keys.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 space-y-2 text-[11px]">
              <div className="font-bold text-slate-900">Child Safeguarding Directives:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Student profiles cannot be indexed or crawled by external search engines.</li>
                <li>Biometric/photographic assets are restricted exclusively to authenticated guardians.</li>
                <li>Automated algorithmic decisions are non-binding and require human approval.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  HelpCircle, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Sparkles,
  Info
} from 'lucide-react';
import { RiskLevel } from '../../types';

export interface RiskBadgeProps {
  level: RiskLevel;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  labelOverride?: string;
  className?: string;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ 
  level, 
  showIcon = true, 
  size = 'md',
  labelOverride,
  className = ''
}) => {
  const configs = {
    ON_TRACK: {
      label: labelOverride || "On Track",
      bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
      icon: <CheckCircle2 className={size === 'sm' ? "w-3 h-3 text-emerald-600" : "w-3.5 h-3.5 text-emerald-600"} />,
      dot: "bg-emerald-500"
    },
    NEEDS_ATTENTION: {
      label: labelOverride || "Needs Attention",
      bg: "bg-amber-50 text-amber-800 border-amber-200",
      icon: <AlertTriangle className={size === 'sm' ? "w-3 h-3 text-amber-600" : "w-3.5 h-3.5 text-amber-600"} />,
      dot: "bg-amber-500"
    },
    AT_RISK: {
      label: labelOverride || "At Risk",
      bg: "bg-rose-50 text-rose-800 border-rose-200",
      icon: <AlertCircle className={size === 'sm' ? "w-3 h-3 text-rose-600" : "w-3.5 h-3.5 text-rose-600"} />,
      dot: "bg-rose-500"
    }
  };

  const current = configs[level] || configs.ON_TRACK;
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs font-medium gap-1",
    md: "px-2.5 py-1 text-xs font-semibold gap-1.5",
    lg: "px-3 py-1.5 text-sm font-semibold gap-2"
  };

  return (
    <span 
      id={`risk-badge-${level.toLowerCase()}`}
      className={`inline-flex items-center rounded-full border ${current.bg} ${sizeClasses[size]} whitespace-nowrap shadow-xs ${className}`}
    >
      {showIcon ? current.icon : <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />}
      <span>{current.label}</span>
    </span>
  );
};

export interface KpiCardProps {
  id: string;
  title: string;
  value: string | number;
  subtitle?: string;
  change?: number; // percentage change
  changePeriod?: string;
  changeDirection?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  riskState?: RiskLevel;
  onClick?: () => void;
  badge?: React.ReactNode;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  id,
  title,
  value,
  subtitle,
  change,
  changePeriod = "vs last period",
  changeDirection,
  icon,
  riskState,
  onClick,
  badge
}) => {
  const isClickable = !!onClick;

  return (
    <div 
      id={id}
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200 p-5 shadow-xs transition-all duration-200 ${
        isClickable ? 'cursor-pointer hover:border-indigo-300 hover:shadow-md' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</span>
        <div className="flex items-center gap-2">
          {badge}
          {icon && (
            <div className="p-2 rounded-lg bg-slate-50 text-slate-600 border border-slate-100">
              {icon}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl lg:text-3xl font-bold text-slate-900 font-display tracking-tight">{value}</span>
        {riskState && <RiskBadge level={riskState} size="sm" />}
      </div>

      {(subtitle || change !== undefined) && (
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
          {change !== undefined && (
            <span className={`inline-flex items-center font-semibold ${
              (changeDirection === 'up' && change > 0) || (changeDirection === undefined && change >= 0)
                ? 'text-emerald-600'
                : 'text-rose-600'
            }`}>
              {change > 0 ? (
                <TrendingUp className="w-3.5 h-3.5 mr-0.5 inline" />
              ) : change < 0 ? (
                <TrendingDown className="w-3.5 h-3.5 mr-0.5 inline" />
              ) : (
                <Minus className="w-3.5 h-3.5 mr-0.5 inline" />
              )}
              {change > 0 ? `+${change}%` : `${change}%`}
            </span>
          )}
          <span>{subtitle || changePeriod}</span>
        </div>
      )}
    </div>
  );
};

export interface ModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

export const Modal: React.FC<ModalProps> = ({
  id,
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'lg'
}) => {
  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl'
  };

  return (
    <div id={id} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
          onClick={onClose} 
        />
        <div className={`relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all w-full ${maxWidthClasses[maxWidth]} my-8 border border-slate-200 z-10`}>
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-display">{title}</h3>
              {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
            </div>
            <button
              id={`${id}-close-btn`}
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            >
              <span className="sr-only">Close</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="px-6 py-5 max-h-[75vh] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export interface DrawerProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  id,
  isOpen,
  onClose,
  title,
  subtitle,
  children
}) => {
  if (!isOpen) return null;

  return (
    <div id={id} className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="pointer-events-auto w-screen max-w-md transform bg-white shadow-2xl transition-transform border-l border-slate-200 flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/50">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">{title}</h3>
              {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
            </div>
            <button
              id={`${id}-close-btn`}
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export interface ExplainabilityCardProps {
  id: string;
  title: string;
  confidence: number;
  whatHappened: string;
  whyItMatters: string;
  supportingData: string[];
  recommendedAction: string;
  whoShouldAct?: string;
  reviewTimeline?: string;
  onTakeAction?: () => void;
  actionLabel?: string;
}

export const ExplainabilityCard: React.FC<ExplainabilityCardProps> = ({
  id,
  title,
  confidence,
  whatHappened,
  whyItMatters,
  supportingData,
  recommendedAction,
  whoShouldAct,
  reviewTimeline,
  onTakeAction,
  actionLabel = "Initiate Recommended Intervention"
}) => {
  return (
    <div id={id} className="rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50/70 via-white to-violet-50/40 p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-indigo-100">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-600 text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </span>
          <h4 className="text-sm font-bold text-slate-900">{title}</h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
            Confidence: {confidence}%
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-3.5 text-xs">
        <div>
          <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1">What happened?</span>
          <p className="text-slate-600 leading-relaxed">{whatHappened}</p>
        </div>

        <div>
          <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1">Why does it matter?</span>
          <p className="text-slate-600 leading-relaxed">{whyItMatters}</p>
        </div>

        <div>
          <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1">Supporting Data Points</span>
          <ul className="space-y-1 text-slate-600 list-disc list-inside">
            {supportingData.map((item, idx) => (
              <li key={idx} className="leading-snug">{item}</li>
            ))}
          </ul>
        </div>

        <div className="p-3 rounded-lg bg-white border border-indigo-100 shadow-xs">
          <span className="font-bold text-indigo-900 uppercase tracking-wider text-[11px] block mb-1">Recommended Action</span>
          <p className="text-slate-700 font-medium">{recommendedAction}</p>
          {(whoShouldAct || reviewTimeline) && (
            <div className="mt-2 pt-2 border-t border-slate-100 flex flex-wrap gap-4 text-[11px] text-slate-500">
              {whoShouldAct && <span><strong>Assigned to:</strong> {whoShouldAct}</span>}
              {reviewTimeline && <span><strong>Review:</strong> {reviewTimeline}</span>}
            </div>
          )}
        </div>
      </div>

      {onTakeAction && (
        <div className="mt-4 pt-3 border-t border-indigo-100 flex justify-end">
          <button
            id={`${id}-action-btn`}
            onClick={onTakeAction}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium text-xs hover:bg-indigo-700 transition shadow-xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
};

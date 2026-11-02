import React from 'react';
import { X, Scale, GraduationCap, ShieldCheck, Cpu, ExternalLink } from 'lucide-react';
import { Language } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  language: Language;
  fontSize: 'normal' | 'large';
  onFontSizeChange: (size: 'normal' | 'large') => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  language,
  fontSize,
  onFontSizeChange,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-lg bg-white border border-stone-200 rounded-xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#14213D] text-white flex items-center justify-center shadow-xs">
              <Scale className="w-4 h-4 text-teal-400" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                {language === 'hi' ? 'परियोजना विवरण एवं सेटिंग्स' : 'Project Details & Preferences'}
              </h2>
              <p className="text-xs text-slate-500">LegalEase AI · B.Tech CSE (AI & ML)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto text-sm text-slate-700">
          {/* Academic Banner */}
          <div className="p-3.5 bg-teal-50/70 border border-teal-200/70 rounded-lg space-y-1.5">
            <div className="flex items-center gap-2 text-teal-900 font-semibold text-xs tracking-wide uppercase">
              <GraduationCap className="w-4 h-4 text-teal-700" />
              <span>B.Tech Computer Science (AI & ML) Capstone</span>
            </div>
            <p className="text-xs text-teal-950/80 leading-relaxed">
              Designed as an educational legal-tech frontend to empower Indian citizens with immediate awareness of rights under the Consumer Protection Act, 2019 and relevant ministerial guidelines.
            </p>
          </div>

          {/* Accessibility Font Size Toggle */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              {language === 'hi' ? 'फ़ॉन्ट आकार (Text Size)' : 'Reading Text Size'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onFontSizeChange('normal')}
                className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                  fontSize === 'normal'
                    ? 'border-teal-600 bg-teal-50/50 text-teal-900 font-semibold'
                    : 'border-stone-200 bg-white text-slate-600 hover:bg-stone-50'
                }`}
              >
                Standard (15px)
              </button>
              <button
                type="button"
                onClick={() => onFontSizeChange('large')}
                className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                  fontSize === 'large'
                    ? 'border-teal-600 bg-teal-50/50 text-teal-900 font-semibold'
                    : 'border-stone-200 bg-white text-slate-600 hover:bg-stone-50'
                }`}
              >
                Comfortable Large (17px)
              </button>
            </div>
          </div>

          {/* Architecture & Scope Note */}
          <div className="space-y-2 border-t border-stone-200 pt-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-slate-600" />
              <span>Project Architecture & Privacy</span>
            </div>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed">
              <li>100% Client-Side execution. No user data, chats, or personal details leave the browser.</li>
              <li>Demonstration knowledge base is grounded directly in verified Indian statutes (CPA 2019, Legal Metrology Rules, CCPA Guidelines).</li>
              <li>Complaint letters are synthesized locally in the browser with immediate TXT download capability.</li>
            </ul>
          </div>

          {/* Legal Disclaimer */}
          <div className="p-3 bg-stone-100 rounded-lg text-xs text-slate-600 leading-relaxed border border-stone-200/60">
            <span className="font-semibold text-slate-800">Educational Notice: </span>
            This application is an academic software demonstration. It provides general statutory information and does not constitute formal legal representation or legal counsel.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          <a
            href="https://consumerhelpline.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 font-medium transition-colors"
          >
            National Consumer Helpline
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-700 bg-white border border-stone-300 rounded-md hover:bg-stone-100 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

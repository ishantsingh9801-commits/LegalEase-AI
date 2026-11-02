import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { UI_TRANSLATIONS } from '../data/translations';
import { Language } from '../types';

interface ConfirmationModalProps {
  isOpen: boolean;
  language: Language;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  language,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const t = UI_TRANSLATIONS[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-white border border-stone-200 rounded-xl shadow-lg p-6 space-y-4 animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-50 text-amber-700 rounded-lg shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              {t.confirmClearTitle}
            </h3>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed">
              {t.confirmClearMsg}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-xs md:text-sm font-medium text-slate-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
          >
            {t.cancel}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-xs md:text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            {t.confirm}
          </button>
        </div>
      </div>
    </div>
  );
};

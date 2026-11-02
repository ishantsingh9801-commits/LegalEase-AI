import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  id: string;
  type?: 'success' | 'info' | 'warning';
  message: string;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ id, type = 'success', message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 3500);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />,
    warning: <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />,
    info: <Info className="w-4 h-4 text-blue-600 shrink-0" />,
  };

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-white border border-stone-200/80 rounded-lg shadow-sm text-sm text-slate-800 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2">
      {icons[type]}
      <span className="font-medium text-xs md:text-sm">{message}</span>
      <button
        onClick={() => onClose(id)}
        className="text-slate-400 hover:text-slate-600 ml-2 p-0.5 rounded transition-colors"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

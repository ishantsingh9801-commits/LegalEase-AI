import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowUp,
  PackageX,
  RotateCcw,
  Receipt,
  FileText,
  ShieldCheck,
  Scale,
  Compass,
  CornerDownLeft,
} from 'lucide-react';
import { HOMEPAGE_SUGGESTIONS } from '../data/sampleData';
import { UI_TRANSLATIONS } from '../data/translations';
import { Language } from '../types';

interface HomeWelcomeProps {
  language: Language;
  onSubmitQuery: (query: string) => void;
  onSelectSuggestion: (question: string) => void;
  fontSize: 'normal' | 'large';
}

export const HomeWelcome: React.FC<HomeWelcomeProps> = ({
  language,
  onSubmitQuery,
  onSelectSuggestion,
  fontSize,
}) => {
  const [inputVal, setInputVal] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const t = UI_TRANSLATIONS[language];

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [inputVal]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputVal.trim()) {
      onSubmitQuery(inputVal.trim());
      setInputVal('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const getSuggestionIcon = (icon: string) => {
    switch (icon) {
      case 'PackageX':
        return <PackageX className="w-5 h-5 text-teal-600" />;
      case 'RotateCcw':
        return <RotateCcw className="w-5 h-5 text-teal-600" />;
      case 'Receipt':
        return <Receipt className="w-5 h-5 text-teal-600" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-teal-600" />;
      default:
        return <Scale className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
      {/* Small Badge / Kicker - Zero pill discipline, clean text badge */}
      <div className="flex items-center gap-2 px-3 py-1 bg-stone-100 border border-stone-200/80 rounded-md text-[11px] font-semibold tracking-wider text-slate-700 uppercase mb-4">
        <Scale className="w-3.5 h-3.5 text-teal-600" />
        <span>{t.headerBadge}</span>
      </div>

      {/* Main Heading */}
      <h1
        className={`text-center font-bold tracking-tight text-slate-900 leading-tight text-balance max-w-2xl ${
          fontSize === 'large'
            ? 'text-3xl md:text-5xl'
            : 'text-2xl md:text-4xl'
        }`}
      >
        {t.mainHeading}
      </h1>

      {/* Supporting Text */}
      <p
        className={`mt-3 text-center text-slate-600 max-w-xl text-balance ${
          fontSize === 'large' ? 'text-base md:text-lg' : 'text-sm md:text-base'
        }`}
      >
        {t.mainSubtitle}
      </p>

      {/* Chat Input Container */}
      <div className="w-full mt-8 max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="relative rounded-2xl bg-white border border-stone-300 shadow-sm hover:border-stone-400 focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-teal-500/20 transition-all p-3"
        >
          <textarea
            ref={textareaRef}
            rows={2}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.inputPlaceholder}
            className="w-full bg-transparent border-0 resize-none outline-none text-slate-800 placeholder:text-slate-400 text-sm md:text-base pr-12 min-h-[52px]"
          />
          <div className="flex items-center justify-between pt-2 border-t border-stone-100">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <span>Press</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-stone-100 border border-stone-200 rounded text-slate-500 font-mono">
                Enter ↵
              </kbd>
              <span className="hidden sm:inline">to submit, Shift+Enter for new line</span>
            </span>

            <button
              type="submit"
              disabled={!inputVal.trim()}
              className={`p-2 rounded-xl transition-all duration-150 cursor-pointer ${
                inputVal.trim()
                  ? 'bg-[#14213D] text-white hover:bg-teal-700 shadow-xs scale-100'
                  : 'bg-stone-100 text-slate-400 cursor-not-allowed opacity-60'
              }`}
              title={t.sendButtonLabel}
              aria-label={t.sendButtonLabel}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Suggested Questions Section */}
      <div className="w-full mt-8 max-w-2xl">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {t.askSuggested}
          </span>
          <span className="text-xs text-slate-400">
            {language === 'hi' ? 'सीधे पूछने हेतु क्लिक करें' : 'Click to inquire'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {HOMEPAGE_SUGGESTIONS.map((item) => {
            const questionText = language === 'hi' ? item.questionHi : item.question;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSuggestion(questionText)}
                className="group p-3.5 bg-white border border-stone-200/90 rounded-xl hover:border-teal-500 hover:shadow-sm text-left transition-all duration-200 flex items-start gap-3 cursor-pointer"
              >
                <div className="p-2 rounded-lg bg-teal-50 text-teal-700 group-hover:bg-teal-100 transition-colors shrink-0">
                  {getSuggestionIcon(item.icon)}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-slate-800 group-hover:text-teal-900 transition-colors">
                    {item.title}
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    "{questionText}"
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Three Compact Feature Highlights */}
      <div className="w-full mt-12 max-w-3xl pt-8 border-t border-stone-200/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-stone-50 border border-stone-200/70 rounded-xl space-y-1.5">
            <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs tracking-tight">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{t.feature1Title}</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t.feature1Desc}
            </p>
          </div>

          <div className="p-4 bg-stone-50 border border-stone-200/70 rounded-xl space-y-1.5">
            <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs tracking-tight">
              <Scale className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{t.feature2Title}</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t.feature2Desc}
            </p>
          </div>

          <div className="p-4 bg-stone-50 border border-stone-200/70 rounded-xl space-y-1.5">
            <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs tracking-tight">
              <Compass className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{t.feature3Title}</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t.feature3Desc}
            </p>
          </div>
        </div>
      </div>

      {/* Subtle Educational Disclaimer */}
      <p className="mt-8 text-center text-xs text-slate-400 max-w-lg leading-relaxed">
        {t.disclaimerFooter}
      </p>
    </div>
  );
};

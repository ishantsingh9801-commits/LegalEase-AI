import React from 'react';
import { Menu, Plus, Scale, Compass, FileText, PhoneCall, HelpCircle } from 'lucide-react';
import { ActiveTab, Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  language: Language;
  onToggleMobileMenu: () => void;
  onNewChat: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  language,
  onToggleMobileMenu,
  onNewChat,
  onOpenSettings,
}) => {
  const t = UI_TRANSLATIONS[language];

  const getPageTitle = () => {
    switch (activeTab) {
      case 'letter-generator':
        return t.letterGenTitle;
      case 'resources':
        return t.resourcesTitle;
      default:
        return t.projectTitle;
    }
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 md:gap-8 px-4 md:px-8 py-3.5 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Zone 1: Brand / Current Context */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 -ml-1 text-slate-600 hover:text-slate-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          aria-label="Open navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs md:text-sm text-slate-500 whitespace-nowrap shrink-0">
          <span className="font-semibold text-slate-900 hidden sm:inline">LegalEase AI</span>
          <span className="text-slate-300 hidden sm:inline">/</span>
          <span className="text-slate-700 font-medium truncate max-w-[180px] sm:max-w-none">
            {getPageTitle()}
          </span>
        </div>
      </div>

      {/* Zone 2: Navigation Links / Fast Switcher */}
      <nav className="hidden lg:flex items-center gap-6 text-xs md:text-sm font-medium text-slate-600">
        <button
          onClick={() => onSelectTab('chat')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'chat' ? 'text-teal-700 font-semibold border-b-2 border-teal-600 pb-0.5' : ''
          }`}
        >
          {language === 'hi' ? 'चैट गाइड' : 'Chat Assistant'}
        </button>
        <button
          onClick={() => onSelectTab('letter-generator')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'letter-generator' ? 'text-teal-700 font-semibold border-b-2 border-teal-600 pb-0.5' : ''
          }`}
        >
          {t.letterGeneratorNav}
        </button>
        <button
          onClick={() => onSelectTab('resources')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'resources' ? 'text-teal-700 font-semibold border-b-2 border-teal-600 pb-0.5' : ''
          }`}
        >
          {t.resourcesNav}
        </button>
      </nav>

      {/* Zone 3: 1 Primary Action */}
      <div className="flex items-center gap-2.5 shrink-0">
        <a
          href="tel:1915"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200/80 rounded-lg transition-colors whitespace-nowrap"
          title="National Consumer Helpline Toll-Free: 1915"
        >
          <PhoneCall className="w-3.5 h-3.5 text-teal-600" />
          <span>NCH: 1915</span>
        </a>

        {activeTab === 'chat' ? (
          <button
            onClick={onNewChat}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs md:text-sm font-medium text-white bg-[#14213D] hover:bg-[#1C2D54] rounded-lg transition-colors whitespace-nowrap shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.newChat}</span>
          </button>
        ) : (
          <button
            onClick={() => onSelectTab('chat')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs md:text-sm font-medium text-white bg-teal-600 hover:bg-teal-500 rounded-lg transition-colors whitespace-nowrap shadow-xs cursor-pointer"
          >
            <span>{language === 'hi' ? 'चैट पर जाएं' : 'Open Assistant'}</span>
          </button>
        )}
      </div>
    </header>
  );
};

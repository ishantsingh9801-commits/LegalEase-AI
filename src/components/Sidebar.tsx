import React from 'react';
import {
  Scale,
  Plus,
  MessageSquare,
  FileText,
  Compass,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  AlertTriangle,
  ShoppingBag,
  Megaphone,
  Tag,
  X,
  Globe,
  Trash2,
} from 'lucide-react';
import { TOPICS } from '../data/sampleData';
import { UI_TRANSLATIONS } from '../data/translations';
import { ActiveTab, ChatSession, Language, Topic } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onDeleteSession?: (id: string, e: React.MouseEvent) => void;
  onSelectTopic: (topic: Topic) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onOpenSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  language,
  onLanguageChange,
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  onSelectTopic,
  collapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
  onOpenSettings,
}) => {
  const t = UI_TRANSLATIONS[language];

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scale':
        return <Scale className="w-4 h-4 shrink-0" />;
      case 'RotateCcw':
        return <RotateCcw className="w-4 h-4 shrink-0" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-4 h-4 shrink-0" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-4 h-4 shrink-0" />;
      case 'Megaphone':
        return <Megaphone className="w-4 h-4 shrink-0" />;
      case 'Tag':
        return <Tag className="w-4 h-4 shrink-0" />;
      default:
        return <ShieldCheck className="w-4 h-4 shrink-0" />;
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#14213D] text-slate-200 select-none border-r border-slate-800/80">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-slate-800">
        <div
          onClick={() => {
            onSelectTab('chat');
            if (isMobileOpen) onCloseMobile();
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 shrink-0">
            <Scale className="w-5 h-5 text-teal-400" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-tight text-white">
                  LegalEase
                </span>
                <span className="text-[11px] font-semibold text-teal-400 uppercase tracking-wider">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">
                {language === 'hi' ? 'उपभोक्ता जागरूकता' : 'Consumer Rights Guide'}
              </p>
            </div>
          )}
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={onCloseMobile}
          className="md:hidden text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
          aria-label="Close navigation drawer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* New Chat Action Button */}
      <div className="p-3">
        <button
          type="button"
          onClick={() => {
            onNewChat();
            if (isMobileOpen) onCloseMobile();
          }}
          className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-medium text-xs md:text-sm shadow-xs transition-colors cursor-pointer ${
            collapsed ? 'justify-center px-2' : ''
          }`}
          title={t.newChat}
        >
          <Plus className="w-4 h-4 shrink-0" />
          {!collapsed && <span>{t.newChat}</span>}
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 space-y-5 py-2">
        {/* Core Tools Section */}
        <div>
          {!collapsed && (
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">
              {t.tools}
            </span>
          )}
          <nav className="mt-1 space-y-1">
            <button
              onClick={() => {
                onSelectTab('chat');
                if (isMobileOpen) onCloseMobile();
              }}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-slate-800 text-teal-300 font-semibold shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              } ${collapsed ? 'justify-center' : ''}`}
              title="Chat Assistant"
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              {!collapsed && (
                <span className="truncate">
                  {language === 'hi' ? 'चैट सहायक' : 'Chat Assistant'}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                onSelectTab('letter-generator');
                if (isMobileOpen) onCloseMobile();
              }}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'letter-generator'
                  ? 'bg-slate-800 text-teal-300 font-semibold shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              } ${collapsed ? 'justify-center' : ''}`}
              title={t.letterGeneratorNav}
            >
              <FileText className="w-4 h-4 shrink-0" />
              {!collapsed && (
                <span className="truncate">{t.letterGeneratorNav}</span>
              )}
            </button>

            <button
              onClick={() => {
                onSelectTab('resources');
                if (isMobileOpen) onCloseMobile();
              }}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'resources'
                  ? 'bg-slate-800 text-teal-300 font-semibold shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              } ${collapsed ? 'justify-center' : ''}`}
              title={t.resourcesNav}
            >
              <Compass className="w-4 h-4 shrink-0" />
              {!collapsed && (
                <span className="truncate">{t.resourcesNav}</span>
              )}
            </button>
          </nav>
        </div>

        {/* Explore Legal Topics Section */}
        {!collapsed && (
          <div>
            <div className="flex items-center justify-between px-2 mb-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {t.exploreTopics}
              </span>
            </div>
            <div className="space-y-0.5">
              {TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => {
                    onSelectTopic(topic);
                    if (isMobileOpen) onCloseMobile();
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-slate-300 hover:text-teal-300 hover:bg-slate-800/50 rounded-md transition-colors text-left cursor-pointer group"
                >
                  <span className="text-slate-400 group-hover:text-teal-400 transition-colors">
                    {getTopicIcon(topic.iconName)}
                  </span>
                  <span className="truncate">
                    {language === 'hi' ? topic.titleHi : topic.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recent Conversations */}
        {!collapsed && sessions.length > 0 && (
          <div>
            <div className="flex items-center justify-between px-2 mb-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {t.recentChats}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {sessions.length}
              </span>
            </div>
            <div className="space-y-0.5">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={`group flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs cursor-pointer transition-colors ${
                    activeSessionId === session.id && activeTab === 'chat'
                      ? 'bg-slate-800 text-teal-300 font-medium'
                      : 'text-slate-300 hover:bg-slate-800/40 hover:text-white'
                  }`}
                  onClick={() => {
                    onSelectSession(session.id);
                    onSelectTab('chat');
                    if (isMobileOpen) onCloseMobile();
                  }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <MessageSquare className="w-3.5 h-3.5 shrink-0 opacity-70" />
                    <span className="truncate">{session.title}</span>
                  </div>
                  {onDeleteSession && (
                    <button
                      onClick={(e) => onDeleteSession(session.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:text-rose-400 transition-opacity rounded"
                      title="Delete chat"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Controls: Language selector & Settings */}
      <div className="p-3 border-t border-slate-800 bg-[#0B132B]/60 space-y-2">
        {/* Language Selector Toggle */}
        <div
          className={`flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 ${
            collapsed ? 'flex-col' : 'justify-between'
          }`}
        >
          <button
            onClick={() => onLanguageChange('en')}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-colors cursor-pointer ${
              language === 'en'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            English
          </button>
          <button
            onClick={() => onLanguageChange('hi')}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-colors cursor-pointer ${
              language === 'hi'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            हिन्दी
          </button>
        </div>

        {/* Settings & Info Trigger */}
        <div className="flex items-center justify-between gap-1 pt-1">
          <button
            onClick={onOpenSettings}
            className={`flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800/70 rounded-md transition-colors cursor-pointer ${
              collapsed ? 'w-full justify-center' : 'flex-1'
            }`}
            title={t.settings}
          >
            <Settings className="w-4 h-4 shrink-0 text-slate-400" />
            {!collapsed && <span className="truncate">{t.settings}</span>}
          </button>

          {/* Desktop Collapse/Expand Toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex items-center justify-center w-7 h-7 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors cursor-pointer shrink-0"
            title={collapsed ? t.sidebarExpand : t.sidebarCollapse}
            aria-label={collapsed ? t.sidebarExpand : t.sidebarCollapse}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block shrink-0 transition-all duration-300 z-30 h-screen sticky top-0 ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-900/60 z-40 backdrop-blur-xs transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 z-50 w-72 bg-[#14213D] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
};

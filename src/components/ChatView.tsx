import React, { useState, useRef, useEffect } from 'react';
import {
  Scale,
  User,
  ArrowUp,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  Trash2,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Info,
} from 'lucide-react';
import { Message, Language, SourceRef } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { renderMarkdown } from '../utils/formatMarkdown';

interface ChatViewProps {
  messages: Message[];
  isLoading: boolean;
  language: Language;
  fontSize: 'normal' | 'large';
  onSendMessage: (content: string) => void;
  onRequestClearChat: () => void;
  onOpenLetterGenerator: () => void;
  onFeedback: (messageId: string, rating: 'helpful' | 'unhelpful') => void;
  onCopyText: (text: string) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  messages,
  isLoading,
  language,
  fontSize,
  onSendMessage,
  onRequestClearChat,
  onOpenLetterGenerator,
  onFeedback,
  onCopyText,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const t = UI_TRANSLATIONS[language];

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Auto-resize input textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [inputVal]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputVal.trim() && !isLoading) {
      onSendMessage(inputVal.trim());
      setInputVal('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleCopy = (messageId: string, content: string) => {
    onCopyText(content);
    setCopiedId(messageId);
    setTimeout(() => {
      setCopiedId((prev) => (prev === messageId ? null : prev));
    }, 2000);
  };

  const quickFollowUps =
    language === 'hi'
      ? [
          { text: 'शिकायत पत्र कैसे तैयार करें?', action: 'letter' },
          { text: 'ई-दाखिल पर केस दर्ज करने हेतु कौन से दस्तावेज चाहिए?', action: 'ask' },
          { text: 'मानसिक प्रताड़ना के मुआवजे का दावा कैसे करें?', action: 'ask' },
        ]
      : [
          { text: 'Draft a complaint letter for this issue', action: 'letter' },
          { text: 'What documents are required to file on e-Daakhil?', action: 'ask' },
          { text: 'How is compensation for mental harassment calculated?', action: 'ask' },
        ];

  return (
    <div className="flex flex-col h-full bg-[#FAFAF9] relative">
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6 max-w-4xl w-full mx-auto">
        {messages.map((message) => {
          const isUser = message.role === 'user';

          if (isUser) {
            return (
              <div key={message.id} className="flex justify-end items-start gap-2.5">
                <div className="max-w-[85%] md:max-w-[75%] rounded-2xl rounded-tr-xs bg-[#14213D] text-white px-4 py-3 shadow-xs">
                  <p
                    className={`leading-relaxed whitespace-pre-wrap ${
                      fontSize === 'large' ? 'text-base' : 'text-sm'
                    }`}
                  >
                    {message.content}
                  </p>
                  <div className="mt-1 text-right text-[10px] text-slate-300 font-mono">
                    {message.timestamp}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              </div>
            );
          }

          // Assistant Message
          return (
            <div key={message.id} className="flex items-start gap-3 w-full">
              <div className="w-8 h-8 rounded-lg bg-[#14213D] text-teal-400 flex items-center justify-center shrink-0 mt-1 shadow-xs border border-teal-500/30">
                <Scale className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0 bg-white border border-stone-200/90 rounded-2xl rounded-tl-xs p-5 shadow-xs space-y-4">
                {/* Demonstration Tag - Clean unboxed text with icon, following zero-pill rules */}
                <div className="flex items-center justify-between border-b border-stone-100 pb-2.5 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 font-medium text-teal-800">
                    <Info className="w-3.5 h-3.5 text-teal-600" />
                    <span>{t.demoResponseBadge}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {message.timestamp}
                  </span>
                </div>

                {/* Formatted Markdown Body */}
                <div
                  className={`text-slate-800 ${
                    fontSize === 'large' ? 'text-base' : 'text-sm'
                  }`}
                >
                  {renderMarkdown(message.content)}
                </div>

                {/* Recommended Next Steps */}
                {message.nextSteps && message.nextSteps.length > 0 && (
                  <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>{t.nextStepsHeading}</span>
                    </div>
                    <ol className="space-y-1.5 text-xs text-slate-700 pl-4 list-decimal">
                      {message.nextSteps.map((step, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Verified Source Cards */}
                {message.sources && message.sources.length > 0 && (
                  <div className="pt-2 border-t border-stone-100 space-y-2">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      {t.sourcesHeading}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {message.sources.map((src, idx) => (
                        <a
                          key={idx}
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group p-2.5 bg-stone-50 hover:bg-teal-50/50 border border-stone-200 hover:border-teal-400 rounded-lg transition-colors flex items-center justify-between text-left"
                        >
                          <div className="min-w-0 pr-2">
                            <p className="text-xs font-semibold text-slate-800 group-hover:text-teal-900 truncate">
                              {src.title}
                            </p>
                            <p className="text-[10px] text-slate-500 truncate">
                              {src.organization}
                              {src.sectionRef ? ` · ${src.sectionRef}` : ''}
                            </p>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Bar: Copy & Feedback */}
                <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-slate-500">
                  <button
                    onClick={() => handleCopy(message.id, message.content)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-slate-600 hover:text-slate-900 hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
                    title={t.copyResponse}
                  >
                    {copiedId === message.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-teal-600" />
                        <span className="text-teal-700 font-medium">{t.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t.copyResponse}</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onFeedback(message.id, 'helpful')}
                      className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                        message.feedback === 'helpful'
                          ? 'bg-teal-100 text-teal-800'
                          : 'hover:bg-stone-100 text-slate-500 hover:text-slate-900'
                      }`}
                      title={t.helpful}
                      aria-label={t.helpful}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onFeedback(message.id, 'unhelpful')}
                      className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                        message.feedback === 'unhelpful'
                          ? 'bg-rose-100 text-rose-800'
                          : 'hover:bg-stone-100 text-slate-500 hover:text-slate-900'
                      }`}
                      title={t.notHelpful}
                      aria-label={t.notHelpful}
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3 w-full animate-in fade-in duration-200">
            <div className="w-8 h-8 rounded-lg bg-[#14213D] text-teal-400 flex items-center justify-center shrink-0 mt-1 shadow-xs border border-teal-500/30">
              <Scale className="w-4 h-4" />
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl rounded-tl-xs p-4 shadow-xs max-w-md">
              <div className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                <span className="inline-block w-2 h-2 rounded-full bg-teal-500 animate-ping" />
                <span>{t.generatingResponse}</span>
              </div>
              <div className="mt-2.5 space-y-1.5">
                <div className="h-2 bg-stone-200 rounded w-3/4 animate-pulse" />
                <div className="h-2 bg-stone-200 rounded w-1/2 animate-pulse" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Follow-ups */}
      {messages.length > 0 && !isLoading && (
        <div className="px-4 md:px-8 py-2 max-w-4xl w-full mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">
              {language === 'hi' ? 'अगला कदम:' : 'Next step:'}
            </span>
            {quickFollowUps.map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  if (item.action === 'letter') {
                    onOpenLetterGenerator();
                  } else {
                    onSendMessage(item.text);
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-stone-50 border border-stone-300 hover:border-teal-500 text-slate-700 hover:text-teal-900 rounded-full transition-colors whitespace-nowrap cursor-pointer shrink-0 shadow-2xs"
              >
                <span>{item.text}</span>
                <ArrowRight className="w-3 h-3 text-teal-600" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sticky Bottom Chat Input */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 md:px-8 py-3.5">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="relative rounded-2xl bg-[#FAFAF9] border border-stone-300 focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-teal-500/20 transition-all p-2.5 shadow-xs"
          >
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.inputPlaceholder}
              disabled={isLoading}
              className="w-full bg-transparent border-0 resize-none outline-none text-slate-800 placeholder:text-slate-400 text-sm md:text-base pr-12 max-h-[160px] min-h-[38px]"
            />
            <div className="flex items-center justify-between pt-1 border-t border-stone-200/60 mt-1">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onRequestClearChat}
                  className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-rose-600 transition-colors p-1 rounded"
                  title={t.clearChat}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.clearChat}</span>
                </button>
                <span className="text-[11px] text-slate-400 hidden md:inline">
                  Enter to send · Shift+Enter for newline
                </span>
              </div>

              <button
                type="submit"
                disabled={!inputVal.trim() || isLoading}
                className={`p-1.5 md:p-2 rounded-xl transition-all duration-150 cursor-pointer ${
                  inputVal.trim() && !isLoading
                    ? 'bg-[#14213D] text-white hover:bg-teal-600 shadow-xs'
                    : 'bg-stone-200 text-slate-400 cursor-not-allowed opacity-60'
                }`}
                title={t.sendButtonLabel}
                aria-label={t.sendButtonLabel}
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HomeWelcome } from './components/HomeWelcome';
import { ChatView } from './components/ChatView';
import { ComplaintLetterGenerator } from './components/ComplaintLetterGenerator';
import { OfficialResourcesView } from './components/OfficialResourcesView';
import { ConfirmationModal } from './components/ConfirmationModal';
import { SettingsModal } from './components/SettingsModal';
import { Toast, ToastProps } from './components/Toast';
import { INITIAL_SAMPLE_SESSIONS } from './data/sampleData';
import { UI_TRANSLATIONS } from './data/translations';
import { matchPredefinedResponse } from './utils/responseMatcher';
import { ActiveTab, ChatSession, Language, Message, Topic } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');
  const [language, setLanguage] = useState<Language>('en');
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  // Chat sessions state
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    try {
      const saved = localStorage.getItem('legalease_sessions');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_SAMPLE_SESSIONS;
  });

  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // UI state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type?: 'success' | 'info' | 'warning' }>>([]);

  // Save sessions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('legalease_sessions', JSON.stringify(sessions));
    } catch {
      // Ignore quota errors in private browsing
    }
  }, [sessions]);

  // Toast dispatch helper
  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleCopyText = (text: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      showToast(UI_TRANSLATIONS[language].copied);
    }
  };

  // Start a fresh new chat
  const handleNewChat = () => {
    setActiveSessionId(null);
    setCurrentMessages([]);
    setActiveTab('chat');
  };

  // Switch to an existing session
  const handleSelectSession = (id: string) => {
    const found = sessions.find((s) => s.id === id);
    if (found) {
      setActiveSessionId(id);
      setCurrentMessages(found.messages);
      setActiveTab('chat');
    }
  };

  // Delete a session from history
  const handleDeleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (activeSessionId === id) {
      handleNewChat();
    }
    showToast(language === 'hi' ? 'बातचीत हटाई गई' : 'Chat session removed');
  };

  // Select a topic from the sidebar
  const handleSelectTopic = (topic: Topic) => {
    setActiveTab('chat');
    const promptText = language === 'hi' ? topic.sampleQuestionHi : topic.sampleQuestion;
    handleSendMessage(promptText, topic.id);
  };

  // Send message and get AI or verified legal response
  const handleSendMessage = async (userText: string, topicIdOverride?: string) => {
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: userText,
      timestamp: timeString,
    };

    const newMessages = [...currentMessages, userMessage];
    setCurrentMessages(newMessages);
    setIsLoading(true);

    try {
      let assistantContent = '';
      let detectedTopicId = topicIdOverride || 'consumer-rights';
      let sources = undefined;
      let nextSteps: string[] | undefined = undefined;

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userText,
            language,
            history: newMessages.slice(-6).map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.content) {
            assistantContent = data.content;
            if (data.topicId) detectedTopicId = data.topicId;
            if (data.sources) sources = data.sources;
            if (data.nextSteps) nextSteps = data.nextSteps;
          }
        }
      } catch (networkErr) {
        console.warn('API call failed, falling back to local knowledge base:', networkErr);
      }

      // Fallback to local verified response matcher if backend did not yield content
      if (!assistantContent) {
        const match = matchPredefinedResponse(userText, language);
        assistantContent = match.content;
        detectedTopicId = topicIdOverride || match.topicId || 'consumer-rights';
        sources = match.sources;
        nextSteps = match.nextSteps;
      }

      const assistantMessage: Message = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: assistantContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        topicId: detectedTopicId,
        sources,
        nextSteps,
      };

      const finalMessages = [...newMessages, assistantMessage];
      setCurrentMessages(finalMessages);

      // Create or update session in history
      if (activeSessionId) {
        setSessions((prev) =>
          prev.map((s) =>
            s.id === activeSessionId
              ? { ...s, messages: finalMessages, updatedAt: new Date().toISOString() }
              : s
          )
        );
      } else {
        const newSessionId = `session-${Date.now()}`;
        const newTitle = userText.length > 32 ? `${userText.slice(0, 32)}...` : userText;
        const newSession: ChatSession = {
          id: newSessionId,
          title: newTitle,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          messages: finalMessages,
          topicId: detectedTopicId,
        };
        setActiveSessionId(newSessionId);
        setSessions((prev) => [newSession, ...prev]);
      }
    } catch (err: any) {
      console.error('Error handling message:', err);
      showToast('Error generating response', 'warning');
    } finally {
      setIsLoading(false);
    }
  };

  // Clear current conversation
  const handleConfirmClearChat = () => {
    setCurrentMessages([]);
    if (activeSessionId) {
      setSessions((prev) =>
        prev.map((s) => (s.id === activeSessionId ? { ...s, messages: [] } : s))
      );
    }
    setIsClearModalOpen(false);
    showToast(language === 'hi' ? 'बातचीत साफ़ कर दी गई' : 'Conversation cleared');
  };

  // Feedback recording (helpful / unhelpful)
  const handleFeedback = (messageId: string, rating: 'helpful' | 'unhelpful') => {
    setCurrentMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, feedback: rating } : msg
      )
    );
    showToast(UI_TRANSLATIONS[language].feedbackThanks, 'info');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FAFAF9] text-slate-800">
      {/* Sidebar Component */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        language={language}
        onLanguageChange={setLanguage}
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={handleSelectSession}
        onNewChat={handleNewChat}
        onDeleteSession={handleDeleteSession}
        onSelectTopic={handleSelectTopic}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          language={language}
          onToggleMobileMenu={() => setIsMobileOpen(true)}
          onNewChat={handleNewChat}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Viewport Content */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === 'chat' && (
            <>
              {currentMessages.length === 0 ? (
                <HomeWelcome
                  language={language}
                  onSubmitQuery={(q) => handleSendMessage(q)}
                  onSelectSuggestion={(q) => handleSendMessage(q)}
                  fontSize={fontSize}
                />
              ) : (
                <ChatView
                  messages={currentMessages}
                  isLoading={isLoading}
                  language={language}
                  fontSize={fontSize}
                  onSendMessage={(q) => handleSendMessage(q)}
                  onRequestClearChat={() => setIsClearModalOpen(true)}
                  onOpenLetterGenerator={() => setActiveTab('letter-generator')}
                  onFeedback={handleFeedback}
                  onCopyText={handleCopyText}
                />
              )}
            </>
          )}

          {activeTab === 'letter-generator' && (
            <ComplaintLetterGenerator
              language={language}
              onCopyText={handleCopyText}
              onShowToast={showToast}
              fontSize={fontSize}
            />
          )}

          {activeTab === 'resources' && (
            <OfficialResourcesView
              language={language}
              onShowToast={showToast}
              fontSize={fontSize}
            />
          )}
        </main>
      </div>

      {/* Modals & Dialogs */}
      <ConfirmationModal
        isOpen={isClearModalOpen}
        language={language}
        onConfirm={handleConfirmClearChat}
        onCancel={() => setIsClearModalOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        language={language}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Floating Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              id={toast.id}
              type={toast.type}
              message={toast.message}
              onClose={removeToast}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

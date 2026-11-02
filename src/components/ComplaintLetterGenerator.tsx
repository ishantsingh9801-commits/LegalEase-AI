import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Download,
  RotateCcw,
  Sparkles,
  Check,
  AlertCircle,
  HelpCircle,
  Info,
  Calendar,
  Building,
  Package,
  Clock,
  Shield,
  FileEdit,
} from 'lucide-react';
import { ComplaintFormData, Language } from '../types';
import { generateComplaintLetter, downloadTextFile } from '../utils/letterGenerator';
import { UI_TRANSLATIONS } from '../data/translations';

interface ComplaintLetterGeneratorProps {
  language: Language;
  onCopyText: (text: string) => void;
  onShowToast: (message: string) => void;
  fontSize: 'normal' | 'large';
}

const DEFAULT_FORM_DATA: ComplaintFormData = {
  senderName: '',
  senderAddress: '',
  senderPhone: '',
  senderEmail: '',
  companyName: '',
  companyAddress: '',
  productName: '',
  orderId: '',
  purchaseDate: '',
  pricePaid: '',
  problemCategory: 'defective',
  problemDescription: '',
  previousAttempts: '',
  desiredResolution: 'Full refund to original payment method within 15 days',
  resolutionDeadlineDays: 15,
  language: 'en',
};

const DEMO_CASE_DATA: ComplaintFormData = {
  senderName: 'Rajesh Kumar Sharma',
  senderAddress: 'Flat 402, Green Valley Enclave, Indirapuram, Ghaziabad, UP - 201014',
  senderPhone: '+91 98765 43210',
  senderEmail: 'rajesh.sharma@example.in',
  companyName: 'NexGen Electronics Retail India Pvt. Ltd.',
  companyAddress: 'Building 7, Cyber Tech Park, Sector 48, Gurugram, Haryana - 122018',
  productName: 'AeroSound Pro Noise-Cancelling Wireless Headphones (Model ANC-800)',
  orderId: 'NEX-2026-8849201',
  purchaseDate: '2026-10-12',
  pricePaid: '8,499',
  problemCategory: 'defective',
  problemDescription: 'The left earcup stopped producing audio after 4 days of light use. The charging indicator flashes red continuously and fails to hold a charge despite following official manufacturer reset instructions.',
  previousAttempts: 'Raised ticket #44921 with customer support on 16th Oct 2026. The executive refused replacement claiming "accessories are non-returnable" after packaging is opened, violating statutory warranty terms.',
  desiredResolution: 'Full refund of ₹8,499 back to original credit card, or immediate courier replacement with a brand new, defect-free unit.',
  resolutionDeadlineDays: 15,
  language: 'en',
};

export const ComplaintLetterGenerator: React.FC<ComplaintLetterGeneratorProps> = ({
  language,
  onCopyText,
  onShowToast,
  fontSize,
}) => {
  const [formData, setFormData] = useState<ComplaintFormData>({
    ...DEFAULT_FORM_DATA,
    language,
  });
  const [generatedLetter, setGeneratedLetter] = useState<string>('');
  const [errors, setErrors] = useState<Partial<Record<keyof ComplaintFormData, string>>>({});
  const [isCopied, setIsCopied] = useState(false);
  const [isEditingDirectly, setIsEditingDirectly] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const t = UI_TRANSLATIONS[language];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ComplaintFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof ComplaintFormData, string>> = {};
    if (!formData.productName.trim()) {
      newErrors.productName = language === 'hi' ? 'उत्पाद का नाम आवश्यक है' : 'Product/service name is required';
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName = language === 'hi' ? 'कंपनी का नाम आवश्यक है' : 'Company/seller name is required';
    }
    if (!formData.purchaseDate.trim()) {
      newErrors.purchaseDate = language === 'hi' ? 'खरीद की तारीख आवश्यक है' : 'Purchase date is required';
    }
    if (!formData.problemDescription.trim()) {
      newErrors.problemDescription = language === 'hi' ? 'समस्या का विवरण आवश्यक है' : 'Problem description is required';
    }
    if (!formData.desiredResolution.trim()) {
      newErrors.desiredResolution = language === 'hi' ? 'अपेक्षित समाधान आवश्यक है' : 'Desired resolution is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAiEnhance = async () => {
    if (!validateForm()) {
      onShowToast(language === 'hi' ? 'कृपया सभी आवश्यक फ़ील्ड भरें' : 'Please fill all mandatory fields');
      return;
    }
    setIsEnhancing(true);
    try {
      const res = await fetch('/api/letter/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, language }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.letter) {
          setGeneratedLetter(data.letter);
          setIsEditingDirectly(false);
          onShowToast(language === 'hi' ? 'एआई द्वारा नोटिस का प्रारूप तैयार हुआ' : 'AI-enhanced formal legal notice drafted');
          return;
        }
      }
      throw new Error('AI drafting unavailable');
    } catch {
      // Fallback to standard deterministic statutory template
      const letter = generateComplaintLetter(formData);
      setGeneratedLetter(letter);
      setIsEditingDirectly(false);
      onShowToast(language === 'hi' ? 'मानक प्रारूप तैयार किया गया' : 'Standard template generated');
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      onShowToast(language === 'hi' ? 'कृपया सभी आवश्यक फ़ील्ड भरें' : 'Please fill all mandatory fields');
      return;
    }

    const letter = generateComplaintLetter(formData);
    setGeneratedLetter(letter);
    setIsEditingDirectly(false);
    onShowToast(language === 'hi' ? 'शिकायत पत्र सफलतापूर्वक तैयार किया गया' : 'Complaint letter generated successfully');
  };

  const handleFillDemo = () => {
    setFormData({
      ...DEMO_CASE_DATA,
      language,
      desiredResolution:
        language === 'hi'
          ? '₹8,499 का पूर्ण रिफंड मूल खाते में, अथवा 15 दिनों में नया उत्पाद प्रदान किया जाए।'
          : DEMO_CASE_DATA.desiredResolution,
    });
    setErrors({});
    const letter = generateComplaintLetter({
      ...DEMO_CASE_DATA,
      language,
    });
    setGeneratedLetter(letter);
    onShowToast(language === 'hi' ? 'डेमो शिकायत विवरण भरा गया' : 'Sample complaint scenario loaded');
  };

  const handleClear = () => {
    setFormData({ ...DEFAULT_FORM_DATA, language });
    setGeneratedLetter('');
    setErrors({});
    onShowToast(language === 'hi' ? 'फॉर्म खाली कर दिया गया' : 'Form cleared');
  };

  const handleCopy = () => {
    if (!generatedLetter) return;
    onCopyText(generatedLetter);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    onShowToast(t.copied);
  };

  const handleDownload = () => {
    if (!generatedLetter) return;
    const sanitizedTitle = formData.productName
      ? formData.productName.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 20)
      : 'Consumer';
    const filename = `Consumer_Complaint_Letter_${sanitizedTitle}.txt`;
    downloadTextFile(filename, generatedLetter);
    onShowToast(language === 'hi' ? `${filename} डाउनलोड हो गया` : `Downloaded ${filename}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4 text-teal-600" />
            <span>Legal Notice Generator</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            {t.letterGenTitle}
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl">
            {t.letterGenSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleFillDemo}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>{t.fillDemo}</span>
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.clearForm}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Form Left, Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-6 bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-6">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {language === 'hi' ? '1. विवाद का विवरण' : '1. Dispute & Product Details'}
              </span>
              <div className="flex items-center gap-2 text-xs">
                <label className="text-slate-500 font-medium">Letter Language:</label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="px-2 py-1 bg-stone-50 border border-stone-300 rounded text-xs font-medium text-slate-700 outline-none"
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'hi' ? 'उत्पाद या सेवा का नाम *' : 'Product / Service Name *'}
                </label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  placeholder="e.g., Samsung Galaxy S23"
                  className={`w-full px-3 py-2 text-sm bg-stone-50 border rounded-lg outline-none transition-colors ${
                    errors.productName ? 'border-rose-400 bg-rose-50/30' : 'border-stone-300 focus:border-teal-600 focus:bg-white'
                  }`}
                />
                {errors.productName && (
                  <p className="mt-1 text-[11px] text-rose-600">{errors.productName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'hi' ? 'कंपनी या विक्रेता का नाम *' : 'Company / Seller Name *'}
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="e.g., Flipkart / Cloudtail India"
                  className={`w-full px-3 py-2 text-sm bg-stone-50 border rounded-lg outline-none transition-colors ${
                    errors.companyName ? 'border-rose-400 bg-rose-50/30' : 'border-stone-300 focus:border-teal-600 focus:bg-white'
                  }`}
                />
                {errors.companyName && (
                  <p className="mt-1 text-[11px] text-rose-600">{errors.companyName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'hi' ? 'खरीद तिथि *' : 'Purchase Date *'}
                </label>
                <input
                  type="date"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 text-sm bg-stone-50 border rounded-lg outline-none transition-colors ${
                    errors.purchaseDate ? 'border-rose-400 bg-rose-50/30' : 'border-stone-300 focus:border-teal-600 focus:bg-white'
                  }`}
                />
                {errors.purchaseDate && (
                  <p className="mt-1 text-[11px] text-rose-600">{errors.purchaseDate}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'hi' ? 'ऑर्डर / इनवॉइस आईडी' : 'Order / Invoice ID'}
                </label>
                <input
                  type="text"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleInputChange}
                  placeholder="e.g., OD9382104"
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 focus:border-teal-600 focus:bg-white rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'hi' ? 'भुगतान राशि (₹)' : 'Amount Paid (₹)'}
                </label>
                <input
                  type="text"
                  name="pricePaid"
                  value={formData.pricePaid}
                  onChange={handleInputChange}
                  placeholder="e.g., 14,999"
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 focus:border-teal-600 focus:bg-white rounded-lg outline-none font-mono"
                />
              </div>
            </div>

            {/* Problem Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'hi' ? 'समस्या का स्पष्ट विवरण *' : 'Description of the Problem *'}
              </label>
              <textarea
                name="problemDescription"
                rows={3}
                value={formData.problemDescription}
                onChange={handleInputChange}
                placeholder="State the exact defects, shortcomings, or refusal faced..."
                className={`w-full px-3 py-2 text-sm bg-stone-50 border rounded-lg outline-none transition-colors ${
                  errors.problemDescription ? 'border-rose-400 bg-rose-50/30' : 'border-stone-300 focus:border-teal-600 focus:bg-white'
                }`}
              />
              {errors.problemDescription && (
                <p className="mt-1 text-[11px] text-rose-600">{errors.problemDescription}</p>
              )}
            </div>

            {/* Previous Attempts */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'hi' ? 'समाधान के पूर्व प्रयास' : 'Previous Attempts to Resolve'}
              </label>
              <textarea
                name="previousAttempts"
                rows={2}
                value={formData.previousAttempts}
                onChange={handleInputChange}
                placeholder="e.g., Contacted customer care via email on 14th Oct, ticket #1234 rejected without valid inspection..."
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 focus:border-teal-600 focus:bg-white rounded-lg outline-none"
              />
            </div>

            {/* Desired Resolution & Deadline */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'hi' ? 'अपेक्षित कानूनी समाधान *' : 'Desired Resolution *'}
                </label>
                <input
                  type="text"
                  name="desiredResolution"
                  value={formData.desiredResolution}
                  onChange={handleInputChange}
                  placeholder="e.g., Full refund of ₹14,999 to bank account"
                  className={`w-full px-3 py-2 text-sm bg-stone-50 border rounded-lg outline-none transition-colors ${
                    errors.desiredResolution ? 'border-rose-400 bg-rose-50/30' : 'border-stone-300 focus:border-teal-600 focus:bg-white'
                  }`}
                />
                {errors.desiredResolution && (
                  <p className="mt-1 text-[11px] text-rose-600">{errors.desiredResolution}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'hi' ? 'समयसीमा (दिन)' : 'Deadline (Days)'}
                </label>
                <select
                  name="resolutionDeadlineDays"
                  value={formData.resolutionDeadlineDays}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 focus:border-teal-600 focus:bg-white rounded-lg outline-none"
                >
                  <option value={7}>7 Days</option>
                  <option value={15}>15 Days (Recommended)</option>
                  <option value={30}>30 Days</option>
                </select>
              </div>
            </div>

            {/* Sender / Complainant Details (Optional / Good for formal document) */}
            <div className="pt-3 border-t border-stone-100">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                {language === 'hi' ? '2. उपभोक्ता संपर्क विवरण' : '2. Complainant Contact Information'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleInputChange}
                  placeholder="Your Full Name"
                  className="px-3 py-2 text-sm bg-stone-50 border border-stone-300 focus:border-teal-600 focus:bg-white rounded-lg outline-none"
                />
                <input
                  type="text"
                  name="senderPhone"
                  value={formData.senderPhone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="px-3 py-2 text-sm bg-stone-50 border border-stone-300 focus:border-teal-600 focus:bg-white rounded-lg outline-none"
                />
              </div>
            </div>

            {/* Action Buttons: AI Enhanced and Standard Template */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
              <button
                type="button"
                onClick={handleAiEnhance}
                disabled={isEnhancing}
                className="py-3 px-4 bg-teal-600 hover:bg-teal-500 disabled:opacity-60 text-white font-semibold text-xs md:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-teal-200" />
                <span>
                  {isEnhancing
                    ? (language === 'hi' ? 'एआई नोटिस तैयार हो रहा है...' : 'Drafting with Gemini AI...')
                    : (language === 'hi' ? 'एआई द्वारा नोटिस ड्राफ्ट करें' : 'AI-Draft Legal Notice')}
                </span>
              </button>

              <button
                type="submit"
                className="py-3 px-4 bg-[#14213D] hover:bg-[#1C2D54] text-white font-semibold text-xs md:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-teal-400" />
                <span>{t.generateLetter}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Preview Panel Column */}
        <div className="lg:col-span-6 bg-white border border-stone-200 rounded-2xl p-6 shadow-xs flex flex-col h-full min-h-[580px]">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                {language === 'hi' ? 'पत्र पूर्वावलोकन' : 'Formal Letter Preview'}
              </h2>
              <p className="text-xs text-slate-400">
                {language === 'hi' ? 'ब्राउज़र में स्थानीय रूप से तैयार' : 'Generated locally in-browser'}
              </p>
            </div>

            {generatedLetter && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingDirectly(!isEditingDirectly)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1 cursor-pointer ${
                    isEditingDirectly
                      ? 'bg-teal-50 border-teal-500 text-teal-800'
                      : 'bg-white border-stone-300 text-slate-700 hover:bg-stone-50'
                  }`}
                  title={t.editLetter}
                >
                  <FileEdit className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    {isEditingDirectly ? 'Locked View' : 'Edit Directly'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-2.5 py-1.5 text-xs font-medium bg-white hover:bg-stone-50 border border-stone-300 rounded-lg text-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                  title={t.copyLetter}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-teal-600" />
                      <span className="text-teal-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.copyLetter}</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-3 py-1.5 text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                  title={t.downloadTxt}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.downloadTxt}</span>
                </button>
              </div>
            )}
          </div>

          {generatedLetter ? (
            <div className="flex-1 flex flex-col space-y-4">
              {/* Educational Warning */}
              <div className="p-2.5 bg-stone-50 border border-stone-200 rounded-lg flex items-start gap-2 text-xs text-slate-600">
                <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {t.sampleLetterWarning}
                </p>
              </div>

              {isEditingDirectly ? (
                <textarea
                  value={generatedLetter}
                  onChange={(e) => setGeneratedLetter(e.target.value)}
                  className="flex-1 w-full p-4 bg-stone-50 border border-teal-400 rounded-xl font-mono text-xs md:text-sm text-slate-800 leading-relaxed outline-none resize-none focus:ring-1 focus:ring-teal-500 min-h-[420px]"
                />
              ) : (
                <pre className="flex-1 p-4 bg-stone-50 border border-stone-200/80 rounded-xl font-mono text-xs md:text-sm text-slate-800 leading-relaxed overflow-x-auto whitespace-pre-wrap select-text min-h-[420px]">
                  {generatedLetter}
                </pre>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-stone-200 rounded-xl space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-slate-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">
                  {language === 'hi' ? 'कोई पत्र तैयार नहीं है' : 'No Letter Generated Yet'}
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mt-1">
                  {language === 'hi'
                    ? 'बाईं ओर फॉर्म भरें या "डेमो केस भरें" बटन पर क्लिक करके त्वरित पूर्वावलोकन देखें।'
                    : 'Complete the form on the left or click "Fill Sample Case" to generate a structured complaint letter.'}
                </p>
              </div>
              <button
                type="button"
                onClick={handleFillDemo}
                className="mt-2 px-3.5 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors cursor-pointer"
              >
                {t.fillDemo}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

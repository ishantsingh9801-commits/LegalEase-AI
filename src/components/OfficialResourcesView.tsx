import React, { useState } from 'react';
import {
  ExternalLink,
  BookOpen,
  PhoneCall,
  Building2,
  FileCheck,
  ShieldCheck,
  Megaphone,
  Search,
  Scale,
  Info,
  CheckCircle,
  Copy,
} from 'lucide-react';
import { OFFICIAL_RESOURCES } from '../data/sampleData';
import { UI_TRANSLATIONS } from '../data/translations';
import { Language, OfficialResource } from '../types';

interface OfficialResourcesViewProps {
  language: Language;
  onShowToast: (message: string) => void;
  fontSize: 'normal' | 'large';
}

export const OfficialResourcesView: React.FC<OfficialResourcesViewProps> = ({
  language,
  onShowToast,
  fontSize,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const t = UI_TRANSLATIONS[language];

  const getResourceIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-teal-600" />;
      case 'PhoneCall':
        return <PhoneCall className="w-5 h-5 text-teal-600" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-teal-600" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-teal-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-teal-600" />;
      case 'Megaphone':
        return <Megaphone className="w-5 h-5 text-teal-600" />;
      default:
        return <Scale className="w-5 h-5 text-teal-600" />;
    }
  };

  const filteredResources = OFFICIAL_RESOURCES.filter((res) => {
    const query = searchTerm.toLowerCase();
    const title = res.title.toLowerCase();
    const org = res.organization.toLowerCase();
    const desc = (language === 'hi' ? res.descriptionHi : res.description).toLowerCase();
    return title.includes(query) || org.includes(query) || desc.includes(query);
  });

  const handleCopyNumber = (number: string) => {
    navigator.clipboard.writeText(number);
    onShowToast(`Copied ${number} to clipboard`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4 text-teal-600" />
            <span>Statutory Verification & Redressal</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            {t.resourcesTitle}
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl">
            {t.resourcesSubtitle}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.searchResources}
            className="w-full pl-9 pr-3 py-2 text-xs md:text-sm bg-white border border-stone-300 rounded-xl focus:border-teal-600 focus:ring-1 focus:ring-teal-500/20 outline-none transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* Prominent Educational Disclaimer Notice */}
      <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex items-start gap-3.5 text-xs text-amber-950">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-amber-900">
            {t.disclaimerBannerTitle}
          </p>
          <p className="leading-relaxed text-amber-900/80">
            {t.disclaimerBannerText} External portals provided below belong to their respective governmental departments and public authorities. Always verify latest official gazettes and statutory rules on sovereign .gov.in and .nic.in domains.
          </p>
        </div>
      </div>

      {/* Toll-Free Helpline Quick Action Bar */}
      <div className="p-5 bg-gradient-to-r from-[#14213D] to-[#1C2D54] rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-400 shrink-0">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">
              National Consumer Helpline (NCH)
            </h3>
            <p className="text-xs text-slate-300">
              Department of Consumer Affairs, Govt. of India · Free Assistance (9:30 AM – 5:30 PM, all days except gazetted holidays)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href="tel:1915"
            className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-[#14213D] font-bold text-xs md:text-sm rounded-lg transition-colors shadow-xs"
          >
            Call Toll-Free 1915
          </a>
          <button
            onClick={() => handleCopyNumber('1915')}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer"
            title="Copy toll-free number"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs hover:border-teal-400 hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 shrink-0 border border-teal-100">
                    {getResourceIcon(resource.iconName)}
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-slate-900 leading-snug">
                      {resource.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {resource.organization}
                    </p>
                  </div>
                </div>

                {/* Clean unboxed text metadata tag */}
                <span className="text-[11px] font-semibold text-teal-800 shrink-0 font-mono">
                  {resource.badgeText}
                </span>
              </div>

              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                {language === 'hi' ? resource.descriptionHi : resource.description}
              </p>

              {/* Key Services checklist */}
              <div className="pt-2 border-t border-stone-100">
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-500">
                  {resource.keyServices.map((svc, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-slate-600 bg-stone-100 px-2 py-0.5 rounded text-[11px]"
                    >
                      <CheckCircle className="w-3 h-3 text-teal-600 shrink-0" />
                      <span>{svc}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Visit Official Portal Link */}
            <div className="pt-5 mt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono truncate max-w-[200px]">
                {resource.url.replace('https://', '')}
              </span>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#14213D] hover:bg-teal-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
              >
                <span>{t.visitWebsite}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12 border border-dashed border-stone-300 rounded-2xl p-8 space-y-2">
          <p className="text-sm font-semibold text-slate-800">
            No matching official resources found
          </p>
          <p className="text-xs text-slate-500">
            Try searching for terms like "NCH", "Code", "Court", or "Standards".
          </p>
        </div>
      )}
    </div>
  );
};

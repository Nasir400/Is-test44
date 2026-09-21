import React from 'react';
import { Heart, Shield, CheckCircle, Globe } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface FooterProps {
  onNavigate: (route: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  language,
  onLanguageChange
}) => {
  const t = translations[language];

  return (
    <footer className="bg-[#101828] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#FF5A67] flex items-center justify-center text-white">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">ISFAHAM</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Find Someone Who Understands You. A premium, dignified relationship and marriage platform connecting adults across Somalia, the Somali diaspora, and worldwide.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-950/60 text-rose-300 border border-rose-800/40">
                <Shield className="w-3.5 h-3.5 text-[#FF5A67]" />
                Strictly 18+ Only
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Verified Community
              </span>
            </div>
          </div>

          {/* Col 2: Discover & Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-white transition-colors">
                  {t.footerHow}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('premium')} className="hover:text-white transition-colors">
                  {t.navPremium}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('verification')} className="hover:text-white transition-colors">
                  {t.navVerification}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  {t.footerAbout}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Trust & Safety */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Trust & Safety</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate('safety')} className="hover:text-white transition-colors">
                  {t.footerSafety}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('community-guidelines')} className="hover:text-white transition-colors">
                  {t.footerGuidelines}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('help')} className="hover:text-white transition-colors">
                  {t.footerHelp}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  {t.footerContact}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">
                  {t.footerPrivacy}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">
                  {t.footerTerms}
                </button>
              </li>
              <li>
                <span className="text-xs text-slate-500 cursor-not-allowed">
                  Careers (Hiring Soon)
                </span>
              </li>
            </ul>

            {/* Language Selector in Footer */}
            <div className="pt-3">
              <label className="text-[11px] font-medium text-slate-400 flex items-center gap-1 mb-1.5">
                <Globe className="w-3.5 h-3.5" /> Language / Luqadda
              </label>
              <select
                value={language}
                onChange={e => onLanguageChange(e.target.value as Language)}
                className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#FF5A67]"
              >
                <option value="en">English (US/UK)</option>
                <option value="so">Af-Soomaali (Somali)</option>
                <option value="ar">العربية (Arabic)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ISFAHAM Platform (Isfaham.com). {t.rightsReserved}</p>
          <div className="flex items-center gap-4">
            <span>Mogadishu</span>
            <span>•</span>
            <span>Hargeisa</span>
            <span>•</span>
            <span>London</span>
            <span>•</span>
            <span>Minneapolis</span>
            <span>•</span>
            <span>Dubai</span>
            <span>•</span>
            <span>Toronto</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

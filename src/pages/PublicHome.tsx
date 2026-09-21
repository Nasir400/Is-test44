import React from 'react';
import { 
  Heart, 
  Shield, 
  CheckCircle, 
  Sparkles, 
  Users, 
  Lock, 
  Globe2, 
  ArrowRight, 
  Check, 
  ChevronDown, 
  MessageCircle,
  Award,
  Compass
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface PublicHomeProps {
  onNavigate: (route: string) => void;
  language: Language;
}

export const PublicHome: React.FC<PublicHomeProps> = ({ onNavigate, language }) => {
  const t = translations[language];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200/60 bg-gradient-to-b from-white via-[#FFF1F3]/40 to-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Intent badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FFF1F3] text-[#E83E5A] border border-[#FF5A67]/20 shadow-xs">
                <Heart className="w-3.5 h-3.5 fill-[#FF5A67] text-[#FF5A67]" />
                <span>{t.meaningfulBadge}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E83E5A]"></span>
                <span className="text-slate-600 font-semibold">{t.strictly18}</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#101828] leading-[1.12]">
                Find Someone Who <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A67] to-[#E83E5A]">Understands You.</span>
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {t.subTagline}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  id="hero-cta-join-btn"
                  onClick={() => onNavigate('auth-signup')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF5A67] to-[#E83E5A] hover:brightness-105 text-white font-bold text-base shadow-xl shadow-[#FF5A67]/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>{t.heroCtaJoin}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  id="hero-cta-how-btn"
                  onClick={() => onNavigate('how-it-works')}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-200 shadow-xs transition-colors cursor-pointer"
                >
                  {t.heroCtaHow}
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#12B76A]" />
                  <span>Photo & Identity Verification</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#12B76A]" />
                  <span>Strictly 18+ Age-Assured</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-[#12B76A]" />
                  <span>Privacy-First & Secure</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Card Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                {/* Decorative glow */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#FF5A67]/20 to-amber-200/20 rounded-3xl blur-2xl -z-10" />

                {/* Primary Card */}
                <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                  <div className="relative h-96 bg-slate-900">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                      alt="Featured Member"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-900 backdrop-blur-md shadow-xs">
                        <CheckCircle className="w-3.5 h-3.5 text-[#12B76A]" />
                        Verified
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E83E5A] text-white shadow-xs">
                        Marriage
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-2xl font-bold">Hodan</span>
                        <span className="text-2xl font-light text-slate-200">28</span>
                      </div>
                      <p className="text-xs text-slate-300 mb-2">Architect • Mogadishu & London</p>
                      <p className="text-xs text-slate-200 line-clamp-2">
                        "Passionate about meaningful architecture, faith, and family. Looking for someone grounded with shared aspirations."
                      </p>
                    </div>
                  </div>

                  {/* Card bottom actions preview */}
                  <div className="px-6 py-4 bg-white flex items-center justify-around border-t border-slate-100">
                    <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <span className="text-lg font-bold">✕</span>
                    </div>
                    <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#E83E5A] to-[#FF5A67] text-white flex items-center justify-center shadow-lg shadow-[#FF5A67]/30">
                      <Heart className="w-6 h-6 fill-white" />
                    </div>
                    <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Floating pill badge */}
                <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Intentional Community</p>
                    <p className="text-[10px] text-slate-500">Zero tolerance for casual harassment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW ISFAHAM WORKS */}
      <section className="py-20 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E83E5A]">
              Simple & Dignified Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How Isfaham Works
            </h2>
            <p className="text-base text-slate-600">
              Designed from the ground up to foster deep understanding, emotional safety, and lifelong compatibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-4 hover:border-[#FF5A67]/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF1F3] text-[#E83E5A] font-bold text-lg flex items-center justify-center border border-[#FF5A67]/20">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900">Define Your Intention</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Whether looking for marriage, a serious relationship, or getting to know someone, your goals are stated clearly from day one.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-4 hover:border-[#FF5A67]/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF1F3] text-[#E83E5A] font-bold text-lg flex items-center justify-center border border-[#FF5A67]/20">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900">Discover Verified Matches</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Browse detailed profiles with multi-level verification, shared cultural values, education, career, and lifestyle alignments.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-4 hover:border-[#FF5A67]/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF1F3] text-[#E83E5A] font-bold text-lg flex items-center justify-center border border-[#FF5A67]/20">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900">Connect Meaningfully</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                When both individuals express mutual interest, enjoy safe private messaging enriched with Isfaham Icebreakers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DISCOVER MEANINGFUL CONNECTIONS */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-[#101828] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Purpose-Driven Technology
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Not Endless Swiping. Meaningful Compatibility.
              </h2>
              <p className="text-base text-slate-300 leading-relaxed">
                Conventional dating apps prioritize addictive swipe loops. Isfaham measures success by **Meaningful Connections per Week**—facilitating deep conversations that lead to marriage and lifelong companionship.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-sm text-slate-200">Filter by exact relationship intention, faith, and family values</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-sm text-slate-200">Full control over location privacy—approximate distances only</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-sm text-slate-200">Isfaham Icebreakers provide thoughtful, respectful questions</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="text-3xl font-extrabold text-[#FF5A67]">100%</h4>
                <p className="text-xs font-semibold text-white">18+ Assured</p>
                <p className="text-xs text-slate-400">Strict birthdate validation & gatekeeper checks</p>
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="text-3xl font-extrabold text-[#12B76A]">Zero</h4>
                <p className="text-xs font-semibold text-white">Fake Profiles</p>
                <p className="text-xs text-slate-400">Multi-level photo selfie pose verification</p>
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="text-3xl font-extrabold text-amber-400">Global</h4>
                <p className="text-xs font-semibold text-white">Somali Community</p>
                <p className="text-xs text-slate-400">Bridging homeland and diaspora worldwide</p>
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="text-3xl font-extrabold text-blue-400">Private</h4>
                <p className="text-xs font-semibold text-white">Mutual Matches</p>
                <p className="text-xs text-slate-400">Only mutual likes can send private messages</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 & 5. TRUST, SAFETY & VERIFICATION */}
      <section className="py-20 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E83E5A]">
              Safety First Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Multi-Level Verification & Protection
            </h2>
            <p className="text-base text-slate-600">
              Safety is not an afterthought at Isfaham; it is a fundamental architectural requirement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Level 1: Contact Verified</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mandatory SMS OTP or email verification ensures every account is anchored to an authentic communication channel.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Level 2: Photo Pose Verified</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Members submit a real-time gesture selfie matching randomized safety poses, cross-verified against their profile photos.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Level 3: Identity Assurance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Optional government document verification architecture for members desiring the ultimate badge of matrimonial credibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 & 7. SOMALI & GLOBAL COMMUNITY */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E83E5A]">
              Worldwide Reach
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Somali Community & Global Diaspora
            </h2>
            <p className="text-base text-slate-600">
              Connecting intentional hearts across continents with full multilingual support in Af-Soomaali, English, and Arabic.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {['Mogadishu', 'Hargeisa', 'London', 'Minneapolis', 'Toronto', 'Dubai', 'Nairobi', 'Columbus', 'Stockholm', 'Oslo', 'Melbourne', 'Istanbul'].map((city) => (
              <span
                key={city}
                className="px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-xs hover:border-[#FF5A67] transition-colors"
              >
                📍 {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PREMIUM PLANS PREVIEW */}
      <section className="py-20 bg-white border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E83E5A]">
              Transparent Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Choose the Plan That Fits Your Journey
            </h2>
            <p className="text-base text-slate-600">
              All core safety, matching, and basic messaging features are forever free. Upgrade anytime for enhanced visibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Free */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Free</h3>
                <p className="text-2xl font-extrabold text-slate-900 mt-2">$0</p>
                <p className="text-xs text-slate-500">Essential connections</p>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Create full profile</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Daily discovery cards</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Mutual matching & chat</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Trust & safety tools</li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('auth-signup')}
                className="w-full py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white transition-colors"
              >
                Get Started
              </button>
            </div>

            {/* Premium */}
            <div className="p-6 rounded-3xl bg-white border-2 border-[#FF5A67] shadow-lg flex flex-col justify-between space-y-6 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold bg-[#FF5A67] text-white">
                Most Popular
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Premium</h3>
                <p className="text-2xl font-extrabold text-slate-900 mt-2">$9.99 <span className="text-xs text-slate-500 font-normal">/mo</span></p>
                <p className="text-xs text-slate-500">Unrestricted discovery</p>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FF5A67]" /> Unlimited daily likes</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FF5A67]" /> Undo accidental passes</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FF5A67]" /> 5 Super Likes per week</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FF5A67]" /> Advanced filters</li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('premium')}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FF5A67] to-[#E83E5A] text-xs font-bold text-white shadow-md hover:opacity-95 transition-opacity"
              >
                Upgrade to Premium
              </button>
            </div>

            {/* Gold */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Gold</h3>
                <p className="text-2xl font-extrabold text-slate-900 mt-2">$19.99 <span className="text-xs text-slate-500 font-normal">/mo</span></p>
                <p className="text-xs text-slate-500">See who likes you</p>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-600" /> Everything in Premium</li>
                  <li className="flex items-center gap-2 font-semibold text-slate-900"><Check className="w-4 h-4 text-amber-600" /> See Who Likes You</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-600" /> 1 Free Profile Boost / mo</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-600" /> Read receipts</li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('premium')}
                className="w-full py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white transition-colors"
              >
                Upgrade to Gold
              </button>
            </div>

            {/* VIP */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">VIP</h3>
                <p className="text-2xl font-extrabold text-white mt-2">$39.99 <span className="text-xs text-slate-400 font-normal">/mo</span></p>
                <p className="text-xs text-slate-400">Curated & Priority</p>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Everything in Gold</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Top-of-Queue Priority Boost</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> VIP Profile Badge</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Dedicated concierge</li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('premium')}
                className="w-full py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition-colors"
              >
                Get VIP Access
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS ARCHITECTURE (Strictly marked authentic placeholders) */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Community Stories
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Built on Trust & Real Relationships
            </h2>
            <p className="text-xs text-slate-500">
              (Early founder cohort testimonial placeholders — authentic member stories will be published upon mutual marital consent)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <p className="text-sm text-slate-700 italic leading-relaxed">
                "What made Isfaham stand apart immediately was the clear relationship intentions. You don't have to guess whether someone is serious about marriage or just looking for casual distraction."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-xs">
                  K & H
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Khalid & Hodan</p>
                  <p className="text-[10px] text-slate-500">Connected across London & Mogadishu • 2026</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <p className="text-sm text-slate-700 italic leading-relaxed">
                "The photo verification gave my family immense peace of mind. Knowing every profile is verified and strictly 18+ created a dignified environment that represents our community's highest values."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                  F & M
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Faduma & Mustafa</p>
                  <p className="text-[10px] text-slate-500">Connected across Minneapolis & Dubai • 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section className="py-20 bg-white border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E83E5A]">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 className="text-base font-bold text-slate-900">Is Isfaham strictly 18+?</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Yes. Isfaham is strictly for adults aged 18 and older. We calculate age server-side during registration and block any underage attempts. Your exact birthdate is never displayed publicly.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 className="text-base font-bold text-slate-900">How does photo verification work?</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Members perform a simple selfie pose matching a designated gesture. Our Trust & Safety team verifies the selfie against your uploaded pictures before awarding the official verified badge.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 className="text-base font-bold text-slate-900">Can anyone message me without my consent?</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                No. Private chat conversations are only unlocked when both individuals have expressed mutual interest by liking each other. You can also unmatch or block anyone at any moment.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 className="text-base font-bold text-slate-900">Is my exact location shared?</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Never. We never disclose precise GPS coordinates or home addresses. Only your selected city, country, and approximate distance rounded to safe thresholds are visible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="py-20 bg-gradient-to-tr from-[#E83E5A] to-[#FF5A67] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto backdrop-blur-md">
            <Heart className="w-8 h-8 fill-white text-white" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to Find Someone Who Understands You?
          </h2>
          <p className="text-base sm:text-lg text-rose-100 max-w-xl mx-auto leading-relaxed">
            Join thousands of verified members seeking genuine, dignified relationships and marriage today.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('auth-signup')}
              className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-white text-[#E83E5A] font-bold text-base shadow-xl hover:bg-rose-50 transition-colors cursor-pointer"
            >
              Join Isfaham Now
            </button>
            <button
              onClick={() => onNavigate('safety')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-black/20 hover:bg-black/30 text-white font-semibold text-base backdrop-blur-md transition-colors cursor-pointer"
            >
              Explore Safety Center
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

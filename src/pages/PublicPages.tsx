import React, { useState } from 'react';
import { 
  Shield, 
  Heart, 
  CheckCircle, 
  Lock, 
  HelpCircle, 
  FileText, 
  Send, 
  Mail, 
  MapPin, 
  AlertTriangle,
  Users,
  Compass,
  Check
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface PublicPageProps {
  page: 'about' | 'how-it-works' | 'safety' | 'help' | 'community-guidelines' | 'privacy' | 'terms' | 'contact';
  onNavigate: (route: string) => void;
  language: Language;
}

export const PublicPages: React.FC<PublicPageProps> = ({ page, onNavigate, language }) => {
  const t = translations[language];

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('General Question');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ABOUT PAGE */}
        {page === 'about' && (
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E83E5A]">Our Purpose</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                About Isfaham
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed font-normal">
                "Isfaham" comes from the word for mutual understanding. We built Isfaham because traditional dating apps treat people like disposable playing cards, while matrimonial sites often feel rigid and outdated.
              </p>
            </div>

            <div className="prose prose-slate max-w-none text-sm text-slate-700 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Bridging Somali & Global Communities</h3>
              <p>
                From Mogadishu to London, Minneapolis, Toronto, Dubai, and beyond, our community spans every corner of the world. We are united by shared aspirations: faith, cultural pride, personal ambition, and the timeless desire for a partner who truly gets who you are.
              </p>

              <h3 className="text-lg font-bold text-slate-900">Our Core Pillars</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <Heart className="w-5 h-5 text-[#FF5A67]" />
                  <h4 className="font-bold text-slate-900">Mutual Understanding</h4>
                  <p className="text-xs text-slate-600">Relationships rooted in emotional alignment, shared values, and mutual respect.</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-bold text-slate-900">Strict Safety & 18+</h4>
                  <p className="text-xs text-slate-600">Every member verified. Zero tolerance for harassment or deceit.</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <Lock className="w-5 h-5 text-blue-600" />
                  <h4 className="font-bold text-slate-900">Privacy by Design</h4>
                  <p className="text-xs text-slate-600">No exact location tracking, private mutual matching, and data integrity.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HOW IT WORKS */}
        {page === 'how-it-works' && (
          <div className="space-y-10">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E83E5A]">The Experience</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                How Isfaham Works
              </h1>
              <p className="text-base text-slate-600 leading-relaxed">
                Step-by-step guidance on how to find, connect with, and build a lasting relationship with someone who understands you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-2xl bg-[#FF5A67] text-white font-bold flex items-center justify-center shrink-0">
                  1
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">Build Your Intentional Profile</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Select your explicit relationship intention (Marriage, Serious Relationship, or Getting to Know Someone), upload authentic photos, share your profession, education, languages, and lifestyle outlook.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-2xl bg-[#FF5A67] text-white font-bold flex items-center justify-center shrink-0">
                  2
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">Complete Photo Verification</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Submit a quick photo selfie pose to obtain the verified trust badge. Verified members receive significantly higher response rates and priority discovery.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-2xl bg-[#FF5A67] text-white font-bold flex items-center justify-center shrink-0">
                  3
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">Discover Compatible Profiles</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Filter by location, religion, intention, and values. Like candidates you feel an alignment with, or pass respectfully.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-2xl bg-[#FF5A67] text-white font-bold flex items-center justify-center shrink-0">
                  4
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">Mutual Match & Private Chat</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    When someone likes you back, a mutual match is created. Use Isfaham Icebreakers to initiate thoughtful, sincere conversations.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#FFF1F3] border border-[#FF5A67]/20 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900">Ready to start your journey?</h4>
                <p className="text-xs text-slate-600">Join thousands of intentional members today.</p>
              </div>
              <button
                onClick={() => onNavigate('auth-signup')}
                className="px-5 py-2.5 bg-[#FF5A67] hover:bg-[#E83E5A] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Join Now
              </button>
            </div>
          </div>
        )}

        {/* SAFETY PAGE */}
        {page === 'safety' && (
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Trust & Safety Hub</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Safety, Security & Integrity
              </h1>
              <p className="text-base text-slate-600 leading-relaxed">
                Your safety, dignity, and peace of mind are non-negotiable. Learn how we protect our community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Strictly 18+ Only</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We enforce an uncompromising 18+ policy. Registration strictly requires a verified date of birth. Any attempt by an underage individual is automatically blocked and reported.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Photo Pose Verification</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Catfishing and fake accounts are removed using human-moderated selfie pose verification, matching user photos with live gestures.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Zero Tolerance for Scams</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Never send money, crypto, or remittances to anyone you meet online. Isfaham’s proactive filters immediately detect and ban financial solicitations.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Instant Block & Report</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You hold complete control. Blocking a user is instantaneous and bidirectional—they will never see you, your profile, or reach your inbox again.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-3">
              <h3 className="text-lg font-bold">Important Dating Safety Reminders</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">• Keep your conversations on Isfaham until trust is firmly established.</li>
                <li className="flex items-center gap-2">• Never share banking credentials, national IDs, or send money under any pretext.</li>
                <li className="flex items-center gap-2">• For initial public meetups, always meet in daylight, well-populated public venues.</li>
                <li className="flex items-center gap-2">• Involve trusted family or guardians in matrimonial discussions as appropriate.</li>
              </ul>
            </div>
          </div>
        )}

        {/* COMMUNITY GUIDELINES */}
        {page === 'community-guidelines' && (
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E83E5A]">Code of Conduct</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Community Guidelines
              </h1>
              <p className="text-base text-slate-600 leading-relaxed">
                Isfaham is dedicated to mutual respect, dignity, and cultural honor.
              </p>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-1">1. Respectful Communication</h3>
                <p className="text-xs text-slate-600">
                  Treat all members with courtesy and kindness. Hate speech, insults, religious disrespect, or derogatory language will result in an immediate and irreversible permanent ban.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-1">2. Authenticity & Honesty</h3>
                <p className="text-xs text-slate-600">
                  Use only your own recent photos. Do not fabricate your age, marital status, or relationship intentions.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-1">3. Zero Tolerance for Explicit or Obscene Content</h3>
                <p className="text-xs text-slate-600">
                  Nudity, sexually explicit messages, and vulgar imagery are strictly forbidden.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-1">4. No Commercial Solicitations</h3>
                <p className="text-xs text-slate-600">
                  Do not advertise goods, services, job recruiting, or solicit funds on Isfaham.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PRIVACY POLICY */}
        {page === 'privacy' && (
          <div className="space-y-8 text-slate-800">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Legal & Governance</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Privacy Policy
              </h1>
              <p className="text-xs text-slate-500">Last updated: September 2026</p>
            </div>

            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <h3 className="text-sm font-bold text-slate-900">1. Information We Collect</h3>
              <p>
                We collect information you provide directly to us: profile details (name, gender, age, relationship intention, profession, photos), contact info (email, phone number for verification), and communication logs between matched members.
              </p>

              <h3 className="text-sm font-bold text-slate-900">2. How We Use Information</h3>
              <p>
                To provide matching services, enforce trust and safety rules (such as 18+ age checks and fraud prevention), personalize discovery recommendations, and process optional subscription upgrades.
              </p>

              <h3 className="text-sm font-bold text-slate-900">3. Location Privacy</h3>
              <p>
                We never display exact GPS coordinates. We only display the user's declared city and country, and approximate distance rounded to safe thresholds.
              </p>

              <h3 className="text-sm font-bold text-slate-900">4. Your Data Rights</h3>
              <p>
                You can download an export of your account data or request permanent deletion of your account and all associated records directly in the Settings menu at any time.
              </p>
            </div>
          </div>
        )}

        {/* TERMS OF SERVICE */}
        {page === 'terms' && (
          <div className="space-y-8 text-slate-800">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Legal & Governance</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Terms of Service
              </h1>
              <p className="text-xs text-slate-500">Last updated: September 2026</p>
            </div>

            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <h3 className="text-sm font-bold text-slate-900">1. Eligibility (18+ Requirement)</h3>
              <p>
                You must be at least 18 years of age to create an account on Isfaham. By creating an account, you represent and warrant that you meet this requirement. Any misrepresentation will result in account termination.
              </p>

              <h3 className="text-sm font-bold text-slate-900">2. Account Responsibility</h3>
              <p>
                You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.
              </p>

              <h3 className="text-sm font-bold text-slate-900">3. Termination</h3>
              <p>
                Isfaham reserves the right to suspend or ban any account that violates our safety policies or community guidelines without prior notice.
              </p>
            </div>
          </div>
        )}

        {/* HELP CENTER */}
        {page === 'help' && (
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E83E5A]">Support</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Help Center
              </h1>
              <p className="text-base text-slate-600">
                Quick answers to common questions about accounts, subscriptions, and profile verification.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-sm text-slate-900 mb-1">How do I change my relationship intention?</h4>
                <p className="text-xs text-slate-600">
                  Navigate to your Profile tab, tap "Edit Profile", and select your new goal under Relationship Intention.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-sm text-slate-900 mb-1">How long does photo verification take?</h4>
                <p className="text-xs text-slate-600">
                  Most verification submissions are reviewed and approved within 15 to 30 minutes during operating hours.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-sm text-slate-900 mb-1">How do I cancel my subscription?</h4>
                <p className="text-xs text-slate-600">
                  Go to Settings → Subscription & Billing → Manage Plan. You can cancel with a single click and retain benefits until the billing period ends.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 rounded-2xl bg-[#FF5A67] text-white font-bold text-xs hover:bg-[#E83E5A] transition-colors"
              >
                Contact Support Team
              </button>
            </div>
          </div>
        )}

        {/* CONTACT PAGE */}
        {page === 'contact' && (
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E83E5A]">Get in Touch</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Contact Isfaham Team
              </h1>
              <p className="text-base text-slate-600">
                Have a question, partnership inquiry, or safety report? We are here to help.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
                <Mail className="w-5 h-5 text-[#FF5A67]" />
                <h4 className="font-bold text-sm text-slate-900">Support Email</h4>
                <p className="text-xs text-slate-600">support@isfaham.com</p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                <h4 className="font-bold text-sm text-slate-900">Trust & Safety</h4>
                <p className="text-xs text-slate-600">safety@isfaham.com</p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
                <Compass className="w-5 h-5 text-blue-600" />
                <h4 className="font-bold text-sm text-slate-900">Partnerships</h4>
                <p className="text-xs text-slate-600">partners@isfaham.com</p>
              </div>
            </div>

            {!contactSubmitted ? (
              <form onSubmit={handleContactSubmit} className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Send us a message</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white"
                      placeholder="Ahmed or Asha"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Subject</label>
                  <select
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="General Question">General Question</option>
                    <option value="Account or Verification">Account or Verification Help</option>
                    <option value="Billing & Subscriptions">Billing & Subscriptions</option>
                    <option value="Trust & Safety Escalation">Trust & Safety Escalation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#FF5A67] hover:bg-[#E83E5A] text-white font-bold text-xs transition-colors"
                >
                  Send Inquiry
                </button>
              </form>
            ) : (
              <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">Message Received</h3>
                <p className="text-xs text-slate-600">
                  Thank you, {contactName}. A member of the Isfaham support team will respond to {contactEmail} shortly.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

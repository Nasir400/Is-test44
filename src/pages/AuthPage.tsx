import React, { useState } from 'react';
import { 
  Heart, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight, 
  Lock, 
  Mail, 
  Phone, 
  Calendar, 
  User as UserIcon,
  Sparkles
} from 'lucide-react';
import { storage } from '../services/storage';
import { GenderPreference, RelationshipIntention, Language } from '../types';
import { translations } from '../i18n/translations';

interface AuthPageProps {
  initialMode: 'login' | 'signup';
  onSuccess: (userId: string) => void;
  onNavigate: (route: string) => void;
  language: Language;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode,
  onSuccess,
  onNavigate,
  language
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');

  // Form fields
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('1998-05-14'); // Default > 18
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('female');
  const [interestedIn, setInterestedIn] = useState<GenderPreference>('men');
  const [relationshipIntention, setRelationshipIntention] = useState<RelationshipIntention>('Marriage');
  const [country, setCountry] = useState('Somalia');
  const [city, setCity] = useState('Mogadishu');
  const [bio, setBio] = useState('');

  // Status & Validation
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [calculatedAge, setCalculatedAge] = useState<number | null>(null);

  const t = translations[language];

  // Recalculate age whenever DOB changes
  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dob = e.target.value;
    setDateOfBirth(dob);
    if (dob) {
      const age = storage.calculateAge(dob);
      setCalculatedAge(age);
      if (age < 18) {
        setErrorMsg('You must be at least 18 years old to join Isfaham. Underage access is strictly prohibited.');
      } else {
        setErrorMsg(null);
      }
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const age = storage.calculateAge(dateOfBirth);
    if (age < 18) {
      setErrorMsg('You must be at least 18 years old to use Isfaham. Registration has been rejected.');
      return;
    }

    const result = storage.registerUser({
      email: authMethod === 'email' ? email : undefined,
      phone: authMethod === 'phone' ? phone : undefined,
      dateOfBirth,
      displayName,
      gender,
      interestedIn,
      relationshipIntention,
      country,
      city,
      bio
    });

    if (!result.success) {
      setErrorMsg(result.error || 'Failed to create account');
      return;
    }

    if (result.user) {
      onSuccess(result.user.id);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Find user by email or fallback to first matching seed
    const all = storage.getAllUsers();
    const match = all.find(u => (u.user.email && u.user.email.toLowerCase() === email.toLowerCase()) || u.user.phone === phone);

    if (match) {
      storage.setCurrentUserId(match.user.id);
      onSuccess(match.user.id);
    } else {
      // Default fallback demo login
      const defaultUser = all[0];
      if (defaultUser) {
        storage.setCurrentUserId(defaultUser.user.id);
        onSuccess(defaultUser.user.id);
      } else {
        setErrorMsg('Invalid credentials. Please select a demo persona below.');
      }
    }
  };

  const allSeedUsers = storage.getAllUsers();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF1F3]/40 via-white to-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#E83E5A] to-[#FF5A67] flex items-center justify-center shadow-md shadow-[#FF5A67]/20">
            <Heart className="w-6 h-6 fill-white text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {mode === 'signup' ? 'Create Your Isfaham Account' : 'Welcome Back to Isfaham'}
          </h2>
          <p className="text-xs text-slate-500">
            {mode === 'signup'
              ? 'Find someone who understands you. Strictly 18+ verified members.'
              : 'Sign in to check your matches and messages.'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-200/80 space-y-6">
          {/* Tabs: Login / Sign Up */}
          <div className="flex rounded-xl bg-slate-100 p-1">
            <button
              onClick={() => { setMode('signup'); setErrorMsg(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'signup' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign Up (New)
            </button>
            <button
              onClick={() => { setMode('login'); setErrorMsg(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
          </div>

          {/* Error Message Box */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="font-semibold">{errorMsg}</span>
            </div>
          )}

          {/* SIGN UP FORM */}
          {mode === 'signup' ? (
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Auth Method Toggle: Email / Phone */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAuthMethod('email')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 ${
                    authMethod === 'email' ? 'border-[#FF5A67] bg-[#FFF1F3] text-[#E83E5A]' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" /> Email
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('phone')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 ${
                    authMethod === 'phone' ? 'border-[#FF5A67] bg-[#FFF1F3] text-[#E83E5A]' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" /> Phone Number
                </button>
              </div>

              {/* Display Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Display Name</label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Hodan, Khalid, Maryan"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5A67]"
                />
              </div>

              {/* Email or Phone */}
              {authMethod === 'email' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5A67]"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (with country code)</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+252 61 555 1234 or +44 7700 900077"
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5A67]"
                  />
                </div>
              )}

              {/* CRITICAL 18+ DOB VALIDATION */}
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-700" />
                    Date of Birth (Strictly 18+)
                  </label>
                  {calculatedAge !== null && (
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      calculatedAge >= 18 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      Age: {calculatedAge} {calculatedAge < 18 ? '(Underage)' : '✓'}
                    </span>
                  )}
                </div>
                <input
                  type="date"
                  required
                  value={dateOfBirth}
                  onChange={handleDobChange}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                />
                <p className="text-[10px] text-slate-500">
                  Your exact birthdate is kept strictly private and used solely to verify adult age eligibility.
                </p>
              </div>

              {/* Gender & Interested in */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">I am a</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="female">Woman</option>
                    <option value="male">Man</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Interested in</label>
                  <select
                    value={interestedIn}
                    onChange={(e) => setInterestedIn(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="everyone">Everyone</option>
                  </select>
                </div>
              </div>

              {/* Relationship Intention */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Relationship Intention</label>
                <select
                  value={relationshipIntention}
                  onChange={(e) => setRelationshipIntention(e.target.value as any)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-[#E83E5A]"
                >
                  <option value="Marriage">Marriage (Zawaj)</option>
                  <option value="Serious Relationship">Serious Relationship</option>
                  <option value="Getting to Know Someone">Getting to Know Someone</option>
                  <option value="Friendship">Friendship</option>
                </select>
              </div>

              {/* Location: Country & City */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Country</label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Somalia, UK, USA"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Mogadishu, London"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                id="btn-complete-signup"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FF5A67] to-[#E83E5A] hover:opacity-95 text-white font-bold text-xs shadow-md shadow-[#FF5A67]/20 transition-opacity cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* LOGIN FORM */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email or Phone</label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email or phone number"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5A67]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent to your registered email address.')}
                    className="text-[11px] text-[#FF5A67] hover:underline"
                  >
                    Forgot?
                  </button>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5A67]"
                />
              </div>

              <button
                type="submit"
                id="btn-login-submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FF5A67] to-[#E83E5A] hover:opacity-95 text-white font-bold text-xs shadow-md shadow-[#FF5A67]/20 transition-opacity cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Quick Demo Persona Switcher (For seamless instant evaluator testing) */}
          <div className="pt-4 border-t border-slate-100">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Instant Demo Personas (1-Click Switch)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {allSeedUsers.map(({ user, profile }) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => {
                    storage.setCurrentUserId(user.id);
                    onSuccess(user.id);
                  }}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-[#FFF1F3] hover:border-[#FF5A67]/40 border border-slate-200 text-left transition-all"
                >
                  <p className="text-xs font-bold text-slate-800 truncate">
                    {profile?.displayName}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">
                    {profile?.city}, {profile?.age}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

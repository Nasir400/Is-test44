import React, { useState } from 'react';
import { Crown, Check, Zap, Sparkles, Shield, Heart, ArrowRight } from 'lucide-react';
import { storage } from '../services/storage';
import { SubscriptionTier, SubscriptionPlan } from '../types';

interface PremiumPageProps {
  currentUserId: string;
  onNavigate: (route: string) => void;
}

export const PremiumPage: React.FC<PremiumPageProps> = ({ currentUserId }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [upgradedTier, setUpgradedTier] = useState<SubscriptionTier | null>(null);
  const [boostActive, setBoostActive] = useState(false);

  const currentUserData = storage.getCurrentUser();
  const user = currentUserData?.user;
  const currentTier = user?.subscriptionTier || 'free';
  const plans = storage.getPlans();

  const handleUpgrade = (tier: SubscriptionTier) => {
    storage.updateSubscription(currentUserId, tier);
    setUpgradedTier(tier);
    setTimeout(() => {
      setUpgradedTier(null);
    }, 2500);
  };

  const handleBoost = () => {
    const success = storage.activateBoost(currentUserId);
    if (success) {
      setBoostActive(true);
      setTimeout(() => setBoostActive(false), 3000);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Crown className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Elevate Your Experience
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            All essential matching, trust, and basic messaging features are forever free. Upgrade for accelerated visibility and deep compatibility tools.
          </p>

          {/* Monthly / Annual Billing Toggle */}
          <div className="pt-2 inline-flex items-center gap-2 bg-slate-200/80 p-1 rounded-2xl">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* Upgraded Notification Banner */}
        {upgradedTier && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-center gap-2 max-w-md mx-auto animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span className="font-bold">Successfully upgraded to {upgradedTier.toUpperCase()}! Your entitlements are active.</span>
          </div>
        )}

        {/* Profile Boost Card Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 fill-slate-950" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Profile Boost (1 Hour)</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Feature your profile at the front of Discovery for 1 hour to get up to 10x more likes.
              </p>
            </div>
          </div>

          <button
            onClick={handleBoost}
            className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-colors whitespace-nowrap cursor-pointer"
          >
            {boostActive ? 'Boost Activated! ⚡' : 'Activate 1-Hr Boost'}
          </button>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const isCurrent = currentTier === plan.id;
            const price = billingCycle === 'annual'
              ? (plan.annualPriceUsd ? Math.round((plan.annualPriceUsd / 12) * 100) / 100 : 0)
              : plan.monthlyPriceUsd;

            return (
              <div
                key={plan.id}
                className={`bg-white rounded-3xl p-6 border flex flex-col justify-between space-y-6 transition-all relative ${
                  plan.isPopular
                    ? 'border-2 border-[#FF5A67] shadow-xl ring-1 ring-[#FF5A67]/20'
                    : 'border-slate-200 shadow-sm'
                }`}
              >
                {plan.isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-[#FF5A67] to-[#E83E5A] text-white shadow-xs">
                    Most Popular
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        Current Plan
                      </span>
                    )}
                  </div>

                  <div className="mt-3">
                    <span className="text-3xl font-extrabold text-slate-900">
                      ${price}
                    </span>
                    <span className="text-xs text-slate-500 ml-1">
                      / month {billingCycle === 'annual' && plan.annualPriceUsd > 0 && '(billed annually)'}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="mt-6 space-y-2.5 text-xs text-slate-600">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <button
                    disabled={isCurrent}
                    onClick={() => handleUpgrade(plan.id)}
                    className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${
                      isCurrent
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : plan.id === 'vip'
                        ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-md'
                        : 'bg-gradient-to-r from-[#FF5A67] to-[#E83E5A] hover:opacity-95 text-white shadow-md'
                    }`}
                  >
                    {isCurrent ? 'Active Plan' : `Upgrade to ${plan.name}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { asLocale } from '../content/locale';
import { localizePath } from '../content/paths';

export default function CookieConsent() {
  const activeLocale = asLocale(useLocale());
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, cannot be disabled
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show popup after a short delay
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const essentialOnly = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    localStorage.setItem('cookieConsent', JSON.stringify(essentialOnly));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setIsVisible(false);
  };

  const handleToggle = (key: keyof typeof preferences) => {
    if (key === 'essential') return; // Cannot disable essential cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="pointer-events-none fixed inset-0 z-[35] bg-[#37474F]/30 backdrop-blur-sm animate-in fade-in duration-300"
        aria-hidden="true"
      />

      {/* Cookie Consent Modal */}
      <div className="fixed bottom-0 left-0 right-0 z-[90] animate-in slide-in-from-bottom duration-500 lg:bottom-8 lg:left-8 lg:right-auto lg:max-w-md lg:slide-in-from-left">
        <div className="bg-white shadow-2xl rounded-t-lg lg:rounded-lg border-t-4 border-[#2E7D32] overflow-hidden">
          {/* Header */}
          <div className="bg-[#2E7D32] p-4">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h2 className="text-lg font-semibold text-white">Your privacy choices</h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {!showDetails ? (
              <>
                <p className="text-[#37474F] leading-relaxed mb-4">
                  We use essential cookies to keep the site working. With your permission, we may also use optional cookies to remember preferences and understand how the site is used.
                </p>
                <p className="text-sm text-[#37474F]/70 mb-4">
                  You can change your preferences or learn more in our{' '}
                  <Link href={localizePath(activeLocale, '/privacy')} className="text-[#2E7D32] underline hover:text-[#1B5E20]">
                    Privacy Policy
                  </Link>
                  .
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleAcceptAll}
                    className="w-full px-6 py-3 bg-[#2E7D32] text-white font-medium rounded-sm hover:bg-[#1B5E20] transition-colors shadow-md"
                  >
                    Accept all
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={handleRejectAll}
                      className="flex-1 px-6 py-3 bg-white text-[#37474F] font-medium rounded-sm border border-[#37474F]/20 hover:bg-[#F5F5DC] transition-colors"
                    >
                      Reject all
                    </button>
                    <button
                      onClick={() => setShowDetails(true)}
                      className="flex-1 px-6 py-3 bg-[#F5F5DC] text-[#2E7D32] font-medium rounded-sm hover:bg-[#A5D6A7] transition-colors"
                    >
                      Customize
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-[#37474F] mb-4">
                  Choose which types of cookies you want to accept. Essential cookies cannot be disabled because the site needs them to work.
                </p>

                {/* Cookie Categories */}
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {/* Essential */}
                  <div className="border border-[#37474F]/10 rounded-sm p-4 bg-[#F5F5DC]/30">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-[#37474F] mb-1">Essential Cookies</h3>
                        <p className="text-sm text-[#37474F]/70">
                          Required for the website to work. Cannot be disabled.
                        </p>
                      </div>
                      <div className="ml-4">
                        <div className="w-12 h-6 bg-[#2E7D32] rounded-full flex items-center justify-end px-1 opacity-50">
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Functional */}
                  <div className="border border-[#37474F]/10 rounded-sm p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-[#37474F] mb-1">Functional Cookies</h3>
                        <p className="text-sm text-[#37474F]/70">
                          Remember choices such as language or consent settings, where those features are enabled.
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle('functional')}
                        className="ml-4"
                        aria-label="Toggle functional cookies"
                      >
                        <div className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                          preferences.functional ? 'bg-[#2E7D32] justify-end' : 'bg-[#37474F]/20 justify-start'
                        } px-1`}>
                          <div className="w-4 h-4 bg-white rounded-full transition-transform"></div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="border border-[#37474F]/10 rounded-sm p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-[#37474F] mb-1">Analytics Cookies</h3>
                        <p className="text-sm text-[#37474F]/70">
                          Help us understand how people use the website, if analytics tools are enabled.
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle('analytics')}
                        className="ml-4"
                        aria-label="Toggle analytics cookies"
                      >
                        <div className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                          preferences.analytics ? 'bg-[#2E7D32] justify-end' : 'bg-[#37474F]/20 justify-start'
                        } px-1`}>
                          <div className="w-4 h-4 bg-white rounded-full transition-transform"></div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Marketing */}
                  <div className="border border-[#37474F]/10 rounded-sm p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-[#37474F] mb-1">Marketing Cookies</h3>
                        <p className="text-sm text-[#37474F]/70">
                          Used only if LBYA enables marketing tools that need your consent.
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle('marketing')}
                        className="ml-4"
                        aria-label="Toggle marketing cookies"
                      >
                        <div className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                          preferences.marketing ? 'bg-[#2E7D32] justify-end' : 'bg-[#37474F]/20 justify-start'
                        } px-1`}>
                          <div className="w-4 h-4 bg-white rounded-full transition-transform"></div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleSavePreferences}
                    className="w-full px-6 py-3 bg-[#2E7D32] text-white font-medium rounded-sm hover:bg-[#1B5E20] transition-colors shadow-md"
                  >
                    Save preferences
                  </button>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="w-full px-6 py-3 bg-white text-[#37474F] font-medium rounded-sm border border-[#37474F]/20 hover:bg-[#F5F5DC] transition-colors"
                  >
                    Back
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="bg-[#F5F5DC] px-6 py-3 text-xs text-[#37474F]/60 border-t border-[#37474F]/10">
            <p>
              Learn more about how we handle your data in our{' '}
              <Link href={localizePath(activeLocale, '/privacy')} className="text-[#2E7D32] underline hover:text-[#1B5E20]">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

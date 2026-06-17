'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

export default function ConsentPage() {
    const [preferences, setPreferences] = useState({
        essential: true,
        functional: false,
        analytics: false,
        marketing: false,
    });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (consent) {
            setPreferences(JSON.parse(consent));
        }
    }, []);

    const handleToggle = (key: keyof typeof preferences) => {
        if (key === 'essential') return;
        setPreferences(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
        setSaved(false);
    };

    const handleSave = () => {
        localStorage.setItem('cookieConsent', JSON.stringify(preferences));
        setSaved(true);
        // Optionally trigger a custom event or reload if needed for immediate effect
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-light text-[#2E7D32] mb-8">
                    Manage Consent
                </h1>
                <p className="text-lg text-[#37474F]/80 mb-12 leading-relaxed">
                    We use cookies to enhance your experience, analyze site traffic, and personalize content.
                    You can customize your preferences below. Essential cookies are always enabled to ensure the website functions correctly.
                </p>

                <div className="space-y-6 mb-12">
                    {/* Essential */}
                    <div className="border border-[#37474F]/10 rounded-sm p-6 bg-[#F5F5DC]/30">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-xl font-medium text-[#2E7D32] mb-2">Essential Cookies</h3>
                                <p className="text-[#37474F]/70">Required for the website to function properly. These cannot be disabled.</p>
                            </div>
                            <div className="ml-4 opacity-50 cursor-not-allowed">
                                <div className="w-14 h-8 bg-[#2E7D32] rounded-full flex items-center justify-end px-1">
                                    <div className="w-6 h-6 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Functional */}
                    <div className="border border-[#37474F]/10 rounded-sm p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-xl font-medium text-[#2E7D32] mb-2">Functional Cookies</h3>
                                <p className="text-[#37474F]/70">Remember your preferences and settings (like language or login status) for a better experience.</p>
                            </div>
                            <button onClick={() => handleToggle('functional')} className="ml-4 focus:outline-none">
                                <div className={`w-14 h-8 rounded-full flex items-center transition-colors px-1 ${preferences.functional ? 'bg-[#2E7D32] justify-end' : 'bg-gray-300 justify-start'}`}>
                                    <div className="w-6 h-6 bg-white rounded-full shadow-md"></div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Analytics */}
                    <div className="border border-[#37474F]/10 rounded-sm p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-xl font-medium text-[#2E7D32] mb-2">Analytics Cookies</h3>
                                <p className="text-[#37474F]/70">Help us understand how visitors interact with the website by collecting and reporting information anonymously.</p>
                            </div>
                            <button onClick={() => handleToggle('analytics')} className="ml-4 focus:outline-none">
                                <div className={`w-14 h-8 rounded-full flex items-center transition-colors px-1 ${preferences.analytics ? 'bg-[#2E7D32] justify-end' : 'bg-gray-300 justify-start'}`}>
                                    <div className="w-6 h-6 bg-white rounded-full shadow-md"></div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Marketing */}
                    <div className="border border-[#37474F]/10 rounded-sm p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-xl font-medium text-[#2E7D32] mb-2">Marketing Cookies</h3>
                                <p className="text-[#37474F]/70">Used to track visitors across websites to display relevant and engaging advertisements.</p>
                            </div>
                            <button onClick={() => handleToggle('marketing')} className="ml-4 focus:outline-none">
                                <div className={`w-14 h-8 rounded-full flex items-center transition-colors px-1 ${preferences.marketing ? 'bg-[#2E7D32] justify-end' : 'bg-gray-300 justify-start'}`}>
                                    <div className="w-6 h-6 bg-white rounded-full shadow-md"></div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleSave}
                        className="px-8 py-4 bg-[#2E7D32] text-white font-medium rounded-sm hover:bg-[#1B5E20] transition-colors shadow-lg"
                    >
                        {saved ? 'Preferences Saved!' : 'Save Preferences'}
                    </button>
                    <Link href="/" className="px-8 py-4 text-[#2E7D32] font-medium hover:bg-[#F5F5DC] rounded-sm transition-colors">
                        Return Home
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}

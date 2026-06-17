'use client';

import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useTranslation } from '@/app/i18n/I18nContext';

export default function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />

      {/* Hero Section - Insights Style */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-[#2E7D32] py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Data Privacy Policy
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto font-light">
            Your privacy matters to us. Learn how we collect, use, and protect your personal data.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">

          {/* Introduction */}
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-[#2E7D32] mb-4">1. Introduction</h2>
            <p className="text-[#37474F] leading-relaxed mb-4">
              LBYA AB, organization number [ORG-NUMBER] ("LBYA", "we", "us" or "our") processes your personal data when you interact with us in various contexts.
            </p>
            <p className="text-[#37474F] leading-relaxed mb-4">
              We respect your privacy and protect the personal data we process about you. All processing of personal data is carried out in accordance with the requirements of the General Data Protection Regulation ("GDPR") and other applicable legislation on the protection of personal data.
            </p>
            <p className="text-[#37474F] leading-relaxed">
              We may, at any time and at our discretion, update this privacy policy. If significant changes are made, we will notify you on this website before the change takes effect.
            </p>
          </div>

          {/* Website Visitors */}
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-[#2E7D32] mb-4">2. Website Visitors</h2>
            <h3 className="text-xl font-medium text-[#37474F] mb-3">What personal data do we collect?</h3>
            <p className="text-[#37474F] leading-relaxed mb-4">
              When you visit our website, we may collect information about your visit, including IP address, browser type, device information, pages visited, time spent on pages, and referring website.
            </p>
            <h3 className="text-xl font-medium text-[#37474F] mb-3">Why do we process your data?</h3>
            <p className="text-[#37474F] leading-relaxed mb-4">
              We process this data to improve our website functionality, analyze usage patterns, enhance user experience, and ensure website security.
            </p>
            <h3 className="text-xl font-medium text-[#37474F] mb-3">Legal basis</h3>
            <p className="text-[#37474F] leading-relaxed">
              The processing is based on our legitimate interest in operating and improving our website and services.
            </p>
          </div>

          {/* Cookies */}
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-[#2E7D32] mb-4">3. Cookies and Similar Technologies</h2>
            <p className="text-[#37474F] leading-relaxed mb-4">
              We use cookies and similar technologies to enhance your browsing experience. Cookies are small text files stored on your device that help us remember your preferences and understand how you use our website.
            </p>
            <h3 className="text-xl font-medium text-[#37474F] mb-3">Types of cookies we use:</h3>
            <ul className="list-disc list-inside text-[#37474F] leading-relaxed mb-4 space-y-2">
              <li><strong>Essential cookies:</strong> Required for the website to function properly</li>
              <li><strong>Functional cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors use our website</li>
              <li><strong>Marketing cookies:</strong> Used to deliver relevant advertisements</li>
            </ul>
            <p className="text-[#37474F] leading-relaxed">
              You can manage your cookie preferences at any time through our cookie consent tool.
            </p>
          </div>

          {/* Contact Forms */}
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-[#2E7D32] mb-4">4. Contact and Inquiries</h2>
            <p className="text-[#37474F] leading-relaxed mb-4">
              When you contact us through our website, email, or other channels, we collect the personal data you provide, such as your name, email address, phone number, and the content of your message.
            </p>
            <p className="text-[#37474F] leading-relaxed mb-4">
              We process this data to respond to your inquiry, provide requested information, and maintain records of our communication. The legal basis is our legitimate interest in responding to inquiries and, where applicable, the performance of a contract.
            </p>
          </div>

          {/* Data Sharing */}
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-[#2E7D32] mb-4">5. Sharing of Personal Data</h2>
            <p className="text-[#37474F] leading-relaxed mb-4">
              We may share your personal data with:
            </p>
            <ul className="list-disc list-inside text-[#37474F] leading-relaxed mb-4 space-y-2">
              <li>Service providers who assist us in operating our website and business</li>
              <li>Professional advisors such as lawyers and accountants</li>
              <li>Authorities when required by law</li>
            </ul>
            <p className="text-[#37474F] leading-relaxed">
              We ensure that all third parties we work with are committed to protecting your personal data and comply with applicable data protection regulations.
            </p>
          </div>

          {/* International Transfers */}
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-[#2E7D32] mb-4">6. International Data Transfers</h2>
            <p className="text-[#37474F] leading-relaxed mb-4">
              We may transfer or transmit personal data to recipients outside the EU/EEA. When we do so, we ensure that appropriate safeguards are in place, such as the European Commission's standard contractual clauses, to protect your personal data.
            </p>
          </div>

          {/* Data Retention */}
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-[#2E7D32] mb-4">7. Data Retention</h2>
            <p className="text-[#37474F] leading-relaxed mb-4">
              We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, or as required by law. When personal data is no longer needed, we securely delete or anonymize it.
            </p>
          </div>

          {/* Your Rights */}
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-[#2E7D32] mb-4">8. Your Rights</h2>
            <p className="text-[#37474F] leading-relaxed mb-4">
              Under applicable data protection legislation, you have the following rights:
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-[#37474F] mb-2">Right of Access</h3>
                <p className="text-[#37474F] leading-relaxed">
                  You can request confirmation of whether your personal data is being processed and access to your personal data.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#37474F] mb-2">Right to Rectification</h3>
                <p className="text-[#37474F] leading-relaxed">
                  You have the right to have inaccurate personal data corrected and incomplete personal data completed.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#37474F] mb-2">Right to Erasure</h3>
                <p className="text-[#37474F] leading-relaxed">
                  Under certain circumstances, you can request that your personal data be deleted.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#37474F] mb-2">Right to Restriction</h3>
                <p className="text-[#37474F] leading-relaxed">
                  You can request that we restrict the processing of your personal data under certain circumstances.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#37474F] mb-2">Right to Data Portability</h3>
                <p className="text-[#37474F] leading-relaxed">
                  You have the right to receive a machine-readable copy of your personal data in certain situations.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#37474F] mb-2">Right to Object</h3>
                <p className="text-[#37474F] leading-relaxed">
                  You can object to the processing of your personal data based on legitimate interests.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#37474F] mb-2">Right to Withdraw Consent</h3>
                <p className="text-[#37474F] leading-relaxed">
                  If processing is based on your consent, you have the right to withdraw it at any time.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#37474F] mb-2">Right to Lodge a Complaint</h3>
                <p className="text-[#37474F] leading-relaxed">
                  You have the right to file a complaint with a supervisory authority regarding our processing of your personal data.
                </p>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-[#2E7D32] mb-4">9. Data Security</h2>
            <p className="text-[#37474F] leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, access controls, and regular security assessments.
            </p>
          </div>

          {/* Contact Information */}
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-[#2E7D32] mb-4">10. Contact Information</h2>
            <p className="text-[#37474F] leading-relaxed mb-4">
              If you have questions or comments about this privacy policy or our processing of your personal data, please contact us:
            </p>
            <div className="bg-[#F5F5DC] p-6 rounded-sm">
              <p className="text-[#37474F] mb-2"><strong>LBYA AB</strong></p>
              <p className="text-[#37474F] mb-2">Email: info@lbya.se</p>
              <p className="text-[#37474F] mb-2">Address: [Company Address]</p>
              <p className="text-[#37474F]">Data Protection Officer: info@lbya.se</p>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-sm text-[#37474F]/60 pt-8 border-t border-[#37474F]/10">
            <p>Last updated: November 2025</p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

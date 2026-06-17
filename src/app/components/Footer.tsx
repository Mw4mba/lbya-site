'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { useTranslation } from '../i18n/I18nContext';
import { getProducts, LIVE_MCT_URL } from '../content/products';
import { getSite } from '../content/site';

export default function Footer() {
  const { t } = useTranslation();
  const locale = useLocale();
  const PRODUCTS = getProducts(locale);
  const SERVICES = getSite(locale).services;
  return (
    <footer className="relative w-full bg-[#37474F] text-white py-16 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12 text-center md:text-left">

          {/* Brand + contact */}
          <div className="flex flex-col items-center md:items-start">
            <div className="relative w-28 h-28 mb-4">
              {/* Raw img is intentional: a local SVG recoloured via CSS filter, not an optimisable raster. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logoA.svg"
                alt="LBYA AB"
                className="w-full h-full object-contain"
                style={{ filter: 'invert(1) brightness(2)' }}
              />
            </div>
            <p className="text-white text-3xl font-['Ruslan_Display'] mb-4">LBYA</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@lbya.se" className="text-[#A5D6A7] hover:text-white transition-colors">
                  info@lbya.se
                </a>
              </li>
              <li>
                <a href="tel:+46765960161" className="text-[#A5D6A7] hover:text-white transition-colors">
                  +46 76 596 01 61
                </a>
              </li>
              <li className="text-[#A5D6A7]">Gamla Enköpingsvägen 150<br />174 64 Sundbyberg, Sweden</li>
            </ul>
          </div>

          {/* Products */}
          <div className="border-t border-white/10 md:border-none pt-8 md:pt-0">
            <h4 className="font-bold text-lg mb-6">Products</h4>
            <ul className="space-y-3">
              {PRODUCTS.map((product) => (
                <li key={product.slug}>
                  <a href={product.href} className="text-[#A5D6A7] hover:text-white transition-colors">
                    {product.name} ({product.acronym})
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={LIVE_MCT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A5D6A7] hover:text-white transition-colors"
                >
                  MCT live platform
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="border-t border-white/10 md:border-none pt-8 md:pt-0">
            <h4 className="font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {SERVICES.categories.map((category) => (
                <li key={category.title}>
                  <a href="/services" className="text-[#A5D6A7] hover:text-white transition-colors">
                    {category.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="border-t border-white/10 md:border-none pt-8 md:pt-0">
            <h4 className="font-bold text-lg mb-6">{t.footer.company.title}</h4>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-[#A5D6A7] hover:text-white transition-colors">
                  {t.footer.company.about}
                </a>
              </li>
              <li>
                <a href="/insights" className="text-[#A5D6A7] hover:text-white transition-colors">
                  {t.footer.resources.insights}
                </a>
              </li>
              <li>
                <a href="/careers" className="text-[#A5D6A7] hover:text-white transition-colors">
                  {t.footer.company.careers}
                </a>
              </li>
              <li>
                <a href="/contact" className="text-[#A5D6A7] hover:text-white transition-colors">
                  {t.footer.company.contact}
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-[#A5D6A7] hover:text-white transition-colors">
                  {t.footer.legal.privacy}
                </a>
              </li>
            </ul>
          </div>

          {/* Calls to action */}
          <div className="border-t border-white/10 md:border-none pt-8 md:pt-0">
            <h4 className="font-bold text-lg mb-6">Get started</h4>
            <ul className="space-y-3">
              <li>
                <a href="/products/malaika-control-tower" className="text-[#A5D6A7] hover:text-white transition-colors">
                  Request MCT access
                </a>
              </li>
              <li>
                <a href="/products/nayeli-bim-control" className="text-[#A5D6A7] hover:text-white transition-colors">
                  Join NBC early access
                </a>
              </li>
              <li>
                <a href="/contact" className="text-[#A5D6A7] hover:text-white transition-colors">
                  Partner with LBYA
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#A5D6A7] text-sm">
              2025 <span style={{ fontFamily: "'Tektur', sans-serif", fontSize: '1.3em', lineHeight: '1' }}>LBYA</span> AB. {t.footer.copyright.replace('2025 LBYA AB. ', '')}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="/privacy" className="text-[#A5D6A7] hover:text-white transition-colors">
                Data Privacy
              </a>
              <a href="/privacy#cookies" className="text-[#A5D6A7] hover:text-white transition-colors">
                Cookie Policy
              </a>
              <a href="/consent" className="text-[#A5D6A7] hover:text-white transition-colors">
                Manage consent
              </a>
              <a href="https://www.linkedin.com/company/lbya/about/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-[#A5D6A7] hover:text-white transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

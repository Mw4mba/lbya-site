'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import TransitionLink from './TransitionLink';
import { Link as LocaleLink, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import gsap from 'gsap';
import { useTheme } from '../context/ThemeContext';
import Wordmark from './Wordmark';
import { asLocale, type Locale } from '../content/locale';
import HeaderAccountActions from './subscription/HeaderAccountActions';

type SidebarNavCopy = {
  solutions: string;
  products: string;
  resources: string;
  academicPilot: string;
  career: string;
  about: string;
  contact: string;
};

const sidebarNavCopyByLocale: Record<Locale, SidebarNavCopy> = {
  en: {
    solutions: 'Solutions',
    products: 'Products',
    resources: 'Resources',
    academicPilot: 'Academic Pilot',
    career: 'Career',
    about: 'About',
    contact: 'Contact',
  },
  sv: {
    solutions: 'L\u00f6sningar',
    products: 'Produkter',
    resources: 'Resurser',
    academicPilot: 'Academic Pilot',
    career: 'Karri\u00e4r',
    about: 'Om oss',
    contact: 'Kontakt',
  },
  fr: {
    solutions: 'Solutions',
    products: 'Produits',
    resources: 'Ressources',
    academicPilot: 'Academic Pilot',
    career: 'Carri\u00e8re',
    about: '\u00c0 propos',
    contact: 'Contact',
  },
  de: {
    solutions: 'L\u00f6sungen',
    products: 'Produkte',
    resources: 'Ressourcen',
    academicPilot: 'Academic Pilot',
    career: 'Karriere',
    about: '\u00dcber uns',
    contact: 'Kontakt',
  },
};

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const activeLocale = asLocale(useLocale());
  const navCopy = sidebarNavCopyByLocale[activeLocale];
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [displayText, setDisplayText] = useState('LBYA');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const desktopMenuRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const revertTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Route to display name mapping
  const getPageName = useCallback(() => {
    const routeMap: Record<string, string> = {
      '/': 'Home',
      '/products': 'Products',
      '/solutions': 'Solutions',
      '/resources': 'Resources',
      '/about': 'About',
      '/insights': 'Insights',
      '/careers': 'Career',
      '/contact': 'Contact',
      '/privacy': 'Privacy',
      '/legal': 'Policies',
      '/consent': 'Consent',
    };
    // Check for dynamic routes
    if (pathname.startsWith('/products/')) return 'Products';
    if (pathname.startsWith('/solutions/')) return 'Solutions';
    if (pathname.startsWith('/resources/')) return 'Resources';
    if (pathname.startsWith('/insights/')) return 'Insights';
    return routeMap[pathname] || 'LBYA';
  }, [pathname]);

  // Animate to show page name temporarily (only on mobile/tablet)
  const showPageName = useCallback(() => {
    // Skip on large screens (lg: 1024px and above)
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) return;
    if (isAnimating) return;

    const pageName = getPageName();
    if (pageName === 'LBYA' || displayText === pageName) return;

    setIsAnimating(true);

    // Clear any existing timeout
    if (revertTimeoutRef.current) {
      clearTimeout(revertTimeoutRef.current);
    }

    // Animate out
    if (labelRef.current) {
      gsap.to(labelRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          setDisplayText(pageName);
          // Animate in
          gsap.fromTo(labelRef.current,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              ease: 'power2.out',
              onComplete: () => {
                setIsAnimating(false);
                // Set timeout to revert to LBYA
                revertTimeoutRef.current = setTimeout(() => {
                  if (labelRef.current) {
                    gsap.to(labelRef.current, {
                      opacity: 0,
                      y: -15,
                      duration: 0.25,
                      ease: 'power2.in',
                      onComplete: () => {
                        setDisplayText('LBYA');
                        gsap.fromTo(labelRef.current,
                          { opacity: 0, y: 15 },
                          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
                        );
                      }
                    });
                  }
                }, 3000);
              }
            }
          );
        }
      });
    }
  }, [isAnimating, displayText, getPageName]);

  // Trigger on initial load (only after mount)
  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      showPageName();
    }, 500);
    return () => clearTimeout(timer);
  }, [pathname]); // Re-trigger when route changes

  // Trigger on page click/tap (only after mount)
  useEffect(() => {
    if (!isMounted) return;

    const handleClick = () => {
      showPageName();
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [showPageName, isMounted]);

  // Trigger when scrolling stops (only after mount)
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      // Set new timeout - triggers when scrolling stops for 600ms
      scrollTimeoutRef.current = setTimeout(() => {
        showPageName();
      }, 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [showPageName, isMounted]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (revertTimeoutRef.current) clearTimeout(revertTimeoutRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const localeOptions = [
    { code: 'en', label: 'EN', name: 'English (Global)' },
    { code: 'sv', label: 'SV', name: 'Svenska' },
    { code: 'fr', label: 'FR', name: 'Français' },
  ];
  // Locale-prefixed so primary navigation preserves the active locale.
  const menuItems = [
    { label: navCopy.solutions, href: `/${activeLocale}#solutions` },
    { label: navCopy.products, href: `/${activeLocale}/products` },
    { label: navCopy.resources, href: `/${activeLocale}/resources` },
    { label: navCopy.academicPilot, href: `/${activeLocale}/academic-pilot` },
    { label: navCopy.career, href: `/${activeLocale}/careers` },
    { label: navCopy.about, href: `/${activeLocale}/about` },
    { label: navCopy.contact, href: `/${activeLocale}/contact` },
  ];

  useEffect(() => {
    const tl = gsap.timeline();

    if (isMenuOpen) {
      if (menuRef.current) {
        // Mobile Menu Animation (Top to Bottom)
        gsap.to(menuRef.current, {
          y: '0%',
          duration: 0.5,
          ease: 'power3.out',
          pointerEvents: 'auto'
        });

        // Animate items
        if (menuRef.current) {
          const items = menuRef.current.querySelectorAll('a');
          gsap.fromTo(items,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 0.3, ease: 'power2.out' }
          );
        }
      }

      if (menuItemsRef.current) {
        const items = menuItemsRef.current.querySelectorAll('a');
        gsap.fromTo(items,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, delay: 0.2, ease: 'power2.out' }
        );
      }

      if (desktopMenuRef.current) {
        tl.to(desktopMenuRef.current, {
          x: 0,
          duration: 0.5,
          ease: 'power3.out',
          pointerEvents: 'auto',
        });
      }
    } else {
      if (menuRef.current) {
        // Mobile Menu Close Animation (Bottom to Top)
        gsap.to(menuRef.current, {
          y: '-100%',
          duration: 0.5,
          ease: 'power3.inOut',
          pointerEvents: 'none'
        });
      }

      if (desktopMenuRef.current) {
        tl.to(desktopMenuRef.current, {
          x: 384,
          duration: 0.5,
          ease: 'power3.inOut',
          pointerEvents: 'none',
        });
      }
    }
  }, [isMenuOpen]);

  // Scroll effect for logo
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpen((open) => !open);
  };

  return (
    <>
      {/* Mobile Menu Overlay - Slide from Top */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 h-screen w-full bg-[#2E7D32] z-60 lg:hidden shadow-2xl flex flex-col justify-center items-center px-8 pt-20"
        style={{ transform: 'translateY(-100%)', pointerEvents: 'none' }}
      >
        <nav className="flex flex-col gap-8 text-center">
          {menuItems.map((item) => (
            <TransitionLink
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-4xl font-light text-white hover:text-[#A5D6A7] transition-colors tracking-tight"
            >
              {item.label}
            </TransitionLink>
          ))}
        </nav>
      </div>

      {/* Desktop Side Navbar - COWI Style */}
      <nav
        ref={sidebarRef}
        className="hidden lg:flex fixed right-0 top-0 h-screen w-14 bg-[#37474F] z-40 flex-col items-center justify-between py-8"
      >
        {/* Hamburger at Top */}
        <button
          onClick={handleMenuClick}
          className="flex flex-col items-center justify-center w-12 h-12 group"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="desktop-sidebar-menu"
        >
          <span className="block h-0.5 w-7 bg-white mb-1.5 transition-all group-hover:w-8"></span>
          <span className="block h-0.5 w-7 bg-white mb-1.5 transition-all"></span>
          <span className="block h-0.5 w-7 bg-white transition-all group-hover:w-5"></span>
        </button>

        {/* Empty middle space */}
        <div className="flex-1"></div>

        {/* Logo at Bottom */}

      </nav>

      {/* Desktop Slide-out Menu - COWI Style */}
      <div
        ref={desktopMenuRef}
        id="desktop-sidebar-menu"
        aria-hidden={!isMenuOpen}
        className="fixed right-14 top-0 z-60 hidden h-screen w-80 bg-[#37474F] shadow-2xl lg:block"
        style={{ transform: 'translateX(384px)', pointerEvents: 'none' }}
      >
        <div className="flex flex-col h-full justify-center px-12">
          <nav ref={menuItemsRef} className="flex flex-col gap-6">
            {menuItems.map((item, index) => (
              <TransitionLink
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-0 h-px bg-white group-hover:w-8 transition-all duration-300"></div>
                  <span className="text-2xl font-light text-white/80 group-hover:text-white transition-colors tracking-tight">
                    {item.label}
                  </span>
                </div>
              </TransitionLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Top Bar - Language Selector (COWI minimalist style) */}
      <div
        suppressHydrationWarning
        className="fixed top-0 left-0 right-0 lg:right-14 h-20 bg-[#2E7D32] backdrop-blur-md z-70 lg:z-50 flex items-center justify-between px-6 border-b border-white/10"
      >
        {/* Language Selection (Left) - URL-based locale links */}
        <div className="flex items-center gap-1">
          {/* Main Locale Links - Hidden on Mobile */}
          <div className="hidden md:flex items-center">
            {localeOptions.map((loc, index) => (
              <LocaleLink
                key={loc.code}
                href={pathname}
                locale={loc.code}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${loc.code === activeLocale
                  ? 'text-white'
                  : 'text-white/60 hover:text-white'
                  } ${index < localeOptions.length - 1 ? 'border-r border-white/30' : ''}`}
              >
                {loc.label}
              </LocaleLink>
            ))}
          </div>

          {/* Dropdown (mobile) */}
          <div className="relative md:hidden">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center justify-center gap-1 text-white/80 hover:text-white transition-colors focus:outline-none"
              aria-label="Select language"
            >
              <span className="text-sm font-medium uppercase">{activeLocale}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isLangMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsLangMenuOpen(false)}
                />
                <div className="absolute top-full left-0 mt-2 py-2 w-48 bg-white shadow-lg rounded-sm border border-[#2E7D32]/10 flex flex-col z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {localeOptions.map((loc) => (
                    <LocaleLink
                      key={loc.code}
                      href={pathname}
                      locale={loc.code}
                      onClick={() => setIsLangMenuOpen(false)}
                      className={`text-sm px-4 py-2.5 hover:bg-[#F5F5DC] transition-colors text-left ${loc.code === activeLocale
                        ? 'text-[#2E7D32] font-semibold bg-[#F5F5DC]/50'
                        : 'text-[#37474F]/70 font-medium'
                        }`}
                    >
                      {loc.name}
                    </LocaleLink>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Center - Logo and LBYA Label */}
        <TransitionLink href={`/${activeLocale}`} className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-4 overflow-hidden">

          <span
            ref={labelRef}
            className={displayText === 'LBYA'
              ? 'block leading-none'
              : 'font-bold tracking-[0.15em] text-white leading-none text-2xl md:text-[42px]'}
          >
            {displayText === 'LBYA' ? (
              <Wordmark
                className="h-8 w-28 md:h-10 md:w-36"
                priority
                sizes="(max-width: 768px) 112px, 144px"
              />
            ) : displayText}
          </span>
        </TransitionLink>

        <div className="flex items-center gap-2">
          <HeaderAccountActions locale={activeLocale} />

          <a
            href={`/${activeLocale}/signin`}
            className="inline-flex items-center rounded-sm border border-white/28 px-2 py-2 text-white/88 md:hidden"
            aria-label="Sign in"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 19.5a7.5 7.5 0 0 1 15 0" />
            </svg>
          </a>

          {/* Mobile Hamburger (Right) */}
          <button
            onClick={handleMenuClick}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`h-0.5 w-6 bg-white rounded transition-transform origin-center ${isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
            />
            <span
              className={`h-0.5 w-6 bg-white rounded transition-opacity ${isMenuOpen ? 'opacity-0' : ''
                }`}
            />
            <span
              className={`h-0.5 w-6 bg-white rounded transition-transform origin-center ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
            />
          </button>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-20" />
    </>
  );
}

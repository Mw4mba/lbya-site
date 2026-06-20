'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Locale } from '@/app/content/locale';

type CurrencyCode = 'USD' | 'EUR' | 'ZAR' | 'KES' | 'NGN' | 'CFA' | 'TZS';
type PriceKind = 'monthly' | 'setup';
type Tone = 'light' | 'dark';

const STORAGE_KEY = 'lbya-mct-currency';
const CHANGE_EVENT = 'lbya-mct-currency-change';

// Indicative rates for price display only.
// EUR/ZAR: ECB euro reference rates, 19 June 2026.
// KES: Central Bank of Kenya, 19 June 2026.
// NGN: Central Bank of Nigeria NFEM, 19 June 2026.
// CFA: BCEAO fixed euro peg, CFA F 655.957 = EUR 1, converted through the ECB USD/EUR rate.
// TZS: Bank of Tanzania mean exchange rate, 20 June 2026.
const USD_TO_CURRENCY: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 1 / 1.1467,
  ZAR: 18.8907 / 1.1467,
  KES: 129.47,
  NGN: 1370.4556,
  CFA: 655.957 / 1.1467,
  TZS: 2630.2442,
};

const currencyOptions: Array<{ code: CurrencyCode; label: string }> = [
  { code: 'USD', label: 'USD' },
  { code: 'EUR', label: 'EURO' },
  { code: 'ZAR', label: 'ZAR' },
  { code: 'KES', label: 'KES' },
  { code: 'NGN', label: 'NGN' },
  { code: 'CFA', label: 'CFA' },
  { code: 'TZS', label: 'TZS' },
];

const copyByLocale: Record<Locale, {
  selectorLabel: string;
  monthlyPrefix: string;
  setupPrefix: string;
  monthlySuffix: string;
  rateNote: string;
}> = {
  en: {
    selectorLabel: 'Currency',
    monthlyPrefix: 'Starting price',
    setupPrefix: 'Setup starting price',
    monthlySuffix: '/month',
    rateNote: 'Base prices are in USD. Other currencies are indicative conversions.',
  },
  sv: {
    selectorLabel: 'Valuta',
    monthlyPrefix: 'Startpris',
    setupPrefix: 'Startpris för uppstart',
    monthlySuffix: '/månad',
    rateNote: 'Grundpriserna är i USD. Andra valutor är vägledande omräkningar.',
  },
  fr: {
    selectorLabel: 'Devise',
    monthlyPrefix: 'Prix de départ',
    setupPrefix: 'Prix de départ pour la mise en place',
    monthlySuffix: '/mois',
    rateNote: 'Les prix de base sont en USD. Les autres devises sont des conversions indicatives.',
  },
  de: {
    selectorLabel: 'Währung',
    monthlyPrefix: 'Starting price',
    setupPrefix: 'Setup starting price',
    monthlySuffix: '/month',
    rateNote: 'Base prices are in USD. Other currencies are indicative conversions.',
  },
};

const localeFormatMap: Record<Locale, string> = {
  en: 'en-US',
  sv: 'sv-SE',
  fr: 'fr-FR',
  de: 'de-DE',
};

function isCurrency(value: string | null): value is CurrencyCode {
  return (
    value === 'USD' ||
    value === 'EUR' ||
    value === 'ZAR' ||
    value === 'KES' ||
    value === 'NGN' ||
    value === 'CFA' ||
    value === 'TZS'
  );
}

function readStoredCurrency(): CurrencyCode {
  if (typeof window === 'undefined') return 'USD';
  const value = window.localStorage.getItem(STORAGE_KEY);
  return isCurrency(value) ? value : 'USD';
}

function parseUsdAmount(source: string): number | null {
  const normalized = source.replace(/\u00a0/g, ' ');
  const afterUsd = normalized.match(/USD\s*([0-9][0-9,\s.]*)/i);
  const beforeUsd = normalized.match(/([0-9][0-9,\s.]*)\s*USD/i);
  const rawAmount = afterUsd?.[1] ?? beforeUsd?.[1];
  if (!rawAmount) return null;

  const amount = Number(rawAmount.replace(/[^\d.]/g, ''));
  return Number.isFinite(amount) ? amount : null;
}

function convertAmount(amountUsd: number, currency: CurrencyCode) {
  return amountUsd * USD_TO_CURRENCY[currency];
}

function formatAmount(amount: number, currency: CurrencyCode, locale: Locale) {
  return new Intl.NumberFormat(localeFormatMap[locale], {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(Math.round(amount));
}

function useSelectedCurrency() {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  useEffect(() => {
    setCurrency(readStoredCurrency());

    const handleCustomChange = (event: Event) => {
      const nextCurrency = (event as CustomEvent<CurrencyCode>).detail;
      if (isCurrency(nextCurrency)) setCurrency(nextCurrency);
    };

    const handleStorageChange = () => setCurrency(readStoredCurrency());

    window.addEventListener(CHANGE_EVENT, handleCustomChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener(CHANGE_EVENT, handleCustomChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const updateCurrency = (nextCurrency: CurrencyCode) => {
    setCurrency(nextCurrency);
    window.localStorage.setItem(STORAGE_KEY, nextCurrency);
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: nextCurrency }));
  };

  return { currency, updateCurrency };
}

export function MctCurrencySwitcher({
  locale,
  tone = 'light',
  className = '',
}: {
  locale: Locale;
  tone?: Tone;
  className?: string;
}) {
  const { currency, updateCurrency } = useSelectedCurrency();
  const copy = copyByLocale[locale];
  const isDark = tone === 'dark';

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-3">
        <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${isDark ? 'text-white/56' : 'text-[#37474F]/56'}`}>
          {copy.selectorLabel}
        </p>
        <p className={`hidden text-xs leading-5 sm:block ${isDark ? 'text-white/48' : 'text-[#37474F]/54'}`}>
          {copy.rateNote}
        </p>
      </div>
      <div
        className={`mt-3 flex max-w-full gap-2 overflow-x-auto rounded-sm border p-1 ${
          isDark ? 'border-white/14 bg-white/[0.06]' : 'border-[#1F3529]/10 bg-[#F6F8F4]'
        }`}
        role="group"
        aria-label={copy.selectorLabel}
      >
        {currencyOptions.map((option) => {
          const selected = option.code === currency;
          return (
            <button
              key={option.code}
              type="button"
              onClick={() => updateCurrency(option.code)}
              className={`shrink-0 rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                selected
                  ? isDark
                    ? 'bg-white text-[#1F3529]'
                    : 'bg-[#1F3529] text-white'
                  : isDark
                    ? 'text-white/68 hover:bg-white/10 hover:text-white'
                    : 'text-[#37474F]/70 hover:bg-white hover:text-[#1F3529]'
              }`}
              aria-pressed={selected}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function MctConvertedPrice({
  source,
  locale,
  kind,
  className = '',
}: {
  source: string;
  locale: Locale;
  kind: PriceKind;
  className?: string;
}) {
  const { currency } = useSelectedCurrency();
  const copy = copyByLocale[locale];
  const amountUsd = useMemo(() => parseUsdAmount(source), [source]);

  if (amountUsd === null) return <span className={className}>{source}</span>;

  const amount = convertAmount(amountUsd, currency);
  const prefix = kind === 'monthly' ? copy.monthlyPrefix : copy.setupPrefix;
  const suffix = kind === 'monthly' ? copy.monthlySuffix : '';
  const code = currency === 'EUR' ? 'EUR' : currency;

  return (
    <span className={className}>
      {prefix} {code} {formatAmount(amount, currency, locale)}
      {suffix}
    </span>
  );
}

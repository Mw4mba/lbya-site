import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { Providers } from "../providers";
import { TransitionProvider } from "../context/TransitionContext";
import CookieConsent from "../components/CookieConsent";
import CopyProtection from "../components/CopyProtection";
import PageLabelSidebar from "../components/PageLabelSidebar";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "LBYA | Digital Control Products",
  description:
    "LBYA builds digital control products that turn fragmented information into clear, traceable decisions. Explore Malaika Control Tower and Nayeli BIM Control.",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <>
      <CopyProtection />
      <PageLabelSidebar />
      <NextIntlClientProvider>
        <Providers locale={locale}>
          <TransitionProvider>{children}</TransitionProvider>
          <CookieConsent />
        </Providers>
      </NextIntlClientProvider>
    </>
  );
}

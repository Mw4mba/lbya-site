import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { Providers } from "../providers";
import { TransitionProvider } from "../context/TransitionContext";
import CookieConsent from "../components/CookieConsent";
import PageLabelSidebar from "../components/PageLabelSidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

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
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Asimovian&family=Days+One&family=Tektur:wght@400..900&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} antialiased bg-[#F5F5DC]`}>
        <PageLabelSidebar />
        <NextIntlClientProvider>
          <Providers locale={locale}>
            <TransitionProvider>{children}</TransitionProvider>
            <CookieConsent />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

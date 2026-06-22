'use client';

import { SessionProvider } from "next-auth/react";
import { I18nProvider } from './i18n/I18nContext';
import { ThemeProvider } from './context/ThemeContext';

export function Providers({ children, locale }: { children: React.ReactNode; locale: string }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <I18nProvider locale={locale}>
          {children}
        </I18nProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

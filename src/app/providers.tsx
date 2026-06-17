'use client';

import { I18nProvider } from './i18n/I18nContext';
import { ThemeProvider } from './context/ThemeContext';

export function Providers({ children, locale }: { children: React.ReactNode; locale: string }) {
  return (
    <ThemeProvider>
      <I18nProvider locale={locale}>
        {children}
      </I18nProvider>
    </ThemeProvider>
  );
}

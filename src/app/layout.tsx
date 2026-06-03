import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { TransitionProvider } from "./context/TransitionContext";
import CookieConsent from "./components/CookieConsent";

import PageLabelSidebar from "./components/PageLabelSidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Sustainable Engineering | Architecture & Structural Design",
  description: "We craft sustainable spaces that breathe with the planet. Sustainable architecture, structural engineering, and BIM-based workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Asimovian&family=Days+One&family=Tektur:wght@400..900&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${inter.variable} antialiased bg-[#F5F5DC]`}
      >
        <PageLabelSidebar />
        <Providers>
          <TransitionProvider>
            {children}
          </TransitionProvider>
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}

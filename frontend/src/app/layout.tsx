import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { siteConfig } from "@/config/site.config";
import { fontVariables } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Become a Top Software Engineer`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/ugsot_logo.svg",
    shortcut: "/ugsot_logo.svg",
    apple: "/ugsot_logo.svg",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: `${siteConfig.name} — Become a Top Software Engineer`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
};

/** Matches the hero backdrop so mobile browser chrome blends into the page. */
export const viewport: Viewport = {
  themeColor: "#0a0708",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    // Font variables are declared on <html> so every descendant — including
    // portalled content — can resolve them.
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}

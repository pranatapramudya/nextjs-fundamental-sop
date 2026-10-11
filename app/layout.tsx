import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Padang Minang Express | Master Fundamental Next.js",
  description: "Platform belajar interaktif 10 Modul Fundamental Next.js App Router dengan Analogi Restoran Padang.",
};

import RootLayoutShell from "./RootLayoutShell";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
          minHeight: "100vh",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <RootLayoutShell>{children}</RootLayoutShell>
      </body>
    </html>
  );
}


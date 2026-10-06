import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Padang Minang Express | Master Fundamental Next.js",
  description: "Platform belajar interaktif 10 Modul Fundamental Next.js App Router dengan Analogi Restoran Padang.",
};

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
          backgroundColor: "#f8fafc", // Clean light slate background
          color: "#0f172a", // Sharp dark readable text
          minHeight: "100vh",
          WebkitFontSmoothing: "antialiased",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* TOPBAR HEADER CLEAN LIGHT */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderBottom: "1px solid #e2e8f0",
            padding: "0.85rem 1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span
              style={{
                fontSize: "1.4rem",
                background: "linear-gradient(135deg, #f59e0b, #ea580c)",
                padding: "6px",
                borderRadius: "10px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(245, 158, 11, 0.25)",
              }}
            >
              🍛
            </span>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1.05rem", letterSpacing: "-0.02em", color: "#0f172a" }}>
                MINANG EXPRESS
              </div>
              <div style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 500 }}>
                Next.js App Router Fundamental
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                padding: "4px 10px",
                borderRadius: "20px",
                backgroundColor: "#ecfdf5",
                color: "#059669",
                border: "1px solid #a7f3d0",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "#10b981",
                  display: "inline-block",
                }}
              />
              Live Port 3002
            </span>
          </div>
        </header>

        {/* MAIN BODY CONTAINER */}
        <div style={{ flex: 1, width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
          {children}
        </div>

        {/* FOOTER */}
        <footer
          style={{
            borderTop: "1px solid #e2e8f0",
            padding: "1.5rem 1rem",
            textAlign: "center",
            fontSize: "0.8rem",
            color: "#64748b",
            backgroundColor: "#ffffff",
          }}
        >
          Dibuat dengan ❤️ & Analogi Restoran Padang • 10 Modul Zero to Hero Fullstack Next.js
        </footer>
      </body>
    </html>
  );
}

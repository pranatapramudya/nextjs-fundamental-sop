"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { usePathname } from "next/navigation";

export default function RootLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const pathname = usePathname();

  // Load saved theme on client mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("minang_express_theme") as "light" | "dark";
      if (savedTheme) {
        setTheme(savedTheme);
      }
    } catch (e) {}

    const handleStorageChange = () => {
      try {
        const current = localStorage.getItem("minang_express_theme") as "light" | "dark";
        if (current) setTheme(current);
      } catch (e) {}
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    try {
      localStorage.setItem("minang_express_theme", nextTheme);
      window.dispatchEvent(new Event("minang_theme_change"));
    } catch (e) {}
  };

  const isDark = theme === "dark";


  return (
    <div
      style={{
        backgroundColor: isDark ? "#080d1a" : "#f8fafc",
        color: isDark ? "#f8fafc" : "#0f172a",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        transition: "background-color 0.2s ease, color 0.2s ease",
      }}
    >
      {/* TOPBAR HEADER FULL SCREEN & RESPONSIVE */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(14px)",
          backgroundColor: isDark ? "rgba(11, 16, 28, 0.85)" : "rgba(255, 255, 255, 0.88)",
          borderBottom: isDark ? "1px solid #1a253a" : "1px solid #e2e8f0",
          padding: "0.85rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: isDark ? "0 4px 20px rgba(0, 0, 0, 0.4)" : "0 1px 3px rgba(0, 0, 0, 0.05)",
          transition: "background-color 0.2s ease, border-color 0.2s ease",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            textDecoration: "none",
            color: "inherit",
          }}
        >
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
            <div
              style={{
                fontWeight: 800,
                fontSize: "1.05rem",
                letterSpacing: "-0.02em",
                color: isDark ? "#ffffff" : "#0f172a",
              }}
            >
              MINANG EXPRESS
            </div>
            <div
              style={{
                fontSize: "0.72rem",
                color: isDark ? "#94a3b8" : "#64748b",
                fontWeight: 500,
              }}
            >
              Next.js App Router Fundamental
            </div>
          </div>
        </Link>

        {/* RIGHT TOPBAR: PRD LINK + THEME TOGGLE + PORT BADGE */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "999px",
              backgroundColor: isDark ? "#172338" : "#ffffff",
              border: isDark ? "1px solid #233452" : "1px solid #cbd5e1",
              color: isDark ? "#f8fafc" : "#0f172a",
              fontSize: "0.78rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 1px 4px rgba(0,0,0,0.06)",
              transition: "all 0.2s ease",
            }}
          >
            {isDark ? (
              <Sun style={{ width: "15px", height: "15px", color: "#f59e0b" }} />
            ) : (
              <Moon style={{ width: "15px", height: "15px", color: "#64748b" }} />
            )}
            <span style={{ display: "inline-block" }}>
              {isDark ? "Light" : "Dark"}
            </span>
          </button>

          {/* Live Port indicator */}
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: "20px",
              backgroundColor: isDark ? "rgba(16, 185, 129, 0.15)" : "#ecfdf5",
              color: "#10b981",
              border: isDark ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid #a7f3d0",
              display: "inline-flex",
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
            Live
          </span>
        </div>
      </header>

      {/* MAIN BODY CONTAINER */}
      <div style={{ flex: 1, width: "100%", margin: "0 auto" }}>
        {children}
      </div>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: isDark ? "1px solid #1a253a" : "1px solid #e2e8f0",
          padding: "1.5rem 1rem",
          textAlign: "center",
          fontSize: "0.8rem",
          color: isDark ? "#94a3b8" : "#64748b",
          backgroundColor: isDark ? "#090e1c" : "#ffffff",
          transition: "background-color 0.2s ease, border-color 0.2s ease",
        }}
      >
        Dibuat dengan ❤️ & Analogi Restoran Padang • 10 Modul Zero to Hero Fullstack Next.js
      </footer>
    </div>
  );
}

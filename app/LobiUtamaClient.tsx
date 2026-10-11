"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon, ArrowRight } from "lucide-react";

interface ModulItem {
  nomor: string;
  judul: string;
  tag: string;
  deskripsi: string;
  href: string;
  tagBg: string;
  tagColor: string;
  icon: string;
  isExternal?: boolean;
}

const DAFTAR_MODUL: ModulItem[] = [
  {
    nomor: "MODUL 01 & 02",
    judul: "Daftar Menu & Interaksi Pesan",
    tag: "Koki vs Pelayan & Routing",
    deskripsi: "Simulasi Server Component masak data & Client Component tombol pesan porsi dengan navigasi kilat.",
    href: "/menu",
    tagBg: "#eff6ff",
    tagColor: "#1d4ed8",
    icon: "🍛",
  },
  {
    nomor: "MODUL 02",
    judul: "Meja Kasir & Layanan",
    tag: "Static Routing",
    deskripsi: "Bikin halaman statis bersih tanpa ribet konfigurasi router pihak ketiga.",
    href: "/kontak",
    tagBg: "#f1f5f9",
    tagColor: "#475569",
    icon: "📞",
  },
  {
    nomor: "MODUL 03",
    judul: "Gudang Belanja Bahan",
    tag: "Data Fetching di Server",
    deskripsi: "Koki langsung kulakan ke API luar via async/await tanpa useState & useEffect.",
    href: "/gudang",
    tagBg: "#ecfdf5",
    tagColor: "#047857",
    icon: "🛒",
  },
  {
    nomor: "MODUL 04",
    judul: "Dapur Rendang 8 Jam",
    tag: "Loading.tsx & Suspense",
    deskripsi: "Teh tawar hangat instan (Streaming SSR) saat koki masak lambat 3 detik tanpa layar blank.",
    href: "/rendang-spesial",
    tagBg: "#fffbeb",
    tagColor: "#b45309",
    icon: "🍵",
  },
  {
    nomor: "MODUL 05",
    judul: "Dapur Eksperimen Error",
    tag: "Error Boundary & 404",
    deskripsi: "Tameng penyelamat saat kompor meledak lengkap dengan tombol Reset darurat.",
    href: "/dapur-eksperimen",
    tagBg: "#fef2f2",
    tagColor: "#b91c1c",
    icon: "💥",
  },
  {
    nomor: "MODUL 06",
    judul: "Kertas Bon Orderan Masuk",
    tag: "Server Actions Form",
    deskripsi: "Kirim form input langsung ke fungsi server tanpa perlu repot bikin REST API manual.",
    href: "/request-menu",
    tagBg: "#f5f3ff",
    tagColor: "#6d28d9",
    icon: "📝",
  },
  {
    nomor: "MODUL 07",
    judul: "Loket Drive-Thru REST API",
    tag: "Route Handlers (route.ts)",
    deskripsi: "Endpoint HTTP murni (JSON) khusus untuk Driver Ojol, mobile app, dan webhook pembayaran.",
    href: "/api/menu-padang",
    tagBg: "#ecfeff",
    tagColor: "#0e7490",
    icon: "🚗",
  },
  {
    nomor: "MODUL 08",
    judul: "Kulkas Database SQLite",
    tag: "Prisma & SQLite DB",
    deskripsi: "Data menu Padang tersimpan permanen di disk dengan Prisma ORM & migrasi skema.",
    href: "/menu-db",
    tagBg: "#fdf4ff",
    tagColor: "#a21caf",
    icon: "🧊",
  },
  {
    nomor: "MODUL 09",
    judul: "Satpam Middleware & Auth",
    tag: "Middleware & HttpOnly Cookie",
    deskripsi: "Pencegahan akses liar ke ruang manajer tanpa ID Card resmi dan rotasi sesi aman.",
    href: "/admin/dashboard",
    tagBg: "#fff1f2",
    tagColor: "#be123c",
    icon: "👮",
  },
  {
    nomor: "MODUL 10",
    judul: "Security Anti-Racun & IDOR",
    tag: "Zod Guard & Multi-Tenant",
    deskripsi: "Validasi ketat skema Zod, isolasi data multi-cabang tenantId, dan uji tembus cURL.",
    href: "/security-demo",
    tagBg: "#ecfdf5",
    tagColor: "#059669",
    icon: "🛡️",
  },
];

export default function LobiUtamaClient() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const updateTheme = () => {
      try {
        const savedTheme = localStorage.getItem("minang_express_theme") as "light" | "dark";
        if (savedTheme) {
          setTheme(savedTheme);
        }
      } catch (e) {}
    };

    updateTheme();
    window.addEventListener("minang_theme_change", updateTheme);
    window.addEventListener("storage", updateTheme);
    return () => {
      window.removeEventListener("minang_theme_change", updateTheme);
      window.removeEventListener("storage", updateTheme);
    };
  }, []);

  const isDark = theme === "dark";

  return (
    <div
      style={{
        backgroundColor: "transparent",
        color: isDark ? "#f8fafc" : "#0f172a",
        minHeight: "100%",
        padding: "2rem 1.5rem 4rem 1.5rem",
        maxWidth: "1280px",
        margin: "0 auto",
        transition: "color 0.2s ease",
      }}
    >
      {/* HERO SECTION DENGAN DUKUNGAN LIGHT / DARK */}
      <section
        style={{
          backgroundColor: isDark ? "#111827" : "#ffffff",
          borderRadius: "20px",
          padding: "2.75rem 1.5rem",
          textAlign: "center",
          marginBottom: "2rem",
          border: isDark ? "1px solid #1f2937" : "1px solid #e2e8f0",
          boxShadow: isDark ? "0 4px 20px rgba(0, 0, 0, 0.4)" : "0 2px 8px rgba(0, 0, 0, 0.04)",
          transition: "all 0.2s ease",
        }}
      >
        <div
          style={{
            display: "inline-block",
            fontSize: "0.78rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#ea580c",
            backgroundColor: isDark ? "rgba(234, 88, 12, 0.15)" : "#fff7ed",
            padding: "6px 14px",
            borderRadius: "999px",
            marginBottom: "1.25rem",
            border: isDark ? "1px solid rgba(234, 88, 12, 0.3)" : "1px solid #ffedd5",
          }}
        >
          🚀 10 Modul Fundamental Berhasil Diselesaikan
        </div>

        <h1
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 800,
            margin: "0 0 0.85rem 0",
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
            color: isDark ? "#ffffff" : "#0f172a",
          }}
        >
          Lobi Restoran Padang <br />
          <span style={{ color: "#ea580c" }}>
            Fundamental Next.js App Router
          </span>
        </h1>

        <p
          style={{
            maxWidth: "650px",
            margin: "0 auto",
            color: isDark ? "#94a3b8" : "#64748b",
            fontSize: "clamp(0.9rem, 2vw, 1.02rem)",
            lineHeight: 1.6,
          }}
        >
          Arsitektur bersih, cepat, dan terstruktur. Klik salah satu modul di bawah ini untuk melihat implementasi dan alur kerjanya langsung di browser!
        </p>
      </section>

      {/* GRID KARTU MODUL */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {DAFTAR_MODUL.map((m) => {
          const TagKomponen = m.isExternal ? "a" : Link;
          return (
            <TagKomponen
              key={m.href}
              href={m.href}
              target={m.isExternal ? "_blank" : undefined}
              rel={m.isExternal ? "noopener noreferrer" : undefined}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: isDark ? "#111827" : "#ffffff",
                border: isDark ? "1px solid #1f2937" : "1px solid #e2e8f0",
                borderRadius: "16px",
                padding: "1.5rem",
                boxShadow: isDark ? "0 4px 15px rgba(0, 0, 0, 0.2)" : "0 1px 3px rgba(0, 0, 0, 0.04)",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
            >
              <div>
                {/* Header Kartu */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.85rem" }}>
                  <span
                    style={{
                      fontSize: "1.5rem",
                      padding: "8px",
                      borderRadius: "10px",
                      backgroundColor: isDark ? "#1f2937" : "#f8fafc",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: isDark ? "1px solid #374151" : "1px solid #f1f5f9",
                    }}
                  >
                    {m.icon}
                  </span>

                  <span
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      color: isDark ? "#94a3b8" : "#64748b",
                      backgroundColor: isDark ? "#1f2937" : "#f1f5f9",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      border: isDark ? "1px solid #374151" : "none",
                    }}
                  >
                    {m.nomor}
                  </span>
                </div>

                {/* Judul & Tag */}
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    margin: "0 0 0.4rem 0",
                    color: isDark ? "#ffffff" : "#0f172a",
                  }}
                >
                  {m.judul}
                </h3>

                <span
                  style={{
                    display: "inline-block",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    backgroundColor: isDark ? "rgba(255,255,255,0.06)" : m.tagBg,
                    color: isDark ? "#38bdf8" : m.tagColor,
                    padding: "3px 8px",
                    borderRadius: "4px",
                    marginBottom: "0.75rem",
                  }}
                >
                  {m.tag}
                </span>

                <p
                  style={{
                    fontSize: "0.825rem",
                    color: isDark ? "#94a3b8" : "#64748b",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {m.deskripsi}
                </p>
              </div>

              {/* Footer Tombol Aksi */}
              <div
                style={{
                  marginTop: "1.25rem",
                  paddingTop: "0.75rem",
                  borderTop: isDark ? "1px solid #1f2937" : "1px solid #f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#ea580c",
                }}
              >
                <span>Buka Modul</span>
                <ArrowRight style={{ width: "14px", height: "14px" }} />
              </div>
            </TagKomponen>
          );
        })}
      </div>
    </div>
  );
}

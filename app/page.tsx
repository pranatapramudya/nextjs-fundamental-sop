import Link from "next/link";

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
    href: "/api/menu",
    tagBg: "#ecfeff",
    tagColor: "#0369a1",
    icon: "🚗",
    isExternal: true,
  },
  {
    nomor: "MODUL 08",
    judul: "Kulkas Database SQL Permanen",
    tag: "SQLite CRUD Nyata",
    deskripsi: "Operasi Create, Read, Update, Delete permanen di file database SQLite restoran.db.",
    href: "/kulkas-database",
    tagBg: "#f0fdfa",
    tagColor: "#0f766e",
    icon: "🧊",
  },
  {
    nomor: "MODUL 09",
    judul: "Ruang VIP Bos Owner",
    tag: "Satpam Middleware & Cookie",
    deskripsi: "Proteksi rute Edge terdepan via middleware.ts dan validasi Cookie httpOnly.",
    href: "/vip-owner",
    tagBg: "#fefce8",
    tagColor: "#a16207",
    icon: "👑",
  },
  {
    nomor: "MODUL 10",
    judul: "Laboratorium Anti-Racun",
    tag: "Security, .env & Anti-XSS",
    deskripsi: "Penyensoran otomatis kunci rahasia server dari intipan browser pelanggan.",
    href: "/laboratorium-security",
    tagBg: "#f0fdf4",
    tagColor: "#15803d",
    icon: "🛡️",
  },
];

export default function LobiUtama() {
  return (
    <main style={{ padding: "1.5rem 1rem 3.5rem 1rem" }}>
      {/* HERO SECTION CLEAN LIGHT */}
      <section
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "2.5rem 1.25rem",
          textAlign: "center",
          marginBottom: "2rem",
          border: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div
          style={{
            display: "inline-block",
            fontSize: "0.78rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#b45309",
            backgroundColor: "#fef3c7",
            padding: "5px 12px",
            borderRadius: "999px",
            marginBottom: "1rem",
            border: "1px solid #fde68a",
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
            color: "#0f172a",
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
            color: "#64748b",
            fontSize: "clamp(0.9rem, 2vw, 1.02rem)",
            lineHeight: 1.6,
          }}
        >
          Arsitektur bersih, cepat, dan terstruktur. Klik salah satu modul di bawah ini untuk melihat implementasi dan alur kerjanya langsung di browser!
        </p>
      </section>

      {/* GRID KARTU MODUL CLEAN LIGHT */}
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
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "14px",
                padding: "1.35rem",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
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
                      backgroundColor: "#f8fafc",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #f1f5f9",
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
                      color: "#64748b",
                      backgroundColor: "#f1f5f9",
                      padding: "4px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    {m.nomor}
                  </span>
                </div>

                {/* Judul & Tag */}
                <h3
                  style={{
                    margin: "0 0 0.35rem 0",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#0f172a",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {m.judul}
                </h3>

                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: m.tagColor,
                    backgroundColor: m.tagBg,
                    padding: "3px 8px",
                    borderRadius: "6px",
                    width: "fit-content",
                    marginBottom: "0.75rem",
                  }}
                >
                  🎯 {m.tag}
                </div>

                {/* Deskripsi */}
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.85rem",
                    color: "#64748b",
                    lineHeight: 1.5,
                  }}
                >
                  {m.deskripsi}
                </p>
              </div>

              {/* Action Link Footer */}
              <div
                style={{
                  marginTop: "1.25rem",
                  paddingTop: "0.85rem",
                  borderTop: "1px solid #f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "#ea580c",
                }}
              >
                <span>Buka Ruangan</span>
                <span style={{ fontSize: "1rem" }}>➔</span>
              </div>
            </TagKomponen>
          );
        })}
      </div>
    </main>
  );
}

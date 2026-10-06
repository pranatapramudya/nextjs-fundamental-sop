"use client";

import Link from "next/link";

// 🤵 PELAYAN PENYELAMAT (error.tsx WAJIB Client Component!)
export default function ErrorDapur({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <div
        style={{
          border: "2px solid #ef4444",
          backgroundColor: "#fef2f2",
          borderRadius: "8px",
          padding: "1.5rem",
          maxWidth: "550px",
        }}
      >
        <h2 style={{ color: "#991b1b", margin: "0 0 0.5rem 0" }}>
          💥 Aduh Gawat! Wajan Dapur Gosong!
        </h2>
        <p style={{ color: "#b91c1c", fontSize: "0.95rem" }}>
          Terjadi kesalahan saat Koki lagi masak:
        </p>

        <div
          style={{
            backgroundColor: "#fee2e2",
            padding: "0.75rem",
            borderRadius: "6px",
            fontFamily: "monospace",
            color: "#7f1d1d",
            fontSize: "0.85rem",
            marginBottom: "1rem",
          }}
        >
          {error.message}
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {/* Tombol ajaib reset() bawaan Next.js buat nyoba masak ulang */}
          <button
            onClick={() => reset()}
            style={{
              padding: "8px 16px",
              backgroundColor: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            🔄 Suruh Koki Masak Ulang (Reset)
          </button>

          <Link href="/" style={{ color: "#2563eb", textDecoration: "underline" }}>
            Balik ke Lobi
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function PelayanCekRahasia() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Saat SSR di server, process.env.KUNCI_BRANKAS_DAPUR terbaca oleh Node.js,
  // tapi saat di bundle ke browser, nilainya undefined.
  // Gunakan mounted guard untuk mencegah perbedaan teks saat hydration!
  const kunciDapur = mounted ? process.env.KUNCI_BRANKAS_DAPUR : undefined;
  const sloganPublik = process.env.NEXT_PUBLIC_SLOGAN_RESTORAN;

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        border: "1px solid #cbd5e1",
        borderRadius: "6px",
        padding: "1rem",
        marginTop: "1rem",
      }}
    >
      <h3 style={{ margin: "0 0 0.5rem 0", color: "#334155" }}>
        🤵 Penglihatan Pelayan di Browser (Client Component):
      </h3>
      <p style={{ margin: "0.25rem 0" }}>
        📢 <strong>Slogan Publik (NEXT_PUBLIC_):</strong>{" "}
        <span style={{ color: "#16a34a", fontWeight: "bold" }}>
          "{sloganPublik || "Memuat..."}"
        </span>
      </p>
      <p style={{ margin: "0.25rem 0" }}>
        🔒 <strong>Kunci Rahasia Dapur:</strong>{" "}
        <span style={{ color: "#dc2626", fontWeight: "bold" }}>
          {!mounted
            ? "[KOSONG / UNDEFINED] (Browser DILARANG NGINTIP!)"
            : kunciDapur
              ? kunciDapur
              : "[KOSONG / UNDEFINED] (Browser DILARANG NGINTIP!)"}
        </span>
      </p>
      <small style={{ color: "#64748b" }}>
        Next.js otomatis menyensor variabel server dari browser user!
      </small>
    </div>
  );
}

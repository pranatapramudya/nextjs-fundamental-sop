import Link from "next/link";
import PelayanCekRahasia from "./PelayanCekRahasia";

// 👨‍🍳 KOKI MEMBACA ENVIRONMENT VARIABLES DI SERVER
export default async function HalamanLaboratoriumSecurity() {
  const kunciDapur = process.env.KUNCI_BRANKAS_DAPUR;
  const sloganPublik = process.env.NEXT_PUBLIC_SLOGAN_RESTORAN;

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🛡️ Laboratorium Keamanan & Sertifikasi Anti-Racun</h1>
      <p style={{ color: "#4b5563" }}>
        Eksperimen pembuktian keamanan Next.js dari kebocoran rahasia dan serangan hacker.
      </p>

      {/* UJI COBA 1: ENVIRONMENT VARIABLES ISOLATION */}
      <div
        style={{
          border: "2px solid #3b82f6",
          borderRadius: "8px",
          padding: "1.5rem",
          maxWidth: "600px",
          backgroundColor: "#eff6ff",
          marginBottom: "1.5rem",
        }}
      >
        <h2 style={{ margin: "0 0 0.5rem 0", color: "#1d4ed8" }}>
          1. Uji Coba: Isolasi Rahasia (.env.local)
        </h2>

        {/* Server View */}
        <div
          style={{
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "6px",
            border: "1px solid #bfdbfe",
          }}
        >
          <h3 style={{ margin: "0 0 0.5rem 0", color: "#1e40af" }}>
            👨‍🍳 Penglihatan Koki di Dapur (Server Component):
          </h3>
          <p style={{ margin: "0.25rem 0" }}>
            📢 <strong>Slogan Publik:</strong> "{sloganPublik}"
          </p>
          <p style={{ margin: "0.25rem 0" }}>
            🔒 <strong>Kunci Rahasia Dapur:</strong>{" "}
            <span style={{ color: "#15803d", fontWeight: "bold" }}>"{kunciDapur}"</span>
          </p>
          <small style={{ color: "#16a34a" }}>
            ✅ Koki bisa melihat semua kunci rahasia karena berdiri di server!
          </small>
        </div>

        {/* Client View */}
        <PelayanCekRahasia />
      </div>

      {/* UJI COBA 2: ANTI XSS DEMONSTRATION */}
      <div
        style={{
          border: "2px solid #10b981",
          borderRadius: "8px",
          padding: "1.5rem",
          maxWidth: "600px",
          backgroundColor: "#f0fdf4",
        }}
      >
        <h2 style={{ margin: "0 0 0.5rem 0", color: "#047857" }}>
          2. Uji Coba: Auto-Escaping Anti XSS
        </h2>
        <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem" }}>
          Misal ada hacker input teks jahat: <code>&lt;script&gt;alert('Hacked!')&lt;/script&gt;</code>
        </p>
        <div
          style={{
            backgroundColor: "white",
            padding: "0.75rem",
            borderRadius: "6px",
            border: "1px solid #a7f3d0",
          }}
        >
          <strong>Hasil Render Next.js:</strong>{" "}
          <span style={{ color: "#065f46" }}>
            {"<script>alert('Hacked!')</script>"}
          </span>
          <br />
          <small style={{ color: "#059669" }}>
            🛡️ Script dirender sebagai teks biasa murni, bukan kode virus yang meledak di browser!
          </small>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <Link href="/" style={{ color: "#2563eb", textDecoration: "underline" }}>
          ⬅️ Balik ke Lobi Utama
        </Link>
      </div>
    </div>
  );
}

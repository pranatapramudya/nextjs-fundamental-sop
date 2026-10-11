import Link from "next/link";
import PelayanCekRahasia from "./PelayanCekRahasia";
import SecurityPlaygroundClient from "./SecurityPlaygroundClient";
import { getSessionServer } from "./actions";
import db from "@/lib/db";

// 👨‍🍳 KOKI MEMBACA ENVIRONMENT VARIABLES & DATABASE DI SERVER
export default async function HalamanLaboratoriumSecurity() {
  const kunciDapur = process.env.KUNCI_BRANKAS_DAPUR;
  const sloganPublik = process.env.NEXT_PUBLIC_SLOGAN_RESTORAN;

  // Baca session saat ini
  const session = await getSessionServer();

  // Ambil daftar pesanan sesuai tenant session (jika belum login, tampilkan kosong)
  let pesananList: any[] = [];
  if (session) {
    pesananList = db
      .prepare("SELECT * FROM pesanan_cabang WHERE tenant_id = ? ORDER BY id DESC")
      .all(session.tenantId);
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.8rem", margin: "0 0 0.5rem 0" }}>
          🛡️ Laboratorium Keamanan & Best Practice Next.js
        </h1>
        <p style={{ color: "#4b5563", margin: 0 }}>
          Eksperimen pembuktian pertahanan Next.js: Isolasi Env, Anti-XSS, Zod Validation,
          Multi-Tenant Isolation, Anti-IDOR, dan HttpOnly Cookie.
        </p>
      </div>

      {/* ======================================================== */}
      {/* BAGIAN INTERAKTIF: PRAKTEK A, B, DAN C */}
      {/* ======================================================== */}
      <SecurityPlaygroundClient session={session} pesananList={pesananList} />

      <hr style={{ margin: "2.5rem 0", borderColor: "#e5e7eb" }} />

      {/* ======================================================== */}
      {/* BAGIAN FUNDAMENTAL LAMA: ENV & XSS */}
      {/* ======================================================== */}
      <h3 style={{ color: "#374151", marginBottom: "1rem" }}>
        📚 Teori Dasar: Isolasi Env & Auto-Escaping
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
        {/* UJI COBA 1: ENVIRONMENT VARIABLES ISOLATION */}
        <div
          style={{
            border: "1px solid #bfdbfe",
            borderRadius: "8px",
            padding: "1.25rem",
            backgroundColor: "#eff6ff",
          }}
        >
          <h4 style={{ margin: "0 0 0.5rem 0", color: "#1d4ed8" }}>
            1. Isolasi .env.local
          </h4>
          <div
            style={{
              backgroundColor: "white",
              padding: "0.75rem",
              borderRadius: "6px",
              border: "1px solid #dbeafe",
              fontSize: "0.85rem",
            }}
          >
            <p style={{ margin: "0.25rem 0" }}>
              📢 <strong>Slogan Publik:</strong> "{sloganPublik}"
            </p>
            <p style={{ margin: "0.25rem 0" }}>
              🔒 <strong>Kunci Rahasia Dapur:</strong>{" "}
              <span style={{ color: "#15803d", fontWeight: "bold" }}>"{kunciDapur}"</span>
            </p>
            <small style={{ color: "#16a34a", display: "block", marginTop: "4px" }}>
              ✅ Koki server membaca secret, tapi client browser dicegah!
            </small>
          </div>
          <div style={{ marginTop: "0.75rem" }}>
            <PelayanCekRahasia />
          </div>
        </div>

        {/* UJI COBA 2: ANTI XSS DEMONSTRATION */}
        <div
          style={{
            border: "1px solid #a7f3d0",
            borderRadius: "8px",
            padding: "1.25rem",
            backgroundColor: "#f0fdf4",
          }}
        >
          <h4 style={{ margin: "0 0 0.5rem 0", color: "#047857" }}>
            2. Auto-Escaping Anti XSS
          </h4>
          <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.8rem", color: "#065f46" }}>
            Input teks hacker: <code>&lt;script&gt;alert('Hacked!')&lt;/script&gt;</code>
          </p>
          <div
            style={{
              backgroundColor: "white",
              padding: "0.75rem",
              borderRadius: "6px",
              border: "1px solid #d1fae5",
              fontSize: "0.85rem",
            }}
          >
            <strong>Hasil Render React:</strong>{" "}
            <span style={{ color: "#065f46" }}>
              {"<script>alert('Hacked!')</script>"}
            </span>
            <br />
            <small style={{ color: "#059669", display: "block", marginTop: "4px" }}>
              🛡️ Dirender sebagai string teks murni, bukan virus yang jalan di DOM!
            </small>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <Link href="/" style={{ color: "#2563eb", textDecoration: "underline", fontWeight: "bold" }}>
          ⬅️ Balik ke Lobi Utama
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";
import { getSession, switchRoleAction, deleteSensitiveDataAction } from "./actions";

export default async function RbacMejaVipPage() {
  const session = await getSession();

  const daftarNota = [
    { id: "BON-001", customer: "Toyota Avanza 1.3G (D 1284 AB)", total: 450000, bay: "Bay 1 • Tune-up & Injektor", status: "Sedang Dikerjakan", date: "Hari ini, 10:30" },
    { id: "BON-002", customer: "Innova Reborn 2.4V (Z 8891 CA)", total: 1250000, bay: "Bay 2 • Ganti Oli & Kampas Rem", status: "Selesai", date: "Hari ini, 11:15" },
    { id: "BON-003", customer: "Honda Brio Satya E (D 4501 XY)", total: 320000, bay: "Bay 3 • Spooring & Balancing", status: "Antre", date: "Hari ini, 13:00" },
  ];

  const isOwner = session.role === "OWNER";
  const isKasir = session.role === "KASIR";
  const isMekanik = session.role === "MEKANIK";

  return (
    <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "2.5rem 1.5rem", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      
      {/* NAVIGATION BAR BREADCRUMB */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#64748b" }}>
          <Link href="/" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: 600 }}>Lobi Utama</Link>
          <span>/</span>
          <span style={{ color: "#0f172a", fontWeight: 700 }}>Modul 14: Multi-Role RBAC</span>
        </div>
        <span style={{ 
          fontSize: "0.75rem", 
          fontWeight: 800, 
          letterSpacing: "0.05em", 
          textTransform: "uppercase", 
          padding: "4px 10px", 
          borderRadius: "9999px", 
          background: "#f1f5f9", 
          color: "#475569",
          border: "1px solid #e2e8f0"
        }}>
          Praktek Industri B2B
        </span>
      </div>

      {/* HEADER UTAMA */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.03em", margin: "0 0 0.5rem 0" }}>
          Meja VIP & Kasir Khusus (Role-Based Access)
        </h1>
        <p style={{ fontSize: "0.95rem", color: "#64748b", margin: 0, maxWidth: "720px", lineHeight: 1.6 }}>
          Simulasi arsitektur otorisasi bertingkat ala SaaS modern. Memisahkan visual antarmuka dan memproteksi mutasi data sensitif di sisi server.
        </p>
      </div>

      {/* ROLE SWITCHER CARD INTERAKTIF */}
      <div style={{ 
        background: "#ffffff", 
        border: "1px solid #e2e8f0", 
        borderRadius: "16px", 
        padding: "1.5rem", 
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)",
        marginBottom: "2rem"
      }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ 
              width: "48px", 
              height: "48px", 
              borderRadius: "12px", 
              background: isOwner ? "#f3e8ff" : isKasir ? "#eff6ff" : "#ecfdf5",
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              fontSize: "1.5rem"
            }}>
              {isOwner ? "👑" : isKasir ? "🏷️" : "🔧"}
            </div>
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", display: "block" }}>
                Identitas Sesi Aktif
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "2px" }}>
                <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>
                  {session.name}
                </span>
                <span style={{ 
                  fontSize: "0.7rem", 
                  fontWeight: 800, 
                  padding: "2px 8px", 
                  borderRadius: "6px", 
                  background: isOwner ? "#7e22ce" : isKasir ? "#2563eb" : "#059669",
                  color: "#ffffff"
                }}>
                  {session.role}
                </span>
              </div>
            </div>
          </div>

          {/* BUTTON GROUP SWITCHER */}
          <form action={switchRoleAction} style={{ display: "flex", gap: "0.5rem" }}>
            <button
              type="submit"
              name="role"
              value="OWNER"
              style={{
                cursor: "pointer",
                padding: "8px 14px",
                fontSize: "0.8rem",
                fontWeight: 700,
                borderRadius: "8px",
                border: isOwner ? "2px solid #7e22ce" : "1px solid #cbd5e1",
                background: isOwner ? "#7e22ce" : "#ffffff",
                color: isOwner ? "#ffffff" : "#475569",
                transition: "all 0.15s ease",
                boxShadow: isOwner ? "0 2px 8px rgba(126,34,206,0.25)" : "none"
              }}
            >
              👑 Owner (Bos)
            </button>
            <button
              type="submit"
              name="role"
              value="KASIR"
              style={{
                cursor: "pointer",
                padding: "8px 14px",
                fontSize: "0.8rem",
                fontWeight: 700,
                borderRadius: "8px",
                border: isKasir ? "2px solid #2563eb" : "1px solid #cbd5e1",
                background: isKasir ? "#2563eb" : "#ffffff",
                color: isKasir ? "#ffffff" : "#475569",
                transition: "all 0.15s ease",
                boxShadow: isKasir ? "0 2px 8px rgba(37,99,235,0.25)" : "none"
              }}
            >
              🏷️ Kasir (POS)
            </button>
            <button
              type="submit"
              name="role"
              value="MEKANIK"
              style={{
                cursor: "pointer",
                padding: "8px 14px",
                fontSize: "0.8rem",
                fontWeight: 700,
                borderRadius: "8px",
                border: isMekanik ? "2px solid #059669" : "1px solid #cbd5e1",
                background: isMekanik ? "#059669" : "#ffffff",
                color: isMekanik ? "#ffffff" : "#475569",
                transition: "all 0.15s ease",
                boxShadow: isMekanik ? "0 2px 8px rgba(5,150,105,0.25)" : "none"
              }}
            >
              🔧 Mekanik
            </button>
          </form>
        </div>
      </div>

      {/* SEKSI 1: BRANKAS FINANSIAL RAHASIA (EXCLUSIVE OWNER) */}
      {isOwner ? (
        <div style={{ 
          background: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)", 
          border: "1px solid #e9d5ff", 
          borderRadius: "16px", 
          padding: "1.75rem", 
          marginBottom: "2rem",
          boxShadow: "0 2px 8px rgba(126,34,206,0.06)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span style={{ fontSize: "1.3rem" }}>👑</span>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#581c87", margin: 0 }}>
                Brankas Eksekutif & Finansial Cabang
              </h3>
            </div>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, background: "#7e22ce", color: "#ffffff", padding: "3px 10px", borderRadius: "9999px" }}>
              Level Akses: Super-Admin Only
            </span>
          </div>
          <p style={{ fontSize: "0.85rem", color: "#6b21a8", margin: "0 0 1.25rem 0", lineHeight: 1.5 }}>
            Data ini hanya dirender dari server bila token sesi teridentifikasi sebagai <strong>OWNER</strong>. Kasir dan Mekanik dilarang melihat angka margin dan modal.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e9d5ff" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Omset Kotor Hari Ini</span>
              <p style={{ fontSize: "1.6rem", fontWeight: 900, color: "#059669", margin: "0.35rem 0 0 0" }}>Rp 18.750.000</p>
              <span style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 600 }}>↑ +14.2% dari target</span>
            </div>
            <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e9d5ff" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Laba Bersih (Net Margin)</span>
              <p style={{ fontSize: "1.6rem", fontWeight: 900, color: "#7e22ce", margin: "0.35rem 0 0 0" }}>Rp 6.420.000</p>
              <span style={{ fontSize: "0.75rem", color: "#7e22ce", fontWeight: 600 }}>Margin sehat: 34.2%</span>
            </div>
            <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e9d5ff" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Uang Fisik di Laci Kasir</span>
              <p style={{ fontSize: "1.6rem", fontWeight: 900, color: "#2563eb", margin: "0.35rem 0 0 0" }}>Rp 2.100.000</p>
              <span style={{ fontSize: "0.75rem", color: "#2563eb", fontWeight: 600 }}>Rekonsiliasi kas cocok</span>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ 
          background: "#f8fafc", 
          border: "2px dashed #cbd5e1", 
          borderRadius: "16px", 
          padding: "1.75rem", 
          marginBottom: "2rem",
          textAlign: "center"
        }}>
          <span style={{ fontSize: "1.5rem" }}>🔒</span>
          <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#334155", margin: "0.5rem 0 0.25rem 0" }}>
            Brankas Finansial Terkunci Rapat
          </h3>
          <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>
            Anda saat ini login sebagai <strong>{session.role}</strong>. Hak akses metrik keuangan disembunyikan langsung dari dapur server.
          </p>
        </div>
      )}

      {/* SEKSI 2: TABEL OPERASIONAL BERSAMA DENGAN HAK AKSES ADAPTIF */}
      <div style={{ 
        background: "#ffffff", 
        border: "1px solid #e2e8f0", 
        borderRadius: "16px", 
        overflow: "hidden", 
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        marginBottom: "2rem"
      }}>
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #f1f5f9", background: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
              Antrian Nota Servis Kendaraan
            </h3>
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
              Kolom dan tombol bereaksi adaptif terhadap peran pengguna aktif
            </span>
          </div>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "4px 8px", borderRadius: "6px", background: "#e2e8f0", color: "#475569" }}>
            Total: 3 Kendaraan
          </span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#f8fafc", color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>
                <th style={{ padding: "12px 20px", fontWeight: 700 }}>ID Nota</th>
                <th style={{ padding: "12px 20px", fontWeight: 700 }}>Unit Kendaraan</th>
                {!isMekanik && <th style={{ padding: "12px 20px", fontWeight: 700 }}>Total Biaya</th>}
                <th style={{ padding: "12px 20px", fontWeight: 700 }}>Stall Pengerjaan</th>
                <th style={{ padding: "12px 20px", fontWeight: 700 }}>Status</th>
                <th style={{ padding: "12px 20px", fontWeight: 700, textAlign: "right" }}>Otoritas Aksi</th>
              </tr>
            </thead>
            <tbody>
              {daftarNota.map((nota, idx) => (
                <tr key={nota.id} style={{ borderBottom: idx < daftarNota.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                  <td style={{ padding: "14px 20px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "#0f172a" }}>
                    {nota.id}
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ fontWeight: 700, color: "#0f172a" }}>{nota.customer}</div>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{nota.date}</div>
                  </td>
                  {!isMekanik && (
                    <td style={{ padding: "14px 20px", fontWeight: 800, color: "#059669" }}>
                      Rp {nota.total.toLocaleString("id-ID")}
                    </td>
                  )}
                  <td style={{ padding: "14px 20px", color: "#475569", fontWeight: 600 }}>
                    {nota.bay}
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <span style={{ 
                      fontSize: "0.7rem", 
                      fontWeight: 800, 
                      padding: "3px 8px", 
                      borderRadius: "6px",
                      background: nota.status === "Selesai" ? "#ecfdf5" : nota.status === "Antre" ? "#fef3c7" : "#eff6ff",
                      color: nota.status === "Selesai" ? "#047857" : nota.status === "Antre" ? "#b45309" : "#1d4ed8",
                      border: nota.status === "Selesai" ? "1px solid #a7f3d0" : nota.status === "Antre" ? "1px solid #fde68a" : "1px solid #bfdbfe"
                    }}>
                      {nota.status}
                    </span>
                  </td>
                  <td style={{ padding: "14px 20px", textAlign: "right" }}>
                    {isOwner ? (
                      <form action={deleteSensitiveDataAction} style={{ display: "inline-block" }}>
                        <input type="hidden" name="itemId" value={nota.id} />
                        <button
                          type="submit"
                          style={{
                            cursor: "pointer",
                            padding: "6px 12px",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            borderRadius: "6px",
                            border: "1px solid #fecaca",
                            background: "#fef2f2",
                            color: "#dc2626",
                            transition: "all 0.15s ease"
                          }}
                        >
                          Hapus Permanen
                        </button>
                      </form>
                    ) : (
                      <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontStyle: "italic", fontWeight: 500 }}>
                        Akses Terkunci
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER KNOWLEDGE BOX EKSKLUSIF */}
      <div style={{ 
        background: "#f8fafc", 
        border: "1px solid #e2e8f0", 
        borderRadius: "12px", 
        padding: "1.25rem 1.5rem", 
        fontSize: "0.85rem",
        color: "#475569",
        lineHeight: 1.6
      }}>
        <strong style={{ color: "#0f172a", display: "block", marginBottom: "0.25rem" }}>
          🛡️ Prinsip Keamanan Dua Lapis (Defense-in-Depth):
        </strong>
        <span>
          1. <strong>Lapis Antarmuka:</strong> Menjaga kebersihan pandangan kerja karyawan (Kasir & Mekanik tidak dibebani angka laba).<br/>
          2. <strong>Lapis Server Action:</strong> Fungsi eksekusi di <code>actions.ts</code> memeriksa ulang hak akses: <code>if (session.role !== &apos;OWNER&apos;) throw new Error(...)</code>. Mencegah manipulasi DOM / DevTools dari pihak luar.
        </span>
      </div>

    </div>
  );
}

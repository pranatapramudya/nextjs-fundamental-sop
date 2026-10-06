import Link from "next/link";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

interface MenuRow {
  id: number;
  nama: string;
  harga: number;
  stok: number;
}

export default async function HalamanKulkasDatabase() {
  const daftarMenu = db.prepare("SELECT * FROM menu_padang ORDER BY id DESC").all() as MenuRow[];

  async function tambahMenuDBAction(formData: FormData) {
    "use server";
    const nama = formData.get("nama") as string;
    const harga = Number(formData.get("harga"));
    const stok = Number(formData.get("stok")) || 10;
    if (!nama || !harga) return;
    const stmt = db.prepare("INSERT INTO menu_padang (nama, harga, stok) VALUES (?, ?, ?)");
    stmt.run(nama, harga, stok);
    revalidatePath("/kulkas-database");
  }

  async function kurangiStokAction(id: number) {
    "use server";
    const stmt = db.prepare("UPDATE menu_padang SET stok = MAX(0, stok - 1) WHERE id = ?");
    stmt.run(id);
    revalidatePath("/kulkas-database");
  }

  async function hapusMenuAction(id: number) {
    "use server";
    const stmt = db.prepare("DELETE FROM menu_padang WHERE id = ?");
    stmt.run(id);
    revalidatePath("/kulkas-database");
  }

  return (
    <div style={{ padding: "1.5rem 1rem 3rem 1rem", maxWidth: "800px", margin: "0 auto" }}>
      {/* Tombol Back */}
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          color: "#475569",
          textDecoration: "none",
          fontSize: "0.85rem",
          fontWeight: 600,
          marginBottom: "1.25rem",
        }}
      >
        ← Kembali ke Lobi Utama
      </Link>

      {/* Header Modul */}
      <div style={{ marginBottom: "1.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
          <span style={{ fontSize: "1.4rem" }}>🧊</span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0f766e", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            MODUL 08 • DATABASE SQL PERMANEN
          </span>
        </div>
        <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, margin: "0 0 0.5rem 0", color: "#0f172a" }}>
          Kulkas Database SQLite (CRUD)
        </h1>
        <p style={{ margin: 0, color: "#64748b", fontSize: "0.9rem", lineHeight: 1.5 }}>
          Data disimpan nyata di file hardisk <code>restoran.db</code>. Mau server restart atau laptop mati, data tetap tersimpan permanen.
        </p>
      </div>

      {/* FORM INPUT CLEAN LIGHT */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "14px",
          padding: "1.25rem",
          marginBottom: "2rem",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        }}
      >
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "0.98rem", color: "#0f766e", fontWeight: 700 }}>
          ➕ Tambah Menu Masakan (CREATE - INSERT)
        </h3>

        <form action={tambahMenuDBAction} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
              Nama Masakan
            </label>
            <input
              name="nama"
              placeholder="Contoh: Rendang Limpa Gurih"
              required
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "8px",
                backgroundColor: "#f8fafc",
                border: "1px solid #cbd5e1",
                color: "#0f172a",
                fontSize: "0.9rem",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                Harga (Rp)
              </label>
              <input
                name="harga"
                type="number"
                placeholder="25000"
                required
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  borderRadius: "8px",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #cbd5e1",
                  color: "#0f172a",
                  fontSize: "0.9rem",
                  boxSizing: "border-box",
                  outline: "none",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                Stok Awal
              </label>
              <input
                name="stok"
                type="number"
                defaultValue={10}
                required
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  borderRadius: "8px",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #cbd5e1",
                  color: "#0f172a",
                  fontSize: "0.9rem",
                  boxSizing: "border-box",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: "#0d9488",
              color: "white",
              fontWeight: 700,
              fontSize: "0.9rem",
              border: "none",
              cursor: "pointer",
              marginTop: "0.5rem",
            }}
          >
            Simpan ke Database Permanen
          </button>
        </form>
      </div>

      {/* LIST DATA STOK CLEAN LIGHT */}
      <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "1rem" }}>
        📋 Daftar Hidangan di Database ({daftarMenu.length} Menu)
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {daftarMenu.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "0.75rem",
              padding: "1rem",
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div>
              <div style={{ fontSize: "1.02rem", fontWeight: 700, color: "#0f172a" }}>
                {item.nama}
              </div>
              <div style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "2px" }}>
                Rp {item.harga.toLocaleString("id-ID")} • Sisa:{" "}
                <span style={{ fontWeight: 700, color: item.stok > 0 ? "#059669" : "#dc2626" }}>
                  {item.stok > 0 ? `${item.stok} porsi` : "HABIS!"}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <form action={kurangiStokAction.bind(null, item.id)}>
                <button
                  type="submit"
                  disabled={item.stok === 0}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: item.stok > 0 ? "#fef3c7" : "#f1f5f9",
                    color: item.stok > 0 ? "#b45309" : "#94a3b8",
                    border: `1px solid ${item.stok > 0 ? "#fde68a" : "#e2e8f0"}`,
                    borderRadius: "6px",
                    cursor: item.stok > 0 ? "pointer" : "not-allowed",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                >
                  -1 Porsi
                </button>
              </form>

              <form action={hapusMenuAction.bind(null, item.id)}>
                <button
                  type="submit"
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#fef2f2",
                    color: "#dc2626",
                    border: "1px solid #fecaca",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                >
                  🗑️ Hapus
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useActionState, useState } from "react";
import {
  buatPesananAman,
  simulasiLogin,
  simulasiLogout,
  batalkanPesananAman,
} from "./actions";

interface ClientProps {
  session: { userId: string; tenantId: string; role: string } | null;
  pesananList: Array<{
    id: number;
    tenant_id: string;
    nama_pelanggan: string;
    menu: string;
    total: number;
    status: string;
  }>;
}

export default function SecurityPlaygroundClient({
  session,
  pesananList,
}: ClientProps) {
  const [state, formAction, isPending] = useActionState(buatPesananAman, null);
  const [idorOrderId, setIdorOrderId] = useState<string>("");
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Uji Coba Cek Cookie dari JavaScript Browser (XSS Proof)
  const cekCookieBrowser = () => {
    const rawCookies = document.cookie;
    if (!rawCookies || !rawCookies.includes("auth_session")) {
      alert(
        "🛡️ PEMBUKTIAN HTTP-ONLY BERHASIL!\n\n" +
          "Browser console / JavaScript mengecek: document.cookie\n" +
          "Hasil: 'auth_session' TIDAK TERLIHAT di browser!\n" +
          "Cookie ini kebal 100% dari pencurian script jahat (XSS)!"
      );
    } else {
      alert("Cookie terbaca: " + rawCookies);
    }
  };

  const handleIdorDelete = async () => {
    if (!idorOrderId) return;
    setIsProcessing(true);
    setActionMessage(null);
    const res = await batalkanPesananAman(Number(idorOrderId));
    setIsProcessing(false);
    setActionMessage(res.success ? res.message : (res.error || "Terjadi kesalahan"));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* ======================================================== */}
      {/* 🛡️ PRAKTEK C: HTTP-ONLY COOKIE AUTH STATUS */}
      {/* ======================================================== */}
      <div
        style={{
          border: "2px solid #8b5cf6",
          borderRadius: "12px",
          padding: "1.5rem",
          backgroundColor: "#f5f3ff",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, color: "#6d28d9" }}>
            🍪 Praktek C: HttpOnly Cookie vs LocalStorage
          </h2>
          <button
            onClick={cekCookieBrowser}
            style={{
              padding: "6px 12px",
              backgroundColor: "#7c3aed",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: "bold",
            }}
          >
            🧪 Tes Intip document.cookie
          </button>
        </div>

        <p style={{ color: "#5b21b6", fontSize: "0.9rem", margin: "0.5rem 0 1rem 0" }}>
          Cookie sesi disimpan di server dengan atribut <code>httpOnly: true</code>. Browser
          menolak akses script JavaScript apa pun ke cookie ini sehingga kebal pencurian sesi.
        </p>

        {session ? (
          <div
            style={{
              backgroundColor: "white",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid #ddd6fe",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <span style={{ color: "#16a34a", fontWeight: "bold" }}>● SEDANG LOGIN:</span>{" "}
              <strong>{session.tenantId.toUpperCase()}</strong> (User ID: {session.userId})
            </div>
            <button
              type="button"
              onClick={async () => {
                await simulasiLogout();
              }}
              style={{
                padding: "6px 14px",
                backgroundColor: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "#fff1f2",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid #fecdd3",
            }}
          >
            <p style={{ margin: "0 0 0.75rem 0", color: "#9f1239", fontWeight: "bold" }}>
              ⚠️ Anda Belum Login (Sesi Kosong)
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={() => simulasiLogin("cabang-jakarta")}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                🏢 Login Cabang Jakarta
              </button>
              <button
                onClick={() => simulasiLogin("cabang-bandung")}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#059669",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                🏢 Login Cabang Bandung
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 🛡️ PRAKTEK A: SERVER ACTION VALIDATION & AUTH GUARD */}
      {/* ======================================================== */}
      <div
        style={{
          border: "2px solid #0284c7",
          borderRadius: "12px",
          padding: "1.5rem",
          backgroundColor: "#f0f9ff",
        }}
      >
        <h2 style={{ margin: "0 0 0.5rem 0", color: "#0369a1" }}>
          🔒 Praktek A: Server Action Guard & Validasi Zod
        </h2>
        <p style={{ color: "#075985", fontSize: "0.9rem", margin: "0 0 1rem 0" }}>
          Server Action ini dilindungi oleh <strong>Auth Guard</strong> (menolak eksekusi tanpa
          sesi) dan <strong>Zod Schema</strong> (menolak nama &lt; 3 huruf, karakter aneh, atau angka negatif).
        </p>

        <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "450px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "bold", marginBottom: "4px" }}>
              Nama Pelanggan (Min. 3 Huruf):
            </label>
            <input
              name="namaPelanggan"
              placeholder="Contoh: Pak Haji Bambang"
              style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #bae6fd" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "bold", marginBottom: "4px" }}>
              Pilihan Menu:
            </label>
            <select
              name="menu"
              style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #bae6fd" }}
            >
              <option value="Rendang Komplit">Rendang Komplit (Rp 28.000)</option>
              <option value="Ayam Pop Istimewa">Ayam Pop Istimewa (Rp 22.000)</option>
              <option value="Gulai Cincang">Gulai Cincang (Rp 30.000)</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "bold", marginBottom: "4px" }}>
              Total Bayar (Rp):
            </label>
            <input
              type="number"
              name="total"
              defaultValue="28000"
              style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #bae6fd" }}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            style={{
              padding: "10px",
              backgroundColor: isPending ? "#94a3b8" : "#0284c7",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: isPending ? "not-allowed" : "pointer",
            }}
          >
            {isPending ? "Memproses Validasi..." : "Kirim via Server Action"}
          </button>

          {state && (
            <div
              style={{
                marginTop: "0.5rem",
                padding: "10px",
                borderRadius: "6px",
                fontSize: "0.9rem",
                backgroundColor: state.success ? "#dcfce7" : "#fee2e2",
                color: state.success ? "#15803d" : "#b91c1c",
                fontWeight: "bold",
                border: `1px solid ${state.success ? "#86efac" : "#fca5a5"}`,
              }}
            >
              {state.success ? state.message : state.error}
            </div>
          )}
        </form>
      </div>

      {/* ======================================================== */}
      {/* 🛡️ PRAKTEK B: MULTI-TENANT ISOLATION & ANTI-IDOR */}
      {/* ======================================================== */}
      <div
        style={{
          border: "2px solid #059669",
          borderRadius: "12px",
          padding: "1.5rem",
          backgroundColor: "#ecfdf5",
        }}
      >
        <h2 style={{ margin: "0 0 0.5rem 0", color: "#047857" }}>
          🏢 Praktek B: Multi-Tenant Data Isolation & Anti-IDOR
        </h2>
        <p style={{ color: "#065f46", fontSize: "0.9rem", margin: "0 0 1rem 0" }}>
          Daftar pesanan di bawah ini difilter murni berdasarkan tenant session yang sedang aktif.
          Cabang Bandung <strong>tidak akan pernah bisa melihat atau menghapus</strong> data milik Cabang Jakarta!
        </p>

        <div style={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #a7f3d0", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ backgroundColor: "#d1fae5", textAlign: "left" }}>
                <th style={{ padding: "8px 12px" }}>ID</th>
                <th style={{ padding: "8px 12px" }}>Tenant / Cabang</th>
                <th style={{ padding: "8px 12px" }}>Pelanggan</th>
                <th style={{ padding: "8px 12px" }}>Menu</th>
                <th style={{ padding: "8px 12px" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {pesananList.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "12px", textAlign: "center", color: "#6b7280" }}>
                    Tidak ada pesanan untuk cabang ini. Silakan login atau tambah pesanan.
                  </td>
                </tr>
              ) : (
                pesananList.map((p) => (
                  <tr key={p.id} style={{ borderBottom: "1px solid #f0fdf4" }}>
                    <td style={{ padding: "8px 12px", fontWeight: "bold" }}>#{p.id}</td>
                    <td style={{ padding: "8px 12px" }}>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          backgroundColor: p.tenant_id === "cabang-jakarta" ? "#dbeafe" : "#dcfce7",
                          color: p.tenant_id === "cabang-jakarta" ? "#1e40af" : "#166534",
                          fontWeight: "bold",
                        }}
                      >
                        {p.tenant_id}
                      </span>
                    </td>
                    <td style={{ padding: "8px 12px" }}>{p.nama_pelanggan}</td>
                    <td style={{ padding: "8px 12px" }}>{p.menu}</td>
                    <td style={{ padding: "8px 12px" }}>Rp {p.total.toLocaleString("id-ID")}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Simulasi Serangan IDOR */}
        <div style={{ marginTop: "1rem", backgroundColor: "#fff7ed", padding: "1rem", borderRadius: "8px", border: "1px solid #ffedd5" }}>
          <h4 style={{ margin: "0 0 0.5rem 0", color: "#c2410c" }}>
            💣 Uji Coba Serangan IDOR (Coba Hapus Order Milik Cabang Lain)
          </h4>
          <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.85rem", color: "#9a3412" }}>
            Misal Anda login sebagai Cabang Bandung, lalu mencoba menghapus Order ID #1 (milik Jakarta):
          </p>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <input
              type="number"
              placeholder="Masukkan ID Pesanan (misal: 1)"
              value={idorOrderId}
              onChange={(e) => setIdorOrderId(e.target.value)}
              style={{ padding: "8px", borderRadius: "6px", border: "1px solid #fed7aa", width: "240px" }}
            />
            <button
              onClick={handleIdorDelete}
              disabled={isProcessing}
              style={{
                padding: "8px 16px",
                backgroundColor: "#ea580c",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: isProcessing ? "not-allowed" : "pointer",
              }}
            >
              {isProcessing ? "Menguji..." : "Hapus Pesanan (Uji IDOR)"}
            </button>
          </div>
          {actionMessage && (
            <div style={{ marginTop: "0.5rem", fontSize: "0.85rem", fontWeight: "bold" }}>
              {actionMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

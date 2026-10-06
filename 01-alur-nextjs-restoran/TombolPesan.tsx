"use client";

// 🤵 PELAYAN (Client Component)
// Ada mantra sakti "use client" di baris paling atas!
// Tugas Pelayan: Siaga di meja depan pelanggan, nanggapin klik tombol, nambah pesanan.
import { useState } from "react";

export default function TombolPesan({ namaMenu }: { namaMenu: string }) {
  // Pelayan nyatet di notes kecilnya berapa porsi yang dipesen pelanggan
  const [jumlahPorsi, setJumlahPorsi] = useState(0);

  const handleTambahPesanan = () => {
    setJumlahPorsi((prev) => prev + 1);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <button
        onClick={handleTambahPesanan}
        style={{
          padding: "6px 12px",
          backgroundColor: "#d97706",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        + Pesan Porsi
      </button>

      {jumlahPorsi > 0 && (
        <span style={{ fontSize: "0.9rem", color: "#16a34a", fontWeight: "bold" }}>
          ✅ Pelayan: "{jumlahPorsi} porsi {namaMenu} siap dicatet bos!"
        </span>
      )}
    </div>
  );
}

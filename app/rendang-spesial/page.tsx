import Link from "next/link";
import TombolPesan from "@/01-alur-nextjs-restoran/TombolPesan";

// 👨‍🍳 KOKI MEMASAK RENDANG SPESIAL (DIBIKIN SENGAJA LAMA 3 DETIK)
async function masakRendangLama() {
  // Simulasi masak santan 8 jam = delay 3000 ms (3 detik)
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return {
    nama: "Rendang Daging Sapi Premium 8 Jam",
    harga: "Rp 35.000",
    deskripsi: "Dimasak dengan 24 rempah rahasia Bukittinggi dan santan kelapa tua murni.",
    koki: "Chef Uni Rosmawati (Master Koki)",
  };
}

export default async function HalamanRendangSpesial() {
  // Koki mulai masak lama
  const menu = await masakRendangLama();

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <div
        style={{
          border: "2px solid #16a34a",
          borderRadius: "8px",
          padding: "1.5rem",
          maxWidth: "550px",
          backgroundColor: "#f0fdf4",
        }}
      >
        <span
          style={{
            backgroundColor: "#16a34a",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "0.8rem",
            fontWeight: "bold",
          }}
        >
          ✅ SUDAH MATANG SEMPURNA!
        </span>

        <h1 style={{ color: "#14532d", margin: "0.75rem 0 0.5rem 0" }}>🥘 {menu.nama}</h1>
        <p style={{ margin: "0 0 0.5rem 0", color: "#15803d", fontWeight: "bold" }}>
          Harga: {menu.harga}
        </p>
        <p style={{ color: "#166534", fontSize: "0.95rem" }}>{menu.deskripsi}</p>
        <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>
          Dimasak oleh: <strong>{menu.koki}</strong>
        </p>

        {/* Pelayan siap menerima pesanan */}
        <div style={{ marginTop: "1rem" }}>
          <TombolPesan namaMenu={menu.nama} />
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

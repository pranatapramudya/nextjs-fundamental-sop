import Link from "next/link";

// Ceritanya ini data menu di restoran kita
const DAFTAR_MENU = [
  { slug: "rendang", nama: "Rendang Daging Sapi", harga: "Rp 25.000" },
  { slug: "ayam-pop", nama: "Ayam Pop Gurih", harga: "Rp 20.000" },
  { slug: "gulai-tunjang", nama: "Gulai Tunjang Mantap", harga: "Rp 28.000" },
];

export default function HalamanDaftarMenu() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>📋 Ruang Daftar Menu Makanan</h1>
      <p>Klik nama makanannya buat liat detail resep & porsi (Dynamic Route):</p>

      <ul>
        {DAFTAR_MENU.map((menu) => (
          <li key={menu.slug} style={{ marginBottom: "0.8rem" }}>
            {/* Link ini mengarah ke nomor meja spesifik /menu/[id] */}
            <Link
              href={`/menu/${menu.slug}`}
              style={{
                fontSize: "1.1rem",
                color: "#d97706",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              🍽️ {menu.nama} ({menu.harga}) ➡️
            </Link>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "2rem" }}>
        <Link href="/" style={{ color: "#2563eb", textDecoration: "underline" }}>
          ⬅️ Balik ke Lobi Utama
        </Link>
      </div>
    </div>
  );
}

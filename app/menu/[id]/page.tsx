import Link from "next/link";
import TombolPesan from "@/01-alur-nextjs-restoran/TombolPesan";

// Database resep detail menu
const DETAIL_RESEP: Record<string, { nama: string; porsi: string; deskripsi: string; harga: string }> = {
  rendang: {
    nama: "Rendang Daging Sapi",
    porsi: "1 Potong Tebal + Kuah Kental",
    deskripsi: "Daging sapi pilihan dimasak santan kelapa selama 8 jam dengan rempah khas Minang.",
    harga: "Rp 25.000",
  },
  "ayam-pop": {
    nama: "Ayam Pop Gurih",
    porsi: "1 Potong Dada / Paha + Sambal Tomat",
    deskripsi: "Ayam kampung empuk direbus air kelapa, digoreng kilat dalam minyak panas.",
    harga: "Rp 20.000",
  },
  "gulai-tunjang": {
    nama: "Gulai Tunjang Mantap",
    porsi: "1 Mangkuk Tunjang Kenyal",
    deskripsi: "Kikil sapi empuk berselimut kuah gulai pedas gurih kaya kunyit dan serai.",
    harga: "Rp 28.000",
  },
};

// 👨‍🍳 KOKI MEMBACA NOMOR MEJA LEWAT PARAMS!
export default async function HalamanDetailMenu({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Di Next.js terbaru, params itu bersifat Promise yang harus di-await oleh Koki
  const { id } = await params;
  const menu = DETAIL_RESEP[id];

  if (!menu) {
    return (
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h2>❌ Menu "{id}" Tidak Ditemukan di Kulkas Dapur!</h2>
        <Link href="/menu" style={{ color: "#2563eb" }}>⬅️ Balik ke Daftar Menu</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <p style={{ color: "#6b7280" }}>📍 Lu lagi ada di meja detail menu: <code>/menu/{id}</code></p>
      <h1>🥘 {menu.nama}</h1>
      <p><strong>Harga:</strong> {menu.harga}</p>
      <p><strong>Porsi:</strong> {menu.porsi}</p>
      <p><strong>Rahasia Koki:</strong> {menu.deskripsi}</p>

      {/* 🤵 Si Pelayan yang kita pelajari di Modul 1 ikut dipanggil ke meja ini! */}
      <div style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "#fef3c7", borderRadius: "8px", width: "fit-content" }}>
        <p style={{ margin: "0 0 0.5rem 0", fontWeight: "bold" }}>Pesen Sekarang:</p>
        <TombolPesan namaMenu={menu.nama} />
      </div>

      <div style={{ marginTop: "2rem" }}>
        <Link href="/menu" style={{ color: "#2563eb", textDecoration: "underline" }}>
          ⬅️ Balik ke Daftar Menu
        </Link>
      </div>
    </div>
  );
}

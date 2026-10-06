import TombolPesan from "./TombolPesan";

// 👨‍🍳 KOKI (Server Component)
// Default-nya komponen Next.js itu Koki di dapur belakang layar.
// Tugas Koki: Buka kulkas (simulasi DB), masak rendang, kirim hasil jadinya ke meja.
async function ambilMenuDariKulkas() {
  // Ceritanya Koki lagi rogoh kulkas / ambil stok bahan (delay 1 detik)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    { id: 1, nama: "Rendang Daging Sapi", harga: "Rp 25.000" },
    { id: 2, nama: "Ayam Pop Gurih", harga: "Rp 20.000" },
    { id: 3, nama: "Gulai Tunjang Mantap", harga: "Rp 28.000" },
  ];
}

export default async function HalamanRestoran() {
  // Koki mulai beraksi masak dan siapin piring di dapur
  const daftarMenu = await ambilMenuDariKulkas();

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🍛 Selamat Datang di Rumah Makan Padang Minang Express</h1>
      <p>Makanan di bawah ini dimasak langsung sama <strong>Koki (Server Component)</strong> di dapur!</p>

      <ul>
        {daftarMenu.map((menu) => (
          <li key={menu.id} style={{ marginBottom: "1rem" }}>
            <strong>{menu.nama}</strong> - {menu.harga}
            {/* 🤵 PELAYAN (Client Component) disuruh stand by di samping piring */}
            <div style={{ marginTop: "0.5rem" }}>
              <TombolPesan namaMenu={menu.nama} />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

import Link from "next/link";
import { revalidatePath } from "next/cache";

// Simulasi database menu sementara di server dapur
let DB_MENU_TAMBAHAN: Array<{ id: number; nama: string; harga: string }> = [
  { id: 1, nama: "Telur Dadar Barendo", harga: "Rp 12.000" },
  { id: 2, nama: "Perkedel Kentang Padang", harga: "Rp 8.000" },
];

export default async function HalamanRequestMenu() {
  // 👨‍🍳 SERVER ACTION: Kertas Bon Orderan Masuk Dapur
  async function tambahMenuAction(formData: FormData) {
    "use server"; // 👈 MANTRA SAKTI BACKEND! Fungsi ini cuma jalan di server dapur!

    const nama = formData.get("namaMenu") as string;
    const harga = formData.get("hargaMenu") as string;

    // Validasi sederhana: nama menu kaga boleh kosong
    if (!nama || !harga) {
      return;
    }

    // Masukin menu baru ke database dapur
    DB_MENU_TAMBAHAN.push({
      id: Date.now(),
      nama,
      harga: `Rp ${Number(harga).toLocaleString("id-ID")}`,
    });

    console.log(`[DAPUR] Koki nerima request menu baru: ${nama} (${harga})`);

    // Teriakin dapur buat refresh tampilan halaman tanpa reload browser user!
    revalidatePath("/request-menu");
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>📝 Form Titip Menu Baru ke Koki (Server Actions)</h1>
      <p style={{ color: "#4b5563" }}>
        Kirim data form langsung ke server tanpa perlu bikin file API terpisah atau <code>axios.post</code>!
      </p>

      {/* FORM HTML MANGGIL LANGSUNG FUNGSI SERVER! */}
      <form
        action={tambahMenuAction}
        style={{
          border: "2px solid #3b82f6",
          padding: "1.5rem",
          borderRadius: "8px",
          maxWidth: "450px",
          backgroundColor: "#eff6ff",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h3 style={{ margin: 0, color: "#1e40af" }}>Tambah Menu Rekomendasi Lu</h3>

        <div>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "bold" }}>
            Nama Menu:
          </label>
          <input
            type="text"
            name="namaMenu"
            required
            placeholder="Misal: Paru Goreng Renyah"
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #93c5fd" }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "bold" }}>
            Harga (Angka):
          </label>
          <input
            type="number"
            name="hargaMenu"
            required
            placeholder="Misal: 18000"
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #93c5fd" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          🚀 Kirim Bon ke Dapur (Server Action)
        </button>
      </form>

      {/* DAFTAR MENU YANG BERHASIL DISIMPAN KE SERVER */}
      <div style={{ marginTop: "2rem" }}>
        <h2>🍽️ Daftar Menu Rekomendasi di Dapur Sekarang:</h2>
        <ul>
          {DB_MENU_TAMBAHAN.map((item) => (
            <li key={item.id} style={{ marginBottom: "0.5rem" }}>
              <strong>{item.nama}</strong> - {item.harga}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <Link href="/" style={{ color: "#2563eb", textDecoration: "underline" }}>
          ⬅️ Balik ke Lobi Utama
        </Link>
      </div>
    </div>
  );
}

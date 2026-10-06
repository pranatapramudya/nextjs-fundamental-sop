import Link from "next/link";

interface SupplierItem {
  id: number;
  title: string;
  price: number;
  category: string;
}

// 👨‍🍳 KOKI BELANJA KE PASAR INDUK (API PUBLIK DUMMYJSON)
async function belanjaKePasarInduk(): Promise<SupplierItem[]> {
  // Simulasi Koki manggil API pasar luar buat kulakan bahan makanan/sayur
  const res = await fetch("https://dummyjson.com/products/category/groceries", {
    // Koki nyimpen bahan ini di gudang selama 60 detik (Revalidate)
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Gagal belanja ke pasar induk!");
  }

  const data = await res.json();
  return data.products;
}

export default async function HalamanGudangBahan() {
  // Koki belanja bahan langsung di Server tanpa useEffect atau useState!
  const bahanMakanan = await belanjaKePasarInduk();

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🛒 Gudang Bahan Baku Restoran (Data Fetching API)</h1>
      <p style={{ color: "#4b5563" }}>
        Data di bawah ini diambil langsung sama <strong>Koki (Server)</strong> dari API Pasar Induk:
        <br />
        <code>https://dummyjson.com/products/category/groceries</code>
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
          marginTop: "1.5rem",
        }}
      >
        {bahanMakanan.slice(0, 6).map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "1rem",
              backgroundColor: "#f9fafb",
            }}
          >
            <h3 style={{ margin: "0 0 0.5rem 0", color: "#1f2937" }}>{item.title}</h3>
            <p style={{ margin: 0, color: "#059669", fontWeight: "bold" }}>
              Harga Pasar: ${item.price}
            </p>
            <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.85rem", color: "#6b7280" }}>
              Kategori: {item.category}
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "2rem" }}>
        <Link href="/" style={{ color: "#2563eb", textDecoration: "underline" }}>
          ⬅️ Balik ke Lobi Utama
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function HalamanKontak() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>📞 Meja Kasir & Layanan Pengaduan</h1>
      <p>Mau bungkus 50 bungkus rendang buat hajatan? Hubungi nomor di bawah:</p>
      <p><strong>WhatsApp:</strong> 0812-3456-7890</p>
      <p><strong>Alamat:</strong> Jl. Raya Padang No. 99, Lintasan Server</p>

      <div style={{ marginTop: "1.5rem" }}>
        <Link href="/" style={{ color: "#2563eb", textDecoration: "underline" }}>
          ⬅️ Balik lagi ke Lobi Utama
        </Link>
      </div>
    </div>
  );
}

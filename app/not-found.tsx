import Link from "next/link";

export default function NotFoundGlobal() {
  return (
    <div style={{ padding: "3rem", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "3rem", margin: "0 0 1rem 0" }}>🥘 404 - Menu Kosong!</h1>
      <p style={{ color: "#4b5563", fontSize: "1.2rem" }}>
        Waduh, meja atau menu yang lu cari gak ada di daftar restoran Padang kami.
      </p>

      <div style={{ marginTop: "2rem" }}>
        <Link
          href="/"
          style={{
            padding: "10px 20px",
            backgroundColor: "#2563eb",
            color: "white",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: "bold",
          }}
        >
          Balik ke Lobi Utama Restoran 🏠
        </Link>
      </div>
    </div>
  );
}

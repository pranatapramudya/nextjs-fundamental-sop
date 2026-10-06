import Link from "next/link";

// 👨‍🍳 KOKI YANG BIKIN EKSPERIMEN (BISA GAGAL / BERHASIL)
export default async function HalamanDapurEksperimen({
  searchParams,
}: {
  searchParams: Promise<{ sukses?: string }>;
}) {
  const params = await searchParams;
  const isSukses = params.sukses === "true";

  // Simulasi Koki sengaja ngegosongin masakan kalau gak ada flag ?sukses=true
  if (!isSukses) {
    throw new Error("Gas elpiji habis di tengah jalan! Masakan gagal matang.");
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <div
        style={{
          border: "2px solid #16a34a",
          backgroundColor: "#f0fdf4",
          borderRadius: "8px",
          padding: "1.5rem",
          maxWidth: "500px",
        }}
      >
        <h2 style={{ color: "#166534", margin: "0 0 0.5rem 0" }}>
          🎉 Masakan Eksperimen Sukses Matang!
        </h2>
        <p style={{ color: "#15803d" }}>
          Koki berhasil masak Rendang Wagyu A5 tanpa insiden kompor meledak.
        </p>

        <div style={{ marginTop: "1rem" }}>
          <Link
            href="/dapur-eksperimen"
            style={{
              padding: "8px 12px",
              backgroundColor: "#ef4444",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              fontSize: "0.9rem",
            }}
          >
            🔥 Coba Gosongin Masakan (Trigger Error)
          </Link>
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

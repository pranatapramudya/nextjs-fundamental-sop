import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HalamanVipOwner() {
  // 👨‍🍳 SERVER ACTION: Logout / Kembalikan Kartu Member
  async function logoutAction() {
    "use server";
    const cookieStore = await cookies();
    cookieStore.delete("kartu_member_owner");
    redirect("/");
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <div
        style={{
          border: "2px solid #eab308",
          backgroundColor: "#fefce8",
          padding: "2rem",
          borderRadius: "8px",
          maxWidth: "600px",
        }}
      >
        <span
          style={{
            backgroundColor: "#ca8a04",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "0.8rem",
            fontWeight: "bold",
          }}
        >
          👑 RUANG RAHASIA KHUSUS OWNER
        </span>

        <h1 style={{ color: "#854d0e", margin: "1rem 0 0.5rem 0" }}>
          Selamat Datang di Brankas Keuangan Restoran!
        </h1>
        <p style={{ color: "#713f12" }}>
          Halaman ini dilindungi ketat oleh <strong>Satpam Middleware (<code>middleware.ts</code>)</strong>. 
          Orang luar tanpa stempel cookie gak bakal bisa nembus ke sini!
        </p>

        <div
          style={{
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "6px",
            border: "1px solid #fde047",
            marginTop: "1rem",
          }}
        >
          <h3 style={{ margin: "0 0 0.5rem 0", color: "#a16207" }}>📊 Rahasia Bisnis Padang:</h3>
          <p style={{ margin: "0.25rem 0" }}>💰 <strong>Omset Hari Ini:</strong> Rp 48.500.000</p>
          <p style={{ margin: "0.25rem 0" }}>🥩 <strong>Stok Daging Rahasia:</strong> 85 Kilogram Sapi Wagyu</p>
          <p style={{ margin: "0.25rem 0" }}>📜 <strong>Resep Rahasia:</strong> Campuran 24 Bumbu Rempah Bukittinggi</p>
        </div>

        {/* Tombol Logout */}
        <div style={{ marginTop: "1.5rem" }}>
          <form action={logoutAction}>
            <button
              type="submit"
              style={{
                padding: "8px 16px",
                backgroundColor: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "4px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              🚪 Kembalikan Kartu Member (Logout)
            </button>
          </form>
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

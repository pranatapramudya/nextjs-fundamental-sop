import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HalamanLogin({
  searchParams,
}: {
  searchParams: Promise<{ pesan?: string }>;
}) {
  const params = await searchParams;
  const kenaCegat = params.pesan === "wajib-login";

  // 👨‍🍳 SERVER ACTION: Kasih Stempel Kartu Member (Login)
  async function prosesLoginAction(formData: FormData) {
    "use server";
    const password = formData.get("password") as string;

    if (password === "admin123") {
      // Kasih cookie stempel rahasia ke browser user
      const cookieStore = await cookies();
      cookieStore.set("kartu_member_owner", "rahasia-bos-padang-123", {
        httpOnly: true, // 🔒 Aman! JavaScript browser nakal gak bisa nyuri stempel ini
        path: "/",
        maxAge: 60 * 60, // Berlaku 1 jam
      });

      redirect("/vip-owner");
    } else {
      redirect("/login?pesan=password-salah");
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>👮‍♂️ Loket Pengecekan Kartu Member Restoran</h1>

      {kenaCegat && (
        <div
          style={{
            backgroundColor: "#fef2f2",
            border: "1px solid #ef4444",
            padding: "0.75rem",
            borderRadius: "6px",
            color: "#b91c1c",
            maxWidth: "400px",
            marginBottom: "1rem",
            fontSize: "0.9rem",
          }}
        >
          🚫 <strong>Ditegur Satpam:</strong> Lu gak bisa masuk ke Ruang VIP Owner tanpa kartu member! Silakan login dulu.
        </div>
      )}

      {params.pesan === "password-salah" && (
        <div
          style={{
            backgroundColor: "#fff1f2",
            border: "1px solid #e11d48",
            padding: "0.75rem",
            borderRadius: "6px",
            color: "#be123c",
            maxWidth: "400px",
            marginBottom: "1rem",
            fontSize: "0.9rem",
          }}
        >
          ❌ Password salah! Kunci rahasianya: <code>admin123</code>
        </div>
      )}

      <form
        action={prosesLoginAction}
        style={{
          border: "2px solid #64748b",
          padding: "1.5rem",
          borderRadius: "8px",
          maxWidth: "400px",
          backgroundColor: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <p style={{ margin: 0, fontSize: "0.85rem", color: "#475569" }}>
          Masukkan password Owner untuk dapet stempel Cookie:
        </p>

        <div>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "bold" }}>
            Password Owner (Ketik: <code>admin123</code>):
          </label>
          <input
            type="password"
            name="password"
            required
            placeholder="admin123"
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#0f172a",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          🔑 Ambil Kartu Member & Masuk VIP
        </button>
      </form>

      <div style={{ marginTop: "2rem" }}>
        <Link href="/" style={{ color: "#2563eb", textDecoration: "underline" }}>
          ⬅️ Balik ke Lobi Utama
        </Link>
      </div>
    </div>
  );
}

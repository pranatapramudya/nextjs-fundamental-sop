"use server";

import "server-only";
import { z } from "zod";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import db from "@/lib/db";

// =========================================================================
// 🛡️ PRAKTEK A: SCHEMA VALIDATION DENGAN ZOD (Sanitasi Input Anti-Hack)
// =========================================================================
// Jangan pernah percaya data kiriman Client/Postman!
// Zod memastikan tipe data, panjang string, dan rentang angka bersih.
const BuatPesananSchema = z.object({
  namaPelanggan: z
    .string()
    .min(3, "Nama pelanggan minimal 3 huruf!")
    .max(50, "Nama pelanggan terlalu panjang (maks 50 huruf)!")
    .regex(/^[a-zA-Z0-9\s.,'-]+$/, "Nama mengandung karakter berbahaya!"),
  menu: z.string().min(2, "Pilihan menu tidak valid"),
  total: z
    .number()
    .int("Total bayar harus bilangan bulat")
    .positive("Total bayar harus lebih dari Rp 0")
    .max(100_000_000, "Transaksi mencurigakan (terlalu besar)!"),
});

// =========================================================================
// 🛡️ PRAKTEK C: SIMULASI AUTENTIKASI VIA HTTP-ONLY COOKIE
// =========================================================================
// Cookie session tidak bisa dibaca via document.cookie di console JavaScript!
export async function simulasiLogin(cabangId: "cabang-jakarta" | "cabang-bandung") {
  const cookieStore = await cookies();
  
  // Set cookie dengan atribut keamanan standar industri
  cookieStore.set("auth_session", JSON.stringify({
    userId: `user-${cabangId}`,
    tenantId: cabangId,
    role: "KASIR"
  }), {
    httpOnly: true, // 🔒 Kebal dari XSS & pencurian cookie di browser!
    secure: process.env.NODE_ENV === "production", // Wajib HTTPS di production
    sameSite: "lax", // Melindungi dari CSRF saat redirect
    maxAge: 60 * 60 * 24, // 1 Hari
    path: "/",
  });

  revalidatePath("/laboratorium-security");
  return { success: true, message: `Berhasil login sebagai Admin ${cabangId}!` };
}

export async function simulasiLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_session");
  revalidatePath("/laboratorium-security");
  return { success: true, message: "Berhasil logout!" };
}

// Helper untuk membaca session dari HttpOnly Cookie di Server
export async function getSessionServer() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("auth_session");
  if (!sessionCookie?.value) return null;

  try {
    return JSON.parse(sessionCookie.value) as {
      userId: string;
      tenantId: string;
      role: string;
    };
  } catch {
    return null;
  }
}

// =========================================================================
// 🛡️ PRAKTEK A & B: SERVER ACTION DENGAN AUTH GUARD & TENANT ISOLATION
// =========================================================================
export async function buatPesananAman(prevState: any, formData: FormData) {
  // 1. 🛑 CEK AUTH GUARD (Mencegah Hacker Nembak Langsung Tanpa Login)
  const session = await getSessionServer();
  if (!session) {
    return {
      success: false,
      error: "⛔ AKSES DITOLAK: Anda belum login! Server Action ini terlindungi Auth Guard.",
    };
  }

  // 2. 🧹 VALIDASI & SANITASI DENGAN ZOD
  const rawData = {
    namaPelanggan: formData.get("namaPelanggan"),
    menu: formData.get("menu"),
    total: Number(formData.get("total")),
  };

  const validation = BuatPesananSchema.safeParse(rawData);
  if (!validation.success) {
    // Ambil error pertama Zod
    const firstError = validation.error.issues[0]?.message || "Input tidak valid";
    return {
      success: false,
      error: `⚠️ VALIDASI GAGAL (Zod): ${firstError}`,
    };
  }

  const { namaPelanggan, menu, total } = validation.data;

  // 3. 🏢 MULTI-TENANT ISOLATION (Kunci Gembok Cabang / Tenant)
  // Perhatikan: 'tenant_id' DIAMBIL DARI SESSION RESMI SERVER, BUKAN DARI FORM INPUT!
  // Ini mencegah Hacker Cabang Bandung memalsukan transaksi atas nama Cabang Jakarta!
  try {
    const stmt = db.prepare(
      "INSERT INTO pesanan_cabang (tenant_id, nama_pelanggan, menu, total, status) VALUES (?, ?, ?, ?, 'SELESAI')"
    );
    stmt.run(session.tenantId, namaPelanggan, menu, total);

    revalidatePath("/laboratorium-security");
    return {
      success: true,
      message: `✅ Pesanan berhasil dicatat khusus untuk [${session.tenantId}]!`,
    };
  } catch (err: any) {
    return {
      success: false,
      error: `Database Error: ${err.message}`,
    };
  }
}

// =========================================================================
// 🛡️ PRAKTEK B.2: DEMO ANTI IDOR (Insecure Direct Object Reference)
// =========================================================================
export async function batalkanPesananAman(orderId: number): Promise<{ success: boolean; message: string; error?: string }> {
  const session = await getSessionServer();
  if (!session) {
    return { success: false, message: "", error: "Akses ditolak: Belum login!" };
  }

  // ⚠️ JANGAN PERNAH HANYA: "DELETE FROM pesanan_cabang WHERE id = ?"
  // ✅ WAJIB GABUNGKAN DENGAN tenant_id:
  const stmt = db.prepare(
    "DELETE FROM pesanan_cabang WHERE id = ? AND tenant_id = ?"
  );
  const result = stmt.run(orderId, session.tenantId);

  if (result.changes === 0) {
    return {
      success: false,
      message: "",
      error: `⛔ DITOLAK: Pesanan #${orderId} bukan milik ${session.tenantId} atau tidak ditemukan! Data Anda terisolasi aman.`,
    };
  }

  revalidatePath("/laboratorium-security");
  return {
    success: true,
    message: `✅ Pesanan #${orderId} berhasil dihapus dari ${session.tenantId}!`,
  };
}

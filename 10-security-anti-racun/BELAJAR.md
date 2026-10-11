# Modul 10: Sertifikasi Higienis & Anti Racun (Security & Best Practice di Next.js)

Selamat datang di **STANDAR KEAMANAN PRODUKSI NEXT.JS**! 🛡️🏰

Restoran Padang & Aplikasi SaaS kita sekarang sudah multi-cabang, menangani ribuan transaksi dan omset milyaran.  
Semakin besar sebuah aplikasi, semakin berbahaya celah keamanan yang mengintai:

1. Hacker menembak Server Action lewat cURL/Postman tanpa login (**Bypass Auth Action**).
2. Hacker menginput karakter SQL / payload berbahaya (**Dirty Input Injection**).
3. Cabang Bandung mencoba melihat atau menghapus pesanan milik Cabang Jakarta (**IDOR & Tenant Data Leak**).
4. Kode rahasia backend/database ter-import ke browser pelanggan (**Bundle Leakage**).
5. Script jahat di browser mencuri token sesi login (**Session Hijacking via XSS**).

Berikut adalah **Panduan Lengkap Praktek A - C** yang sudah diuji coba di halaman `/laboratorium-security`.

---

## 🔒 PRAKTEK A: Server Action Guard & Validasi Input Zod

Banyak pemula salah kaprah mengira *Server Action* itu private. **Faktanya:** Server Action adalah endpoint HTTP POST publik yang diberi hash!

### 1. Wajib Auth Guard di Baris Pertama Action
```ts
"use server";

export async function simpanTransaksi(formData: FormData) {
  // 🛑 1. CEK AUTH DULU! JANGAN BIARKAN HACKER EKSEKUSI KODE DI BAWAHNYA
  const session = await getSessionServer();
  if (!session) {
    return { success: false, error: "⛔ Akses Ditolak: Anda belum login!" };
  }
  
  // ... lanjut proses
}
```

### 2. Validasi & Sanitasi Mutlak dengan Zod
Jangan pernah percaya string kiriman form:
```ts
import { z } from "zod";

const TransaksiSchema = z.object({
  namaPelanggan: z
    .string()
    .min(3, "Nama minimal 3 huruf!")
    .max(50, "Nama terlalu panjang!")
    .regex(/^[a-zA-Z0-9\s.,'-]+$/, "Karakter tidak diizinkan!"),
  total: z.number().int().positive().max(100_000_000),
});

export async function simpanTransaksi(formData: FormData) {
  const validation = TransaksiSchema.safeParse({
    namaPelanggan: formData.get("namaPelanggan"),
    total: Number(formData.get("total")),
  });

  if (!validation.success) {
    return { success: false, error: validation.error.issues[0].message };
  }

  const { namaPelanggan, total } = validation.data; // ✅ Bersih & Type-safe!
}
```

---

## 🏢 PRAKTEK B: Multi-Tenant Isolation & Anti-IDOR (Insecure Direct Object Reference)

### 1. Masalah Kebocoran Data Antar Usaha (IDOR)
Jika Anda menulis query hapus/update seperti ini:
```sql
-- ❌ BAHAYA BESAR:
DELETE FROM pesanan WHERE id = 15;
```
Jika order #15 milik Toko A, tapi Toko B yang mengirim request hapus, **data Toko A akan terhapus!**

### 2. Solusi: Selalu Kunci dengan `tenant_id` dari Sesi Resmi
```ts
export async function batalkanPesanan(orderId: number) {
  const session = await getSessionServer(); // Ambil dari session terverifikasi
  
  // ✅ WAJIB DIKUNCI GANDA: ID Pesanan + Tenant ID
  const stmt = db.prepare(
    "DELETE FROM pesanan_cabang WHERE id = ? AND tenant_id = ?"
  );
  const result = stmt.run(orderId, session.tenantId);

  if (result.changes === 0) {
    return { success: false, error: "Pesanan tidak ditemukan atau bukan milik cabang Anda!" };
  }
}
```

### 3. Tameng Resmi: Package `import 'server-only'`
Untuk memastikan file koneksi database atau kunci enkripsi tidak pernah bocor ke JavaScript browser:
```ts
// Letakkan di baris paling atas lib/db.ts:
import "server-only";
```
Jika tidak sengaja di-import di komponen `"use client"`, Next.js langsung menggagalkan build saat itu juga!

---

## 🍪 PRAKTEK C: HttpOnly Cookie vs LocalStorage

| Aspek | LocalStorage | HttpOnly Cookie (Standar Next.js) |
|---|---|---|
| **Bisa dibaca via JavaScript?** | ✅ Ya (`localStorage.getItem()`) | ❌ **TIDAK BISA** (`document.cookie` kosong) |
| **Kebal Pencurian Script XSS?** | ❌ Sangat Rentan! Script jahat bisa curi token | 🛡️ **KEBAL 100%!** Browser melindungi cookie |
| **Kirim Otomatis ke Server?** | ❌ Manual lewat header `Bearer` | ✅ Otomatis dikirim oleh browser di setiap request |

### Cara Set Cookie Aman di Next.js:
```ts
import { cookies } from "next/headers";

const cookieStore = await cookies();
cookieStore.set("auth_session", tokenJwt, {
  httpOnly: true, // 🔒 Melarang JavaScript membaca cookie
  secure: process.env.NODE_ENV === "production", // Wajib HTTPS di production
  sameSite: "lax", // Perlindungan dari serangan CSRF
  maxAge: 60 * 60 * 24, // 1 Hari
  path: "/",
});
```

---

## ⏱️ PRAKTEK 0: Rate Limiting & Anti-Brute Force (HTTP 429)

Apa yang terjadi kalau ada bot/hacker yang nembak API login atau pembayaran 100 kali dalam 1 detik? Server bisa down atau saldo SMS OTP ludes!

### 1. Algoritma Sliding Window / Token Bucket In-Memory (`lib/rate-limit.ts`)
Setiap IP pengirim dicatat frekuensi tembakannya dalam kurun waktu tertentu:
```ts
// Maksimal 3 request per rentang waktu 10 detik (10.000 ms)
const limiter = rateLimit(ip, 3, 10000);

if (!limiter.success) {
  return NextResponse.json(
    { message: "⛔ 429 TOO MANY REQUESTS: Coba lagi nanti!" },
    { status: 429 }
  );
}
```

---

## 💻 PRAKTEK TERMINAL: Lab Simulasi Penyerangan (cURL)

Endpoint target interaktif: `http://localhost:3005/api/security-target`

### 1. Uji Rate Limiter (Spam Bom 4x Berturut-turut):
```powershell
curl.exe -X POST http://localhost:3005/api/security-target -H "Content-Type: application/json" -d '{\"orderId\": 1}'
```
👉 Tembakan ke-4 langsung dihadang dengan **HTTP 429 Too Many Requests**!

### 2. Uji Auth Guard (Tanpa Sesi):
👉 Ditolak dengan **HTTP 401 Unauthorized**!

### 3. Uji Zod (Payload Rusak Angka Negatif):
```powershell
curl.exe -X POST http://localhost:3005/api/security-target -H "Content-Type: application/json" -H 'Cookie: auth_session={\"userId\":\"user-jakarta\",\"tenantId\":\"cabang-jakarta\",\"role\":\"KASIR\"}' -d '{\"orderId\": -99}'
```
👉 Ditolak Zod dengan **HTTP 422 Unprocessable Entity**!

### 4. Uji Anti-IDOR (Ordal Bandung Menyerang Data Jakarta):
```powershell
curl.exe -X POST http://localhost:3005/api/security-target -H "Content-Type: application/json" -H 'Cookie: auth_session={\"userId\":\"user-bandung\",\"tenantId\":\"cabang-bandung\",\"role\":\"KASIR\"}' -d '{\"orderId\": 1}'
```
👉 Ditolak Database dengan **HTTP 403 Forbidden (Data korban aman!)**!

---

## 🧪 Cara Mencoba di Browser (Playground UI)

1. Jalankan `npm run dev` (Port 3005 untuk fundamental).
2. Buka URL: [http://localhost:3005/laboratorium-security](http://localhost:3005/laboratorium-security)
3. Coba skenario uji coba:
   * **Tes C:** Klik tombol *"🧪 Tes Intip document.cookie"* untuk membuktikan bahwa JavaScript browser tidak bisa mencuri cookie sesi.
   * **Tes A:** Coba kirim pesanan tanpa login ➔ Ditolak oleh Auth Guard! Coba login, lalu input nama 1 huruf ➔ Ditolak oleh Zod!
   * **Tes B:** Login sebagai Cabang Bandung, lalu coba hapus pesanan #1 (milik Jakarta) ➔ Ditolak oleh perlindungan Anti-IDOR!

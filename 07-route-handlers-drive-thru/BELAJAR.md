# Modul 7: Pintu Khusus Drive-Thru & Driver Ojol (Route Handlers / REST API di Next.js)

Di Modul 6 kemarin, kita belajar **Server Actions**: Pelanggan yang duduk di meja makan langsung ngasih bon pesanan ke koki via form web.

Tapi gimana kalau:
1. Ada **Driver Ojol (GrabFood / GoFood / Aplikasi Mobile Flutter / React Native)** yang mau ngambil data menu restoran lu?
2. Ada **Payment Gateway (Midtrans / Xendit)** yang mau ngirim notifikasi otomatis kalau pelanggan udah bayar via QRIS (Webhook)?

Aplikasi mobile atau sistem luar **GAK BISA** buka halaman web HTML lu! Mereka butuh data mentah berupa **JSON** lewat protokol HTTP murni (`GET`, `POST`, `PUT`, `DELETE`).

Di sinilah kita bikin **Pintu Khusus Drive-Thru / Loket Belakang**, yang di Next.js namanya:  
👉 **Route Handlers (`app/api/.../route.ts`)**!

---

## 1. Aturan Main Route Handler (`route.ts`)

- Kalau `page.tsx` itu pintunya **Pelanggan Web** (hasilnya HTML/tampilan).
- Kalau `route.ts` itu loketnya **Mesin & Aplikasi Luar** (hasilnya data mentah JSON / Status Code HTTP).

> ⚠️ **PANTANGAN BESAR:**  
> Di dalam satu folder yang sama, **JANGAN PERNAH** naro `page.tsx` barengan sama `route.ts`!  
> Next.js bakal bingung: *"Ini ruangan buat orang nongkrong apa loket drive-thru?"*

---

## 2. Cara Bikin Endpoint REST API di Next.js

Struktur folder:
📁 `app/api/menu/route.ts` ➡️ Otomatis jadi URL API: `/api/menu`

Tinggal export fungsi sesuai nama HTTP Method huruf kapital (`GET`, `POST`, `DELETE`):

```ts
import { NextResponse } from "next/server";

// 🚗 Loket Drive-Thru: Ambil Data Menu (GET)
export async function GET() {
  const data = [
    { id: 1, nama: "Ayam Pop", harga: 20000 }
  ];

  return NextResponse.json({
    status: "sukses",
    data: data,
  });
}

// 📦 Loket Drive-Thru: Tambah Pesanan Baru (POST)
export async function POST(request: Request) {
  const body = await request.json();
  // Simpen data body...
  return NextResponse.json({ pesan: "Pesanan masuk!" }, { status: 201 });
}
```

---

## 3. Kapan Pake Server Actions vs Kapan Pake Route Handlers?

| Situasi | Pake Apa? | Kenapa? |
| :--- | :--- | :--- |
| Form input di website Next.js lu sendiri | **Server Actions** (`'use server'`) | Lebih simpel, gak perlu bikin URL endpoint, auto refresh. |
| Webhook Payment Gateway (Midtrans) | **Route Handler** (`route.ts`) | Midtrans butuh URL endpoint HTTP POST resmi buat kirim notif. |
| Backend buat aplikasi Android/iOS | **Route Handler** (`route.ts`) | HP butuh respon JSON standar REST API. |
| Bikin fitur download file PDF / Excel | **Route Handler** (`route.ts`) | Bisa atur HTTP Header (`Content-Type: application/pdf`). |

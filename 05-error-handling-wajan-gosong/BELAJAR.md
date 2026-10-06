# Modul 5: Wajan Gosong & Makanan Habis (Error Handling di Next.js)

Bayangin di Restoran Padang lu terjadi insiden:
1. **Wajan Gosong / Kompor Meledak (Server Crash / Database Mati):** Koki gagal masak karena kesalahan tak terduga.
2. **Makanan Habis / Meja Gak Ada (404 Not Found):** Pelanggan nyari menu "Rendang Dinosaurus" yang jelas-jelas kaga pernah ada di daftar menu.

Kalau lu bikin web biasa tanpa error handling:
- Begitu ada error di satu komponen, **satu layar web langsung anjlok (White Screen of Death)** dan error code yang serem kebongkar ke muka pelanggan.

Di Next.js App Router, ada **Dua Tameng Penyelamat**:

---

## 1. Tameng Pertama: `error.tsx` (Error Boundary - Wajan Gosong)
Kalau Koki gagal masak (misal API luar tumbang / database error), Next.js bakal nyegat error itu supaya gak ngerusak seluruh halaman.

### ⚠️ ATURAN MUTLAK `error.tsx`:
> **File `error.tsx` WAJIB bertindak sebagai Client Component (`'use client'`)!**

Kenapa? Karena saat terjadi error, kita butuh **Pelayan yang bisa interaksi langsung sama pelanggan**:
- Nampilin tombol: **"🔄 Coba Masak Ulang (Reset)"**.
- Waktu pelanggan ngeklik tombol itu, fungsi `reset()` bawaan Next.js bakal nyuruh Koki nyoba render ulang tanpa perlu reload seluruh halaman web!

---

## 2. Tameng Kedua: `not-found.tsx` & fungsi `notFound()` (404 Menu Habis)
Kalau pelanggan buka meja atau menu yang gak terdaftar di database, kita jangan lempar error kasar 500 (Server Error). Koki cukup teriak:
```tsx
import { notFound } from "next/navigation";

if (!data) {
  notFound(); // 👈 Panggil fungsi ini!
}
```
Next.js otomatis langsung ngalihin layar pelanggan ke file **`not-found.tsx`** dengan tampilan yang sopan dan ramah pelanggan.

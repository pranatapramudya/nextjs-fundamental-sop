# 📚 Jurnal Belajar Fundamental Next.js (Analogi Restoran Padang)

Catatan perjalanan belajar fundamental Next.js App Router dari nol sampai paham isi dalemannya.

---

## Modul 1: Alur Next.js & Server vs Client Component (Koki vs Pelayan)

Folder latihan: [`01-alur-nextjs-restoran`](./01-alur-nextjs-restoran/)

### 1. Peran Penting:
* **👨‍🍳 Server Component (Koki di Dapur - Default):**
  - Semua file komponen di Next.js secara default adalah **Koki**.
  - **Tugas:** Ambil data dari kulkas/database, masak resep rahasia, bikin HTML matang.
  - **Keamanan:** 100% aman di dapur belakang layar. API Key, token database, atau query rahasia **TIDAK PERNAH** dikirim ke browser user.
  - **Performa:** Super enteng karena browser user tinggal nampilin hasil jadi tanpa harus mikir keras.

* **🤵 Client Component (Pelayan di Meja Depan - `'use client'`):**
  - Wajib dipanggil manual pakai mantra `"use client"` di baris paling atas.
  - **Tugas:** Melayani interaksi user langsung (klik tombol, form input, modal pop-up, state memori lokal via `useState` / `useEffect`).
  - **Keamanan:** File JavaScript-nya **DIKIRIM KE BROWSER USER**. Jangan pernah taro API Key rahasia atau password di sini karena bisa diintip via DevTools/Network!

### 2. Aturan Emas Pemasangan `'use client'`:
> **"Dorong `'use client'` sejauh mungkin ke bawah (ke daun/daun ranting pohon komponen)!"**  
> Jangan jadikan satu halaman utuh sebagai Client Component kalau yang butuh interaksi klik cuma satu tombol kecil. Cukup pisahin tombolnya jadi komponen terpisah (`TombolPesan.tsx`), sisanya biarkan Server Component (`page.tsx`) yang masak.

---

## Roadmap Belajar Selanjutnya (Kurikulum Tongkrongan):

## Modul 2: Denah Ruangan & Meja Makan (Routing di Next.js)

Folder materi: [`02-routing-denah-restoran`](./02-routing-denah-restoran/)  
Implementasi di: [`app/`](./app/)

### 1. Inti Pelajaran:
* **Folder adalah URL:** Lu bikin folder `app/kontak/page.tsx` ➡️ otomatis kebuka di `/kontak`. Tanpa perlu install library routing tambahan!
* **Pintu Masuk (`page.tsx`):** Tiap folder yang mau bisa diakses publik WAJIB punya file bernama `page.tsx`.
* **Dynamic Route (`[id]/page.tsx`):** Folder kurung siku adalah parameter dinamis (nomor meja fleksibel). Satu file bisa melayani jutaan URL dinamis (`/menu/rendang`, `/menu/ayam-pop`, dll).
* **Pintu Ajaib (`<Link>`):** Pakai `next/link` untuk navigasi kilat antar halaman tanpa reload putih layar (Single Page Experience).

---

## Modul 3: Belanja Bahan ke Pasar Induk (Data Fetching di Next.js)

Folder materi: [`03-data-fetching-pasar-induk`](./03-data-fetching-pasar-induk/)  
Implementasi di: [`app/gudang/page.tsx`](./app/gudang/page.tsx)

### 1. Inti Pelajaran:
* **No More `useEffect` & `useState` untuk Fetch Data:** Di Next.js Server Component, Koki bisa langsung ngetik `const data = await fetch(...)` di level komponen tanpa perlu hook ribet.
* **Aman 100%:** Secret API Key atau Header Authorization tetap berada di dapur server, kaga pernah bocor ke browser client.
* **Strategi Caching Gudang:**
  - `cache: 'force-cache'` ➡️ Bumbu awet/stok statis, belanja sekali simpen selamanya.
  - `cache: 'no-store'` ➡️ Ikan segar/realtime, wajib belanja ke pasar tiap ada tamu manggil.
  - `next: { revalidate: 60 }` ➡️ ISR, stok disimpen tapi di-refresh otomatis tiap 60 detik pas ada request baru.

---

## 🗺️ Kurikulum Lengkap: Zero to Fullstack Next.js Hero (Analogi Restoran Padang)

Biar lu punya pondasi baja dari **Frontend, Backend, sampai Security (Fullstack)**, kita bagi jadi **10 Fase Bertahap**:

### 🟢 TAHAP 1: FRONTEND & CORE ARCHITECTURE (Tampilan & Alur)
* **✅ Modul 1: Server vs Client Component (Koki vs Pelayan)**
  - Mental model dapur vs meja depan, aturan sakti `'use client'`.
* **✅ Modul 2: Routing & Folder Structure (Denah Ruangan & Meja Makan)**
  - Static routing, dynamic route `[id]`, layout bersama, navigasi sakti `<Link>`.
* **✅ Modul 3: Data Fetching & Caching (Belanja Bahan ke Pasar Induk)**
  - Async-await di server, hilangnya `useEffect`, strategi gudang (cache, ISR, no-store).
* **✅ Modul 4: Loading State & Suspense (Sop Sambutan Pas Masakan Dimasak)**
  - File sakti `loading.tsx`, Streaming SSR, nampilin UI instan saat koki masak lama tanpa perlu `useState(isLoading)`.
* **✅ Modul 5: Error Handling (Wajan Gosong & Makanan Basi)**
  - File sakti `error.tsx` (WAJIB Client Component) dengan tombol penyelamat `reset()`, serta tameng 404 via `not-found.tsx`.

🎉 **TAHAP 1: FRONTEND & CORE ARCHITECTURE SELESAI DITAMATKAN!** 🎉

---

### 🟡 TAHAP 2: BACKEND & DATABASE (Dapur Dalam & Gudang Stok)
* **✅ Modul 6: Server Actions & Mutasi Data (Pelanggan Nulis Bon Masuk Dapur)**
  - Fitur `'use server'`, mutasi data langsung via form HTML tanpa bikin REST API terpisah, dan auto-refresh via `revalidatePath()`.
* **✅ Modul 7: Route Handlers / REST API (`app/api/route.ts`) (Pintu Drive-Thru / Ojol)**
  - Bikin endpoint REST API standar (`GET`, `POST`, dll) dengan respon JSON mentah khusus buat dikonsumsi aplikasi mobile, webhook payment gateway, atau sistem luar.
* **✅ Modul 8: Integrasi Database Beneran (Kulkas Pendingin: SQLite CRUD Nyata)**
  - Nyambungin Next.js langsung ke database SQL permanen (`better-sqlite3`), menjalankan operasi CRUD (Create, Read, Update, Delete) langsung di Server Component & Server Actions tanpa risiko bocor password!

🎉 **TAHAP 2: BACKEND & DATABASE RESMI SELESAI DITAMATKAN!** 🎉

---

### 🔴 TAHAP 3: SECURITY, AUTH & PRODUCTION (Satpam Restoran & Sertifikasi ISO)
* **✅ Modul 9: Authentication & Middleware (Satpam di Pintu Masuk / VIP Room)**
  - File sakti `middleware.ts` yang mencegat user di pintu terdepan server sebelum sempat render halaman, pengecekan Session Cookie (`httpOnly`), dan redirect otomatis.
* **✅ Modul 10: Security & Best Practice Industri (Anti Maling & Anti Racun)**
  - Rahasia aman via `.env.local` vs `NEXT_PUBLIC_`, Auto-Escaping anti XSS bawaan React, dan anti SQL Injection via Prepared Statements.

🎉 **SELURUH 10 MODUL RESMI DITAMATKAN 100%!** 🎉  
🏆 **SELAMAT! LU RESMI JADI FULLSTACK NEXT.JS ENGINEER DENGAN PONDASI BAJA!** 🏆

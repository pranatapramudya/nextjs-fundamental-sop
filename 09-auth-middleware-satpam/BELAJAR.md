# Modul 9: Satpam Gerbang & Ruang VIP (Authentication & Middleware di Next.js)

Restoran Padang kita sekarang udah punya omset ratusan juta per hari.  
Masalah baru muncul:
> *"Masa ruangan brankas kasir, resep rahasia, dan ruangan Owner bisa dimasukin sembarang pelanggan dari jalan raya?!"*

Di sinilah kita butuh **Satpam Tegas di Gerbang Depan**:
1. **Authentication (Kartu Member / KTP):** Ngebuktiin siapa yang dateng (apakah dia Tamu Biasa atau Bos Owner Restoran).
2. **Middleware (Satpam di Depan Pintu):** File sakti `middleware.ts` yang berdiri tepat di depan pintu gerbang sebelum tamu sempat nginjek lantai restoran!

---

## 1. File Sakti: `middleware.ts` (Pos Satpam)

Di Next.js, file `middleware.ts` ditaruh di root project (atau di folder `src/`).
- **Sifat:** Jalan di *Edge / Server paling depan* **SEBELUM** halaman `page.tsx` manapun sempat dimasak oleh Koki!
- **Tugas Satpam:**
  1. Cek dompet/kantong tamu: ada kartu member (**Cookie / Token Session**) atau enggak?
  2. Kalau tamu mau masuk ruangan rahasia (`/vip-owner`) tapi gak punya kartu member:  
     Satpam langsung **cegat dan tendang (Redirect)** balik ke halaman login:  
     `NextResponse.redirect(new URL('/login', request.url))`
  3. Kalau kartunya valid: Satpam ngucap *"Silakan masuk bos!"* (`NextResponse.next()`).

---

## 2. Kenapa Middleware Jauh Lebih Sakti daripada Pengecekan di Halaman?

Kalau lu ngecek login di dalem `page.tsx` biasa:
- Koki di dapur udah keburu buang-buang energi ngambil data dari kulkas.
- Halaman mungkin sempat kedip kebuka sepersekian detik sebelum di-redirect.

Tapi dengan **`middleware.ts`**:
- Tamu yang gak punya izin **bahkan gak sempat bikin koki nyalain kompor!**
- Di pintu pagar depan udah langsung disuruh putar balik. Sangat hemat server dan anti jebol!

---

## 3. Konsep Cookies: Stempel Masuk Restoran
Waktu tamu login sukses:
- Server ngasih stempel tangan yang gak bisa dipalsuin berupa **Cookie HTTP**.
- Tiap tamu jalan-jalan antar ruangan (`/menu`, `/vip-owner`, dll), stempel cookie itu otomatis kebawa dan dibaca oleh Satpam Middleware.

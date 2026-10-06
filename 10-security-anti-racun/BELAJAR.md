# Modul 10: Sertifikasi Higienis & Anti Racun (Security & Best Practice di Next.js)

Selamat datang di **BOSS TERAKHIR KURIKULUM**: Security & Best Practice Industri! 🛡️🏰

Restoran Padang kita sekarang udah viral, punya cabang di mana-mana, dan omset milyaran.  
Tapi semakin gede sebuah restoran, semakin banyak **Hacker Jahil & Pesaing Curang** yang nyoba ngeracun:
1. Nyoba masukin racun tikus ke piring rendang (**XSS - Cross Site Scripting**).
2. Nyoba ngebom kulkas pakai mantra palsu (**SQL Injection**).
3. Nyoba ngintip brankas rahasia dari jendela depan (**Bocor Environment Variables / API Key**).

Berikut adalah **3 Pilar Pertahanan Baja** di Next.js:

---

## 1. Brankas Tertutup: `.env.local` & Aturan Prefiks `NEXT_PUBLIC_`

Di Next.js, rahasia negara (Database URL, Stripe Secret Key, Token Bank) disimpen di file **`.env.local`**.

### 🔒 ATURAN EMAS NEXT.JS YANG WAJIB DIHAFAL:
- **Variabel Biasa (HANYA UNTUK KOKI DI SERVER):**
  ```env
  DATABASE_SECRET=kunci_rahasia_banget_123
  ```
  Ini **TIDAK AKAN PERNAH** bisa dibaca oleh Client/Browser. Aman 100%!
- **Variabel Umum (DIKIRIM KE MEJA PELANGGAN):**
  ```env
  NEXT_PUBLIC_NAMA_RESTORAN="Padang Minang Express"
  ```
  Harus diawali kata `NEXT_PUBLIC_`. Kalau lu gak pake awalan ini, browser gak bakal bisa ngeliat nilainya.
  > ⚠️ **HATI-HATI:** Jangan pernah namain `NEXT_PUBLIC_SECRET_KEY`! Itu sama aja lu nempelin password brankas di jidat pelayan meja!

---

## 2. Anti Racun Makanan: XSS (Cross-Site Scripting)

Apa itu XSS? Bayangin ada orang jahat nulis form nama masakan dengan teks:
`<script>curiCookiePelangganLain()</script>`

Di framework kuno atau PHP jaman purba, script itu bisa dieksekusi di browser pelanggan lain dan nyuri stempel login mereka.

### 🛡️ Tameng Next.js / React:
React dan Next.js punya sistem **Auto-Escaping** bawaan. Semua teks di dalam `{item.nama}` otomatis diubah jadi teks polos biasa, bukan kode yang bisa dieksekusi.  
> ⚠️ **PANTANGAN:** Jangan pernah pake `dangerouslySetInnerHTML` kecuali lu bener-bener tau apa yang lu lakuin!

---

## 3. Anti Bom Kulkas: SQL Injection & Prepared Statements

Kalau ada hacker ngetik nama menu:
`Rendang'); DROP TABLE menu_padang; --`

Kalau lu nulis query SQL pake sambungan string:
`"INSERT INTO menu_padang (nama) VALUES ('" + nama + "')"` ➡️ **TABEL LU LANGSUNG MUSNAH HANCUR TOTAL!**

### 🛡️ Solusi Kita di Modul 8: Prepared Statements
Kita pake parameter tanda tanya `?`:
```ts
const stmt = db.prepare("INSERT INTO menu_padang (nama) VALUES (?)");
stmt.run(nama); // 👈 Nilai nama diperlakukan murni sebagai teks, bukan query SQL!
```
Hacker mau ngetik mantra SQL seaneh apapun, database tetap menganggapnya sebagai nama masakan biasa. Kulkas aman dari ledakan!

# Modul 8: Kulkas Pendingin Permanen (Integrasi Database Nyata di Next.js)

Dari Modul 1 sampai Modul 7, semua data yang kita pake masih **palsu / temporary di memori RAM** (`let DB = [...]`).
Kelemahannya? Begitu server mati / laptop lu restart, semua data pesanan pelanggan **LANGSUNG HILANG TANPA BEKAS**!

Di dunia nyata, restoran butuh **Kulkas Pendingin Permanen (Database SQL)**:
- Lampu mati atau server restart, daging & rendang tetap aman tersimpan di rak.
- Data tersimpan dalam bentuk file/tabel nyata (`.db` atau server PostgreSQL).

---

## 1. Kenapa Next.js Server Component Cocok Banget Buat Database?

Di arsitektur frontend lama (Vite/React biasa):
> ❌ **HARAM HUKUMNYA** manggil Database (SQL/Prisma/SQLite) langsung di komponen React!  
> Kalau nekat, koneksi DB dan password lu bocor ke browser semua orang.

Di **Next.js Server Component (Koki di Dapur)**:
> ✅ **HALAL DAN DIREKOMENDASIKAN 100%!**  
> Karena Koki kerja di server, Koki bisa langsung ngetik query SQL atau ORM langsung di dalem komponen tanpa takut password bocor!

---

## 2. Operasi Dasar Database: CRUD
Semua aplikasi di dunia (Instagram, Tokopedia, Gojek) intinya cuma 4 operasi ini:
1. **C (Create):** Masukin bahan baru ke kulkas (`INSERT INTO ...`).
2. **R (Read):** Buka pintu kulkas, ambil daftar bahan (`SELECT * FROM ...`).
3. **U (Update):** Kurangi stok daging pas ada orang mesen (`UPDATE ... SET stok = stok - 1`).
4. **D (Delete):** Buang makanan yang udah basi (`DELETE FROM ...`).

Di modul ini, kita pake **SQLite (file `restoran.db` nyata)** di folder project lu. Gak perlu install aplikasi database berat, ringan, dan langsung jalan!

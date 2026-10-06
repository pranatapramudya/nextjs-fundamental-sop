# Next.js App Router: Analogi Restoran Padang

Bayangin Next.js itu kayak Restoran Padang langganan lo. Di situ ada dua peran penting: **Koki** dan **Pelayan**.

## 1. Server Component (Koki di Dapur)
Ini default-nya Next.js. Semua komponen itu koki kecuali lo suruh beda.
- **Tugas**: Ambil bahan daging dari kulkas (database) dan masak rendang.
- **Sifat**: Kerjanya di belakang layar. Pelanggan (browser) nggak tau gimana cara koki masak dan nggak tau resep rahasianya.
- **Hasil**: Koki cuma ngasih piring berisi rendang yang udah mateng (HTML yang udah jadi) ke meja pelanggan. Loading web jadi super ngebut karena HP/laptop pelanggan nggak usah ikut masak, tinggal mangap.

## 2. Client Component (Pelayan di Depan)
Ini harus lo panggil khusus pakai tulisan ajaib `'use client'`.
- **Tugas**: Ngelayanin interaksi langsung sama pelanggan.
- **Sifat**: Stand by di meja. Kalau pelanggan mau nambah kerupuk (klik tombol), nanya harga (hover mouse), atau nulis pesanan di kertas (ngetik form), pelayan yang urus.
- **Kapan dipakai?**: Cuma kalau butuh interaksi yang ada "aksi-reaksi" sama user.

## Alur Kerjanya (Gimana data ngalir)
1. Pelanggan dateng buka web lo.
2. **Koki (Server)** langsung lari ke kulkas (Database), masak semua menu (Render HTML), terus susun semua piring di meja depan pelanggan. Piringnya udah penuh makanan siap santap.
3. Tapi, piring ini masih "benda mati". Kalau pelanggan mau minta nambah kuah, **Pelayan (Client)** maju ke meja buat ngerespon tarikan tangan pelanggan (event listener / klik).

**Intinya:**
Biar restoran efisien, suruh Koki masak sebanyak mungkin di dapur. Sisain kerjaan Pelayan buat yang butuh gerak-gerik pelanggan aja. Jangan suruh Pelayan masak rendang di meja, nanti lambat dan acak-acakan!
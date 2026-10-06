# Modul 2: Denah Ruangan & Meja Makan (Routing di Next.js)

Bayangin Restoran Padang kita makin rame dan sekarang punya gedung 2 lantai dengan banyak ruangan dan meja-meja khusus.

Di Next.js App Router, **struktur folder lu adalah denah gedungnya**. Lu gak perlu nyewa satpam ribet (`react-router-dom`) buat nunjukkin jalan.

---

## 1. Aturan Dasar: Folder Adalah Ruangan, `page.tsx` Adalah Pintunya!
Di Next.js:
- Bikin folder `menu` ➡️ otomatis jadi URL `/menu`
- Bikin folder `kontak` ➡️ otomatis jadi URL `/kontak`
- **Syarat Mutlak:** Di dalem folder itu **WAJIB** ada file bernama `page.tsx`!  
  Kalau gak ada `page.tsx`, ruangannya dianggap gudang tertutup, pelanggan yang coba masuk bakal dapet **404 Not Found**.

---

## 2. Dynamic Route: Folder Kurung Siku `[id]` (Nomor Meja Pelanggan)
Bayangin restoran lu punya meja no 1 sampai 100. Apakah lu bakal bikin 100 folder:
`/meja-1/page.tsx`, `/meja-2/page.tsx`, ... `/meja-100/page.tsx`? **Gila, pegel banget!**

Cukup bikin **1 folder ajaib pakai tanda kurung siku**:
📁 `menu/[id]/page.tsx`

Tanda `[id]` itu ibarat **nomor meja fleksibel**:
- Kalau pelanggan buka `/menu/rendang` ➡️ nilai `id` berubah jadi `"rendang"`
- Kalau pelanggan buka `/menu/ayam-pop` ➡️ nilai `id` berubah jadi `"ayam-pop"`
- Koki di dapur tinggal baca: *"Oh meja ini minta menu `{params.id}` toh, siap dimasak!"*

---

## 3. Pindah Ruangan Ngebut: Pakai `<Link>` (Bukan `<a>`)
- Tag `<a>` HTML biasa itu kayak pelanggan keluar dulu ke jalan raya, kena debu, terus masuk lagi lewat pintu depan (layar reload putih & lemot).
- Komponen `<Link href="...">` dari `next/link` itu kayak **pintu tembus ajaib / pintu Doraemon**. Pelanggan pindah ruangan dalam sekejap mata tanpa reload sama sekali!

---

## 4. Layout: Atap & Pondasi Bersama (`layout.tsx`)
Kalau lu pasang plang merk restoran dan kipas angin di atap (`layout.tsx`), waktu pelanggan jalan dari `/menu` ke `/kontak`, atap dan plangnya **gak pernah dibongkar ulang**. Yang ganti cuma isi ruangannya doang. Ini yang bikin Next.js super hemat energi.

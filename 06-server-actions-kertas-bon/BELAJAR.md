# Modul 6: Kertas Bon Orderan Masuk Dapur (Server Actions di Next.js)

Sekarang kita resmi masuk ke **TAHAP 2: BACKEND NEXT.JS!** 👨‍🍳🔥

Bayangin di Restoran Padang lu ada pelanggan yang mau nambah **menu baru** atau ngirim formulir pesanan khusus.

Di arsitektur web jaman dulu (tradisional React + Express/Node):
1. Bikin form di React.
2. Pasang `e.preventDefault()`.
3. Bikin file terpisah di backend: `POST /api/tambah-menu`.
4. Bikin handler Express, parsing body, routing manual.
5. Panggil `axios.post('/api/tambah-menu')`.
*(Bikin puyeng, bolak-balik antara frontend dan backend cuma buat kirim teks sebaris!)*

---

## 1. Keajaiban Next.js: Server Actions (`'use server'`)

Di Next.js App Router, ada mantra sakti kedua: **`'use server'`**!
- Kalau `'use client'` artinya kode dikirim ke meja pelanggan.
- Kalau `'use server'` artinya fungsi itu **DIJAMIN 100% CUMA JALAN DI SERVER DAPUR**!

Kerennya: **Fungsi server ini bisa langsung ditempel ke tag `<form action={...}>` di HTML!**

```tsx
// 👨‍🍳 FUNGSI INI JALAN DI SERVER DAPUR
async function tambahMenuAction(formData: FormData) {
  "use server"; // 👈 Mantra sakti backend!

  const nama = formData.get("namaMenu");
  // Simpen langsung ke database...
  // Koki kaga perlu bikin endpoint API terpisah!
}

// Form HTML biasa langsung panggil fungsi server!
<form action={tambahMenuAction}>
  <input name="namaMenu" />
  <button type="submit">Kirim ke Dapur</button>
</form>
```

---

## 2. Kenapa Fitur Ini Dianggap "Sihir"?

1. **Jalan Walaupun JavaScript Browser Dimatiin (Progressive Enhancement):**  
   Bahkan kalau HP pelanggan baterainya sekarat atau JavaScript-nya crash, form ini tetep bisa ngirim data ke server karena make standar HTML Form action bawaan browser!
2. **Auto Refresh Dapur (`revalidatePath`):**  
   Begitu data baru dimasukin ke database, Koki bisa langsung teriak:  
   `revalidatePath('/pesan')` ➡️ Halaman otomatis ke-update nampilin menu baru tanpa user harus F5/reload manual!
3. **Validasi Anti Racun:**  
   Di server action ini, Koki bisa ngecek dulu: *"Eh ini nama menunya beneran makanan apa script hacker?"* sebelum disimpen.

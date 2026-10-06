# Modul 3: Belanja Bahan ke Pasar Induk (Data Fetching di Next.js)

Sekarang restoran kita makin laris. Daging sapi sama rempah-rempah gak mungkin disimpen di kulkas dapur terus, Koki harus **belanja ke Pasar Induk (API Luar / Database Eksternal)**.

Di React jaman dulu (CRA/Vite), cara ngambil data itu ribet dan bikin puyeng:
1. Komponen harus Client Component.
2. Harus bikin `const [data, setData] = useState([])`.
3. Harus bikin `const [loading, setLoading] = useState(true)`.
4. Harus bungkus di dalem `useEffect(() => { fetch(...) }, [])`.
5. Hasilnya? Browser pelanggan yang disuruh belanja ke pasar. Kalau HP kentang / sinyal bapuk, layar putih muter-muter lama!

---

## 1. Gaya Next.js App Router: Koki Langsung Belanja Sebelum Buka Warung!

Di Server Component, Koki bisa langsung ngetik `await fetch()` di dalem fungsi komponennya, **tanpa `useEffect`, tanpa `useState`!**

```tsx
// 👨‍🍳 KOKI LANGSUNG BELANJA DI SERVER
export default async function HalamanPasar() {
  const res = await fetch("https://api-pasar-induk.com/daging");
  const data = await res.json();

  return <div>{/* Masak & sajikan data */}</div>;
}
```

### Kenapa ini JAUH LEBIH SUPERIOR?
1. **HP Pelanggan Gak Kena Beban:** Pelanggan gak usah ikut kirim kuota internet buat fetch data. Server restoran yang koneksinya kenceng yang belanja.
2. **Resep & Token API Aman:** Mau lu pasang `Authorization: Bearer SECRET_TOKEN_LU` di fetch, pelanggan gak bakal bisa liat token lu di Inspect Element!
3. **SEO 100% Bagus:** Robot Google langsung dapet teks lengkap pas pertama kali mampir, gak ada data kosong yang nunggu dimuat.

---

## 2. Strategi Caching: Gudang Stok Bahan Koki

Di pasar induk, koki Next.js punya 3 strategi belanja:

1. **`cache: 'force-cache'` (Stok Bumbu Kering / Default):**  
   Koki belanja sekali, terus disimpan di gudang. Tiap ada tamu dateng, langsung pake stok yang ada. Super ngebut! (Static).
2. **`cache: 'no-store'` (Ikan Segar / Data Realtime):**  
   Tiap ada tamu mesen, Koki wajib lari ke pasar saat itu juga. Cocok buat harga saham, saldo dompet, atau tiket konser.
3. **`next: { revalidate: 60 }` (Belanja Ulang Tiap 1 Menit):**  
   Simpen stok, tapi kalau udah lewat 60 detik dan ada tamu baru, Koki belanja lagi buat nge-refresh stoknya (ISR - Incremental Static Regeneration).

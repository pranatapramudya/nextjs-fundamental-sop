# Modul 4: Sop Sambutan & Teh Tawar Hangat (Loading State & Suspense di Next.js)

Bayangin pelanggan dateng ke Restoran Padang lu, terus mesen **Rendang Spesial yang masaknya butuh waktu 3 detik**.

Kalau lu pake web konvensional zaman dulu:
- Pelanggan ngeklik menu, layarnya **nge-freeze putih / blank** selama 3 detik.
- Pelanggan mikir: *"Lah ini restoran tutup apa internet gua putus?"* Terus mereka kabur / close tab.

Di Restoran Padang yang profesional:
- Begitu tamu duduk, **Pelayan langsung nyajiin Teh Tawar Hangat / Kerupuk gratisan (Loading Skeleton)** ke meja secara instan!
- Begitu rendang di dapur mateng 3 detik kemudian, piring rendangnya langsung ditaro di meja ngegantiin teh tawar tadi tanpa kedip (**Streaming HTML via Suspense**).

---

## 1. File Ajaib Next.js: `loading.tsx`

Di Next.js App Router, lu **GAK PERLU** lagi bikin manual state kayak gini:
```tsx
// ❌ CARA LAMA YANG BIKIN CAPEK:
const [isLoading, setIsLoading] = useState(true);
if (isLoading) return <Spinner />;
```

Cukup bikin file bernama **`loading.tsx`** di dalem folder rute bersangkutan!
Contoh struktur:
```text
app/
 └── rendang-spesial/
      ├── loading.tsx  <-- Otomatis dipake Next.js pas data lagi dimasak
      └── page.tsx     <-- Halaman utama pas data udah mateng
```

Next.js secara cerdas bakal:
1. Nampilin isi `loading.tsx` dalam hitungan milidetik.
2. Sambil di belakang layar, Koki nyelesaiin `await fetch()` atau query database.
3. Begitu data siap, Next.js otomatis nge-swap `loading.tsx` jadi `page.tsx`.

---

## 2. Granular Loading: React `<Suspense>` (Biar Gak Nungguin Semuanya)

Bayangin di meja ada 2 hidangan:
- **Nasi Putih**: Udah mateng instan (0.1 detik).
- **Rendang Spesial**: Masaknya lama (3 detik).

Apakah pelanggan harus nunggu nasi putih gara-gara rendangnya belum mateng? **Rugi bandar!**

Pake `<Suspense fallback={<SkeletonRendang />}>`:
- Nasi putih langsung nongol di detik 0.
- Bagian piring rendang doang yang ada muter-muter loading-nya.
- Begitu rendang mateng di detik 3, rendangnya langsung ngisi piringnya!

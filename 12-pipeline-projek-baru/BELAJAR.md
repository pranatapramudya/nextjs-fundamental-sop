# SOP Pipeline Bangun Project Baru dari Nol (Zero-to-Hero Factory)

Dokumen ini adalah alur standar ketika mau bikin produk software baru agar **TIDAK PERNAH LAGI** terjadi kode berantakan atau *vibe coding* tanpa arah.

---

## 4 FASE PIPELINE PRODUKSI SOFTWARE

```
[FASE 1: THE ARCHITECT]      [FASE 2: THE CHEF]          [FASE 3: THE ENGINE]        [FASE 4: THE POLICE]
   PRD & Schema Data      ➡️  Frontend & UI/UX Design  ➡️  Backend & Server Actions  ➡️  QA Tester & Typecheck
   (Blueprint 1 Halaman)      (Koki-Pelayan Next.js)       (Database SQL & API)         (Anti-Bug & Audit SOP)
```

---

## FASE 1: THE ARCHITECT (Bikin Mini-PRD 1 Halaman)
> ⚠️ **Trik Malas Elegan:** JANGAN bikin dokumen Word 20 halaman! Cukup suruh AI yang nulis PRD-nya berdasarkan obrolan santai lu.

**Format Mini-PRD Wajib:**
1. **Nama Produk & Target User:** Siapa yang pake?
2. **3 Fitur Utama (MVP):** Jangan serakah, fokus 3 fitur yang wajib jalan.
3. **Skema Database (Tabel & Kolom):** Apa aja yang disimpan di kulkas?
4. **Denah Halaman (Routing):** Halaman apa aja yang bakal ada?

---

## FASE 2: THE CHEF (Frontend & UI/UX Terisolasi)
1. Inisialisasi Next.js App Router murni.
2. Buat seluruh tampilan halaman (`page.tsx`) dengan aturan:
   - `page.tsx` = Koki (Server Component).
   - Bagian tombol / form = Pelayan (`'use client'`).
3. Pasang dummy data dulu (jangan sambungin backend dulu biar tampilan kelar 100%).
4. Pasang `loading.tsx` skeleton dan `error.tsx`.

---

## FASE 3: THE ENGINE (Backend, Database & Actions)
1. Buat skema database di `prisma/schema.prisma` atau SQLite.
2. Ganti dummy data dengan Server Actions (`'use server'`) atau query Prisma nyata.
3. Sambungin Auth (Clerk) dan Middleware satpam.
4. Sentralisasi semua rahasia ke `src/config/env.ts`.

---

## FASE 4: THE POLICE (QA Tester & Audit SOP)
Sebelum commit ke `main`:
1. `npx tsc --noEmit` (0 error TypeScript).
2. Tes skenario error (misal submit form kosong, id tidak ada).
3. Audit apakah ada `'use client'` yang bocor atau secret env yang salah tempat.
4. Commit & Deploy!

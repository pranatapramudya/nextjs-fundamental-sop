# SOP Master Prompt 1-Shot 90% Production-Ready (Architect to Release)

Dokumen ini adalah **Master Blueprint** ketika kamu ingin mengeksekusi ide baru dalam **1x Prompt Komprehensif** dengan tingkat keberhasilan 90% matang, tanpa UI berantakan dan tanpa arsitektur spaghetti.

---

## 5 RAHASIA STRUKTURAL AGAR 1-SHOT PROMPT BISA 90% AKURAT:

1. **Strict Design System Specs:**  
   Jangan biarkan AI mengarang CSS bebas. Wajib kunci token warna (Neutral 900/50, Accent), tipografi (`Plus Jakarta Sans` / `Inter`), dan spacing.
2. **Responsive Mobile-First Contract:**  
   Wajib tentukan: Single-column di `< 640px` (mobile), sticky bottom bar/drawer untuk aksi utama, dan Grid 2-4 kolom di desktop `>= 1024px`.
3. **Koki vs Pelayan Strict Boundary:**  
   Definisikan dengan tegas: File mana yang Server Component dan file mana yang Client Component sejak awal eksekusi.
4. **Resilient Data State (Zero-Blank UI):**  
   Wajib sertakan `loading.tsx` skeleton dan `error.tsx` boundary di setiap rute utama.
5. **Realistic Expectation (Sisa 10% Manual):**  
   1-Shot akan menyelesaikan 90% (Struktur, UI/UX Akurat, State, Form, Routing, dan Backend Boilerplate). 10% sisanya adalah menghubungkan API Key pihak ketiga (Stripe/Midtrans/Clerk asli) dan testing alur bisnis spesifik.

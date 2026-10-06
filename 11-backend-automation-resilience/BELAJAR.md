# SOP Backend Automation & Resilience (Filosofi Pabrik Robot)

SOP ini adalah standar baku untuk project **Backend Murni, Cronjob, Bot Telegram, Web Scraper, AI Agent, dan Pipeline Outreach** (seperti `pjtech-autonomous`, `one-sales-man`, `auto-apply-agent`).

Berbeda dengan Next.js yang melayani manusia di browser, **Pabrik Robot melayani mesin di server**. Syarat utamanya adalah: **KOKOH, ANTI-MOGOK, DAN TAHAN BANTING 24/7!**

---

## 4 PILAR PABRIK ROBOT ANTI-MOGOK:

### 1. 🛡️ Loop Error Isolation (Mesin Anti-Mogok di Tengah Jalan)
**Penyakit Klasik:**
Ketika robot nge-loop 1.000 data (kirim email/render video/scrape web), data ke-14 error, seluruh script langsung meledak *crash* dan 986 data sisanya batal diproses.

**SOP Baku:**
Pasang `try-catch` **DI DALAM BLOK ITERASI**, bukan di luar!
```ts
// ✅ BENAR: Kalau prospek 1 error, loop tetap lanjut ke prospek berikutnya!
for (const target of daftarTarget) {
  try {
    await kirimEmailOutreach(target);
    console.log(`[SUKSES] Terkirim ke: ${target.email}`);
  } catch (err: any) {
    // Catat log error, JANGAN biarkan script meledak keluar!
    console.error(`[GAGAL] Lewati ${target.email}, alasan: ${err.message}`);
  }
}
```

---

### 2. 🔐 Centralized Env & Booting Crash Guard (`config/env.ts`)
**Penyakit Klasik:**
Memanggil `process.env.TOKEN` secara berceceran di puluhan file. Kalau ada 1 token lupa diisi di server production, script jalan 30 menit dulu baru error di tengah-tengah.

**SOP Baku:**
Bikin satu file `config/env.ts` sebagai **Single Source of Truth** yang memvalidasi semua kunci di detik ke-0 (waktu booting):
```ts
import "dotenv/config";

function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`[CRASH GUARD] Variabel ENV wajib '${key}' belum diisi di .env!`);
  }
  return value;
}

export const ENV = {
  RESEND_API_KEY: getEnv("RESEND_API_KEY"),
  DATABASE_URL: getEnv("DATABASE_URL"),
  TELEGRAM_BOT_TOKEN: getEnv("TELEGRAM_BOT_TOKEN"),
};
```

---

### 3. 📂 Separasi 3 Pilar: Config, Services, dan Handlers
Jangan campur aduk file API pihak ketiga dengan alur bisnis!

Struktur Folder Standar:
```text
src/
 ├── config/     <-- env.ts, database.ts, constants.ts (Koneksi & Kunci)
 ├── services/   <-- resend.ts, telegram.ts, gemini.ts (Panggil API luar mentah)
 └── handlers/   <-- pipeline-sales.ts, render-engine.ts (Alur kerja bisnis)
```

---

### 4. ⏱️ Rate Limiter & Polling Watchdog (Anti-Blokir & Anti-Mati Suri)
1. **Jeda Antar Aksi (Sleep / Delay):** Jangan tembak 100 API dalam 1 detik. Kasih delay aman:
   ```ts
   await new Promise(resolve => setTimeout(resolve, 2000)); // jeda 2 detik
   ```
2. **Watchdog Error Telegram/Cron:** Selalu pasang handler `polling_error` agar bot yang kehilangan sinyal otomatis rekoneksi, bukan mati diam-diam (silent death).

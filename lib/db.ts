// 🛡️ PRAKTEK B.1: import 'server-only'
// Ini adalah aturan mutlak di Next.js: Jika ada file yang memuat koneksi database, secret key,
// atau logika rahasia backend, tambahkan import 'server-only' di baris paling atas!
// Jika file ini tidak sengaja di-import ke komponen "use client", Next.js akan langsung GAGAL BUILD!
import "server-only";

import Database from "better-sqlite3";
import path from "path";

// Bikin file database nyata 'restoran.db' di root project
const dbPath = path.join(process.cwd(), "restoran.db");
const db = new Database(dbPath);

// Inisialisasi tabel menu kalau belum ada
db.exec(`
  CREATE TABLE IF NOT EXISTS menu_padang (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    harga INTEGER NOT NULL,
    stok INTEGER NOT NULL DEFAULT 10
  );

  -- 🛡️ PRAKTEK B.2: MULTI-TENANT ISOLATION TABLE
  -- Setiap cabang restoran (cabang-jakarta, cabang-bandung) memiliki 'tenant_id'
  CREATE TABLE IF NOT EXISTS pesanan_cabang (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tenant_id TEXT NOT NULL,
    nama_pelanggan TEXT NOT NULL,
    menu TEXT NOT NULL,
    total INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'MENUNGGU'
  );
`);

// Isi data awal (seed) kalau kulkas masih kosong
const hitungMenu = db.prepare("SELECT COUNT(*) as total FROM menu_padang").get() as { total: number };
if (hitungMenu.total === 0) {
  const insert = db.prepare("INSERT INTO menu_padang (nama, harga, stok) VALUES (?, ?, ?)");
  insert.run("Rendang Daging Istimewa", 28000, 15);
  insert.run("Ayam Pop Sambalado", 22000, 20);
  insert.run("Gulai Otak Sapi Gurih", 30000, 8);
}

// Seed pesanan multi-cabang untuk uji coba isolasi data
const hitungPesanan = db.prepare("SELECT COUNT(*) as total FROM pesanan_cabang").get() as { total: number };
if (hitungPesanan.total === 0) {
  const insertPesanan = db.prepare(
    "INSERT INTO pesanan_cabang (tenant_id, nama_pelanggan, menu, total, status) VALUES (?, ?, ?, ?, ?)"
  );
  insertPesanan.run("cabang-jakarta", "Budi Sudarsono (Jakarta)", "Rendang Daging", 28000, "SELESAI");
  insertPesanan.run("cabang-jakarta", "Siti Rahma (Jakarta)", "Ayam Pop", 22000, "SELESAI");
  insertPesanan.run("cabang-bandung", "Kang Asep (Bandung)", "Gulai Otak", 30000, "SELESAI");
}

export default db;

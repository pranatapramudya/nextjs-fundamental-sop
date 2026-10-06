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
`);

// Isi data awal (seed) kalau kulkas masih kosong
const hitungMenu = db.prepare("SELECT COUNT(*) as total FROM menu_padang").get() as { total: number };
if (hitungMenu.total === 0) {
  const insert = db.prepare("INSERT INTO menu_padang (nama, harga, stok) VALUES (?, ?, ?)");
  insert.run("Rendang Daging Istimewa", 28000, 15);
  insert.run("Ayam Pop Sambalado", 22000, 20);
  insert.run("Gulai Otak Sapi Gurih", 30000, 8);
}

export default db;

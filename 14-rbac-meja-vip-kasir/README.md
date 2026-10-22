# Modul 14: Meja VIP & Kasir Khusus (Multi-Role RBAC & Row-Level Security)

> **"Di Restoran Padang, Pelayan cuma boleh bawa piring & catat pesanan. Kasir pegang laci uang. Tapi yang berhak liat buku brankas omset harian dan ganti harga menu cuma si Daeng Owner!"**

---

## 1. Masalah Nyata di Industri (Kenapa Modul 09 Belum Cukup?)
Di **Modul 09 (Auth Middleware)**, kita cuma punya Satpam pintu depan:
* *User punya tiket (Token/Session)?* Boleh masuk.
* *User ga punya tiket?* Tendang ke `/login`.

**Masalah Besarnya:**  
Begitu user masuk ke dalam ruangan, semua orang bisa liat dan mencet tombol yang sama!
* Kasir iseng bisa buka URL `/admin/keuangan` dan liat laba bersih owner.
* Mekanik bengkel bisa hapus nota servis mobil.
* Klien A bisa ganti angka parameter URL `/invoice/123` jadi `/invoice/124` lalu ngintip nota belanja Klien B! *(Ini celah keamanan nomor 1 di dunia web: IDOR - Insecure Direct Object References).*

Solusinya: **Role-Based Access Control (RBAC) + Data Ownership Check.**

---

## 2. Tingkatan Kasta (Roles) di Aplikasi Bisnis
```text
┌──────────────────────────────────────────────────────────┐
│ 👑 OWNER (Super Admin)                                   │
│    - Akses 100%: Omset, Laporan Pajak, Hapus Data, CS    │
└────────────┬─────────────────────────────────────────────┘
             │
┌────────────▼─────────────────────────────────────────────┐
│ 💼 MANAGER / ADMIN CABANG                                │
│    - Kelola Stok, Input Diskon, Atur Shift Karyawan       │
└────────────┬─────────────────────────────────────────────┘
             │
┌────────────▼─────────────────────────────────────────────┐
│ 🏷️ KASIR / OPERATOR / MEKANIK                             │
│    - Cetak Bon, Input Servis Masuk, Terima Kas (Laci)     │
│    - DILARANG liat total laba bersih & modal awal         │
└──────────────────────────────────────────────────────────┘
```

---

## 3. Standar Arsitektur SOP (Implementasi di Next.js App Router)

### A. Skema Database Prisma (`schema.prisma`)
```prisma
enum Role {
  OWNER
  MANAGER
  KASIR
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  role      Role     @default(KASIR)
  branchId  String?  // Untuk multi-cabang (Row Isolation)
  orders    Order[]
}

model Order {
  id        String   @id @default(uuid())
  branchId  String   // Wajib terikat ke cabang pemilik!
  total     Int
  userId    String
  user      User     @relation(fields: [userId], references: [id])
}
```

---

### B. Helper Proteksi di Server (`lib/auth-guard.ts`)
> **Aturan Emas:** Jangan pernah percaya proteksi cuma di tampilan CSS (`display: none`). Proteksi sejati WAJIB ada di Server Component dan Server Actions!

```typescript
import { redirect } from 'next/navigation';

export type UserSession = {
  id: string;
  email: string;
  role: 'OWNER' | 'MANAGER' | 'KASIR';
  branchId: string;
};

// 1. Guard Halaman (Server Component)
export async function requireRole(allowedRoles: ('OWNER' | 'MANAGER' | 'KASIR')[]) {
  // Ambil session aktif (bisa dari cookies, JWT, Clerk, atau Auth.js)
  const session = await getSession(); 

  if (!session) {
    redirect('/login');
  }

  if (!allowedRoles.includes(session.role)) {
    // Kalau Kasir coba masuk ke ruang Owner, lempar ke dashboard kasir!
    redirect('/unauthorized');
  }

  return session;
}

// 2. Guard Data (Row-Level Security / Anti-IDOR)
export function enforceBranchOwnership(userSession: UserSession, orderBranchId: string) {
  // Kalau bukan Owner Pusat dan mencoba akses data cabang lain -> TOLAK!
  if (userSession.role !== 'OWNER' && userSession.branchId !== orderBranchId) {
    throw new Error('Akses Ditolak: Anda tidak memiliki hak atas data cabang ini!');
  }
}
```

---

### C. Implementasi di Server Component (`app/laporan-omset/page.tsx`)
```tsx
import { requireRole } from '@/lib/auth-guard';
import prisma from '@/lib/prisma';

export default async function LaporanOmsetPage() {
  // Hanya Koki dengan seragam OWNER yang boleh masak menu ini!
  const user = await requireRole(['OWNER']);

  const omset = await prisma.order.aggregate({
    _sum: { total: true },
    where: { branchId: user.branchId }
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Laporan Rahasia Omset Cabang</h1>
      <p className="text-emerald-600 font-semibold text-xl">
        Total: Rp {omset._sum.total?.toLocaleString('id-ID')}
      </p>
    </div>
  );
}
```

---

### D. Implementasi di Server Action (`actions/order-actions.ts`)
```typescript
'use server';

import { requireRole, enforceBranchOwnership } from '@/lib/auth-guard';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteOrderAction(orderId: string) {
  // 1. Cek Hak Akses Role
  const user = await requireRole(['OWNER']); // Kasir dilarang hapus order!

  // 2. Ambil data target
  const order = await prisma.order.findUnique({
    where: { id: orderId }
  });

  if (!order) throw new Error('Data tidak ditemukan');

  // 3. Validasi Kepemilikan (Row-Level Isolation)
  enforceBranchOwnership(user, order.branchId);

  // 4. Eksekusi Hapus
  await prisma.order.delete({
    where: { id: orderId }
  });

  revalidatePath('/daftar-pesanan');
  return { success: true };
}
```

---

## 4. Checklist Ringkas Modul 14 untuk Audit Proyek
- [ ] Role user tersimpan di DB sebagai `enum` (`OWNER`, `MANAGER`, `KASIR`).
- [ ] Route sensitif keuangan/pengaturan memiliki proteksi `requireRole(['OWNER'])`.
- [ ] Tombol aksi di UI yang tidak berhak disembunyikan (misal: tombol hapus cuma muncul untuk Owner).
- [ ] Setiap query DB mencantumkan `where: { branchId / userId: session.id }` agar data antar klien tidak bocor.
- [ ] Server Action mutasi data memverifikasi ulang role pelaksana sebelum eksekusi SQL.

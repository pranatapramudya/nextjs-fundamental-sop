import Link from "next/link";
import { getSession, switchRoleAction, deleteSensitiveDataAction } from "./actions";

export default async function RbacMejaVipPage() {
  const session = await getSession();

  // Data Dummy Pembukuan & Servis
  const daftarNota = [
    { id: "BON-001", customer: "Mobil Avanza Hitam", total: 450000, bay: "Bay 1 (Tune Up)" },
    { id: "BON-002", customer: "Innova Reborn Diesel", total: 1250000, bay: "Bay 2 (Ganti Oli & Filter)" },
    { id: "BON-003", customer: "Brio Satya Merah", total: 320000, bay: "Bay 3 (Cek Rem)" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      {/* Header Navigasi */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-amber-100 text-amber-800 border border-amber-300">
            Modul 14: Live RBAC Lab
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">
            Meja VIP & Kasir Khusus (Role-Based Access)
          </h1>
          <p className="text-sm text-slate-600">
            Simulasi pembagian kasta wewenang antara Owner, Kasir, dan Mekanik.
          </p>
        </div>
        <Link
          href="/"
          className="text-sm font-semibold text-blue-600 hover:text-blue-800 underline"
        >
          ← Kembali ke Lobi Utama
        </Link>
      </div>

      {/* Switcher Role Simulasi */}
      <div className="my-6 p-4 rounded-xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-500 font-semibold block">STATUS SESI SAAT INI:</span>
          <p className="font-bold text-slate-900 text-lg">
            {session.name}
          </p>
          <span className={`inline-block text-xs font-black px-2 py-0.5 rounded mt-1 ${
            session.role === 'OWNER' 
              ? 'bg-purple-100 text-purple-800 border border-purple-300' 
              : session.role === 'KASIR'
              ? 'bg-blue-100 text-blue-800 border border-blue-300'
              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
          }`}>
            ROLE: {session.role}
          </span>
        </div>

        {/* Tombol Pengganti Peran */}
        <form action={switchRoleAction} className="flex gap-2">
          <button
            type="submit"
            name="role"
            value="OWNER"
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
              session.role === 'OWNER'
                ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            👑 Masuk sbg Owner
          </button>
          <button
            type="submit"
            name="role"
            value="KASIR"
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
              session.role === 'KASIR'
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            🏷️ Masuk sbg Kasir
          </button>
          <button
            type="submit"
            name="role"
            value="MEKANIK"
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
              session.role === 'MEKANIK'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            🔧 Masuk sbg Mekanik
          </button>
        </form>
      </div>

      {/* 1. SEKTOR MEJA VIP (HANYA MUNCUL DI LEVEL OWNER) */}
      {session.role === "OWNER" ? (
        <div className="mb-6 p-5 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">👑</span>
            <h3 className="font-black text-purple-900 text-base">
              BRANKAS KEUANGAN RAHASIA (KHUSUS OWNER)
            </h3>
          </div>
          <p className="text-xs text-purple-700 mb-4">
            Komponen ini dirender di server hanya jika <code>session.role === 'OWNER'</code>. Kasir dan Mekanik dilarang melihat angka ini!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white p-3.5 rounded-lg border border-purple-100 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold">Omset Kotor Hari Ini</span>
              <p className="text-xl font-black text-emerald-600">Rp 18.750.000</p>
            </div>
            <div className="bg-white p-3.5 rounded-lg border border-purple-100 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold">Laba Bersih (Net Margin)</span>
              <p className="text-xl font-black text-purple-700">Rp 6.420.000</p>
            </div>
            <div className="bg-white p-3.5 rounded-lg border border-purple-100 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold">Saldo Kas Laci Kasir</span>
              <p className="text-xl font-black text-blue-600">Rp 2.100.000</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-dashed border-slate-300 text-center">
          <span className="text-lg">🔒</span>
          <p className="text-xs font-bold text-slate-600 mt-1">
            Brankas Keuangan Terkunci
          </p>
          <p className="text-[11px] text-slate-400">
            Anda login sebagai <strong>{session.role}</strong>. Hak akses brankas finansial diblokir dari sisi server.
          </p>
        </div>
      )}

      {/* 2. TABEL DATA NOTA OPERASIONAL */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50/70 border-b border-slate-200 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Daftar Nota Servis Kendaraan (Operasional Bersama)
            </h3>
            <p className="text-xs text-slate-500">
              Kasir melihat total harga, Mekanik melihat stall pengerjaan, Owner memegang kendali tombol hapus.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100/70 text-slate-500 uppercase font-bold text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-3">ID Nota</th>
                <th className="p-3">Kendaraan</th>
                {session.role !== "MEKANIK" && <th className="p-3">Total Biaya</th>}
                <th className="p-3">Stall Pengerjaan</th>
                <th className="p-3 text-right">Otoritas Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {daftarNota.map((nota) => (
                <tr key={nota.id} className="hover:bg-slate-50/50">
                  <td className="p-3 font-mono font-bold text-slate-900">{nota.id}</td>
                  <td className="p-3 font-semibold text-slate-800">{nota.customer}</td>
                  {session.role !== "MEKANIK" && (
                    <td className="p-3 font-semibold text-emerald-700">
                      Rp {nota.total.toLocaleString("id-ID")}
                    </td>
                  )}
                  <td className="p-3 font-medium text-slate-600">
                    <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[11px]">
                      {nota.bay}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    {session.role === "OWNER" ? (
                      <form action={deleteSensitiveDataAction} className="inline-block">
                        <input type="hidden" name="itemId" value={nota.id} />
                        <button
                          type="submit"
                          className="px-2.5 py-1 text-[11px] font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded transition"
                        >
                          Hapus Permanen
                        </button>
                      </form>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">
                        Tanpa Izin Hapus
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ringkasan Filosofi SOP */}
      <div className="mt-6 p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-amber-900">
        <p className="font-bold mb-1">💡 Filosofi SOP Modul 14 (Keamanan Dua Lapis):</p>
        <ol className="list-decimal pl-4 space-y-1">
          <li>
            <strong>Lapis Visual (Frontend):</strong> Tombol dan brankas disembunyikan berdasarkan role agar tidak membingungkan kasir/karyawan.
          </li>
          <li>
            <strong>Lapis Server (Backend / Server Action Guard):</strong> Di file <code>actions.ts</code>, fungsi <code>deleteSensitiveDataAction</code> memeriksa ulang <code>if (session.role !== 'OWNER') throw new Error(...)</code>. Jadi biarpun ada hacker yang mencoba nembak form lewat DevTools atau Postman, server akan langsung menolaknya mentah-mentah!
          </li>
        </ol>
      </div>
    </div>
  );
}

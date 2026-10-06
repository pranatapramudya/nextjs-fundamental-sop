import { NextResponse } from "next/server";

// Simulasi database menu restoran padang di dapur
const MENU_PADANG = [
  { id: 1, nama: "Rendang Sapi Dapur Utama", harga: 25000, stok: 15 },
  { id: 2, nama: "Ayam Gulai Pedas", harga: 18000, stok: 20 },
  { id: 3, nama: "Dendeng Batokok", harga: 26000, stok: 8 },
];

// 🚗 LOKET DRIVE-THRU (GET: Driver Ojol / Aplikasi Luar minta daftar menu)
export async function GET() {
  return NextResponse.json({
    status: 200,
    pesan: "Data menu Padang berhasil diambil dari loket drive-thru!",
    totalMenu: MENU_PADANG.length,
    data: MENU_PADANG,
    timestamp: new Date().toISOString(),
  });
}

// 📦 LOKET DRIVE-THRU (POST: Driver Ojol / Sistem Luar titip orderan baru)
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validasi format data dari aplikasi luar
    if (!body.namaPemesan || !body.menuPilihan) {
      return NextResponse.json(
        {
          status: 400,
          pesan: "Format orderan salah! Wajib cantumkan 'namaPemesan' dan 'menuPilihan'",
        },
        { status: 400 }
      );
    }

    const orderanBaru = {
      orderId: `PADANG-${Date.now()}`,
      namaPemesan: body.namaPemesan,
      menuPilihan: body.menuPilihan,
      status: "Sedang dibungkus daun pisang di dapur",
    };

    return NextResponse.json(
      {
        status: 201,
        pesan: "Orderan berhasil masuk ke dapur!",
        data: orderanBaru,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 500, pesan: "Format JSON tidak valid!" },
      { status: 500 }
    );
  }
}

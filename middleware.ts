import { NextResponse, type NextRequest } from "next/server";

// 👮‍♂️ POS SATPAM RESTORAN PADANG (Middleware)
// File ini jalan di gerbang terdepan sebelum halaman manapun sempat dimasak Koki!
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Ruangan yang dijaga ketat sama Satpam (Hanya untuk Owner)
  const isVipRoom = path.startsWith("/vip-owner");

  if (isVipRoom) {
    // Satpam ngecek apakah ada stempel kartu member di kantong tamu (Cookie)
    const tokenMember = request.cookies.get("kartu_member_owner")?.value;

    // Kalau gak punya kartu stempel yang valid:
    if (tokenMember !== "rahasia-bos-padang-123") {
      console.log(`[SATPAM] Cegat penyusup yang mau masuk ke ${path}! Diarahkan ke /login.`);
      // Satpam langsung tendang tamu ke halaman /login!
      return NextResponse.redirect(new URL("/login?pesan=wajib-login", request.url));
    }

    console.log(`[SATPAM] Kartu member terverifikasi! Silakan masuk ke Ruang VIP Owner.`);
  }

  // Kalau ruangan umum (Lobi, Menu, dll) atau kartu valid: Silakan lewat!
  return NextResponse.next();
}

// Konfigurasi ruangan mana aja yang dijaga satpam
export const config = {
  matcher: ["/vip-owner/:path*"],
};

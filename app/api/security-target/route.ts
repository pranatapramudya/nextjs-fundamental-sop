import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import db from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

// Schema Zod untuk validasi input
const OrderPayloadSchema = z.object({
  orderId: z.number().int().positive("ID Pesanan harus angka positif!"),
});

// =========================================================================
// 🎯 TARGET HACKER: ENDPOINT API PEMBATALAN PESANAN
// =========================================================================
export async function POST(req: NextRequest) {
  // 0. ⏱️ PERTAHANAN 0: RATE LIMITER ANTI-DDOS / SPAMMER
  // Ambil IP penyerang (atau fallback ke 127.0.0.1 di lokal)
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
  
  // Batas: Maksimal 3 kali tembakan dalam kurun waktu 10 detik!
  const limiter = rateLimit(ip, 3, 10000);

  if (!limiter.success) {
    return NextResponse.json(
      {
        status: "BLOCKED_BY_RATE_LIMITER",
        message: `⛔ 429 TOO MANY REQUESTS: Tenang bro! Lu ngebom server kecepetan! Coba lagi dalam ${limiter.resetInSeconds} detik.`,
        remainingAttempts: limiter.remaining,
        retryAfterSeconds: limiter.resetInSeconds,
      },
      {
        status: 429,
        headers: {
          "Retry-After": limiter.resetInSeconds.toString(),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }
  // 1. 🛡️ PERTAHANAN 1: BACA HTTP-ONLY COOKIE AUTH
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("auth_session");

  if (!sessionCookie?.value) {
    return NextResponse.json(
      {
        status: "BLOCKED_BY_AUTH_GUARD",
        message: "⛔ 401 UNAUTHORIZED: Anda adalah hacker tanpa sesi! Login dulu sebelum nembak API.",
      },
      { status: 401 }
    );
  }

  let session: { userId: string; tenantId: string; role: string };
  try {
    session = JSON.parse(sessionCookie.value);
  } catch {
    return NextResponse.json(
      {
        status: "INVALID_SESSION",
        message: "⛔ 400 BAD REQUEST: Sesi korup atau dipalsukan!",
      },
      { status: 400 }
    );
  }

  // 2. 🛡️ PERTAHANAN 2: BACA BODY & VALIDASI ZOD
  let rawBody: any;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json(
      {
        status: "INVALID_JSON",
        message: "⛔ 400 BAD REQUEST: Payload harus berupa JSON yang valid!",
      },
      { status: 400 }
    );
  }

  const validation = OrderPayloadSchema.safeParse(rawBody);
  if (!validation.success) {
    return NextResponse.json(
      {
        status: "BLOCKED_BY_ZOD",
        message: "⚠️ 422 UNPROCESSABLE ENTITY: Input ditolak Zod!",
        detail: validation.error.issues[0]?.message,
      },
      { status: 422 }
    );
  }

  const { orderId } = validation.data;

  // 3. 🛡️ PERTAHANAN 3: ANTI-IDOR & MULTI-TENANT ISOLATION
  // Kunci gembok: Hanya hapus jika orderId COCOK dengan tenant_id milik pelaku!
  const stmt = db.prepare(
    "DELETE FROM pesanan_cabang WHERE id = ? AND tenant_id = ?"
  );
  const result = stmt.run(orderId, session.tenantId);

  if (result.changes === 0) {
    return NextResponse.json(
      {
        status: "BLOCKED_BY_ANTI_IDOR",
        message: `⛔ 403 FORBIDDEN (SERANGAN IDOR TERDETEKSI!): Pesanan #${orderId} bukan milik [${session.tenantId}]. Data korban aman!`,
      },
      { status: 403 }
    );
  }

  return NextResponse.json({
    status: "SUCCESS",
    message: `✅ 200 OK: Pesanan #${orderId} sah milik [${session.tenantId}] dan berhasil dihapus!`,
  });
}

// ⏱️ LIB RATE LIMITER SEDERHANA (TOKEN BUCKET / SLIDING WINDOW IN-MEMORY)
// Di server production nyata, Anda bisa menghubungkannya ke Upstash Redis.
// Tapi secara fundamental, algoritma intinya adalah membatasi request per IP address!

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// Memory map untuk mencatat histori IP pengunjung
const ipRequestMap = new Map<string, RateLimitRecord>();

/**
 * Fungsi pembatas kecepatan (Rate Limiter)
 * @param ip IP Address client
 * @param limit Batas maksimal request yang diizinkan (misal: 5 request)
 * @param windowMs Rentang waktu dalam milidetik (misal: 10000 ms = 10 detik)
 */
export function rateLimit(ip: string, limit: number = 5, windowMs: number = 10000) {
  const now = Date.now();
  const record = ipRequestMap.get(ip);

  // Jika IP baru pertama kali datang atau rentang waktu sudah kadaluarsa: Reset kuota!
  if (!record || now > record.resetTime) {
    ipRequestMap.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      success: true,
      remaining: limit - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  // Jika masih dalam rentang waktu dan kuota masih ada:
  if (record.count < limit) {
    record.count += 1;
    return {
      success: true,
      remaining: limit - record.count,
      resetInSeconds: Math.ceil((record.resetTime - now) / 1000),
    };
  }

  // JIKA SUDAH MELEBIHI KUOTA: BLOKIR BOT/SERANGAN!
  return {
    success: false,
    remaining: 0,
    resetInSeconds: Math.ceil((record.resetTime - now) / 1000),
  };
}

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 h"),
  analytics: true,
});

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Sadece Server Actions dışındaki POST isteklerini rate-limit'le
  // Next.js Server Actions "Next-Action" header'ı ile gelir — onları engelleme
  const isServerAction = request.headers.has("Next-Action");

  if (request.method === "POST" && !isServerAction && pathname.startsWith("/api/")) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "127.0.0.1";

    const { success, remaining, reset } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        {
          error:
            "Saatlik yükleme limitine ulaştınız (3/saat). Lütfen daha sonra tekrar deneyin.",
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        }
      );
    }

    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Remaining", remaining.toString());
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/report/:path*"],
};

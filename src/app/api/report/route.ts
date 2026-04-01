import { NextResponse } from "next/server";

export async function POST() {
  // Bu endpoint sadece middleware rate limiting için matcher olarak kullanılıyor.
  // Gerçek iş mantığı server action'da (actions.ts).
  // Eğer ileride API route gerekirse buraya eklenebilir.
  return NextResponse.json({ ok: true });
}

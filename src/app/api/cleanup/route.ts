import { supabaseAdmin } from "@/lib/supabase-admin";
import { NextRequest, NextResponse } from "next/server";

const CLEANUP_SECRET = process.env.CLEANUP_SECRET || process.env.ADMIN_PASSWORD || "davar2026";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("authorization")?.replace("Bearer ", "");
  if (secret !== CLEANUP_SECRET) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  // 1. 7 günden eski onaylı raporları bul
  const { data: oldReports, error: fetchError } = await supabaseAdmin
    .from("reports")
    .select("id, image_url")
    .eq("status", "approved")
    .lt("created_at", sevenDaysAgo);

  if (fetchError) {
    console.error("Cleanup fetch error:", fetchError);
    return NextResponse.json({ error: "Veri alınamadı" }, { status: 500 });
  }

  if (!oldReports || oldReports.length === 0) {
    return NextResponse.json({ deleted: 0, message: "Temizlenecek rapor yok" });
  }

  // 2. Storage'dan fotoğrafları sil
  const filePaths = oldReports
    .map((r) => {
      const parts = (r.image_url as string).split("/violation-images/");
      return parts[1] || null;
    })
    .filter(Boolean) as string[];

  if (filePaths.length > 0) {
    const { error: storageError } = await supabaseAdmin.storage
      .from("violation-images")
      .remove(filePaths);
    if (storageError) {
      console.error("Storage cleanup error:", storageError);
    }
  }

  // 3. DB'den sil
  const ids = oldReports.map((r) => r.id);
  const { error: deleteError } = await supabaseAdmin
    .from("reports")
    .delete()
    .in("id", ids);

  if (deleteError) {
    console.error("DB cleanup error:", deleteError);
    return NextResponse.json({ error: "Silme başarısız" }, { status: 500 });
  }

  return NextResponse.json({
    deleted: ids.length,
    message: `${ids.length} eski rapor temizlendi`,
  });
}

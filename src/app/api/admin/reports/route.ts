import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "davar2026";
const VALID_FILTERS = ["pending", "approved", "rejected", "all"];
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function checkAuth(request: NextRequest) {
  const pw = request.headers.get("x-admin-password") || "";
  try {
    const a = Buffer.from(pw);
    const b = Buffer.from(ADMIN_PASSWORD);
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }
  return null;
}

export async function GET(request: NextRequest) {
  const authError = checkAuth(request);
  if (authError) return authError;

  const filter = request.nextUrl.searchParams.get("filter") || "pending";

  if (!VALID_FILTERS.includes(filter)) {
    return NextResponse.json({ error: "Geçersiz filtre" }, { status: 400 });
  }

  let query = supabase
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (filter !== "all") {
    query = query.eq("status", filter);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Admin fetch error:", error);
    return NextResponse.json({ error: "Veri alınamadı" }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

export async function PATCH(request: NextRequest) {
  const authError = checkAuth(request);
  if (authError) return authError;

  const { id, status } = await request.json();

  if (!id || typeof id !== "string" || !UUID_REGEX.test(id) || !["approved", "rejected"].includes(status)) {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  const { error } = await supabase
    .from("reports")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Admin update error:", error);
    return NextResponse.json({ error: "Güncelleme başarısız" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const authError = checkAuth(request);
  if (authError) return authError;

  const { id } = await request.json();

  if (!id || typeof id !== "string" || !UUID_REGEX.test(id)) {
    return NextResponse.json({ error: "Geçersiz ID" }, { status: 400 });
  }

  const { error } = await supabase
    .from("reports")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Admin delete error:", error);
    return NextResponse.json({ error: "Silme başarısız" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

import { supabase } from "@/lib/supabase";
import FeedClient from "./FeedClient";

async function getReports() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("status", "approved")
    .gte("created_at", sevenDaysAgo)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Feed fetch error:", error);
    return [];
  }

  return data || [];
}

async function getStats() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const weekStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [todayRes, weekRes, totalRes] = await Promise.all([
    supabase.from("reports").select("id", { count: "exact", head: true }).eq("status", "approved").gte("created_at", todayStart),
    supabase.from("reports").select("id", { count: "exact", head: true }).eq("status", "approved").gte("created_at", weekStart),
    supabase.from("report_stats").select("total_reports").single(),
  ]);

  return {
    today: todayRes.count ?? 0,
    week: weekRes.count ?? 0,
    allTime: (totalRes.data as { total_reports: number } | null)?.total_reports ?? 0,
  };
}

export default async function Feed() {
  const [reports, stats] = await Promise.all([getReports(), getStats()]);

  return (
    <>
      {/* Stats counters */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-2xl font-extrabold text-red-600 sm:text-3xl">{stats.today}</p>
          <p className="mt-1 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">Bugün</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-2xl font-extrabold text-red-600 sm:text-3xl">{stats.week}</p>
          <p className="mt-1 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">Bu Hafta</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-2xl font-extrabold text-red-600 sm:text-3xl">{stats.allTime}</p>
          <p className="mt-1 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">Toplam</p>
        </div>
      </div>

      {reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 dark:text-zinc-500">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
          </div>
          <h3 className="mb-1 text-lg font-semibold text-zinc-700 dark:text-zinc-300">
            Bu hafta bildirim yok
          </h3>
          <p className="max-w-xs text-sm text-zinc-500 dark:text-zinc-400">
            İlk bildirimi sen yap! Sokakta gördüğün ihlalleri fotoğrafla ve paylaş.
          </p>
        </div>
      ) : (
        <FeedClient reports={reports} />
      )}
    </>
  );
}

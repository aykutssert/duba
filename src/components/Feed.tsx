import { supabase } from "@/lib/supabase";
import FeedClient from "./FeedClient";
import CountUp from "./CountUp";
import EmptyState from "./EmptyState";

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
          <p className="text-2xl font-extrabold text-red-600 sm:text-3xl"><CountUp end={stats.today} /></p>
          <p className="mt-1 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">Bugün</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-2xl font-extrabold text-red-600 sm:text-3xl"><CountUp end={stats.week} /></p>
          <p className="mt-1 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">Bu Hafta</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-2xl font-extrabold text-red-600 sm:text-3xl"><CountUp end={stats.allTime} duration={1800} /></p>
          <p className="mt-1 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">Toplam</p>
        </div>
      </div>

      {reports.length === 0 ? (
        <EmptyState />
      ) : (
        <FeedClient reports={reports} />
      )}
    </>
  );
}

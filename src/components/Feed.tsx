import { supabase } from "@/lib/supabase";
import FeedClient from "./FeedClient";

async function getReports() {
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Feed fetch error:", error);
    return [];
  }

  return data || [];
}

export default async function Feed() {
  const reports = await getReports();

  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 dark:text-zinc-500">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
        </div>
        <h3 className="mb-1 text-lg font-semibold text-zinc-700 dark:text-zinc-300">
          Henüz bildirim yok
        </h3>
        <p className="max-w-xs text-sm text-zinc-500 dark:text-zinc-400">
          İlk bildirimi sen yap! Sokakta gördüğün ihlalleri fotoğrafla ve paylaş.
        </p>
      </div>
    );
  }

  return <FeedClient reports={reports} />;
}

"use client";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="relative mb-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/30">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 dark:text-red-500">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
        </div>
        <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white shadow-md">
          0
        </span>
      </div>
      <h3 className="mb-2 text-xl font-bold text-zinc-800 dark:text-zinc-200">
        Temiz bir hafta!
      </h3>
      <p className="mb-6 max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
        Bu hafta henüz onaylı bildirim yok. Sokakta bir ihlal gördüysen
        ilk bildirimi yapan sen ol!
      </p>
      <button
        onClick={() => window.dispatchEvent(new Event("open-upload-modal"))}
        className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-600/25 transition-all hover:bg-red-700 active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
          <circle cx="12" cy="13" r="3" />
        </svg>
        Bildirim Yap
      </button>
    </div>
  );
}

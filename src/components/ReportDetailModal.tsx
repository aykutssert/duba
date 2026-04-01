"use client";

import Image from "next/image";

interface Report {
  id: string;
  created_at: string;
  image_url: string;
  comment: string | null;
  category: string | null;
  latitude: number | null;
  longitude: number | null;
  address: string | null;
}

const CATEGORY_LABELS: Record<string, string> = {
  engelli_yolu: "Engelli yoluna park",
  kaldirim: "Kaldırıma park",
  bisiklet_yolu: "Bisiklet yoluna park",
  okul_onu: "Okul önüne park",
  diger: "Diğer",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface Props {
  report: Report;
  onClose: () => void;
}

export default function ReportDetailModal({ report, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl dark:bg-zinc-900">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative aspect-[4/3] w-full bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={report.image_url}
            alt={report.comment || "İhlal fotoğrafı"}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 672px"
            priority
          />
          {report.category && (
            <span className="absolute left-4 top-4 rounded-full bg-red-600/90 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
              {CATEGORY_LABELS[report.category] || report.category}
            </span>
          )}
        </div>

        {/* Details */}
        <div className="p-5 sm:p-6">
          {report.comment && (
            <p className="mb-4 text-base leading-relaxed text-zinc-800 dark:text-zinc-200">
              {report.comment}
            </p>
          )}

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
            {/* Date */}
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{formatDate(report.created_at)}</span>
            </div>

            {/* Location */}
            {(report.address || (report.latitude && report.longitude)) && (
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{report.address || `${report.latitude!.toFixed(4)}, ${report.longitude!.toFixed(4)}`}</span>
              </div>
            )}
          </div>

          {/* Map link */}
          {report.latitude && report.longitude && (
            <a
              href={`https://www.google.com/maps?q=${report.latitude},${report.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Haritada Gör
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

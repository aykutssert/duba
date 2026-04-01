"use client";

import { useState } from "react";
import ReportCard from "./ReportCard";
import ReportDetailModal from "./ReportDetailModal";

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

export default function FeedClient({ reports }: { reports: Report[] }) {
  const [selected, setSelected] = useState<Report | null>(null);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {reports.map((report) => (
          <div
            key={report.id}
            className="mb-4 cursor-pointer break-inside-avoid"
            onClick={() => setSelected(report)}
          >
            <ReportCard report={report} />
          </div>
        ))}
      </div>

      {selected && (
        <ReportDetailModal report={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

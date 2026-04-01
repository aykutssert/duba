"use client";

import { useEffect, useMemo, useState } from "react";

interface CityStats {
  city: string;
  count: number;
}

interface DistrictStats {
  city: string;
  district: string;
  count: number;
}

export default function GeoStatsSection() {
  const [cityStats, setCityStats] = useState<CityStats[]>([]);
  const [districtStats, setDistrictStats] = useState<DistrictStats[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats/geo")
      .then((res) => res.json())
      .then((data) => {
        setCityStats(data.cities || []);
        setDistrictStats(data.districts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredDistricts = useMemo(
    () => districtStats.filter((d) => d.city === selectedCity),
    [districtStats, selectedCity]
  );

  const sortedCities = useMemo(
    () => [...cityStats].sort((a, b) => b.count - a.count),
    [cityStats]
  );

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-red-600" />
          </div>
        </div>
      </section>
    );
  }

  if (sortedCities.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {/* Header */}
        <div className="border-b border-zinc-200 p-4 dark:border-zinc-800 sm:p-6">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl">
            İhlal Dağılımı
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Son 7 günde şehir ve ilçe bazlı ihlal sayıları
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 sm:p-6">
          {sortedCities.map((city) => {
            const isSelected = city.city === selectedCity;
            const cityDistricts = districtStats.filter((d) => d.city === city.city);
            
            return (
              <button
                key={city.city}
                onClick={() => setSelectedCity(isSelected ? "" : city.city)}
                className={`relative rounded-xl border p-4 text-left transition-all ${
                  isSelected
                    ? "border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-900/20"
                    : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`font-semibold ${
                      isSelected ? "text-red-900 dark:text-red-100" : "text-zinc-900 dark:text-zinc-50"
                    }`}>
                      {city.city}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      {cityDistricts.length} ilçe
                    </p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-sm font-bold ${
                    isSelected
                      ? "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}>
                    {city.count}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Districts Detail */}
        {selectedCity && filteredDistricts.length > 0 && (
          <div className="border-t border-zinc-200 p-4 dark:border-zinc-800 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                {selectedCity} — İlçe Dağılımı
              </h3>
              <button
                onClick={() => setSelectedCity("")}
                className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
              >
                Kapat
              </button>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {filteredDistricts
                .sort((a, b) => b.count - a.count)
                .map((district) => (
                  <div
                    key={district.district}
                    className="flex items-center justify-between rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-800/50"
                  >
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {district.district}
                    </span>
                    <span className="text-sm font-bold text-red-600 dark:text-red-400">
                      {district.count}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

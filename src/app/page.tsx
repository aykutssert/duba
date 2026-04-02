import { Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import GeoStatsSection from "@/components/GeoStatsSection";
import Feed from "@/components/Feed";
import SkeletonCard from "@/components/SkeletonCard";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />

      {/* Geo Stats */}
      <GeoStatsSection />

      <main id="bildirimler" className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {/* Stats bar */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl">
              Haftanın İhlal Karnesi
            </h2>
            <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
              Son 7 günde bildirilen ihlaller
            </p>
          </div>
        </div>

        {/* Feed */}
        <Suspense
          fallback={
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          }
        >
          <Feed />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white/50 dark:border-zinc-800 dark:bg-zinc-950/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Duba &mdash;
          </p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="text-xs text-zinc-400 transition-colors hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300">
              Gizlilik ve Koşullar
            </a>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">v1.0</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="aspect-[4/3] w-full animate-pulse bg-zinc-200 dark:bg-zinc-800" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-3/4 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-3 w-1/2 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="flex gap-2">
          <div className="h-3 w-16 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-3 w-20 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}

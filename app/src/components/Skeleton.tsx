"use client";

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className = "", style }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded bg-border/60 ${className}`}
      style={style}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
      <Skeleton className="h-8 w-32 mb-2" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

export function SkeletonChart({ height = 300 }: { height?: number }) {
  return (
    <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
      <Skeleton className="h-4 w-48 mb-4" />
      <Skeleton className={`w-full rounded-lg`} style={{ height }} />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="p-5 space-y-3">
        {/* Header */}
        <div className="flex gap-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-3 flex-1" />
          ))}
        </div>
        {/* Rows */}
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="flex gap-4">
            {[...Array(5)].map((_, j) => (
              <Skeleton key={j} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonPage() {
  return (
    <>
      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
      {/* Chart area */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <div className="lg:col-span-2">
          <SkeletonChart />
        </div>
        <SkeletonChart height={200} />
      </div>
      {/* Table */}
      <SkeletonTable />
    </>
  );
}

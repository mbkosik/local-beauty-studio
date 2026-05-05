export default function SiteLoading() {
  return (
    <div className="animate-pulse" aria-hidden="true">
      {/* Hero skeleton */}
      <div className="bg-muted h-[60vh] w-full rounded-none" />

      {/* Services skeleton */}
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 flex flex-col items-center gap-3">
          <div className="bg-muted h-8 w-48 rounded-lg" />
          <div className="bg-muted h-4 w-72 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-muted flex flex-col gap-4 rounded-xl p-6">
              <div className="bg-muted-foreground/20 h-10 w-10 rounded-full" />
              <div className="bg-muted-foreground/20 h-5 w-32 rounded-md" />
              <div className="space-y-2">
                <div className="bg-muted-foreground/20 h-3 w-full rounded" />
                <div className="bg-muted-foreground/20 h-3 w-5/6 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Text block skeleton */}
      <div className="mx-auto max-w-3xl px-6 pb-20">
        <div className="flex flex-col gap-3">
          <div className="bg-muted h-4 w-full rounded" />
          <div className="bg-muted h-4 w-11/12 rounded" />
          <div className="bg-muted h-4 w-4/5 rounded" />
        </div>
      </div>
    </div>
  )
}

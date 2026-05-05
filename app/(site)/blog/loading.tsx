export default function BlogLoading() {
  return (
    <div className="animate-pulse" aria-hidden="true">
      {/* Page header skeleton */}
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <div className="bg-muted h-9 w-40 rounded-lg" />
          <div className="bg-muted h-4 w-80 rounded-lg" />
        </div>

        {/* Posts grid skeleton */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-muted flex flex-col gap-4 overflow-hidden rounded-xl">
              {/* Image */}
              <div className="bg-muted-foreground/20 aspect-video w-full" />

              <div className="flex flex-col gap-3 p-5">
                {/* Category + date */}
                <div className="flex gap-3">
                  <div className="bg-muted-foreground/20 h-3 w-16 rounded" />
                  <div className="bg-muted-foreground/20 h-3 w-20 rounded" />
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <div className="bg-muted-foreground/20 h-5 w-full rounded" />
                  <div className="bg-muted-foreground/20 h-5 w-4/5 rounded" />
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <div className="bg-muted-foreground/20 h-3 w-full rounded" />
                  <div className="bg-muted-foreground/20 h-3 w-11/12 rounded" />
                  <div className="bg-muted-foreground/20 h-3 w-3/4 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

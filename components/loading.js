export default function Loading() {
  return (
    <div className="space-y-10">
      <div className="space-y-8">
        {/* Featured Posts Loading Skeleton */}
        <div className="h-8 w-64 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="grid gap-10 md:grid-cols-2 lg:gap-10">
          {[1, 2].map(i => (
            <div key={i} className="group cursor-pointer space-y-4">
              <div className="aspect-video overflow-hidden rounded-md bg-gray-200 dark:bg-gray-700" />
              <div className="space-y-2">
                <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regular Posts Loading Skeleton */}
      <div className="mt-10 grid animate-pulse gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="group cursor-pointer space-y-4">
            <div className="aspect-square overflow-hidden rounded-md bg-gray-200 dark:bg-gray-700" />
            <div className="space-y-2">
              <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

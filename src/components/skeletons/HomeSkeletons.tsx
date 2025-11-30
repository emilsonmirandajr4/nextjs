export function NewsCarouselSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-xl w-full h-[500px]" />
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-6" />
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex gap-3">
          <div className="w-24 h-24 bg-gray-200 rounded flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Carousel3DSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-xl w-full h-[600px]" />
    </div>
  );
}

export function TrendingTopicsSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-6" />
      {[...Array(10)].map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function NewsSectionSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-6" />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-3 pb-4 border-b border-gray-200">
          <div className="w-20 h-20 bg-gray-200 rounded flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-4/5" />
            <div className="h-3 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function VideoCarouselSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="mb-6 h-24 bg-gray-200 rounded-2xl" />
      
      {/* Video cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="bg-gray-200 rounded-lg aspect-video" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

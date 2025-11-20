/**
 * Loading Skeletons for different sections
 * Used as Suspense fallbacks for smooth PPR loading
 */

export function PostsListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-6 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        </div>
      ))}
    </div>
  );
}

export function CarouselSkeleton() {
  return (
    <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse" />
  );
}

export function SidebarSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
        </div>
      ))}
    </div>
  );
}

export function HeaderSkeleton() {
  return (
    <div className="h-24 bg-gray-200 animate-pulse" />
  );
}

export function NewsSectionSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="w-full h-40 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function VideoCarouselSkeleton() {
  return (
    <div className="h-72 bg-gray-200 rounded-lg animate-pulse" />
  );
}

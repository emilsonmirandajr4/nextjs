export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header skeleton */}
            <div className="h-20 bg-white border-b border-gray-200 animate-pulse" />
            {/* Navigation skeleton */}
            <div className="h-12 bg-black" />

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Category header skeleton */}
                <div className="mb-8 pb-4 border-b border-gray-200">
                    <div className="h-10 bg-gray-200 rounded w-1/4 animate-pulse mb-2" />
                    <div className="h-5 bg-gray-100 rounded w-1/2 animate-pulse" />
                </div>

                {/* Posts grid skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => (
                        <article
                            key={i}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                        >
                            {/* Image skeleton */}
                            <div className="aspect-video bg-gray-200 animate-pulse" />

                            {/* Content skeleton */}
                            <div className="p-5 space-y-3">
                                <div className="h-3 bg-gray-100 rounded w-1/4 animate-pulse" />
                                <div className="h-6 bg-gray-200 rounded w-full animate-pulse" />
                                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-100 rounded w-full animate-pulse" />
                                    <div className="h-4 bg-gray-100 rounded w-2/3 animate-pulse" />
                                </div>
                                <div className="h-4 bg-blue-100 rounded w-1/3 animate-pulse" />
                            </div>
                        </article>
                    ))}
                </div>
            </main>
        </div>
    );
}

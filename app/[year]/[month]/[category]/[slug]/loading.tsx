export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header skeleton */}
            <div className="h-20 bg-white border-b border-gray-200 animate-pulse" />
            {/* Navigation skeleton */}
            <div className="h-12 bg-black" />

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Breadcrumb skeleton */}
                <div className="h-12 bg-gray-100 rounded-lg mb-8 animate-pulse" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Article content skeleton */}
                    <article className="lg:col-span-9 space-y-4">
                        {/* Title */}
                        <div className="h-12 bg-gray-200 rounded w-full animate-pulse" />
                        <div className="h-12 bg-gray-200 rounded w-3/4 animate-pulse" />

                        {/* Excerpt */}
                        <div className="h-6 bg-gray-100 rounded w-full animate-pulse" />

                        {/* Meta info */}
                        <div className="flex gap-4 py-4 border-b border-gray-200">
                            <div className="h-4 bg-gray-100 rounded w-24 animate-pulse" />
                            <div className="h-4 bg-gray-100 rounded w-20 animate-pulse" />
                            <div className="h-4 bg-gray-100 rounded w-32 animate-pulse" />
                        </div>

                        {/* Featured image */}
                        <div className="aspect-video bg-gray-300 rounded-lg animate-pulse" />

                        {/* Content paragraphs */}
                        <div className="space-y-4 py-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="h-4 bg-gray-100 rounded w-full animate-pulse" />
                                    <div className="h-4 bg-gray-100 rounded w-full animate-pulse" />
                                    <div className="h-4 bg-gray-100 rounded w-4/5 animate-pulse" />
                                </div>
                            ))}
                        </div>
                    </article>

                    {/* Sidebar skeleton */}
                    <aside className="lg:col-span-3 space-y-6">
                        <div className="bg-gray-900 rounded-2xl p-4 space-y-3">
                            <div className="h-6 bg-gray-700 rounded w-1/2 animate-pulse" />
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-12 bg-gray-800 rounded-xl animate-pulse" />
                            ))}
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}

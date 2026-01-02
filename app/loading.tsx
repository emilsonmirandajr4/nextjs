export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header skeleton */}
            <div className="h-20 bg-white border-b border-gray-200 animate-pulse" />
            {/* Navigation skeleton */}
            <div className="h-12 bg-black" />

            {/* Main content skeleton */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Sidebar left skeleton */}
                    <div className="lg:col-span-3">
                        <div className="bg-gray-900 rounded-2xl p-4 space-y-3">
                            <div className="h-6 bg-gray-700 rounded w-1/2 animate-pulse" />
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="h-12 bg-gray-800 rounded-xl animate-pulse" />
                            ))}
                        </div>
                    </div>

                    {/* Main carousel skeleton */}
                    <div className="lg:col-span-6">
                        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4 animate-pulse" />
                        <div className="h-[370px] bg-gray-300 rounded-xl animate-pulse" />
                        <div className="flex gap-2 mt-4">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="flex-1 h-24 bg-gray-200 rounded-lg animate-pulse" />
                            ))}
                        </div>
                    </div>

                    {/* Sidebar right skeleton */}
                    <div className="lg:col-span-3">
                        <div className="bg-gray-900 rounded-2xl p-4 space-y-3">
                            <div className="h-6 bg-gray-700 rounded w-1/2 animate-pulse" />
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="h-12 bg-gray-800 rounded-xl animate-pulse" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

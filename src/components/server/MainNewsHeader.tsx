export default function MainNewsHeader() {
  return (
    <div className="relative mb-3">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-600 opacity-10 blur-xl"></div>
      <div className="relative p-[2px] rounded-xl animated-border shadow-2xl">
        <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-sky-500 blur-sm opacity-50"></div>
              <div className="relative w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">
              Principais Notícias
            </h2>
          </div>
          <div className="absolute -bottom-0.5 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-sky-500 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}

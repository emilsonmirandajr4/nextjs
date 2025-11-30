export default function EnganadoresHeader() {
  return (
    <div className="relative mb-4">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-rose-500 to-amber-400 opacity-40 blur-xl"></div>
      <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-red-500 via-red-600 to-rose-500">
        <div className="relative flex items-center justify-between gap-4 rounded-2xl bg-slate-950 px-4 py-3.5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-red-400 blur-sm opacity-70"></div>
              <div className="relative w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-red-500 via-red-400 to-amber-300 text-white shadow-lg shadow-red-500/50">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-slate-300">
                Os Verdadeiros
              </span>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                Enganadores
              </h2>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-200/80">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400"></span>
              </span>
              Análises em destaque
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

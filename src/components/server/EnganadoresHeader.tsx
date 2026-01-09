import { AlertTriangle } from "lucide-react";

export default function EnganadoresHeader() {
  return (
    <div className="relative mb-8">
      <div
        className="relative flex items-center justify-between gap-4 rounded-[20px] bg-black px-4 py-3.5 overflow-hidden"
        style={{
          boxShadow: 'rgba(255, 140, 0, 0.55) 4px 4px, rgba(255, 120, 0, 0.38) 8px 8px, rgba(255, 100, 0, 0.25) 12px 12px'
        }}
      >
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-4 h-4 text-white/80" strokeWidth={2} />
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-slate-300">
              Os Maiores
            </span>
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
              Enganadores
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

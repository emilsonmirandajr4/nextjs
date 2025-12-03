import { AlertTriangle } from "lucide-react";

export default function EnganadoresHeader() {
  return (
    <div className="relative mb-8">
      <div 
        className="relative flex items-center justify-between gap-4 rounded-[20px] bg-zinc-900 px-4 py-3.5"
        style={{
          boxShadow: 'rgba(255, 140, 0, 0.5) 5px 5px, rgba(255, 120, 0, 0.4) 10px 10px, rgba(255, 100, 0, 0.3) 15px 15px'
        }}
      >
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-4 h-4 text-white/80" strokeWidth={2} />
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-slate-300">
              Os Verdadeiros
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

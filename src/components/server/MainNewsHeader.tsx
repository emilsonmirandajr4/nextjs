import { Newspaper } from "lucide-react";

export default function MainNewsHeader() {
  return (
    <div className="relative mb-3">
      <div
        className="relative bg-black rounded-xl px-4 py-3 border border-white/10"
        style={{
          boxShadow: `
            rgba(255, 255, 255, 0.15) 2px 2px,
            rgba(255, 255, 255, 0.1) 4px 4px,
            rgba(255, 255, 255, 0.05) 6px 6px
          `
        }}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <Newspaper className="w-4 h-4 text-white/80 border border-white/30 rounded p-0.5" strokeWidth={2} />
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">
            Principais Notícias
          </h2>
        </div>
        <div className="absolute -bottom-0.5 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>
    </div>
  );
}

import { Newspaper } from "lucide-react";

export default function MainNewsHeader() {
  return (
    <div className="relative mb-3">
      <div 
        className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl px-4 py-3 border border-white/10"
        style={{
          boxShadow: `
            rgba(6, 95, 212, 0.4) 3px 3px,
            rgba(6, 95, 212, 0.25) 6px 6px,
            rgba(6, 95, 212, 0.15) 9px 9px
          `
        }}
      >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="relative w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center">
                <Newspaper className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">
              Principais Notícias
            </h2>
          </div>
          <div className="absolute -bottom-0.5 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-sky-500 to-transparent"></div>
        </div>
    </div>
  );
}

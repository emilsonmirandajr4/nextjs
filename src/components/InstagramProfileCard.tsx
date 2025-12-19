"use client";

import { ArrowUpRight, Users } from "lucide-react";
import OptimizedImage from "./OptimizedImage";

interface InstagramProfileCardProps {
  name: string;
  username: string;
  avatarUrl: string;
  followers?: string;
  verified?: boolean;
}

export default function InstagramProfileCard({
  name,
  username,
  avatarUrl,
  followers,
  verified = false,
}: InstagramProfileCardProps) {
  const profileUrl = `https://www.instagram.com/${username}`;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-black p-[1px] transition-all duration-500 hover:-translate-y-1 hover:border-white/30">
      {/* Glow backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 50%), radial-gradient(circle at 80% 0%, rgba(168,85,247,0.18), transparent 45%)",
        }}
      />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[1.1rem] bg-black/80 px-4 pb-4 pt-5">
        <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/30 via-pink-500/25 to-orange-400/30 blur-xl" />
            <div className="relative h-24 w-24 rounded-full border border-white/20 bg-black/80 p-1">
              <div className="h-full w-full overflow-hidden rounded-full">
                <OptimizedImage
                  src={avatarUrl}
                  alt={name}
                  ratio="1/1"
                  mode="cover"
                  placeholder="none"
                  eager={false}
                  usePicture={false}
                  sizes="96px"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {verified && (
              <div className="absolute -bottom-1 -right-1 rounded-full bg-white text-gray-900 shadow-lg">
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  />
                </svg>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-white">{name}</h3>
            <p className="text-sm text-gray-400">@{username}</p>
          </div>

          {followers && (
            <div className="mt-3 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-white/80">
              <Users className="h-3.5 w-3.5" />
              <span className="font-semibold text-white">{followers}</span>
              <span className="text-gray-400">seguidores</span>
            </div>
          )}
        </div>
        

        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-400 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(236,72,153,0.35)] transition-all duration-300 hover:shadow-[0_12px_30px_rgba(251,191,36,0.45)]"
        >
          Seguir
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

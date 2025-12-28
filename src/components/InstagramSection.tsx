import { Instagram } from "lucide-react";
import InstagramProfileCard from "./InstagramProfileCard";

const instagramProfiles = [
  {
    name: "Jair M. Bolsonaro",
    username: "jairmessiasbolsonaro",
    avatarUrl: "/wp-content/uploads/avatar-jair-up.png",
    followers: "27,1Mi",
    verified: true,
  },
  {
    name: "Dep. Gustavo Gayer",
    username: "gusgayer",
    avatarUrl: "/wp-content/uploads/avatar-gayer-up.png",
    followers: "2,6Mi",
    verified: true,
  },
  {
    name: "Dep. Nikolas Ferreira",
    username: "nikolasferreiradm",
    avatarUrl: "/wp-content/uploads/avatar-nikolas-up.png",
    followers: "18,8Mi",
    verified: true,
  },
  {
    name: "Sen. Flavio Bolsonaro",
    username: "flaviobolsonaro",
    avatarUrl: "/wp-content/uploads/avatar-flavio-up.png",
    followers: "6,3Mi",
    verified: true,
  },
];

export default function InstagramSection() {
  return (
    <section className="w-full">
      {/* Header */}
      <div 
        className="relative bg-black rounded-xl px-4 py-3 border border-white/10 mb-4"
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
            <Instagram className="w-4 h-4 text-white/100 border border-white/30 rounded p-0.5" strokeWidth={2} />
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">
            Vale a Pena Seguir
          </h2>
        </div>
        <div className="absolute -bottom-0.5 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>

      {/* Grid de Perfis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {instagramProfiles.map((profile) => (
          <InstagramProfileCard
            key={profile.username}
            name={profile.name}
            username={profile.username}
            avatarUrl={profile.avatarUrl}
            followers={profile.followers}
            verified={profile.verified}
          />
        ))}
      </div>
    </section>
  );
}

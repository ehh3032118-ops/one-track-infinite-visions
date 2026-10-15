"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Pause, ArrowRight, Disc3 } from "lucide-react";
import { useAudio } from "@/context/AudioContext";
import { formatSeconds } from "@/utils/format";

export default function HeroSection() {
  const { currentTrack, isPlaying, togglePlay, currentTime, progressPercent } = useAudio();

  const scrollToExplore = () => {
    const el = document.getElementById("featured-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Cinematic Background Image with Atmospheric Lighting */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=2000&q=85"
          alt="Cinematic dark tunnel"
          fill
          priority
          className="object-cover object-right lg:object-center opacity-40 brightness-75 contrast-125"
        />

        {/* Ambient Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/70 to-[#0A0A0C]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C] via-[#0A0A0C]/90 to-transparent w-full lg:w-3/4" />

        {/* Neon Lime Circular Graphic Orbit Overlay */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-neonLime/15 hidden lg:block pointer-events-none" />
        <div className="absolute right-24 top-1/2 -translate-y-1/2 w-[620px] h-[620px] rounded-full border border-white/5 hidden lg:block pointer-events-none" />
        <div className="absolute right-1/4 top-1/3 w-3 h-3 rounded-full bg-neonLime shadow-neon-sm animate-ping hidden lg:block" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline, Slogan, CTA */}
          <div className="lg:col-span-7 space-y-8">
            {/* Top Micro Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-neonLime shadow-neon-sm" />
              <span className="text-xs uppercase tracking-widest text-zinc-300 font-medium">
                Sound to Visual Creative Platform
              </span>
            </div>

            {/* Massive Headline with Neon Sparkles */}
            <div className="relative">
              <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-tight text-white leading-[1.05]">
                <span className="block">One Track,</span>
                <span className="relative inline-block mt-1">
                  Infinite Visions
                  <span className="text-neonLime">.</span>
                  {/* Decorative Sparkle Icons */}
                  <span className="absolute -top-3 -right-6 text-neonLime text-2xl lg:text-3xl animate-pulse">
                    ✦
                  </span>
                  <span className="absolute -bottom-2 right-1/4 text-neonLime/80 text-lg">
                    ✦
                  </span>
                </span>
              </h1>
            </div>

            {/* Slogan & Description */}
            <div className="space-y-3 max-w-xl">
              <p className="text-lg sm:text-xl font-semibold text-zinc-100 tracking-tight">
                하나의 음악, 무한한 시각.
              </p>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                같은 음악을 다룬 크리에이터들의 각자의 방식으로 해석한 작품들을 만나보세요.
                아트웍, 뮤직비디오, 모션그래픽으로 확장되는 사운드의 무한한 변주.
              </p>
            </div>

            {/* CTA Button & Quick Stats */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollToExplore}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-neonLime text-black font-extrabold text-base tracking-wide transition-all duration-300 hover:shadow-neon hover:scale-105 active:scale-95"
              >
                <span>Explore Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-6 px-4 py-2 border-l border-white/10 text-xs text-zinc-400">
                <div>
                  <span className="block text-white font-bold text-sm">1.2K+</span>
                  <span>Visions</span>
                </div>
                <div>
                  <span className="block text-white font-bold text-sm">480+</span>
                  <span>Creators</span>
                </div>
                <div>
                  <span className="block text-neonLime font-bold text-sm">Live</span>
                  <span>Open Call</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Area & Floating Audio Player */}
          <div className="lg:col-span-5 relative flex justify-end">
            {/* Visual Frame Accent */}
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Floating Audio Player Widget (Glassmorphism) */}
              <div className="relative lg:ml-auto w-full max-w-sm rounded-2xl bg-[#141418]/80 backdrop-blur-xl border border-white/10 p-5 shadow-2xl transition-all hover:border-white/20">
                {/* Header of Audio Widget */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Disc3
                      className={`w-4 h-4 text-neonLime ${
                        isPlaying ? "animate-spin" : ""
                      }`}
                      style={{ animationDuration: "3s" }}
                    />
                    <span className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase">
                      Now Playing
                    </span>
                  </div>
                  {/* Equalizer animation bars */}
                  <div className="flex items-end gap-0.5 h-3">
                    <span
                      className={`w-0.5 bg-neonLime rounded-full transition-all ${
                        isPlaying ? "animate-soundwave h-3" : "h-1"
                      }`}
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className={`w-0.5 bg-neonLime rounded-full transition-all ${
                        isPlaying ? "animate-soundwave h-2" : "h-1.5"
                      }`}
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className={`w-0.5 bg-neonLime rounded-full transition-all ${
                        isPlaying ? "animate-soundwave h-3.5" : "h-1"
                      }`}
                      style={{ animationDelay: "300ms" }}
                    />
                    <span
                      className={`w-0.5 bg-neonLime rounded-full transition-all ${
                        isPlaying ? "animate-soundwave h-2" : "h-2"
                      }`}
                      style={{ animationDelay: "75ms" }}
                    />
                  </div>
                </div>

                {/* Cover & Track Info */}
                <div className="flex items-center gap-4">
                  <Link
                    href={`/track/${currentTrack.id}`}
                    className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/10 group cursor-pointer block"
                    title="Track Universe 열기"
                  >
                    <Image
                      src={currentTrack.coverUrl}
                      alt={currentTrack.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/track/${currentTrack.id}`}
                      className="group/title block cursor-pointer"
                    >
                      <h3 className="text-white font-bold text-base truncate group-hover/title:text-neonLime transition-colors flex items-center gap-1">
                        <span>{currentTrack.title}</span>
                        <span className="text-[10px] text-neonLime opacity-0 group-hover/title:opacity-100 transition-opacity">
                          ↗
                        </span>
                      </h3>
                    </Link>
                    <p className="text-zinc-400 text-xs truncate">
                      {currentTrack.artist}
                    </p>
                    <span className="inline-block mt-1 text-[10px] text-neonLime/90 font-mono">
                      {currentTrack.genre || "Electronic / Ambient"}
                    </span>
                  </div>

                  {/* Play/Pause Button */}
                  <button
                    onClick={togglePlay}
                    className="w-11 h-11 rounded-full bg-neonLime text-black flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all shadow-neon-sm"
                    aria-label={isPlaying ? "Pause track" : "Play track"}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 fill-black" />
                    ) : (
                      <Play className="w-5 h-5 fill-black ml-0.5" />
                    )}
                  </button>
                </div>

                {/* Progress Bar & Timing */}
                <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5">
                  <div className="w-full bg-zinc-800/80 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-neonLime h-full rounded-full transition-all duration-300 shadow-neon-sm"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                    <span className="text-zinc-400">
                      {formatSeconds(currentTime)}
                    </span>
                    <span>{currentTrack.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

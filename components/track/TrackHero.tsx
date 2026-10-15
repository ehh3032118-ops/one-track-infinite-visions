"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Pause, ChevronLeft, Share2, Disc3 } from "lucide-react";
import { Track } from "@/types";
import { useAudio } from "@/context/AudioContext";
import { formatSeconds } from "@/utils/format";

interface TrackHeroProps {
  track: Track;
  activeCategoryTab: string;
  onSelectCategoryTab: (tab: string) => void;
}

export default function TrackHero({
  track,
  activeCategoryTab,
  onSelectCategoryTab,
}: TrackHeroProps) {
  const { currentTrack, isPlaying, togglePlay, playTrack, currentTime, progressPercent } = useAudio();
  const [copied, setCopied] = useState(false);

  const isThisTrackActive = currentTrack.id === track.id;
  const isThisTrackPlaying = isPlaying && isThisTrackActive;

  const handlePlayToggle = () => {
    if (isThisTrackActive) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  const subTabs = [
    { id: "Overview", label: "Overview" },
    { id: "Artwork", label: "Artwork" },
    { id: "Video", label: "Music Video" },
    { id: "Motion", label: "Motion" },
    { id: "Illustration", label: "Illustration" },
    { id: "More", label: "More" },
  ];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative pt-24 pb-6 overflow-hidden border-b border-white/10 bg-[#0A0A0C]">
      {/* Cinematic Ambient Background Backdrop */}
      <div className="absolute inset-0 z-0">
        <Image
          src={track.coverUrl}
          alt={track.title}
          fill
          priority
          className="object-cover opacity-20 blur-3xl scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/60 via-[#0A0A0C]/90 to-[#0A0A0C]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-neonLime transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Home으로 돌아가기</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-neonLime/10 border border-neonLime/30 text-neonLime text-[11px] font-mono font-medium">
              Track Universe 01
            </span>
            <button
              onClick={handleShare}
              className="p-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors relative"
              title="URL 공유하기"
            >
              <Share2 className="w-3.5 h-3.5" />
              {copied && (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-neonLime text-black text-[10px] font-bold font-mono">
                  Copied!
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Track Banner Container */}
        <div className="relative rounded-2xl bg-surface/80 backdrop-blur-xl border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden">
          {/* Subtle Glow Circle */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-neonLime/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Track Visual Artwork */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="relative aspect-video sm:aspect-square w-full max-w-sm rounded-xl overflow-hidden border border-white/10 shadow-2xl group">
                <Image
                  src={track.coverUrl}
                  alt={track.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs font-mono text-zinc-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  <Disc3 className="w-3.5 h-3.5 text-neonLime" />
                  <span>{track.genre || "Electronic"}</span>
                  {track.bpm && <span>· {track.bpm} BPM</span>}
                </div>
              </div>
            </div>

            {/* Right: Track Title, Artist, Player & Waveform Visualizer */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-neonLime mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neonLime shadow-neon-sm" />
                  ORIGINAL AUDIO TRACK
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  {track.title}
                </h1>
                <p className="text-base sm:text-lg text-zinc-300 font-medium mt-1">
                  by <span className="text-white font-bold">{track.artist}</span>
                </p>
                {track.description && (
                  <p className="text-xs sm:text-sm text-zinc-400 mt-2.5 leading-relaxed max-w-xl">
                    {track.description}
                  </p>
                )}
              </div>

              {/* Sound Player & Visualizer Waveform Bar */}
              <div className="p-4 sm:p-5 rounded-xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex items-center justify-between gap-4">
                  {/* Play/Pause Button */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handlePlayToggle}
                      className="w-12 h-12 rounded-full bg-neonLime text-black flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all shadow-neon"
                      aria-label={isThisTrackPlaying ? "Pause Track" : "Play Track"}
                    >
                      {isThisTrackPlaying ? (
                        <Pause className="w-5 h-5 fill-black" />
                      ) : (
                        <Play className="w-5 h-5 fill-black ml-0.5" />
                      )}
                    </button>
                    <div>
                      <span className="text-xs text-zinc-400 font-mono block">
                        {isThisTrackPlaying ? "PLAYING" : "PAUSED"}
                      </span>
                      <span className="text-sm font-bold text-white font-mono">
                        {isThisTrackActive ? formatSeconds(currentTime) : "00:00"} / {track.duration}
                      </span>
                    </div>
                  </div>

                  {/* Waveform Visualizer Bars */}
                  <div className="hidden sm:flex items-center gap-1 h-8 flex-1 max-w-xs justify-end px-3">
                    {Array.from({ length: 28 }).map((_, i) => {
                      // pseudo-waveform heights
                      const baseHeight = ((Math.sin(i * 0.7) + 1.2) / 2.2) * 26 + 4;
                      const isActive = isThisTrackActive && (i / 28) * 100 <= progressPercent;

                      return (
                        <span
                          key={i}
                          className={`w-1 rounded-full transition-all duration-200 ${
                            isActive
                              ? "bg-neonLime shadow-neon-sm"
                              : "bg-zinc-700 hover:bg-zinc-500"
                          }`}
                          style={{
                            height: isThisTrackPlaying ? `${Math.max(4, (baseHeight * (0.6 + Math.random() * 0.5)))}px` : `${baseHeight}px`,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Progress Slider Bar */}
                <div className="w-full bg-zinc-800/80 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-neonLime h-full rounded-full transition-all duration-300 shadow-neon-sm"
                    style={{ width: `${isThisTrackActive ? progressPercent : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub Category Tabs (Overview, Artwork, Music Video, Motion, Illustration, More) */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-white/10">
          {subTabs.map((tab) => {
            const isActive = activeCategoryTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectCategoryTab(tab.id)}
                className={`px-5 py-2.5 rounded-t-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap relative ${
                  isActive
                    ? "text-neonLime bg-white/[0.04] border-b-2 border-neonLime font-bold"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.02]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

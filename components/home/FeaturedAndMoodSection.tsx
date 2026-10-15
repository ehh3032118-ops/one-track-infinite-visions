"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Pause, ChevronRight, Sparkles } from "lucide-react";
import { FEATURED_TRACKS, MOOD_ITEMS } from "@/data/mockData";
import { useAudio } from "@/context/AudioContext";
import { Track } from "@/types";

export default function FeaturedAndMoodSection() {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();
  const [selectedMood, setSelectedMood] = useState<string>("mood-1");

  const handleTrackClick = (track: Track) => {
    if (currentTrack.id === track.id) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  return (
    <section id="featured-section" className="py-12 lg:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* ================= Left: Today's Featured (Cols 7 or 8) ================= */}
          <div className="lg:col-span-8 space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span className="text-zinc-400 font-normal">Today&apos;s</span>
                  <span>Featured</span>
                </h2>
                <span className="text-neonLime font-bold text-lg">→</span>
              </div>
              <button className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-neonLime transition-colors flex items-center gap-1 group">
                <span>View All</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* 4 Square Artwork Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {FEATURED_TRACKS.map((track) => {
                const isThisTrackPlaying = isPlaying && currentTrack.id === track.id;
                const isSelected = currentTrack.id === track.id;

                return (
                  <div
                    key={track.id}
                    className="group relative flex flex-col transition-all duration-300"
                  >
                    {/* Artwork Container */}
                    <div
                      className={`relative aspect-square w-full rounded-xl overflow-hidden bg-surface border transition-all duration-300 ${
                        isSelected
                          ? "border-neonLime shadow-neon-sm ring-1 ring-neonLime"
                          : "border-white/10 group-hover:border-white/30"
                      }`}
                    >
                      <Link href={`/track/${track.id}`} className="block relative w-full h-full cursor-pointer">
                        <Image
                          src={track.coverUrl}
                          alt={track.title}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105 brightness-90 group-hover:brightness-100"
                        />

                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                        {/* Vision Count Pill */}
                        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-neonLime" />
                          <span>{track.visionCount} visions</span>
                        </div>
                      </Link>

                      {/* Hover / Playing Quick Button Overlay */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTrackClick(track);
                        }}
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-200 cursor-pointer ${
                          isThisTrackPlaying
                            ? "opacity-100 bg-black/30 pointer-events-auto"
                            : "opacity-0 group-hover:opacity-100 bg-black/40 pointer-events-auto"
                        }`}
                        aria-label={isThisTrackPlaying ? "Pause" : "Play"}
                      >
                        <div className="w-10 h-10 rounded-full bg-neonLime text-black flex items-center justify-center shadow-neon transform hover:scale-110 active:scale-95 transition-transform">
                          {isThisTrackPlaying ? (
                            <Pause className="w-4 h-4 fill-black" />
                          ) : (
                            <Play className="w-4 h-4 fill-black ml-0.5" />
                          )}
                        </div>
                      </button>

                      {/* Equalizer indicator if playing */}
                      {isThisTrackPlaying && (
                        <div className="absolute bottom-2.5 right-2.5 flex items-end gap-0.5 h-3 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm pointer-events-none">
                          <span className="w-0.5 h-2.5 bg-neonLime animate-soundwave" />
                          <span
                            className="w-0.5 h-1.5 bg-neonLime animate-soundwave"
                            style={{ animationDelay: "150ms" }}
                          />
                          <span
                            className="w-0.5 h-3 bg-neonLime animate-soundwave"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Meta Info */}
                    <Link
                      href={`/track/${track.id}`}
                      className="mt-2.5 space-y-0.5 group/meta block cursor-pointer"
                    >
                      <h3
                        className={`text-sm font-bold truncate transition-colors flex items-center gap-1 ${
                          isSelected
                            ? "text-neonLime"
                            : "text-white group-hover/meta:text-neonLime"
                        }`}
                      >
                        <span>{track.title}</span>
                        <span className="text-[10px] text-neonLime opacity-0 group-hover/meta:opacity-100 transition-opacity">
                          ↗
                        </span>
                      </h3>
                      <p className="text-xs text-zinc-400 truncate">
                        {track.artist}
                      </p>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= Right: Mood Search (Cols 4 or 5) ================= */}
          <div className="lg:col-span-4 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono tracking-wider text-neonLime">
                  Curated Vibes
                </span>
                <span className="text-[11px] text-zinc-500 font-mono">
                  4 Categories
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                지금, 어떤 감정이신가요?
              </h2>
            </div>

            {/* 2x2 Mood Tag Cards */}
            <div className="grid grid-cols-2 gap-3">
              {MOOD_ITEMS.map((mood) => {
                const isActive = selectedMood === mood.id;
                return (
                  <div
                    key={mood.id}
                    onClick={() => setSelectedMood(mood.id)}
                    className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group p-3.5 flex flex-col justify-between border transition-all duration-300 ${
                      isActive
                        ? "border-neonLime ring-1 ring-neonLime shadow-neon-sm"
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    {/* Background image */}
                    <Image
                      src={mood.imageUrl}
                      alt={mood.title}
                      fill
                      sizes="(max-width: 640px) 50vw, 20vw"
                      className="object-cover brightness-60 group-hover:brightness-75 group-hover:scale-105 transition-all duration-500"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Top Tag Pill */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-zinc-300 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/5">
                        {mood.tag}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-neonLime shadow-neon-sm" />
                      )}
                    </div>

                    {/* Bottom Title & Subtitle */}
                    <div className="relative z-10">
                      <h4 className="text-white font-bold text-base leading-tight group-hover:text-neonLime transition-colors">
                        {mood.title}
                      </h4>
                      <p className="text-[10px] text-zinc-400 font-mono mt-0.5 truncate">
                        {mood.englishTitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

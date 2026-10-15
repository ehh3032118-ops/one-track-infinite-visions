"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Volume1,
  VolumeX,
  ListMusic,
  Maximize2,
  X,
  Disc3,
  ExternalLink,
} from "lucide-react";
import { useAudio } from "@/context/AudioContext";
import { FEATURED_TRACKS } from "@/data/mockData";
import { formatSeconds } from "@/utils/format";

export default function GlobalAudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    progressPercent,
    volume,
    isMuted,
    togglePlay,
    playTrack,
    seek,
    setVolume,
    toggleMute,
    playNextTrack,
    playPrevTrack,
  } = useAudio();

  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  const currentVol = isMuted ? 0 : volume;

  return (
    <>
      {/* Quick Playlist Popover */}
      {isPlaylistOpen && (
        <div className="fixed bottom-20 right-4 sm:right-8 z-50 w-80 max-w-[calc(100vw-2rem)] bg-[#141418] border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <ListMusic className="w-4 h-4 text-neonLime" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Now Playing Queue
              </span>
            </div>
            <button
              onClick={() => setIsPlaylistOpen(false)}
              className="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
            {FEATURED_TRACKS.map((t) => {
              const isSelected = t.id === currentTrack.id;
              return (
                <div
                  key={t.id}
                  onClick={() => {
                    playTrack(t);
                    setIsPlaylistOpen(false);
                  }}
                  className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? "bg-neonLime/15 border border-neonLime/30 text-white"
                      : "hover:bg-white/5 text-zinc-300"
                  }`}
                >
                  <div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-black">
                    <Image
                      src={t.coverUrl}
                      alt={t.title}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                    {isSelected && isPlaying && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-neonLime animate-ping" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-bold truncate ${
                        isSelected ? "text-neonLime" : "text-white"
                      }`}
                    >
                      {t.title}
                    </p>
                    <p className="text-[11px] text-zinc-400 truncate">{t.artist}</p>
                  </div>

                  <span className="text-[11px] font-mono text-zinc-500 shrink-0">
                    {t.duration}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Fixed Floating Player Bar */}
      <aside
        className="fixed bottom-0 left-0 right-0 z-50 bg-[#121216]/95 backdrop-blur-md border-t border-white/10 px-4 sm:px-6 py-2.5 sm:py-3 shadow-2xl transition-all"
        aria-label="Global Audio Player"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
          {/* ================= Left: Track Info ================= */}
          <div className="flex items-center gap-3 min-w-0 sm:w-1/4">
            <Link
              href={`/track/${currentTrack.id}`}
              className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden shrink-0 border border-white/10 group cursor-pointer bg-black"
              title="트랙 상세로 이동"
            >
              <Image
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                fill
                sizes="48px"
                className={`object-cover group-hover:scale-110 transition-transform duration-300 ${
                  isPlaying ? "scale-105" : ""
                }`}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              {isPlaying && (
                <div className="absolute inset-0 ring-1 ring-neonLime/50 rounded-lg pointer-events-none" />
              )}
            </Link>

            <div className="min-w-0 flex-1">
              <Link
                href={`/track/${currentTrack.id}`}
                className="group/title flex items-center gap-1.5"
                title={`${currentTrack.title} - ${currentTrack.artist}`}
              >
                <span className="text-xs sm:text-sm font-bold text-white group-hover/title:text-neonLime transition-colors truncate">
                  {currentTrack.title}
                </span>
                <ExternalLink className="w-3 h-3 text-zinc-500 group-hover/title:text-neonLime opacity-0 group-hover/title:opacity-100 transition-all shrink-0 hidden sm:inline-block" />
              </Link>
              <p className="text-[11px] text-zinc-400 truncate">
                {currentTrack.artist}
              </p>
            </div>
          </div>

          {/* ================= Center: Controls & Seek Bar ================= */}
          <div className="flex-1 max-w-xl flex flex-col items-center gap-1.5 px-2">
            {/* Playback Button Controls */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Prev Track */}
              <button
                onClick={playPrevTrack}
                className="text-zinc-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5 active:scale-95"
                aria-label="이전 곡"
                title="이전 곡"
              >
                <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Play / Pause Primary Button */}
              <button
                onClick={togglePlay}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#D4FF00] text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-neon-sm hover:shadow-neon"
                aria-label={isPlaying ? "일시정지" : "재생"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-black" />
                ) : (
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-black ml-0.5" />
                )}
              </button>

              {/* Next Track */}
              <button
                onClick={playNextTrack}
                className="text-zinc-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5 active:scale-95"
                aria-label="다음 곡"
                title="다음 곡"
              >
                <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Slider & Timing Bar */}
            <div className="w-full flex items-center gap-2.5 text-[11px] font-mono text-zinc-400">
              <span className="w-10 text-right text-zinc-300">
                {formatSeconds(currentTime)}
              </span>

              {/* Interactive Seek Bar */}
              <div className="relative flex-1 flex items-center group py-1">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="1"
                  value={currentTime}
                  onChange={handleSliderChange}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#D4FF00] group-hover:h-2 transition-all"
                  aria-label="재생 구간 탐색"
                />
                {/* Visual Fill Track */}
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 group-hover:h-2 bg-[#D4FF00] rounded-lg pointer-events-none transition-all shadow-neon-sm"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <span className="w-10 text-zinc-500">
                {formatSeconds(duration)}
              </span>

              {/* Mini Sound Waveform Visualizer */}
              <div className="hidden md:flex items-center gap-0.5 h-3 pl-1 shrink-0">
                {[4, 10, 6, 12, 5].map((h, idx) => (
                  <span
                    key={idx}
                    className={`w-0.5 bg-neonLime rounded-full transition-all duration-300 ${
                      isPlaying ? "animate-pulse" : "opacity-40"
                    }`}
                    style={{
                      height: isPlaying ? `${Math.max(3, h * (0.6 + ((idx % 3) * 0.3)))}px` : "3px",
                      animationDelay: `${idx * 120}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ================= Right: Volume & Extra Actions ================= */}
          <div className="flex items-center justify-end gap-3 sm:w-1/4">
            {/* Volume Control */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-zinc-400 hover:text-white transition-colors p-1"
                aria-label={isMuted ? "음소거 해제" : "음소거"}
                title={isMuted ? "음소거 해제" : "음소거"}
              >
                {isMuted || currentVol === 0 ? (
                  <VolumeX className="w-4 h-4 text-rose-400" />
                ) : currentVol < 0.5 ? (
                  <Volume1 className="w-4 h-4 text-zinc-300" />
                ) : (
                  <Volume2 className="w-4 h-4 text-zinc-300" />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.02"
                value={currentVol}
                onChange={handleVolumeChange}
                className="w-16 sm:w-20 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#D4FF00]"
                aria-label="볼륨 조절"
              />
            </div>

            {/* Track Universe Link Button */}
            <Link
              href={`/track/${currentTrack.id}`}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-neonLime hover:bg-white/5 transition-colors hidden md:flex items-center"
              title="Track Universe 전체 화면"
            >
              <Maximize2 className="w-4 h-4" />
            </Link>

            {/* Playlist Queue Toggle */}
            <button
              onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
              className={`p-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                isPlaylistOpen
                  ? "bg-neonLime/15 border-neonLime/40 text-neonLime"
                  : "bg-white/[0.04] border-white/10 text-zinc-300 hover:text-white hover:border-white/20"
              }`}
              title="재생 대기열 목록"
            >
              <ListMusic className="w-4 h-4" />
              <Disc3
                className={`w-3.5 h-3.5 text-neonLime ${
                  isPlaying ? "animate-spin" : ""
                }`}
                style={{ animationDuration: "4s" }}
              />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

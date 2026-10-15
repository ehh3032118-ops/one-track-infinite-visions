"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { OPEN_CALL_DATA, POPULAR_CREATORS } from "@/data/mockData";

export default function BottomSplitSection() {
  const [followingState, setFollowingState] = useState<Record<string, boolean>>({});

  const toggleFollow = (creatorId: string) => {
    setFollowingState((prev) => ({
      ...prev,
      [creatorId]: !prev[creatorId],
    }));
  };

  return (
    <section className="py-12 lg:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* ================= Left: Open Call Banner (Cols 6 or 7) ================= */}
          <div className="lg:col-span-6 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span>Open Call</span>
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                  지금 진행 중인 프로젝트
                </p>
              </div>
              <Link
                href="/store"
                className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-neonLime transition-colors flex items-center gap-1 group"
              >
                <span>공모 전체보기</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Open Call Card Container */}
            <div className="relative rounded-2xl bg-surface border border-white/10 hover:border-neonLime/30 transition-all duration-300 p-5 sm:p-6 overflow-hidden group shadow-card">
              {/* Subtle Ambient Glow in Card */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-neonLime/5 rounded-full blur-3xl pointer-events-none group-hover:bg-neonLime/10 transition-colors" />

              <div className="flex flex-col sm:flex-row gap-5 items-start">
                {/* Album Cover Thumbnail */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-black/50">
                  <Image
                    src={OPEN_CALL_DATA.coverUrl}
                    alt={OPEN_CALL_DATA.title}
                    fill
                    sizes="(max-width: 640px) 112px, 128px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-center">
                    <span className="text-[10px] font-mono tracking-widest text-zinc-300 uppercase">
                      Single Project
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 space-y-3 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-neonLime transition-colors">
                        SEA
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-zinc-300">
                        {OPEN_CALL_DATA.title.replace("SEA ", "")}
                      </p>
                    </div>

                    {/* D-Day Neon Badge */}
                    <span className="px-3 py-1 rounded-full bg-neonLime/10 border border-neonLime/40 text-neonLime text-xs font-mono font-bold shrink-0 shadow-neon-sm">
                      {OPEN_CALL_DATA.dDay}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {OPEN_CALL_DATA.description}
                  </p>

                  {/* Hash Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {OPEN_CALL_DATA.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/5 text-zinc-400 hover:text-white transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer in Card */}
              <div className="mt-5 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-[11px] text-zinc-400 font-mono w-full sm:w-auto text-left">
                  주최: <span className="text-zinc-200">{OPEN_CALL_DATA.organizer}</span>
                  {OPEN_CALL_DATA.prize && (
                    <span className="ml-2 text-neonLime font-semibold">
                      · {OPEN_CALL_DATA.prize.split("+")[0]}
                    </span>
                  )}
                </div>

                <Link
                  href="/store"
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-neonLime/15 text-neonLime hover:bg-neonLime hover:text-black border border-neonLime/30 transition-all duration-200 font-bold text-xs flex items-center justify-center gap-1.5 shadow-neon-sm"
                >
                  <span>프로젝트 참여하기</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* ================= Right: Popular Creators (Cols 6 or 5) ================= */}
          <div className="lg:col-span-6 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Popular Creators
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                  다양한 시각으로 트랙을 해석하는 아티스트
                </p>
              </div>
              <button className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-neonLime transition-colors flex items-center gap-1 group">
                <span>View All</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* 4 Creators Horizontal Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {POPULAR_CREATORS.map((creator) => {
                const isFollowed = followingState[creator.id];

                return (
                  <div
                    key={creator.id}
                    className="group flex flex-col items-center text-center p-4 rounded-xl bg-surface border border-white/10 hover:border-neonLime/40 transition-all duration-300 hover:shadow-card hover:-translate-y-1 cursor-pointer"
                  >
                    {/* Circular Avatar & Info Link */}
                    <Link
                      href="/creator/studio37"
                      className="flex flex-col items-center w-full group/creator cursor-pointer"
                    >
                      <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full p-0.5 border border-white/20 group-hover:border-neonLime transition-colors duration-300 mb-3">
                        <div className="relative w-full h-full rounded-full overflow-hidden">
                          <Image
                            src={creator.avatarUrl}
                            alt={creator.name}
                            fill
                            sizes="(max-width: 640px) 64px, 72px"
                            className="object-cover group-hover/creator:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-neonLime border-2 border-black" />
                      </div>

                      {/* Creator Name */}
                      <h3 className="text-white font-bold text-sm tracking-tight truncate max-w-full group-hover/creator:text-neonLime transition-colors flex items-center gap-1">
                        <span>{creator.name}</span>
                        <span className="text-[10px] text-neonLime opacity-0 group-hover/creator:opacity-100 transition-opacity">
                          ↗
                        </span>
                      </h3>

                      {/* Role Label */}
                      <span className="text-[11px] font-mono text-zinc-400 truncate max-w-full mt-0.5">
                        {creator.role}
                      </span>
                    </Link>

                    {/* Follow Action Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFollow(creator.id);
                      }}
                      className={`mt-3 w-full py-1 px-2 rounded-lg text-[11px] font-semibold transition-all duration-200 flex items-center justify-center gap-1 ${
                        isFollowed
                          ? "bg-white/10 text-zinc-300 border border-white/10"
                          : "bg-white/[0.04] text-zinc-200 hover:bg-neonLime hover:text-black border border-white/10 hover:border-neonLime"
                      }`}
                    >
                      {isFollowed ? (
                        <>
                          <Check className="w-3 h-3 text-neonLime" />
                          <span>Following</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" />
                          <span>Follow</span>
                        </>
                      )}
                    </button>
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

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowUpRight, Heart, Eye, Sparkles, Wrench } from "lucide-react";
import { CreatorProfile } from "@/types";

interface CreatorPortfolioProps {
  creator: CreatorProfile;
}

export default function CreatorPortfolio({ creator }: CreatorPortfolioProps) {
  return (
    <section className="py-12 lg:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* ================= 1. 소개글 & 사용 툴 2단 레이아웃 ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Bio Statement (Cols 7) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neonLime" />
              <h2 className="text-xs font-mono uppercase text-neonLime tracking-wider">
                About The Creator
              </h2>
            </div>
            <div className="p-6 rounded-2xl bg-surface border border-white/10 space-y-3 shadow-card">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                시각적 해석으로 음악의 공간을 확장합니다.
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {creator.bio}
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-zinc-400">
                <span className="px-2.5 py-1 rounded-md bg-black/40 border border-white/5">
                  #AudioVisual
                </span>
                <span className="px-2.5 py-1 rounded-md bg-black/40 border border-white/5">
                  #KineticTypography
                </span>
                <span className="px-2.5 py-1 rounded-md bg-black/40 border border-white/5">
                  #3DGlitchArt
                </span>
              </div>
            </div>
          </div>

          {/* Right: Tools & Software (Cols 5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-zinc-400" />
              <h2 className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
                사용 툴 / 프로그램
              </h2>
            </div>
            <div className="p-6 rounded-2xl bg-surface border border-white/10 space-y-4 shadow-card">
              <div className="grid grid-cols-3 gap-3">
                {creator.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-black/40 border border-white/5 hover:border-neonLime/30 transition-colors group cursor-default"
                  >
                    {/* Tool Badge Logo */}
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm mb-1.5 shadow-sm border border-white/10 transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                        color: tool.color,
                      }}
                    >
                      {tool.short}
                    </div>
                    <span className="text-[11px] font-mono text-zinc-300 group-hover:text-white transition-colors truncate max-w-full">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= 2. 최근 공개 작품 그리드 ================= */}
        <div className="space-y-6 pt-4 border-t border-white/5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <span>최근 공개작업</span>
                <span className="text-xs font-mono font-bold text-neonLime px-2 py-0.5 rounded-full bg-neonLime/10 border border-neonLime/30">
                  {creator.recentWorks.length}
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                Studio 37의 최신 아카이브 및 2차 창작물
              </p>
            </div>

            <button className="text-xs sm:text-sm font-semibold text-zinc-400 hover:text-neonLime transition-colors flex items-center gap-1 group">
              <span>View All</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 3-Column Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {creator.recentWorks.map((work) => (
              <Link
                key={work.id}
                href="/project/midnight-cover"
                className="group flex flex-col bg-surface border border-white/10 hover:border-neonLime/40 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-card hover:-translate-y-1.5 cursor-pointer"
              >
                {/* Artwork Thumbnail (4:5 / 16:10 Cinematic Frame) */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-black/60">
                  <Image
                    src={work.coverUrl}
                    alt={work.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 brightness-95 group-hover:brightness-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-30 transition-opacity" />

                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300">
                    {work.category}
                  </span>

                  {/* Direct Link Arrow Icon */}
                  <div className="absolute top-3 right-3 p-2 rounded-full bg-neonLime text-black font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-neon-sm transform translate-y-1 group-hover:translate-y-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>

                  {/* Bottom Stats Badge */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono text-zinc-300">
                      <Heart className="w-3 h-3 text-red-400 fill-red-400" />
                      {work.likes}
                    </span>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono text-zinc-300">
                      <Eye className="w-3 h-3 text-zinc-400" />
                      {work.views}
                    </span>
                  </div>
                </div>

                {/* Meta Footer */}
                <div className="p-4 space-y-1">
                  <h3 className="text-white font-bold text-base truncate group-hover:text-neonLime transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-xs text-zinc-400 truncate">
                    Track: <span className="text-zinc-200">{work.trackTitle}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

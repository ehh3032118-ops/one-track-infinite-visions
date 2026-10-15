"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowUpRight, Heart, Layers } from "lucide-react";
import { ProcessStep, TrackCreation } from "@/types";

interface ProjectProcessProps {
  steps: ProcessStep[];
  relatedCreations: TrackCreation[];
  trackId: string;
}

export default function ProjectProcess({
  steps,
  relatedCreations,
  trackId,
}: ProjectProcessProps) {
  const [selectedModalImage, setSelectedModalImage] = useState<ProcessStep | null>(null);

  return (
    <section className="py-12 lg:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* ================= 1. 제작 과정 섹션 (Behind The Scenes) ================= */}
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-neonLime" />
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                제작 과정
              </h2>
              <span className="text-xs font-mono text-zinc-400 hidden sm:inline-block">
                Behind the Scenes Process
              </span>
            </div>

            <button className="text-xs sm:text-sm font-semibold text-zinc-400 hover:text-neonLime transition-colors flex items-center gap-1 group">
              <span>View All</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 4-Column Sketch / Process Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {steps.map((step) => (
              <div
                key={step.stepNumber}
                onClick={() => setSelectedModalImage(step)}
                className="group flex flex-col bg-surface border border-white/10 hover:border-neonLime/40 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-card hover:-translate-y-1 cursor-pointer"
              >
                {/* Process Step Image Container (Sketch / Draft / Monochrome) */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60">
                  <Image
                    src={step.imageUrl}
                    alt={step.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                  {/* Step Number Badge */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono font-bold text-neonLime shadow-neon-sm">
                    {step.stepNumber}
                  </div>

                  {/* Hover Inspect Icon */}
                  <div className="absolute top-3 right-3 p-1.5 rounded-full bg-neonLime text-black opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Step Description Content */}
                <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white font-bold text-base group-hover:text-neonLime transition-colors">
                      {step.stepNumber}. {step.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mt-1 line-clamp-2">
                      {step.description}
                    </p>
                  </div>
                  <div className="pt-2 text-[11px] font-mono text-zinc-500">
                    Step {step.stepNumber} of 04
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 2. 관련 작품 섹션 (Related Creations) ================= */}
        <div className="space-y-6 pt-4 border-t border-white/5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                관련 작품
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                동일한 트랙(Midnight)을 다룬 다른 크리에이터들의 시각 해석
              </p>
            </div>

            <Link
              href={`/track/${trackId}`}
              className="text-xs sm:text-sm font-semibold text-zinc-400 hover:text-neonLime transition-colors flex items-center gap-1 group"
            >
              <span>Track Universe 전체보기</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Related Creations Grid (4 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedCreations.slice(1, 5).map((item) => (
              <Link
                key={item.id}
                href={`/project/${item.id}`}
                className="group flex flex-col bg-surface border border-white/10 hover:border-neonLime/40 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-card hover:-translate-y-1.5 cursor-pointer"
              >
                {/* Artwork Thumbnail */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                  <Image
                    src={item.coverUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                  {/* Category Pill */}
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300">
                    {item.category}
                  </span>

                  {/* Likes Pill */}
                  <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono text-zinc-300">
                    <Heart className="w-3 h-3 text-red-400 fill-red-400" />
                    <span>{item.likes}</span>
                  </div>
                </div>

                {/* Meta */}
                <div className="p-3.5 space-y-0.5">
                  <h3 className="text-white font-bold text-sm truncate group-hover:text-neonLime transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 truncate">
                    by <span className="text-zinc-200">{item.creator.name}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Optional Process Zoom Modal */}
      {selectedModalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedModalImage(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#141418] border border-white/20 rounded-2xl overflow-hidden p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white">
                {selectedModalImage.stepNumber}. {selectedModalImage.title}
              </h3>
              <button
                onClick={() => setSelectedModalImage(null)}
                className="text-zinc-400 hover:text-white p-1 text-sm font-mono"
              >
                ✕ CLOSE
              </button>
            </div>
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10">
              <Image
                src={selectedModalImage.imageUrl}
                alt={selectedModalImage.title}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm text-zinc-300">
              {selectedModalImage.description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Heart, Eye, ArrowUpRight } from "lucide-react";
import { LATEST_PROJECTS } from "@/data/mockData";
import { Project } from "@/types";

export default function LatestProjectsSection() {
  const [likedProjects, setLikedProjects] = useState<Record<string, boolean>>({});

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedProjects((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="py-12 lg:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-neonLime font-mono text-xs uppercase tracking-wider">
                Discovery Feed
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-600" />
              <span className="text-xs text-zinc-400 font-mono">5 New Drops</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Latest Projects
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              지금 가장 주목받는 창작물
            </p>
          </div>

          <button className="self-start sm:self-auto text-xs sm:text-sm font-semibold text-zinc-400 hover:text-neonLime transition-colors flex items-center gap-1 group">
            <span>View All</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {LATEST_PROJECTS.map((project: Project) => {
            const isLiked = likedProjects[project.id];
            const currentLikes = project.likes + (isLiked ? 1 : 0);

            return (
              <Link
                key={project.id}
                href="/project/midnight-cover"
                className="group flex flex-col bg-surface border border-white/10 hover:border-neonLime/40 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-card hover:-translate-y-1 cursor-pointer"
              >
                {/* Thumbnail Container (4:5 Aspect Ratio for cinematic art feel) */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/50">
                  <Image
                    src={project.coverUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 brightness-95 group-hover:brightness-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Top Badge (if any) */}
                  {project.badge && (
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-neonLime/30 text-[10px] font-mono font-medium text-neonLime">
                      {project.badge}
                    </div>
                  )}

                  {/* Hover Quick Action Buttons */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={(e) => toggleLike(e, project.id)}
                      className="p-1.5 rounded-full bg-black/70 backdrop-blur-md text-white hover:text-red-400 hover:bg-black transition-colors"
                      aria-label="Like project"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isLiked ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                    </button>
                    <div className="p-1.5 rounded-full bg-neonLime text-black font-bold">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Bottom Stats Overlay on Image */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono text-zinc-300">
                    <span className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-sm">
                      <Eye className="w-3 h-3 text-zinc-400" />
                      {project.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-sm">
                      <Heart
                        className={`w-3 h-3 ${
                          isLiked ? "fill-red-500 text-red-500" : "text-zinc-400"
                        }`}
                      />
                      {currentLikes.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-3.5 flex flex-col justify-between flex-1 space-y-2">
                  <div>
                    {/* Category Label */}
                    <span className="text-[11px] font-mono font-medium text-neonLime/90 uppercase tracking-wide">
                      {project.category}
                    </span>

                    {/* Project Title */}
                    <h3 className="text-white font-bold text-sm tracking-tight truncate mt-0.5 group-hover:text-neonLime transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* Creator */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                    <span className="truncate">
                      by{" "}
                      <span className="text-zinc-200 font-medium hover:underline">
                        {project.creator.name}
                      </span>
                    </span>
                    {project.creator.verified && (
                      <span className="text-neonLime text-[10px]" title="Verified Creator">
                        ●
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

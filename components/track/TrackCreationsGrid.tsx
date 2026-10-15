"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MessageSquare, ArrowUpDown, ArrowUpRight } from "lucide-react";
import { TrackCreation } from "@/types";

interface TrackCreationsGridProps {
  creations: TrackCreation[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

type SortOption = "latest" | "likes" | "views";

export default function TrackCreationsGrid({
  creations,
  activeCategory,
  onSelectCategory,
}: TrackCreationsGridProps) {
  const [selectedSort, setSelectedSort] = useState<SortOption>("latest");
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const filterChips = [
    { id: "All", label: "All" },
    { id: "Artwork", label: "Artwork" },
    { id: "Video", label: "Video" },
    { id: "Motion", label: "Motion" },
    { id: "Illustration", label: "Illustration" },
    { id: "Poster", label: "Poster" },
  ];

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filter & Sort Logic
  const filteredCreations = useMemo(() => {
    let list = [...creations];

    // Category Filter
    if (activeCategory !== "All" && activeCategory !== "Overview" && activeCategory !== "More") {
      list = list.filter(
        (item) => item.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Sort
    if (selectedSort === "likes") {
      list.sort((a, b) => b.likes - a.likes);
    } else if (selectedSort === "views") {
      list.sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    return list;
  }, [creations, activeCategory, selectedSort]);

  return (
    <section className="py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Controls: All Creations Count, Filter Chips, Sort Dropdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
          {/* Left Title & Chips */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                All Creations
              </h2>
              <span className="text-sm font-mono font-bold text-neonLime px-2.5 py-0.5 rounded-full bg-neonLime/10 border border-neonLime/20">
                {creations.length}
              </span>
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {filterChips.map((chip) => {
                const isActive =
                  activeCategory === chip.id ||
                  (chip.id === "All" &&
                    (activeCategory === "Overview" || activeCategory === "More"));

                return (
                  <button
                    key={chip.id}
                    onClick={() => onSelectCategory(chip.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 shrink-0 ${
                      isActive
                        ? "bg-neonLime text-black shadow-neon-sm font-extrabold scale-105"
                        : "bg-surface text-zinc-400 hover:text-white hover:bg-surfaceHover border border-white/10"
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Sort Selection Dropdown */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface border border-white/10 text-xs font-mono text-zinc-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-neonLime" />
              <span className="text-zinc-500">Sort:</span>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value as SortOption)}
                className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
              >
                <option value="latest" className="bg-[#141418] text-white">
                  Latest
                </option>
                <option value="likes" className="bg-[#141418] text-white">
                  Most Liked
                </option>
                <option value="views" className="bg-[#141418] text-white">
                  Most Viewed
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* 3-Column Responsive Card Grid (1 to 3 cols) */}
        {filteredCreations.length === 0 ? (
          <div className="py-20 text-center rounded-2xl bg-surface border border-white/5 p-8">
            <p className="text-zinc-400 text-sm">
              해당 카테고리에 등록된 창작물이 아직 없습니다.
            </p>
            <button
              onClick={() => onSelectCategory("All")}
              className="mt-4 px-4 py-2 rounded-full bg-neonLime/10 border border-neonLime/30 text-neonLime text-xs font-bold hover:bg-neonLime hover:text-black transition-all"
            >
              전체 창작물 보기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreations.map((item) => {
              const isLiked = likedMap[item.id];
              const likesCount = item.likes + (isLiked ? 1 : 0);

              return (
                <Link
                  key={item.id}
                  href="/project/midnight-cover"
                  className="group flex flex-col bg-surface border border-white/10 hover:border-neonLime/40 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-card hover:-translate-y-1.5 cursor-pointer"
                >
                  {/* Thumbnail Image Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                    <Image
                      src={item.coverUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105 brightness-95 group-hover:brightness-105"
                    />

                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Category & Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono font-medium text-zinc-300">
                        {item.category}
                      </span>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-md bg-neonLime/20 backdrop-blur-md border border-neonLime/40 text-[10px] font-mono font-bold text-neonLime">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Hover Direct Link Arrow Icon */}
                    <div className="absolute top-3 right-3 p-2 rounded-full bg-neonLime text-black font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-neon-sm transform translate-y-1 group-hover:translate-y-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>

                    {/* Likes & Comments Counters */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-2">
                      <button
                        onClick={(e) => toggleLike(e, item.id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-300 hover:text-red-400 transition-colors"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            isLiked ? "fill-red-500 text-red-500" : "text-zinc-400"
                          }`}
                        />
                        <span>{likesCount.toLocaleString()}</span>
                      </button>

                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-300">
                        <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{item.comments}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content Footer */}
                  <div className="p-4 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-white font-bold text-base tracking-tight truncate group-hover:text-neonLime transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-zinc-400 truncate mt-0.5">
                        by{" "}
                        <span className="text-zinc-200 font-medium hover:underline">
                          {item.creator.name}
                        </span>
                      </p>
                    </div>

                    {/* Creator Avatar (Small) */}
                    {item.creator.avatarUrl && (
                      <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white/10 group-hover:border-neonLime transition-colors">
                        <Image
                          src={item.creator.avatarUrl}
                          alt={item.creator.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

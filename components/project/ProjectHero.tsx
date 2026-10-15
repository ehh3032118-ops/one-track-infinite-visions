"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MessageSquare, Eye, Share2, Check, Plus, Disc } from "lucide-react";
import { ProjectDetail } from "@/types";

interface ProjectHeroProps {
  project: ProjectDetail;
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export default function ProjectHero({
  project,
  activeTab,
  onSelectTab,
}: ProjectHeroProps) {
  const [selectedImage, setSelectedImage] = useState<string>(project.mainImage);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(project.likes);
  const [copied, setCopied] = useState<boolean>(false);

  const tabs = [
    { id: "Process", label: "Process (제작 과정)" },
    { id: "Details", label: "Details (상세 정보)" },
    { id: "Comments", label: "Comments (댓글)" },
  ];

  const handleToggleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Combine mainImage with subPreviews for gallery thumbnail list
  const galleryThumbnails = [project.mainImage, ...project.subPreviews];

  return (
    <section className="relative pt-24 pb-4 border-b border-white/10 bg-[#0A0A0C]">
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neonLime/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-Column Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ================= Left: Main Visual Showcase (Cols 7) ================= */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row gap-4 items-start">
            {/* Main Poster Showcase Frame */}
            <div className="relative flex-1 aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#141418] border border-white/15 shadow-2xl group">
              <Image
                src={selectedImage}
                alt={project.title}
                fill
                priority
                className="object-cover transition-all duration-500 group-hover:scale-[1.02]"
              />

              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-40 pointer-events-none" />

              {/* Top Left Original Track Pill */}
              <Link
                href={`/track/${project.track.id}`}
                className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs text-zinc-200 hover:text-neonLime hover:border-neonLime/40 transition-colors"
              >
                <Disc className="w-3.5 h-3.5 text-neonLime" />
                <span>Track: {project.track.title}</span>
              </Link>

              {/* Bottom Watermark / Poster Label */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-none">
                <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded">
                  OFFICIAL ARTWORK SPEC
                </div>
                <div className="text-[11px] font-mono text-neonLime bg-black/60 backdrop-blur-sm px-2 py-1 rounded">
                  3000 x 3000 PX
                </div>
              </div>
            </div>

            {/* Vertical Sub Thumbnail Preview List (3 items) */}
            <div className="flex sm:flex-col gap-3 shrink-0 sm:w-20 w-full overflow-x-auto sm:overflow-visible">
              {galleryThumbnails.map((thumb, idx) => {
                const isSelected = selectedImage === thumb;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(thumb)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border transition-all duration-200 shrink-0 ${
                      isSelected
                        ? "border-neonLime ring-2 ring-neonLime/50 shadow-neon-sm scale-105"
                        : "border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={thumb}
                      alt={`Preview ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-1 right-1 px-1 rounded bg-black/70 text-[9px] font-mono text-zinc-300">
                      0{idx + 1}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= Right: Project Meta & Creator Info (Cols 5) ================= */}
          <div className="lg:col-span-5 space-y-6 lg:pl-2">
            {/* Title & Subtitle */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-neonLime mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neonLime shadow-neon-sm" />
                VISUAL ARCHIVE #{project.id}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {project.title}
              </h1>
              <p className="text-base sm:text-lg font-semibold text-zinc-300">
                {project.subtitle}
              </p>
            </div>

            {/* Creator Profile Bar */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-surface border border-white/10">
              <Link
                href="/creator/studio37"
                className="flex items-center gap-3 min-w-0 group/creator cursor-pointer"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-neonLime/40 group-hover/creator:border-neonLime transition-colors">
                  <Image
                    src={project.creator.avatarUrl}
                    alt={project.creator.name}
                    fill
                    className="object-cover group-hover/creator:scale-105 transition-transform"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-bold text-sm truncate group-hover/creator:text-neonLime transition-colors flex items-center gap-1">
                      <span>by {project.creator.name}</span>
                      <span className="text-[10px] text-neonLime opacity-0 group-hover/creator:opacity-100 transition-opacity">
                        ↗
                      </span>
                    </span>
                    <span className="text-neonLime text-xs" title="Verified Creator">
                      ●
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 truncate">
                    {project.creator.role || "Visual Creator"}
                  </p>
                </div>
              </Link>

              {/* Follow Button */}
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
                  isFollowing
                    ? "bg-white/10 text-zinc-300 border border-white/20"
                    : "border border-neonLime text-neonLime hover:bg-neonLime hover:text-black shadow-neon-sm"
                }`}
              >
                {isFollowing ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-neonLime" />
                    <span>Following</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Follow</span>
                  </>
                )}
              </button>
            </div>

            {/* Project Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
                Artwork Statement
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5">
                &quot;{project.description}&quot;
              </p>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-surface text-xs font-mono text-zinc-300 border border-white/10 hover:border-neonLime/50 hover:text-neonLime transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Interaction Stats & Action Buttons */}
            <div className="pt-2 flex items-center justify-between border-t border-white/5">
              {/* Stats badges */}
              <div className="flex items-center gap-2">
                {/* Like Button */}
                <button
                  onClick={handleToggleLike}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-all duration-200 ${
                    isLiked
                      ? "bg-red-500/10 border-red-500/40 text-red-400"
                      : "bg-surface border-white/10 text-zinc-300 hover:border-white/30"
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      isLiked ? "fill-red-500 text-red-500" : "text-zinc-400"
                    }`}
                  />
                  <span>{likesCount}</span>
                </button>

                {/* Comment Count */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-white/10 text-xs font-mono text-zinc-300">
                  <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{project.comments}</span>
                </div>

                {/* Views Count */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-white/10 text-xs font-mono text-zinc-300">
                  <Eye className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{project.views}</span>
                </div>
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-surface border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors relative"
                title="공유하기"
              >
                <Share2 className="w-4 h-4" />
                {copied && (
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-neonLime text-black text-[10px] font-bold font-mono whitespace-nowrap">
                    URL 복사됨
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ================= Bottom Tab Menu ================= */}
        <div className="mt-12 flex items-center gap-3 border-b border-white/10 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`pb-3.5 px-4 text-sm font-bold tracking-tight transition-all duration-200 relative whitespace-nowrap ${
                  isActive
                    ? "text-neonLime"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neonLime shadow-neon-sm rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

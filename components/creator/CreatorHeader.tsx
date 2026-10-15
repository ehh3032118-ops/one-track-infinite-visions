"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Check, Share2 } from "lucide-react";
import { CreatorProfile } from "@/types";

interface CreatorHeaderProps {
  creator: CreatorProfile;
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export default function CreatorHeader({
  creator,
  activeTab,
  onSelectTab,
}: CreatorHeaderProps) {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const tabs = [
    { id: "About", label: "About" },
    { id: "Projects", label: "Projects" },
    { id: "Process", label: "Process" },
    { id: "Contact", label: "Contact" },
  ];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative pt-24 pb-4 border-b border-white/10 bg-[#0A0A0C] overflow-hidden">
      {/* Background Banner Backdrop with Ambient Lighting */}
      <div className="absolute inset-0 h-56 w-full z-0 overflow-hidden">
        {creator.coverUrl && (
          <Image
            src={creator.coverUrl}
            alt="Creator Cover"
            fill
            priority
            className="object-cover opacity-25 brightness-75 contrast-125"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/40 via-[#0A0A0C]/80 to-[#0A0A0C]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Profile Card Container */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/5">
          {/* Left: Avatar + Identity */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            {/* Big Circular Avatar */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-surface border-2 border-neonLime shadow-neon-sm shrink-0">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src={creator.avatarUrl}
                  alt={creator.name}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-neonLime border-2 border-black" />
            </div>

            {/* Name, Role & Micro Tag */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  {creator.name}
                </h1>
                <span className="text-neonLime text-xs font-mono px-2 py-0.5 rounded-full bg-neonLime/10 border border-neonLime/30">
                  VERIFIED
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 font-medium">
                {creator.role}
              </p>
              <p className="text-xs font-mono text-zinc-400">
                {creator.handle}
              </p>
            </div>
          </div>

          {/* Right: Actions & Stats 3-Indicator Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* 3-Part Stats Card */}
            <div className="flex items-center divide-x divide-white/10 p-3 rounded-2xl bg-surface border border-white/10 shadow-card">
              <div className="px-4 text-center">
                <span className="block text-base sm:text-lg font-black text-white font-mono">
                  {creator.stats.projects}
                </span>
                <span className="text-[11px] font-mono text-zinc-400">
                  작품 (Projects)
                </span>
              </div>
              <div className="px-4 text-center">
                <span className="block text-base sm:text-lg font-black text-neonLime font-mono">
                  {creator.stats.followers}
                </span>
                <span className="text-[11px] font-mono text-zinc-400">
                  팔로워 (Followers)
                </span>
              </div>
              <div className="px-4 text-center">
                <span className="block text-base sm:text-lg font-black text-white font-mono">
                  {creator.stats.openCalls}
                </span>
                <span className="text-[11px] font-mono text-zinc-400">
                  오픈콜 (Open Calls)
                </span>
              </div>
            </div>

            {/* Follow Button & Share Button */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-neon-sm ${
                  isFollowing
                    ? "bg-white/10 text-zinc-200 border border-white/20"
                    : "border border-neonLime text-neonLime hover:bg-neonLime hover:text-black active:scale-95"
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

              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-surface border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors relative"
                title="프로필 공유하기"
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

        {/* Sub Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`px-5 py-2.5 text-sm font-bold tracking-tight transition-all duration-200 relative whitespace-nowrap ${
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
    </div>
  );
}

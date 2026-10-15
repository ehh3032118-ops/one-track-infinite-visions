"use client";

import React from "react";
import { PenSquare, Sparkles, MessageCircle, BookOpen, HelpCircle, Users, Coffee } from "lucide-react";
import { CommunityCategory } from "@/types";
import { COMMUNITY_CATEGORIES } from "@/data/mockData";

interface CommunitySidebarProps {
  activeCategory: CommunityCategory;
  onSelectCategory: (category: CommunityCategory) => void;
  onOpenCreateModal: () => void;
}

export default function CommunitySidebar({
  activeCategory,
  onSelectCategory,
  onOpenCreateModal,
}: CommunitySidebarProps) {
  const getCategoryIcon = (category: CommunityCategory) => {
    switch (category) {
      case "전체":
        return <MessageCircle className="w-4 h-4" />;
      case "감상 노트":
        return <BookOpen className="w-4 h-4" />;
      case "피드백 & 질문":
        return <HelpCircle className="w-4 h-4" />;
      case "프로젝트 모집":
        return <Users className="w-4 h-4" />;
      case "자유 게시판":
        return <Coffee className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  return (
    <aside className="space-y-6">
      {/* Title & Slogan Card */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-neonLime">
          <span className="w-1.5 h-1.5 rounded-full bg-neonLime shadow-neon-sm" />
          CREATOR LOUNGE
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Community
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          음악과 창작을 사랑하는 사람들이 모여 의견을 나누고, 함께 성장하는 공간입니다.
        </p>
      </div>

      {/* CTA: 새 글 작성하기 Button */}
      <button
        onClick={onOpenCreateModal}
        className="w-full py-3.5 px-4 rounded-xl bg-neonLime text-black font-extrabold text-sm flex items-center justify-center gap-2 hover:shadow-neon hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
      >
        <PenSquare className="w-4 h-4" />
        <span>새 글 작성하기</span>
      </button>

      {/* Categories Navigation */}
      <div className="p-2 rounded-2xl bg-surface border border-white/10 space-y-1">
        <div className="px-3 py-2 text-[11px] font-mono uppercase text-zinc-400 tracking-wider">
          카테고리
        </div>

        {COMMUNITY_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 group ${
                isActive
                  ? "bg-neonLime text-black font-extrabold shadow-neon-sm"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={isActive ? "text-black" : "text-zinc-400 group-hover:text-neonLime"}>
                  {getCategoryIcon(cat.id)}
                </span>
                <span>{cat.label}</span>
              </div>

              {/* Count badge */}
              <span
                className={`text-[11px] font-mono px-2 py-0.5 rounded-full transition-colors ${
                  isActive
                    ? "bg-black/20 text-black font-bold"
                    : "bg-white/[0.05] text-zinc-400 group-hover:text-white"
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Community Guideline Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-200">
          <Sparkles className="w-3.5 h-3.5 text-neonLime" />
          <span>창작자 매너 가이드</span>
        </div>
        <p className="text-[11px] text-zinc-400 leading-relaxed">
          서로의 해석과 창작 방식을 존중하며, 건설적인 피드백과 협업을 권장합니다.
        </p>
      </div>
    </aside>
  );
}

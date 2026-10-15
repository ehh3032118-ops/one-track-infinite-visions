"use client";

import React, { useState } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import CommunitySidebar from "@/components/community/CommunitySidebar";
import CommunityFeed from "@/components/community/CommunityFeed";
import { CommunityCategory, CommunityPost } from "@/types";
import { COMMUNITY_POSTS } from "@/data/mockData";
import { X, Sparkles, Send } from "lucide-react";

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState<CommunityCategory>("전체");
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // New Post Form State
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "피드백 & 질문" as CommunityCategory,
    tags: "",
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    const parsedTags = formData.tags
      .split(/[\s,]+/)
      .filter(Boolean)
      .map((t) => (t.startsWith("#") ? t : `#${t}`));

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      category: formData.category,
      author: {
        name: "Creator Studio",
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
        role: "Visual Creator",
        verified: true,
      },
      timeAgo: "방금 전",
      title: formData.title.trim(),
      content: formData.content.trim(),
      tags: parsedTags.length > 0 ? parsedTags : ["#창작", "#커뮤니티"],
      likes: 0,
      comments: 0,
      views: 1,
    };

    setPosts([newPost, ...posts]);
    setIsModalOpen(false);
    setFormData({
      title: "",
      content: "",
      category: "피드백 & 질문",
      tags: "",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-neonLime selection:text-black">
        {/* Global Frosted Glass Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 pt-28 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 2-Column Responsive Layout: Sidebar (approx 30%) + Feed (approx 70%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Column: Community Sidebar */}
              <div className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-24">
                <CommunitySidebar
                  activeCategory={activeCategory}
                  onSelectCategory={setActiveCategory}
                  onOpenCreateModal={() => setIsModalOpen(true)}
                />
              </div>

              {/* Right Column: Community Feed List */}
              <div className="lg:col-span-8 xl:col-span-9">
                <CommunityFeed
                  posts={posts}
                  activeCategory={activeCategory}
                />
              </div>
            </div>
          </div>
        </main>

        {/* Create Post Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="relative w-full max-w-lg bg-[#141418] border border-white/20 rounded-2xl p-6 sm:p-7 space-y-5 shadow-2xl animate-scaleUp"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-neonLime" />
                  <h3 className="text-lg font-black text-white">
                    새 글 작성하기
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleCreatePost} className="space-y-4">
                {/* Category select */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400">
                    카테고리 선택
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as CommunityCategory,
                      })
                    }
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-neonLime"
                  >
                    <option value="피드백 & 질문" className="bg-[#141418] text-white">
                      피드백 & 질문
                    </option>
                    <option value="프로젝트 모집" className="bg-[#141418] text-white">
                      프로젝트 모집
                    </option>
                    <option value="감상 노트" className="bg-[#141418] text-white">
                      감상 노트
                    </option>
                    <option value="자유 게시판" className="bg-[#141418] text-white">
                      자유 게시판
                    </option>
                  </select>
                </div>

                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400">
                    글 제목
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="제목을 입력해 주세요..."
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-neonLime"
                  />
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400">
                    내용
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="작업 중인 프로젝트, 궁금한 점, 감상평을 자유롭게 나누어 보세요..."
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-neonLime resize-none"
                  />
                </div>

                {/* Tags */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400">
                    태그 (공백 또는 쉼표로 구분)
                  </label>
                  <input
                    type="text"
                    placeholder="#피드백 #Midnight #모션"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-neonLime"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-neonLime text-black font-bold text-xs flex items-center gap-1.5 shadow-neon-sm hover:scale-105 active:scale-95 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>게시하기</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Global Footer */}
        <Footer />
      </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Search, Heart, MessageSquare, Eye, Filter } from "lucide-react";
import { CommunityCategory, CommunityPost } from "@/types";

interface CommunityFeedProps {
  posts: CommunityPost[];
  activeCategory: CommunityCategory;
}

type SortType = "latest" | "popular";

export default function CommunityFeed({
  posts,
  activeCategory,
}: CommunityFeedProps) {
  const [selectedSort, setSelectedSort] = useState<SortType>("latest");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [newCommentText, setNewCommentText] = useState<Record<string, string>>({});
  const [commentsMap, setCommentsMap] = useState<Record<string, { author: string; text: string; time: string }[]>>({
    "post-1": [
      { author: "Studio 37", text: "신스 아르페지오가 고조되는 02:14 부근에 비주얼 글리치를 과감하게 넣는 걸 추천드려요!", time: "1시간 전" },
      { author: "Chloe J.", text: "색감을 네온 라임과 딥 블루로 대비시키면 사운드 질감이 극대화될 것 같습니다.", time: "30분 전" },
    ],
  });

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const toggleComments = (postId: string) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleAddComment = (postId: string) => {
    const text = newCommentText[postId]?.trim();
    if (!text) return;

    setCommentsMap((prev) => ({
      ...prev,
      [postId]: [
        ...(prev[postId] || []),
        { author: "ME", text, time: "방금 전" },
      ],
    }));

    setNewCommentText((prev) => ({
      ...prev,
      [postId]: "",
    }));
  };

  // Filter & Search & Sort
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Category filter
    if (activeCategory !== "전체") {
      result = result.filter((post) => post.category === activeCategory);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.content.toLowerCase().includes(q) ||
          post.author.name.toLowerCase().includes(q) ||
          post.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    if (selectedSort === "popular") {
      result.sort((a, b) => b.likes + b.comments - (a.likes + a.comments));
    }

    return result;
  }, [posts, activeCategory, searchQuery, selectedSort]);

  return (
    <section className="space-y-6">
      {/* Top Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-2xl bg-surface border border-white/10">
        {/* Sort Tabs [최신순, 인기순] */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setSelectedSort("latest")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedSort === "latest"
                ? "bg-neonLime text-black shadow-neon-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            최신순
          </button>
          <button
            onClick={() => setSelectedSort("popular")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedSort === "popular"
                ? "bg-neonLime text-black shadow-neon-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            인기순
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="게시글, 작성자, 태그 검색..."
            className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-neonLime transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Feed Post List */}
      {filteredPosts.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-surface border border-white/10 p-8 space-y-3">
          <Filter className="w-8 h-8 text-zinc-500 mx-auto" />
          <p className="text-zinc-300 font-bold text-sm">
            조건에 맞는 게시글이 없습니다.
          </p>
          <p className="text-zinc-500 text-xs">
            다른 검색어를 입력하시거나 카테고리를 변경해 보세요.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => {
            const isLiked = likedPosts[post.id];
            const currentLikes = post.likes + (isLiked ? 1 : 0);
            const postComments = commentsMap[post.id] || [];
            const totalComments = post.comments + postComments.length;
            const isCommentBoxOpen = openComments[post.id];

            return (
              <article
                key={post.id}
                className="group rounded-2xl bg-surface border border-white/10 hover:border-neonLime/30 transition-all duration-300 p-5 sm:p-6 space-y-4 shadow-card"
              >
                {/* Author Info & Category Badge */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/15">
                      <Image
                        src={post.author.avatarUrl}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-white font-bold text-sm">
                          {post.author.name}
                        </span>
                        {post.author.verified && (
                          <span className="text-neonLime text-xs" title="Verified">
                            ●
                          </span>
                        )}
                        <span className="text-[11px] text-zinc-500 font-mono">
                          · {post.timeAgo}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        {post.author.role || "Creator"}
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[11px] font-mono text-neonLime">
                    {post.category}
                  </span>
                </div>

                {/* Post Body: Title & Content with Optional Right Thumbnail */}
                <div className="flex flex-col-reverse sm:flex-row gap-4 justify-between items-start">
                  <div className="flex-1 space-y-2">
                    <h3 className="text-base sm:text-lg font-black text-white group-hover:text-neonLime transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                      {post.content}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] text-zinc-400 border border-white/5 hover:text-neonLime hover:border-neonLime/40 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Optional Right Mini Artwork/Preview Thumbnail */}
                  {post.thumbnailUrl && (
                    <div className="relative w-full sm:w-28 sm:h-28 aspect-video sm:aspect-square rounded-xl overflow-hidden shrink-0 border border-white/10 bg-black/40 group/thumb">
                      <Image
                        src={post.thumbnailUrl}
                        alt="Preview"
                        fill
                        sizes="(max-width: 640px) 100vw, 112px"
                        className="object-cover group-hover/thumb:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover/thumb:bg-transparent transition-colors" />
                    </div>
                  )}
                </div>

                {/* Bottom Actions Bar */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                  <div className="flex items-center gap-3">
                    {/* Like Button */}
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
                        isLiked
                          ? "bg-red-500/10 border-red-500/40 text-red-400"
                          : "bg-black/30 border-white/5 hover:border-white/20 text-zinc-300"
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isLiked ? "fill-red-500 text-red-500" : "text-zinc-400"
                        }`}
                      />
                      <span className="font-mono">{currentLikes}</span>
                    </button>

                    {/* Comments Toggle Button */}
                    <button
                      onClick={() => toggleComments(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
                        isCommentBoxOpen
                          ? "bg-neonLime/10 border-neonLime/40 text-neonLime"
                          : "bg-black/30 border-white/5 hover:border-white/20 text-zinc-300"
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span className="font-mono">{totalComments}</span>
                    </button>

                    {/* Views Count */}
                    {post.views && (
                      <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-zinc-500 px-2 py-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{post.views}</span>
                      </div>
                    )}
                  </div>

                  <span className="text-[11px] font-mono text-zinc-500">
                    ONE TRACK COMMUNITY
                  </span>
                </div>

                {/* Expandable Comments Drawer */}
                {isCommentBoxOpen && (
                  <div className="pt-4 border-t border-white/10 space-y-3 animate-fadeIn">
                    {/* Existing Comments */}
                    {postComments.length > 0 && (
                      <div className="space-y-2">
                        {postComments.map((c, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white">{c.author}</span>
                              <span className="text-[10px] text-zinc-500 font-mono">{c.time}</span>
                            </div>
                            <p className="text-zinc-300">{c.text}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Comment Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newCommentText[post.id] || ""}
                        onChange={(e) =>
                          setNewCommentText((prev) => ({
                            ...prev,
                            [post.id]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddComment(post.id);
                        }}
                        placeholder="창작자에게 따뜻한 댓글을 남겨보세요..."
                        className="flex-1 bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-neonLime"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="px-3.5 py-2 rounded-xl bg-neonLime text-black font-bold text-xs shadow-neon-sm hover:scale-105 transition-all"
                      >
                        등록
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

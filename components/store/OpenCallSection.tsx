"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  Calendar,
  Users,
  Trophy,
  ArrowUpRight,
  CheckCircle2,
  X,
  FileUp,
  ExternalLink,
} from "lucide-react";
import { OPEN_CALL_LIST, OpenCallProjectItem } from "@/data/mockData";

export default function OpenCallSection() {
  const [activeTab, setActiveTab] = useState<"ongoing" | "closed" | "my">("ongoing");
  const [selectedCall, setSelectedCall] = useState<OpenCallProjectItem | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [hasAppliedMap, setHasAppliedMap] = useState<Record<string, boolean>>({});
  const [applySuccess, setApplySuccess] = useState(false);

  // Form states for modal
  const [applicantName, setApplicantName] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [commentText, setCommentText] = useState("");

  const filteredCalls = OPEN_CALL_LIST.filter((call) => {
    if (activeTab === "ongoing") return call.status === "ongoing";
    if (activeTab === "closed") return call.status === "closed";
    if (activeTab === "my") return call.status === "my" || hasAppliedMap[call.id];
    return true;
  });

  // Featured SEA project
  const featuredCall = OPEN_CALL_LIST.find((call) => call.id === "opencall-sea") || OPEN_CALL_LIST[0];

  const handleOpenApply = (call: OpenCallProjectItem) => {
    setSelectedCall(call);
    setIsApplyModalOpen(true);
    setApplySuccess(false);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCall) return;
    setHasAppliedMap((prev) => ({
      ...prev,
      [selectedCall.id]: true,
    }));
    setApplySuccess(true);
    setTimeout(() => {
      setIsApplyModalOpen(false);
      setApplySuccess(false);
      setApplicantName("");
      setPortfolioUrl("");
      setCommentText("");
    }, 1600);
  };

  return (
    <section className="relative pt-6 pb-12 sm:pb-16 border-b border-white/10">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neonLime/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-neonLime/10 text-neonLime border border-neonLime/30">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-neonLime">
                Creative Collaboration
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Open Call
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              음악 프로젝트의 비주얼 커버 및 모션 공모에 직접 참여하고 협업하세요.
            </p>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center p-1 bg-surface rounded-xl border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab("ongoing")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === "ongoing"
                  ? "bg-neonLime text-black font-semibold shadow-neon-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              진행 중인 콜 ({OPEN_CALL_LIST.filter((c) => c.status === "ongoing").length})
            </button>
            <button
              onClick={() => setActiveTab("closed")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === "closed"
                  ? "bg-neonLime text-black font-semibold shadow-neon-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              마감된 콜 ({OPEN_CALL_LIST.filter((c) => c.status === "closed").length})
            </button>
            <button
              onClick={() => setActiveTab("my")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === "my"
                  ? "bg-neonLime text-black font-semibold shadow-neon-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              내 프로젝트 ({OPEN_CALL_LIST.filter((c) => c.status === "my" || hasAppliedMap[c.id]).length})
            </button>
          </div>
        </div>

        {/* Featured Call Banner Card (Design Spec: "SEA - Album Cover Design") */}
        {activeTab === "ongoing" && (
          <div className="mb-10 relative overflow-hidden rounded-2xl bg-gradient-to-r from-surface via-[#17171d] to-[#141418] border border-white/10 hover:border-neonLime/40 transition-all duration-300 shadow-card group">
            {/* Ambient Background Lighting */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-neonLime/10 rounded-full blur-3xl pointer-events-none group-hover:bg-neonLime/15 transition-colors" />

            <div className="p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-center gap-8 relative z-10">
              {/* Left: Album Cover Thumbnail Artwork */}
              <div className="relative w-full sm:w-64 lg:w-72 aspect-square rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-2xl bg-black">
                <Image
                  src={featuredCall.coverUrl}
                  alt={featuredCall.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 256px, 288px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-300">
                    FEATURED CALL
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-zinc-300 font-mono">
                  <span>Single [SEA]</span>
                  <span>Sound & Vision</span>
                </div>
              </div>

              {/* Center: Metadata */}
              <div className="flex-1 min-w-0 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-neonLime/15 border border-neonLime/40 text-neonLime text-xs font-mono font-bold shadow-neon-sm">
                    {featuredCall.dDay} 마감 임박
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    주최: <strong className="text-white">{featuredCall.organizer}</strong>
                  </span>
                  <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    마감일: <strong className="text-zinc-300">{featuredCall.deadline}</strong>
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-baseline gap-3">
                    {featuredCall.title}
                    <span className="text-lg sm:text-xl font-medium text-zinc-400">
                      {featuredCall.subtitle}
                    </span>
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
                  {featuredCall.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {featuredCall.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-zinc-300 hover:border-neonLime/40 hover:text-white transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                  {featuredCall.prize && (
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-neonLime/10 border border-neonLime/20 text-neonLime font-semibold">
                      🏆 {featuredCall.prize}
                    </span>
                  )}
                </div>

                {/* Additional Stats */}
                <div className="flex items-center gap-6 pt-2 text-xs font-mono text-zinc-400 border-t border-white/5">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-neonLime" />
                    <span>현재 {featuredCall.applicantsCount}명 지원 중</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-neonLime" />
                    <span>선정 시 공식 발매 커버 등록</span>
                  </div>
                </div>
              </div>

              {/* Right: CTA Button */}
              <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col items-stretch gap-3">
                <button
                  onClick={() => handleOpenApply(featuredCall)}
                  disabled={hasAppliedMap[featuredCall.id]}
                  className={`px-8 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 ${
                    hasAppliedMap[featuredCall.id]
                      ? "bg-zinc-800 text-zinc-400 border border-white/10 cursor-default"
                      : "bg-[#D4FF00] text-black hover:bg-[#bfe600] shadow-neon-sm hover:shadow-neon"
                  }`}
                >
                  {hasAppliedMap[featuredCall.id] ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-neonLime" />
                      <span>지원 완료됨</span>
                    </>
                  ) : (
                    <>
                      <span>프로젝트 참여하기</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <div className="text-center text-[11px] text-zinc-500 font-mono">
                  포트폴리오 및 시안 파일 첨부 가능
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Open Call Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCalls
            .filter((c) => activeTab !== "ongoing" || c.id !== "opencall-sea")
            .map((call) => {
              const isApplied = hasAppliedMap[call.id] || call.status === "my";
              const isClosed = call.status === "closed";

              return (
                <div
                  key={call.id}
                  className="rounded-xl bg-surface border border-white/10 hover:border-white/20 transition-all duration-300 p-5 flex flex-col justify-between group hover:-translate-y-1 shadow-card relative overflow-hidden"
                >
                  {/* Card Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-neonLime/5 rounded-full blur-2xl pointer-events-none group-hover:bg-neonLime/10 transition-colors" />

                  <div>
                    {/* Top image & D-day */}
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4 bg-black/60 border border-white/5">
                      <Image
                        src={call.coverUrl}
                        alt={call.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border ${
                            isClosed
                              ? "bg-zinc-800 text-zinc-400 border-white/10"
                              : isApplied
                              ? "bg-neonLime/20 text-neonLime border-neonLime/40"
                              : "bg-black/70 backdrop-blur-md text-neonLime border-neonLime/30"
                          }`}
                        >
                          {isClosed ? "마감됨" : isApplied ? "지원 완료" : call.dDay}
                        </span>
                      </div>

                      <div className="absolute bottom-2.5 right-3 text-[11px] font-mono text-zinc-300">
                        {call.organizer}
                      </div>
                    </div>

                    {/* Titles */}
                    <div className="mb-2">
                      <h4 className="text-lg font-bold text-white group-hover:text-neonLime transition-colors">
                        {call.title}
                      </h4>
                      <p className="text-xs text-zinc-400 font-medium">
                        {call.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                      {call.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {call.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/5 text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Meta & Action */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                    <div className="text-zinc-400">
                      <span className="text-neonLime font-semibold">
                        {call.prize ? call.prize.split("+")[0] : "협업 프로젝트"}
                      </span>
                    </div>

                    {!isClosed ? (
                      <button
                        onClick={() => handleOpenApply(call)}
                        disabled={isApplied}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isApplied
                            ? "bg-zinc-800 text-zinc-500 cursor-default"
                            : "bg-white/10 text-white hover:bg-neonLime hover:text-black font-semibold"
                        }`}
                      >
                        {isApplied ? "참여완료" : "참여하기"}
                      </button>
                    ) : (
                      <span className="text-zinc-600 text-[11px]">종료된 공모</span>
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        {filteredCalls.length === 0 && (
          <div className="py-16 text-center rounded-2xl bg-surface border border-white/5">
            <p className="text-zinc-400 text-sm">해당 탭에 표시할 프로젝트가 없습니다.</p>
          </div>
        )}
      </div>

      {/* Application Modal */}
      {isApplyModalOpen && selectedCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#141418] border border-white/15 rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative">
            <button
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {applySuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-neonLime/15 border border-neonLime/30 text-neonLime flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    프로젝트 참여 신청 완료!
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    [{selectedCall.title}] 공모에 성공적으로 접수되었습니다.<br />
                    주최자의 심사 결과는 커뮤니티 알림 및 이메일로 전송됩니다.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-5">
                  <span className="text-xs font-mono text-neonLime uppercase">
                    Open Call Application
                  </span>
                  <h3 className="text-xl font-black text-white mt-0.5">
                    {selectedCall.title} - {selectedCall.subtitle}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    주최: {selectedCall.organizer} · 마감 {selectedCall.dDay}
                  </p>
                </div>

                <form onSubmit={handleSubmitApplication} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                      크리에이터명 / 팀명 *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="예: Studio 37"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-neonLime transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                      포트폴리오 링크 또는 비핸스/인스타그램 *
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        required
                        placeholder="https://behance.net/..."
                        value={portfolioUrl}
                        onChange={(e) => setPortfolioUrl(e.target.value)}
                        className="w-full px-3.5 py-2.5 pl-9 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-neonLime transition-colors"
                      />
                      <ExternalLink className="w-4 h-4 text-zinc-500 absolute left-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                      작업 컨셉 요약 또는 메모
                    </label>
                    <textarea
                      rows={3}
                      placeholder="곡의 무드와 어울리는 시각적 방향성을 간략히 적어주세요."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-neonLime transition-colors resize-none"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-zinc-400 shrink-0">
                      <FileUp className="w-4 h-4 text-neonLime" />
                    </div>
                    <div className="flex-1 text-xs">
                      <p className="text-zinc-200 font-medium">시안 파일 업로드 (선택)</p>
                      <p className="text-zinc-500 text-[11px]">PSD, AI, PNG, MP4 (최대 100MB)</p>
                    </div>
                    <button
                      type="button"
                      className="text-xs font-mono px-2.5 py-1.5 rounded-lg bg-white/10 text-zinc-300 hover:text-white transition-colors"
                    >
                      파일 선택
                    </button>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setIsApplyModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-neonLime text-black font-bold text-xs hover:bg-[#bfe600] transition-colors shadow-neon-sm"
                    >
                      지원서 제출하기
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

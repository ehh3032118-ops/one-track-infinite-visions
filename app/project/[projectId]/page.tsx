"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectProcess from "@/components/project/ProjectProcess";
import { PROJECT_DETAIL_DATA, MIDNIGHT_CREATIONS } from "@/data/mockData";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = (params?.projectId as string) || "midnight-cover";
  const [activeTab, setActiveTab] = useState<string>("Process");

  // Project details data (fallback to PROJECT_DETAIL_DATA)
  const project = PROJECT_DETAIL_DATA;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-neonLime selection:text-black">
        {/* Global Frosted Glass Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col">
          {/* Top Navigation Breadcrumb Bar */}
          <div className="pt-24 pb-2 border-b border-white/5 bg-[#0A0A0C]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between py-2">
                <Link
                  href={`/track/${project.track.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-neonLime transition-colors group"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  <span>Track Universe로 돌아가기 ({project.track.title})</span>
                </Link>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <span>Project ID:</span>
                  <span className="text-zinc-300 font-bold">{projectId}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 1. Project Hero: 2-Column Showcase, Creator Profile & Tab Navigation */}
          <ProjectHero
            project={project}
            activeTab={activeTab}
            onSelectTab={setActiveTab}
          />

          {/* Tab Content Display */}
          {activeTab === "Process" && (
            <ProjectProcess
              steps={project.processSteps}
              relatedCreations={MIDNIGHT_CREATIONS}
              trackId={project.track.id}
            />
          )}

          {activeTab === "Details" && (
            <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-3xl space-y-8 bg-surface border border-white/10 rounded-2xl p-6 sm:p-8">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">
                    기술 및 사양 상세
                  </h2>
                  <p className="text-sm text-zinc-400">
                    본 작품은 음원의 다이내믹 레인지와 주파수 스펙트럼 데이터를 시각적으로 분석하여 제작되었습니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-xs font-mono text-zinc-500">사용 툴</span>
                    <p className="text-sm font-semibold text-white">Photoshop, Illustrator, Cinema 4D</p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-xs font-mono text-zinc-500">포맷 및 해상도</span>
                    <p className="text-sm font-semibold text-white">3000 x 3000 px, 300 DPI (CMYK/RGB)</p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-xs font-mono text-zinc-500">라이선스</span>
                    <p className="text-sm font-semibold text-neonLime">CC BY-NC-ND (비상업용 공유 허용)</p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-xs font-mono text-zinc-500">공개 일자</span>
                    <p className="text-sm font-semibold text-white">{project.publishedDate || "2026.02.18"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Comments" && (
            <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-3xl space-y-6 bg-surface border border-white/10 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <h2 className="text-xl font-bold text-white">
                    댓글 ({project.comments})
                  </h2>
                  <span className="text-xs font-mono text-neonLime">Community Feed</span>
                </div>

                {/* Comment Input */}
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 shrink-0 flex items-center justify-center font-bold text-xs text-white">
                    ME
                  </div>
                  <div className="flex-1 space-y-2">
                    <textarea
                      placeholder="작품에 대한 감상평이나 피드백을 남겨보세요..."
                      rows={3}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-neonLime resize-none"
                    />
                    <div className="flex justify-end">
                      <button className="px-4 py-2 rounded-xl bg-neonLime text-black font-bold text-xs shadow-neon-sm hover:scale-105 transition-all">
                        댓글 등록
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sample Comments List */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex gap-3 text-xs">
                    <div className="w-8 h-8 rounded-full bg-neonLime/20 text-neonLime font-bold flex items-center justify-center shrink-0">
                      JH
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">jheonb_25</span>
                        <span className="text-[10px] text-zinc-500 font-mono">2시간 전</span>
                      </div>
                      <p className="text-zinc-300">
                        질감 표현과 타이포그래피의 배치감이 곡의 무드와 기가 막히게 맞아떨어집니다. 영감 많이 받고 갑니다!
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 text-xs">
                    <div className="w-8 h-8 rounded-full bg-white/10 text-white font-bold flex items-center justify-center shrink-0">
                      KM
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">KIM JISEOK</span>
                        <span className="text-[10px] text-zinc-500 font-mono">5시간 전</span>
                      </div>
                      <p className="text-zinc-300">
                        스케치 단계부터 최종 렌더까지의 흐름이 정말 탄탄하네요. 03번 시안도 굉장히 매력적입니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, Mail, Globe, Sparkles } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import CreatorHeader from "@/components/creator/CreatorHeader";
import CreatorPortfolio from "@/components/creator/CreatorPortfolio";
import { CREATOR_PROFILE_DATA } from "@/data/mockData";

export default function CreatorProfilePage() {
  const params = useParams();
  const creatorId = (params?.creatorId as string) || "studio37";
  const [activeTab, setActiveTab] = useState<string>("About");

  const creator = CREATOR_PROFILE_DATA;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-neonLime selection:text-black">
        {/* Global Frosted Glass Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col">
          {/* Top Breadcrumb Navigation Bar */}
          <div className="pt-24 pb-2 border-b border-white/5 bg-[#0A0A0C]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between py-2">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-neonLime transition-colors group cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  <span>이전으로 돌아가기</span>
                </Link>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <span>Creator ID:</span>
                  <span className="text-neonLime font-bold">{creatorId}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 1. Creator Header (Avatar, Identity, Stats, Follow CTA, Sub Tabs) */}
          <CreatorHeader
            creator={creator}
            activeTab={activeTab}
            onSelectTab={setActiveTab}
          />

          {/* Tab Content Display */}
          {(activeTab === "About" || activeTab === "Projects") && (
            <CreatorPortfolio creator={creator} />
          )}

          {activeTab === "Process" && (
            <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="p-8 rounded-2xl bg-surface border border-white/10 space-y-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-neonLime" />
                  <h2 className="text-xl font-bold text-white">
                    작업 방식 및 제작 철학
                  </h2>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed max-w-2xl">
                  모든 작업은 트랙의 첫 10초에서 느껴지는 텍스처와 감정의 잔향에서 출발합니다. 사운드의 리듬을 타이포그래피의 밀도와 배치로 번역하고, 물리적인 노이즈를 더해 손에 잡힐 듯한 시각적 촉감을 완성합니다.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-xs font-mono text-neonLime">01. Sound Audit</span>
                    <p className="text-xs text-zinc-300">트랙 주파수 분석 및 무드보드 도출</p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-xs font-mono text-neonLime">02. Visual Jam</span>
                    <p className="text-xs text-zinc-300">3D 글리치 및 아날로그 질감 오버레이</p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-xs font-mono text-neonLime">03. Master Spec</span>
                    <p className="text-xs text-zinc-300">바이닐 패키지 및 모션 규격화</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Contact" && (
            <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-xl p-8 rounded-2xl bg-surface border border-white/10 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">
                    협업 및 작업 의뢰
                  </h2>
                  <p className="text-xs text-zinc-400">
                    음악 앨범 아트워크, 모션그래픽, 브랜드 비주얼 협업을 환영합니다.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-black/40 border border-white/5">
                    <Mail className="w-4 h-4 text-neonLime" />
                    <div>
                      <span className="text-[11px] font-mono text-zinc-500 block">Email</span>
                      <a href={`mailto:${creator.contactEmail}`} className="text-sm font-semibold text-white hover:text-neonLime transition-colors">
                        {creator.contactEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-black/40 border border-white/5">
                    <Globe className="w-4 h-4 text-neonLime" />
                    <div>
                      <span className="text-[11px] font-mono text-zinc-500 block">Portfolio & Social</span>
                      <span className="text-sm font-semibold text-zinc-300">
                        {creator.behance} · {creator.instagram}
                      </span>
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

"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ShoppingBag, Sparkles } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import OpenCallSection from "@/components/store/OpenCallSection";
import MarketAssetsSection from "@/components/store/MarketAssetsSection";

export default function StorePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-neonLime selection:text-black">
      {/* Global Frosted Glass Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Top Breadcrumb & Page Banner */}
        <div className="pt-24 pb-6 border-b border-white/5 bg-[#0A0A0C] relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-neonLime/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center justify-between py-2 mb-4">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-neonLime transition-colors group cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <span>홈으로 돌아가기</span>
              </Link>

              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-neonLime animate-pulse" />
                <span>06. OPEN CALL & MARKET</span>
              </div>
            </div>

            {/* Title & Slogan */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 mb-3">
                  <ShoppingBag className="w-3.5 h-3.5 text-neonLime" />
                  <span>Creative Opportunity & Digital Assets</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  Open Call & Market<span className="text-neonLime">.</span>
                </h1>
                <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl leading-relaxed">
                  음악 프로젝트 공식 비주얼 공모전에 출품하고, 나만의 감각을 완성할 프리미엄 그래픽 텍스처와 3D 에셋을 만나보세요.
                </p>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-surface/80 border border-white/10 shrink-0 text-xs font-mono">
                <Sparkles className="w-4 h-4 text-neonLime" />
                <span className="text-zinc-300">상업용 라이선스 & 공식 크레딧 보장</span>
              </div>
            </div>
          </div>
        </div>

        {/* 1. Open Call Section (프로젝트 모집) */}
        <OpenCallSection />

        {/* 2. Market Assets Section (에셋 마켓) */}
        <MarketAssetsSection />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

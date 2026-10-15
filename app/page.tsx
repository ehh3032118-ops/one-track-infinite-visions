"use client";

import React from "react";
import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturedAndMoodSection from "@/components/home/FeaturedAndMoodSection";
import LatestProjectsSection from "@/components/home/LatestProjectsSection";
import BottomSplitSection from "@/components/home/BottomSplitSection";
import Footer from "@/components/common/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-neonLime selection:text-black">
      {/* Sticky & Frosted Glass Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* 1. Hero Section with Headline, Cinematic Visuals & Floating Audio Widget */}
        <HeroSection />

        {/* 2. Asymmetric 2-Column Section: Today's Featured (Left) + Mood Search (Right) */}
        <div className="border-t border-white/5 bg-gradient-to-b from-[#0A0A0C] via-[#101014] to-[#0A0A0C]">
          <FeaturedAndMoodSection />
        </div>

        {/* 3. Latest Projects Section (5-column Grid) */}
        <div className="border-t border-white/5 bg-[#0A0A0C]">
          <LatestProjectsSection />
        </div>

        {/* 4. Bottom Split Section: Open Call Banner (Left) + Popular Creators (Right) */}
        <div className="border-t border-white/5 bg-[#0d0d10]">
          <BottomSplitSection />
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

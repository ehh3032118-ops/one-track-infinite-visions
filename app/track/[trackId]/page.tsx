"use client";

import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import TrackHero from "@/components/track/TrackHero";
import TrackCreationsGrid from "@/components/track/TrackCreationsGrid";
import { FEATURED_TRACKS, MIDNIGHT_CREATIONS } from "@/data/mockData";

export default function TrackUniversePage() {
  const params = useParams();
  const trackId = (params?.trackId as string) || "midnight";

  // Category Tab state for synchronization between Hero tabs and Grid chips
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Find matching track or default to Midnight
  const currentTrack = useMemo(() => {
    const found = FEATURED_TRACKS.find(
      (t) => t.id.toLowerCase() === trackId.toLowerCase()
    );
    return found || FEATURED_TRACKS[0];
  }, [trackId]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-neonLime selection:text-black">
      {/* Global Frosted Glass Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* 1. Track Hero Section: Visual Banner, Audio Player & Waveform Visualizer, Subcategory Tabs */}
        <TrackHero
          track={currentTrack}
          activeCategoryTab={selectedCategory}
          onSelectCategoryTab={setSelectedCategory}
        />

        {/* 2. Track Creations Grid: All Creations Count, Filter Chips, 3-Column Card Grid */}
        <TrackCreationsGrid
          creations={MIDNIGHT_CREATIONS}
          activeCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

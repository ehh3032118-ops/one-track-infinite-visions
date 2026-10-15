"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { useAudio } from "@/context/AudioContext";
import AuthModal from "@/components/common/AuthModal";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "join">("login");
  const { currentTrack, isPlaying } = useAudio();

  const handleOpenAuth = (mode: "login" | "join") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/", active: pathname === "/" },
    { label: "Explore", href: "/track/midnight", active: pathname.startsWith("/track") },
    { label: "Creators", href: "/creator/studio37", active: pathname.startsWith("/creator") },
    { label: "Community", href: "/community", active: pathname.startsWith("/community") },
    { label: "Store", href: "/store", active: pathname.startsWith("/store") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A0A0C]/90 backdrop-blur-xl border-b border-white/10 shadow-lg py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer select-none"
          >
            <div className="relative flex items-center justify-center">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-neonLime transition-colors">
                One Track
              </span>
              <span className="inline-block mx-1.5 text-neonLime text-xs group-hover:rotate-45 transition-transform duration-300">
                ✦
              </span>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-neonLime transition-colors">
                Infinite Visions
              </span>
              <span className="text-neonLime font-bold text-lg">.</span>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  item.active
                    ? "text-neonLime bg-neonLime/10 font-semibold shadow-neon-sm"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {item.label}
                {item.active && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-neonLime rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Section: Search, Featured Badge, Login, Join */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search Toggle / Input */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center bg-[#141418] border border-white/20 rounded-full px-3 py-1.5 w-52 transition-all">
                  <Search className="w-4 h-4 text-zinc-400 mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="트랙, 크리에이터 검색..."
                    className="bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none w-full"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="text-zinc-400 hover:text-white ml-1 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Featured Track Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141418]/80 border border-white/10 text-xs">
              <span className="relative flex h-2 w-2">
                {isPlaying && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neonLime opacity-75" />
                )}
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neonLime" />
              </span>
              <span className="text-zinc-400 font-medium">Featured Track</span>
              <span className="text-neonLime font-mono font-semibold">01 / 04</span>
            </div>

            {/* Login Link */}
            <button
              onClick={() => handleOpenAuth("login")}
              className="text-zinc-300 hover:text-white text-sm font-medium px-3 py-1.5 transition-colors cursor-pointer"
            >
              Login
            </button>

            {/* Join Neon Outline Button */}
            <button
              onClick={() => handleOpenAuth("join")}
              className="relative group px-5 py-1.5 rounded-full border border-neonLime text-neonLime hover:bg-neonLime hover:text-black font-semibold text-sm transition-all duration-200 shadow-neon-sm hover:shadow-neon cursor-pointer"
            >
              <span>Join</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-zinc-300 hover:text-white"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-[#141418] border border-white/10 rounded-2xl flex flex-col gap-3 shadow-2xl">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  item.active ? "text-neonLime bg-neonLime/10" : "text-zinc-300"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-1" />
            <div className="flex items-center justify-between text-xs text-zinc-400 py-1">
              <span>현재 트랙:</span>
              <span className="text-neonLime font-medium">{currentTrack.title}</span>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => handleOpenAuth("login")}
                className="flex-1 py-2 rounded-lg bg-white/5 text-zinc-300 text-sm font-medium hover:bg-white/10 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => handleOpenAuth("join")}
                className="flex-1 py-2 rounded-lg bg-neonLime text-black text-sm font-bold shadow-neon-sm transition-transform active:scale-95"
              >
                Join
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </header>
  );
}

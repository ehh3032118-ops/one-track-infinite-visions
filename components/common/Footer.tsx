import React from "react";
import Link from "next/link";
import { Disc, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0A0A0C] pt-16 pb-12 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-neonLime/[0.03] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/5">
          {/* Col 1: Brand & Slogan */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-white">One Track,</span>
              <span className="text-neonLime text-xs">✦</span>
              <span className="text-xl font-black text-white">Infinite Visions.</span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              하나의 음악에서 피어나는 무한한 시각적 상상력. 음악과 아트워크, 모션,
              영상이 유기적으로 연결되는 크리에이티브 아카이빙 플랫폼.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2 text-zinc-400">
              <a
                href="#instagram"
                className="p-2 rounded-full bg-white/5 hover:bg-neonLime hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#youtube"
                className="p-2 rounded-full bg-white/5 hover:bg-neonLime hover:text-black transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="#disc"
                className="p-2 rounded-full bg-white/5 hover:bg-neonLime hover:text-black transition-colors"
                aria-label="Community"
              >
                <Disc className="w-4 h-4" />
              </a>
              <a
                href="#web"
                className="p-2 rounded-full bg-white/5 hover:bg-neonLime hover:text-black transition-colors"
                aria-label="Global"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase text-neonLime tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link href="#featured" className="hover:text-white transition-colors">
                  Featured Tracks
                </Link>
              </li>
              <li>
                <Link href="#latest" className="hover:text-white transition-colors">
                  Latest Projects
                </Link>
              </li>
              <li>
                <Link href="#creators" className="hover:text-white transition-colors">
                  Creator Directory
                </Link>
              </li>
              <li>
                <Link href="#opencall" className="hover:text-white transition-colors">
                  Open Call Auditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Platform Info */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase text-neonLime tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact & Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Big Editorial Logo Typography */}
        <div className="pt-10 text-center">
          <p className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-zinc-600 hover:text-zinc-400 transition-colors cursor-default select-none">
            ONE TRACK, INFINITE VISIONS.
          </p>
          <p className="text-[11px] font-mono text-zinc-600 mt-2">
            © 2026 ONE TRACK, INFINITE VISIONS. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}

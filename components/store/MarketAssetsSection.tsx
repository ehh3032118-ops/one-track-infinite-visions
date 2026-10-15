"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Heart,
  ShoppingCart,
  Check,
  Package,
  Layers,
  ChevronRight,
  Download,
  X,
  Sparkles,
} from "lucide-react";
import { MARKET_ASSETS_DATA } from "@/data/mockData";
import { MarketCategory, MarketAsset } from "@/types";

export default function MarketAssetsSection() {
  const [selectedCategory, setSelectedCategory] = useState<MarketCategory>("전체");
  const [likesMap, setLikesMap] = useState<Record<string, number>>(
    MARKET_ASSETS_DATA.reduce((acc, item) => ({ ...acc, [item.id]: item.likes }), {})
  );
  const [likedStatusMap, setLikedStatusMap] = useState<Record<string, boolean>>({});
  const [cartItems, setCartItems] = useState<Record<string, boolean>>({});
  const [activeModalAsset, setActiveModalAsset] = useState<MarketAsset | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories: MarketCategory[] = ["전체", "텍스처/브러시", "템플릿", "3D"];

  const filteredAssets =
    selectedCategory === "전체"
      ? MARKET_ASSETS_DATA
      : MARKET_ASSETS_DATA.filter((item) => item.category === selectedCategory);

  const handleToggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isLiked = likedStatusMap[id];
    setLikedStatusMap((prev) => ({ ...prev, [id]: !isLiked }));
    setLikesMap((prev) => ({
      ...prev,
      [id]: isLiked ? (prev[id] || 0) - 1 : (prev[id] || 0) + 1,
    }));
  };

  const handleToggleCart = (asset: MarketAsset, e: React.MouseEvent) => {
    e.stopPropagation();
    const inCart = cartItems[asset.id];
    setCartItems((prev) => ({ ...prev, [asset.id]: !inCart }));
    showToast(inCart ? `[${asset.title}] 장바구니에서 삭제되었습니다.` : `[${asset.title}] 장바구니에 담겼습니다!`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleBuyNow = (asset: MarketAsset) => {
    setActiveModalAsset(asset);
  };

  return (
    <section className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-neonLime/10 text-neonLime border border-neonLime/30">
                <Layers className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-neonLime">
                Digital Creator Assets
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Market
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              음반 커버 및 모션 작업에 최적화된 고해상도 텍스처, 템플릿, 3D 그래픽 에셋
            </p>
          </div>

          {/* Right Header Controls: Category Tabs & View All Link */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center p-1 bg-surface rounded-xl border border-white/10 shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-neonLime text-black font-bold shadow-neon-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => setSelectedCategory("전체")}
              className="text-xs font-mono text-zinc-400 hover:text-neonLime transition-colors flex items-center gap-1 group px-2 py-1"
            >
              <span>전체보기</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => {
            const isLiked = likedStatusMap[asset.id];
            const inCart = cartItems[asset.id];
            const currentLikes = likesMap[asset.id] ?? asset.likes;

            return (
              <div
                key={asset.id}
                onClick={() => handleBuyNow(asset)}
                className="group relative rounded-2xl bg-surface border border-white/10 hover:border-neonLime/40 hover:shadow-neon-sm hover:-translate-y-1.5 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60">
                  <Image
                    src={asset.coverUrl}
                    alt={asset.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    {asset.badge && (
                      <span className="px-2 py-0.5 rounded-md bg-neonLime text-black text-[10px] font-mono font-black tracking-wider shadow-sm">
                        {asset.badge}
                      </span>
                    )}
                    {asset.fileFormat && (
                      <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300">
                        {asset.fileFormat}
                      </span>
                    )}
                  </div>

                  {/* Like Button on Thumbnail */}
                  <button
                    onClick={(e) => handleToggleLike(asset.id, e)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:border-rose-500/50 flex items-center justify-center transition-all duration-200 group/btn"
                    aria-label="좋아요"
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform group-active/btn:scale-125 ${
                        isLiked
                          ? "fill-rose-500 text-rose-500"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    />
                  </button>

                  {/* Quick Cart Button overlay */}
                  <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={(e) => handleToggleCart(asset, e)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center border text-xs font-mono transition-all ${
                        inCart
                          ? "bg-neonLime text-black border-neonLime shadow-neon-sm"
                          : "bg-black/80 text-white border-white/20 hover:border-neonLime hover:text-neonLime"
                      }`}
                      title={inCart ? "장바구니 담김" : "장바구니 담기"}
                    >
                      {inCart ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <ShoppingCart className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Card Content & Metadata */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category & Creator */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1">
                      <span className="text-zinc-500">{asset.category}</span>
                      <span>{asset.creatorName || "Verified Asset"}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-white group-hover:text-neonLime transition-colors leading-snug line-clamp-1">
                      {asset.title}
                    </h3>
                  </div>

                  {/* Price & Likes row */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-base font-black text-white font-mono tracking-tight group-hover:text-neonLime transition-colors">
                        {asset.priceFormatted}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-mono text-zinc-400">
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isLiked ? "fill-rose-500 text-rose-500" : "text-zinc-500"
                        }`}
                      />
                      <span>{currentLikes}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state if filtered */}
        {filteredAssets.length === 0 && (
          <div className="py-20 text-center rounded-2xl bg-surface border border-white/5">
            <Package className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
            <p className="text-zinc-400 text-sm">해당 카테고리의 에셋이 아직 등록되지 않았습니다.</p>
          </div>
        )}
      </div>

      {/* Asset Quick View / Buy Modal */}
      {activeModalAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#141418] border border-white/15 rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative">
            <button
              onClick={() => setActiveModalAsset(null)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video rounded-xl overflow-hidden mb-5 bg-black border border-white/10">
              <Image
                src={activeModalAsset.coverUrl}
                alt={activeModalAsset.title}
                fill
                sizes="(max-width: 640px) 100vw, 512px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="px-2 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-300">
                  {activeModalAsset.fileFormat || "Commercial License Included"}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-neonLime">
                  {activeModalAsset.category}
                </span>
                <span className="text-xs text-zinc-500 font-mono">
                  by {activeModalAsset.creatorName || "Creator"}
                </span>
              </div>
              <h3 className="text-2xl font-black text-white">
                {activeModalAsset.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                상업적 프로젝트(음반 커버, 뮤직비디오, 포스터 등)에 영구적으로 사용 가능한 고해상도 라이선스 에셋입니다. 다운로드 즉시 원본 소스가 제공됩니다.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between mb-6">
              <div>
                <span className="text-xs text-zinc-400 font-mono block">판매 가격</span>
                <span className="text-xl font-mono font-black text-neonLime">
                  {activeModalAsset.priceFormatted}
                </span>
              </div>
              <div className="text-right text-xs font-mono text-zinc-400">
                <span>즉시 다운로드 가능</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  handleToggleCart(activeModalAsset, e);
                  setActiveModalAsset(null);
                }}
                className="flex-1 py-3 rounded-xl border border-white/15 text-zinc-200 hover:text-white hover:border-white/30 text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>장바구니 담기</span>
              </button>
              <button
                onClick={() => {
                  showToast(`[${activeModalAsset.title}] 구매 및 라이선스 발급이 완료되었습니다!`);
                  setActiveModalAsset(null);
                }}
                className="flex-1 py-3 rounded-xl bg-neonLime text-black font-black text-xs hover:bg-[#bfe600] transition-colors shadow-neon-sm flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>지금 구매하기</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-[#141418] border border-neonLime/40 text-white text-xs font-medium shadow-2xl flex items-center gap-2.5 animate-slide-up">
          <Sparkles className="w-4 h-4 text-neonLime shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </section>
  );
}

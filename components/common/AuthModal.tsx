"use client";

import React, { useState, useEffect } from "react";
import { X, Mail, Lock, User, Eye, EyeOff, Check, Sparkles } from "lucide-react";

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "join";
}

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = "login",
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "join">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [role, setRole] = useState("Graphic Designer");

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setIsSuccess(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialMode]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onClose();
      setIsSuccess(false);
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      {/* Modal Card */}
      <div
        className="bg-[#141418] border border-white/10 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-neonLime/15 border border-neonLime/40 text-neonLime flex items-center justify-center mx-auto shadow-neon-sm animate-bounce">
              <Check className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                {mode === "login" ? "로그인 완료!" : "회원가입이 완료되었습니다!"}
              </h3>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                {mode === "login"
                  ? "환영합니다. 음악과 함께 비주얼 아카이브를 탐색해 보세요."
                  : "환영합니다! 크리에이터들과 함께 무한한 비전을 만들어가요."}
              </p>
            </div>
          </div>
        ) : (
          <div>
            {/* Top Branding */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 justify-center mb-1 select-none">
                <span className="text-lg font-black tracking-tight text-white">
                  One Track
                </span>
                <span className="text-neonLime text-xs">✦</span>
                <span className="text-lg font-black tracking-tight text-white">
                  Infinite Visions
                </span>
                <span className="text-neonLime font-bold text-lg">.</span>
              </div>
              <p className="text-xs text-zinc-400">
                하나의 음악, 무한한 시각을 함께 탐험하세요.
              </p>
            </div>

            {/* Segmented Switch Tabs [로그인 / 회원가입] */}
            <div className="grid grid-cols-2 border-b border-white/10 mb-6 relative">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`pb-3 text-sm font-semibold transition-colors relative ${
                  mode === "login" ? "text-neonLime" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span>로그인</span>
                {mode === "login" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neonLime shadow-neon-sm" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setMode("join")}
                className={`pb-3 text-sm font-semibold transition-colors relative ${
                  mode === "join" ? "text-neonLime" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span>회원가입</span>
                {mode === "join" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neonLime shadow-neon-sm" />
                )}
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Extra Join Fields */}
              {mode === "join" && (
                <>
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                      닉네임 / 아티스트명 *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="예: Studio 37, yoong"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="w-full bg-[#0A0A0C] border border-white/10 focus:border-neonLime rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition"
                      />
                      <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                      크리에이터 직군 (선택)
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-[#0A0A0C] border border-white/10 focus:border-neonLime rounded-lg px-4 py-3 text-sm text-white outline-none transition cursor-pointer"
                    >
                      <option value="Graphic Designer">Graphic Designer / 아트웍</option>
                      <option value="Motion Designer">Motion Designer / 비주얼라이저</option>
                      <option value="Music Video Director">Music Video Director / 영상</option>
                      <option value="Illustrator">Illustrator / 일러스트</option>
                      <option value="Music Producer">Music Producer / 뮤지션</option>
                      <option value="Audience">Audience / 음악 & 비주얼 리스너</option>
                    </select>
                  </div>
                </>
              )}

              {/* Email Input */}
              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                  이메일 주소 *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="example@onetrack.io"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0A0A0C] border border-white/10 focus:border-neonLime rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition"
                  />
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                  비밀번호 *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#0A0A0C] border border-white/10 focus:border-neonLime rounded-lg pl-10 pr-10 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition"
                  />
                  <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Options: Remember Me & Forgot Password */}
              {mode === "login" ? (
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-zinc-400 hover:text-zinc-200">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded bg-black/60 border border-white/20 text-neonLime focus:ring-0 focus:outline-none cursor-pointer accent-[#D4FF00]"
                    />
                    <span>아이디 기억하기</span>
                  </label>
                  <button
                    type="button"
                    className="text-zinc-400 hover:text-neonLime transition-colors"
                  >
                    비밀번호 찾기
                  </button>
                </div>
              ) : (
                <div className="text-[11px] text-zinc-500 pt-1">
                  가입 시 One Track의{" "}
                  <span className="text-zinc-300 underline underline-offset-2">이용약관</span> 및{" "}
                  <span className="text-zinc-300 underline underline-offset-2">개인정보처리방침</span>에 동의하게 됩니다.
                </div>
              )}

              {/* Main CTA Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-[#D4FF00] text-black font-semibold text-sm hover:bg-[#BCE600] transition-all shadow-neon-sm active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{mode === "login" ? "로그인" : "계정 생성하기"}</span>
              </button>
            </form>

            {/* Social Login Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <span className="relative px-3 bg-[#141418] text-[11px] font-mono text-zinc-500">
                또는 소셜 계정으로 계속하기
              </span>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3">
              {/* Google Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google</span>
              </button>

              {/* Apple Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 1.01-2.85-.9.04-2 .6-2.65 1.35-.58.67-1.09 1.74-1.05 2.78 1.01.08 2.06-.53 2.69-1.28z" />
                </svg>
                <span>Apple</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

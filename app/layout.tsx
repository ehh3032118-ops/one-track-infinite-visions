import type { Metadata } from "next";
import "./globals.css";
import { AudioProvider } from "@/context/AudioContext";
import GlobalAudioPlayer from "@/components/common/GlobalAudioPlayer";

export const metadata: Metadata = {
  title: "One Track, Infinite Visions | 하나의 음악, 무한한 시각",
  description:
    "하나의 음악을 바탕으로 다양한 시각 창작물(아트웍, 뮤직비디오, 모션그래픽 등)을 아카이빙하고 공유하는 크리에이티브 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="bg-background text-foreground min-h-screen antialiased selection:bg-neonLime selection:text-black">
        <AudioProvider>
          <div className="flex flex-col min-h-screen pb-24">
            {children}
          </div>
          <GlobalAudioPlayer />
        </AudioProvider>
      </body>
    </html>
  );
}

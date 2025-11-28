import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VibeArena",
  description: "Prompt-aware coding evaluation platform"
};

const navLinks = [
  { label: "대회 소개", href: "#" },
  { label: "트랙 일정", href: "#" },
  { label: "AI 패널", href: "#" },
  { label: "자료실", href: "#" }
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-[#f5f6fb] text-slate-900 antialiased">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="text-lg font-bold text-brand">VibeArena</div>
            <nav className="hidden gap-6 text-sm text-slate-600 md:flex">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="hover:text-brand">
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <button className="text-sm font-medium text-slate-600">로그인</button>
              <button className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">
                대회 열기
              </button>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
      </body>
    </html>
  );
}

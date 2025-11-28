"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const slides = [
  {
    title: "Prompt-native Coding Battles",
    subtitle: "브라우저 IDE에서 프롬프트 활용과 코드 품질을 동시에 측정",
    highlight: "Vibe 지표 1.0"
  },
  {
    title: "AI 정책 & 트랙 관리",
    subtitle: "조직별 모델 허용 정책을 스위치처럼 제어",
    highlight: "Secure Sandbox"
  },
  {
    title: "리더보드 & 리포트",
    subtitle: "정확도/속도/프롬프트 효율을 한눈에 비교",
    highlight: "Insights"
  }
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const stats = [
    { label: "누적 참가자", value: "12,480+" },
    { label: "데이터 트랙", value: "86개" },
    { label: "프롬프트 로그", value: "4.7억 건" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="overflow-hidden rounded-[32px] bg-white shadow-xl ring-1 ring-slate-100">
      <div className="grid gap-10 p-10 md:grid-cols-2">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-light px-4 py-1 text-xs font-semibold text-brand-dark">
            프롬프트 기반 코딩 테스트
          </span>
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.h1
                key={slide.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-4xl font-bold leading-tight text-slate-900 md:text-[46px]"
              >
                {slide.title}
              </motion.h1>
            </AnimatePresence>
            <p className="text-lg text-slate-600">{slide.subtitle}</p>
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>• IDE 실행/프롬프트 로그/제출까지 하나의 타임라인으로 기록</li>
            <li>• 조직별 모델 허용 정책, 제출 횟수·스플릿 제어</li>
            <li>• Vibe 지표 1.0으로 속도·정확성·프롬프트 효율을 공정하게 비교</li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow hover:bg-brand-dark">
              지금 트랙 둘러보기
            </button>
            <button className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-600">
              운영 가이드 다운로드
            </button>
          </div>
          <div className="grid gap-6 pt-4 text-sm text-slate-600 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{stat.label}</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-100 bg-gradient-to-br from-white via-brand-light to-white p-8 shadow-lg">
            <p className="text-sm font-semibold text-brand-dark">{slide.highlight}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{slide.title}</p>
            <p className="mt-3 text-sm text-slate-600">
              프롬프트 턴 수, 토큰, 실행 결과를 한 번에 모아 참가자의 학습 곡선을 시각화합니다.
            </p>
            <div className="mt-6 grid gap-3 rounded-2xl bg-white/80 p-4 text-sm shadow-inner">
              <div className="flex items-center justify-between text-slate-500">
                <span>평균 제출 간격</span>
                <span className="font-semibold text-slate-900">14분</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>프롬프트 효율 백분위</span>
                <span className="font-semibold text-slate-900">Top 15%</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>FPA (First-Pass Acceptance)</span>
                <span className="font-semibold text-slate-900">68%</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setIndex(idx)}
                className={clsx(
                  "h-2 w-8 rounded-full transition-all",
                  idx === index ? "bg-brand" : "bg-slate-200"
                )}
                aria-label={`slide-${idx}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { HeroCarousel } from "@/components/landing/HeroCarousel";
import { CompetitionGrid } from "@/components/landing/CompetitionGrid";
import Link from "next/link";

const featureCards = [
  {
    title: "대회 운영 자동화",
    desc: "트랙·페이즈·스케줄을 한 번에 세팅하고, 제출 정책을 버튼으로 토글합니다.",
    badge: "Ops"
  },
  {
    title: "AI 패널 & 로그",
    desc: "프롬프트 입력/출력, 코드 diff, 실행 로그를 타임라인으로 추적합니다.",
    badge: "Prompt"
  },
  {
    title: "리포트 & 랭킹",
    desc: "Vibe 지표 1.0, 리더보드 스플릿, 주관식 코멘트까지 한 화면에서 관리합니다.",
    badge: "Report"
  }
];

const steps = [
  {
    title: "문제 & 트랙 등록",
    desc: "데이터셋, 테스트 스크립트, 제출 가이드를 등록하고 참가 권한을 설정합니다."
  },
  {
    title: "실행 & 프롬프트 수집",
    desc: "브라우저 IDE에서 코드 실행, AI 패널 프롬프트 기록, 제출 로그를 자동으로 적재합니다."
  },
  {
    title: "스코어링 & 리포트 발행",
    desc: "Celery 워커가 Vibe 지표를 계산하고, 리더보드와 개인 보고서를 동시에 업데이트합니다."
  }
];

export default function LandingPage() {
  return (
    <main className="space-y-16 pb-20">
      <HeroCarousel />

      <section className="grid gap-6 md:grid-cols-3">
        {featureCards.map((card) => (
          <article
            key={card.title}
            className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="inline-flex items-center rounded-full bg-brand-light px-3 py-1 text-xs font-semibold text-brand-dark">
              {card.badge}
            </span>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{card.desc}</p>
            <Link href="#" className="mt-4 inline-flex items-center text-sm font-semibold text-brand">
              자세히 보기 →
            </Link>
          </article>
        ))}
      </section>

      <CompetitionGrid />

      <section className="grid gap-6 rounded-3xl bg-white p-10 shadow-sm ring-1 ring-slate-100 md:grid-cols-3">
        {steps.map((step, idx) => (
          <article key={step.title} className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-brand">{String(idx + 1).padStart(2, "0")}</span>
            <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
          <p className="text-sm text-slate-600">{step.desc}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl bg-gradient-to-br from-brand to-brand-dark p-10 text-white shadow-lg">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">Get started</p>
            <h3 className="mt-3 text-2xl font-semibold">VibeArena로 프롬프트 기반 코딩 테스트를 시작하세요</h3>
            <p className="mt-2 text-sm text-white/80">
              운영 가이드를 받아보고, 샌드박스 환경에서 바로 트랙을 생성해 볼 수 있습니다.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand">
              데모 요청
            </button>
            <button className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white">
              운영자 자료 보기
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useCompetitions } from "@/lib/api/hooks";

export function CompetitionGrid() {
  const { data, loading, error } = useCompetitions();

  return (
    <section className="mt-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">tracks</p>
          <h2 className="text-2xl font-semibold text-slate-900">진행 중인 트랙</h2>
        </div>
        <Link href="#" className="text-sm font-semibold text-brand hover:underline">
          전체 보기
        </Link>
      </div>
      {loading && <p className="text-sm text-slate-500">대회를 불러오는 중...</p>}
      {error && <p className="text-sm text-rose-400">연결에 실패했습니다: {error}</p>}
      <div className="grid gap-5 md:grid-cols-2">
        {data.map((competition) => (
          <article
            key={competition.id}
            className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400">{competition.slug}</span>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">
                {competition.title}
                {competition.is_private && (
                  <span className="ml-2 rounded-full border border-slate-200 px-2 py-[2px] text-xs font-medium text-slate-500">
                    Private
                  </span>
                )}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                {competition.description || "설명이 준비 중입니다."}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
              <span>{new Date(competition.created_at).toLocaleDateString()}</span>
              <Link href={`/problem/${competition.id}`} className="inline-flex items-center gap-1 text-brand">
                참여하기
                <ArrowUpRight size={16} className="transition group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        ))}
        {!loading && !error && data.length === 0 && (
          <p className="text-sm text-slate-500">아직 등록된 대회가 없습니다.</p>
        )}
      </div>
    </section>
  );
}

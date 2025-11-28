"use client";

import { useState } from "react";
import { usePhase } from "@/lib/api/hooks";
import { Loader2, SendHorizontal } from "lucide-react";

interface Props {
  phaseId: string;
}

export function ProblemWorkspace({ phaseId }: Props) {
  const { data, loading, error } = usePhase(phaseId);
  const [code, setCode] = useState("# Write your solution here\n");
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handlePromptSend = () => {
    if (!prompt.trim()) return;
    setMessages((prev) => [...prev, prompt.trim()]);
    setPrompt("");
  };

  return (
    <div className="grid gap-6 md:grid-cols-[2fr,3fr]">
      <section className="rounded-2xl border border-white/5 bg-white/5 p-6">
        {loading && (
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Loader2 className="h-4 w-4 animate-spin" /> 문제를 불러오는 중...
          </div>
        )}
        {error && <p className="text-sm text-rose-300">연결 실패: {error}</p>}
        {data && (
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-300">Phase #{data.id}</p>
              <h1 className="mt-2 text-2xl font-semibold">{data.name}</h1>
            </div>
            <div className="rounded-xl bg-black/20 p-4 text-sm text-slate-300">
              <p>
                제출 제한 <strong>{data.submission_limit}</strong>회 · {new Date(data.starts_at).toLocaleDateString()} ~
                {" "}
                {new Date(data.ends_at).toLocaleDateString()}
              </p>
              <p className="mt-2 text-xs text-slate-400">
                metrics config: {JSON.stringify(data.metrics_config ?? {}, null, 2)}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">문제 설명</h2>
              <p className="mt-2 text-sm text-slate-300">
                실제 문제 설명/API 연동이 들어갈 자리입니다. Programmers 스타일을 참고해 테스트 케이스, 제약
                조건 등을 마크다운으로 렌더링할 예정입니다.
              </p>
            </div>
          </div>
        )}
      </section>
      <section className="space-y-4">
        <div className="rounded-2xl border border-white/5 bg-[#0f0c1f] p-4">
          <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
            <span>코드 에디터</span>
            <button className="rounded-full bg-amber-400/10 px-3 py-1 text-[11px] font-semibold text-amber-300">
              자동 저장
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="h-64 w-full resize-none rounded-xl bg-black/40 p-4 font-mono text-sm text-slate-100 focus:outline-none"
          />
          <div className="mt-3 flex gap-2">
            <button className="flex-1 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">
              실행하기
            </button>
            <button className="flex-1 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white">
              제출하기
            </button>
          </div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold">프롬프트 대화</h3>
            <span className="text-xs text-slate-400">프롬프트 로그 {messages.length}개</span>
          </div>
          <div className="h-40 space-y-2 overflow-y-auto rounded-xl bg-black/20 p-3 text-sm text-slate-300">
            {messages.length === 0 && <p className="text-xs text-slate-500">첫 프롬프트를 작성해보세요.</p>}
            {messages.map((msg, idx) => (
              <div key={idx} className="rounded-lg bg-white/5 p-2 text-xs text-white">
                {msg}
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="모델에게 질문을 던져보세요"
              className="flex-1 rounded-full bg-black/30 px-4 py-2 text-sm focus:outline-none"
            />
            <button
              onClick={handlePromptSend}
              className="rounded-full bg-amber-400/20 p-2 text-amber-200 hover:bg-amber-300/30"
            >
              <SendHorizontal size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

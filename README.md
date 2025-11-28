# ⚛️ frontend/README.md

## KRvibe Frontend (Next.js + TypeScript)

**목표:** 평가 참가/관리, 결과 열람, 어드민(문제/세션/리포트) UI를 **빠르고 가벼운** Next.js 기반으로 제공. i18n(ko/en), CSR/SSG 혼용, Tailwind + shadcn/ui 권장.

---

## 0) 팀 규칙 요약 (축약)

문서 선행, 컨벤션 준수, Free Tier, PR 리뷰+테스트, 보안/마스킹, “왜”를 설명하는 주석.

---

## 1) 기술 스택

- **Next.js + TypeScript** (일부 페이지 SSG, 나머지 CSR)  
- **TailwindCSS + shadcn/ui + lucide-react** (일관된 디자인/생산성)  
- **상태관리**: 경량(예: Zustand), 페이지 간 전역은 최소화  
- **요청 클라이언트**: axios 인스턴스(공/사 API 분리: `publicInstance`/`privateInstance`)  
- **i18n 데이터 구조**: `/data/i18n/mainpage.ts` (`homeContent.kor|eng`) 패턴  
- **관리 UI**: /admin/recruit, /admin/contact, /admin/faq 등 요구사항 반영(모달, axios, alert)  
- **메인 히어로**: 섹션1 슬라이더(3장, 5초 간격, 인디케이터 포함)

---

## 2) 폴더 구조(예시)

```
frontend/
├─ src/
│  ├─ pages/ (또는 app/)
│  ├─ components/
│  ├─ features/
│  │  ├─ admin/
│  │  ├─ session/           # 참가 UI (에디터/프롬프트 패널/타이머)
│  │  └─ results/           # 리포트/랭킹
│  ├─ lib/
│  │  ├─ api/               # axios instances, hooks
│  │  └─ i18n/
│  ├─ data/
│  │  └─ i18n/mainpage.ts   # {homeContent.kor|eng}
│  └─ styles/
├─ public/
├─ .env.example
└─ README.md
```

---

## 3) 빠른 시작

```bash
pnpm i
pnpm dev            # http://localhost:3000
pnpm build && pnpm start
```

### 환경변수
```
NEXT_PUBLIC_API_BASE_URL=https://api.local
NEXT_PUBLIC_S3_PUBLIC_URL=https://cdn.local
```

> 로컬 백엔드를 venv로 띄웠다면 `http://localhost:8000/api/v1`로 지정하면 됩니다. Core/Edge 환경에서는 해당 도메인을 서비스에 맞춰 교체하세요.

---

## 4) 주요 화면

### 4-1. Landing (홈)
- `/` 페이지는 Dacon 스타일의 대회 랜딩을 참고해 **히어로 캐러셀 + 카드형 특징 섹션 + 대회 그리드**로 구성했습니다.
- `src/components/landing/*` 컴포넌트가 담당하며 `useCompetitions()` 훅으로 백엔드의 `/api/v1/competitions` 목록을 불러옵니다.
- API 응답이 없을 때도 skeleton/에러 메시지를 표기합니다.

### 4-2. Problem Workspace
- `/problem/[id]` 페이지는 Programmers 문제풀이 레이아웃을 참고해 **좌측 문제 설명, 우측 코드/프롬프트 패널**로 분리했습니다.
- `ProblemWorkspace` 컴포넌트가 `usePhase(id)`로 `/api/v1/phases/{id}`를 요청해 제출 제한, 일정 등을 표시합니다.
- 코드 편집/프롬프트 패널은 아직 textarea 기반의 뼈대이며 추후 Monaco, Prompt 로그 API로 대체할 수 있도록 state만 제공합니다.

---

## 5) API 연동 가이드

---

## 4) API 연동 가이드

```ts
// src/lib/api/instances.ts
export const publicInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 7000,
});
```

- `useCompetitions` / `usePhase` 훅으로 최소 API 데이터를 불러오며, 추후 admin/세션 등으로 확장할 수 있습니다.
- private API는 JWT 및 인터셉터 추가 후 `lib/api/instances.ts`에 별도 인스턴스를 선언해 주세요.

---

## 6) UI 스펙(발췌)

- **Admin/Recruit**: 진입 시 전체 조회, 항목별 [수정][삭제][상세], 모달 팝업 수정, 신규 작성 모달, 요청 성공 시 `alert()`.  
- **Admin/Contact**: 진입 시 POST 조회, 항목 클릭 시 전문/읽음처리 버튼, POST로 `treatment=true`.  
- **FAQ**: 카테고리 토글 5종, 전송 시 `1~5` 매핑. GET 응답은 문자열.

---

## 7) 코드 품질

- **ESLint + Prettier**, 컴포넌트는 **PascalCase**, 페이지/폴더는 **kebab-case**.  
- PR에 최소 1개 테스트(컴포넌트/훅) 추가 권장.  
- 이미지/리소스는 경량 최적화(Free Tier 정신).

---

## 8) 배포

- 정적 빌드 or SSR 모두 가능(요구·인프라에 맞춤).  
- CI/CD: Build → Lint/Typecheck/Test → S3/CloudFront 또는 Render/Web Service 배포.  
- 환경별 `.env`는 CI Secret으로 관리.

---

## 9) 접근성/성능

- a11y 검사(헤딩 구조/대체텍스트/키보드 탐색).  
- 성능: 이미지 lazy, 코드 스플리팅, 불필요 렌더 최소화.

---

## 10) 회고/문서

- 새 기능 릴리스마다 **성과 요약 & 회고** 작성(잘된 점/개선/이슈).

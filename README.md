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

---

## 4) API 연동 가이드

```ts
// lib/api/instances.ts
import axios from "axios";
export const publicInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL });
// privateInstance는 토큰 인터셉터 부착, 에러/재시도 규칙 포함
```

- **타임아웃/에러 규칙**: 사용자에 친절한 에러 메시지 + Sentry 로깅(선택).  
- **i18n**: `langStore.ts` 상태에 따라 데이터 소스 분기(ko/en).  
- **SSG/CSR 믹스**: `index.tsx`는 SSG, 그 외는 CSR 유지.

---

## 5) UI 스펙(발췌)

- **Admin/Recruit**: 진입 시 전체 조회, 항목별 [수정][삭제][상세], 모달 팝업 수정, 신규 작성 모달, 요청 성공 시 `alert()`.  
- **Admin/Contact**: 진입 시 POST 조회, 항목 클릭 시 전문/읽음처리 버튼, POST로 `treatment=true`.  
- **FAQ**: 카테고리 토글 5종, 전송 시 `1~5` 매핑. GET 응답은 문자열.

---

## 6) 코드 품질

- **ESLint + Prettier**, 컴포넌트는 **PascalCase**, 페이지/폴더는 **kebab-case**.  
- PR에 최소 1개 테스트(컴포넌트/훅) 추가 권장.  
- 이미지/리소스는 경량 최적화(Free Tier 정신).

---

## 7) 배포

- 정적 빌드 or SSR 모두 가능(요구·인프라에 맞춤).  
- CI/CD: Build → Lint/Typecheck/Test → S3/CloudFront 또는 Render/Web Service 배포.  
- 환경별 `.env`는 CI Secret으로 관리.

---

## 8) 접근성/성능

- a11y 검사(헤딩 구조/대체텍스트/키보드 탐색).  
- 성능: 이미지 lazy, 코드 스플리팅, 불필요 렌더 최소화.

---

## 9) 회고/문서

- 새 기능 릴리스마다 **성과 요약 & 회고** 작성(잘된 점/개선/이슈).


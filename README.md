# Kiyong's Blog

React + TypeScript + Vite로 구축된 현대적인 블로그 애플리케이션입니다.

## 📋 목차

- [기술 스택](#기술-스택)
- [주요 기능](#주요-기능)
- [시작하기](#시작하기)
- [프로젝트 구조](#프로젝트-구조)
- [사용된 도구](#사용된-도구)
- [스크립트](#스크립트)

## 🛠 기술 스택

### 핵심 기술

- **React 19.2** - UI 라이브러리
- **TypeScript 5.9** - 타입 안정성
- **Vite 7.2** - 빌드 도구 및 개발 서버
- **React Router 7.9** - 클라이언트 사이드 라우팅

### 스타일링

- **TailwindCSS 3.4** - 유틸리티 우선 CSS 프레임워크
- **shadcn/ui** - 재사용 가능한 UI 컴포넌트
- **lucide-react** - 아이콘 라이브러리
- **react-icons** - 추가 아이콘 라이브러리

### 상태 관리 & API

- **Zustand 5.0** - 경량 상태 관리 라이브러리
- **Axios 1.13** - HTTP 클라이언트

### 개발 도구

- **ESLint** - 코드 품질 검사
- **Prettier** - 코드 포맷팅
- **TypeScript ESLint** - TypeScript 린팅

## ✨ 주요 기능

### 인증 시스템

- 로그인/회원가입 기능
- JWT 토큰 기반 인증
- 자동 토큰 갱신
- 인증 상태 관리 (Zustand)

### 블로그 기능

- **홈 페이지**: 포스트 목록 및 검색
- **글 작성**: 제목, 카테고리, 썸네일, 내용 작성
- **글 읽기**: 상세 페이지 및 관련 포스트 추천
- **글 삭제**: 작성자 본인만 삭제 가능

### UI/UX

- 반응형 디자인 (모바일, 태블릿, 데스크톱)
- 검색 기능 (디바운싱 적용)
- 로딩 상태 표시
- 에러 처리
- Toast 알림 시스템

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0 이상
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
# 개발 서버 시작 (http://localhost:5173)
npm run dev
```

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 📁 프로젝트 구조

```
src/
├── api/              # API 관련 설정
│   └── axiosInstance.ts
├── assets/           # 정적 파일 (이미지, 아이콘)
│   ├── icon/
│   └── images/
├── components/       # React 컴포넌트
│   ├── ui/          # shadcn/ui 컴포넌트
│   ├── home/        # 홈 페이지 컴포넌트
│   └── read/        # 읽기 페이지 컴포넌트
├── css/             # 스타일 파일
│   ├── index.css
│   ├── reset.css
│   └── blog.css
├── hooks/           # 커스텀 훅
│   ├── useAxios.ts
│   └── use-toast.ts
├── layouts/         # 레이아웃 컴포넌트
│   ├── RootLayout.tsx
│   ├── AuthenticatedLayout.tsx
│   └── UnauthenticatedLayout.tsx
├── lib/             # 유틸리티 함수
│   └── utils.ts
├── pages/           # 페이지 컴포넌트
│   ├── Home.tsx
│   ├── Auth.tsx
│   ├── Write.tsx
│   └── Read.tsx
├── stores/          # Zustand 스토어
│   └── useAuthStore.ts
├── types/           # TypeScript 타입 정의
│   ├── post.d.ts
│   └── zustand.d.ts
├── App.tsx          # 메인 앱 컴포넌트
└── main.tsx         # 진입점
```

## 🎨 사용된 도구

### shadcn/ui 컴포넌트

프로젝트에 다음 컴포넌트들이 포함되어 있습니다:

- `button` - 버튼 컴포넌트
- `card` - 카드 컨테이너
- `input` - 입력 필드
- `textarea` - 텍스트 영역
- `dialog` - 모달 대화상자
- `toast` - 토스트 알림
- `badge` - 배지/태그
- `table` - 테이블
- `pagination` - 페이지네이션
- `skeleton` - 스켈레톤 로딩

### 추가 컴포넌트 설치

새로운 shadcn/ui 컴포넌트를 추가하려면:

```bash
npm run ui:add [component-name]

# 예시
npm run ui:add select
npm run ui:add dropdown-menu
```

## 📜 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# ESLint 검사
npm run lint

# Prettier로 코드 포맷팅
npm run format

# Prettier 포맷팅 검사만
npm run format:check

# shadcn/ui 컴포넌트 추가
npm run ui:add [component-name]
```

## 🎯 주요 기능 상세

### 인증 시스템

- **로그인/회원가입**: 이메일 기반 인증
- **토큰 관리**: 자동 토큰 갱신 및 세션 관리
- **보호된 라우트**: 인증이 필요한 페이지 보호

### 블로그 기능

- **포스트 목록**: 그리드 레이아웃으로 포스트 표시
- **검색**: 실시간 검색 (디바운싱 적용)
- **카테고리**: Travel, Food, Life 카테고리 지원
- **썸네일**: Base64 인코딩 이미지 업로드
- **관련 포스트**: 현재 포스트와 관련된 추천 포스트 표시

### 반응형 디자인

- 모바일: 320px 이상
- 태블릿: 640px 이상
- 데스크톱: 768px 이상
- 와이드 스크린: 1024px 이상

## 🔧 설정 파일

- `vite.config.ts` - Vite 설정
- `tailwind.config.js` - TailwindCSS 설정
- `tsconfig.json` - TypeScript 설정
- `eslint.config.js` - ESLint 설정
- `.prettierrc` - Prettier 설정
- `components.json` - shadcn/ui 설정

## 📝 라이선스

이 프로젝트는 개인 프로젝트입니다.

## 👤 작성자

**Kiyong Kwak**

- GitHub: [@kwakkiyong](https://github.com/kwakkiyong)
- Notion: [Notion](https://www.notion.so/)

---

Made with ❤️ using React + TypeScript + Vite

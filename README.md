# 수강신청 시스템 — Frontend

수강신청 프로젝트의 프론트엔드입니다. React + Vite로 구성되어 있으며, Cognito 로그인/회원가입, 강의 목록 조회/신청/취소, 내 신청목록, 시간표 화면을 제공합니다.

## 기술 스택

- React + Vite
- React Router (`react-router-dom`)
- Tailwind CSS (v4, `@tailwindcss/vite` 플러그인 방식)
- `amazon-cognito-identity-js` — Cognito 회원가입/로그인/토큰 관리

## 사전 준비물

- Node.js, npm
- 백엔드 서버가 로컬(`localhost:8080`)에서 실행 중이어야 함 (백엔드 저장소의 README 참고)

## 빠른 시작

```bash
git clone <저장소 주소>
cd <이 폴더>/frontend
npm install
npm run dev
```

`http://localhost:5173`에서 확인합니다. `/`로 접속하면 자동으로 `/login`으로 이동합니다.

## 환경변수

| 변수 | 기본값 | 설명 |
|---|---|---|
| `VITE_API_URL` | `http://localhost:8080` | 백엔드 API 주소. `api.js`에서 `import.meta.env.VITE_API_URL`로 읽음 |

## 인증 (Cognito)

`src/auth.js`에 Cognito 관련 로직이 모여 있습니다.

```javascript
const POOL_DATA = {
  UserPoolId: 'ap-northeast-3_81iUULHdX',
  ClientId: 'bbfrmvvt5q6rq95f6mgg0a9oh',
}
```

제공 함수:

| 함수 | 역할 |
|---|---|
| `signUp({ email, password, name, studentNo })` | 회원가입. 성공하면 Cognito가 이메일로 인증코드 발송 |
| `confirmSignUp({ email, code })` | 인증코드 확인 |
| `resendConfirmationCode({ email })` | 인증코드 재전송 |
| `signIn({ email, password })` | 로그인. 성공 시 JWT가 Cognito SDK 내부적으로 저장됨 |
| `getToken()` | 현재 로그인된 사용자의 idToken 반환 (만료 시 자동 갱신, 비로그인 시 `null`) |
| `signOut()` | 로그아웃 |
| `isAuthenticated()` | 현재 로그인 상태 여부 (Promise) |

`src/api.js`(`api` 객체)가 모든 API 요청에 `getToken()`으로 가져온 토큰을 `Authorization: Bearer` 헤더로 자동으로 실어 보냅니다. 개별 API 호출 코드에서 직접 토큰을 다룰 필요는 없습니다.

비밀번호 정책: 영문 소문자 + 숫자 포함 8자 이상.

## 라우팅 구조

전체 화면이 로그인 필수입니다(팀 정책).

| 경로 | 화면 | 접근 |
|---|---|---|
| `/login` | 로그인 | 공개 |
| `/signup` | 회원가입 (가입 → 인증코드 2단계) | 공개 |
| `/courses` | 강의 목록 / 신청 / 취소 | 로그인 필요 |
| `/my-enrollments` | 내 신청목록 | 로그인 필요 |
| `/timetable` | 시간표 | 로그인 필요 |

로그인 필요 화면은 `ProtectedRoute`로 감싸져 있으며, `isAuthenticated()`가 `false`면 `/login`으로 리다이렉트됩니다. 로그인 후 화면들은 상단에 `NavTabs`(탭 네비게이션 + 로그인한 사용자 이름 표시 + 로그아웃 버튼)가 공통으로 표시됩니다.

## 디자인 시스템

색상, 타이포그래피, 공용 컴포넌트(`Button`, `Field`, `Input`, `TextLink`)는 `DESIGN-TOKENS.md`와 `src/components/ui.jsx`에 정의되어 있습니다. 새 화면을 만들 때는 이 토큰과 컴포넌트를 그대로 사용합니다 — 값을 새로 정의하지 않습니다.

| 토큰 | 용도 |
|---|---|
| `ink`, `paper`, `chalk`, `graphite` | 본문/배경/테두리/보조 텍스트 |
| `cobalt`, `cobalt-deep` | 주요 액션(버튼, 링크) |
| `mint` | 성공, 여석 있음 |
| `signal` | 에러, 정원 마감 |
| `font-sans` (Pretendard) | 기본 텍스트 |
| `font-mono` (JetBrains Mono) | 과목코드, 시간, 학번, 학점 등 데이터성 정보 |

## 폴더 구조

```
frontend/
├── vite.config.js          # amazon-cognito-identity-js용 global → globalThis 치환 포함
├── DESIGN-TOKENS.md
└── src/
    ├── App.jsx              # 라우터, 로그인/회원가입 콜백 연결
    ├── auth.js               # Cognito 인증 유틸
    ├── api.js                # 토큰 자동 첨부 API 호출 유틸
    ├── api/
    │   └── coursesApi.js     # 강의/신청 API 호출 (api.js 기반)
    ├── components/
    │   ├── ui.jsx             # Button, Field, Input, TextLink
    │   ├── AuthLayout.jsx     # 로그인/회원가입 공통 레이아웃
    │   ├── NavTabs.jsx        # 탭 네비게이션 + 사용자명 + 로그아웃
    │   ├── ProtectedRoute.jsx # 로그인 필요 라우트 가드
    │   └── CourseRow.jsx      # 강의 목록 행(신청/취소 버튼 포함)
    └── pages/
        ├── LoginPage.jsx
        ├── SignupPage.jsx
        ├── CoursesPage.jsx
        ├── MyEnrollmentsPage.jsx
        └── TimetablePage.jsx   # 임시 버전, 최종 디자인으로 교체 예정
```


## 자주 겪는 문제

**`Uncaught ReferenceError: global is not defined`**

`amazon-cognito-identity-js`가 Node.js 전역 변수 `global`을 참조하는데 브라우저에는 없어서 발생합니다. `vite.config.js`의 `define: { global: 'globalThis' }` 설정으로 해결되어 있습니다. 이 설정 파일을 건드렸다면 이 항목이 남아있는지 확인하세요.

**로그인/회원가입 시 `InvalidParameterException`, `NotAuthorizedException` 등**

Cognito User Pool 또는 App Client 설정(커스텀 속성 스키마, 허용된 인증 흐름 등) 문제일 수 있습니다. 프론트 코드보다 인프라 저장소의 Cognito 설정(Terraform)을 먼저 확인하는 것이 빠릅니다.

**로그인/신청은 성공하는데 화면 전환이 안 됨**

`LoginPage`/`SignupPage`가 호출하는 콜백(`onLoginSuccess`, `onComplete` 등)이 `App.jsx`의 라우트 정의에서 실제로 연결되어 있는지 확인하세요. 각 페이지 컴포넌트가 받는 prop 이름은 컴포넌트 파일에서 직접 확인하는 것이 가장 정확합니다.

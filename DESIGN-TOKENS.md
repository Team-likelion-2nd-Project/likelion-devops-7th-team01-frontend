# 프론트 디자인 기준

수강신청 UI 등 다른 화면도 아래 토큰과 컴포넌트를 그대로 쓰면 톤이 맞습니다.
값을 새로 정하지 말고 여기 정의된 클래스명을 사용해 주세요.

## 색상

| 토큰 | HEX | 용도 |
|---|---|---|
| `ink` | `#14161A` | 본문 텍스트, 어두운 패널 |
| `ink-soft` | `#1E2126` | 패널 위 살짝 밝은 면 |
| `paper` | `#FBFAF8` | 페이지 배경 |
| `chalk` | `#E7E5DF` | 테두리, 구분선 |
| `graphite` | `#5B6169` | 보조 텍스트, 도움말 |
| `cobalt` | `#2B4BF2` | 주요 액션 (신청 버튼, 링크) |
| `cobalt-deep` | `#1E36C4` | 주요 액션 hover |
| `mint` | `#00C48C` | 성공, 여석 있음(`OPEN`) |
| `signal` | `#FF5C38` | 에러, 정원 마감(`CLOSED`) |

사용 예: `bg-cobalt`, `text-graphite`, `border-chalk`

## 타이포그래피

| 역할 | 폰트 | 사용처 |
|---|---|---|
| 기본 | Pretendard (`font-sans`) | 모든 한글·영문 텍스트 |
| 데이터 | JetBrains Mono (`font-mono`) | 과목코드, 시간, 학번, 학점, 요일 |

숫자·코드성 정보는 `font-mono` 를 쓰면 자리수가 흔들리지 않습니다.
(`CSE201`, `09:00`, `20261234`, `3학점`)

| 단계 | 클래스 |
|---|---|
| 페이지 제목 | `text-[30px] font-extrabold tracking-[-.035em]` |
| 섹션 제목 | `text-[20px] font-bold tracking-[-.02em]` |
| 본문 | `text-[15px]` |
| 라벨 | `text-[13px] font-semibold` |
| 도움말·캡션 | `text-[12px] text-graphite` |

## 모양

| 항목 | 값 | 클래스 |
|---|---|---|
| 버튼·인풋·카드 radius | 10px | `rounded-field` |
| 시간표 블록 radius | 4px | `rounded-block` |
| 버튼·인풋 높이 | 48px | `h-12` |
| 폼 요소 세로 간격 | 20px | `space-y-5` |

## 컴포넌트

`src/components/ui.jsx` 에 있습니다.

```jsx
import { Button, Field, Input, TextLink } from '../components/ui'

<Button variant="primary" full>수강신청</Button>
<Button variant="secondary">취소</Button>
<Button variant="danger">신청 취소</Button>

<Field label="과목코드" htmlFor="code" hint="예: CSE201" error={error}>
  <Input id="code" mono invalid={Boolean(error)} />
</Field>
```

`Button` variant는 `primary` / `secondary` / `danger` 세 가지입니다.

## 상태 표시 규칙

| 상태 | 색 | 표기 |
|---|---|---|
| `OPEN` (여석 있음) | `mint` | 잔여석 숫자를 `font-mono` 로 |
| `CLOSED` (정원 마감) | `signal` | "정원 마감" |
| 시간 겹침 에러 | `signal` | "시간표가 겹칩니다" |

에러 메시지는 API 명세의 `error` 필드 문구를 그대로 노출하면 됩니다.

## 문구 톤

- 버튼은 눌렀을 때 일어나는 일을 그대로 씁니다. "확인" 대신 "수강신청".
- 같은 동작은 화면 전체에서 같은 단어로 부릅니다.
- 에러는 사과하지 않고, 무엇이 잘못됐고 어떻게 하면 되는지만 씁니다.

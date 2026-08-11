/**
 * 로그인 / 회원가입 / 인증코드 화면의 공통 레이아웃.
 * 좌측에 시간표 그리드 패널, 우측에 폼을 배치합니다.
 */

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI']
const HOURS = ['09', '10', '11', '12', '13', '14', '15']

// [열, 시작행, 길이, 색] — 로그인 화면 장식용 샘플 배치
const BLOCKS = [
  { col: 0, row: 0, span: 2, tone: 'bg-cobalt', delay: 0.05 },
  { col: 2, row: 0, span: 2, tone: 'bg-cobalt', delay: 0.1 },
  { col: 1, row: 2, span: 2, tone: 'bg-mint', delay: 0.16 },
  { col: 2, row: 4, span: 2, tone: 'bg-signal', delay: 0.24 },
  { col: 4, row: 1, span: 2, tone: 'bg-white/10', delay: 0.3 },
  { col: 3, row: 4, span: 2, tone: 'bg-white/10', delay: 0.34 },
]

function Timetable() {
  return (
    <div className="max-w-[440px]">
      {/* 요일 헤더 */}
      <div className="flex">
        <div className="w-9 shrink-0" />
        <div className="grid flex-1 grid-cols-5">
          {DAYS.map((d) => (
            <div key={d} className="pb-2 text-center font-mono text-[10px] text-white/30">
              {d}
            </div>
          ))}
        </div>
      </div>

      <div className="flex border-l border-t border-white/[.05]">
        {/* 시간 축 */}
        <div className="w-9 shrink-0">
          {HOURS.map((h) => (
            <div key={h} className="h-9 pr-2 text-right font-mono text-[9px] leading-9 text-white/25">
              {h}
            </div>
          ))}
        </div>

        {/* 그리드 + 블록 */}
        <div
          className="relative grid flex-1 grid-cols-5"
          style={{ gridTemplateRows: `repeat(${HOURS.length}, 2.25rem)` }}
        >
          {Array.from({ length: DAYS.length * HOURS.length }).map((_, i) => (
            <div key={i} className="border-b border-r border-white/[.05]" />
          ))}

          {BLOCKS.map((b, i) => (
            <div
              key={i}
              className="p-[3px]"
              style={{
                gridColumn: b.col + 1,
                gridRow: `${b.row + 1} / span ${b.span}`,
              }}
            >
              <div
                className={`h-full rounded-block motion-safe:animate-[rise_.5s_cubic-bezier(.2,.7,.3,1)_both] ${b.tone}`}
                style={{ animationDelay: `${b.delay}s` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[1.05fr_1fr]">
      <style>{`@keyframes rise{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`}</style>

      {/* 좌: 시간표 패널 */}
      <aside className="flex flex-col bg-ink px-7 py-9 text-white lg:px-14 lg:py-12">
        <div className="flex items-baseline gap-3">
          <span className="text-[15px] font-extrabold tracking-[-.03em]">수강신청</span>
          <span className="font-mono text-[11px] tracking-tight text-white/35">2026-2학기</span>
        </div>

        <div className="mt-9 flex flex-1 flex-col justify-center lg:mt-14">
          <Timetable />
          <p className="mt-7 text-[15px] leading-relaxed text-white/60 lg:text-base">
            강의를 신청하면 시간표가 자동으로 채워집니다.
            <br className="hidden lg:block" />
            로그인하고 이번 학기 시간표를 확인하세요.
          </p>
        </div>

        <div className="mt-9 hidden items-center gap-5 font-mono text-[10px] text-white/30 lg:flex">
          <span className="flex items-center gap-1.5">
            <i className="inline-block h-2 w-2 rounded-[2px] bg-mint" />
            여석 있음
          </span>
          <span className="flex items-center gap-1.5">
            <i className="inline-block h-2 w-2 rounded-[2px] bg-signal" />
            정원 마감
          </span>
        </div>
      </aside>

      {/* 우: 폼 */}
      <main className="flex items-center bg-paper px-7 py-12 lg:px-16 lg:py-0">
        <div className="mx-auto w-full max-w-[380px]">{children}</div>
      </main>
    </div>
  )
}

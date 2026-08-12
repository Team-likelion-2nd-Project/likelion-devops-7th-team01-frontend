import { useEffect, useState } from 'react';
import { fetchTimetable } from '../api/coursesApi';

// AuthLayout.jsx의 Timetable() 그리드 그리는 방식을 그대로 가져오되,
// 가짜 BLOCKS 데이터 대신 GET /api/timetable의 실제 신청 데이터로 채움.

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
const DAY_LABELS = { MON: '월', TUE: '화', WED: '수', THU: '목', FRI: '금' };
const START_HOUR = 9;
const END_HOUR = 18;
const SLOT_HEIGHT_REM = 1.5; // 30분당 높이(rem)
const HOURS = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i);
const COLORS = ['bg-cobalt', 'bg-mint', 'bg-signal'];

// "09:30" → 시작 시각부터 몇 번째 30분 슬롯인지 (그리드 행 위치 계산용)
function timeToSlot(time) {
  const [h, m] = time.split(':').map(Number);
  return (h - START_HOUR) * 2 + (m === 30 ? 1 : 0);
}

export default function TimetablePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchTimetable().then(setData);
  }, []);

  if (!data) return <p className="text-center py-16 font-mono text-graphite">불러오는 중</p>;

  const totalSlots = (END_HOUR - START_HOUR) * 2;

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="flex items-baseline justify-between mb-6">
        <h1 className="text-[24px] font-bold tracking-[-.02em] text-ink">시간표</h1>
        <span className="font-mono text-[13px] font-semibold text-cobalt">
          총 {data.totalCredit}학점
        </span>
      </div>

      <div className="flex border-l border-t border-chalk">
        {/* 시간축 */}
        <div className="w-12 shrink-0">
          <div style={{ height: '2rem' }} />
          {HOURS.map((h) => (
            <div
              key={h}
              style={{ height: `${SLOT_HEIGHT_REM * 2}rem` }}
              className="pr-2 text-right font-mono text-[11px] text-graphite"
            >
              {h}:00
            </div>
          ))}
        </div>

        {/* 요일 헤더 + 그리드 */}
        <div className="flex-1">
          <div className="grid grid-cols-5" style={{ height: '2rem' }}>
            {DAYS.map((d) => (
              <div
                key={d}
                className="text-center font-mono text-[12px] font-semibold text-graphite border-b border-chalk"
              >
                {DAY_LABELS[d]}
              </div>
            ))}
          </div>

          <div
            className="relative grid grid-cols-5"
            style={{ gridTemplateRows: `repeat(${totalSlots}, ${SLOT_HEIGHT_REM}rem)` }}
          >
            {/* 빈 격자선 */}
            {Array.from({ length: DAYS.length * totalSlots }).map((_, i) => (
              <div key={i} className="border-b border-r border-chalk" />
            ))}

            {/* 실제 신청 강의 블록 */}
            {data.courses.map((c, i) => {
              const col = DAYS.indexOf(c.dayOfWeek);
              if (col === -1) return null;
              const rowStart = timeToSlot(c.startTime);
              const rowEnd = timeToSlot(c.endTime);

              return (
                <div
                  key={c.enrollmentId}
                  className="p-1"
                  style={{ gridColumn: col + 1, gridRow: `${rowStart + 1} / span ${rowEnd - rowStart}` }}
                >
                  <div className={`h-full rounded-block ${COLORS[i % COLORS.length]} text-white p-2 overflow-hidden`}>
                    <p className="text-[12px] font-semibold leading-tight">{c.name}</p>
                    <p className="text-[10px] font-mono opacity-80 mt-0.5">
                      {c.startTime}–{c.endTime}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {data.courses.length === 0 && (
        <p className="text-center text-[14px] text-graphite mt-8">신청한 강의가 없습니다.</p>
      )}
    </div>
  );
}

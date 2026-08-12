const BASE_URL = 'http://localhost:8080';

export async function fetchCourses() {
  const res = await fetch(`${BASE_URL}/api/courses`);
  if (!res.ok) throw new Error('강의 목록을 불러오지 못했습니다');
  return res.json();
}

// 새로 추가 — 내 시간표(=신청 목록) 조회.
// 페이지 로드 시 이 결과로 "이미 신청한 강의" 상태를 미리 채워서,
// 새로고침해도 신청 표시가 사라지지 않게 하는 데 사용함.
export async function fetchTimetable() {
  const res = await fetch(`${BASE_URL}/api/timetable`);
  if (!res.ok) throw new Error('시간표를 불러오지 못했습니다');
  return res.json();
}

export async function enrollCourse(courseId) {
  const res = await fetch(`${BASE_URL}/api/enrollments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ courseId }),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

export async function cancelEnrollment(enrollmentId) {
  const res = await fetch(`${BASE_URL}/api/enrollments/${enrollmentId}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

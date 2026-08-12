// 로그인 여부를 확인하는 함수.
// 차니님이 토큰을 어디에 저장하는지 아직 확인 전이라,
// 우선 localStorage의 'token' 키를 확인하는 걸로 임시로 만들어둠 —
// 정확한 저장 방식 확인되면 이 함수만 고치면 됨.
export function isLoggedIn() {
  return Boolean(localStorage.getItem('token'));
}

import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

// 로그인 안 했으면 /login으로 돌려보냄.
// 감싸인 페이지(children)는 로그인된 사람만 볼 수 있게 됨.
export default function ProtectedRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CoursesPage from './pages/CoursesPage';
import MyEnrollmentsPage from './pages/MyEnrollmentsPage';
import TimetablePage from './pages/TimetablePage';
import NavTabs from './components/NavTabs';
import ProtectedRoute from './components/ProtectedRoute';

function LoginRoute() {
  const navigate = useNavigate();
  return <LoginPage onSignup={() => navigate('/signup')} />;
}

function SignupRoute() {
  const navigate = useNavigate();
  return <SignupPage onLogin={() => navigate('/login')} />;
}

// 로그인 후 화면들은 상단에 NavTabs를 공통으로 깔아줌
function AppLayout({ children }) {
  return (
    <div>
      <NavTabs />
      {children}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/signup" element={<SignupRoute />} />

        <Route path="/courses" element={
          <ProtectedRoute><AppLayout><CoursesPage /></AppLayout></ProtectedRoute>
        } />
        <Route path="/my-enrollments" element={
          <ProtectedRoute><AppLayout><MyEnrollmentsPage /></AppLayout></ProtectedRoute>
        } />
        <Route path="/timetable" element={
          <ProtectedRoute><AppLayout><TimetablePage /></AppLayout></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

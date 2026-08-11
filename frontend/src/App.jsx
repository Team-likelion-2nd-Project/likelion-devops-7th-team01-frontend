import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

export default function App() {
  const [view, setView] = useState('login')
  return view === 'login'
    ? <LoginPage onSignup={() => setView('signup')} />
    : <SignupPage onLogin={() => setView('login')} />
}

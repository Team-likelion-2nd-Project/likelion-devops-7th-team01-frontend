import { useState } from 'react'
import AuthLayout from '../components/AuthLayout'
import { Button, Field, Input, TextLink } from '../components/ui'

/**
 * 로그인 화면.
 * Cognito 연동 전 단계 — onSubmit 안의 TODO 자리에 인증 호출을 붙이면 됩니다.
 */
export default function LoginPage({ onSignup, onForgotPassword }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  const canSubmit = email.trim() !== '' && password !== '' && !pending

  async function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return

    setError('')
    setPending(true)
    try {
      // TODO: Cognito 로그인 호출 (M6-1 완료 후 연결)
      // await signIn({ username: email, password })
    } catch {
      setError('이메일 또는 비밀번호를 확인해 주세요.')
    } finally {
      setPending(false)
    }
  }

  return (
    <AuthLayout>
      <h1 className="text-[30px] font-extrabold tracking-[-.035em] text-ink">로그인</h1>
      <p className="mt-2 text-[14px] text-graphite">학교 이메일로 로그인하세요.</p>

      <form onSubmit={handleSubmit} className="mt-9">
        <div className="space-y-5">
          <Field label="이메일" htmlFor="email" error={error}>
            <Input
              id="email"
              type="email"
              autoComplete="username"
              placeholder="student@univ.ac.kr"
              value={email}
              invalid={Boolean(error)}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>

          <Field
            label="비밀번호"
            htmlFor="password"
            action={
              <button
                type="button"
                onClick={onForgotPassword}
                className="rounded text-[12px] text-graphite underline underline-offset-2 hover:text-ink"
              >
                비밀번호 찾기
              </button>
            }
          >
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              invalid={Boolean(error)}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
        </div>

        <Button type="submit" full disabled={!canSubmit} className="mt-7">
          {pending ? '로그인 중' : '로그인'}
        </Button>
      </form>

      <p className="mt-6 text-center text-[14px] text-graphite">
        계정이 없으신가요? <TextLink onClick={onSignup}>회원가입</TextLink>
      </p>
    </AuthLayout>
  )
}

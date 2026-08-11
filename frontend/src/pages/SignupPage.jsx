import { useState } from 'react'
import AuthLayout from '../components/AuthLayout'
import { Button, Field, Input, TextLink } from '../components/ui'

const PASSWORD_RULE = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

/**
 * 회원가입 화면.
 * Cognito는 가입 후 이메일 인증 코드를 요구하므로 2단계로 구성했습니다.
 *   step 'form'   — 가입 정보 입력
 *   step 'verify' — 6자리 코드 입력
 */
export default function SignupPage({ onLogin, onComplete }) {
  const [step, setStep] = useState('form')
  const [form, setForm] = useState({
    email: '',
    name: '',
    studentNo: '',
    password: '',
    passwordConfirm: '',
  })
  const [code, setCode] = useState('')
  const [pending, setPending] = useState(false)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const passwordError =
    form.password && !PASSWORD_RULE.test(form.password)
      ? '영문·숫자·특수문자를 모두 포함해 8자 이상 입력하세요.'
      : ''

  const confirmError =
    form.passwordConfirm && form.password !== form.passwordConfirm
      ? '비밀번호가 일치하지 않습니다.'
      : ''

  const canSubmitForm =
    form.email.trim() &&
    form.name.trim() &&
    form.studentNo.trim() &&
    PASSWORD_RULE.test(form.password) &&
    form.password === form.passwordConfirm &&
    !pending

  async function handleSignup(e) {
    e.preventDefault()
    if (!canSubmitForm) return

    setPending(true)
    try {
      // TODO: Cognito 가입 호출 (M6-1 완료 후 연결)
      // await signUp({ username: form.email, password: form.password, attributes: {...} })
      setStep('verify')
    } finally {
      setPending(false)
    }
  }

  async function handleVerify(e) {
    e.preventDefault()
    if (code.length !== 6 || pending) return

    setPending(true)
    try {
      // TODO: Cognito 인증 코드 확인 호출
      // await confirmSignUp({ username: form.email, confirmationCode: code })
      onComplete?.()
    } finally {
      setPending(false)
    }
  }

  /* ── 2단계: 인증 코드 ─────────────────────────────── */
  if (step === 'verify') {
    return (
      <AuthLayout>
        <h1 className="text-[30px] font-extrabold tracking-[-.035em] text-ink">인증 코드 입력</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-graphite">
          <span className="font-medium text-ink">{form.email}</span> 로 보낸
          <br />
          6자리 코드를 입력하세요.
        </p>

        <form onSubmit={handleVerify}>
          <label htmlFor="code" className="sr-only">
            인증 코드
          </label>
          <Input
            id="code"
            mono
            inputMode="numeric"
            maxLength={6}
            autoComplete="one-time-code"
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            className="mt-9 h-14 text-center text-[26px] tracking-[.4em] placeholder:text-graphite/25"
          />

          <Button type="submit" full disabled={code.length !== 6 || pending} className="mt-7">
            {pending ? '확인 중' : '가입 완료'}
          </Button>
        </form>

        <p className="mt-6 text-center text-[14px] text-graphite">
          코드가 오지 않았나요? <TextLink>다시 보내기</TextLink>
        </p>
      </AuthLayout>
    )
  }

  /* ── 1단계: 가입 정보 ─────────────────────────────── */
  return (
    <AuthLayout>
      <h1 className="text-[30px] font-extrabold tracking-[-.035em] text-ink">회원가입</h1>
      <p className="mt-2 text-[14px] text-graphite">가입 후 이메일로 인증 코드를 보내드립니다.</p>

      <form onSubmit={handleSignup} className="mt-9">
        <div className="space-y-5">
          <Field label="이메일" htmlFor="email">
            <Input
              id="email"
              type="email"
              autoComplete="username"
              placeholder="student@univ.ac.kr"
              value={form.email}
              onChange={set('email')}
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="이름" htmlFor="name">
              <Input id="name" autoComplete="name" placeholder="홍길동" value={form.name} onChange={set('name')} />
            </Field>

            <Field label="학번" htmlFor="studentNo">
              <Input
                id="studentNo"
                mono
                inputMode="numeric"
                placeholder="20261234"
                value={form.studentNo}
                onChange={(e) => setForm((f) => ({ ...f, studentNo: e.target.value.replace(/\D/g, '') }))}
              />
            </Field>
          </div>

          <Field
            label="비밀번호"
            htmlFor="password"
            hint="영문·숫자·특수문자 포함 8자 이상"
            error={passwordError}
          >
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={form.password}
              invalid={Boolean(passwordError)}
              onChange={set('password')}
            />
          </Field>

          <Field label="비밀번호 확인" htmlFor="passwordConfirm" error={confirmError}>
            <Input
              id="passwordConfirm"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={form.passwordConfirm}
              invalid={Boolean(confirmError)}
              onChange={set('passwordConfirm')}
            />
          </Field>
        </div>

        <Button type="submit" full disabled={!canSubmitForm} className="mt-7">
          {pending ? '전송 중' : '인증 코드 받기'}
        </Button>
      </form>

      <p className="mt-6 text-center text-[14px] text-graphite">
        이미 계정이 있으신가요? <TextLink onClick={onLogin}>로그인</TextLink>
      </p>
    </AuthLayout>
  )
}

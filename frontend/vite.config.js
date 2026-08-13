import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // amazon-cognito-identity-js가 Node.js 환경의 'global' 전역 변수를
  // 참조하는데, 브라우저에는 이게 없어서 에러가 남.
  // 빌드 시 코드 안의 'global'을 브라우저의 'window'로 치환해서 해결.
  define: {
    global: 'window',
  },
})

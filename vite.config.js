import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  rules: {
    indent: ['error', 2], // 들여쓰기 스타일 설정 (2칸 들여쓰기)

    'no-unused-vars': 'off', // 사용하지 않는 변수 경고 끄기
  },
});

/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors') // 1. tailwindcss에서 기본 색상을 가져옵니다.

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // 프로젝트의 파일 경로에 맞게 수정해주세요.
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        // 2. 여기에 amber 색상을 추가합니다.
        // 이렇게 하면 text-amber-500, bg-amber-200 등 모든 amber 색상을 사용할 수 있게 됩니다.
        amber: colors.amber,

        // 기존에 사용하시던 다른 커스텀 색상들은 그대로 유지하면 됩니다.
        primary: '#3563e9',
        // ...
      },
    },
  },
  plugins: [],
}

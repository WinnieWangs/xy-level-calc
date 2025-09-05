/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1', // 主色调：靛蓝色
        secondary: '#10b981', // 辅助色：绿色
        accent: '#f59e0b', // 强调色：橙色
        dark: '#1e293b',
        light: '#f8fafc'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

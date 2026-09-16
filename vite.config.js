import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/*
 * GitHub Pages отдаёт проектный сайт по пути /<имя-репозитория>/.
 * Если Vite соберёт ассеты с другим base (например, /gar-archives/ при
 * репозитории tenkara), браузер получит 404 на JS и CSS — страница
 * останется белой. Поэтому base вычисляем из GITHUB_REPOSITORY, которое
 * Actions отдаёт в виде "владелец/имя": переименуешь репо — сборка
 * подхватит сама.
 *
 * Свой путь (или '/' для кастомного домена) можно задать переменной
 * VITE_BASE при сборке.
 */
const normalize = p => (p === '/' || p === '' ? '/' : `/${String(p).replace(/^\/+|\/+$/g, '')}/`)
const repoName = process.env.GITHUB_REPOSITORY?.split('/').pop()
const base = normalize(process.env.VITE_BASE || repoName || 'tenkara')

export default defineConfig({
  base,
  plugins: [react()],
  build: { outDir: 'dist', emptyOutDir: true },
  server: { host: true, allowedHosts: true },
  preview: { host: true, allowedHosts: true },
})

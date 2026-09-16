# GAR Archives — личное дело капрала «Тенкара»

Одностраничное приложение на React + Vite, выкладывается на GitHub Pages
(<https://10kara.github.io/tenkara/>).

## Локально

```bash
npm install
npm run dev        # http://localhost:5173/tenkara/
npm run build      # сборка в dist/
npm run preview    # предпросмотр собранного dist/
```

## GitHub Pages и base-путь

GitHub Pages отдаёт проектный сайт по пути `/<имя-репозитория>/`, и это главная
причина «белой страницы»: если `base` в `vite.config.js` не совпадает с этим
путём, браузер получает 404 на JS и CSS.

`base` больше не нужно править руками — он вычисляется из `GITHUB_REPOSITORY`
на сборке в Actions. Варианты, если путь всё-таки нужен другой:

| случай                      | что сделать                                        |
| --------------------------- | -------------------------------------------------- |
| репозиторий переименован    | ничего, base подхватится сам                        |
| кастомный домен             | в Secrets/Variables добавить `VITE_BASE=/`          |
| другой путь вручную         | `VITE_BASE=/my-path/` при сборке                    |

## public/ и картинки

Всё из `public/` копируется в корень сайта как есть; `public/.nojekyll` нужен
на случай переключения источника Pages на ветку — иначе Jekyll вырежет часть
файлов.

Приложение берёт изображения из `IMG = base + 'img/'`, то есть из
`public/img/`: `tenkara-portrait.jpg`, `tenkara-record.jpg`,
`ch1-kamino.jpg`, `ch2-anaxis.jpg`, `ch3-69th.jpg`, `ch4-akulorum.jpg`.
Файлов в репозитории нет, поэтому без Supabase вместо картинок показывается
заглушка «URL ИЗОБРАЖЕНИЯ НЕДОСТУПЕН» — просто положите их в `public/img/`.

## Supabase (необязательно)

Данные читаются из Supabase, а если ключей нет — из локального фолбэка в
`src/main.jsx`. Ключи задаются как секреты репозитория и подшиваются в сборку
(значит, после их добавления нужен повторный Deploy):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY` или `VITE_SUPABASE_ANON_KEY`
- `VITE_SUPABASE_STORAGE_BUCKET` (по умолчанию `archive`)
- `VITE_ADMIN_EMAIL` (опционально)

## Деплой

`.github/workflows/deploy.yml` собирается при пуше в `main` (или кнопкой
Run workflow) и публикует `dist/` через `actions/deploy-pages`. Перед
публикацией шаг *Check asset base* сверяет пути ассетов с путём Pages — если
что-то разъехалось, деплой падает, а не выдаёт пустую страницу.

# Модуль 5: Настройка проекта для вайбкодинга

**Версия плана:** май 2026
**Стек:** Next.js 16 + React 19, TypeScript, Tailwind 4, Supabase + `@supabase/ssr`, OpenAI gpt-4o-mini, Vercel
**Сквозной пример:** MoodTracker — мини-сайт ежедневного трекинга настроения с AI-инсайтами
**Целевая аудитория:** новички, которые впервые открывают терминал и не знают, что такое Next.js

---

## Урок 5.1: Создаём первый Next.js проект

**Продолжительность:** 30 минут

### Цели урока:
- Договориться с ИИ о том, что строим (план до кода)
- Создать Next.js 16 проект через `create-next-app` с recommended defaults
- Понять структуру папок (что важно, что не нужно трогать)
- Запустить сайт у себя на ноутбуке

### Содержание:

1. **Сначала договариваемся с ИИ (7 мин)**
   - Зачем план: меньше переделок потом
   - Универсальный шаблон промпта (см. урок)
   - Конкретный пример — план MoodTracker
   - Сохраняем разговор в `plan.md` (пригодится в уроках 5.3 и 5.4)

2. **Что такое Next.js простыми словами (3 мин)**
   - «Коробка с готовыми инструментами для сайтов»
   - Дружит с ИИ — Cursor и Claude знают наизусть
   - В чём прелесть Next.js 16 (React Compiler, AGENTS.md по умолчанию)
   - Опциональный блок «Если встретите эти термины»: React, App Router, Server Components, TypeScript

3. **Создание проекта (10 мин)**
   ```bash
   npx create-next-app@latest mood-tracker
   ```

   **Главный вопрос:** «Would you like to use the recommended Next.js defaults?» → **Yes**.
   Это включает: TypeScript, ESLint, Tailwind CSS, App Router, AGENTS.md.

   Если customize — рекомендованные ответы:
   - TypeScript: Yes
   - Linter: ESLint
   - React Compiler: Yes
   - Tailwind CSS: Yes
   - src/ directory: Yes
   - App Router: Yes
   - Customize import alias: Yes (`@/*`)
   - Include AGENTS.md: Yes

4. **Структура проекта (7 мин)**
   - Главное правило: 95% работы — в `src/app/`
   - `page.tsx` vs `layout.tsx` (с примером кода)
   - Что такое AGENTS.md (новинка Next.js 16)
   - Опциональный блок: npm, npx, package.json, зависимости

5. **Запуск (3 мин)**
   ```bash
   cd mood-tracker
   npm run dev
   ```
   Hot reload демонстрация — поменять текст в `page.tsx`, увидеть изменения.

### Практическая работа:
Создать Next.js 16 проект, открыть `src/app/page.tsx`, поменять заголовок и убедиться, что hot reload работает.

---

## Урок 5.2: Настраиваем Cursor

**Продолжительность:** 30 минут

### Цели урока:
- Понять, чем Cursor отличается от обычного редактора
- Создать правила проекта в `.cursor/rules/project.mdc`
- Освоить Tab (автодополнение) и Composer (диалог)
- Включить Memories (долгая память между сессиями)

### Содержание:

1. **Что такое Cursor (3 мин)**
   - Tab — допишет за вас (как T9, только умнее)
   - Composer (`⌘+I`) — общается, создаёт файлы
   - Memories — помнит ваши предпочтения
   - Background Agent — работает в фоне

2. **Правила проекта в `.cursor/rules/` (10 мин)**

   ```bash
   mkdir -p .cursor/rules
   touch .cursor/rules/project.mdc
   ```

   Внутри `project.mdc`:
   - Frontmatter с `alwaysApply: true`
   - Контекст (1–2 строки)
   - Стек (Next.js 16, TypeScript, Tailwind 4, shadcn/ui, Supabase, Vercel)
   - Стиль кода
   - Запреты (не Pages Router, не any в TS, не хардкодить секреты)

   **Старый формат `.cursorrules` (одинокий файл)** — упомянуть для совместимости, но новичкам сразу учить новый.

3. **Tab vs Composer (10 мин)**
   - Tab — для маленьких подсказок
   - Composer — для больших задач (создавать файлы, менять несколько файлов, запускать команды)
   - Чат (`⌘+L`) — только текстовые ответы, файлы не меняет
   - Пример хорошего промпта в Composer

4. **Memories (5 мин)**
   - Cursor 1.0+ запоминает ваши предпочтения между разговорами
   - Где включить (Settings → Cursor → Memories)
   - Как добавить вручную (через Composer)
   - Memories vs правила проекта — что есть что

5. **Полезные настройки (2 мин)**
   - Модель: Claude Sonnet 4.6 по умолчанию
   - Codebase Indexing: ON
   - Auto-Run: первое время — OFF, потом включить
   - AGENTS.md — Cursor читает автоматически, не нужно дублировать

### Практическая работа:
Создать `.cursor/rules/project.mdc` с правилами под MoodTracker. Проверить через Composer: «Какой стек у этого проекта?»

---

## Урок 5.3: CLAUDE.md и AGENTS.md

**Продолжительность:** 30 минут

### Цели урока:
- Понять разницу между AGENTS.md, CLAUDE.md и `.cursor/rules/`
- Написать AGENTS.md — единый файл-инструкцию для всех ИИ
- Запустить Claude Code в проекте и проверить контекст
- Понять, как обновлять файл по мере роста проекта

### Содержание:

1. **Зачем нужен файл-инструкция (5 мин)**
   - Без него каждый раз начинаете с «у меня Next.js 16, TypeScript…»
   - Решение — файл в корне, ИИ читает автоматически
   - Три «диалекта»: AGENTS.md (универсальный), CLAUDE.md (только Claude Code), `.cursor/rules/` (только Cursor)
   - **Рекомендация для новичков:** один AGENTS.md

2. **Пишем AGENTS.md (10 мин)**

   Разделы:
   - О проекте (1–2 предложения)
   - Технический стек (с конкретными версиями)
   - Структура папок (дерево, 5–10 строк)
   - Правила (5–10 пунктов)
   - Чего НЕ делать (запреты)

   Полный пример для MoodTracker — см. урок.

3. **Запускаем Claude Code (10 мин)**

   ```bash
   npm install -g @anthropic-ai/claude-code
   cd mood-tracker
   claude
   ```

   Тестовые промпты:
   - «Покажи структуру проекта и расскажи, что уже сделано»
   - «Создай страницу /login с формой email и кнопкой Войти»

   Полезные команды: `/clear`, `/help`, `/init`.

4. **Поддерживаем файл живым (5 мин)**
   - Обновлять при каждой новой библиотеке/папке/правиле
   - Удобный приём — попросить ИИ обновить файл
   - **НЕ** клеить секреты — файл коммитится в Git

### Практическая работа:
Написать AGENTS.md для MoodTracker. Запустить `claude` и проверить, что контекст понят.

---

## Урок 5.4: Task Master — превращаем идею в задачи

**Продолжительность:** 45 минут

### Цели урока:
- Понять, зачем «менеджер задач для ИИ» поверх Cursor и Claude Code
- Установить Task Master и подключить модели (без обязательного Perplexity)
- Написать PRD для MoodTracker
- Сгенерировать список задач и подзадач из PRD
- Освоить ежедневный цикл: `next → show → set-status done`

### Содержание:

1. **Зачем нужен Task Master (5 мин)**
   - Слепое пятно Cursor/Claude — не помнят, что сделано
   - Task Master хранит план, статусы, заметки
   - Связка с AGENTS.md (правила) и daily-loop (что делать дальше)

2. **Установка (5 мин)**
   ```bash
   npm install -g task-master-ai
   cd mood-tracker
   task-master init
   ```

3. **Настройка моделей без Perplexity (5 мин)**
   ```bash
   task-master models --setup
   ```
   - main: Claude Sonnet 4.6 или GPT-5
   - research: пропустить или взять main
   - fallback: gpt-4o-mini

   Ключи в `.env`: `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`.

4. **PRD для MoodTracker (10 мин)**

   Открываем `.taskmaster/docs/prd.txt`, пишем:
   - Описание проекта
   - Технический стек (Next.js 16, Supabase, OpenAI, Vercel)
   - 5 главных функций (auth, запись настроения, дашборд, AI-инсайты, настройки)
   - Структура БД (profiles, moods, insights)
   - План разработки (8 этапов)

   Альтернатива: попросить Claude Code сгенерировать PRD.

5. **parse-prd → задачи (5 мин)**
   ```bash
   task-master parse-prd .taskmaster/docs/prd.txt
   task-master list
   ```
   Получится 8–10 задач с приоритетами и зависимостями.

6. **analyze-complexity → expand (5 мин)**
   ```bash
   task-master analyze-complexity
   task-master complexity-report
   task-master expand --all
   ```
   Большие задачи → подзадачи (4.1, 4.2, …). Одна подзадача = один промпт в Cursor.

7. **Daily loop (10 мин)**
   ```bash
   task-master next                                        # что делать
   task-master show 4.1                                    # детали
   task-master set-status --id=4.1 --status=in-progress
   # ...реализуем через Cursor/Claude...
   task-master update-subtask --id=4.1 --prompt="..."      # лог прогресса
   task-master set-status --id=4.1 --status=done
   ```

8. **MCP-сервер (опционально)**

   `.mcp.json` подключает task-master-ai к Claude Code → внутри `claude` можно говорить *«покажи следующую задачу»*, *«отметь 4.1 done»*.

### Практическая работа:
Написать PRD MoodTracker, выполнить `parse-prd`, разбить большие задачи через `expand`, пройти один полный цикл `next → show → set-status done`.

### Частые проблемы:
- **Команда `task-master` не найдена** — установить с `-g` или использовать `npx task-master-ai`
- **`parse-prd` падает** — проверить ключи в `.env` и доступ через `task-master models`
- **Не нравятся сгенерированные задачи** — отредактировать PRD и `parse-prd --append` или `--force`

---

## Урок 5.5: Деплой на Vercel

**Продолжительность:** 25 минут

### Цели урока:
- Понять, что такое деплой
- Загрузить код в GitHub (приватный репозиторий)
- Подключить GitHub к Vercel — автодеплой по push
- Понять переменные окружения

### Содержание:

1. **Что такое деплой (3 мин)**
   - Сейчас сайт только на ноутбуке (`localhost:3000`)
   - Деплой = переезд на сервер 24/7
   - Vercel сделали Next.js, у них всё «из коробки»
   - Бесплатный Hobby: 100 ГБ трафика, безлимит сайтов

2. **GitHub (7 мин)**
   - Что такое Git, commit, push (опциональный блок терминов)
   - Установка `gh` CLI
   ```bash
   gh auth login
   git init && git add . && git commit -m "Первый коммит"
   gh repo create mood-tracker --private --source=. --push
   ```

3. **Подключение Vercel (10 мин)**
   - Sign Up через GitHub
   - Add New → Project → Import репозиторий → Deploy
   - Через 30–60 секунд — ссылка `*.vercel.app`

4. **Автодеплой (3 мин)**
   - Каждый `git push` → автоматическая пересборка
   - Preview-деплои для веток (отдельный URL)
   - Демо: поменять текст, push, увидеть деплой

5. **Переменные окружения (2 мин)**
   - Settings → Environment Variables в Vercel
   - Локально — `.env.local` (в `.gitignore`)
   - Префикс `NEXT_PUBLIC_` делает переменную видимой в браузере (опасно для секретов!)
   - `vercel env pull .env.local` — забрать переменные с Vercel

### Практическая работа:
Залить проект на GitHub, подключить к Vercel, увидеть автодеплой при push.

---

## Урок 5.6: Промпт-инженеринг

**Продолжительность:** 35 минут

### Цели урока:
- Освоить формулу промпта (контекст + задача + требования + формат)
- Получить шаблоны на 5 типичных задач
- Использовать Plan mode в Claude Code для крупных задач
- Собрать свой `prompts.md`

### Содержание:

1. **Формула промпта (10 мин)**
   - Контекст / Задача / Требования / Формат
   - Сравнение «плохой промпт» vs «хороший промпт» на одной задаче
   - С AGENTS.md «Контекст» можно сократить — ИИ уже знает стек

2. **5 шаблонов промптов (15 мин)**
   - Создать компонент
   - Создать API-роут
   - Исправить баг
   - Отрефакторить кусок
   - Объяснить кусок кода

3. **Plan mode (5 мин)**
   - Claude Code: `Shift+Tab` — Plan mode (план без правки файлов)
   - Cursor: добавить в промпт «сначала покажи план»
   - Дешевле исправить план, чем код

4. **7 правил промптинга (3 мин)**
   - Один промпт = одна задача
   - Прикреплять файлы (`@filename` в Cursor)
   - Запреты сильнее разрешений
   - Читать сгенерированный код
   - Сохранять успешные промпты
   - Итерировать
   - Новая задача = новая сессия (`/clear`)

5. **prompts.md (2 мин)**
   - Создать в корне проекта
   - Структура: общие шаблоны + свои промпты для проекта
   - Пример для MoodTracker — генерация AI-инсайта, добавление shadcn-компонента

### Практическая работа:
Создать `prompts.md` с шаблонами + 1 свой промпт для MoodTracker.

---

## Урок 5.7: Подключаем Supabase и OpenAI

**Продолжительность:** 30 минут

### Цели урока:
- Создать проект Supabase (БД + Auth)
- Подключить через `@supabase/ssr` (новый стандарт 2024+)
- Получить ключ OpenAI и подключить gpt-4o-mini
- Сделать health check

### Содержание:

1. **Supabase проект (10 мин)**
   - Регистрация через GitHub
   - New project → имя `mood-tracker`, регион ближайший
   - Project Settings → API → забрать ключи
   - **Новые ключи 2026:** `sb_publishable_*` и `sb_secret_*` (старые anon/service_role работают до конца 2026)
   - В `.env.local`:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (= publishable key)
     - `SUPABASE_SERVICE_ROLE_KEY` (= secret key, **только сервер!**)
   - Не забыть добавить в Vercel

2. **`@supabase/ssr` (10 мин)**

   ```bash
   npm install @supabase/supabase-js @supabase/ssr
   ```

   - Старый `@supabase/auth-helpers-nextjs` deprecated — не использовать!
   - Клиент для браузера: `src/lib/supabase/client.ts` через `createBrowserClient`
   - Клиент для сервера: `src/lib/supabase/server.ts` через `createServerClient` + `cookies()`
   - Middleware: `src/middleware.ts` для обновления сессии (типовой код, копируется как есть)

3. **OpenAI (5 мин)**
   - Регистрация на platform.openai.com, депозит $5+
   - Создать API key, в `.env.local` как `OPENAI_API_KEY`
   - `npm install openai`
   - `src/lib/openai.ts` — простой клиент
   - Какие модели на май 2026: gpt-4o-mini (стандарт), gpt-5 (сложные задачи), o4-mini (рассуждения)

4. **Health check (5 мин)**
   - `src/app/api/health/route.ts`
   - Проверяет Supabase (через `getSession`) и OpenAI (через `models.list`)
   - Возвращает `{ supabase: true, openai: true, timestamp }` со статусом 200/503
   - Бонус: Vercel Cron Jobs пингует endpoint каждые 5 минут

### Практическая работа:
Подключить Supabase через `@supabase/ssr`, подключить OpenAI, создать `/api/health` и убедиться, что возвращает 200.

---

## Урок 5.8: Готовность к вайбкодингу

**Продолжительность:** 25 минут

### Цели урока:
- Пройти полный чек-лист модуля
- Боевое тестирование Cursor и Claude Code
- Понять «дневной ритуал»
- Узнать, что в следующих модулях

### Содержание:

1. **Полный чек-лист (10 мин)**
   - Проект и инструменты (Node 20+, Next.js 16, Cursor, Claude Code, Task Master)
   - ИИ-конфигурация (AGENTS.md, .cursor/rules/, PRD, tasks, prompts.md)
   - Деплой и интеграции (GitHub, Vercel, Supabase SSR, OpenAI, /api/health)

2. **Тестирование Cursor (5 мин)**
   - Тестовый промпт: компонент `<Greeting />` с shadcn/ui Card
   - Что проверяем: TypeScript, shadcn/ui, соблюдение правил, подключение на главную

3. **Тестирование Claude Code (5 мин)**
   - В сессии `claude`:
     - «Покажи структуру проекта»
     - «Создай функцию formatDate в src/lib/utils.ts»
     - «Какая следующая задача из Task Master?»

4. **Дневной ритуал (3 мин)**
   - 7 шагов: cd → npm run dev → task-master next → работа в Cursor/Claude → update-subtask → set-status done → push

5. **Что дальше (2 мин)**
   - Модуль 6: Backend для вайбкодера
   - Модуль 7: Аутентификация (магик-линк)
   - Модуль 8: База данных (таблицы + RLS)
   - Модуль 9: Фронтенд (форма + дашборд)
   - Модуль 10: API и платежи (AI-инсайты)

### Практическая работа:
Пройти полный чек-лист, провести оба теста, убедиться, что всё работает.

---

## Итоговый проект модуля

**Задание:** Настроенный «вайб-стэнд» MoodTracker — готовый к разработке в модулях 6–10.

### Что должно быть готово:

1. **Проект и деплой**
   - Next.js 16 проект `mood-tracker`, работает локально и на Vercel
   - Код в приватном репозитории GitHub
   - Автодеплой по `git push`

2. **ИИ-конфигурация**
   - `AGENTS.md` в корне с описанием стека и правил
   - `.cursor/rules/project.mdc` с `alwaysApply: true`
   - `prompts.md` с 5+ шаблонами + 1 свой промпт

3. **Task Master**
   - PRD MoodTracker в `.taskmaster/docs/prd.txt`
   - 8–10 задач после `parse-prd`, 4–5 из них с подзадачами после `expand`

4. **Интеграции**
   - `@supabase/ssr` подключён (browser + server клиенты + middleware)
   - OpenAI клиент в `src/lib/openai.ts`
   - `/api/health` возвращает `supabase: true, openai: true`
   - Все переменные окружения добавлены в Vercel (Production)

### Критерии оценки (100 баллов):

- 20 — Next.js 16 + деплой Vercel
- 20 — AGENTS.md и Cursor rules
- 20 — Task Master (PRD + задачи + expand)
- 15 — prompts.md (шаблоны + свой промпт)
- 15 — Supabase SSR + OpenAI + /api/health
- 10 — Прохождение дневного ритуала

---

## Полезные ресурсы

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Cursor Documentation](https://cursor.com/docs)
- [Claude Code Guide](https://docs.anthropic.com/claude-code)
- [Task Master AI на npm](https://www.npmjs.com/package/task-master-ai)
- [shadcn/ui](https://ui.shadcn.com)
- [Supabase SSR Docs](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [AGENTS.md spec (универсальный стандарт 2026)](https://agents.md)

## Что получают студенты после модуля

- Настроенный проект, готовый к разработке функционала с ИИ
- Один файл `AGENTS.md`, который понимают Cursor, Claude Code, Codex и другие ИИ
- Сгенерированный план разработки (8–10 задач + подзадачи)
- Личная библиотека промптов
- Привычка дневного ритуала: что делать каждое утро

# Модуль 5: Настройка проекта для вайбкодинга

## Урок 5.1: Создание Next.js проекта

**Продолжительность:** 25 минут

### Цели урока:
- Создать новый Next.js проект с помощью create-next-app
- Понять структуру файлов и папок проекта
- Запустить проект локально

### Содержание:

1. **Создание проекта (10 мин)**
   ```bash
   npx create-next-app@latest my-saas-app
   ```

   **Параметры при создании:**
   - TypeScript: Yes
   - ESLint: Yes
   - Tailwind CSS: Yes
   - src/ directory: Yes
   - App Router: Yes
   - Import alias: @/*

2. **Структура проекта (10 мин)**
   ```
   my-saas-app/
   ├── src/
   │   ├── app/
   │   │   ├── layout.tsx
   │   │   ├── page.tsx
   │   │   └── globals.css
   │   └── components/
   ├── public/
   ├── package.json
   └── next.config.js
   ```

3. **Запуск проекта (5 мин)**
   ```bash
   cd my-saas-app
   npm run dev
   ```
   - Открыть http://localhost:3000
   - Hot Reload демонстрация

### Практическая работа:
Создать Next.js проект и убедиться, что он запускается локально.

---

## Урок 5.2: Настройка Cursor

**Продолжительность:** 30 минут

### Цели урока:
- Создать .cursorrules файл для проекта
- Настроить Composer Rules
- Понять best practices для работы с Cursor

### Содержание:

1. **Что такое .cursorrules (5 мин)**
   - Файл настроек для ИИ-помощника в Cursor
   - Определяет контекст и правила генерации кода
   - Позволяет адаптировать ИИ под проект

2. **Создание .cursorrules (15 мин)**
   ```markdown
   # Project Context
   This is a Next.js 14+ SaaS application using:
   - TypeScript with strict mode
   - Tailwind CSS for styling
   - shadcn/ui components
   - Supabase for database and auth
   - App Router (not Pages Router)

   # Code Style
   - Use functional components with TypeScript
   - Prefer server components by default
   - Use 'use client' only when necessary
   - Follow Next.js 14 conventions

   # File Structure
   - Components in src/components/
   - API routes in src/app/api/
   - Utilities in src/lib/
   - Types in src/types/

   # Important Rules
   - Always handle errors properly
   - Use environment variables for secrets
   - Write type-safe code
   - Keep components small and focused
   ```

3. **Composer Rules (10 мин)**
   - Настройка правил для Composer
   - Шаблоны для типичных задач
   - Интеграция с проектом

### Практическая работа:
Создать .cursorrules файл, настроенный под ваш проект.

---

## Урок 5.3: Настройка CLAUDE.md

**Продолжительность:** 30 минут

### Цели урока:
- Понять назначение CLAUDE.md
- Создать конфигурацию для Claude Code
- Настроить правила проекта для ИИ-ассистента

### Содержание:

1. **Что такое CLAUDE.md (5 мин)**
   - Файл инструкций для Claude Code CLI
   - Автоматически загружается при работе с проектом
   - Определяет контекст, правила и предпочтения

2. **Структура CLAUDE.md (15 мин)**
   ```markdown
   # Project: My SaaS App

   ## Tech Stack
   - Next.js 14 with App Router
   - TypeScript (strict mode)
   - Tailwind CSS + shadcn/ui
   - Supabase (auth, database)
   - Vercel (hosting)

   ## Project Structure
   src/
   ├── app/          # Next.js App Router pages
   ├── components/   # React components
   │   └── ui/       # shadcn/ui components
   ├── lib/          # Utilities and clients
   └── types/        # TypeScript types

   ## Coding Guidelines
   - Use Server Components by default
   - Add 'use client' only for interactivity
   - Handle all errors with try/catch
   - Use TypeScript strict mode
   - Follow existing code patterns

   ## Commands
   - `npm run dev` - Start development server
   - `npm run build` - Production build
   - `npm run lint` - Run ESLint

   ## Important Files
   - src/lib/supabase.ts - Supabase client
   - src/lib/openai.ts - OpenAI client
   - .env.local - Environment variables (DO NOT commit)
   ```

3. **Best Practices (10 мин)**
   - Что включать в CLAUDE.md
   - Как обновлять по мере развития проекта
   - Примеры специфичных правил

### Практическая работа:
Создать CLAUDE.md файл с полной конфигурацией проекта.

---

## Урок 5.4: Быстрый деплой на Vercel

**Продолжительность:** 20 минут

### Цели урока:
- Загрузить проект на GitHub
- Задеплоить на Vercel
- Настроить environment variables

### Содержание:

1. **Создание репозитория (5 мин)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   gh repo create my-saas-app --public --source=. --push
   ```

2. **Деплой на Vercel (10 мин)**
   - Войти на vercel.com
   - "Add New Project"
   - Импортировать репозиторий
   - Deploy

3. **Environment Variables (5 мин)**
   - Project Settings > Environment Variables
   - Добавить ключи для production
   - Использовать `vercel env pull` локально

### Практическая работа:
Задеплоить проект на Vercel.

---

## Урок 5.5: Промпт-инженеринг для вайбкодинга

**Продолжительность:** 35 минут

### Цели урока:
- Научиться писать эффективные промпты
- Создать шаблоны для типичных задач
- Понять best practices вайбкодинга

### Содержание:

1. **Основы промптов (10 мин)**

   **Структура хорошего промпта:**
   - Контекст (что за проект)
   - Задача (что нужно сделать)
   - Ограничения (какие требования)
   - Примеры (если нужно)

   **Пример:**
   ```
   Создай компонент карточки пользователя.

   Требования:
   - Использовать shadcn/ui Card
   - Показывать: имя, email, аватар
   - Добавить кнопку "Редактировать"
   - TypeScript с интерфейсом User
   ```

2. **Шаблоны промптов (15 мин)**

   **Для компонентов:**
   ```
   Создай [тип компонента] для [назначение].

   Стек: Next.js, TypeScript, Tailwind, shadcn/ui

   Функциональность:
   - [требование 1]
   - [требование 2]

   Используй существующие компоненты из src/components/ui/
   ```

   **Для API routes:**
   ```
   Создай API route для [действие].

   Endpoint: /api/[path]
   Метод: [GET/POST/PUT/DELETE]

   Входные данные: [описание]
   Ответ: [формат]

   Использовать: [Supabase/OpenAI/etc]
   Обработать ошибки и вернуть правильные статусы.
   ```

   **Для исправления багов:**
   ```
   Ошибка: [описание ошибки]
   Файл: [путь к файлу]

   Что происходит: [текущее поведение]
   Что должно быть: [ожидаемое поведение]

   Стек вызовов (если есть):
   [stack trace]
   ```

3. **Best Practices вайбкодинга (10 мин)**
   - Будьте конкретны
   - Указывайте контекст
   - Разбивайте большие задачи
   - Проверяйте сгенерированный код
   - Итерируйте и уточняйте

### Практическая работа:
Создать файл prompts.md с шаблонами для вашего проекта.

---

## Урок 5.6: Интеграция сервисов

**Продолжительность:** 30 минут

### Цели урока:
- Подключить Supabase к проекту
- Настроить OpenAI API
- Создать health check endpoint

### Содержание:

1. **Supabase интеграция (12 мин)**
   ```bash
   npm install @supabase/supabase-js
   ```

   ```typescript
   // src/lib/supabase.ts
   import { createClient } from '@supabase/supabase-js';

   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
   const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

   export const supabase = createClient(supabaseUrl, supabaseKey);
   ```

2. **OpenAI API (10 мин)**
   ```bash
   npm install openai
   ```

   ```typescript
   // src/lib/openai.ts
   import OpenAI from 'openai';

   export const openai = new OpenAI({
     apiKey: process.env.OPENAI_API_KEY,
   });
   ```

3. **Health Check (8 мин)**
   ```typescript
   // src/app/api/health/route.ts
   export async function GET() {
     return Response.json({
       status: 'ok',
       timestamp: new Date().toISOString()
     });
   }
   ```

### Практическая работа:
Подключить Supabase и OpenAI, создать health check.

---

## Урок 5.7: Готовность к вайбкодингу

**Продолжительность:** 25 минут

### Цели урока:
- Проверить все настройки
- Протестировать работу с ИИ
- Убедиться в готовности к разработке

### Содержание:

1. **Чек-лист готовности (10 мин)**

   **Проект:**
   - [ ] Next.js запускается локально
   - [ ] Деплой на Vercel работает
   - [ ] Environment variables настроены

   **ИИ-инструменты:**
   - [ ] .cursorrules создан и актуален
   - [ ] CLAUDE.md настроен
   - [ ] Шаблоны промптов готовы

   **Интеграции:**
   - [ ] Supabase подключен
   - [ ] OpenAI работает
   - [ ] Health check возвращает OK

2. **Тестирование Cursor (7 мин)**
   - Открыть проект в Cursor
   - Проверить, что .cursorrules загружается
   - Попробовать сгенерировать компонент

3. **Тестирование Claude Code (8 мин)**
   - Запустить claude в терминале
   - Проверить загрузку CLAUDE.md
   - Попробовать выполнить простую задачу

### Практическая работа:
Пройти полный чек-лист и убедиться в готовности.

---

## Итоговый проект модуля

**Задание:** Проект, полностью готовый к вайбкодингу

### Требования:

1. **Проект:**
   - Next.js с TypeScript
   - Tailwind CSS настроен
   - Работает локально и на Vercel

2. **ИИ-конфигурация:**
   - .cursorrules с правилами проекта
   - CLAUDE.md с полной документацией
   - prompts.md с шаблонами

3. **Интеграции:**
   - Supabase клиент готов
   - OpenAI API подключен
   - Health check работает

4. **Готовность:**
   - Можно генерировать код в Cursor
   - Claude Code понимает контекст проекта
   - Все сервисы доступны

### Критерии оценки:
- Все чек-листы пройдены
- ИИ-инструменты настроены корректно
- Проект готов к разработке функционала

---

## Полезные ресурсы

- [Next.js Documentation](https://nextjs.org/docs)
- [Cursor Documentation](https://cursor.sh/docs)
- [Claude Code Guide](https://docs.anthropic.com/claude-code)
- [shadcn/ui](https://ui.shadcn.com)
- [Supabase Docs](https://supabase.com/docs)
- [OpenAI API Reference](https://platform.openai.com/docs)

## Следующие шаги

После завершения этого модуля у студентов будет:
- Проект, готовый к разработке с ИИ
- Настроенные инструменты вайбкодинга
- Шаблоны для эффективной работы с ИИ
- Готовность к созданию функционала приложения

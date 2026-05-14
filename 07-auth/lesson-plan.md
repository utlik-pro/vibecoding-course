# Модуль 7: Аутентификация с Supabase Auth

**Версия плана:** май 2026
**Длительность:** ~3.5 часа (8 уроков + итоговый проект)
**Уровень:** Начинающий — для людей без IT-опыта
**Сквозной проект:** Money Tracker — добавляем вход, регистрацию и защиту данных
**Стек:** Next.js 16, Supabase Auth + `@supabase/ssr`, middleware, RLS, Vercel

## Подход к обучению — task-based learning

Модуль построен так же, как модуль 6: не «теория ради теории», а
поэтапная доработка реального приложения.

1. В **уроке 7.1** студенты берут готовый feature-PRD из файла
   [`PRD.md`](./PRD.md) в корне модуля и добавляют его к плану Task Master
   командой `task-master parse-prd .taskmaster/docs/prd.txt --append`.
2. Флаг `--append` **добавляет** auth-задачи к задачам Money Tracker из
   модуля 6 — получается единый сквозной план.
3. **Уроки 7.3–7.8** идут «по задачам»: на каждом уроке закрывается
   одна-две задачи из плана Task Master.
4. На каждом этапе разработки **мы останавливаемся** и объясняем теорию
   в контексте: «вот это — сессия», «вот это — middleware», «вот это — RLS».

## Связка «урок ↔ задача из Task Master»

| Урок | Закрываем задачу(и) | Теория в контексте                       |
| ---- | ------------------- | ---------------------------------------- |
| 7.1  | (запуск PRD --append) | Что такое аутентификация, аналогия «пропуск» |
| 7.2  | —                   | Как работает Supabase Auth, сессии, токены |
| 7.3  | 1, 2                | Email-провайдер, `@supabase/ssr`, клиенты |
| 7.4  | 4                   | Форма регистрации, `signUp`, zod-валидация |
| 7.5  | 5                   | `signInWithPassword`, сессии, `signOut`   |
| 7.6  | 6                   | OAuth, Social Login, callback-роут        |
| 7.7  | 3, 7                | middleware `updateSession`, защита роутов |
| 7.8  | 8                   | `getUser()`, `user_id`, RLS-политики      |
| project | финальная сборка | Защищённый Money Tracker целиком          |

## Что нового на май 2026

- **`@supabase/ssr`** — единственный актуальный пакет. Старый
  `@supabase/auth-helpers-nextjs` deprecated; функции
  `createMiddlewareClient`, `createServerComponentClient`,
  `createRouteHandlerClient` больше не используются.
- **`createBrowserClient` / `createServerClient`** — два клиента из
  `@supabase/ssr` (браузерный и серверный).
- **middleware `updateSession`** — типовой паттерн обновления сессии
  на каждом запросе. Тот же код, что в модуле 5 (урок 5.7).
- **Новые ключи Supabase** — `sb_publishable_*` / `sb_secret_*`
  (старые `anon`/`service_role` работают до конца 2026).
- **RLS на `auth.uid()`** — настоящие политики безопасности вместо
  «открыто всем» из модуля 6.

---

## Урок 7.1: Что такое аутентификация?

**Продолжительность:** 15 минут

### Цели урока:
- Понять простыми словами, что такое аутентификация и зачем она нужна
- Увидеть проблему на примере Money Tracker (сейчас все видят чужие данные)
- Запустить feature-PRD через Task Master (`parse-prd --append`)

### Содержание:
1. **Аналогия «пропуск в здание»** — аутентификация = охранник на входе
2. **Проблема Money Tracker** — Вася и Маша видят транзакции друг друга
3. **Аутентификация vs авторизация** — «кто ты» vs «что тебе можно»
4. **Стартуем** — берём `PRD.md`, кладём в `.taskmaster/docs/prd.txt`,
   запускаем `task-master parse-prd ... --append`, смотрим `task-master list`

---

## Урок 7.2: Как работает Supabase Auth

**Продолжительность:** 20 минут

### Цели урока:
- Понять, что Supabase Auth — это «готовая система входа из коробки»
- Разобраться, что такое сессия и токен (простыми словами)
- Изучить панель Authentication в дашборде Supabase

### Содержание:
1. **Supabase Auth = охранник, которого не нужно нанимать** — всё готово
2. **Сессия** — «браслет в аквапарке»: один раз вошёл, дальше пускают везде
3. **Способы входа** — Email+пароль, магик-линк, Social Login
4. **Панель Authentication** — где смотреть пользователей, провайдеров, шаблоны

---

## Урок 7.3: Настройка Supabase Auth

**Продолжительность:** 25 минут
**Task Master:** закрываем задачи 1 и 2

### Цели урока:
- Включить Email-провайдер в дашборде Supabase
- Убедиться, что `@supabase/ssr` установлен
- Проверить клиентов `client.ts` и `server.ts` (из модуля 5)

### Содержание:
1. Дашборд Supabase → Authentication → Providers → включить Email
2. `npm install @supabase/ssr` (если ещё не стоит)
3. `src/lib/supabase/client.ts` — `createBrowserClient`
4. `src/lib/supabase/server.ts` — `createServerClient` + `await cookies()`
5. Проверка: тестовый запрос `supabase.auth.getUser()`

---

## Урок 7.4: Регистрация по Email

**Продолжительность:** 30 минут
**Task Master:** закрываем задачу 4

### Цели урока:
- Создать страницу `/register` с формой
- Подключить `supabase.auth.signUp()`
- Валидировать форму через zod, показать «Проверьте почту»

### Содержание:
1. Форма: email + пароль + подтверждение пароля
2. zod-схема: пароль ≥ 8 символов, пароли совпадают
3. Server Action `signUp` в `src/app/actions/auth.ts`
4. Письмо подтверждения — что видит пользователь
5. Обработка ошибок (email занят, слабый пароль)

---

## Урок 7.5: Вход в систему

**Продолжительность:** 25 минут
**Task Master:** закрываем задачу 5

### Цели урока:
- Создать страницу `/login`
- Подключить `supabase.auth.signInWithPassword()`
- Добавить кнопку «Выйти» (`signOut`)

### Содержание:
1. Сравнение: `signUp` (регистрация) vs `signInWithPassword` (вход)
2. Форма входа + Server Action `signIn`
3. Редирект на `/` после успеха
4. Кнопка «Выйти» в шапке + `supabase.auth.signOut()`
5. Понятные сообщения об ошибках

---

## Урок 7.6: Social Login (Google и GitHub)

**Продолжительность:** 30 минут
**Task Master:** закрываем задачу 6

### Цели урока:
- Добавить вход через Google и GitHub
- Понять, что такое OAuth (аналогия «универсальный пропуск»)
- Настроить callback-роут

### Содержание:
1. **OAuth** — «вход через Google» как универсальный пропуск
2. Настройка провайдеров в дашборде Supabase
3. Кнопки Social Login + `supabase.auth.signInWithOAuth()`
4. Callback-роут `src/app/auth/callback/route.ts`
5. Что происходит «за кулисами» при клике на кнопку Google

---

## Урок 7.7: Защита страниц

**Продолжительность:** 30 минут
**Task Master:** закрываем задачи 3 и 7

### Цели урока:
- Создать `src/middleware.ts` — обновление сессии на каждом запросе
- Защитить страницы с транзакциями от незалогиненных
- Понять разницу: middleware / Server Component / route handler

### Содержание:
1. **middleware** — «турникет на входе в офис», проверка на каждом запросе
2. Паттерн `updateSession` через `createServerClient` (актуальный код 2026)
3. Защита роутов: незалогиненный → редирект на `/login`
4. Залогиненный на `/login` → редирект на `/`
5. **Важно:** используем `@supabase/ssr`, а НЕ устаревший
   `@supabase/auth-helpers-nextjs`

---

## Урок 7.8: Работа с пользователем

**Продолжительность:** 25 минут
**Task Master:** закрываем задачу 8

### Цели урока:
- Получать данные текущего пользователя через `getUser()`
- Добавить `user_id` в таблицу `transactions`
- Переписать RLS-политики на `auth.uid() = user_id`

### Содержание:
1. `supabase.auth.getUser()` — кто сейчас залогинен
2. Добавляем колонку `user_id` (uuid) в `transactions`
3. `user_id` берём из серверной сессии, НЕ из формы (безопасность!)
4. RLS-политики: `SELECT/INSERT/UPDATE/DELETE` с `auth.uid() = user_id`
5. Проверка: Вася больше не видит транзакции Маши

---

## Итоговый проект: Защищённый Money Tracker

**Задание:** Money Tracker с полноценной аутентификацией.

### Что должно быть готово:
1. **Регистрация и вход** — страницы `/register` и `/login` работают
2. **Social Login** — кнопки Google и GitHub
3. **Защита роутов** — middleware редиректит незалогиненных на `/login`
4. **RLS** — каждый пользователь видит только свои транзакции
5. **Деплой** — обновлённое приложение на Vercel, env-переменные на месте

### Критерии оценки (100 баллов):
- 20 — Регистрация по email работает (signUp + подтверждение)
- 20 — Вход и выход работают (signInWithPassword + signOut)
- 15 — Social Login (Google или GitHub) подключён
- 25 — Защита роутов через middleware (`@supabase/ssr`, не auth-helpers)
- 20 — RLS-политики: чужие транзакции не видны

---

## Полезные ресурсы

- [Supabase Auth — Server-Side (Next.js)](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Supabase Auth — Social Login](https://supabase.com/docs/guides/auth/social-login)
- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Next.js 16 Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Task Master AI на npm](https://www.npmjs.com/package/task-master-ai)

## Что получают студенты после модуля

- Money Tracker с реальной аутентификацией — вход, регистрация, Social Login
- Понимание, что такое сессия, middleware, RLS — на практике, не в теории
- Auth-задачи, добавленные в общий план Task Master через `--append`
- Привычку: `user_id` всегда из сессии, никогда из формы

# Настройка Supabase для Vibecoding Course

## Шаг 1: Создать проект Supabase

1. Перейдите на [supabase.com](https://supabase.com)
2. Создайте новый проект
3. Запомните:
   - **Project URL** (например: `https://xxxx.supabase.co`)
   - **anon public key** (в Settings → API)

## Шаг 2: Создать таблицы

1. Откройте SQL Editor в Supabase Dashboard
2. Скопируйте содержимое файла `schema.sql` и выполните
3. Скопируйте содержимое файла `seed-users.sql` и выполните

## Шаг 3: Настроить Magic Link

1. Перейдите в Authentication → Providers
2. Убедитесь, что Email включён
3. Перейдите в Authentication → URL Configuration
4. Установите:
   - **Site URL**: `https://your-domain.com` (или localhost для разработки)
   - **Redirect URLs**: добавьте `https://your-domain.com/index.html`

## Шаг 4: Обновить конфигурацию

Откройте `/js/supabase-client.js` и замените:

```javascript
const SUPABASE_CONFIG = {
  url: 'https://YOUR_PROJECT.supabase.co',
  anonKey: 'YOUR_ANON_KEY'
};
```

## Шаг 5: Настроить Vercel (для продакшена)

1. Добавьте переменные окружения в Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. Или создайте файл `/js/supabase-config.js` который будет загружаться перед `supabase-client.js`:

```javascript
window.SUPABASE_CONFIG = {
  url: 'https://YOUR_PROJECT.supabase.co',
  anonKey: 'YOUR_ANON_KEY'
};
```

## Структура таблиц

### cohorts (Потоки)
- `id` - UUID
- `name` - название потока
- `description` - описание
- `start_date` - дата начала
- `is_active` - активен ли поток

### users (Пользователи)
- `id` - UUID
- `email` - email (уникальный)
- `name` - имя
- `cohort_id` - ссылка на поток
- `role` - student/admin/instructor
- `is_active` - активен ли пользователь

### modules (Модули курса)
- `id` - номер модуля (1-12)
- `title` - название
- `description` - описание
- `lesson_count` - количество уроков
- `is_visible` - видим ли модуль

### module_access (Доступ потока к модулям)
- `cohort_id` - ссылка на поток
- `module_id` - ссылка на модуль
- `is_unlocked` - открыт ли модуль
- `unlocked_at` - когда открыт

### user_module_access (Индивидуальный доступ)
- `user_id` - ссылка на пользователя
- `module_id` - ссылка на модуль
- `is_unlocked` - переопределение доступа

### progress (Прогресс)
- `user_id` - ссылка на пользователя
- `module_id` - номер модуля
- `lesson_id` - номер урока
- `completed_at` - когда пройден

### checklist_progress (Прогресс чек-листов)
- `user_id` - ссылка на пользователя
- `module_id` - номер модуля
- `checklist_id` - ID чек-листа
- `is_completed` - выполнен ли

## Миграция с whitelist

При первом входе через Magic Link система автоматически:
1. Мигрирует прогресс из localStorage в Supabase
2. Устанавливает флаг `supabaseSynced` в localStorage

## Fallback режим

Если Supabase не настроен (URL = 'YOUR_SUPABASE_URL'), система автоматически работает в fallback-режиме:
- Используется whitelist из `js/config.js`
- Прогресс хранится в localStorage
- Админка доступна через `boss.html` с паролем

## RLS (Row Level Security)

Все таблицы защищены RLS политиками:
- Пользователи видят только свои данные
- Админы видят все данные
- Прогресс можно добавлять только для себя

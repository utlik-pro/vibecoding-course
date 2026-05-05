# Модуль 4: Практическая программа на сквозном примере

> **Сквозной проект модуля:** **ContentBot** — SaaS-сервис, который генерирует посты для соцсетей с помощью AI. Пользователь логинится, выбирает тему/площадку (Instagram, LinkedIn, X), нажимает «Сгенерировать», получает 3 варианта поста. Бесплатный план — 5 генераций в месяц, Pro — безлимит за $9/мес.

Этот пример проходит через все 7 уроков модуля. К концу модуля у тебя на руках будет:
- Зарегистрированные аккаунты + `.env.local` с ключами
- Развёрнутый «Hello World» в Vercel
- Схема БД в Supabase
- Готовая архитектура и ТЗ на ContentBot

---

## 🧩 Концепция «ContentBot»

| Аспект | Значение |
|---|---|
| **Идея** | Генерация постов для соцсетей через AI |
| **Аудитория** | SMM-щики, фрилансеры, малый бизнес |
| **Монетизация** | Freemium: 5 генераций/мес бесплатно, $9/мес Pro |
| **Стек** | Next.js + Supabase + Clerk + OpenAI + Stripe + Vercel |
| **MVP-фичи** | Auth → Форма генерации → История постов → Биллинг |

---

## Урок 4.1 — Регистрация аккаунтов (1 ч)

### Цель
Завести 6 сервисов и собрать `.env.local` для ContentBot.

### Пошаговая практика

**Шаг 1. Vercel** (~5 мин)
1. Открой https://vercel.com → Sign Up → Continue with GitHub
2. Импортировать проект пока не нужно — просто залогинься
3. В Settings → General → запомни team slug

**Шаг 2. Supabase** (~10 мин)
1. https://supabase.com → New project → name: `contentbot`, region: `Frankfurt`
2. Сохрани **Database password** в надёжное место
3. Project Settings → API → копируем:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY` (никогда в клиенте!)

**Шаг 3. Clerk** (~10 мин)
1. https://clerk.com → Add application → name: `ContentBot`
2. Включи **Email + Google** (Phone выключи — лишняя сложность)
3. API Keys:
   - `Publishable key` → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `Secret key` → `CLERK_SECRET_KEY`

**Шаг 4. OpenAI** (~5 мин)
1. https://platform.openai.com → API keys → Create new secret key (name: `contentbot-dev`)
2. **Ставь Usage limit $5** в Billing → Limits, чтобы не разориться на тестах
3. `OPENAI_API_KEY=sk-...`

**Шаг 5. Stripe** (~10 мин)
1. https://stripe.com → Sign up → **Test mode включён по умолчанию**
2. Developers → API keys:
   - `Publishable key` → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `Secret key` → `STRIPE_SECRET_KEY`
3. Products → Add product: «ContentBot Pro», recurring $9/month → запомни `price_xxx`

**Шаг 6. GitHub** (уже есть)
1. Создай пустой репозиторий `contentbot`
2. Добавь `.gitignore` с `.env.local`

### Артефакт урока — `.env.local`
```env
# Vercel: ничего, авторизация через GitHub

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# OpenAI (лимит $5!)
OPENAI_API_KEY=sk-proj-...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_PRO=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Проверка готовности
- [ ] 6 аккаунтов созданы
- [ ] Все ключи в `.env.local`
- [ ] `.env.local` в `.gitignore`
- [ ] OpenAI лимит $5 поставлен

---

## Урок 4.2 — Архитектура веб-приложения (1.5 ч)

### Цель
Понять, как устроен ContentBot изнутри, и нарисовать его архитектуру.

### Архитектура ContentBot

```
┌──────────────────────────────────────────────────────────┐
│                    БРАУЗЕР (клиент)                       │
│  Next.js App Router + React + Tailwind + shadcn/ui        │
│  - Страницы: /, /dashboard, /pricing, /history            │
│  - Clerk <SignedIn> / <SignedOut> guards                  │
└──────────────────────────────┬───────────────────────────┘
                               │ HTTPS
┌──────────────────────────────▼───────────────────────────┐
│                  VERCEL EDGE / SERVERLESS                 │
│  Next.js API Routes (app/api/*)                           │
│  - /api/generate    → OpenAI                              │
│  - /api/checkout    → Stripe                              │
│  - /api/webhook     → Stripe webhook                      │
│  - middleware.ts    → Clerk auth check                    │
└─────┬───────────────┬──────────────┬─────────────────────┘
      │               │              │
      ▼               ▼              ▼
┌──────────┐    ┌──────────┐   ┌──────────┐
│ SUPABASE │    │  OPENAI  │   │  STRIPE  │
│ Postgres │    │ GPT-4o   │   │ Billing  │
│   + RLS  │    │  -mini   │   │ Webhooks │
└──────────┘    └──────────┘   └──────────┘
                                     │
                                     ▼ webhook
                              ┌──────────────┐
                              │  CLERK Auth  │
                              │  user.email  │
                              │ → Supabase   │
                              └──────────────┘
```

### Поток данных «Сгенерировать пост»
1. Юзер кликает «Сгенерировать» → клиент шлёт POST `/api/generate`
2. `middleware.ts` проверяет Clerk JWT → если нет → 401
3. API route читает `userId` из Clerk → проверяет квоту в Supabase (`SELECT generations_left FROM users WHERE clerk_id = ?`)
4. Если квота > 0 → запрос в OpenAI с промптом
5. Сохраняем результат в `posts` table → уменьшаем `generations_left`
6. Возвращаем JSON с 3 вариантами поста

### Практическая работа урока
Нарисуй такую же диаграмму для **своего** проекта в [Excalidraw](https://excalidraw.com). Ответь на 5 вопросов:
1. Кто хранит сессию? (Clerk/Supabase Auth/cookie?)
2. Где живёт бизнес-логика? (API Routes/Edge Functions?)
3. Откуда деньги? (Stripe Checkout/Subscription?)
4. Какие внешние API? (OpenAI/Resend/Twilio?)
5. Что асинхронно? (webhooks/cron/queue?)

---

## Урок 4.3 — JS/TS/React (1.5 ч)

### Цель
Создать заготовку Next.js + TypeScript для ContentBot.

### Шаг 1. Создание проекта
```bash
npx create-next-app@latest contentbot \
  --typescript --tailwind --app --eslint --src-dir
cd contentbot
npm run dev
```

### Шаг 2. Первый компонент — `GenerateForm.tsx`
```typescript
// src/components/GenerateForm.tsx
'use client';

import { useState } from 'react';

type Platform = 'instagram' | 'linkedin' | 'twitter';

interface GenerateFormProps {
  onResult: (posts: string[]) => void;
}

export function GenerateForm({ onResult }: GenerateFormProps) {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, platform }),
      });
      const data: { posts: string[] } = await res.json();
      onResult(data.posts);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="О чём пост? Например: запуск нового продукта"
        className="border rounded px-3 py-2"
      />
      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value as Platform)}
        className="border rounded px-3 py-2"
      >
        <option value="instagram">Instagram</option>
        <option value="linkedin">LinkedIn</option>
        <option value="twitter">X (Twitter)</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Генерирую…' : 'Сгенерировать 3 варианта'}
      </button>
    </form>
  );
}
```

### Чему учит этот пример
- **TypeScript types** (`Platform` union, `GenerateFormProps` interface)
- **React hooks** (`useState`)
- **Async/await + fetch**
- **Tailwind classes**
- **Контролируемые формы**

### Шаг 3. Server Component vs Client Component
```typescript
// src/app/dashboard/page.tsx — SERVER component (по умолчанию)
import { auth } from '@clerk/nextjs/server';
import { GenerateForm } from '@/components/GenerateForm';

export default async function DashboardPage() {
  const { userId } = await auth();
  // ↑ это серверный код, в браузер не попадает
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl mb-4">Привет, {userId}</h1>
      <GenerateForm onResult={(p) => console.log(p)} />
      {/* ↑ GenerateForm — 'use client', выполнится в браузере */}
    </main>
  );
}
```

### Артефакт урока
Запушь репозиторий → в Vercel: **New Project → Import** → Deploy. Через 2 минуты у тебя URL вида `https://contentbot-xyz.vercel.app`.

---

## Урок 4.4 — База данных и SQL (1.5 ч)

### Цель
Спроектировать схему ContentBot и написать SQL-запросы.

### Схема БД ContentBot
В Supabase SQL Editor выполни:

```sql
-- Таблица пользователей (синхронизируется с Clerk через webhook)
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id text UNIQUE NOT NULL,
  email text NOT NULL,
  plan text DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  generations_left int DEFAULT 5,
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz DEFAULT now()
);

-- Сгенерированные посты
CREATE TABLE posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  topic text NOT NULL,
  platform text NOT NULL CHECK (platform IN ('instagram', 'linkedin', 'twitter')),
  content text NOT NULL,
  tokens_used int,
  created_at timestamptz DEFAULT now()
);

-- Индексы для скорости
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);

-- Row Level Security: пользователь видит только свои посты
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own posts"
  ON posts FOR SELECT
  USING (user_id IN (
    SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'
  ));
```

### CRUD-запросы ContentBot

```sql
-- CREATE: добавить новый пост
INSERT INTO posts (user_id, topic, platform, content, tokens_used)
VALUES ('uuid-here', 'Запуск SaaS', 'linkedin', 'Текст поста...', 250);

-- READ: история постов пользователя за неделю
SELECT topic, platform, content, created_at
FROM posts
WHERE user_id = 'uuid-here'
  AND created_at > now() - interval '7 days'
ORDER BY created_at DESC
LIMIT 50;

-- UPDATE: уменьшить квоту после генерации
UPDATE users
SET generations_left = generations_left - 1
WHERE clerk_id = 'user_xxx' AND generations_left > 0
RETURNING generations_left;

-- DELETE: очистить старые посты (cron job раз в месяц)
DELETE FROM posts WHERE created_at < now() - interval '90 days';
```

### Аналитический SQL — для админ-дашборда

```sql
-- Сколько постов сгенерировано за последние 30 дней по платформам
SELECT
  platform,
  COUNT(*) as posts_count,
  SUM(tokens_used) as total_tokens,
  ROUND(AVG(tokens_used)) as avg_tokens
FROM posts
WHERE created_at > now() - interval '30 days'
GROUP BY platform
ORDER BY posts_count DESC;

-- Топ-10 активных юзеров
SELECT u.email, COUNT(p.id) as posts, u.plan
FROM users u
LEFT JOIN posts p ON p.user_id = u.id
GROUP BY u.id, u.email, u.plan
ORDER BY posts DESC
LIMIT 10;

-- Конверсия Free → Pro
SELECT
  plan,
  COUNT(*) as users,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 1) as percent
FROM users
GROUP BY plan;
```

### Bonus: Drizzle ORM-схема (то же самое в TypeScript)

```typescript
// src/db/schema.ts
import { pgTable, uuid, text, integer, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const planEnum = pgEnum('plan', ['free', 'pro']);
export const platformEnum = pgEnum('platform', ['instagram', 'linkedin', 'twitter']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkId: text('clerk_id').unique().notNull(),
  email: text('email').notNull(),
  plan: planEnum('plan').default('free'),
  generationsLeft: integer('generations_left').default(5),
  stripeCustomerId: text('stripe_customer_id'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  topic: text('topic').notNull(),
  platform: platformEnum('platform').notNull(),
  content: text('content').notNull(),
  tokensUsed: integer('tokens_used'),
  createdAt: timestamp('created_at').defaultNow(),
});
```

### Артефакт урока
- Таблицы `users` и `posts` созданы в Supabase
- Все SQL-запросы выполнены в SQL Editor
- Сохранён файл `migrations/0001_init.sql`

---

## Урок 4.5 — Облако и serverless (1 ч)

### Цель
Понять, где и как работает ContentBot в проде.

### Где живёт каждая часть ContentBot

| Компонент | Где работает | Что платим |
|---|---|---|
| **Frontend (HTML/JS)** | Vercel CDN (Edge) | Free до 100 GB трафика |
| **API Routes** | Vercel Serverless (Node.js, лямбды) | Free до 100k вызовов/мес |
| **OpenAI запросы** | api.openai.com | $0.15 / 1M токенов (gpt-4o-mini) |
| **БД** | Supabase Postgres (Frankfurt) | Free до 500 MB, 2 ГБ трафика |
| **Auth** | Clerk Cloud | Free до 10 000 MAU |
| **Stripe webhook** | Vercel Serverless | бесплатно |
| **Файлы** (если будут) | Supabase Storage | Free 1 GB |

### Что такое «Edge» vs «Serverless»
- **Edge Functions** — крошечные функции на CDN, ~50 мс старт. Подходит для middleware (Clerk auth check).
- **Serverless Functions** — обычные Node.js лямбды, ~300 мс cold start. Для API с БД, OpenAI.

```typescript
// src/middleware.ts — работает на Edge (быстро)
export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
  runtime: 'edge', // ← важно
};

// src/app/api/generate/route.ts — обычный serverless (нужен SDK OpenAI)
export const runtime = 'nodejs';
```

### Стоимость ContentBot на 1000 активных пользователей
- Vercel: $0 (в free tier)
- Supabase: $0 (в free tier, пока < 500 MB)
- Clerk: $0 (1000 MAU < 10k бесплатных)
- OpenAI: 1000 юзеров × 5 генераций × 500 токенов ≈ $0.40/мес
- Stripe: 2.9% + $0.30 с транзакции
- **Итого:** ~$1/мес инфраструктуры на 1000 юзеров 🎉

### Практика
Открой Vercel Dashboard → Analytics → посмотри Web Vitals твоего тестового деплоя. Цель: LCP < 2.5s, CLS < 0.1.

---

## Урок 4.6 — Сторонние интеграции (1 ч)

### Цель
Подключить Stripe Checkout и Clerk webhook для ContentBot.

### Stripe Checkout — апгрейд на Pro

```typescript
// src/app/api/checkout/route.ts
import Stripe from 'stripe';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: process.env.STRIPE_PRICE_PRO!, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
    metadata: { clerkId: userId },
  });

  return NextResponse.json({ url: session.url });
}
```

### Stripe Webhook — апгрейд плана после оплаты

```typescript
// src/app/api/webhook/route.ts
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase-admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get('stripe-signature')!;

  const event = stripe.webhooks.constructEvent(
    body, sig, process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const clerkId = session.metadata?.clerkId;

    await supabaseAdmin
      .from('users')
      .update({
        plan: 'pro',
        generations_left: 9999,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: session.subscription as string,
      })
      .eq('clerk_id', clerkId);
  }

  return new Response('ok', { status: 200 });
}
```

### Безопасность интеграций — чек-лист
- [ ] Все секретные ключи в `.env.local`, никогда в коде
- [ ] Webhook signature всегда верифицируется (`constructEvent`)
- [ ] Rate limiting на `/api/generate` (например, через Upstash Redis)
- [ ] Поле `stripe_customer_id` не показывается в клиенте
- [ ] CORS на API: только свой домен

### Тест Stripe webhook локально
```bash
# Установить stripe CLI
brew install stripe/stripe-cli/stripe
stripe login
stripe listen --forward-to localhost:3000/api/webhook
# Копируешь whsec_... в .env.local
# Делаешь тестовый платёж — webhook прилетит в локалку
```

---

## Урок 4.7 — Инструменты разработчика (45 мин)

### Цель
Настроить максимально продуктивное окружение для ContentBot.

### VS Code / Cursor расширения (мастхэв)
- **ESLint** — ловит ошибки в JS/TS на лету
- **Prettier** — форматирует код по сохранении
- **Tailwind CSS IntelliSense** — автокомплит классов
- **Prisma / Drizzle Kit** — подсветка схем
- **GitLens** — кто и когда менял строку
- **Error Lens** — ошибки прямо в строке кода

### `.vscode/settings.json` для ContentBot
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

### Git workflow для ContentBot
```bash
# Conventional commits — берём паттерн из этого курса
git checkout -b feat/generate-form
git add .
git commit -m "feat: добавить форму генерации постов"
git push -u origin feat/generate-form
gh pr create --title "feat: форма генерации"
```

### Тестирование API (Thunder Client / curl)
```bash
# Вместо Postman — Thunder Client расширение в VS Code
# Или curl:
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $CLERK_TOKEN" \
  -d '{"topic":"запуск ContentBot","platform":"linkedin"}'
```

### Browser DevTools для ContentBot
- **Network** — следишь за `/api/generate` (время, размер, статус)
- **React DevTools** — видишь стейт `<GenerateForm>`
- **Application → Cookies** — Clerk session cookie
- **Lighthouse** — performance audit перед деплоем

---

## 🏁 Итоговый проект модуля — ТЗ для своего SaaS

Возьми пример «ContentBot» как образец и напиши ТЗ для **своего** SaaS-приложения. Шаблон:

### 1. Концепция (1 страница)
- Идея в 1 предложении
- Целевая аудитория
- Главная проблема, которую решает
- 3 ключевые фичи MVP
- Модель монетизации

### 2. Архитектура
- Диаграмма из урока 4.2
- Технологии с обоснованием:
  - Frontend: ___
  - Backend: ___
  - БД: ___
  - Auth: ___
  - AI/внешние API: ___
  - Платежи: ___
  - Хостинг: ___

### 3. Схема БД
- Минимум 2-3 таблицы с полями
- Связи между таблицами
- RLS-политики

### 4. API endpoints
| Метод | Путь | Что делает | Auth |
|---|---|---|---|
| POST | /api/... | ... | да/нет |

### 5. План на 4 недели
- **Неделя 1:** Auth + БД схема
- **Неделя 2:** Главная фича (например, генерация)
- **Неделя 3:** Биллинг + dashboard
- **Неделя 4:** Полировка + деплой + лендинг

### 6. Риски и митigation
- Что может пойти не так?
- Как мы это компенсируем?

---

## ✅ Финальный чек-лист модуля

- [ ] Все 6 аккаунтов созданы
- [ ] `.env.local` собран
- [ ] OpenAI лимит $5 поставлен
- [ ] Создан тестовый Next.js проект
- [ ] Проект задеплоен в Vercel
- [ ] В Supabase созданы таблицы `users` и `posts`
- [ ] Выполнено минимум 5 SQL-запросов
- [ ] Нарисована архитектура своего проекта
- [ ] Установлены VS Code расширения
- [ ] Написано ТЗ + roadmap своего SaaS

После этого ты готов к Модулю 5 (Настройка проекта) — будем брать всё это и реально кодить ContentBot.

---

## 📚 Дополнительные материалы

- [The Twelve-Factor App](https://12factor.net/) — принципы SaaS-архитектуры
- [Next.js Learn Course](https://nextjs.org/learn) — официальный туториал
- [Supabase YouTube](https://www.youtube.com/@Supabase) — видео по фичам
- [Theo's T3 Stack](https://create.t3.gg/) — альтернативный набор инструментов
- [Stripe Docs](https://stripe.com/docs/billing/subscriptions/overview) — биллинг

> 💡 **Совет**: не пытайся всё запомнить. Главное — понять, **где что живёт** и **куда смотреть**, когда понадобится. Документация — твой лучший друг.

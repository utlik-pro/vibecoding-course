# Модуль 7: Аутентификация с Clerk

## Обзор модуля

**Продолжительность:** 2 дня (упрощенная версия)

**Цель:** Научиться интегрировать готовую систему аутентификации Clerk в Next.js приложение. Этот модуль фокусируется на базовой настройке и использовании Clerk без сложных тем про middleware и синхронизацию с базой данных.

**Важно:** Защищенные роуты через middleware и ручная синхронизация пользователей с БД — продвинутые темы, которые не обязательны для начального уровня. Clerk автоматически управляет пользователями, и этого достаточно для большинства проектов.

---

## Урок 7.1: Введение в Clerk и базовая настройка

**Продолжительность:** 3 часа

### Цели урока:
- Понять, что такое Clerk и почему он удобен
- Зарегистрироваться в Clerk и создать приложение
- Интегрировать Clerk в Next.js проект
- Настроить базовую аутентификацию (email/password, social login)

### Содержание:

#### 1. Что такое Clerk? (30 мин)

**Проблема аутентификации:**
- Написание своей системы auth занимает недели
- Нужно думать о безопасности, хешировании паролей, токенах
- Сложная интеграция social login (Google, GitHub)
- Управление сессиями и восстановление паролей

**Clerk как решение:**
- Готовая система аутентификации "из коробки"
- Красивые UI компоненты для входа/регистрации
- Автоматическая интеграция с Next.js
- Social login в пару кликов
- Бесплатный план для разработки

**Альтернативы:**
- NextAuth.js (более гибкий, но сложнее)
- Supabase Auth (хорош, если уже используете Supabase)
- Firebase Auth (Google экосистема)
- Auth0 (enterprise решение)

**Почему Clerk для начинающих:**
✅ Самый простой в настройке
✅ Отличная документация
✅ Готовые компоненты React
✅ Автоматическое управление состоянием
✅ Бесплатный план до 10,000 пользователей

#### 2. Регистрация и настройка Clerk (30 мин)

**Шаг 1: Создание аккаунта**
1. Перейдите на [clerk.com](https://clerk.com)
2. Sign up (можно через GitHub)
3. Create Application
4. Выберите название проекта
5. Выберите способы входа (Email, Google, GitHub)

**Шаг 2: Получение API ключей**
```env
# .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

**Важно:**
- Publishable key — можно использовать в клиентском коде
- Secret key — только на сервере, никогда не коммитить!

#### 3. Установка Clerk в Next.js проект (45 мин)

**Установка пакета:**
```bash
npm install @clerk/nextjs
```

**Настройка layout.tsx:**
```typescript
// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

**Добавление компонентов аутентификации:**
```typescript
// app/page.tsx
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs'

export default function Home() {
  return (
    <div>
      <header>
        <SignedOut>
          <SignInButton mode="modal" />
          <SignUpButton mode="modal" />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      <main>
        <SignedOut>
          <h1>Добро пожаловать! Пожалуйста, войдите.</h1>
        </SignedOut>
        <SignedIn>
          <h1>Вы вошли в систему!</h1>
        </SignedIn>
      </main>
    </div>
  )
}
```

**Создание страниц sign-in и sign-up:**
```typescript
// app/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <SignIn />
    </div>
  )
}
```

```typescript
// app/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <SignUp />
    </div>
  )
}
```

#### 4. Настройка Clerk Dashboard (45 мин)

**Кастомизация UI:**
- Перейдите в Clerk Dashboard → Customization
- Выберите цветовую схему (светлую/темную)
- Настройте логотип и брендинг
- Измените тексты кнопок (опционально)

**Настройка Social Login:**
- Перейдите в Dashboard → User & Authentication → Social Connections
- Включите Google:
  1. Переключите тоггл Google
  2. Clerk автоматически настроит для development
  3. Для production нужно будет добавить свои Google OAuth credentials
- Аналогично для GitHub, Discord и других

**Настройка Email:**
- Clerk автоматически отправляет verification emails
- Magic links для входа без пароля (можно включить)
- Кастомные email templates (платная фича)

### Практическая работа:
1. Создайте Clerk приложение
2. Интегрируйте Clerk в ваш Next.js проект
3. Добавьте компоненты SignIn/SignUp
4. Настройте Google и GitHub OAuth
5. Протестируйте регистрацию и вход

### Домашнее задание:
Добавьте аутентификацию во все основные страницы вашего приложения. Убедитесь, что после входа пользователь видит персонализированный контент.

---

## Урок 7.2: Работа с данными пользователя и защита контента

**Продолжительность:** 3 часа

### Цели урока:
- Научиться получать данные текущего пользователя
- Защитить страницы от неавторизованных пользователей
- Создать приватные и публичные секции
- Использовать Clerk в Server Components и API Routes

### Содержание:

#### 1. Получение данных пользователя (45 мин)

**В Client Components:**
```typescript
'use client'
import { useUser } from '@clerk/nextjs'

export default function ProfileClient() {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) {
    return <div>Загрузка...</div>
  }

  if (!isSignedIn) {
    return <div>Пожалуйста, войдите</div>
  }

  return (
    <div>
      <h1>Привет, {user.firstName}!</h1>
      <p>Email: {user.emailAddresses[0].emailAddress}</p>
      <img src={user.imageUrl} alt="Avatar" />
    </div>
  )
}
```

**В Server Components:**
```typescript
import { currentUser } from '@clerk/nextjs/server'

export default async function ProfileServer() {
  const user = await currentUser()

  if (!user) {
    return <div>Не авторизован</div>
  }

  return (
    <div>
      <h1>Привет, {user.firstName}!</h1>
      <p>Email: {user.emailAddresses[0].emailAddress}</p>
    </div>
  )
}
```

**Полезные поля user объекта:**
```typescript
user.id                                  // Уникальный ID
user.firstName                           // Имя
user.lastName                            // Фамилия
user.emailAddresses[0].emailAddress     // Email
user.imageUrl                            // Аватар
user.createdAt                           // Дата регистрации
```

#### 2. Защита страниц (45 мин)

**Метод 1: Проверка на клиенте (простой, но не самый безопасный):**
```typescript
'use client'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedPage() {
  const { isLoaded, isSignedIn } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
    }
  }, [isLoaded, isSignedIn, router])

  if (!isLoaded || !isSignedIn) {
    return <div>Загрузка...</div>
  }

  return <div>Защищенный контент</div>
}
```

**Метод 2: Проверка на сервере (рекомендуется):**
```typescript
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function ProtectedServerPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return <div>Защищенный контент</div>
}
```

**Защита API Routes:**
```typescript
// app/api/protected/route.ts
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({
    message: 'Секретные данные',
    userId
  })
}
```

#### 3. Создание User Profile страницы (60 мин)

**Страница профиля с формой:**
```typescript
'use client'
import { useUser } from '@clerk/nextjs'
import { useState } from 'react'

export default function UserProfile() {
  const { user } = useUser()
  const [bio, setBio] = useState('')

  const handleSave = async () => {
    // Clerk позволяет сохранять кастомные данные
    await user?.update({
      unsafeMetadata: {
        bio: bio
      }
    })
    alert('Профиль обновлен!')
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Мой профиль</h1>

      <div className="mb-4">
        <img
          src={user?.imageUrl}
          alt="Avatar"
          className="w-24 h-24 rounded-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Имя:</label>
        <p className="text-xl">{user?.firstName} {user?.lastName}</p>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Email:</label>
        <p>{user?.emailAddresses[0].emailAddress}</p>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Биография:</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
          placeholder="Расскажите о себе..."
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-6 py-2 rounded"
      >
        Сохранить
      </button>
    </div>
  )
}
```

**Использование встроенного Clerk Profile:**
```typescript
// app/user-profile/[[...user-profile]]/page.tsx
import { UserProfile } from '@clerk/nextjs'

export default function UserProfilePage() {
  return (
    <div className="flex justify-center p-6">
      <UserProfile />
    </div>
  )
}
```

#### 4. Организация навигации с auth (30 мин)

**Header компонент:**
```typescript
'use client'
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex gap-6">
          <Link href="/" className="hover:underline">Главная</Link>
          <SignedIn>
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            <Link href="/user-profile" className="hover:underline">Профиль</Link>
          </SignedIn>
        </div>

        <div className="flex gap-4 items-center">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-blue-500 px-4 py-2 rounded">Вход</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-green-500 px-4 py-2 rounded">Регистрация</button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10"
                }
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  )
}
```

### Практическая работа:
1. Создайте защищенную страницу /dashboard
2. Добавьте страницу профиля пользователя
3. Создайте API route, доступный только авторизованным пользователям
4. Организуйте навигацию с учетом статуса аутентификации

### Домашнее задание:
Добавьте кастомные поля в профиль пользователя (например, дата рождения, город, интересы) используя `unsafeMetadata` в Clerk.

---

## Заключение модуля

### Что мы изучили:
✅ Как интегрировать Clerk в Next.js
✅ Настройка social login (Google, GitHub)
✅ Получение данных пользователя на клиенте и сервере
✅ Защита страниц и API routes
✅ Создание профиля пользователя
✅ Организация навигации с учетом auth

### Что НЕ вошло в модуль (продвинутые темы):
- Middleware для защиты роутов (Clerk делает это автоматически)
- Ручная синхронизация пользователей с БД (Clerk автоматически управляет пользователями)
- Webhooks для сложной интеграции
- Кастомные JWT claims и metadata
- Organization management (команды и роли)
- Multi-factor authentication (MFA)

**Для большинства проектов то, что мы изучили — достаточно!**

### Полезные ресурсы:
- [Clerk Documentation](https://clerk.com/docs)
- [Clerk + Next.js Quickstart](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Examples](https://github.com/clerk/clerk-nextjs-examples)
- [Clerk Community](https://clerk.com/community)

### Следующий модуль:
В модуле 8 мы изучим работу с базой данных Supabase и научимся сохранять данные приложения.

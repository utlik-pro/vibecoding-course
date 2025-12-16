# Модуль 4: Обзор технологического стека

## Урок 4.1: Регистрация аккаунтов и подготовка

**Продолжительность:** 1 час

### Цели урока:
- Зарегистрироваться во всех необходимых сервисах
- Понять роль каждого сервиса в экосистеме
- Подготовить окружение для разработки

### Содержание:

1. **Список необходимых аккаунтов (10 мин)**
   - Vercel - деплоймент и хостинг
   - Supabase - база данных как сервис
   - Clerk - аутентификация и управление пользователями
   - OpenAI - ИИ API для функциональности
   - Stripe - платежная система
   - GitHub - версионирование кода (уже есть)

2. **Vercel - платформа деплоймента (15 мин)**
   - Регистрация через GitHub
   - Обзор dashboard
   - Подключение репозиториев
   - Environment variables
   - Analytics и мониторинг
   - Pricing plans обзор

3. **Supabase - Backend-as-a-Service (15 мин)**
   - Создание аккаунта
   - Создание первого проекта
   - Database, Auth, Storage, Edge Functions
   - SQL Editor и Table Editor
   - API автогенерация
   - Pricing и лимиты

4. **Clerk - аутентификация (10 мин)**
   - Регистрация и создание приложения
   - Типы аутентификации (email, social, phone)
   - Dashboard и настройки
   - Webhooks и интеграции
   - Pricing plans

5. **OpenAI - ИИ возможности (5 мин)**
   - Создание аккаунта
   - API keys генерация
   - Billing и лимиты
   - Модели и их возможности

6. **Stripe - платежи (5 мин)**
   - Регистрация
   - Test mode vs Live mode  
   - Dashboard overview
   - API keys

### Практическая работа:
Создать тестовые проекты в каждом сервисе, сохранить все API ключи в безопасном месте.

### Материалы:
- Чек-лист регистраций с ссылками
- Инструкции по получению API ключей
- Шаблон для хранения конфиденциальных данных

### Домашнее задание:
Завершить все регистрации, изучить документацию каждого сервиса (обзорно).

---

## Урок 4.2: Архитектура современных веб-приложений

**Продолжительность:** 1.5 часа

### Цели урока:
- Понять как взаимодействуют фронтенд, бекенд и база данных
- Изучить архитектурные паттерны современной веб-разработки
- Понять роль каждого компонента в системе

### Содержание:

1. **Эволюция веб-архитектуры (20 мин)**
   - Статичные сайты (HTML + CSS)
   - Server-side rendering (PHP, ASP.NET)
   - AJAX и динамические приложения
   - Single Page Applications (SPA)
   - Server-side rendering возвращается (Next.js)
   - Jamstack и статичная генерация
   - Full-stack frameworks (Next.js, Nuxt, SvelteKit)

2. **Современная архитектура веб-приложения (30 мин)**
   
   **Frontend слой:**
   - React/Vue/Svelte компоненты
   - State management (Zustand, Redux)
   - Роутинг (Next.js Router)
   - UI библиотеки (shadcn/ui, Chakra UI)
   - Styling (Tailwind CSS, CSS-in-JS)
   
   **Backend слой:**
   - API Routes (Next.js, Express)
   - Authentication middleware
   - Database ORM (Drizzle, Prisma)  
   - File storage и CDN
   - Background jobs и cron tasks
   
   **Database слой:**
   - Relational databases (PostgreSQL, MySQL)
   - NoSQL databases (MongoDB, Redis)
   - Vector databases (для ИИ)
   - Caching layers (Redis, Memcached)

3. **Deployment и DevOps (25 мин)**
   - Static site generation vs Server-side rendering
   - Edge functions и CDN
   - Containerization (Docker)
   - CI/CD pipelines (GitHub Actions)
   - Monitoring и logging
   - Performance optimization

4. **Коммуникация между слоями (15 мин)**
   - REST API паттерны
   - GraphQL альтернатива
   - tRPC type-safe API
   - WebSockets для real-time
   - Server-sent events
   - Webhooks для интеграций

### Диаграммы и визуализация:
- Схема архитектуры типичного SaaS приложения
- Data flow диаграмма
- Deployment pipeline схема

### Практическая работа:
Создать схему архитектуры для планируемого проекта курса.

---

## Урок 4.3: JavaScript, TypeScript, React экосистема

**Продолжительность:** 1.5 часа

### Цели урока:
- Понять роль JavaScript в современной веб-разработке
- Изучить преимущества TypeScript
- Освоить основы React и его экосистемы

### Содержание:

1. **JavaScript в 2024+ (25 мин)**
   - ES6+ features (arrow functions, destructuring, modules)
   - Async/await и Promises
   - Современные API (Fetch, Web APIs)
   - Node.js и серверный JavaScript
   - Package managers (npm, yarn, pnpm)
   - Build tools (Vite, Webpack, esbuild)

2. **TypeScript - JavaScript с типами (30 мин)**
   - Зачем нужны типы в динамическом языке?
   - Основы TypeScript (types, interfaces, generics)
   - Конфигурация (tsconfig.json)
   - Интеграция с React
   - Type safety в API calls
   - Практические примеры

3. **React экосистема (35 мин)**
   
   **Основы React:**
   - Components и JSX
   - Props и State
   - Hooks (useState, useEffect, useContext)
   - Component lifecycle
   
   **Next.js framework:**
   - App Router vs Pages Router
   - Server components vs Client components
   - Static generation vs Server-side rendering
   - API routes и middleware
   - Image optimization и SEO
   
   **State management:**
   - Built-in React state
   - Context API
   - Zustand для глобального state
   - TanStack Query для server state

4. **Инструменты разработки (20 мин)**
   - Package.json и dependencies
   - Development vs production builds
   - Linting (ESLint) и форматирование (Prettier)
   - Testing (Jest, Vitest, Playwright)
   - Development server и hot reload

### Практические примеры:
- Создание TypeScript React компонента
- Настройка Next.js проекта
- Интеграция с внешним API

### Материалы:
- TypeScript cheat sheet
- React hooks справочник  
- Next.js best practices

---

## Урок 4.4: Базы данных и SQL

**Продолжительность:** 1.5 часа

### Цели урока:
- Понять основы реляционных баз данных
- Изучить SQL для работы с PostgreSQL
- Познакомиться с ORM и современными подходами

### Содержание:

1. **Основы баз данных (20 мин)**
   - Что такое база данных?
   - Реляционные vs NoSQL базы данных
   - ACID принципы
   - Нормализация данных
   - Индексы и производительность

2. **PostgreSQL (25 мин)**
   - Почему PostgreSQL?
   - Типы данных (varchar, integer, timestamp, json, uuid)
   - Создание таблиц и связей
   - Primary keys и Foreign keys
   - Constraints и validation
   - JSON поддержка в PostgreSQL

3. **SQL основы (35 мин)**
   
   **CRUD операции:**
   ```sql
   -- CREATE
   INSERT INTO users (name, email) VALUES ('John', 'john@example.com');
   
   -- READ
   SELECT * FROM users WHERE active = true;
   SELECT u.name, p.title FROM users u JOIN posts p ON u.id = p.user_id;
   
   -- UPDATE  
   UPDATE users SET last_login = NOW() WHERE id = 1;
   
   -- DELETE
   DELETE FROM users WHERE created_at < '2023-01-01';
   ```
   
   **Продвинутые запросы:**
   - Агрегатные функции (COUNT, SUM, AVG)
   - GROUP BY и HAVING
   - Подзапросы и CTEs
   - Window functions

4. **ORM и современные подходы (20 мин)**
   - Что такое ORM?
   - Drizzle ORM - type-safe для TypeScript
   - Schema definition и migrations
   - Query builder vs raw SQL
   - Type safety и автодополнение

### Практическая работа:
- Создать схему базы данных для блог-приложения
- Написать SQL запросы для типичных операций
- Настроить Drizzle ORM схему

### Материалы:
- SQL cheat sheet
- PostgreSQL типы данных
- Drizzle ORM документация

---

## Урок 4.5: Облачные платформы и сервисы

**Продолжительность:** 1 час

### Цели урока:
- Понять принципы облачной разработки
- Изучить возможности Vercel и Supabase
- Познакомиться с serverless архитектурой

### Содержание:

1. **Облачные платформы обзор (15 мин)**
   - Infrastructure as a Service (IaaS)
   - Platform as a Service (PaaS)  
   - Software as a Service (SaaS)
   - Backend as a Service (BaaS)
   - Serverless и Function as a Service (FaaS)

2. **Vercel - платформа для фронтенда (20 мин)**
   - Automatic deployments из Git
   - Edge functions и middleware
   - Image optimization
   - Analytics и Web Vitals
   - Preview deployments для PR
   - Environment variables management

3. **Supabase - Backend as a Service (20 мин)**
   - Managed PostgreSQL
   - Real-time subscriptions
   - Authentication из коробки
   - Storage для файлов
   - Edge Functions (Deno runtime)
   - Row Level Security (RLS)

4. **Serverless архитектура (5 мин)**
   - Преимущества serverless
   - Cold starts и их влияние
   - Pricing модель pay-per-use
   - Ограничения и best practices

### Материалы:
- Сравнение облачных провайдеров
- Serverless best practices
- Vercel и Supabase pricing калькуляторы

---

## Урок 4.6: Сторонние сервисы и интеграции

**Продолжительность:** 1 час

### Цели урока:
- Понять экосистему SaaS сервисов
- Изучить основные категории интеграций
- Научиться выбирать подходящие сервисы

### Содержание:

1. **Категории сторонних сервисов (15 мин)**
   - Authentication & Identity (Clerk, Auth0, Firebase Auth)
   - Payments (Stripe, PayPal, Square)
   - Email & Communications (Resend, SendGrid, Twilio)
   - Analytics (Google Analytics, Mixpanel, Posthog)
   - Monitoring (Sentry, LogRocket, Datadog)
   - Search (Algolia, Elasticsearch)

2. **Clerk - аутентификация и управление пользователями (20 мин)**
   - Multi-factor authentication
   - Social logins (Google, GitHub, etc.)
   - User management dashboard
   - Session management
   - Webhooks для синхронизации данных
   - Organizations и roles

3. **Stripe - платежная система (20 мин)**
   - Payment Intents API
   - Subscription billing
   - Webhooks для уведомлений
   - Test mode для разработки
   - Dashboard для управления
   - International payments

4. **API интеграции best practices (5 мин)**
   - API keys безопасность
   - Rate limiting и retry logic
   - Error handling
   - Webhook security (signatures)
   - Environment configuration

### Материалы:
- Список популярных SaaS сервисов по категориям
- API integration patterns
- Security checklist для интеграций

---

## Урок 4.7: Инструменты разработчика

**Продолжительность:** 45 минут

### Цели урока:
- Изучить essential инструменты современного разработчика
- Настроить эффективный workflow
- Понять роль каждого инструмента

### Содержание:

1. **Code Editor и IDE (10 мин)**
   - VS Code расширения для веб-разработки
   - Cursor для ИИ-ассистированной разработки
   - WebStorm/IntelliJ для enterprise разработки
   - Vim/Neovim для продвинутых пользователей

2. **Version Control (10 мин)**
   - Git workflows (feature branches, gitflow)
   - GitHub/GitLab для collaboration
   - Conventional commits
   - Pre-commit hooks (husky, lint-staged)

3. **API Development и тестирование (10 мин)**
   - Postman для REST API testing
   - Insomnia альтернатива
   - Thunder Client VS Code extension
   - curl для command line testing

4. **Browser Developer Tools (10 мин)**
   - Chrome/Firefox DevTools
   - Network tab для API debugging
   - Performance profiling
   - React/Vue DevTools extensions

5. **Command Line Tools (5 мин)**
   - Terminal и shell (zsh, bash)
   - Package managers (npm, yarn, pnpm)
   - Process managers (PM2, nodemon)
   - Utility tools (jq, httpie, gh cli)

### Практическая работа:
Настроить оптимальное рабочее окружение для веб-разработки.

---

## Итоговый проект модуля

**Задание:** Создать comprehensive техническое задание и план для SaaS приложения

**Требования:**

1. **Техническое задание:**
   - Описание функциональности
   - User personas и use cases
   - Technical requirements
   - Performance requirements
   - Security requirements

2. **Архитектурное решение:**
   - Technology stack выбор с обоснованием
   - Database schema design
   - API design с endpoints
   - Frontend architecture
   - Integration plan для сторонних сервисов

3. **Implementation plan:**
   - Development phases
   - Timeline estimation
   - Resource requirements
   - Risk assessment
   - Testing strategy

4. **Infrastructure plan:**
   - Hosting и deployment strategy
   - Monitoring и logging setup
   - Backup и disaster recovery
   - Scalability considerations

### Критерии оценки:
- Полнота технического задания
- Обоснованность выбора технологий
- Реалистичность планов и оценок
- Учет современных best practices
- Качество архитектурного решения

## Полезные ресурсы для изучения

- [The Twelve-Factor App](https://12factor.net/) - принципы построения SaaS приложений
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/) - архитектурные принципы
- [Frontend Checklist](https://frontendchecklist.io/) - чек-лист для фронтенда
- [API Security Checklist](https://github.com/shieldfy/API-Security-Checklist) - безопасность API
- Technology Radar от ThoughtWorks - тренды в технологиях

## Следующие шаги

После завершения этого модуля студенты будут готовы к практической реализации, имея:
- Понимание современной веб-архитектуры
- Зарегистрированные аккаунты во всех сервисах
- Базовые знания технологического стека
- План своего проекта
- Настроенное рабочее окружение

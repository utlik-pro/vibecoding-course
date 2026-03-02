# Модуль 6: Backend для вайбкодера

## Обзор модуля
- **Длительность:** 3 часа (180 минут)
- **Уровень:** Начинающий (zero code background)
- **Практический проект:** Money Tracker (приложение для учёта финансов)
- **Технологии:** Next.js 15 (Server Actions), Supabase, TypeScript

## Что нового в 2026
- **Server Actions** вместо API Routes — бэкенд-логика прямо в компонентах
- **Supabase Edge Functions** — серверные функции на edge
- **AI-assisted backend** — генерация бэкенда через Claude Code / Cursor
- **Supabase MCP** — AI-агенты работают напрямую с базой данных

## Цели обучения
После завершения модуля студенты смогут:
1. Объяснить что такое бэкенд и зачем он нужен
2. Понимать принципы работы API и Server Actions
3. Создавать таблицы в Supabase
4. Писать Server Actions в Next.js с помощью AI
5. Реализовывать CRUD операции без API routes
6. Использовать Supabase Edge Functions
7. Связывать фронтенд с бэкендом современным способом

---

## Урок 6.1: Что такое бэкенд? (15 мин)

### Цели урока
- Понять разницу между фронтендом и бэкендом
- Узнать зачем нужен бэкенд
- Увидеть общую архитектуру веб-приложения

### Содержание
1. **Аналогия "Ресторан"**
   - Фронтенд = зал ресторана (то, что видит клиент)
   - Бэкенд = кухня (где готовится еда)
   - База данных = склад (где хранятся продукты)

2. **Почему нельзя хранить данные только на фронтенде**
   - Безопасность: данные на клиенте доступны всем
   - Синхронизация: данные нужны на разных устройствах
   - Сохранность: закрытие браузера = потеря данных

3. **Что мы построим в этом модуле**
   - Preview Money Tracker приложения
   - Демонстрация работы: добавление, просмотр, удаление транзакций

4. **Архитектура в 2026 году**
   ```
   Пользователь → Браузер (React) → Server Actions (Next.js) → Supabase (PostgreSQL)
   ```
   - Раньше: Фронтенд → API Route → База данных (3 слоя)
   - Сейчас: Фронтенд → Server Action → База данных (проще!)

### Quiz
- Что делает бэкенд?
  - [ ] Отображает красивые кнопки
  - [x] Обрабатывает данные и бизнес-логику
  - [ ] Красит страницу в цвета

---

## Урок 6.2: API и Server Actions (20 мин)

### Цели урока
- Понять что такое API и зачем оно нужно
- Узнать про HTTP методы и JSON
- Познакомиться с Server Actions — современной альтернативой API routes

### Содержание
1. **API как "меню ресторана"**
   - API = список того, что можно заказать у бэкенда
   - Endpoint = конкретное блюдо в меню
   - Request = заказ, Response = готовое блюдо

2. **HTTP методы (через примеры Money Tracker)**
   - `GET` = "Покажи мне мои транзакции"
   - `POST` = "Добавь новый расход"
   - `PATCH/PUT` = "Измени сумму в этой транзакции"
   - `DELETE` = "Удали эту транзакцию"

3. **JSON — язык общения**
   ```json
   {
     "amount": 1200,
     "type": "expense",
     "category": "Кафе",
     "description": "Обед с коллегами"
   }
   ```

4. **Server Actions — революция Next.js 15**
   - Раньше: создавали отдельные файлы API (`/api/transactions/route.ts`)
   - Сейчас: пишем `"use server"` — и функция выполняется на сервере
   - Не нужен fetch, не нужны endpoints — вызываем функцию напрямую
   ```typescript
   "use server"
   async function addTransaction(data: FormData) {
     // Этот код выполняется на СЕРВЕРЕ, не в браузере!
     const amount = data.get('amount');
     await supabase.from('transactions').insert({ amount });
   }
   ```

5. **Практика: исследуем публичный API**
   - Открываем https://jsonplaceholder.typicode.com/posts в браузере
   - Видим JSON данные
   - Понимаем: Server Actions делают то же самое, но проще

### Quiz
- Что делает `"use server"` в Next.js 15?
  - [ ] Запускает отдельный сервер
  - [x] Говорит что функция выполняется на сервере
  - [ ] Создаёт API endpoint
  - [ ] Шифрует данные

---

## Урок 6.3: Что такое база данных? (15 мин)

### Цели урока
- Понять что такое база данных
- Узнать про таблицы, строки и колонки
- Спроектировать структуру таблицы transactions

### Содержание
1. **База данных = "Excel на стероидах"**
   - Таблицы = листы в Excel
   - Строки = отдельные записи (транзакции)
   - Колонки = поля (сумма, категория, дата)

2. **Типы данных**
   - `text` — текст (категория, описание)
   - `numeric` — числа (сумма)
   - `date` — дата
   - `timestamptz` — дата и время с часовым поясом
   - `boolean` — да/нет

3. **Первичный ключ (id)**
   - Уникальный номер каждой записи
   - Как номер паспорта — у каждого свой

4. **Проектируем таблицу transactions**
   | Поле | Тип | Описание |
   |------|-----|----------|
   | id | int8 | Уникальный ID |
   | amount | numeric | Сумма |
   | type | text | "income" или "expense" |
   | category | text | Категория |
   | description | text | Описание |
   | date | date | Дата транзакции |
   | created_at | timestamptz | Когда создана запись |

### Quiz
- Что такое "строка" в базе данных?
  - [ ] Линия кода
  - [x] Одна запись (например, одна транзакция)
  - [ ] Тип данных для текста

---

## Урок 6.4: Настройка Supabase (20 мин)

### Цели урока
- Создать проект в Supabase
- Подключить Supabase к Next.js
- Узнать про новые возможности Supabase в 2026

### Содержание
1. **Что такое Supabase в 2026**
   - Бесплатная облачная база данных + аутентификация + хранилище
   - Под капотом — PostgreSQL
   - Новое: Edge Functions, AI Models API, MCP для AI-агентов
   - Supabase Assistant — оптимизация запросов прямо в Dashboard

2. **Создание проекта** (пошагово)
   - Заходим на supabase.com
   - New Project → "money-tracker"
   - Выбираем регион (ближайший)
   - Создаём пароль для базы данных
   - Ждём создания (~2 мин)

3. **Получение ключей**
   - Settings → API
   - Копируем: Project URL и anon public key

4. **Подключение к проекту**
   ```bash
   npm install @supabase/supabase-js
   ```

5. **Создание файла подключения**
   - Промпт для Cursor/Claude Code:
   ```
   Создай файл lib/supabase.ts для подключения к Supabase.
   Используй переменные окружения:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   Также создай серверный клиент для Server Actions.
   ```

6. **Добавление в .env.local**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   ```

### Checklist
- [ ] Проект создан в Supabase
- [ ] Ключи скопированы
- [ ] Пакет установлен
- [ ] Файл lib/supabase.ts создан (клиентский + серверный)
- [ ] .env.local настроен

---

## Урок 6.5: Создание таблицы транзакций (20 мин)

### Цели урока
- Создать таблицу в Supabase через GUI
- Добавить тестовые данные
- Понять Row Level Security (RLS)

### Содержание
1. **Создание таблицы через Table Editor**
   - Database → Table Editor → New Table
   - Имя: `transactions`
   - Включить Row Level Security: НЕТ (пока)

2. **Добавление колонок**
   | Имя | Тип | Default | Nullable |
   |-----|-----|---------|----------|
   | id | int8 | auto | No |
   | amount | numeric | - | No |
   | type | text | - | No |
   | category | text | - | No |
   | description | text | - | Yes |
   | date | date | now() | No |
   | created_at | timestamptz | now() | No |

3. **Добавление тестовых данных**
   - Insert Row (кнопка)
   - Добавляем 5 записей:
     - Зарплата: amount=50000, type=income, category=Зарплата
     - Кафе: amount=1200, type=expense, category=Еда
     - Такси: amount=350, type=expense, category=Транспорт
     - Фриланс: amount=15000, type=income, category=Подработка
     - Продукты: amount=3500, type=expense, category=Еда

4. **Альтернатива: SQL запрос через AI**
   - Промпт для Cursor/Claude Code:
   ```
   Напиши SQL для создания таблицы transactions в Supabase
   с полями: id, amount, type, category, description, date, created_at.
   Добавь 5 тестовых записей с реалистичными данными.
   ```
   - Вставляем в SQL Editor в Supabase Dashboard

5. **О Row Level Security**
   - Что это: защита данных на уровне строк
   - Почему отключаем сейчас: упрощаем обучение
   - Когда включим: в модуле Auth (Модуль 7)

### Checklist
- [ ] Таблица transactions создана
- [ ] 7 колонок добавлены
- [ ] 5 тестовых записей добавлены
- [ ] RLS отключен

---

## Урок 6.6: Первый Server Action — чтение данных (25 мин)

### Цели урока
- Понять структуру Server Actions в Next.js 15
- Создать action для получения транзакций
- Вывести данные на страницу

### Содержание
1. **Структура Server Actions в Next.js 15**
   ```
   app/
   ├── actions/
   │   └── transactions.ts    ← Server Actions (бэкенд!)
   └── page.tsx               ← Фронтенд (использует actions)
   ```
   - Файл с `"use server"` = бэкенд-код
   - Импортируешь функцию в компонент = она вызывается на сервере

2. **Сравнение: API Routes vs Server Actions**
   | | API Routes (старый подход) | Server Actions (2026) |
   |---|---|---|
   | Файлы | `app/api/transactions/route.ts` | `app/actions/transactions.ts` |
   | Вызов | `fetch('/api/transactions')` | `getTransactions()` |
   | Сложность | Нужен fetch, headers, JSON.parse | Просто вызов функции |
   | Типизация | Ручная | Автоматическая с TypeScript |

3. **Создание Server Action для чтения**
   - Промпт для Cursor/Claude Code:
   ```
   Создай файл app/actions/transactions.ts с Server Action:
   1. Добавь "use server" в начало файла
   2. Функция getTransactions() — получает все транзакции из Supabase
   3. Сортирует по дате (новые первые)
   4. Возвращает массив транзакций
   5. Обрабатывает ошибки
   Используй серверный Supabase клиент из lib/supabase.ts
   ```

4. **Разбор сгенерированного кода**
   ```typescript
   "use server"

   import { createServerSupabase } from '@/lib/supabase'

   export async function getTransactions() {
     const supabase = createServerSupabase()
     const { data, error } = await supabase
       .from('transactions')
       .select('*')
       .order('date', { ascending: false })

     if (error) throw new Error(error.message)
     return data
   }
   ```

5. **Использование в компоненте**
   ```tsx
   import { getTransactions } from '@/app/actions/transactions'

   export default async function Page() {
     const transactions = await getTransactions()
     return <div>{transactions.map(t => <p key={t.id}>{t.category}: {t.amount}</p>)}</div>
   }
   ```

6. **Тестирование**
   - `npm run dev`
   - Открываем localhost:3000
   - Видим список транзакций из Supabase!

### Результат
Данные из базы отображаются на странице — без единого API endpoint.

---

## Урок 6.7: CRUD через Server Actions (30 мин)

### Цели урока
- Добавить создание, обновление и удаление транзакций
- Понять revalidation — автообновление данных
- Реализовать полный CRUD

### Содержание

#### 1. CREATE — добавление транзакции
Промпт для Cursor/Claude Code:
```
Добавь в app/actions/transactions.ts Server Action addTransaction:
- Принимает FormData с полями: amount, type, category, description, date
- Валидирует что amount > 0
- Валидирует что type = "income" или "expense"
- Создаёт запись в Supabase
- Вызывает revalidatePath('/') для обновления страницы
- Возвращает созданную транзакцию
```

Результат:
```typescript
"use server"
import { revalidatePath } from 'next/cache'

export async function addTransaction(formData: FormData) {
  const amount = Number(formData.get('amount'))
  const type = formData.get('type') as string

  if (amount <= 0) throw new Error('Сумма должна быть больше 0')
  if (!['income', 'expense'].includes(type)) throw new Error('Неверный тип')

  const supabase = createServerSupabase()
  const { error } = await supabase.from('transactions').insert({
    amount,
    type,
    category: formData.get('category'),
    description: formData.get('description'),
    date: formData.get('date') || new Date().toISOString()
  })

  if (error) throw new Error(error.message)
  revalidatePath('/')
}
```

#### 2. UPDATE — изменение транзакции
Промпт для Cursor/Claude Code:
```
Добавь Server Action updateTransaction:
- Принимает id (number) и объект с полями для обновления
- Обновляет запись в Supabase по id
- Вызывает revalidatePath('/')
- Если не найдена — бросает ошибку
```

#### 3. DELETE — удаление транзакции
Промпт для Cursor/Claude Code:
```
Добавь Server Action deleteTransaction:
- Принимает id (number)
- Удаляет запись из Supabase
- Вызывает revalidatePath('/')
```

#### 4. Использование в форме (без JavaScript!)
```tsx
<form action={addTransaction}>
  <input name="amount" type="number" required />
  <select name="type">
    <option value="expense">Расход</option>
    <option value="income">Доход</option>
  </select>
  <input name="category" required />
  <button type="submit">Добавить</button>
</form>
```

#### 5. Магия `revalidatePath`
- После добавления/удаления — страница обновляется автоматически
- Не нужен `useState`, `useEffect`, `refetch` — всё за вас делает Next.js

### Checklist
- [ ] addTransaction создаёт записи
- [ ] updateTransaction обновляет записи
- [ ] deleteTransaction удаляет записи
- [ ] Страница обновляется автоматически после каждого действия

---

## Урок 6.8: Supabase Edge Functions и AI (15 мин)

### Цели урока
- Узнать что такое Edge Functions и зачем они нужны
- Увидеть как AI интегрируется в бэкенд
- Понять когда использовать Edge Functions vs Server Actions

### Содержание
1. **Что такое Edge Functions**
   - Серверные функции, которые работают ближе к пользователю (edge)
   - Пишутся на TypeScript/Deno
   - Запускаются по HTTP-запросу или по расписанию (cron)
   - Можно создавать и деплоить прямо из Supabase Dashboard

2. **Когда Edge Functions vs Server Actions**
   | Задача | Server Actions | Edge Functions |
   |--------|---------------|----------------|
   | CRUD операции | ✅ Идеально | Избыточно |
   | Webhook от платёжной системы | ❌ | ✅ Идеально |
   | Отправка email/уведомлений | ❌ | ✅ Идеально |
   | Задачи по расписанию (cron) | ❌ | ✅ Идеально |
   | AI-обработка данных | Можно | ✅ Лучше |

3. **AI Models API в Supabase**
   - Supabase Edge Functions имеют встроенный API для AI-моделей
   - Можно генерировать embeddings, анализировать текст, классифицировать данные
   - Пример: автоматическая категоризация транзакций по описанию

4. **Демо: автокатегоризация расходов**
   ```typescript
   // Supabase Edge Function
   Deno.serve(async (req) => {
     const { description } = await req.json()

     // AI определяет категорию по описанию
     const session = new Supabase.ai.Session('gte-small')
     // ... классификация через embeddings

     return new Response(JSON.stringify({ category: 'Еда' }))
   })
   ```

5. **Supabase MCP — AI управляет базой**
   - Model Context Protocol позволяет AI-агентам (Claude, Cursor) работать с базой напрямую
   - Можно сказать Claude: "Добавь колонку tags в таблицу transactions"
   - AI сам напишет и выполнит SQL

### Quiz
- Когда лучше использовать Edge Functions вместо Server Actions?
  - [ ] Для отображения списка транзакций
  - [x] Для обработки webhook от платёжной системы
  - [ ] Для добавления записи в базу
  - [ ] Для стилизации страницы

---

## Урок 6.9: Собираем Money Tracker (20 мин)

### Цели урока
- Создать полный UI для Money Tracker
- Связать фронтенд с Server Actions
- Получить работающее приложение

### Содержание
1. **Создание UI одним промптом**
   Промпт для Cursor/Claude Code:
   ```
   Создай страницу Money Tracker (app/page.tsx) которая:
   1. Использует Server Actions из app/actions/transactions.ts
   2. Показывает баланс: общий доход, расход и разницу
   3. Список транзакций с цветовой индикацией:
      - Зелёный (#10B981) для доходов со знаком +
      - Красный (#EF4444) для расходов со знаком -
   4. Форма добавления транзакции:
      - Выбор типа (доход/расход) — select
      - Ввод суммы — number input
      - Выбор категории — select с предустановленными вариантами
      - Описание — text input (опционально)
   5. Кнопка удаления (X) у каждой транзакции
   6. Форма отправляется через Server Action (form action={...})
   7. Удаление через Server Action с bind
   8. Используй Tailwind CSS для стилей
   9. Адаптивный дизайн (mobile-first)
   ```

2. **Разбор ключевых паттернов**
   - `async function Page()` — серверный компонент загружает данные
   - `<form action={addTransaction}>` — форма вызывает Server Action
   - `deleteTransaction.bind(null, id)` — передача ID в action
   - Нет `useState`, нет `useEffect`, нет `fetch` — всё просто!

3. **Стилизация**
   - Зелёный цвет для доходов (#10B981)
   - Красный для расходов (#EF4444)
   - Карточки для баланса
   - Адаптивная сетка

4. **Тестирование полного цикла**
   - Добавляем транзакцию через форму → появляется в списке
   - Удаляем транзакцию → исчезает из списка
   - Баланс пересчитывается автоматически
   - Обновляем страницу → данные на месте (из Supabase!)

### Результат
Полностью работающее приложение Money Tracker на современном стеке 2026!

---

## Финальный проект: Money Tracker

### Описание
Полноценное приложение для учёта личных финансов на современном стеке.

### Технологический стек
- **Фронтенд:** Next.js 15, React, Tailwind CSS
- **Бэкенд:** Server Actions (`"use server"`)
- **База данных:** Supabase (PostgreSQL)
- **Деплой:** Vercel

### Требования

#### База данных Supabase
- [ ] Создан проект в Supabase
- [ ] Таблица transactions с правильной структурой
- [ ] Минимум 5 тестовых записей

#### Server Actions (бэкенд)
- [ ] getTransactions() — получить все транзакции
- [ ] addTransaction() — добавить транзакцию с валидацией
- [ ] updateTransaction() — изменить транзакцию
- [ ] deleteTransaction() — удалить транзакцию
- [ ] revalidatePath после каждой мутации

#### Фронтенд
- [ ] Отображение текущего баланса (доход/расход/итого)
- [ ] Список транзакций с цветовой индикацией
- [ ] Форма добавления транзакции
- [ ] Возможность удаления транзакции

#### Деплой
- [ ] Приложение работает на Vercel
- [ ] Environment variables настроены

### Критерии оценки (100 баллов)
| Критерий | Баллы |
|----------|-------|
| Supabase настроен, таблица создана | 10 |
| getTransactions работает | 15 |
| addTransaction с валидацией работает | 15 |
| updateTransaction работает | 10 |
| deleteTransaction работает | 10 |
| Баланс отображается корректно | 10 |
| Список транзакций с цветами | 10 |
| Форма добавления через form action | 10 |
| Задеплоено на Vercel | 10 |

**Бонус:** +10 баллов за фильтрацию по категориям
**Бонус:** +10 баллов за Edge Function (автокатегоризация или статистика)

---

## Тайминг модуля

| Урок | Тема | Время |
|------|------|-------|
| 6.1 | Что такое бэкенд? | 15 мин |
| 6.2 | API и Server Actions | 20 мин |
| 6.3 | Что такое база данных? | 15 мин |
| 6.4 | Настройка Supabase | 20 мин |
| 6.5 | Создание таблицы транзакций | 20 мин |
| 6.6 | Первый Server Action | 25 мин |
| 6.7 | CRUD через Server Actions | 30 мин |
| 6.8 | Edge Functions и AI | 15 мин |
| 6.9 | Собираем Money Tracker | 20 мин |
| **Итого** | | **180 мин (3 часа)** |

---

## Дополнительные ресурсы

### Документация
- [Next.js Server Actions](https://nextjs.org/docs/app/getting-started/updating-data)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Supabase AI & Vectors](https://supabase.com/docs/guides/ai)

### Инструменты
- [Supabase Dashboard](https://supabase.com/dashboard) — управление базой
- [Supabase MCP](https://supabase.com/docs/guides/ai) — AI-интеграция

### Категории для Money Tracker
**Расходы:**
- Еда
- Транспорт
- Развлечения
- Одежда
- Здоровье
- Коммунальные услуги
- Другое

**Доходы:**
- Зарплата
- Подработка
- Подарки
- Инвестиции
- Другое

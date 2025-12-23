# Модуль 6: Backend для вайбкодера

## Обзор модуля
- **Длительность:** ~3 часа
- **Уровень:** Начинающий (zero code background)
- **Практический проект:** Money Tracker (приложение для учёта финансов)
- **Технологии:** Next.js API Routes, Supabase, TypeScript

## Цели обучения
После завершения модуля студенты смогут:
1. Объяснить что такое бэкенд и зачем он нужен
2. Понимать принципы работы API
3. Создавать таблицы в Supabase
4. Писать API routes в Next.js с помощью AI
5. Реализовывать CRUD операции
6. Тестировать API endpoints
7. Связывать фронтенд с бэкендом

---

## Урок 6.1: Что такое бэкенд? (15 мин)

### Цели урока
- Понять разницу между фронтендом и бэкендом
- Узнать зачем нужен бэкенд
- Увидеть общую архитектуру веб-приложения

### Содержание
1. **Аналогия "Ресторан"**
   - Фронтенд = официант (то, что видит клиент)
   - Бэкенд = кухня (где готовится еда)
   - База данных = склад (где хранятся продукты)

2. **Почему нельзя хранить данные только на фронтенде**
   - Безопасность: данные на клиенте доступны всем
   - Синхронизация: данные нужны на разных устройствах
   - Сохранность: закрытие браузера = потеря данных

3. **Что мы построим в этом модуле**
   - Preview Money Tracker приложения
   - Демонстрация работы: добавление, просмотр, удаление транзакций

4. **Архитектура веб-приложения**
   ```
   Пользователь → Браузер (Фронтенд) → API (Бэкенд) → База данных
   ```

### Quiz
- Что делает бэкенд?
  - [ ] Отображает красивые кнопки
  - [x] Обрабатывает данные и бизнес-логику
  - [ ] Красит страницу в цвета

---

## Урок 6.2: Что такое API? (20 мин)

### Цели урока
- Понять что такое API
- Узнать про HTTP методы
- Познакомиться с форматом JSON

### Содержание
1. **API как "меню ресторана"**
   - API = список того, что можно заказать у бэкенда
   - Endpoint = конкретное блюдо в меню
   - Request = заказ
   - Response = готовое блюдо

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

4. **Практика: исследуем публичный API**
   - Открываем https://jsonplaceholder.typicode.com/posts в браузере
   - Видим JSON данные
   - Понимаем структуру ответа

### Quiz
- Какой HTTP метод используется для добавления новой транзакции?
  - [ ] GET
  - [x] POST
  - [ ] DELETE
  - [ ] PATCH

---

## Урок 6.3: Что такое база данных? (20 мин)

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
   - `timestamp` — дата и время
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
   | created_at | timestamp | Когда создана запись |

### Quiz
- Что такое "строка" в базе данных?
  - [ ] Линия кода
  - [x] Одна запись (например, одна транзакция)
  - [ ] Тип данных для текста

---

## Урок 6.4: Настройка Supabase (25 мин)

### Цели урока
- Создать проект в Supabase
- Подключить Supabase к Next.js
- Проверить подключение

### Содержание
1. **Что такое Supabase**
   - Бесплатная облачная база данных
   - Альтернатива Firebase
   - Под капотом — PostgreSQL

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
   - Промпт для Cursor:
   ```
   Создай файл lib/supabase.ts для подключения к Supabase.
   Используй переменные окружения:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
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
- [ ] Файл lib/supabase.ts создан
- [ ] .env.local настроен

---

## Урок 6.5: Создание таблицы транзакций (25 мин)

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

4. **О Row Level Security**
   - Что это: защита данных на уровне строк
   - Почему отключаем сейчас: упрощаем обучение
   - Когда включим: в модуле Auth (Модуль 7)

### Checklist
- [ ] Таблица transactions создана
- [ ] 7 колонок добавлены
- [ ] 5 тестовых записей добавлены
- [ ] RLS отключен

---

## Урок 6.6: Первый API Route (30 мин)

### Цели урока
- Понять структуру API в Next.js
- Создать GET endpoint
- Протестировать в браузере

### Содержание
1. **Структура API в Next.js (App Router)**
   ```
   app/
   └── api/
       └── transactions/
           └── route.ts    ← наш API endpoint
   ```
   - Путь папки = URL endpoint
   - `/api/transactions` → `app/api/transactions/route.ts`

2. **Создание GET endpoint**
   - Промпт для Cursor:
   ```
   Создай API route /api/transactions который:
   1. Подключается к Supabase
   2. Получает все записи из таблицы transactions
   3. Сортирует по дате (новые первые)
   4. Возвращает их как JSON
   5. Обрабатывает ошибки
   ```

3. **Разбор сгенерированного кода**
   - `export async function GET()` — обработчик GET запросов
   - `supabase.from('transactions').select('*')` — запрос к БД
   - `NextResponse.json()` — формирование ответа

4. **Тестирование в браузере**
   - Запускаем `npm run dev`
   - Открываем http://localhost:3000/api/transactions
   - Видим JSON с нашими транзакциями!

### Результат
Работающий API endpoint, который возвращает данные из базы.

---

## Урок 6.7: CRUD операции (40 мин)

### Цели урока
- Добавить POST, PATCH, DELETE методы
- Понять структуру динамических routes
- Реализовать полный CRUD

### Содержание

#### 1. CREATE (POST) — добавление транзакции
Промпт для Cursor:
```
Добавь в /api/transactions обработку POST запроса:
- Принимает JSON с полями: amount, type, category, description, date
- Валидирует что amount > 0
- Валидирует что type = "income" или "expense"
- Создаёт новую транзакцию в Supabase
- Возвращает созданную транзакцию с кодом 201
```

#### 2. UPDATE (PATCH) — изменение транзакции
Создаём динамический route: `app/api/transactions/[id]/route.ts`

Промпт для Cursor:
```
Создай /api/transactions/[id]/route.ts с PATCH методом:
- Получает id из параметров URL
- Принимает JSON с полями для обновления
- Обновляет транзакцию по id в Supabase
- Возвращает обновлённую транзакцию
- Если транзакция не найдена — возвращает 404
```

#### 3. DELETE — удаление транзакции
Промпт для Cursor:
```
Добавь DELETE метод в /api/transactions/[id]/route.ts:
- Получает id из параметров URL
- Удаляет транзакцию из Supabase
- Возвращает { success: true }
- Если транзакция не найдена — возвращает 404
```

#### 4. Структура файлов после урока
```
app/api/
└── transactions/
    ├── route.ts           # GET (все), POST (создать)
    └── [id]/
        └── route.ts       # GET (один), PATCH, DELETE
```

### Checklist
- [ ] POST /api/transactions работает
- [ ] PATCH /api/transactions/[id] работает
- [ ] DELETE /api/transactions/[id] работает

---

## Урок 6.8: Тестирование API (25 мин)

### Цели урока
- Научиться тестировать API без фронтенда
- Установить и использовать Thunder Client
- Понять HTTP коды ответов

### Содержание
1. **Установка Thunder Client**
   - VS Code / Cursor → Extensions
   - Поиск: "Thunder Client"
   - Install

2. **Создание коллекции**
   - New Request → Collections → New Collection
   - Название: "Money Tracker API"

3. **Тестирование GET**
   - New Request
   - Method: GET
   - URL: http://localhost:3000/api/transactions
   - Send → видим список транзакций

4. **Тестирование POST**
   - New Request
   - Method: POST
   - URL: http://localhost:3000/api/transactions
   - Body → JSON:
   ```json
   {
     "amount": 500,
     "type": "expense",
     "category": "Развлечения",
     "description": "Кино"
   }
   ```
   - Send → видим созданную транзакцию

5. **Тестирование PATCH**
   - Method: PATCH
   - URL: http://localhost:3000/api/transactions/1
   - Body:
   ```json
   {
     "amount": 600
   }
   ```

6. **Тестирование DELETE**
   - Method: DELETE
   - URL: http://localhost:3000/api/transactions/1

7. **HTTP коды ответов**
   - `200` — OK (успешный GET, PATCH)
   - `201` — Created (успешный POST)
   - `400` — Bad Request (неверные данные)
   - `404` — Not Found (не найдено)
   - `500` — Server Error (ошибка сервера)

### Checklist
- [ ] Thunder Client установлен
- [ ] GET работает и возвращает 200
- [ ] POST создаёт запись и возвращает 201
- [ ] PATCH обновляет и возвращает 200
- [ ] DELETE удаляет и возвращает 200

---

## Урок 6.9: Связь фронтенда с бэкендом (30 мин)

### Цели урока
- Научиться вызывать API из React
- Создать UI для Money Tracker
- Реализовать полный цикл работы с данными

### Содержание
1. **fetch() — вызов API из JavaScript**
   ```javascript
   // GET запрос
   const response = await fetch('/api/transactions');
   const data = await response.json();

   // POST запрос
   await fetch('/api/transactions', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ amount: 100, type: 'expense', category: 'Еда' })
   });
   ```

2. **Создание компонента TransactionList**
   Промпт для Cursor:
   ```
   Создай компонент TransactionList который:
   1. Загружает транзакции из /api/transactions при монтировании
   2. Показывает текущий баланс (сумма income минус expense)
   3. Отображает список транзакций с категорией, суммой и датой
   4. Доходы показывает зелёным цветом (+), расходы красным (-)
   5. Имеет форму для добавления новой транзакции:
      - Выбор типа (доход/расход)
      - Ввод суммы
      - Выбор категории
      - Описание (опционально)
   6. Позволяет удалить транзакцию (кнопка X)
   7. Показывает loading состояние при загрузке
   8. Обновляет список после добавления/удаления
   ```

3. **Интеграция в страницу**
   - Добавляем компонент на главную страницу
   - Проверяем работу всех функций

4. **Стилизация**
   - Зелёный цвет для доходов (#10B981)
   - Красный для расходов (#EF4444)
   - Карточки для транзакций
   - Выделение баланса

### Результат
Полностью работающее приложение Money Tracker!

---

## Финальный проект: Money Tracker

### Описание
Полноценное приложение для учёта личных финансов с бэкендом.

### Требования

#### База данных Supabase
- [ ] Создан проект в Supabase
- [ ] Таблица transactions с правильной структурой
- [ ] Минимум 5 тестовых записей

#### API Endpoints
- [ ] GET /api/transactions — получить все транзакции
- [ ] POST /api/transactions — добавить транзакцию
- [ ] PATCH /api/transactions/[id] — изменить транзакцию
- [ ] DELETE /api/transactions/[id] — удалить транзакцию

#### Фронтенд
- [ ] Отображение текущего баланса
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
| GET /api/transactions работает | 15 |
| POST /api/transactions работает | 15 |
| PATCH /api/transactions/[id] работает | 10 |
| DELETE /api/transactions/[id] работает | 10 |
| Баланс отображается корректно | 10 |
| Список транзакций отображается | 10 |
| Форма добавления работает | 10 |
| Задеплоено на Vercel | 10 |

**Бонус:** +10 баллов за фильтрацию по категориям

---

## Дополнительные ресурсы

### Документация
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

### Инструменты
- [Thunder Client](https://www.thunderclient.com/) — тестирование API
- [Postman](https://www.postman.com/) — альтернатива Thunder Client

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

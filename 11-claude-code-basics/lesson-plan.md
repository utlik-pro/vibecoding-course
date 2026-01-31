# Модуль 11: Claude Code - Быстрый старт

## Обзор модуля
- **Длительность:** ~3 часа (5 уроков)
- **Уровень:** Полные новички (zero code background)
- **Практический проект:** SaaS Landing Page
- **Источник:** Официальная документация https://code.claude.com/docs

## Цели обучения
После завершения модуля студенты смогут:
1. Установить Claude Code на свой компьютер
2. Понимать основные workflow работы с Claude Code
3. Создавать и настраивать CLAUDE.md для проекта
4. Настраивать разрешения и выбирать модели
5. Создавать проекты с помощью промптов

## Структура модуля

| Часть | Уроки | Тема |
|-------|-------|------|
| A | 11.1 - 11.2 | Установка и Workflows |
| B | 11.3 - 11.4 | Память и Настройки |
| C | 11.5 | Практический спринт |

---

# Часть A: Знакомство с Claude Code

---

## Урок 11.1: Установка и первый запуск (30 мин)
**Источник:** https://code.claude.com/docs/en/quickstart

### Цели урока
- Установить Claude Code на компьютер
- Авторизоваться в системе
- Понять базовые команды и навигацию

### Содержание

#### 1. Что такое Claude Code? (5 мин)

**Claude Code — это AI-ассистент для программирования, работающий в терминале.**

В отличие от ChatGPT или Claude.ai в браузере:

| ChatGPT/Claude.ai | Claude Code |
|-------------------|-------------|
| Работает в браузере | Работает в терминале |
| Копируете код вручную | Пишет код прямо в файлы |
| Не видит ваш проект | Видит весь проект |
| Нужно объяснять контекст | Сам понимает структуру |

**Где ещё работает Claude Code:**
- В браузере: https://claude.ai/code
- Desktop приложение
- VS Code расширение
- JetBrains плагины
- Slack интеграция

#### 2. Установка Claude Code (10 мин)

**Требования:**
- macOS, Linux или Windows
- Подписка Claude Pro/Max/Teams ($20+/мес) или API ключ

**Установка (выберите способ):**

**macOS / Linux / WSL:**
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows PowerShell:**
```powershell
irm https://claude.ai/install.ps1 | iex
```

**Homebrew (macOS):**
```bash
brew install --cask claude-code
```

**Проверка установки:**
```bash
claude --version
```

#### 3. Первый запуск и авторизация (5 мин)

**Шаг 1: Запуск в папке проекта**
```bash
cd your-project
claude
```

**Шаг 2: Авторизация**
При первом запуске откроется браузер для авторизации.

Поддерживаемые аккаунты:
- Claude Pro, Max, Teams, Enterprise
- Claude Console (API с предоплаченными кредитами)
- Amazon Bedrock, Google Vertex AI

**Шаг 3: Смена аккаунта (при необходимости)**
```
/login
```

#### 4. Базовые команды (5 мин)

**Основные slash-команды:**
| Команда | Описание |
|---------|----------|
| `/help` | Показать все команды |
| `/clear` | Очистить контекст (начать заново) |
| `/login` | Сменить аккаунт |
| `/init` | Создать CLAUDE.md для проекта |
| `/compact` | Сжать контекст |

**Навигация:**
| Действие | Клавиши |
|----------|---------|
| Отправить сообщение | `Enter` |
| Новая строка | `Shift+Enter` |
| Остановить действие | `Esc` |
| Выйти | `exit` или `Ctrl+C` |
| Показать shortcuts | `?` |

#### 5. Практика: Первые вопросы (5 мин)

**Задайте Claude вопросы о проекте:**

```
What does this project do?
```

```
What technologies does this project use?
```

```
Explain the folder structure
```

**Можно спрашивать о самом Claude:**

```
What can Claude Code do?
```

### Домашнее задание
1. Установите Claude Code
2. Запустите в любом проекте
3. Задайте 3 вопроса о проекте

---

## Урок 11.2: Основные Workflows (45 мин)
**Источник:** https://code.claude.com/docs/en/common-workflows

### Цели урока
- Научиться изучать кодбейз
- Вносить изменения в код
- Использовать Git интеграцию
- Понять Plan Mode

### Содержание

#### 1. Изучение кодбейза (10 мин)

**Claude Code умеет исследовать ваш проект:**

```
What does this project do?
```

```
Where is the main entry point?
```

```
How does authentication work in this project?
```

**Claude сам решает какие файлы читать!** Не нужно указывать пути вручную.

#### 2. Внесение изменений (10 мин)

**Простое изменение:**
```
Add a hello world function to the main file
```

Claude:
1. Найдёт нужный файл
2. Покажет предлагаемые изменения (diff)
3. Спросит разрешение
4. Внесёт изменение

**Более сложное:**
```
Add input validation to the user registration form
```

```
There's a bug where users can submit empty forms - fix it
```

#### 3. Git интеграция (10 мин)

**Просмотр изменений:**
```
What files have I changed?
```

**Создание коммита:**
```
Commit my changes with a descriptive message
```

**Работа с ветками:**
```
Create a new branch called feature/login
```

```
Show me the last 5 commits
```

```
Help me resolve merge conflicts
```

#### 4. Plan Mode (10 мин)

**Зачем нужен:** Разделить исследование и выполнение.

**Workflow:**
1. **Explore** — изучаем код в Plan Mode
2. **Plan** — создаём план реализации
3. **Implement** — выполняем план
4. **Commit** — сохраняем результат

**Переключение:**
- `Ctrl+G` — переключиться в Plan Mode
- В Plan Mode Claude только читает файлы, не изменяет

**Пример:**
```
(Plan Mode) Read /src/auth and understand how we handle sessions.
I want to add Google OAuth. What files need to change? Create a plan.
```

Затем переключаемся в Normal Mode:
```
(Normal Mode) Implement the OAuth flow from your plan.
```

#### 5. Практика: Создаём компонент (5 мин)

**Задание:**
```
Create a Button component with three variants: primary, secondary, and outline.
Use TypeScript and Tailwind CSS.
```

### Домашнее задание
1. Изучите кодбейз проекта через Claude
2. Создайте простой компонент
3. Сделайте коммит через Claude

---

# Часть B: Настройка проекта

---

## Урок 11.3: CLAUDE.md - память проекта (30 мин)
**Источник:** https://code.claude.com/docs/en/memory

### Цели урока
- Понять что такое CLAUDE.md и зачем нужен
- Создать CLAUDE.md через `/init`
- Научиться использовать @imports

### Содержание

#### 1. Что такое CLAUDE.md? (5 мин)

**CLAUDE.md — это инструкция для Claude о вашем проекте.**

Когда вы запускаете `claude`, он автоматически читает CLAUDE.md и понимает:
- Технологический стек
- Правила стиля кода
- Команды для сборки/тестов
- Что НЕ делать

**Аналогия:**
```
CLAUDE.md = Должностная инструкция для сотрудника

Без инструкции: "Сделай что-нибудь хорошее"
С инструкцией: "Мы используем React + TypeScript,
               пишем тесты, комментарии на русском"
```

#### 2. Команда /init (5 мин)

**Самый простой способ создать CLAUDE.md:**

```bash
cd your-project
claude
/init
```

Claude проанализирует проект и создаст CLAUDE.md автоматически!

**Что Claude определит сам:**
- Язык программирования
- Фреймворки
- Систему сборки
- Структуру папок

#### 3. Иерархия файлов (5 мин)

CLAUDE.md можно размещать на разных уровнях:

| Расположение | Применяется |
|-------------|-------------|
| `~/.claude/CLAUDE.md` | Ко всем проектам |
| `./CLAUDE.md` | К текущему проекту |
| `./subfolder/CLAUDE.md` | К подпапке |

**Приоритет:** более конкретные файлы важнее общих.

#### 4. Синтаксис @imports (5 мин)

**Подключение других файлов:**

```markdown
# Project: My SaaS

See @README.md for project overview.
See @package.json for available commands.

## Additional Instructions
- Git workflow: @docs/git-instructions.md
- Personal overrides: @~/.claude/my-project-instructions.md
```

#### 5. Что включать в CLAUDE.md (5 мин)

**Включать:**
- Bash команды, которые Claude не угадает
- Правила стиля кода, отличающиеся от стандартных
- Инструкции по тестированию
- Архитектурные решения
- Чего НЕ делать

**НЕ включать:**
- Что Claude может понять из кода
- Стандартные конвенции языка
- Подробную документацию API
- Информацию которая часто меняется

**Пример:**
```markdown
# Project: SaaS Analytics Dashboard

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

## Commands
- `npm run dev` - dev server
- `npm run build` - production build
- `npm run lint` - check code

## Rules
- Use 'use client' only when needed
- All text in Russian
- Add loading.tsx for pages

## Don't
- Don't create files without asking
- Don't change ESLint config
```

#### 6. Практика: CLAUDE.md для SaaS проекта (5 мин)

**Создаём CLAUDE.md:**

```markdown
# Project: SaaS Analytics Dashboard

## Overview
SaaS приложение с landing page и dashboard.
Курс VibeCoding, модуль 11-12.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Recharts для графиков

## Commands
- `npm run dev` - localhost:3000
- `npm run build` - сборка
- `npm run lint` - проверка кода

## Code Style
- Функциональные компоненты
- Tailwind для стилей
- Файлы: kebab-case
- Компоненты: PascalCase

## Rules
- 'use client' только для интерактивности
- Все тексты на русском
- Server components где возможно
```

### Домашнее задание
1. Запустите `/init` в проекте
2. Изучите сгенерированный CLAUDE.md
3. Добавьте свои правила

---

## Урок 11.4: Настройки и разрешения (30 мин)
**Источник:** https://code.claude.com/docs/en/settings

### Цели урока
- Понять систему настроек Claude Code
- Настроить разрешения (permissions)
- Выбрать модель

### Содержание

#### 1. Иерархия настроек (5 мин)

**Четыре уровня (от высшего к низшему):**

| Уровень | Расположение | Описание |
|---------|-------------|----------|
| Managed | Системные папки | IT администраторы |
| User | `~/.claude/settings.json` | Ваши личные |
| Project | `.claude/settings.json` | Для команды (в git) |
| Local | `.claude/settings.local.json` | Личные в проекте |

**Приоритет:** Local > Project > User > Managed

#### 2. Permissions - новый формат (10 мин)

**Структура:**
```json
{
  "permissions": {
    "allow": ["Bash(npm run *)", "Read"],
    "deny": ["Bash(rm -rf *)", "Read(./.env)"],
    "ask": ["Bash(git push *)"]
  }
}
```

**Порядок проверки (первое совпадение):**
1. deny (высший приоритет)
2. ask
3. allow (низший приоритет)

**Примеры правил:**
| Правило | Что разрешает |
|---------|---------------|
| `Read` | Читать любые файлы |
| `Write` | Создавать файлы |
| `Edit` | Редактировать файлы |
| `Bash(npm run *)` | npm команды |
| `Bash(git *)` | Git команды |
| `Read(./.env)` | Конкретный файл |

**Команда `/permissions`** — интерактивная настройка.

#### 3. Выбор модели (5 мин)

**Доступные модели:**
| Модель | Когда использовать |
|--------|-------------------|
| **Sonnet** | Быстрые задачи, рутина (по умолчанию) |
| **Opus** | Сложные задачи, архитектура |
| **Haiku** | Очень простые задачи |

**Выбор модели:**
```bash
# Через флаг
claude --model opus

# В настройках
{
  "model": "claude-sonnet-4-5-20250929"
}
```

#### 4. Полезные настройки (5 мин)

**Пример settings.json:**
```json
{
  "permissions": {
    "allow": [
      "Read",
      "Write",
      "Edit",
      "Bash(npm run *)",
      "Bash(git add *)",
      "Bash(git commit *)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Read(./.env)",
      "Read(./secrets/**)"
    ],
    "ask": [
      "Bash(git push *)"
    ]
  },
  "model": "claude-sonnet-4-5-20250929"
}
```

**Дополнительные опции:**
- `cleanupPeriodDays` - период хранения сессий
- `language` - язык ответов
- `showTurnDuration` - показывать время выполнения

#### 5. Практика: Настройка проекта (5 мин)

**Создаём `.claude/settings.json`:**
```json
{
  "permissions": {
    "allow": [
      "Read",
      "Write",
      "Edit",
      "Bash(npm run *)",
      "Bash(git add *)",
      "Bash(git commit *)"
    ],
    "deny": [
      "Read(./.env)"
    ]
  }
}
```

**Создаём `.claude/settings.local.json`** (личные):
```json
{
  "model": "opus"
}
```

Добавьте `.claude/settings.local.json` в `.gitignore`!

### Домашнее задание
1. Создайте файл настроек
2. Настройте разрешения под свои нужды
3. Попробуйте разные модели

---

# Часть C: Практика

---

## Урок 11.5: Практика - Landing Page (45 мин)

### Цели урока
- Создать полноценный landing page
- Отработать навыки работы с Claude Code
- Подготовить базу для Dashboard (Модуль 12)

### Содержание

#### 1. План Landing Page (5 мин)

**Структура:**
```
Hero Section
├── Заголовок + подзаголовок
├── CTA кнопка
└── Иллюстрация

Features Section
├── Карточка 1: Аналитика
├── Карточка 2: Отчёты
└── Карточка 3: Интеграции

Pricing Section
├── Free план
├── Pro план
└── Enterprise

Footer
├── Ссылки
└── Копирайт
```

#### 2. Создание проекта (10 мин)

**Шаг 1: Инициализация**
```bash
mkdir saas-landing && cd saas-landing
claude
```

**Шаг 2: Создаём CLAUDE.md**
```
/init
```

**Шаг 3: Промпт для Landing**
```
Создай landing page для SaaS Analytics Dashboard.

## Дизайн
- Современный, минималистичный
- Основной цвет: синий (#3B82F6)
- Акцент: зелёный (#10B981)

## Hero секция
Заголовок: "Аналитика, которая работает на вас"
Подзаголовок: "Отслеживайте метрики, создавайте отчёты"
CTA: "Начать бесплатно" + "Посмотреть демо"

## Features (3 карточки)
1. Дашборд в реальном времени
2. Простые отчёты
3. Интеграции

## Pricing
- Free: 0₽/мес
- Pro: 1490₽/мес
- Enterprise: по запросу

Используй Next.js 14, TypeScript, Tailwind CSS.
```

#### 3. Итерации (15 мин)

**Улучшения:**
```
Добавь анимации при скролле
```

```
Сделай адаптив для мобильных
```

```
Добавь градиент в hero секцию
```

```
Добавь форму подписки на email в footer
```

#### 4. SEO и метаданные (5 мин)

```
Добавь метаданные для SEO: title, description, og:image
```

```
Создай простой favicon
```

#### 5. Git и сохранение (5 мин)

**Инициализация Git:**
```
Initialize git repository
```

**Коммит:**
```
Commit with message: feat: SaaS landing page
```

#### 6. Проверка (5 мин)

```
Проверь что все ссылки работают
```

```
Убедись что страница корректно отображается на мобильных
```

### Результат модуля

После модуля 11 у вас есть:

1. **Установленный Claude Code** с настроенными разрешениями
2. **CLAUDE.md** файл для проекта
3. **Landing page** для SaaS Analytics Dashboard
4. **Понимание** основных возможностей Claude Code

---

## Итоговый проект модуля

**Задание:** Landing page для SaaS Analytics Dashboard

**Требования:**
1. Hero секция с CTA
2. Минимум 3 feature карточки
3. Pricing таблица (минимум 2 тарифа)
4. Footer с навигацией
5. Адаптивный дизайн
6. Код на GitHub

**Критерии оценки:**
- Код создан через Claude Code
- Есть CLAUDE.md файл
- Настроены разрешения
- Сделан минимум 3 коммита
- Страница работает на мобильных

---

## Полезные ресурсы

- [Официальная документация](https://code.claude.com/docs)
- [Quickstart Guide](https://code.claude.com/docs/en/quickstart)
- [Best Practices](https://code.claude.com/docs/en/best-practices)
- [Common Workflows](https://code.claude.com/docs/en/common-workflows)

## Переход к модулю 12

В следующем модуле изучим продвинутые возможности:
- MCP серверы для интеграций
- Skills для автоматизации
- Субагенты для параллельной работы
- Hooks для автоматических действий

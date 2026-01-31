# Модуль 12: Claude Code - Продвинутый уровень

## Обзор модуля
- **Длительность:** ~3 часа (6 уроков)
- **Уровень:** Продвинутый
- **Практический проект:** SaaS Dashboard
- **Источник:** Официальная документация https://code.claude.com/docs

## Цели обучения
После завершения модуля студенты смогут:
1. Подключать и использовать MCP серверы
2. Создавать собственные Skills
3. Работать с субагентами
4. Настраивать Hooks для автоматизации
5. Применять Best Practices из официальной документации

## Структура модуля

| Часть | Уроки | Тема |
|-------|-------|------|
| A | 12.1 - 12.2 | MCP серверы и Skills |
| B | 12.3 - 12.4 | Субагенты и Hooks |
| C | 12.5 - 12.6 | Практика и Best Practices |

---

# Часть A: Расширение возможностей

---

## Урок 12.1: MCP серверы (45 мин)
**Источник:** https://code.claude.com/docs/en/mcp

### Цели урока
- Понять что такое MCP (Model Context Protocol)
- Научиться подключать MCP серверы через CLI
- Использовать популярные интеграции

### Содержание

#### 1. Что такое MCP? (10 мин)

**MCP (Model Context Protocol) — открытый стандарт для подключения AI к внешним инструментам.**

С MCP Claude Code может:
- Работать с GitHub (создавать PR, issues)
- Подключаться к базам данных
- Интегрироваться с Figma, Notion, Slack
- Мониторить ошибки через Sentry

**Примеры использования:**
```
"Add the feature described in JIRA issue ENG-4521"
"Query our PostgreSQL database for active users"
"Update the email template based on Figma designs"
```

#### 2. Подключение MCP серверов (15 мин)

**Способ 1: HTTP сервер (рекомендуется)**
```bash
claude mcp add --transport http <name> <url>

# Пример: GitHub
claude mcp add --transport http github https://api.githubcopilot.com/mcp/

# С авторизацией
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
```

**Способ 2: Stdio сервер (локальный)**
```bash
claude mcp add --transport stdio <name> -- <command>

# Пример: PostgreSQL
claude mcp add --transport stdio db -- npx -y @bytebase/dbhub \
  --dsn "postgresql://user:pass@localhost/db"

# С переменными окружения
claude mcp add --transport stdio airtable \
  --env AIRTABLE_API_KEY=YOUR_KEY \
  -- npx -y airtable-mcp-server
```

**Управление серверами:**
```bash
# Список серверов
claude mcp list

# Детали сервера
claude mcp get github

# Удаление
claude mcp remove github

# Статус в Claude Code
/mcp
```

#### 3. Scopes (области видимости) (5 мин)

| Scope | Расположение | Описание |
|-------|-------------|----------|
| `local` | `~/.claude.json` (проект) | Только для вас в этом проекте |
| `project` | `.mcp.json` | Для всей команды (в git) |
| `user` | `~/.claude.json` | Для вас во всех проектах |

```bash
# Добавить как project-scope
claude mcp add --scope project --transport http github https://...
```

#### 4. Популярные MCP серверы (10 мин)

**GitHub:**
```bash
claude mcp add --transport http github https://api.githubcopilot.com/mcp/
```
- Создание PR и issues
- Просмотр коммитов
- Code review

**Sentry (мониторинг ошибок):**
```bash
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
# Затем в Claude Code:
/mcp
# Выбрать "Authenticate" для Sentry
```

**PostgreSQL:**
```bash
claude mcp add --transport stdio db -- npx -y @bytebase/dbhub \
  --dsn "postgresql://readonly:pass@prod.db.com:5432/analytics"
```

**Notion:**
```bash
claude mcp add --transport http notion https://mcp.notion.com/mcp
```

#### 5. Практика: Подключаем GitHub (5 мин)

```bash
# 1. Добавляем GitHub MCP
claude mcp add --transport http github https://api.githubcopilot.com/mcp/

# 2. Запускаем Claude Code
claude

# 3. Аутентификация
/mcp
# Выбираем "Authenticate" для GitHub

# 4. Тестируем
> Show me my recent repositories
> Create an issue in my-project: "Fix login bug"
```

### Домашнее задание
1. Подключите GitHub MCP
2. Создайте issue через Claude Code
3. Попробуйте другой MCP сервер

---

## Урок 12.2: Skills - свои команды (45 мин)
**Источник:** https://code.claude.com/docs/en/skills

### Цели урока
- Понять структуру SKILL.md
- Создать собственные slash-команды
- Использовать frontmatter опции

### Содержание

#### 1. Что такое Skills? (5 мин)

**Skills — расширения возможностей Claude через markdown файлы.**

Два типа:
- **Reference** — знания, которые Claude применяет автоматически
- **Task** — команды, которые вы вызываете через `/name`

```
.claude/skills/deploy/SKILL.md → вызов через /deploy
.claude/skills/api-conventions/SKILL.md → Claude использует автоматически
```

#### 2. Структура SKILL.md (10 мин)

**Расположение:**
```
.claude/skills/
├── deploy/
│   └── SKILL.md
├── test/
│   └── SKILL.md
└── review/
    └── SKILL.md
```

**Формат файла:**
```yaml
---
name: deploy
description: Deploy the application to production
disable-model-invocation: true
allowed-tools: Bash(npm *), Bash(vercel *)
---

Deploy the application:

1. Run the test suite
2. Build the application
3. Deploy to Vercel with `vercel --prod`
4. Return the deployment URL
```

#### 3. Frontmatter опции (10 мин)

| Опция | Описание | Пример |
|-------|----------|--------|
| `name` | Имя skill (= /команда) | `deploy` |
| `description` | Когда использовать | `Deploy the app` |
| `disable-model-invocation` | Только ручной вызов | `true` |
| `allowed-tools` | Разрешённые инструменты | `Bash(npm *)` |
| `context` | Запуск в subagent | `fork` |
| `agent` | Тип агента при context: fork | `Explore` |

**`disable-model-invocation: true`** — важно для skills с side effects:
- `/deploy` — деплой не должен запускаться случайно
- `/commit` — коммит только по команде
- `/send-slack` — отправка сообщений

#### 4. Примеры Skills (10 мин)

**Skill: /deploy**
```yaml
---
name: deploy
description: Deploy the application to production
disable-model-invocation: true
allowed-tools: Bash(npm *), Bash(vercel *)
---

Deploy $ARGUMENTS to production:

1. Run `npm run build`
2. If successful, run `vercel --prod`
3. Return the deployment URL
```

**Skill: /review (в subagent)**
```yaml
---
name: review
description: Code review with security focus
context: fork
agent: Explore
---

Review the code for:
1. Security issues (injection, XSS)
2. Performance problems
3. Code style violations

Provide specific line references.
```

**Skill: /fix-issue**
```yaml
---
name: fix-issue
description: Fix a GitHub issue
disable-model-invocation: true
---

Fix GitHub issue $ARGUMENTS:

1. Use `gh issue view` to get details
2. Understand the problem
3. Implement the fix
4. Write tests
5. Create a commit
6. Push and create a PR
```

**Переменные:**
- `$ARGUMENTS` — всё после /команды
- `$ARGUMENTS[0]`, `$ARGUMENTS[1]` — по индексу
- `$0`, `$1` — сокращённая форма

#### 5. Практика: Создаём Skills (10 мин)

**Создаём структуру:**
```bash
mkdir -p .claude/skills/deploy
mkdir -p .claude/skills/test
mkdir -p .claude/skills/review
```

**Создаём .claude/skills/deploy/SKILL.md:**
```yaml
---
name: deploy
description: Deploy to Vercel
disable-model-invocation: true
allowed-tools: Bash(npm *), Bash(vercel *)
---

# Deploy

1. Run `npm run build`
2. If successful, run `vercel --prod`
3. Return the URL
```

**Тестируем:**
```bash
claude
> /deploy
```

### Домашнее задание
1. Создайте минимум 3 Skills
2. Используйте `disable-model-invocation` для одного
3. Попробуйте `context: fork`

---

# Часть B: Продвинутые возможности

---

## Урок 12.3: Субагенты (45 мин)
**Источник:** https://code.claude.com/docs/en/sub-agents

### Цели урока
- Понять концепцию субагентов
- Создать собственных агентов
- Использовать для изоляции контекста

### Содержание

#### 1. Зачем нужны субагенты? (10 мин)

**Субагенты — изолированные контексты для выполнения задач.**

Преимущества:
- **Изоляция** — не засоряют основной контекст
- **Специализация** — настроены под конкретные задачи
- **Параллельность** — могут работать одновременно

**Когда использовать:**
- Исследование кодбейза (много файлов)
- Code review
- Параллельные проверки

#### 2. Встроенные субагенты (10 мин)

| Тип | Описание | Инструменты |
|-----|----------|-------------|
| `Explore` | Исследование кода | Read, Glob, Grep |
| `Plan` | Планирование | Read, Glob, Grep |
| `general-purpose` | Универсальный | Все |

**Использование:**
```
> Use a subagent to analyze how authentication works

> Use subagents in parallel:
  1. Check all API endpoints
  2. Find security issues
  3. Look for unused code
```

#### 3. Создание своих субагентов (15 мин)

**Расположение:** `.claude/agents/`

**Формат:**
```markdown
# .claude/agents/security-reviewer.md
---
name: security-reviewer
description: Reviews code for security vulnerabilities
tools: Read, Grep, Glob, Bash
model: opus
---

You are a senior security engineer.

Review code for:
- Injection vulnerabilities (SQL, XSS, command injection)
- Authentication and authorization flaws
- Secrets or credentials in code
- Insecure data handling

Provide specific line references and suggested fixes.
```

**Frontmatter опции:**
| Опция | Описание |
|-------|----------|
| `name` | Имя агента |
| `description` | Когда использовать |
| `tools` | Доступные инструменты |
| `model` | Модель (sonnet, opus, haiku) |

**Использование:**
```
> Use security-reviewer subagent to review the auth module
```

#### 4. Skills с subagents (5 мин)

**Skill может запускаться в subagent:**

```yaml
---
name: deep-research
description: Research a topic thoroughly
context: fork
agent: Explore
---

Research $ARGUMENTS thoroughly:

1. Find relevant files using Glob and Grep
2. Read and analyze the code
3. Summarize findings with file references
```

`context: fork` — skill работает в изолированном контексте.

#### 5. Практика: Создаём агента (5 мин)

**Создаём .claude/agents/code-reviewer.md:**
```markdown
---
name: code-reviewer
description: Expert code reviewer
tools: Read, Grep, Glob
model: sonnet
---

You are a senior code reviewer.

Review for:
- Code quality
- Best practices
- Potential bugs
- Performance issues

Be specific with line numbers.
```

**Тестируем:**
```
> Use code-reviewer to review my recent changes
```

### Домашнее задание
1. Создайте 2 своих субагента
2. Используйте параллельные субагенты
3. Создайте skill с `context: fork`

---

## Урок 12.4: Hooks - автоматизация (30 мин)
**Источник:** https://code.claude.com/docs/en/hooks

### Цели урока
- Понять систему Hooks
- Настроить автоматические действия
- Использовать `/hooks` команду

### Содержание

#### 1. Что такое Hooks? (5 мин)

**Hooks — скрипты, выполняемые автоматически на события.**

В отличие от CLAUDE.md (рекомендации), hooks **гарантированно** выполняются.

| Событие | Когда срабатывает |
|---------|-------------------|
| `PreToolUse` | Перед выполнением инструмента |
| `PostToolUse` | После выполнения |
| `SessionStart` | Начало сессии |
| `SessionEnd` | Конец сессии |

#### 2. Конфигурация Hooks (10 мин)

**В .claude/settings.json:**
```json
{
  "hooks": {
    "PostToolUse": {
      "Edit": "npm run lint"
    }
  }
}
```

**Или через команду `/hooks`** — интерактивная настройка.

**Попросите Claude создать hook:**
```
> Write a hook that runs eslint after every file edit
```

#### 3. Полезные Hooks (10 мин)

**Автолинтинг после редактирования:**
```json
{
  "hooks": {
    "PostToolUse": {
      "Edit": "npm run lint:fix"
    }
  }
}
```

**Уведомление при завершении (macOS):**
```json
{
  "hooks": {
    "SessionEnd": {
      "*": "osascript -e 'display notification \"Done\" with title \"Claude\"'"
    }
  }
}
```

**Логирование действий:**
```json
{
  "hooks": {
    "PostToolUse": {
      "*": "echo \"$(date): Tool used\" >> .claude/logs/actions.log"
    }
  }
}
```

**Блокировка изменений в папке:**
```json
{
  "hooks": {
    "PreToolUse": {
      "Edit(./migrations/*)": "echo 'Blocked: migrations are protected' && exit 1"
    }
  }
}
```

#### 4. Практика: Настраиваем Hook (5 мин)

**Через Claude Code:**
```
> Write a hook that runs prettier after every file edit
```

**Или вручную в .claude/settings.json:**
```json
{
  "permissions": {
    "allow": ["Read", "Write", "Edit"]
  },
  "hooks": {
    "PostToolUse": {
      "Edit": "npx prettier --write"
    }
  }
}
```

### Домашнее задание
1. Настройте hook для автоформатирования
2. Добавьте уведомление при завершении
3. Создайте лог действий

---

# Часть C: Практика и завершение

---

## Урок 12.5: Dashboard и деплой (45 мин)

### Цели урока
- Создать полноценный Dashboard
- Интегрировать все изученные инструменты
- Задеплоить проект

### Содержание

#### 1. План Dashboard (5 мин)

```
Dashboard Layout
├── Sidebar (навигация)
├── Header (профиль)
└── Main Content
    ├── Overview (метрики)
    ├── Analytics (графики)
    ├── Reports (таблицы)
    └── Settings (форма)
```

#### 2. Создание проекта (15 мин)

**Основной промпт:**
```
Создай Dashboard для SaaS Analytics:

## Layout
- Sidebar слева с навигацией
- Header сверху с профилем
- Main content area

## Страницы
1. Overview — 4 карточки метрик + график
2. Analytics — интерактивные графики (Recharts)
3. Reports — таблица с данными
4. Settings — форма настроек

## Дизайн
- Основной цвет: синий (#3B82F6)
- Тёмный sidebar
- Светлый main content

Next.js 14, TypeScript, Tailwind, Recharts.
```

#### 3. Интеграция инструментов (15 мин)

**Используем MCP для GitHub:**
```
> Create a repository saas-dashboard on GitHub
> Push the initial commit
```

**Используем Skills:**
```
> /test
> /deploy
```

**Используем Subagents:**
```
> Use subagents in parallel:
  1. Check all pages render correctly
  2. Check for TypeScript errors
  3. Verify mobile responsiveness
```

#### 4. Деплой на Vercel (10 мин)

```
> Deploy this project to Vercel and return the URL
```

Claude:
1. Проверит build
2. Подключит репозиторий
3. Запустит деплой
4. Вернёт URL

### Результат

После урока:
- SaaS Dashboard с 4+ страницами
- Репозиторий на GitHub
- Деплой на Vercel
- Работающие Skills и Hooks

---

## Урок 12.6: Best Practices (15 мин)
**Источник:** https://code.claude.com/docs/en/best-practices

### Цели урока
- Применять лучшие практики
- Управлять контекстом эффективно
- Использовать продвинутые паттерны

### Содержание

#### 1. Главный принцип (3 мин)

**Давай Claude способ проверить свою работу.**

```
❌ "implement a function that validates email"

✅ "write validateEmail function. Test cases:
   - user@example.com → true
   - invalid → false
   Run the tests after implementing"
```

#### 2. Эффективные промпты (3 мин)

**Конкретность:**
```
❌ "fix the login bug"

✅ "users report login fails after session timeout.
   Check auth flow in src/auth/, especially token refresh.
   Write a failing test first, then fix it"
```

**Указание источников:**
```
"Look through ExecutionFactory's git history
 and summarize how its API came to be"
```

**Ссылки на паттерны:**
```
"Look at how existing widgets are implemented.
 HotDogWidget.php is a good example.
 Follow the pattern for a new calendar widget."
```

#### 3. Управление контекстом (3 мин)

**`/clear`** — между несвязанными задачами
**`/compact`** — сжатие контекста
**Subagents** — для изоляции

**Checkpointing:**
- `Esc+Esc` или `/rewind` — откат к checkpoint
- Checkpoints создаются автоматически
- Можно восстановить код, разговор или оба

#### 4. Продвинутые паттерны (3 мин)

**Headless режим:**
```bash
claude -p "Explain what this project does"
claude -p "List all API endpoints" --output-format json
```

**Параллельные сессии:**
- Claude Desktop для нескольких worktrees
- Writer/Reviewer паттерн

**Resume сессий:**
```bash
claude --continue    # Продолжить последнюю
claude --resume      # Выбрать из списка
```

#### 5. Типичные ошибки (3 мин)

**Kitchen sink session** — много несвязанных задач
→ Решение: `/clear` между задачами

**Бесконечные исправления** — много неудачных попыток
→ Решение: `/clear` + лучший начальный промпт

**Переполненный CLAUDE.md** — Claude игнорирует правила
→ Решение: Убрать лишнее, перенести в Skills

**Бесконечное исследование** — Claude читает всё подряд
→ Решение: Ограничить scope или использовать subagents

---

## Итоговый проект

**Задание:** SaaS Dashboard с интеграциями

**Требования:**
1. Dashboard с 4+ страницами (Overview, Analytics, Reports, Settings)
2. Интерактивные графики (Recharts)
3. Подключен GitHub MCP
4. Минимум 3 Custom Skills
5. Настроены Hooks
6. Деплой на Vercel

**Критерии оценки:**
| Критерий | Баллы |
|----------|-------|
| Dashboard функционален | 30 |
| MCP интеграция работает | 20 |
| Skills созданы и работают | 20 |
| Hooks настроены | 15 |
| Проект задеплоен | 15 |
| **Итого** | **100** |

**Бонусы (+10 каждый):**
- Тёмная тема
- Экспорт данных в CSV
- Уведомления в реальном времени

---

## Полезные ресурсы

- [Официальная документация](https://code.claude.com/docs)
- [MCP серверы](https://code.claude.com/docs/en/mcp)
- [Skills Guide](https://code.claude.com/docs/en/skills)
- [Subagents](https://code.claude.com/docs/en/sub-agents)
- [Best Practices](https://code.claude.com/docs/en/best-practices)

---

## Заключение курса

**Что вы теперь умеете:**
- Устанавливать и настраивать Claude Code
- Работать с файлами и Git
- Подключать MCP серверы
- Создавать Skills и субагенты
- Настраивать Hooks
- Применять Best Practices
- Создавать полноценные проекты

**Следующие шаги:**
1. Практикуйтесь на реальных проектах
2. Создавайте свои Skills
3. Исследуйте новые MCP серверы
4. Следите за обновлениями на https://code.claude.com/docs

/**
 * Glossary - Словарь технических терминов для модуля Введение
 * Используется для tooltips и справочника
 */

const GLOSSARY = {
  // === VIBECODING ===
  'Vibecoding': {
    term: 'Vibecoding',
    full: 'Vibecoding',
    definition: 'Подход к разработке, где программист описывает намерение на естественном языке, а ИИ генерирует код. Фокус на результате, а не на синтаксисе.',
    example: '"Создай форму регистрации с валидацией email" вместо написания кода вручную.'
  },
  'Prompt': {
    term: 'Prompt',
    full: 'Промпт',
    definition: 'Текстовый запрос к ИИ, описывающий желаемый результат. Качество промпта напрямую влияет на качество генерируемого кода.',
    example: 'Хороший промпт: "Создай React компонент кнопки с состояниями loading, disabled и вариантами primary/secondary".'
  },
  'AI IDE': {
    term: 'AI IDE',
    full: 'AI-Integrated Development Environment',
    definition: 'Редактор кода со встроенным ИИ-ассистентом, который помогает писать, объяснять и рефакторить код.',
    example: 'Cursor, GitHub Copilot, Claude Code - примеры AI IDE.'
  },

  // === ИНСТРУМЕНТЫ ===
  'Cursor': {
    term: 'Cursor',
    full: 'Cursor IDE',
    definition: 'AI-первый редактор кода на базе VS Code. Позволяет генерировать код через чат и автодополнение с помощью GPT и Claude.',
    example: 'В Cursor можно выделить код и попросить ИИ его улучшить или объяснить.'
  },
  'Claude Code': {
    term: 'Claude Code',
    full: 'Claude Code CLI',
    definition: 'Официальный CLI-инструмент от Anthropic для работы с Claude прямо в терминале. Может читать файлы, писать код и выполнять команды.',
    example: 'claude "создай функцию сортировки массива" - Claude Code напишет и сохранит код.'
  },
  'v0.dev': {
    term: 'v0.dev',
    full: 'v0 by Vercel',
    definition: 'AI-генератор UI компонентов от Vercel. Создаёт React компоненты с Tailwind CSS по текстовому описанию.',
    example: '"Создай карточку товара с изображением, ценой и кнопкой купить" - v0 сгенерирует готовый компонент.'
  },

  // === РАЗРАБОТКА ===
  'MVP': {
    term: 'MVP',
    full: 'Minimum Viable Product',
    definition: 'Минимально жизнеспособный продукт. Версия с базовым функционалом для проверки идеи на реальных пользователях.',
    example: 'MVP todo-приложения: добавление, отображение и удаление задач. Без фильтров и тегов.'
  },
  'Iteration': {
    term: 'Iteration',
    full: 'Итерация',
    definition: 'Цикл разработки: планирование → реализация → тестирование → улучшение. В vibecoding итерации очень короткие.',
    example: 'Промпт → генерация → проверка → уточняющий промпт → новая генерация.'
  },
  'Refactoring': {
    term: 'Refactoring',
    full: 'Рефакторинг',
    definition: 'Улучшение структуры кода без изменения его поведения. ИИ отлично справляется с рефакторингом.',
    example: '"Разбей эту функцию на несколько маленьких" - типичный промпт для рефакторинга.'
  },

  // === GIT И GITHUB ===
  'Git': {
    term: 'Git',
    full: 'Git',
    definition: 'Система контроля версий. Отслеживает изменения в коде и позволяет работать в команде без конфликтов.',
    example: 'git commit сохраняет текущее состояние кода с описанием изменений.'
  },
  'GitHub': {
    term: 'GitHub',
    full: 'GitHub',
    definition: 'Платформа для хостинга Git-репозиториев. Хранение кода, совместная работа, code review.',
    example: 'Все открытые проекты и портфолио разработчиков обычно на GitHub.'
  },
  'Repository': {
    term: 'Repository',
    full: 'Репозиторий',
    definition: 'Хранилище проекта со всей историей изменений. Содержит код, конфигурации и документацию.',
    example: 'Каждый проект живёт в своём репозитории на GitHub.'
  },
  'Commit': {
    term: 'Commit',
    full: 'Коммит',
    definition: 'Зафиксированный набор изменений в репозитории с описанием того, что было сделано.',
    example: 'git commit -m "Добавлена форма регистрации" - сохраняет изменения.'
  },
  'README': {
    term: 'README',
    full: 'README.md',
    definition: 'Главный документ проекта. Описывает что это за проект, как его установить и использовать.',
    example: 'ИИ может сгенерировать README по вашему промпту с описанием проекта.'
  },

  // === ВЕБ-ТЕХНОЛОГИИ ===
  'Node.js': {
    term: 'Node.js',
    full: 'Node.js',
    definition: 'Среда выполнения JavaScript вне браузера. Позволяет писать серверный код на JavaScript.',
    example: 'Node.js нужен для запуска инструментов разработки: npm, webpack, vite.'
  },
  'npm': {
    term: 'npm',
    full: 'Node Package Manager',
    definition: 'Менеджер пакетов для JavaScript. Установка библиотек и управление зависимостями проекта.',
    example: 'npm install react - устанавливает библиотеку React в проект.'
  },
  'Tailwind CSS': {
    term: 'Tailwind CSS',
    full: 'Tailwind CSS',
    definition: 'CSS-фреймворк с утилитарными классами. Стилизация прямо в HTML без написания CSS.',
    example: 'class="bg-blue-500 text-white p-4 rounded" - синяя кнопка с Tailwind.'
  },
  'localStorage': {
    term: 'localStorage',
    full: 'Local Storage',
    definition: 'Хранилище данных в браузере. Данные сохраняются даже после закрытия вкладки.',
    example: 'localStorage.setItem("tasks", JSON.stringify(tasks)) - сохраняет задачи локально.'
  },

  // === ИИ КОНЦЕПЦИИ ===
  'LLM': {
    term: 'LLM',
    full: 'Large Language Model',
    definition: 'Большая языковая модель. ИИ, обученный на огромных объёмах текста, понимающий и генерирующий код.',
    example: 'GPT-4, Claude, Gemini - примеры LLM, используемых в AI IDE.'
  },
  'Context': {
    term: 'Context',
    full: 'Контекст',
    definition: 'Информация, которую ИИ учитывает при генерации ответа: предыдущие сообщения, открытые файлы, код проекта.',
    example: 'Чем больше релевантного контекста, тем точнее результат генерации.'
  },
  'Hallucination': {
    term: 'Hallucination',
    full: 'Галлюцинация ИИ',
    definition: 'Когда ИИ уверенно выдаёт неправильную или выдуманную информацию. Важно всегда проверять результаты.',
    example: 'ИИ может придумать несуществующую библиотеку или API метод.'
  },

  // === РАБОЧИЙ ПРОЦЕСС ===
  'Code Review': {
    term: 'Code Review',
    full: 'Ревью кода',
    definition: 'Проверка кода другим разработчиком (или ИИ) перед добавлением в проект. Поиск багов и улучшений.',
    example: '"Проверь этот код на баги и предложи улучшения" - промпт для code review.'
  },
  'Debug': {
    term: 'Debug',
    full: 'Отладка',
    definition: 'Процесс поиска и исправления ошибок в коде. ИИ может объяснить ошибку и предложить исправление.',
    example: '"Почему этот код выдаёт ошибку?" - ИИ проанализирует и объяснит проблему.'
  },
  'Documentation': {
    term: 'Documentation',
    full: 'Документация',
    definition: 'Описание кода, API, процессов. ИИ может автоматически генерировать документацию к коду.',
    example: '"Добавь JSDoc комментарии к этим функциям" - промпт для генерации документации.'
  },

  // === ТЕРМИНЫ УРОКА ===
  'Workflow': {
    term: 'Workflow',
    full: 'Рабочий процесс',
    definition: 'Последовательность шагов для выполнения задачи. В vibecoding: идея → промпт → генерация → ревью → итерация.',
    example: 'Vibecoding workflow намного быстрее классического написания кода с нуля.'
  },
  'Playbook': {
    term: 'Playbook',
    full: 'Плейбук',
    definition: 'Набор проверенных приёмов и шаблонов для решения типовых задач. Личный набор лучших промптов.',
    example: 'Playbook для создания форм: шаблоны промптов, чек-листы, примеры.'
  },
  'Stack': {
    term: 'Stack',
    full: 'Технологический стек',
    definition: 'Набор технологий и инструментов, используемых в проекте. В vibecoding включает и AI-инструменты.',
    example: 'Vibecoding стек: Cursor + Claude Code + v0.dev + GitHub Copilot.'
  }
};

// Функция поиска термина
function findTerm(term) {
  const normalized = term.toLowerCase().trim();
  for (const key in GLOSSARY) {
    if (key.toLowerCase() === normalized ||
        GLOSSARY[key].full.toLowerCase().includes(normalized)) {
      return GLOSSARY[key];
    }
  }
  return null;
}

// Функция получения всех терминов по категории
function getTermsByCategory(category) {
  // Можно расширить для фильтрации
  return Object.values(GLOSSARY);
}

// Экспорт для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GLOSSARY, findTerm, getTermsByCategory };
}

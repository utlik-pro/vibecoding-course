/**
 * Glossary - Словарь технических терминов
 * Модуль 8: Базы данных для вайбкодера
 */

const GLOSSARY = {
  // === SQL BASICS ===
  'SQL': {
    term: 'SQL',
    full: 'Structured Query Language',
    definition: 'Язык запросов для работы с реляционными базами данных. Позволяет создавать таблицы, добавлять, изменять, удалять и получать данные.',
    example: 'SELECT * FROM tasks WHERE completed = false;'
  },
  'SELECT': {
    term: 'SELECT',
    full: 'SQL SELECT',
    definition: 'Команда SQL для выборки данных из таблицы. Указывает какие колонки и из какой таблицы получить.',
    example: 'SELECT title, priority FROM tasks;'
  },
  'INSERT': {
    term: 'INSERT',
    full: 'SQL INSERT INTO',
    definition: 'Команда SQL для добавления новых записей в таблицу.',
    example: 'INSERT INTO tasks (title, priority) VALUES (\'Новая задача\', \'high\');'
  },
  'UPDATE': {
    term: 'UPDATE',
    full: 'SQL UPDATE',
    definition: 'Команда SQL для изменения существующих записей в таблице. Обязательно используйте WHERE!',
    example: 'UPDATE tasks SET completed = true WHERE id = 1;'
  },
  'DELETE': {
    term: 'DELETE',
    full: 'SQL DELETE FROM',
    definition: 'Команда SQL для удаления записей из таблицы. Всегда проверяйте WHERE перед выполнением!',
    example: 'DELETE FROM tasks WHERE id = 5;'
  },
  'WHERE': {
    term: 'WHERE',
    full: 'SQL WHERE Clause',
    definition: 'Условие фильтрации в SQL запросах. Определяет какие записи будут выбраны, обновлены или удалены.',
    example: 'SELECT * FROM tasks WHERE priority = \'high\' AND completed = false;'
  },
  'ORDER BY': {
    term: 'ORDER BY',
    full: 'SQL ORDER BY',
    definition: 'Сортировка результатов запроса. ASC — по возрастанию, DESC — по убыванию.',
    example: 'SELECT * FROM tasks ORDER BY created_at DESC;'
  },
  'LIMIT': {
    term: 'LIMIT',
    full: 'SQL LIMIT',
    definition: 'Ограничение количества возвращаемых записей. Полезно для пагинации.',
    example: 'SELECT * FROM tasks LIMIT 10 OFFSET 20;'
  },
  'LIKE': {
    term: 'LIKE',
    full: 'SQL LIKE Pattern',
    definition: 'Поиск по шаблону в текстовых полях. % означает любые символы, _ — один символ.',
    example: 'SELECT * FROM tasks WHERE title LIKE \'%книг%\';'
  },

  // === JOINS ===
  'JOIN': {
    term: 'JOIN',
    full: 'SQL JOIN',
    definition: 'Объединение данных из нескольких таблиц по связывающему полю.',
    example: 'SELECT * FROM tasks JOIN categories ON tasks.category_id = categories.id;'
  },
  'INNER JOIN': {
    term: 'INNER JOIN',
    full: 'SQL INNER JOIN',
    definition: 'Возвращает только записи, которые есть в обеих таблицах. Если связи нет — запись не попадёт в результат.',
    example: 'SELECT t.title, c.name FROM tasks t INNER JOIN categories c ON t.category_id = c.id;'
  },
  'LEFT JOIN': {
    term: 'LEFT JOIN',
    full: 'SQL LEFT JOIN',
    definition: 'Возвращает ВСЕ записи из левой таблицы и соответствующие из правой. Если связи нет — будет NULL.',
    example: 'SELECT t.title, c.name FROM tasks t LEFT JOIN categories c ON t.category_id = c.id;'
  },

  // === AGGREGATION ===
  'COUNT': {
    term: 'COUNT',
    full: 'SQL COUNT()',
    definition: 'Функция подсчёта количества записей. COUNT(*) считает все строки, COUNT(column) — только не NULL.',
    example: 'SELECT COUNT(*) FROM tasks WHERE completed = true;'
  },
  'SUM': {
    term: 'SUM',
    full: 'SQL SUM()',
    definition: 'Функция суммирования числовых значений в колонке.',
    example: 'SELECT SUM(estimated_minutes) FROM tasks;'
  },
  'AVG': {
    term: 'AVG',
    full: 'SQL AVG()',
    definition: 'Функция вычисления среднего значения в колонке.',
    example: 'SELECT AVG(estimated_minutes) FROM tasks;'
  },
  'GROUP BY': {
    term: 'GROUP BY',
    full: 'SQL GROUP BY',
    definition: 'Группировка записей по значению колонки для агрегации. Часто используется с COUNT, SUM, AVG.',
    example: 'SELECT priority, COUNT(*) FROM tasks GROUP BY priority;'
  },
  'HAVING': {
    term: 'HAVING',
    full: 'SQL HAVING',
    definition: 'Фильтрация групп ПОСЛЕ группировки. WHERE фильтрует строки, HAVING — группы.',
    example: 'SELECT category_id, COUNT(*) FROM tasks GROUP BY category_id HAVING COUNT(*) > 5;'
  },

  // === DATABASE STRUCTURE ===
  'Table': {
    term: 'Table',
    full: 'Таблица базы данных',
    definition: 'Структура для хранения данных в виде строк и колонок. Как лист в Excel, но с типами данных.',
    example: 'CREATE TABLE tasks (id SERIAL PRIMARY KEY, title TEXT NOT NULL);'
  },
  'Column': {
    term: 'Column',
    full: 'Колонка / Поле',
    definition: 'Отдельное поле в таблице с определённым типом данных. Например: title, created_at, completed.',
    example: 'ALTER TABLE tasks ADD COLUMN priority TEXT DEFAULT \'medium\';'
  },
  'Row': {
    term: 'Row',
    full: 'Строка / Запись',
    definition: 'Одна запись в таблице, содержащая значения всех колонок. Одна задача = одна строка.',
    example: 'Каждая строка в таблице tasks — это одна задача.'
  },
  'Primary Key': {
    term: 'Primary Key',
    full: 'Первичный ключ',
    definition: 'Уникальный идентификатор записи. Не может повторяться и быть NULL. Обычно это id.',
    example: 'id SERIAL PRIMARY KEY'
  },
  'Foreign Key': {
    term: 'Foreign Key',
    full: 'Внешний ключ',
    definition: 'Поле, ссылающееся на первичный ключ другой таблицы. Создаёт связь между таблицами.',
    example: 'category_id INTEGER REFERENCES categories(id)'
  },
  'Index': {
    term: 'Index',
    full: 'Индекс базы данных',
    definition: 'Структура для ускорения поиска. Как алфавитный указатель в книге. Ускоряет WHERE и JOIN.',
    example: 'CREATE INDEX idx_tasks_category ON tasks(category_id);'
  },

  // === DATA TYPES ===
  'TEXT': {
    term: 'TEXT',
    full: 'Тип TEXT',
    definition: 'Тип данных для хранения текста любой длины. Используйте для названий, описаний.',
    example: 'title TEXT NOT NULL'
  },
  'INTEGER': {
    term: 'INTEGER',
    full: 'Тип INTEGER',
    definition: 'Тип данных для целых чисел. Используйте для количества, id, возраста.',
    example: 'estimated_minutes INTEGER DEFAULT 30'
  },
  'BOOLEAN': {
    term: 'BOOLEAN',
    full: 'Тип BOOLEAN',
    definition: 'Тип данных для логических значений: true или false.',
    example: 'completed BOOLEAN DEFAULT false'
  },
  'TIMESTAMP': {
    term: 'TIMESTAMP',
    full: 'Тип TIMESTAMP',
    definition: 'Тип данных для даты и времени. TIMESTAMPTZ включает часовой пояс.',
    example: 'created_at TIMESTAMPTZ DEFAULT NOW()'
  },
  'SERIAL': {
    term: 'SERIAL',
    full: 'Тип SERIAL',
    definition: 'Автоинкрементный тип для id. При каждой новой записи увеличивается на 1.',
    example: 'id SERIAL PRIMARY KEY'
  },
  'NUMERIC': {
    term: 'NUMERIC',
    full: 'Тип NUMERIC',
    definition: 'Тип для точных десятичных чисел. Используйте для денег и финансов.',
    example: 'amount NUMERIC(10, 2)'
  },

  // === CONSTRAINTS ===
  'NOT NULL': {
    term: 'NOT NULL',
    full: 'Ограничение NOT NULL',
    definition: 'Запрет на пустые значения в колонке. Обязательное поле.',
    example: 'title TEXT NOT NULL'
  },
  'DEFAULT': {
    term: 'DEFAULT',
    full: 'Значение по умолчанию',
    definition: 'Автоматическое значение, если не указано явно при INSERT.',
    example: 'created_at TIMESTAMP DEFAULT NOW()'
  },
  'UNIQUE': {
    term: 'UNIQUE',
    full: 'Ограничение UNIQUE',
    definition: 'Запрет на повторяющиеся значения в колонке.',
    example: 'email TEXT UNIQUE NOT NULL'
  },
  'REFERENCES': {
    term: 'REFERENCES',
    full: 'SQL REFERENCES',
    definition: 'Создание внешнего ключа — ссылки на запись в другой таблице.',
    example: 'category_id INTEGER REFERENCES categories(id)'
  },

  // === ADVANCED ===
  'View': {
    term: 'View',
    full: 'Представление',
    definition: 'Сохранённый SQL запрос, который можно использовать как таблицу. Не хранит данные.',
    example: 'CREATE VIEW active_tasks AS SELECT * FROM tasks WHERE completed = false;'
  },
  'Transaction': {
    term: 'Transaction',
    full: 'Транзакция',
    definition: 'Группа операций, которые выполняются вместе. Если одна падает — отменяются все.',
    example: 'BEGIN; UPDATE...; DELETE...; COMMIT;'
  },
  'Migration': {
    term: 'Migration',
    full: 'Миграция',
    definition: 'Версионированное изменение структуры БД. Позволяет отслеживать историю изменений схемы.',
    example: 'Миграция добавляет новую колонку priority в таблицу tasks.'
  },
  'NULL': {
    term: 'NULL',
    full: 'SQL NULL',
    definition: 'Специальное значение "нет данных". Не равно пустой строке или нулю. Проверяется через IS NULL.',
    example: 'SELECT * FROM tasks WHERE description IS NULL;'
  },
  'COALESCE': {
    term: 'COALESCE',
    full: 'SQL COALESCE()',
    definition: 'Функция, возвращающая первое не-NULL значение из списка. Для замены NULL на значение по умолчанию.',
    example: 'SELECT COALESCE(description, \'Нет описания\') FROM tasks;'
  },

  // === SUPABASE ===
  'Supabase': {
    term: 'Supabase',
    full: 'Supabase',
    definition: 'Облачная платформа с PostgreSQL базой данных, API, аутентификацией. Open-source альтернатива Firebase.',
    example: 'Supabase автоматически генерирует REST API для ваших таблиц.'
  },
  'PostgreSQL': {
    term: 'PostgreSQL',
    full: 'PostgreSQL',
    definition: 'Мощная open-source реляционная БД. Поддерживает JSON, полнотекстовый поиск, расширения.',
    example: 'Supabase использует PostgreSQL под капотом.'
  },
  'SQL Editor': {
    term: 'SQL Editor',
    full: 'Supabase SQL Editor',
    definition: 'Встроенный редактор SQL запросов в Supabase. Позволяет выполнять любые SQL команды.',
    example: 'Откройте SQL Editor в Supabase и выполните SELECT * FROM tasks;'
  },
  'Table Editor': {
    term: 'Table Editor',
    full: 'Supabase Table Editor',
    definition: 'Визуальный редактор таблиц в Supabase. Позволяет создавать таблицы и редактировать данные без SQL.',
    example: 'В Table Editor можно добавить запись кликом на Insert Row.'
  },
  'RLS': {
    term: 'RLS',
    full: 'Row Level Security',
    definition: 'Защита данных на уровне строк в PostgreSQL. Определяет кто может видеть и изменять какие записи.',
    example: 'RLS политика может разрешить пользователю видеть только свои задачи.'
  },

  // === API & INTEGRATION ===
  'API': {
    term: 'API',
    full: 'Application Programming Interface',
    definition: 'Интерфейс для взаимодействия программ. Supabase автоматически создаёт REST API для таблиц.',
    example: 'supabase.from(\'tasks\').select(\'*\') — вызов API.'
  },
  'Relations': {
    term: 'Relations',
    full: 'Supabase Relations',
    definition: 'Автоматическое получение связанных данных в Supabase без написания JOIN вручную.',
    example: 'supabase.from(\'tasks\').select(\'*, category:categories(name, icon)\')'
  },
  'CRUD': {
    term: 'CRUD',
    full: 'Create, Read, Update, Delete',
    definition: 'Четыре базовые операции с данными. INSERT = Create, SELECT = Read, UPDATE = Update, DELETE = Delete.',
    example: 'Task Manager реализует полный CRUD для задач.'
  },

  // === GENERAL ===
  'Database': {
    term: 'Database',
    full: 'База данных',
    definition: 'Организованное хранилище данных с возможностью поиска, фильтрации, сортировки.',
    example: 'PostgreSQL, MySQL, MongoDB — разные типы баз данных.'
  },
  'Schema': {
    term: 'Schema',
    full: 'Схема базы данных',
    definition: 'Структура базы данных: какие таблицы существуют, какие у них колонки и связи.',
    example: 'Схема Task Manager: таблицы tasks и categories со связью через category_id.'
  },
  'Query': {
    term: 'Query',
    full: 'Запрос',
    definition: 'SQL команда к базе данных. SELECT-запрос получает данные, UPDATE-запрос изменяет.',
    example: 'SELECT * FROM tasks — это запрос на получение всех задач.'
  },
  'Alias': {
    term: 'Alias',
    full: 'Псевдоним / AS',
    definition: 'Короткое имя для таблицы или колонки в запросе. Упрощает написание сложных запросов.',
    example: 'SELECT t.title, c.name FROM tasks t JOIN categories c ON t.category_id = c.id;'
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

// Функция получения всех терминов
function getTermsByCategory(category) {
  return Object.values(GLOSSARY);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GLOSSARY, findTerm, getTermsByCategory };
}

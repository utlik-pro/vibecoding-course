-- =============================================
-- Vibecoding Course Database Schema
-- Supabase PostgreSQL
-- =============================================

-- Включаем расширение для UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- ТАБЛИЦЫ
-- =============================================

-- Потоки (cohorts) - группы учеников
CREATE TABLE IF NOT EXISTS cohorts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  start_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Пользователи
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  cohort_id UUID REFERENCES cohorts(id),
  role VARCHAR(20) DEFAULT 'student' CHECK (role IN ('student', 'admin', 'instructor')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Модули курса
CREATE TABLE IF NOT EXISTS modules (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  lesson_count INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

-- Доступ потока к модулям
CREATE TABLE IF NOT EXISTS module_access (
  cohort_id UUID REFERENCES cohorts(id) ON DELETE CASCADE,
  module_id INTEGER REFERENCES modules(id) ON DELETE CASCADE,
  is_unlocked BOOLEAN DEFAULT false,
  unlocked_at TIMESTAMPTZ,
  PRIMARY KEY (cohort_id, module_id)
);

-- Индивидуальный доступ (переопределяет поток)
CREATE TABLE IF NOT EXISTS user_module_access (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  module_id INTEGER REFERENCES modules(id) ON DELETE CASCADE,
  is_unlocked BOOLEAN DEFAULT false,
  PRIMARY KEY (user_id, module_id)
);

-- Прогресс пользователя
CREATE TABLE IF NOT EXISTS progress (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  module_id INTEGER REFERENCES modules(id) ON DELETE CASCADE,
  lesson_id VARCHAR(50) NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, module_id, lesson_id)
);

-- Прогресс чек-листов
CREATE TABLE IF NOT EXISTS checklist_progress (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  module_id INTEGER REFERENCES modules(id) ON DELETE CASCADE,
  checklist_id VARCHAR(100) NOT NULL,
  is_completed BOOLEAN DEFAULT true,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, module_id, checklist_id)
);

-- =============================================
-- ИНДЕКСЫ
-- =============================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_cohort ON users(cohort_id);
CREATE INDEX IF NOT EXISTS idx_progress_user ON progress(user_id);
CREATE INDEX IF NOT EXISTS idx_module_access_cohort ON module_access(cohort_id);

-- =============================================
-- ТРИГГЕР ДЛЯ updated_at
-- =============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Включаем RLS на всех таблицах
ALTER TABLE cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_module_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_progress ENABLE ROW LEVEL SECURITY;

-- Политики для cohorts (только чтение для всех авторизованных)
CREATE POLICY "Cohorts viewable by authenticated users"
  ON cohorts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Cohorts manageable by admins"
  ON cohorts FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'instructor')
    )
  );

-- Политики для users
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (email = auth.email());

CREATE POLICY "Admins can view all users"
  ON users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.email = auth.email()
      AND u.role IN ('admin', 'instructor')
    )
  );

CREATE POLICY "Admins can manage users"
  ON users FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.email = auth.email()
      AND u.role IN ('admin', 'instructor')
    )
  );

-- Политики для modules (все могут читать видимые)
CREATE POLICY "Modules viewable by all"
  ON modules FOR SELECT
  TO authenticated
  USING (is_visible = true);

CREATE POLICY "Admins can manage modules"
  ON modules FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.email = auth.email()
      AND users.role IN ('admin', 'instructor')
    )
  );

-- Политики для module_access
CREATE POLICY "Users can view own cohort access"
  ON module_access FOR SELECT
  TO authenticated
  USING (
    cohort_id IN (
      SELECT cohort_id FROM users WHERE email = auth.email()
    )
  );

CREATE POLICY "Admins can manage module access"
  ON module_access FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.email = auth.email()
      AND users.role IN ('admin', 'instructor')
    )
  );

-- Политики для user_module_access
CREATE POLICY "Users can view own access"
  ON user_module_access FOR SELECT
  TO authenticated
  USING (
    user_id IN (SELECT id FROM users WHERE email = auth.email())
  );

CREATE POLICY "Admins can manage user access"
  ON user_module_access FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.email = auth.email()
      AND users.role IN ('admin', 'instructor')
    )
  );

-- Политики для progress
CREATE POLICY "Users can view own progress"
  ON progress FOR SELECT
  TO authenticated
  USING (
    user_id IN (SELECT id FROM users WHERE email = auth.email())
  );

CREATE POLICY "Users can insert own progress"
  ON progress FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id IN (SELECT id FROM users WHERE email = auth.email())
  );

CREATE POLICY "Admins can view all progress"
  ON progress FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.email = auth.email()
      AND users.role IN ('admin', 'instructor')
    )
  );

-- Политики для checklist_progress
CREATE POLICY "Users can manage own checklist progress"
  ON checklist_progress FOR ALL
  TO authenticated
  USING (
    user_id IN (SELECT id FROM users WHERE email = auth.email())
  );

CREATE POLICY "Admins can view all checklist progress"
  ON checklist_progress FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.email = auth.email()
      AND users.role IN ('admin', 'instructor')
    )
  );

-- =============================================
-- НАЧАЛЬНЫЕ ДАННЫЕ
-- =============================================

-- Модули курса
INSERT INTO modules (id, title, description, lesson_count, sort_order) VALUES
  (1, 'Введение в Vibecoding', 'Знакомство с философией vibecoding и ИИ-инструментами', 8, 1),
  (2, 'Cursor - ваш ИИ-помощник', 'Полный курс по Cursor для начинающих', 10, 2),
  (3, 'Claude Code', 'Альтернативный мощный ИИ-инструмент', 5, 3),
  (4, 'Современный веб-стек', 'TypeScript, Next.js, PostgreSQL', 6, 4),
  (5, 'Настройка проекта', 'Настройка полного технологического стека', 5, 5),
  (6, 'Backend для вайбкодера', 'Создание серверной части с Supabase', 7, 6),
  (7, 'Аутентификация', 'Система регистрации и входа', 6, 7),
  (8, 'База данных', 'Глубокое погружение в Supabase', 8, 8),
  (9, 'Фронтенд', 'Создание UI с лендингом и админкой', 9, 9),
  (10, 'API и платежи', 'Интеграция Stripe и внешних API', 7, 10),
  (11, 'Claude Code: Основы', 'Введение в терминальный ИИ-помощник', 6, 11),
  (12, 'Claude Code: Продвинутый', 'Продвинутые техники работы', 5, 12)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  lesson_count = EXCLUDED.lesson_count,
  sort_order = EXCLUDED.sort_order;

-- Поток 1 (первый поток учеников)
INSERT INTO cohorts (id, name, description, start_date, is_active)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Поток 1',
  'Первый поток курса Vibecoding с нуля',
  '2025-01-01',
  true
) ON CONFLICT (id) DO NOTHING;

-- Открываем все модули для Потока 1
INSERT INTO module_access (cohort_id, module_id, is_unlocked, unlocked_at)
SELECT
  '00000000-0000-0000-0000-000000000001',
  id,
  true,
  NOW()
FROM modules
ON CONFLICT (cohort_id, module_id) DO UPDATE SET
  is_unlocked = true,
  unlocked_at = NOW();

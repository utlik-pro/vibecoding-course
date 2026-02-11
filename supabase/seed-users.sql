-- =============================================
-- Импорт текущих пользователей из whitelist
-- Vibecoding Course
-- =============================================

-- Поток 1 UUID
-- Убедитесь, что поток создан (schema.sql)

-- Импорт 24 пользователей
INSERT INTO users (email, name, cohort_id, role, is_active) VALUES
  ('tashad16a@gmail.com', 'Бондарева Наталья Александровна', '00000000-0000-0000-0000-000000000001', 'student', true),
  ('rudveronica@gmail.com', 'Рудко Вероника', '00000000-0000-0000-0000-000000000001', 'student', true),
  ('malyaruslan@gmail.com', 'Малявский Руслан', '00000000-0000-0000-0000-000000000001', 'student', true),
  ('ip.stasheuski@gmail.com', 'Сташевский Александр', '00000000-0000-0000-0000-000000000001', 'student', true),
  ('ddosattaker@gmail.com', 'Левковец Артём', '00000000-0000-0000-0000-000000000001', 'student', true),
  ('1952793alkhm@gmail.com', 'Хмельницкий Алексей', '00000000-0000-0000-0000-000000000001', 'student', true),
  ('predko1994denis@gmail.com', 'Предко Денис Андреевич', '00000000-0000-0000-0000-000000000001', 'student', true),
  ('1alexeikalinin1@gmail.com', 'Калинин Алексей Николаевич', '00000000-0000-0000-0000-000000000001', 'student', true),
  ('vitalkov@gmail.com', 'Vitalkov', '00000000-0000-0000-0000-000000000001', 'student', true),
  ('oot2022@mail.ru', 'Хильман Наталья Викторовна', '00000000-0000-0000-0000-000000000001', 'student', true),
  ('il.latyshev@gmail.com', 'Латышев Илья Сергеевич', '00000000-0000-0000-0000-000000000001', 'student', true),
  ('goodlife-fm@mail.ru', 'Сидоров Павел Петрович', '00000000-0000-0000-0000-000000000001', 'student', true),
  ('jasmail@mail.ru', 'Сенкевич Иван Евгеньевич', '00000000-0000-0000-0000-000000000001', 'student', true),
  ('equitexby@gmail.com', 'Кротик Евгений Викторович', '00000000-0000-0000-0000-000000000001', 'student', true),
  ('gurinovice@gmail.com', 'Гуринович Евгений Николаевич', '00000000-0000-0000-0000-000000000001', 'student', true),
  ('zhernosek12@gmail.com', 'Жерносек Андрей Степанович', '00000000-0000-0000-0000-000000000001', 'student', true),
  ('08.05.1998@mail.ru', 'Запотылок Ольга Николаевна', '00000000-0000-0000-0000-000000000001', 'student', true),
  ('dolbik@u-plast.by', 'Долбик Андрей Сергеевич', '00000000-0000-0000-0000-000000000001', 'student', true),
  ('agutov@u-plast.by', 'Агутов Александр Иванович', '00000000-0000-0000-0000-000000000001', 'student', true),
  ('kvetnevskiy@gmail.com', 'Кветневский Антон Юрьевич', '00000000-0000-0000-0000-000000000001', 'student', true),
  ('iharmarynin@gmail.com', 'Маринин Игорь Егорович', '00000000-0000-0000-0000-000000000001', 'student', true),
  ('sergejsputalov@gmail.com', 'Шпуталов Сергей Витальевич', '00000000-0000-0000-0000-000000000001', 'student', true),
  ('rei.sheko@gmail.com', 'Шеко Андрей Иванович', '00000000-0000-0000-0000-000000000001', 'student', true),
  ('nmedvedeva312@gmail.com', 'Медведева Н.', '00000000-0000-0000-0000-000000000001', 'student', true),
  ('ekrotik@gmail.com', 'Ekrotik', '00000000-0000-0000-0000-000000000001', 'student', true)
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  cohort_id = EXCLUDED.cohort_id,
  is_active = true;

-- Назначаем первого пользователя админом (для тестирования)
-- Замените email на нужный
UPDATE users SET role = 'admin' WHERE email = 'tashad16a@gmail.com';

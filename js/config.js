/**
 * КОНФИГУРАЦИЯ КУРСА
 * Редактируется через админку /admin/
 *
 * Структура:
 * - modules: единый источник названий модулей
 * - cohorts: потоки с учениками и доступом к модулям
 * - admins: список email администраторов
 * - adminPassword: пароль для fallback-админки
 */

const COURSE_CONFIG = {
  // =============================================
  // МОДУЛИ КУРСА (единый источник названий)
  // =============================================
  modules: [
    { id: 1, title: 'Введение в Vibecoding', icon: '🎯' },
    { id: 2, title: 'Cursor - ваш ИИ-помощник', icon: '🖥️' },
    { id: 3, title: 'Claude Code', icon: '🧠' },
    { id: 4, title: 'Современный веб-стек', icon: '🌐' },
    { id: 5, title: 'Настройка проекта', icon: '⚙️' },
    { id: 6, title: 'Backend для вайбкодера', icon: '🗄️' },
    { id: 7, title: 'Аутентификация', icon: '🔐' },
    { id: 8, title: 'База данных', icon: '🗄️' },
    { id: 9, title: 'Фронтенд', icon: '🎨' },
    { id: 10, title: 'API и платежи', icon: '💳' },
    { id: 11, title: 'Claude Code: Основы', icon: '🤖' },
    { id: 12, title: 'Claude Code: Продвинутый', icon: '🚀' }
  ],

  // =============================================
  // ПОТОКИ С УЧЕНИКАМИ
  // =============================================
  cohorts: [
    {
      id: 'cohort-1',
      name: 'Поток 1',
      description: 'Первый поток курса - полный доступ',
      unlockedModules: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      students: [
        { email: 'tashad16a@gmail.com', name: 'Бондарева Наталья Александровна', active: true },
        { email: 'rudveronica@gmail.com', name: 'Рудко Вероника', active: true },
        { email: 'malyaruslan@gmail.com', name: 'Малявский Руслан', active: true },
        { email: 'ip.stasheuski@gmail.com', name: 'Сташевский Александр', active: true },
        { email: 'ddosattaker@gmail.com', name: 'Левковец Артём', active: true },
        { email: '1952793alkhm@gmail.com', name: 'Хмельницкий Алексей', active: true },
        { email: 'predko1994denis@gmail.com', name: 'Предко Денис Андреевич', active: true },
        { email: '1alexeikalinin1@gmail.com', name: 'Калинин Алексей Николаевич', active: true },
        { email: 'vitalkov@gmail.com', name: 'Vitalkov', active: true },
        { email: 'oot2022@mail.ru', name: 'Хильман Наталья Викторовна', active: true },
        { email: 'il.latyshev@gmail.com', name: 'Латышев Илья Сергеевич', active: true },
        { email: 'goodlife-fm@mail.ru', name: 'Сидоров Павел Петрович', active: true }
      ]
    },
    {
      id: 'cohort-2',
      name: 'Поток 2',
      description: 'Второй поток курса - модули 1-3',
      unlockedModules: [1, 2, 3],
      students: [
        { email: 'Jasmail@mail.ru', name: 'Сенкевич Иван Евгеньевич', active: true },
        { email: 'equitexby@gmail.com', name: 'Кротик Евгений Викторович', active: true },
        { email: 'gurinovice@gmail.com', name: 'Гуринович Евгений Николаевич', active: true },
        { email: 'zhernosek12@gmail.com', name: 'Жерносек Андрей Степанович', active: true },
        { email: '08.05.1998@mail.ru', name: 'Запотылок Ольга Николаевна', active: true },
        { email: 'dolbik@u-plast.by', name: 'Долбик Андрей Сергеевич', active: true },
        { email: 'agutov@u-plast.by', name: 'Агутов Александр Иванович', active: true },
        { email: 'kvetnevskiy@gmail.com', name: 'Кветневский Антон Юрьевич', active: true },
        { email: 'iharmarynin@gmail.com', name: 'Маринин Игорь Егорович', active: true },
        { email: 'Sergejsputalov@gmail.com', name: 'Шпуталов Сергей Витальевич', active: true },
        { email: 'rei.sheko@gmail.com', name: 'Шеко Андрей Иванович', active: true },
        { email: 'nmedvedeva312@gmail.com', name: 'Медведева Н.', active: true },
        { email: 'kwazi@tut.by', name: 'Kwazi', active: true }
      ]
    }
  ],

  // =============================================
  // АДМИНИСТРАТОРЫ
  // =============================================
  admins: [
    'tashad16a@gmail.com'
  ],

  // Пароль для fallback-админки (boss.html)
  adminPassword: '609285',

  // =============================================
  // ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ
  // =============================================

  /**
   * Получить поток пользователя по email
   * @param {string} email
   * @returns {Object|null} объект потока или null
   */
  getCohortByEmail(email) {
    if (!email) return null;
    const normalizedEmail = email.toLowerCase();

    for (const cohort of this.cohorts) {
      const found = cohort.students.find(s => {
        const studentEmail = (typeof s === 'string' ? s : s.email).toLowerCase();
        return studentEmail === normalizedEmail;
      });
      if (found) return cohort;
    }
    return null;
  },

  /**
   * Получить данные студента по email
   * @param {string} email
   * @returns {Object|null} { email, name, active, cohort, hiddenModules }
   */
  getStudentByEmail(email) {
    if (!email) return null;
    const normalizedEmail = email.toLowerCase();

    for (const cohort of this.cohorts) {
      const student = cohort.students.find(s => {
        const studentEmail = (typeof s === 'string' ? s : s.email).toLowerCase();
        return studentEmail === normalizedEmail;
      });
      if (student) {
        // Поддержка старого формата (строки)
        if (typeof student === 'string') {
          return { email: student, name: null, active: true, cohort, hiddenModules: [] };
        }
        return { ...student, cohort, hiddenModules: student.hiddenModules || [] };
      }
    }
    return null;
  },

  /**
   * Проверить, активен ли пользователь (не забанен)
   * @param {string} email
   * @returns {boolean}
   */
  isStudentActive(email) {
    const student = this.getStudentByEmail(email);
    if (!student) return false;
    return student.active !== false;
  },

  /**
   * Получить открытые модули для пользователя
   * @param {string} email
   * @returns {number[]} массив ID открытых модулей
   */
  getUnlockedModulesForUser(email) {
    // Админы видят всё
    if (this.isAdmin(email)) {
      return this.modules.map(m => m.id);
    }

    // Забаненные не видят ничего
    if (!this.isStudentActive(email)) {
      return [];
    }

    const student = this.getStudentByEmail(email);
    if (!student) return [];

    const cohort = student.cohort;
    if (!cohort) return [];

    // Базовые модули потока минус скрытые для этого студента
    const hiddenModules = student.hiddenModules || [];
    return cohort.unlockedModules.filter(m => !hiddenModules.includes(m));
  },

  /**
   * Проверить, является ли пользователь админом
   * @param {string} email
   * @returns {boolean}
   */
  isAdmin(email) {
    if (!email) return false;
    return this.admins.map(a => a.toLowerCase()).includes(email.toLowerCase());
  },

  /**
   * Проверить, есть ли пользователь в whitelist (любой поток + админы)
   * @param {string} email
   * @returns {boolean}
   */
  isWhitelisted(email) {
    if (!email) return false;
    const normalizedEmail = email.toLowerCase();

    // Проверяем админов
    if (this.admins.map(a => a.toLowerCase()).includes(normalizedEmail)) {
      return true;
    }

    // Проверяем все потоки (только активные студенты)
    const student = this.getStudentByEmail(email);
    return student !== null && student.active !== false;
  },

  /**
   * Получить название модуля по ID
   * @param {number} moduleId
   * @returns {string}
   */
  getModuleTitle(moduleId) {
    const module = this.modules.find(m => m.id === moduleId);
    return module ? module.title : `Модуль ${moduleId}`;
  },

  /**
   * Получить всех студентов (для совместимости)
   * @returns {string[]}
   */
  getAllStudents() {
    const students = [];
    for (const cohort of this.cohorts) {
      for (const s of cohort.students) {
        const email = typeof s === 'string' ? s : s.email;
        students.push(email);
      }
    }
    return students;
  },

  /**
   * Получить всех активных студентов
   * @returns {string[]}
   */
  getActiveStudents() {
    const students = [];
    for (const cohort of this.cohorts) {
      for (const s of cohort.students) {
        if (typeof s === 'string') {
          students.push(s);
        } else if (s.active !== false) {
          students.push(s.email);
        }
      }
    }
    return students;
  },

  // Для обратной совместимости
  get whitelist() {
    return [...this.admins, ...this.getAllStudents()];
  },

  get unlockedModules() {
    // Возвращает максимальный набор модулей (для совместимости)
    return this.modules.map(m => m.id);
  }
};

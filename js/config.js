/**
 * КОНФИГУРАЦИЯ КУРСА
 * Редактируется через админку /boss.html
 */

const COURSE_CONFIG = {
  // Какие модули открыты (номера 1-12)
  unlockedModules: [3, 4],

  // Белый список email (эти пользователи видят ВСЕ модули)
  whitelist: [
    'admin@vibecoding.ru',
    'teacher@example.com',
    'test@test.com'
  ],

  // Пароль админки
  adminPassword: '609285'
};

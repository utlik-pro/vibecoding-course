/**
 * Проверка доступа к страницам модуля
 * Универсальный скрипт для всех модулей
 *
 * Работает в двух режимах:
 * 1. Supabase mode - проверка через API
 * 2. Fallback mode - проверка через whitelist в config.js
 */

(function() {
  'use strict';

  // Определяем путь к корню сайта
  const pathParts = window.location.pathname.split('/');
  const depth = pathParts.filter(p => p && !p.includes('.')).length;
  const rootPath = '../'.repeat(Math.max(depth - 1, 0)) || './';

  // Загружаем необходимые скрипты
  const scripts = [
    rootPath + 'js/config.js',
    rootPath + 'js/supabase-client.js',
    rootPath + 'js/course-api.js'
  ];

  let loadedCount = 0;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = () => {
        console.warn('Failed to load:', src);
        resolve(); // Continue anyway
      };
      document.head.appendChild(script);
    });
  }

  async function loadAllScripts() {
    for (const src of scripts) {
      await loadScript(src);
    }
  }

  async function checkAccess() {
    await loadAllScripts();

    // Проверяем, настроен ли Supabase
    const useSupabase = typeof SupabaseClient !== 'undefined' &&
                        SupabaseClient.isSupabaseConfigured();

    if (useSupabase) {
      await checkSupabaseAuth();
    } else {
      checkFallbackAuth();
    }
  }

  async function checkSupabaseAuth() {
    try {
      await CourseAPI.init();

      const user = CourseAPI.getCurrentUser();
      if (!user) {
        redirectToMain();
        return;
      }

      // Пользователь авторизован
      console.log('User authenticated:', user.email);
    } catch (err) {
      console.error('Auth check error:', err);
      // Fallback to whitelist
      checkFallbackAuth();
    }
  }

  function checkFallbackAuth() {
    const savedEmail = localStorage.getItem('userEmail');

    if (!savedEmail) {
      redirectToMain();
      return;
    }

    if (typeof COURSE_CONFIG === 'undefined') {
      console.error('COURSE_CONFIG not loaded');
      redirectToMain();
      return;
    }

    const whitelist = COURSE_CONFIG.whitelist.map(e => e.toLowerCase());

    if (!whitelist.includes(savedEmail.toLowerCase())) {
      localStorage.removeItem('userEmail');
      redirectToMain();
      return;
    }

    console.log('User authenticated (fallback):', savedEmail);
  }

  function redirectToMain() {
    // Определяем путь к главной странице
    const pathParts = window.location.pathname.split('/');
    const depth = pathParts.filter(p => p && !p.includes('.')).length;
    const indexPath = '../'.repeat(Math.max(depth - 1, 0)) + 'index.html';

    console.log('Redirecting to:', indexPath);
    window.location.href = indexPath;
  }

  // Экспортируем для использования в модулях
  window.AuthCheck = {
    checkAccess,
    redirectToMain,
    getRootPath: () => {
      const pathParts = window.location.pathname.split('/');
      const depth = pathParts.filter(p => p && !p.includes('.')).length;
      return '../'.repeat(Math.max(depth - 1, 0)) || './';
    }
  };

  // Автоматически проверяем доступ при загрузке
  checkAccess();
})();

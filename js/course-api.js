/**
 * Course API
 * API обёртка для работы с курсом через Supabase
 *
 * Функционал:
 * - Авторизация через Magic Link
 * - Получение данных пользователя и прогресса
 * - Синхронизация с localStorage (миграция старых данных)
 */

const CourseAPI = (function() {
  // Кеш данных пользователя
  let currentUser = null;
  let userProfile = null;
  let unlockedModulesCache = null;

  // Callback для изменения состояния авторизации
  let authChangeCallbacks = [];

  /**
   * Инициализация API
   * Подписывается на изменения авторизации
   */
  async function init() {
    const supabase = SupabaseClient.getSupabase();
    if (!supabase) {
      console.warn('Supabase не настроен, используем fallback режим');
      return false;
    }

    // Слушаем изменения авторизации
    supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);

      if (event === 'SIGNED_IN' && session) {
        currentUser = session.user;
        loadUserProfile().then(() => {
          notifyAuthChange('signed_in', currentUser);
        });
      } else if (event === 'SIGNED_OUT') {
        currentUser = null;
        userProfile = null;
        unlockedModulesCache = null;
        notifyAuthChange('signed_out', null);
      }
    });

    // Проверяем текущую сессию
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      currentUser = session.user;
      await loadUserProfile();
    }

    return true;
  }

  /**
   * Отправить Magic Link на email
   * @param {string} email
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  async function signIn(email) {
    const supabase = SupabaseClient.getSupabase();
    if (!supabase) {
      return { success: false, error: 'Supabase не настроен' };
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.toLowerCase().trim(),
        options: {
          emailRedirectTo: window.location.origin + '/index.html'
        }
      });

      if (error) {
        console.error('Sign in error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      console.error('Sign in exception:', err);
      return { success: false, error: 'Ошибка подключения' };
    }
  }

  /**
   * Выйти из системы
   * @returns {Promise<void>}
   */
  async function signOut() {
    const supabase = SupabaseClient.getSupabase();
    if (!supabase) return;

    await supabase.auth.signOut();
    currentUser = null;
    userProfile = null;
    unlockedModulesCache = null;
  }

  /**
   * Получить текущего пользователя
   * @returns {Object|null}
   */
  function getCurrentUser() {
    return currentUser;
  }

  /**
   * Получить профиль пользователя из БД
   * @returns {Object|null}
   */
  function getUserProfile() {
    return userProfile;
  }

  /**
   * Загрузить профиль пользователя из БД
   */
  async function loadUserProfile() {
    if (!currentUser) return null;

    const supabase = SupabaseClient.getSupabase();
    if (!supabase) return null;

    try {
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          cohort:cohorts(*)
        `)
        .eq('email', currentUser.email.toLowerCase())
        .single();

      if (error) {
        console.error('Error loading user profile:', error);
        return null;
      }

      userProfile = data;
      return data;
    } catch (err) {
      console.error('Exception loading user profile:', err);
      return null;
    }
  }

  /**
   * Проверить, есть ли пользователь в системе
   * @param {string} email
   * @returns {Promise<boolean>}
   */
  async function checkUserExists(email) {
    const supabase = SupabaseClient.getSupabase();
    if (!supabase) {
      // Fallback: проверяем через новый метод с потоками
      if (typeof COURSE_CONFIG !== 'undefined') {
        return COURSE_CONFIG.isWhitelisted(email);
      }
      return false;
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('email', email.toLowerCase())
        .eq('is_active', true)
        .single();

      return !error && data !== null;
    } catch (err) {
      return false;
    }
  }

  /**
   * Получить список открытых модулей для пользователя
   * @returns {Promise<number[]>}
   */
  async function getUnlockedModules() {
    // Возвращаем кеш если есть
    if (unlockedModulesCache) {
      return unlockedModulesCache;
    }

    const supabase = SupabaseClient.getSupabase();

    // Fallback: используем потоки из config
    if (!supabase || !userProfile) {
      if (typeof COURSE_CONFIG !== 'undefined' && currentUser?.email) {
        // Используем новый метод с поддержкой потоков
        return COURSE_CONFIG.getUnlockedModulesForUser(currentUser.email);
      }
      return [];
    }

    try {
      // Получаем модули, открытые для потока
      const { data: cohortAccess, error: cohortError } = await supabase
        .from('module_access')
        .select('module_id')
        .eq('cohort_id', userProfile.cohort_id)
        .eq('is_unlocked', true);

      if (cohortError) {
        console.error('Error loading cohort access:', cohortError);
      }

      // Получаем индивидуальный доступ (переопределяет поток)
      const { data: userAccess, error: userError } = await supabase
        .from('user_module_access')
        .select('module_id, is_unlocked')
        .eq('user_id', userProfile.id);

      if (userError) {
        console.error('Error loading user access:', userError);
      }

      // Собираем итоговый список
      const cohortModules = (cohortAccess || []).map(a => a.module_id);
      const userOverrides = new Map((userAccess || []).map(a => [a.module_id, a.is_unlocked]));

      // Применяем переопределения
      const unlocked = new Set(cohortModules);
      for (const [moduleId, isUnlocked] of userOverrides) {
        if (isUnlocked) {
          unlocked.add(moduleId);
        } else {
          unlocked.delete(moduleId);
        }
      }

      unlockedModulesCache = Array.from(unlocked).sort((a, b) => a - b);
      return unlockedModulesCache;
    } catch (err) {
      console.error('Exception loading unlocked modules:', err);
      return [];
    }
  }

  /**
   * Сохранить прогресс урока
   * @param {number} moduleId
   * @param {number|string} lessonId
   * @returns {Promise<boolean>}
   */
  async function saveProgress(moduleId, lessonId) {
    const supabase = SupabaseClient.getSupabase();

    // Fallback: сохраняем в localStorage
    if (!supabase || !userProfile) {
      saveProgressToLocalStorage(moduleId, lessonId);
      return true;
    }

    try {
      const { error } = await supabase
        .from('progress')
        .upsert({
          user_id: userProfile.id,
          module_id: moduleId,
          lesson_id: String(lessonId),
          completed_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,module_id,lesson_id'
        });

      if (error) {
        console.error('Error saving progress:', error);
        // Fallback: сохраняем локально
        saveProgressToLocalStorage(moduleId, lessonId);
        return false;
      }

      return true;
    } catch (err) {
      console.error('Exception saving progress:', err);
      saveProgressToLocalStorage(moduleId, lessonId);
      return false;
    }
  }

  /**
   * Получить прогресс пользователя
   * @returns {Promise<Object>} { moduleId: [lessonIds] }
   */
  async function getProgress() {
    const supabase = SupabaseClient.getSupabase();

    // Fallback: берём из localStorage
    if (!supabase || !userProfile) {
      return getProgressFromLocalStorage();
    }

    try {
      const { data, error } = await supabase
        .from('progress')
        .select('module_id, lesson_id, completed_at')
        .eq('user_id', userProfile.id)
        .order('completed_at', { ascending: true });

      if (error) {
        console.error('Error loading progress:', error);
        return getProgressFromLocalStorage();
      }

      // Группируем по модулям
      const progress = {};
      for (const item of data || []) {
        if (!progress[item.module_id]) {
          progress[item.module_id] = [];
        }
        progress[item.module_id].push(item.lesson_id);
      }

      return progress;
    } catch (err) {
      console.error('Exception loading progress:', err);
      return getProgressFromLocalStorage();
    }
  }

  /**
   * Сохранить прогресс чек-листа
   * @param {number} moduleId
   * @param {string} checklistId
   * @param {boolean} isCompleted
   */
  async function saveChecklistProgress(moduleId, checklistId, isCompleted) {
    const supabase = SupabaseClient.getSupabase();

    // Fallback: localStorage
    if (!supabase || !userProfile) {
      localStorage.setItem(`checklist_m${moduleId}_${checklistId}`, isCompleted);
      return true;
    }

    try {
      if (isCompleted) {
        await supabase
          .from('checklist_progress')
          .upsert({
            user_id: userProfile.id,
            module_id: moduleId,
            checklist_id: checklistId,
            is_completed: true
          }, {
            onConflict: 'user_id,module_id,checklist_id'
          });
      } else {
        await supabase
          .from('checklist_progress')
          .delete()
          .eq('user_id', userProfile.id)
          .eq('module_id', moduleId)
          .eq('checklist_id', checklistId);
      }
      return true;
    } catch (err) {
      console.error('Error saving checklist progress:', err);
      localStorage.setItem(`checklist_m${moduleId}_${checklistId}`, isCompleted);
      return false;
    }
  }

  /**
   * Мигрировать данные из localStorage в Supabase
   * Вызывается один раз при первом входе через Magic Link
   */
  async function syncFromLocalStorage() {
    const supabase = SupabaseClient.getSupabase();
    if (!supabase || !userProfile) return false;

    try {
      // Мигрируем прогресс модулей
      const localProgress = getProgressFromLocalStorage();
      for (const [moduleId, lessons] of Object.entries(localProgress)) {
        for (const lessonId of lessons) {
          await saveProgress(parseInt(moduleId), lessonId);
        }
      }

      // Мигрируем чек-листы
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('checklist_m')) {
          const match = key.match(/checklist_m(\d+)_(.+)/);
          if (match) {
            const moduleId = parseInt(match[1]);
            const checklistId = match[2];
            const isCompleted = localStorage.getItem(key) === 'true';
            if (isCompleted) {
              await saveChecklistProgress(moduleId, checklistId, true);
            }
          }
        }
      }

      console.log('LocalStorage data synced to Supabase');
      return true;
    } catch (err) {
      console.error('Error syncing from localStorage:', err);
      return false;
    }
  }

  /**
   * Проверить, является ли пользователь админом
   * @returns {boolean}
   */
  function isAdmin() {
    if (!userProfile) return false;
    return userProfile.role === 'admin' || userProfile.role === 'instructor';
  }

  // === Helper functions ===

  function saveProgressToLocalStorage(moduleId, lessonId) {
    const key = `completedLessons_m${moduleId}`;
    const completed = JSON.parse(localStorage.getItem(key) || '[]');
    if (!completed.includes(String(lessonId))) {
      completed.push(String(lessonId));
      localStorage.setItem(key, JSON.stringify(completed));
    }

    // Также обновляем общий прогресс модулей
    const mainKey = 'completedLessons';
    const mainCompleted = JSON.parse(localStorage.getItem(mainKey) || '[]');
    // Проверяем, все ли уроки модуля пройдены (упрощённо)
    // Это будет обновляться в app.js каждого модуля
  }

  function getProgressFromLocalStorage() {
    const progress = {};

    // Получаем прогресс всех модулей
    for (let moduleId = 1; moduleId <= 12; moduleId++) {
      const key = `completedLessons_m${moduleId}`;
      const completed = JSON.parse(localStorage.getItem(key) || '[]');
      if (completed.length > 0) {
        progress[moduleId] = completed;
      }
    }

    return progress;
  }

  function onAuthChange(callback) {
    authChangeCallbacks.push(callback);
  }

  function notifyAuthChange(event, user) {
    authChangeCallbacks.forEach(cb => {
      try {
        cb(event, user);
      } catch (err) {
        console.error('Auth change callback error:', err);
      }
    });
  }

  // Public API
  return {
    init,
    signIn,
    signOut,
    getCurrentUser,
    getUserProfile,
    loadUserProfile,
    checkUserExists,
    getUnlockedModules,
    saveProgress,
    getProgress,
    saveChecklistProgress,
    syncFromLocalStorage,
    isAdmin,
    onAuthChange
  };
})();

// Автоинициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
  if (SupabaseClient.isSupabaseConfigured()) {
    CourseAPI.init();
  }
});

// Экспортируем глобально
window.CourseAPI = CourseAPI;

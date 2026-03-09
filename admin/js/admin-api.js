/**
 * Admin API
 * API для работы с админкой курса через Supabase
 */

const AdminAPI = (function() {
  let supabase = null;
  let currentAdmin = null;

  /**
   * Инициализация админ API
   */
  async function init() {
    if (typeof SupabaseClient === 'undefined' || !SupabaseClient.isSupabaseConfigured()) {
      console.error('Supabase not configured');
      return false;
    }

    supabase = SupabaseClient.getSupabase();

    // Проверяем авторизацию
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return false;
    }

    // Проверяем, что пользователь - админ
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', session.user.email.toLowerCase())
      .single();

    if (error || !user) {
      console.error('User not found:', error);
      return false;
    }

    if (user.role !== 'admin' && user.role !== 'instructor') {
      console.error('User is not admin');
      return false;
    }

    currentAdmin = user;
    return true;
  }

  /**
   * Получить текущего админа
   */
  function getCurrentAdmin() {
    return currentAdmin;
  }

  /**
   * Выйти из системы
   */
  async function signOut() {
    if (supabase) {
      await supabase.auth.signOut();
    }
    currentAdmin = null;
  }

  // =============================================
  // USERS
  // =============================================

  /**
   * Получить список всех пользователей
   */
  async function getUsers() {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        cohort:cohorts(id, name)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
      return [];
    }

    return data || [];
  }

  /**
   * Получить одного пользователя
   */
  async function getUser(userId) {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        cohort:cohorts(id, name)
      `)
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }

    return data;
  }

  /**
   * Создать пользователя
   */
  async function createUser(userData) {
    const { data, error } = await supabase
      .from('users')
      .insert({
        email: userData.email.toLowerCase(),
        name: userData.name,
        cohort_id: userData.cohort_id,
        role: userData.role || 'student',
        is_active: true
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating user:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  }

  /**
   * Обновить пользователя
   */
  async function updateUser(userId, userData) {
    const updates = {};
    if (userData.name !== undefined) updates.name = userData.name;
    if (userData.email !== undefined) updates.email = userData.email.toLowerCase();
    if (userData.cohort_id !== undefined) updates.cohort_id = userData.cohort_id;
    if (userData.role !== undefined) updates.role = userData.role;
    if (userData.is_active !== undefined) updates.is_active = userData.is_active;

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating user:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  }

  /**
   * Удалить пользователя
   */
  async function deleteUser(userId) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);

    if (error) {
      console.error('Error deleting user:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  }

  // =============================================
  // COHORTS
  // =============================================

  /**
   * Получить список потоков
   */
  async function getCohorts() {
    const { data, error } = await supabase
      .from('cohorts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching cohorts:', error);
      return [];
    }

    return data || [];
  }

  /**
   * Получить один поток с количеством учеников
   */
  async function getCohort(cohortId) {
    const { data: cohort, error: cohortError } = await supabase
      .from('cohorts')
      .select('*')
      .eq('id', cohortId)
      .single();

    if (cohortError) {
      console.error('Error fetching cohort:', cohortError);
      return null;
    }

    // Получаем количество учеников
    const { count } = await supabase
      .from('users')
      .select('id', { count: 'exact' })
      .eq('cohort_id', cohortId);

    cohort.user_count = count || 0;

    return cohort;
  }

  /**
   * Создать поток
   */
  async function createCohort(cohortData) {
    const { data, error } = await supabase
      .from('cohorts')
      .insert({
        name: cohortData.name,
        description: cohortData.description,
        start_date: cohortData.start_date,
        is_active: cohortData.is_active !== false
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating cohort:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  }

  /**
   * Обновить поток
   */
  async function updateCohort(cohortId, cohortData) {
    const updates = {};
    if (cohortData.name !== undefined) updates.name = cohortData.name;
    if (cohortData.description !== undefined) updates.description = cohortData.description;
    if (cohortData.start_date !== undefined) updates.start_date = cohortData.start_date;
    if (cohortData.is_active !== undefined) updates.is_active = cohortData.is_active;

    const { data, error } = await supabase
      .from('cohorts')
      .update(updates)
      .eq('id', cohortId)
      .select()
      .single();

    if (error) {
      console.error('Error updating cohort:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  }

  /**
   * Удалить поток
   */
  async function deleteCohort(cohortId) {
    const { error } = await supabase
      .from('cohorts')
      .delete()
      .eq('id', cohortId);

    if (error) {
      console.error('Error deleting cohort:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  }

  // =============================================
  // MODULES
  // =============================================

  /**
   * Получить список модулей
   */
  async function getModules() {
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching modules:', error);
      return [];
    }

    return data || [];
  }

  /**
   * Обновить модуль
   */
  async function updateModule(moduleId, moduleData) {
    const { data, error } = await supabase
      .from('modules')
      .update(moduleData)
      .eq('id', moduleId)
      .select()
      .single();

    if (error) {
      console.error('Error updating module:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  }

  // =============================================
  // MODULE ACCESS
  // =============================================

  /**
   * Получить доступ к модулям для потока
   */
  async function getCohortModuleAccess(cohortId) {
    const { data, error } = await supabase
      .from('module_access')
      .select('module_id, is_unlocked, unlocked_at')
      .eq('cohort_id', cohortId);

    if (error) {
      console.error('Error fetching module access:', error);
      return [];
    }

    return data || [];
  }

  /**
   * Установить доступ к модулям для потока
   */
  async function setCohortModuleAccess(cohortId, moduleIds, isUnlocked) {
    const records = moduleIds.map(moduleId => ({
      cohort_id: cohortId,
      module_id: moduleId,
      is_unlocked: isUnlocked,
      unlocked_at: isUnlocked ? new Date().toISOString() : null
    }));

    const { error } = await supabase
      .from('module_access')
      .upsert(records, { onConflict: 'cohort_id,module_id' });

    if (error) {
      console.error('Error setting module access:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  }

  /**
   * Получить индивидуальный доступ пользователя
   */
  async function getUserModuleAccess(userId) {
    const { data, error } = await supabase
      .from('user_module_access')
      .select('module_id, is_unlocked')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user module access:', error);
      return [];
    }

    return data || [];
  }

  /**
   * Установить индивидуальный доступ пользователя
   */
  async function setUserModuleAccess(userId, moduleId, isUnlocked) {
    if (isUnlocked === null) {
      // Удаляем переопределение
      const { error } = await supabase
        .from('user_module_access')
        .delete()
        .eq('user_id', userId)
        .eq('module_id', moduleId);

      if (error) {
        console.error('Error deleting user module access:', error);
        return { success: false, error: error.message };
      }
    } else {
      // Устанавливаем переопределение
      const { error } = await supabase
        .from('user_module_access')
        .upsert({
          user_id: userId,
          module_id: moduleId,
          is_unlocked: isUnlocked
        }, { onConflict: 'user_id,module_id' });

      if (error) {
        console.error('Error setting user module access:', error);
        return { success: false, error: error.message };
      }
    }

    return { success: true };
  }

  // =============================================
  // PROGRESS
  // =============================================

  /**
   * Получить прогресс пользователя
   */
  async function getUserProgress(userId) {
    const { data, error } = await supabase
      .from('progress')
      .select('module_id, lesson_id, completed_at')
      .eq('user_id', userId)
      .order('completed_at', { ascending: true });

    if (error) {
      console.error('Error fetching user progress:', error);
      return [];
    }

    return data || [];
  }

  /**
   * Получить общую статистику прогресса
   */
  async function getProgressStats() {
    const { data, error } = await supabase
      .from('progress')
      .select('user_id, module_id, lesson_id');

    if (error) {
      console.error('Error fetching progress stats:', error);
      return { totalLessons: 0, byModule: {} };
    }

    const byModule = {};
    const userModules = new Set();

    for (const item of data || []) {
      const key = `${item.user_id}-${item.module_id}`;
      userModules.add(key);

      if (!byModule[item.module_id]) {
        byModule[item.module_id] = { lessons: 0, users: new Set() };
      }
      byModule[item.module_id].lessons++;
      byModule[item.module_id].users.add(item.user_id);
    }

    // Преобразуем Sets в counts
    for (const moduleId of Object.keys(byModule)) {
      byModule[moduleId].usersCount = byModule[moduleId].users.size;
      delete byModule[moduleId].users;
    }

    return {
      totalLessons: data?.length || 0,
      uniqueUserModules: userModules.size,
      byModule
    };
  }

  // =============================================
  // STATS
  // =============================================

  /**
   * Получить общую статистику для дашборда
   */
  async function getDashboardStats() {
    const [usersResult, cohortsResult, modulesResult] = await Promise.all([
      supabase.from('users').select('id', { count: 'exact' }),
      supabase.from('cohorts').select('id', { count: 'exact' }).eq('is_active', true),
      supabase.from('modules').select('id', { count: 'exact' }).eq('is_visible', true)
    ]);

    const progressStats = await getProgressStats();

    return {
      usersCount: usersResult.count || 0,
      cohortsCount: cohortsResult.count || 0,
      modulesCount: modulesResult.count || 0,
      lessonsCompleted: progressStats.totalLessons
    };
  }

  /**
   * Получить последнюю активность
   */
  async function getRecentActivity(limit = 10) {
    const { data, error } = await supabase
      .from('progress')
      .select(`
        module_id,
        lesson_id,
        completed_at,
        user:users(email, name)
      `)
      .order('completed_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent activity:', error);
      return [];
    }

    return data || [];
  }

  // Public API
  return {
    init,
    getCurrentAdmin,
    signOut,

    // Users
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,

    // Cohorts
    getCohorts,
    getCohort,
    createCohort,
    updateCohort,
    deleteCohort,

    // Modules
    getModules,
    updateModule,

    // Module Access
    getCohortModuleAccess,
    setCohortModuleAccess,
    getUserModuleAccess,
    setUserModuleAccess,

    // Progress
    getUserProgress,
    getProgressStats,

    // Stats
    getDashboardStats,
    getRecentActivity
  };
})();

window.AdminAPI = AdminAPI;

/**
 * Supabase Client Initialization
 * Инициализация клиента Supabase для работы с БД и авторизацией
 */

// Конфигурация Supabase (будет переопределена при деплое)
const SUPABASE_CONFIG = {
  url: 'YOUR_SUPABASE_URL',
  anonKey: 'YOUR_SUPABASE_ANON_KEY'
};

// Singleton instance
let supabaseClient = null;

/**
 * Получить экземпляр Supabase клиента
 * @returns {Object} Supabase client
 */
function getSupabase() {
  if (!supabaseClient) {
    if (!window.supabase) {
      console.error('Supabase SDK не загружен. Добавьте <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>');
      return null;
    }

    supabaseClient = window.supabase.createClient(
      SUPABASE_CONFIG.url,
      SUPABASE_CONFIG.anonKey
    );
  }
  return supabaseClient;
}

/**
 * Проверить, настроен ли Supabase
 * @returns {boolean}
 */
function isSupabaseConfigured() {
  return SUPABASE_CONFIG.url !== 'YOUR_SUPABASE_URL' &&
         SUPABASE_CONFIG.anonKey !== 'YOUR_SUPABASE_ANON_KEY';
}

// Экспортируем для использования в других модулях
window.SupabaseClient = {
  getSupabase,
  isSupabaseConfigured,
  config: SUPABASE_CONFIG
};

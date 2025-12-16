/**
 * Admin Access System
 * Белый список email для доступа ко всем урокам
 */

// ==========================================
// БЕЛЫЙ СПИСОК АДМИНИСТРАТОРОВ
// ==========================================
// Добавьте email-адреса, которые имеют доступ ко всем урокам
const ADMIN_EMAILS = [
  'admin@example.com',
  'teacher@vibecoding.ru',
  // Добавьте свои email-адреса здесь
];

// ==========================================
// ADMIN FUNCTIONS
// ==========================================

function isAdmin() {
  const adminEmail = localStorage.getItem('adminEmail');
  return adminEmail && ADMIN_EMAILS.includes(adminEmail.toLowerCase());
}

function getAdminEmail() {
  return localStorage.getItem('adminEmail');
}

function adminLogin(email) {
  const normalizedEmail = email.toLowerCase().trim();
  if (ADMIN_EMAILS.includes(normalizedEmail)) {
    localStorage.setItem('adminEmail', normalizedEmail);
    return true;
  }
  return false;
}

function adminLogout() {
  localStorage.removeItem('adminEmail');
  window.location.reload();
}

// ==========================================
// ADMIN UI
// ==========================================

function initAdminPanel() {
  // Добавляем кнопку админки в header
  const headerActions = document.querySelector('.header-actions');
  if (!headerActions) return;

  const adminBtn = document.createElement('div');
  adminBtn.className = 'admin-btn';
  adminBtn.innerHTML = isAdmin()
    ? `<span class="admin-badge">👑 ${getAdminEmail()}</span><button class="admin-logout-btn" title="Выйти">✕</button>`
    : `<button class="admin-login-btn" title="Вход для преподавателей">🔑</button>`;

  headerActions.insertBefore(adminBtn, headerActions.firstChild);

  // Event listeners
  const loginBtn = adminBtn.querySelector('.admin-login-btn');
  const logoutBtn = adminBtn.querySelector('.admin-logout-btn');

  if (loginBtn) {
    loginBtn.addEventListener('click', showLoginModal);
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', adminLogout);
  }

  // Добавляем стили
  addAdminStyles();
}

function showLoginModal() {
  // Удаляем существующий модал
  const existing = document.querySelector('.admin-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.className = 'admin-modal';
  modal.innerHTML = `
    <div class="admin-modal-content">
      <button class="admin-modal-close">✕</button>
      <h3>🔑 Вход для преподавателей</h3>
      <p>Введите email из белого списка</p>
      <form class="admin-login-form">
        <input type="email" class="admin-email-input" placeholder="your@email.com" required>
        <button type="submit" class="btn btn-primary">Войти</button>
      </form>
      <div class="admin-login-error"></div>
    </div>
  `;

  document.body.appendChild(modal);

  // Focus on input
  const input = modal.querySelector('.admin-email-input');
  setTimeout(() => input.focus(), 100);

  // Close button
  modal.querySelector('.admin-modal-close').addEventListener('click', () => modal.remove());

  // Click outside to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  // Form submit
  modal.querySelector('.admin-login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value;
    const errorDiv = modal.querySelector('.admin-login-error');

    if (adminLogin(email)) {
      modal.remove();
      showAdminWelcome();
      window.location.reload();
    } else {
      errorDiv.textContent = '❌ Email не найден в белом списке';
      errorDiv.style.display = 'block';
      input.classList.add('error');
    }
  });

  // Escape to close
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      modal.remove();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}

function showAdminWelcome() {
  const toast = document.createElement('div');
  toast.className = 'admin-toast';
  toast.innerHTML = `
    <div class="admin-toast-content">
      <span>👑</span>
      <p>Добро пожаловать! Все уроки разблокированы.</p>
    </div>
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function addAdminStyles() {
  if (document.querySelector('#admin-styles')) return;

  const styles = document.createElement('style');
  styles.id = 'admin-styles';
  styles.textContent = `
    .admin-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-right: 1rem;
    }

    .admin-login-btn {
      background: none;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 0.5rem 0.75rem;
      cursor: pointer;
      font-size: 1rem;
      transition: var(--transition);
    }

    .admin-login-btn:hover {
      background: var(--bg-main);
      border-color: var(--primary);
    }

    .admin-badge {
      background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
      color: white;
      padding: 0.35rem 0.75rem;
      border-radius: var(--radius);
      font-size: 0.8rem;
      font-weight: 500;
    }

    .admin-logout-btn {
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      padding: 0.25rem;
      font-size: 0.9rem;
      transition: var(--transition);
    }

    .admin-logout-btn:hover {
      color: var(--danger);
    }

    .admin-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1001;
      animation: fadeIn 0.2s ease;
    }

    .admin-modal-content {
      background: white;
      border-radius: var(--radius-lg);
      padding: 2rem;
      width: 90%;
      max-width: 400px;
      position: relative;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    }

    .admin-modal-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      font-size: 1.25rem;
      cursor: pointer;
      color: var(--text-muted);
      transition: var(--transition);
    }

    .admin-modal-close:hover {
      color: var(--danger);
    }

    .admin-modal-content h3 {
      margin: 0 0 0.5rem;
      font-size: 1.25rem;
    }

    .admin-modal-content p {
      color: var(--text-secondary);
      margin: 0 0 1.5rem;
      font-size: 0.9rem;
    }

    .admin-login-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .admin-email-input {
      padding: 0.75rem 1rem;
      border: 2px solid var(--border);
      border-radius: var(--radius);
      font-size: 1rem;
      transition: var(--transition);
    }

    .admin-email-input:focus {
      outline: none;
      border-color: var(--primary);
    }

    .admin-email-input.error {
      border-color: var(--danger);
    }

    .admin-login-error {
      display: none;
      color: var(--danger);
      font-size: 0.875rem;
      text-align: center;
    }

    .admin-toast {
      position: fixed;
      top: 1.5rem;
      right: 1.5rem;
      z-index: 1002;
      animation: slideIn 0.3s ease;
    }

    .admin-toast-content {
      background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .admin-toast-content span {
      font-size: 1.5rem;
    }

    .admin-toast-content p {
      margin: 0;
      font-weight: 500;
    }

    .admin-toast.fade-out {
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @media (max-width: 768px) {
      .admin-badge {
        display: none;
      }

      .admin-btn {
        margin-right: 0.5rem;
      }
    }
  `;

  document.head.appendChild(styles);
}

// Export for use in app.js
window.AdminPanel = {
  isAdmin,
  getAdminEmail,
  adminLogin,
  adminLogout,
  initAdminPanel
};

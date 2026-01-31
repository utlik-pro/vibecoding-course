/**
 * Main Application JavaScript
 * Интерактивная презентация - Модуль 8: Базы данных
 */

// ==========================================
// LESSON ACCESS CONFIGURATION
// ==========================================
const MODULE_KEY = 'completedLessons_m8';
const MODULE_ID = 8;
const TOTAL_LESSONS = 10;

function getUnlockedLessons() {
  if (typeof AdminPanel !== 'undefined' && AdminPanel.isAdmin()) {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  const completed = JSON.parse(localStorage.getItem(MODULE_KEY) || '[]');
  const unlocked = [1];
  completed.forEach(id => {
    const num = parseInt(id, 10);
    if (!unlocked.includes(num)) unlocked.push(num);
    if (!unlocked.includes(num + 1) && num + 1 <= 10) unlocked.push(num + 1);
  });
  return unlocked;
}

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  if (typeof AdminPanel !== 'undefined') {
    AdminPanel.initAdminPanel();
  }
  initLessonLocks();
  initSidebar();
  initTeacherMode();
  initTimer();
  initAccordions();
  initTabs();
  initTooltips();
  initCodeBlocks();
  initChecklists();
  initKeyboardNav();
  initProgress();
}

// ==========================================
// LESSON LOCKS
// ==========================================

function initLessonLocks() {
  const UNLOCKED_LESSONS = getUnlockedLessons();

  const navItems = document.querySelectorAll('.nav-item[data-lesson]');
  navItems.forEach(item => {
    const lessonNum = parseInt(item.dataset.lesson, 10);
    if (!UNLOCKED_LESSONS.includes(lessonNum)) {
      item.classList.add('locked');
      item.addEventListener('click', (e) => {
        e.preventDefault();
        showLockedMessage(lessonNum);
      });
    }
  });

  const lessonCards = document.querySelectorAll('.lesson-card');
  lessonCards.forEach(card => {
    const href = card.getAttribute('href');
    if (!href) return;

    const match = href.match(/lesson-(\d+)\.html/);
    if (match) {
      const lessonNum = parseInt(match[1], 10);
      if (!UNLOCKED_LESSONS.includes(lessonNum)) {
        card.classList.add('locked');
        card.addEventListener('click', (e) => {
          e.preventDefault();
          showLockedMessage(lessonNum);
        });
      }
    }

    if (href === 'project.html' && !UNLOCKED_LESSONS.includes(10)) {
      card.classList.add('locked');
      card.addEventListener('click', (e) => {
        e.preventDefault();
        showLockedMessage(10);
      });
    }
  });

  const currentPath = window.location.pathname;
  const pageMatch = currentPath.match(/lesson-(\d+)\.html/);
  if (pageMatch) {
    const currentLesson = parseInt(pageMatch[1], 10);
    if (!UNLOCKED_LESSONS.includes(currentLesson)) {
      window.location.href = 'index.html';
    }
  }
  if (currentPath.includes('project.html') && !UNLOCKED_LESSONS.includes(10)) {
    window.location.href = 'index.html';
  }
}

function showLockedMessage(lessonNum) {
  const existing = document.querySelector('.locked-message');
  if (existing) existing.remove();

  const msg = document.createElement('div');
  msg.className = 'locked-message';
  msg.innerHTML = `
    <div class="locked-message-content">
      <span class="locked-message-icon">🔒</span>
      <p>Урок ${lessonNum} ещё не открыт</p>
      <small>Пройдите предыдущие уроки</small>
    </div>
  `;
  document.body.appendChild(msg);

  setTimeout(() => {
    msg.classList.add('fade-out');
    setTimeout(() => msg.remove(), 300);
  }, 2000);
}

// ==========================================
// SIDEBAR NAVIGATION
// ==========================================

function initSidebar() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.overlay');

  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay?.classList.toggle('show');
    });

    overlay?.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
    });
  }

  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    if (item.getAttribute('href') && currentPath.includes(item.getAttribute('href'))) {
      item.classList.add('active');
    }
  });
}

// ==========================================
// TEACHER MODE
// ==========================================

function initTeacherMode() {
  const toggle = document.querySelector('.mode-toggle');
  if (!toggle) return;

  const savedMode = localStorage.getItem('teacherMode');
  if (savedMode === 'true') {
    document.body.classList.add('teacher-mode');
    toggle.classList.add('active');
    updateToggleLabel(toggle, true);
  }

  toggle.addEventListener('click', () => {
    const isActive = toggle.classList.toggle('active');
    document.body.classList.toggle('teacher-mode', isActive);
    localStorage.setItem('teacherMode', isActive);
    updateToggleLabel(toggle, isActive);
  });
}

function updateToggleLabel(toggle, isTeacher) {
  const label = toggle.querySelector('.mode-toggle-label');
  if (label) {
    label.textContent = isTeacher ? 'Режим преподавателя' : 'Режим студента';
  }
}

// ==========================================
// TIMER
// ==========================================

let timerInterval = null;
let timerSeconds = 0;
let timerRunning = false;

function initTimer() {
  const timerDisplay = document.querySelector('.timer-display');
  const timerBtn = document.querySelector('.timer-btn');
  const timerReset = document.querySelector('.timer-reset');

  if (!timerDisplay) return;

  const savedTime = sessionStorage.getItem('lessonTimer_m8');
  if (savedTime) {
    timerSeconds = parseInt(savedTime, 10);
    updateTimerDisplay(timerDisplay);
  }

  if (timerBtn) {
    timerBtn.addEventListener('click', () => {
      if (timerRunning) {
        pauseTimer();
        timerBtn.textContent = '▶';
        timerBtn.title = 'Запустить';
      } else {
        startTimer(timerDisplay);
        timerBtn.textContent = '⏸';
        timerBtn.title = 'Пауза';
      }
    });
  }

  if (timerReset) {
    timerReset.addEventListener('click', () => {
      resetTimer(timerDisplay);
    });
  }
}

function startTimer(display) {
  timerRunning = true;
  timerInterval = setInterval(() => {
    timerSeconds++;
    updateTimerDisplay(display);
    sessionStorage.setItem('lessonTimer_m8', timerSeconds);
  }, 1000);
}

function pauseTimer() {
  timerRunning = false;
  clearInterval(timerInterval);
}

function resetTimer(display) {
  pauseTimer();
  timerSeconds = 0;
  updateTimerDisplay(display);
  sessionStorage.removeItem('lessonTimer_m8');
  const timerBtn = document.querySelector('.timer-btn');
  if (timerBtn) {
    timerBtn.textContent = '▶';
    timerBtn.title = 'Запустить';
  }
}

function updateTimerDisplay(display) {
  const hours = Math.floor(timerSeconds / 3600);
  const minutes = Math.floor((timerSeconds % 3600) / 60);
  const seconds = timerSeconds % 60;

  if (hours > 0) {
    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  } else {
    display.textContent = `${pad(minutes)}:${pad(seconds)}`;
  }
}

function pad(num) {
  return num.toString().padStart(2, '0');
}

// ==========================================
// ACCORDIONS
// ==========================================

function initAccordions() {
  const accordions = document.querySelectorAll('.accordion-item');

  accordions.forEach(accordion => {
    const header = accordion.querySelector('.accordion-header');

    header?.addEventListener('click', () => {
      const parent = accordion.closest('.accordion');
      if (parent && !parent.classList.contains('multi-open')) {
        parent.querySelectorAll('.accordion-item.open').forEach(item => {
          if (item !== accordion) {
            item.classList.remove('open');
          }
        });
      }

      accordion.classList.toggle('open');
    });
  });

  document.querySelectorAll('.accordion.open-first').forEach(accordion => {
    const firstItem = accordion.querySelector('.accordion-item');
    firstItem?.classList.add('open');
  });
}

// ==========================================
// TABS
// ==========================================

function initTabs() {
  const tabContainers = document.querySelectorAll('.tabs');

  tabContainers.forEach(container => {
    const buttons = container.querySelectorAll('.tab-btn');
    const contents = container.querySelectorAll('.tab-content');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.tab;

        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        contents.forEach(content => {
          content.classList.toggle('active', content.id === targetId);
        });
      });
    });

    if (buttons.length && !container.querySelector('.tab-btn.active')) {
      buttons[0].click();
    }
  });
}

// ==========================================
// TOOLTIPS
// ==========================================

function initTooltips() {
  if (typeof GLOSSARY !== 'undefined') {
    const tooltipTriggers = document.querySelectorAll('.tooltip-trigger');

    tooltipTriggers.forEach(trigger => {
      const term = trigger.dataset.term || trigger.textContent;
      const glossaryEntry = GLOSSARY[term];

      if (glossaryEntry && !trigger.querySelector('.tooltip')) {
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.innerHTML = `
          <strong>${glossaryEntry.full}</strong><br>
          ${glossaryEntry.definition}
        `;
        trigger.appendChild(tooltip);
      }
    });
  }

  document.querySelectorAll('.tooltip-trigger').forEach(trigger => {
    trigger.addEventListener('mouseenter', () => {
      const tooltip = trigger.querySelector('.tooltip');
      if (!tooltip) return;

      const rect = tooltip.getBoundingClientRect();

      if (rect.right > window.innerWidth) {
        tooltip.style.left = 'auto';
        tooltip.style.right = '0';
        tooltip.style.transform = 'none';
      }

      if (rect.left < 0) {
        tooltip.style.left = '0';
        tooltip.style.transform = 'none';
      }
    });
  });
}

// ==========================================
// CODE BLOCKS
// ==========================================

function initCodeBlocks() {
  const codeBlocks = document.querySelectorAll('.code-block');

  codeBlocks.forEach(block => {
    const copyBtn = block.querySelector('.code-copy-btn');
    const codeElement = block.querySelector('code');

    if (copyBtn && codeElement) {
      copyBtn.addEventListener('click', async () => {
        const code = codeElement.textContent;

        try {
          await navigator.clipboard.writeText(code);
          copyBtn.textContent = 'Скопировано!';
          copyBtn.classList.add('copied');

          setTimeout(() => {
            copyBtn.textContent = 'Копировать';
            copyBtn.classList.remove('copied');
          }, 2000);
        } catch (err) {
          copyBtn.textContent = 'Ошибка';
          setTimeout(() => {
            copyBtn.textContent = 'Копировать';
          }, 2000);
        }
      });
    }
  });

  document.querySelectorAll('pre code').forEach(block => {
    highlightSyntax(block);
  });
}

function highlightSyntax(element) {
  let code = element.innerHTML;

  // SQL Keywords
  const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
                    'class', 'import', 'export', 'from', 'async', 'await', 'try', 'catch',
                    'SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET',
                    'DELETE', 'CREATE', 'TABLE', 'ALTER', 'DROP', 'JOIN', 'ON', 'AND', 'OR',
                    'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'AS', 'NOT', 'NULL',
                    'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'DEFAULT', 'UNIQUE', 'INDEX',
                    'LEFT', 'RIGHT', 'INNER', 'OUTER', 'FULL', 'CROSS', 'NATURAL',
                    'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'DISTINCT', 'ALL', 'CASE', 'WHEN', 'THEN', 'END',
                    'LIKE', 'IN', 'BETWEEN', 'IS', 'EXISTS', 'SERIAL', 'TEXT', 'INTEGER', 'BOOLEAN',
                    'NUMERIC', 'DATE', 'TIMESTAMP', 'TIMESTAMPTZ', 'BEGIN', 'COMMIT', 'ROLLBACK',
                    'ADD', 'COLUMN', 'CONSTRAINT', 'CASCADE', 'VIEW', 'COALESCE', 'NOW', 'CURRENT_DATE',
                    'type', 'interface', 'extends', 'implements', 'public', 'private', 'protected'];

  keywords.forEach(kw => {
    const regex = new RegExp(`\\b(${kw})\\b`, 'g');
    code = code.replace(regex, '<span class="token-keyword">$1</span>');
  });

  // Strings
  code = code.replace(/(["'`])(?:(?!\1)[^\\]|\\.)*\1/g, '<span class="token-string">$&</span>');

  // Numbers
  code = code.replace(/\b(\d+\.?\d*)\b/g, '<span class="token-number">$1</span>');

  // Comments
  code = code.replace(/(\/\/.*$)/gm, '<span class="token-comment">$1</span>');
  code = code.replace(/(--.*$)/gm, '<span class="token-comment">$1</span>');
  code = code.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="token-comment">$1</span>');

  // Functions
  code = code.replace(/(\w+)(\s*\()/g, '<span class="token-function">$1</span>$2');

  element.innerHTML = code;
}

// ==========================================
// CHECKLISTS
// ==========================================

function initChecklists() {
  const checkboxes = document.querySelectorAll('.checklist-checkbox');

  checkboxes.forEach(checkbox => {
    const id = checkbox.dataset.id;
    if (id) {
      const saved = localStorage.getItem(`checklist_m8_${id}`);
      if (saved === 'true') {
        checkbox.classList.add('checked');
        checkbox.closest('.checklist-item')?.classList.add('completed');
      }
    }

    checkbox.addEventListener('click', () => {
      checkbox.classList.toggle('checked');
      const isChecked = checkbox.classList.contains('checked');
      checkbox.closest('.checklist-item')?.classList.toggle('completed', isChecked);

      if (id) {
        localStorage.setItem(`checklist_m8_${id}`, isChecked);
      }

      updateChecklistProgress(checkbox.closest('.checklist'));
    });
  });

  document.querySelectorAll('.checklist').forEach(list => {
    updateChecklistProgress(list);
  });
}

function updateChecklistProgress(checklist) {
  if (!checklist) return;

  const total = checklist.querySelectorAll('.checklist-checkbox').length;
  const checked = checklist.querySelectorAll('.checklist-checkbox.checked').length;

  const progressBar = checklist.closest('.card')?.querySelector('.progress-fill');
  const progressText = checklist.closest('.card')?.querySelector('.progress-text');

  if (progressBar) {
    progressBar.style.width = `${(checked / total) * 100}%`;
  }

  if (progressText) {
    progressText.textContent = `${checked} из ${total} выполнено`;
  }
}

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================

function initKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const navArrow = e.key === 'ArrowRight'
        ? document.querySelector('.nav-arrow-next')
        : document.querySelector('.nav-arrow-prev');

      if (navArrow && !isInputFocused()) {
        navArrow.click();
      }
    }

    if (e.key === 'Escape') {
      const sidebar = document.querySelector('.sidebar.open');
      const overlay = document.querySelector('.overlay.show');
      sidebar?.classList.remove('open');
      overlay?.classList.remove('show');
    }

    if (e.key === 't' && !isInputFocused()) {
      const toggle = document.querySelector('.mode-toggle');
      toggle?.click();
    }
  });
}

function isInputFocused() {
  const active = document.activeElement;
  return active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable);
}

// ==========================================
// PROGRESS TRACKING
// ==========================================

function initProgress() {
  const completedLessons = JSON.parse(localStorage.getItem(MODULE_KEY) || '[]');

  completedLessons.forEach(lessonId => {
    const navItem = document.querySelector(`.nav-item[data-lesson="${lessonId}"]`);
    navItem?.classList.add('completed');
  });

  const completeBtn = document.querySelector('.mark-complete-btn');
  if (completeBtn) {
    const currentLesson = completeBtn.dataset.lesson;

    if (completedLessons.includes(currentLesson)) {
      completeBtn.textContent = 'Урок пройден ✓';
      completeBtn.classList.add('btn-success');
      completeBtn.disabled = true;
    }

    completeBtn.addEventListener('click', () => {
      if (!completedLessons.includes(currentLesson)) {
        completedLessons.push(currentLesson);
        localStorage.setItem(MODULE_KEY, JSON.stringify(completedLessons));

        completeBtn.textContent = 'Урок пройден ✓';
        completeBtn.classList.remove('btn-primary');
        completeBtn.classList.add('btn-success');
        completeBtn.disabled = true;

        const navItem = document.querySelector(`.nav-item[data-lesson="${currentLesson}"]`);
        navItem?.classList.add('completed');

        checkModuleCompletion(completedLessons);
      }
    });
  }

  updateOverallProgress(completedLessons.length);
}

function checkModuleCompletion(completedLessons) {
  if (completedLessons.length >= TOTAL_LESSONS) {
    const mainCompleted = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    if (!mainCompleted.includes(MODULE_ID)) {
      mainCompleted.push(MODULE_ID);
      localStorage.setItem('completedLessons', JSON.stringify(mainCompleted));
      console.log(`Модуль ${MODULE_ID} завершён!`);
    }
  }
}

function updateOverallProgress(completed) {
  const totalLessons = 10;
  const progressFill = document.querySelector('.sidebar .progress-fill');
  const progressText = document.querySelector('.sidebar .progress-text');

  if (progressFill) {
    progressFill.style.width = `${(completed / totalLessons) * 100}%`;
  }

  if (progressText) {
    progressText.textContent = `${completed} из ${totalLessons} уроков`;
  }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function scrollToElement(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function formatDate(date) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

window.PresentationApp = {
  initApp,
  scrollToElement,
  highlightSyntax
};

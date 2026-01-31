// =============================================
// Module 10: Git, API & Payments - App JS
// =============================================

document.addEventListener('DOMContentLoaded', function() {
  initProgress();
  initNavigation();
  initQuiz();
  initChecklist();
});

// Progress Tracking
function initProgress() {
  const totalLessons = 10;
  const completedLessons = getCompletedLessons();
  updateProgressUI(completedLessons.length, totalLessons);
  markCompletedLessons(completedLessons);
}

function getCompletedLessons() {
  const saved = localStorage.getItem('module10_completed');
  return saved ? JSON.parse(saved) : [];
}

function saveCompletedLessons(lessons) {
  localStorage.setItem('module10_completed', JSON.stringify(lessons));
}

function markLessonComplete(lessonNum) {
  const completed = getCompletedLessons();
  if (!completed.includes(lessonNum)) {
    completed.push(lessonNum);
    saveCompletedLessons(completed);
    updateProgressUI(completed.length, 10);
    markCompletedLessons(completed);
  }
}

function updateProgressUI(completed, total) {
  const progressFill = document.querySelector('.progress-fill');
  const progressText = document.querySelector('.progress-text');

  if (progressFill && progressText) {
    const percentage = (completed / total) * 100;
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${completed} из ${total} уроков`;
  }
}

function markCompletedLessons(completed) {
  completed.forEach(num => {
    const navItem = document.querySelector(`[data-lesson="${num}"]`);
    if (navItem) {
      navItem.classList.add('completed');
    }
  });
}

// Navigation
function initNavigation() {
  // Mark current page as active
  const currentPath = window.location.pathname.split('/').pop();
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPath) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }
}

// Quiz Functionality
function initQuiz() {
  const quizOptions = document.querySelectorAll('.quiz-option');

  quizOptions.forEach(option => {
    option.addEventListener('click', function() {
      const question = this.closest('.quiz-question');
      const options = question.querySelectorAll('.quiz-option');
      const isCorrect = this.dataset.correct === 'true';

      // Remove previous selections
      options.forEach(opt => {
        opt.classList.remove('selected', 'correct', 'incorrect');
      });

      // Mark selection
      this.classList.add('selected');

      if (isCorrect) {
        this.classList.add('correct');
        showQuizFeedback(question, true);
      } else {
        this.classList.add('incorrect');
        // Show correct answer
        options.forEach(opt => {
          if (opt.dataset.correct === 'true') {
            opt.classList.add('correct');
          }
        });
        showQuizFeedback(question, false);
      }
    });
  });
}

function showQuizFeedback(question, isCorrect) {
  let feedback = question.querySelector('.quiz-feedback');

  if (!feedback) {
    feedback = document.createElement('div');
    feedback.className = 'quiz-feedback';
    question.appendChild(feedback);
  }

  feedback.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
  feedback.textContent = isCorrect ? 'Правильно!' : 'Неправильно. Попробуйте ещё раз.';
  feedback.style.cssText = `
    margin-top: 1rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-weight: 500;
    background: ${isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
    color: ${isCorrect ? '#059669' : '#dc2626'};
  `;
}

// Checklist Functionality
function initChecklist() {
  const checklistItems = document.querySelectorAll('.checklist-item input[type="checkbox"]');
  const currentLesson = getCurrentLesson();

  // Load saved state
  const savedChecklist = getChecklistState(currentLesson);
  checklistItems.forEach((item, index) => {
    if (savedChecklist[index]) {
      item.checked = true;
    }
  });

  // Save on change
  checklistItems.forEach((item, index) => {
    item.addEventListener('change', function() {
      const state = getChecklistState(currentLesson);
      state[index] = this.checked;
      saveChecklistState(currentLesson, state);

      // Check if all items are completed
      const allChecked = Array.from(checklistItems).every(cb => cb.checked);
      if (allChecked) {
        markLessonComplete(currentLesson);
        showCompletionMessage();
      }
    });
  });
}

function getCurrentLesson() {
  const path = window.location.pathname;
  const match = path.match(/lesson-(\d+)/);
  if (match) return parseInt(match[1]);
  if (path.includes('project')) return 10;
  return 0;
}

function getChecklistState(lesson) {
  const saved = localStorage.getItem(`module10_checklist_${lesson}`);
  return saved ? JSON.parse(saved) : {};
}

function saveChecklistState(lesson, state) {
  localStorage.setItem(`module10_checklist_${lesson}`, JSON.stringify(state));
}

function showCompletionMessage() {
  const message = document.createElement('div');
  message.className = 'completion-message';
  message.innerHTML = `
    <div style="
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: #059669;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      animation: slideIn 0.3s ease;
      z-index: 1000;
    ">
      Урок завершён! Отличная работа!
    </div>
  `;
  document.body.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, 3000);
}

// Code Copy Button
function addCopyButtons() {
  const codeBlocks = document.querySelectorAll('pre code');

  codeBlocks.forEach(block => {
    const pre = block.parentElement;
    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.textContent = 'Copy';
    button.style.cssText = `
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: rgba(255,255,255,0.1);
      border: none;
      color: #999;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.75rem;
    `;

    pre.style.position = 'relative';
    pre.appendChild(button);

    button.addEventListener('click', async () => {
      await navigator.clipboard.writeText(block.textContent);
      button.textContent = 'Copied!';
      setTimeout(() => {
        button.textContent = 'Copy';
      }, 2000);
    });
  });
}

// Reset Progress (admin function)
function resetProgress() {
  localStorage.removeItem('module10_completed');
  for (let i = 1; i <= 10; i++) {
    localStorage.removeItem(`module10_checklist_${i}`);
  }
  location.reload();
}

// Make resetProgress available globally for admin use
window.resetModule10Progress = resetProgress;

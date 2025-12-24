// ---------- Мобильное меню ----------
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger?.addEventListener("click", () => {
  nav.classList.toggle("is-open");
});

// закрывать меню после клика
document.querySelectorAll(".nav__link").forEach(a => {
  a.addEventListener("click", () => nav.classList.remove("is-open"));
});

// ---------- Темная/светлая тема ----------
const themeBtn = document.getElementById("themeBtn");
const THEME_KEY = "sport_site_theme";

function applyTheme(theme) {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    themeBtn.textContent = "☀️";
  } else {
    document.documentElement.removeAttribute("data-theme");
    themeBtn.textContent = "🌙";
  }
}

const savedTheme = localStorage.getItem(THEME_KEY);
applyTheme(savedTheme || "dark");

themeBtn?.addEventListener("click", () => {
  const isLight = document.documentElement.getAttribute("data-theme") === "light";
  const next = isLight ? "dark" : "light";
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
});

// ---------- Модалка для карточек ----------
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalClose = document.getElementById("modalClose");
const modalBackdrop = document.getElementById("modalBackdrop");

function openModal(title, text) {
  modalTitle.textContent = title;
  modalText.textContent = text;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

document.getElementById("effectCards")?.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-title]");
  if (!btn) return;
  openModal(btn.dataset.title, btn.dataset.text);
});

modalClose?.addEventListener("click", closeModal);
modalBackdrop?.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ---------- Мини-тест ----------
const calcBtn = document.getElementById("calcBtn");
const quizForm = document.getElementById("quizForm");
const result = document.getElementById("result");

function getScore() {
  let score = 0;
  for (let i = 1; i <= 3; i++) {
    const picked = quizForm.querySelector(`input[name="q${i}"]:checked`);
    if (!picked) return null;
    score += Number(picked.value);
  }
  return score; // max 6
}

function scoreText(score) {
  if (score >= 5) return "Отлично! Спорт, похоже, реально помогает тебе: и физически, и психологически.";
  if (score >= 3) return "Хорошо. Эффект есть, но попробуй добавить регулярности и цели на 2–3 недели.";
  return "Начало положено. Подбери комфортный формат (ходьба/танцы/плавание) и начни с малого.";
}

calcBtn?.addEventListener("click", () => {
  const score = getScore();
  if (score === null) {
    result.textContent = "Ответь на все 3 вопроса, чтобы увидеть результат.";
    return;
  }
  result.textContent = `Баллы: ${score}/6. ${scoreText(score)}`;
});

// Функция для дублирования контента бегущей строки
function initMarquee() {
  const marqueeInner = document.querySelector(".marquee__inner");
  if (!marqueeInner) return;

  // Дублируем содержимое для бесшовной анимации
  const originalContent = marqueeInner.innerHTML;
  marqueeInner.innerHTML = originalContent + originalContent;
}

// Функция для плавной прокрутки по якорям
function initAnchors() {
  const anchorBtns = document.querySelectorAll(".btn-anchor");
  anchorBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute("data-target");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// Запускаем все инициализации после полной загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
  initMarquee();
  initAnchors();
});

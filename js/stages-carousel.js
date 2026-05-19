(function () {
  const track = document.querySelector(".stages-carousel__track");
  if (!track) return;

  const slides = track.querySelectorAll(".stages-carousel__slide");
  const totalSlides = slides.length;
  if (totalSlides < 2) return;

  let current = 0;

  const prevBtn = document.querySelector(".stages-carousel__btn--prev");
  const nextBtn = document.querySelector(".stages-carousel__btn--next");
  const dots = document.querySelectorAll(".stages-carousel__dot");

  function update() {
    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(${-current * slideWidth}px)`;

    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current === totalSlides - 1;

    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === current);
    });
  }

  function goTo(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    if (index === current) return;

    current = index;
    update();
  }

  if (prevBtn) prevBtn.addEventListener("click", () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => goTo(current + 1));

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => goTo(i));
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(update, 100);
  });

  update();
})();

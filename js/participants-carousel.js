(function () {
  const track = document.querySelector(".participants-track");
  if (!track) return;

  const originalCards = [...document.querySelectorAll(".participant-card")];
  const totalOriginal = originalCards.length;
  if (totalOriginal === 0) return;

  const cloneCount = totalOriginal;
  let currentOffset = cloneCount;
  let autoplayInterval = null;
  let isTransitioning = false;

  for (let i = 0; i < cloneCount; i++) {
    const cloneStart = originalCards[i].cloneNode(true);
    track.appendChild(cloneStart);
    const cloneEnd = originalCards[cloneCount - 1 - i].cloneNode(true);
    track.prepend(cloneEnd);
  }

  const allCards = [...document.querySelectorAll(".participant-card")];

  updateCarousel(false);

  function updateCarousel(animate) {
    if (animate === undefined) animate = true;
    const cardWidth = allCards[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const slideWidth = cardWidth + gap;
    const newPosition = -currentOffset * slideWidth;
    track.style.transition = animate ? "transform 0.4s ease" : "none";
    track.style.transform = `translateX(${newPosition}px)`;
    updateCounter();
  }

  function onTransitionEnd() {
    if (!track.style.transition) return;
    track.style.transition = "";

    if (currentOffset >= cloneCount + totalOriginal) {
      currentOffset = cloneCount;
      updateCarousel(false);
    } else if (currentOffset < cloneCount) {
      currentOffset = totalOriginal + currentOffset;
      updateCarousel(false);
    }
    isTransitioning = false;
  }

  track.addEventListener("transitionend", onTransitionEnd);

  function goToSlide(delta) {
    if (isTransitioning) return;
    isTransitioning = true;
    currentOffset += delta;
    updateCarousel(true);
    resetAutoplay();
  }

  function nextSlide() {
    goToSlide(1);
  }
  function prevSlide() {
    goToSlide(-1);
  }

  function updateCounter() {
    // Определяем, сколько карточек видно одновременно (зависит от ширины экрана)
    const trackWidth = track.offsetWidth;
    const cardWidth = allCards[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    let visibleCards = Math.round(trackWidth / (cardWidth + gap));
    // На случай погрешности округления
    if (visibleCards < 1) visibleCards = 1;

    // Индекс первой видимой карточки (в оригинальной нумерации)
    let rawIndex = currentOffset - cloneCount;
    if (rawIndex < 0) rawIndex += totalOriginal;
    if (rawIndex >= totalOriginal) rawIndex -= totalOriginal;

    // Индекс последней видимой карточки
    let lastVisibleIndex = rawIndex + visibleCards - 1;
    if (lastVisibleIndex >= totalOriginal) lastVisibleIndex -= totalOriginal; // для зацикленности

    // Показываем номер последней видимой (1-индексация)
    const counterSpan = document.querySelector(".carousel-counter__current");
    if (counterSpan) counterSpan.innerText = lastVisibleIndex + 1;

    const totalSpan = document.querySelector(".carousel-counter__total");
    if (totalSpan) totalSpan.innerText = totalOriginal;
  }

  function startAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(function () {
      if (!isTransitioning) nextSlide();
    }, 4000);
  }

  function stopAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = null;
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  const prevBtn = document.querySelector(".section_player__button--left");
  const nextBtn = document.querySelector(".section_player__button--right");
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);

  const carouselContainer = document.querySelector(".participants-carousel");
  if (carouselContainer) {
    carouselContainer.addEventListener("mouseenter", stopAutoplay);
    carouselContainer.addEventListener("mouseleave", startAutoplay);
  }

  var resizeTimeout;
  window.addEventListener("resize", function () {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      updateCarousel(false);
    }, 100);
  });

  updateCounter();
  startAutoplay();
})();

(function () {
  var track = document.querySelector('.stages-carousel__track');
  if (!track) return;

  var slides = track.querySelectorAll('.stages-carousel__slide');
  var totalSlides = slides.length;
  if (totalSlides < 2) return;

  var current = 0;
  var prevBtn = document.querySelector('.stages-carousel__btn--prev');
  var nextBtn = document.querySelector('.stages-carousel__btn--next');
  var dots = document.querySelectorAll('.stages-carousel__dot');

  function update() {
    var slideWidth = slides[0].offsetWidth;
    track.style.transform = 'translateX(' + (-current * slideWidth) + 'px)';

    if (prevBtn) {
      prevBtn.disabled = current === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = current === totalSlides - 1;
    }

    dots.forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === current);
    });
  }

  function goTo(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    if (index === current) return;
    current = index;
    update();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      goTo(current - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      goTo(current + 1);
    });
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      goTo(i);
    });
  });

  var resizeTimer;
  window.addEventListener('resize', function () {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      update();
    }, 100);
  });

  update();
})();

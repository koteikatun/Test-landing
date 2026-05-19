function initMarquee() {
  const marqueeInner = document.querySelector(".marquee__inner");
  if (!marqueeInner) return;

  const originalContent = marqueeInner.innerHTML;
  marqueeInner.innerHTML = originalContent + originalContent;
}

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

document.addEventListener("DOMContentLoaded", () => {
  initMarquee();
  initAnchors();
});

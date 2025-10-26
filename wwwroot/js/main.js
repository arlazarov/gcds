(function () {
  let ticking = false;

  function updateVisibility() {
    const blocks = document.querySelectorAll('.program, .reveal');
    const vh = window.innerHeight || document.documentElement.clientHeight;

    blocks.forEach(el => {
      const rect = el.getBoundingClientRect();
      const fullyOut = rect.bottom <= 0 || rect.top >= vh;
      const partlyVisible = rect.bottom > 0 && rect.top < vh;

      if (partlyVisible) {
        el.classList.add('visible');
      } else if (fullyOut) {
        el.classList.remove('visible');
      }
    });
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateVisibility);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  window.addEventListener('load', updateVisibility);
  document.addEventListener('DOMContentLoaded', updateVisibility);

  new MutationObserver(() => requestAnimationFrame(updateVisibility)).observe(
    document.body,
    {
      childList: true,
      subtree: true,
    },
  );
})();

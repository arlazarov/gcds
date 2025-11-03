(function () {
  function toInt(n) {
    return Math.max(0, Math.floor(Number(n) || 0));
  }

  function animate(el) {
    if (el.dataset.animating === '1') return;
    el.dataset.animating = '1';
    const target = toInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const dur = 1500;
    const start = performance.now();

    function frame(t) {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(frame);
      else {
        el.textContent = target + suffix;
        el.dataset.animating = '0';
      }
    }
    requestAnimationFrame(frame);
  }

  function bindCounters() {
    const items = document.querySelectorAll('.stat-item');
    if (!items.length) return;

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const el = entry.target;
          const num = el.querySelector('h2[data-target]');
          if (entry.isIntersecting) {
            el.classList.add('visible');
            if (num) animate(num);
          } else {
            el.classList.remove('visible');
            if (num) {
              num.textContent = '0' + (num.dataset.suffix || '');
              num.dataset.animating = '0';
            }
          }
        });
      },
      { threshold: 0.4 },
    );

    items.forEach(el => io.observe(el));
  }

  document.addEventListener('DOMContentLoaded', bindCounters);
  document.addEventListener('blazor:navigation', bindCounters);
  setTimeout(bindCounters, 1000);
})();

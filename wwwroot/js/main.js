(function animInit() {
  function mount() {
    // window.scrollTo = undefined;
    document.body.classList.add('anim');

    const els = document.querySelectorAll('.reveal, .program');
    if (!els.length) return;

    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          const el = e.target;
          if (e.isIntersecting) {
            el.classList.add('visible');
          } else {
            el.classList.remove('visible');
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px 10% 0px' },
    );

    els.forEach(el => io.observe(el));
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', mount);
  else mount();

  const obs = new MutationObserver(mutations => {
    for (const m of mutations) {
      if (m.addedNodes.length > 0) {
        if (document.querySelector('.reveal, .program')) {
          mount();
          break;
        }
      }
    }
  });

  obs.observe(document.body, { childList: true, subtree: true });
})();

(function waitForRotator() {
  const container = document.getElementById('quote-rotator');
  if (!container) return setTimeout(waitForRotator, 300);

  const quotes = container.querySelectorAll('.quote');
  if (!quotes.length) return;

  let index = 0;
  quotes[0].classList.add('active');

  setInterval(() => {
    quotes[index].classList.remove('active');
    index = (index + 1) % quotes.length;
    quotes[index].classList.add('active');
  }, 10000);
})();

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

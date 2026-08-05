(function () {
  var root = document.documentElement;
  var btn = document.getElementById('themeToggle');

  function currentTheme() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function label(t) { return t === 'dark' ? '淺色' : '深色'; }

  function apply(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('cna-theme', t); } catch (e) {}
    if (btn) btn.textContent = label(t);
  }

  var saved;
  try { saved = localStorage.getItem('cna-theme'); } catch (e) {}
  apply(saved || currentTheme());

  if (btn) {
    btn.addEventListener('click', function () {
      apply(currentTheme() === 'dark' ? 'light' : 'dark');
    });
  }

  var printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', function () { window.print(); });
  }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = document.querySelectorAll('.rv');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }
})();

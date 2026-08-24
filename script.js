// Xiang Li — Personal Academic Homepage
// Minimal JS: dark mode toggle + smooth scroll + active nav

(function () {
  'use strict';

  // --- Dark mode ---
  const html = document.documentElement;
  const toggle = document.getElementById('theme-toggle');

  function setTheme(mode) {
    html.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);
  }

  function getInitialTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  const theme = getInitialTheme();
  if (theme === 'dark') html.setAttribute('data-theme', 'dark');

  toggle.addEventListener('click', function () {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });

  // --- Smooth scroll for all anchor links ---
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var scrollBehavior = function () {
    return prefersReducedMotion.matches ? 'auto' : 'smooth';
  };

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      e.preventDefault();
      if (href === '#') {
        window.scrollTo({ top: 0, behavior: scrollBehavior() });
        return;
      }
      var target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: scrollBehavior() });
    });
  });

  // --- Active nav link on scroll ---
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__links a');

  function updateActiveLink() {
    var scrollY = window.scrollY + 100;
    var current = '';
    sections.forEach(function (s) {
      if (s.offsetTop <= scrollY) current = s.id;
    });
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // --- Copy email button ---
  function fallbackCopy(text) {
    var tmp = document.createElement('textarea');
    tmp.value = text;
    tmp.setAttribute('readonly', '');
    tmp.style.position = 'fixed';
    tmp.style.opacity = '0';
    document.body.appendChild(tmp);
    tmp.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(tmp);
  }

  var copyBtn = document.getElementById('copy-email');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var email = copyBtn.getAttribute('data-email');
      var feedback = function () {
        copyBtn.classList.add('copied');
        setTimeout(function () { copyBtn.classList.remove('copied'); }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(feedback, function () {
          fallbackCopy(email);
          feedback();
        });
      } else {
        fallbackCopy(email);
        feedback();
      }
    });
  }
})();

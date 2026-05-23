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
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
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
})();

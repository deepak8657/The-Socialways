(function () {
  'use strict';

  var WHATSAPP_NUMBER = '918839248875';

  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');

  function setMenu(open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  burger.addEventListener('click', function () {
    setMenu(!menu.classList.contains('open'));
  });

  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 800) setMenu(false);
  });

  // Contact form: build a WhatsApp message from the form fields
  var form = document.getElementById('form');
  var note = document.getElementById('note');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.elements.name;
    var message = form.elements.message;
    var ok = true;

    [name, message].forEach(function (field) {
      var empty = !field.value.trim();
      field.classList.toggle('invalid', empty);
      if (empty) ok = false;
    });

    if (!ok) {
      note.textContent = 'Please add your name and a short message.';
      return;
    }

    var text =
      'Hi The Social Ways, I am ' + name.value.trim() +
      (form.elements.brand.value.trim() ? ' from ' + form.elements.brand.value.trim() : '') +
      '.\nI need: ' + form.elements.service.value +
      '\n' + message.value.trim();

    note.textContent = 'Opening WhatsApp...';
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
  });

  // Header shadow on scroll and highlight of the current section in the menu
  var header = document.getElementById('header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if ('IntersectionObserver' in window) {
    var links = {};
    menu.querySelectorAll('a[href^="#"]').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && links[en.target.id]) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove('active'); });
          links[en.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['services', 'work', 'process', 'about', 'faq'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }

  // If a work image is saved as .jpg, .jpeg or .webp instead of .png, try those names automatically
  document.querySelectorAll('.ph img').forEach(function (img) {
    var exts = ['jpg', 'jpeg', 'webp'];
    img.addEventListener('error', function () {
      var next = exts.shift();
      if (next) img.src = img.getAttribute('src').replace(/\.[a-z]+$/i, '.' + next);
    });
  });

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
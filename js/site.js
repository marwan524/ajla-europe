/* =========================================================
   AJLA EUROPE — SITE CONFIGURATION
   ========================================================= */

window.SITE = {
  legalName: 'AJLA EUROPE',
  phone: '+48500515770',
  email: 'manager@ajlaeurope.com',

  // Add your real Formspree endpoint when available.
  // Example: https://formspree.io/f/xxxxxxxx
  formEndpoint: ''
};

(function () {
  'use strict';

  const SITE = window.SITE;

  /* Replace placeholders throughout the page. */

  const replacements = [
    ['[LEGAL COMPANY NAME]', SITE.legalName],
    ['[POLAND PHONE]', SITE.phone],
    ['[POLAND SALES EMAIL]', SITE.email]
  ];

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  textNodes.forEach(node => {
    if (!node.parentElement || node.parentElement.closest('script, style')) {
      return;
    }

    let text = node.nodeValue;

    replacements.forEach(([placeholder, value]) => {
      if (value) {
        text = text.split(placeholder).join(value);
      }
    });

    if (text !== node.nodeValue) {
      node.nodeValue = text;
    }
  });

  /* Phone links. */

  document.querySelectorAll('[data-link="phone"]').forEach(link => {
    if (!SITE.phone) return;

    link.href = 'tel:' + SITE.phone.replace(/[^\d+]/g, '');

    const listItem = link.closest('li');
    if (listItem) listItem.hidden = false;
  });

  /* Email links. */

  document.querySelectorAll('[data-link="email"]').forEach(link => {
    if (!SITE.email) return;
    link.href = 'mailto:' + SITE.email;
  });

  /* Copyright year. */

  const year = document.getElementById('yr');
  if (year) year.textContent = new Date().getFullYear();
})();
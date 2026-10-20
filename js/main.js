/* =========================================================
   AJLA EUROPE — MAIN JAVASCRIPT
   Mobile navigation and contact form.
   ========================================================= */

(function () {
  'use strict';

  const SITE = window.SITE;

  /* =======================================================
     1. MOBILE NAVIGATION
     ======================================================= */

  const menuButton = document.querySelector('.menu');
  const navigation = document.getElementById('links');

  if (menuButton && navigation) {
    menuButton.addEventListener('click', function () {
      const isOpen = navigation.classList.toggle('open');

      menuButton.setAttribute(
        'aria-expanded',
        String(isOpen)
      );
    });

    navigation.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        navigation.classList.remove('open');

        menuButton.setAttribute(
          'aria-expanded',
          'false'
        );
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        navigation.classList.remove('open');

        menuButton.setAttribute(
          'aria-expanded',
          'false'
        );
      }
    });
  }

  /* =======================================================
     2. CONTACT FORM
     ======================================================= */

  const form = document.getElementById('enquiry');
  const status = document.getElementById('status');

  if (!form || !status || !SITE) {
    return;
  }

  const submitButton = form.querySelector(
    'button[type="submit"]'
  );

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const consentInput = document.getElementById('consent');
  const honeypot = form.querySelector('[name="_gotcha"]');

  function message(text) {
    status.textContent = typeof window.T === 'function'
      ? window.T(text)
      : text;
  }

  function setSubmitting(isSubmitting) {
    if (submitButton) {
      submitButton.disabled = isSubmitting;
    }

    form.setAttribute(
      'aria-busy',
      String(isSubmitting)
    );
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    /* Validate required fields. */

    if (
      !nameInput ||
      !nameInput.value.trim()
    ) {
      message('Please add your name and a valid email.');
      if (nameInput) nameInput.focus();
      return;
    }

    if (
      !emailInput ||
      !emailInput.value.trim() ||
      !emailInput.checkValidity()
    ) {
      message('Please add your name and a valid email.');

      if (emailInput) emailInput.focus();

      return;
    }

    /* Honeypot spam protection. */

    if (honeypot && honeypot.value.trim()) {
      return;
    }

    /* Privacy consent. */

    if (!consentInput || !consentInput.checked) {
      message('Please accept the privacy policy.');

      if (consentInput) consentInput.focus();

      return;
    }

    /* Ensure there is a delivery method. */

    const endpoint = (SITE.formEndpoint || '').trim();
    const salesEmail = (SITE.email || '').trim();

    if (!endpoint && !salesEmail) {
      message(
        'The contact form is not connected yet. Please try again later.'
      );

      return;
    }

    const formData = new FormData(form);

    // Do not send the spam-trap field to the receiving service.
    formData.delete('_gotcha');

    /* OPTION A: Submit directly to a configured endpoint. */

    if (endpoint) {
      setSubmitting(true);

      message('Sending your enquiry...');

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(
            'The server rejected the form submission.'
          );
        }

        form.reset();

        message(
          'Thank you. We will review your request and reply with the next step.'
        );

      } catch (error) {
        console.error('AJLA Europe form submission failed:', error);

        message(
          'Sending failed. Please try again or email us directly.'
        );

      } finally {
        setSubmitting(false);
      }

      return;
    }

    /* OPTION B: Open the visitor's email application. */

    const fields = [];

    formData.forEach(function (value, key) {
      if (value instanceof File) {
        if (value.name) {
          fields.push(key + ': ' + value.name);
        }

        return;
      }

      if (String(value).trim()) {
        fields.push(key + ': ' + value);
      }
    });

    const subject = encodeURIComponent(
      'AJLA Europe — Supply Enquiry'
    );

    const body = encodeURIComponent(
      fields.join('\n\n')
    );

    const mailto =
      'mailto:' + salesEmail +
      '?subject=' + subject +
      '&body=' + body;

    message(
      'Opening your email app with the request.'
    );

    window.location.href = mailto;
  });

})();
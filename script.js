
/* Bella Kitchen — Website Interactions
   Premium navigation, accessibility, animations and WhatsApp setup.
*/
(() => {
  'use strict';

  // Find website elements
  const menuToggle = document.getElementById('menuToggle');
  const navigation = document.getElementById('navigation');
  const year = document.getElementById('year');
  const whatsappOrder = document.getElementById('whatsappOrder');
  const whatsappNote = document.getElementById('whatsappNote');
  const floatingTop = document.querySelector('.back-to-top-floating');

  const navLinks = navigation
    ? navigation.querySelectorAll('a[href^="#"]')
    : [];

  // Automatically update the footer year
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Accessible mobile navigation
  function closeMenu() {
    if (!menuToggle || !navigation) return;

    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  }

  function openMenu() {
    if (!menuToggle || !navigation) return;

    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close navigation');
    navigation.classList.add('is-open');
    document.body.classList.add('menu-open');
  }

  if (menuToggle && navigation) {
    menuToggle.addEventListener('click', () => {
      const isOpen =
        menuToggle.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Close navigation with Escape
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });

    // Close mobile navigation on desktop-sized screens
    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    }, { passive: true });
  }

  // WhatsApp configuration
  // Replace the empty string with your own authorised business number.
  // Use country code and digits only, without +, spaces or dashes.
  const restaurantWhatsAppNumber = '';

  const cleanNumber = restaurantWhatsAppNumber.replace(/\D/g, '');
  const validNumber = /^\d{10,15}$/.test(cleanNumber);

  if (whatsappOrder) {
    if (validNumber) {
      const message =
        'Hello Bella Kitchen! I would like to ask about your menu.';

      whatsappOrder.href =
        `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

      whatsappOrder.target = '_blank';
      whatsappOrder.rel = 'noopener noreferrer';
      whatsappOrder.removeAttribute('aria-disabled');

      if (whatsappNote) {
        whatsappNote.textContent =
          'WhatsApp will open in a new tab.';
      }
    } else {
      whatsappOrder.href = '#contact';
      whatsappOrder.setAttribute('aria-disabled', 'true');

      whatsappOrder.addEventListener('click', (event) => {
        event.preventDefault();

        if (whatsappNote) {
          whatsappNote.textContent =
            'WhatsApp ordering is not activated yet. Add your authorised business number in script.js.';
          whatsappNote.classList.add('note-highlight');
        }
      });
    }
  }

  // Allow menu items to create a dish-specific WhatsApp enquiry
  document.querySelectorAll('[data-dish]').forEach((link) => {
    link.addEventListener('click', () => {
      if (!validNumber || !whatsappOrder) return;

      const dish = link.getAttribute('data-dish') || 'the menu';

      const message =
        `Hello Bella Kitchen! I would like to ask about ${dish}.`;

      whatsappOrder.href =
        `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    });
  });

  // Smooth reveal animations for sections
  const revealItems = document.querySelectorAll('.reveal');

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -35px 0px'
      }
    );

    revealItems.forEach((item) => {
      observer.observe(item);
    });
  } else {
    // Keep content visible if animations are unsupported
    revealItems.forEach((item) => {
      item.classList.add('is-visible');
    });
  }

  // Back-to-top button
  function updateTopButton() {
    if (!floatingTop) return;

    floatingTop.classList.toggle(
      'is-visible',
      window.scrollY > 500
    );
  }

  updateTopButton();

  window.addEventListener('scroll', updateTopButton, {
    passive: true
  });

  if (floatingTop) {
    floatingTop.addEventListener('click', (event) => {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? 'auto' : 'smooth'
      });
    });
  }
})();

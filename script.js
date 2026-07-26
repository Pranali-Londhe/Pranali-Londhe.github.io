// ==========================================================================
// MOBILE NAVIGATION
// ==========================================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ==========================================================================
// SCROLL REVEAL ANIMATIONS
// ==========================================================================
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// ==========================================================================
// ACTIVE NAV LINK ON SCROLL
// ==========================================================================
const sections = document.querySelectorAll('main section[id], .hero[id]');
const navAnchors = document.querySelectorAll('.nav__links a');

if ('IntersectionObserver' in window && sections.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.classList.toggle('is-active', a.getAttribute('data-nav') === id);
        });
      }
    });
  }, { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' });

  sections.forEach(section => navObserver.observe(section));
}

// ==========================================================================
// CURSOR GLOW (desktop only)
// ==========================================================================
const cursorGlow = document.getElementById('cursorGlow');

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && cursorGlow) {
  window.addEventListener('mousemove', (e) => {
    cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  });
}

// ==========================================================================
// BACK TO TOP BUTTON
// ==========================================================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 480) {
    backToTop.classList.add('is-visible');
  } else {
    backToTop.classList.remove('is-visible');
  }
}, { passive: true });

// ==========================================================================
// CONTACT FORM — sends directly to your inbox via FormSubmit
// ==========================================================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const formSubmitBtn = document.getElementById('formSubmitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    formSubmitBtn.disabled = true;
    formStatus.textContent = 'Sending your message...';
    formStatus.dataset.state = 'sending';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.textContent = "Message sent! I'll get back to you soon.";
        formStatus.dataset.state = 'success';
        contactForm.reset();
      } else {
        throw new Error('Request failed');
      }
    } catch (err) {
      formStatus.textContent = "Something went wrong — please email me directly at pranulondhe381@gmail.com.";
      formStatus.dataset.state = 'error';
    } finally {
      formSubmitBtn.disabled = false;
    }
  });
}

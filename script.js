// Smooth small utilities + interactions for the portfolio

// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll using IntersectionObserver
(function setupRevealOnScroll(){
  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(r => r.classList.add('visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});

  reveals.forEach(r => io.observe(r));
})();

// Contact form behavior (client-only demo)
(function contactFormDemo(){
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  // Helper: basic email check
  function isValidEmail(email){
    return /\S+@\S+\.\S+/.test(email);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      status.textContent = "Please complete all fields.";
      status.style.color = '#ff6b6b';
      return;
    }

    if (!isValidEmail(email)) {
      status.textContent = "Please enter a valid email address.";
      status.style.color = '#ff6b6b';
      return;
    }

    // Success (demo only — no backend)
    status.textContent = `Thanks, ${name}! Your message has been sent.`;
    status.style.color = '#7bffdb';
    form.reset();

    // small visual feedback then clear
    setTimeout(() => {
      status.textContent = '';
    }, 5000);
  }, {passive: false});
})();

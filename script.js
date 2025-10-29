document.getElementById('year').textContent = new Date().getFullYear();


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


(function(){
  emailjs.init("ZFHQsdQ_0wjxiPi8e");
})();

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', function(e){
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if(!name || !email || !message){
    status.textContent = "Please complete all fields.";
    status.style.color = "#ff6b6b";
    return;
  }

  emailjs.send("service_gbqyh25", "template_m6nccdt", {
    from_name: name,
    reply_to: email,
    message: message
  })
  .then(() => {
    status.textContent = `Thanks, ${name}! Your message has been sent.`;
    status.style.color = "#7bffdb";
    form.reset();
  }, (error) => {
    status.textContent = "Oops! Something went wrong.";
    status.style.color = "red";
    console.error(error);
  });
});
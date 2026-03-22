// =============================================
// SKYVL FUTURE SOFT - Main JavaScript
// =============================================
import './style.css';

// ---- Initialize AOS ----
AOS.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  offset: 60,
});

// =============================================
// LOADER
// =============================================
const loader = document.getElementById('loader');

window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.classList.remove('loading');
    loader.classList.add('hidden');
  }, 2200);
});

document.body.classList.add('loading');

// =============================================
// SCROLL PROGRESS
// =============================================
const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = pct + '%';
});

// =============================================
// NAVBAR
// =============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
});

// Hamburger
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close nav when link clicked
navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Active nav link on scroll
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + window.innerHeight / 3;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        navLinkItems.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// =============================================
// BACK TO TOP
// =============================================
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =============================================
// THEME TOGGLE
// =============================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

let isDark = true;

const savedTheme = localStorage.getItem('skyvl-theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-theme');
  themeIcon.className = 'fas fa-sun';
  isDark = false;
}

themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  if (!isDark) {
    document.body.classList.add('light-theme');
    themeIcon.className = 'fas fa-sun';
    localStorage.setItem('skyvl-theme', 'light');
  } else {
    document.body.classList.remove('light-theme');
    themeIcon.className = 'fas fa-moon';
    localStorage.setItem('skyvl-theme', 'dark');
  }
});

// =============================================
// PARTICLE CANVAS
// =============================================
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let animFrameId;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.radius = Math.random() * 2 + 0.5;
    this.alpha = Math.random() * 0.4 + 0.1;
    this.color = Math.random() > 0.5 ? '79, 142, 247' : '124, 58, 237';
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (
      this.x < -10 || this.x > canvas.width + 10 ||
      this.y < -10 || this.y > canvas.height + 10
    ) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
    ctx.fill();
  }
}

// Mouse parallax
let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function initParticles(count = 80) {
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const alpha = (1 - dist / 100) * 0.15;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(79, 142, 247, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  animFrameId = requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// =============================================
// TYPED TEXT EFFECT
// =============================================
const typedEl = document.getElementById('typed-text');
const phrases = ['Future of the Web', 'Next-Gen Websites', 'Digital Experiences', 'Your Online Brand'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeText() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50;
  } else {
    typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 100;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typeSpeed = 1800;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 400;
  }

  setTimeout(typeText, typeSpeed);
}

setTimeout(typeText, 2600);

// =============================================
// ANIMATED COUNTERS
// =============================================
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = start;
    if (start >= target) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter-num').forEach(el => {
  counterObserver.observe(el);
});

// =============================================
// PORTFOLIO FILTER
// =============================================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    portfolioItems.forEach((item, i) => {
      const category = item.dataset.category;
      const shouldShow = filter === 'all' || category === filter;

      if (shouldShow) {
        item.classList.remove('hidden');
        item.style.animation = `fadeInUp 0.4s ease ${i * 0.05}s both`;
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// =============================================
// SUPABASE SETUP
// =============================================
// ⚠️ Replace with your actual Supabase credentials
const SUPABASE_URL = 'https://jvyijebccbhccqwucggp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2eWlqZWJjY2JoY2Nxd3VjZ2dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxNTkxMTEsImV4cCI6MjA4OTczNTExMX0.dq3JI9rA5q2xd3IvscFup2AJDa5vlQgERwdbw-iBg9M';

let supabaseClient = null;

try {
  const { createClient } = supabase;
  supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('✅ Supabase connected to jvyijebccbhccqwucggp');
} catch (err) {
  console.warn('Supabase not available:', err.message);
}

// =============================================
// EMAILJS SETUP
// =============================================
// ⚠️ Replace with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_1inhqa3';
const EMAILJS_TEMPLATE_ID = 'template_amgr7ky';
const EMAILJS_PUBLIC_KEY = 'C66ibHM3bl4N67uOq';

let emailJsReady = false;

try {
  emailjs.init(EMAILJS_PUBLIC_KEY);
  emailJsReady = true;
  console.log('✅ EmailJS ready — service_1inhqa3');
} catch (err) {
  console.warn('EmailJS init error:', err.message);
}

// =============================================
// CONTACT FORM
// =============================================
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');
const sendAnotherBtn = document.getElementById('send-another');
const submitBtn = document.getElementById('submit-btn');
const submitText = submitBtn.querySelector('.btn-submit-text');
const submitLoader = submitBtn.querySelector('.btn-submit-loader');

function validateField(id, errorId, condition, msg) {
  const field = document.getElementById(id);
  const errorEl = document.getElementById(errorId);
  if (!condition) {
    field.classList.add('error');
    if (errorEl) errorEl.textContent = msg;
    return false;
  } else {
    field.classList.remove('error');
    if (errorEl) errorEl.textContent = '';
    return true;
  }
}

function validateForm() {
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const message = document.getElementById('contact-message').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let valid = true;
  valid = validateField('contact-name', 'name-error', name.length >= 2, 'Please enter your full name (min. 2 chars).') && valid;
  valid = validateField('contact-email', 'email-error', emailRegex.test(email), 'Please enter a valid email address.') && valid;
  valid = validateField('contact-message', 'message-error', message.length >= 10, 'Please enter a message (min. 10 chars).') && valid;
  return valid;
}

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const phone = document.getElementById('contact-phone').value.trim();
  const service = document.getElementById('contact-service').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  // Show loading
  submitBtn.disabled = true;
  submitText.style.display = 'none';
  submitLoader.style.display = 'inline-flex';

  try {
    let dbSuccess = false;
    let emailSuccess = false;

    // ---- Save to Supabase ----
    if (supabaseClient) {
      const { error } = await supabaseClient
        .from('contacts')
        .insert([{ name, email, phone, service, message, created_at: new Date().toISOString() }]);
      if (!error) {
        dbSuccess = true;
        console.log('✅ Saved to Supabase');
      } else {
        console.error('Supabase error:', error.message);
      }
    } else {
      // Fallback: log to console
      console.log('📦 Contact form data (Supabase not configured):', { name, email, phone, service, message });
      dbSuccess = true;
    }

    // ---- Send Email via EmailJS ----
    if (emailJsReady) {
      try {
        const emailResult = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name: name,
          from_email: email,
          phone: phone || 'Not provided',
          service: service || 'Not specified',
          message,
          to_email: 'skyvlfuturesoft@gmail.com',
          reply_to: email,
        });
        emailSuccess = true;
        console.log('✅ Email sent via EmailJS. Status:', emailResult.status, emailResult.text);
      } catch (emailErr) {
        console.error('❌ EmailJS failed:');
        console.error('  Status:', emailErr.status);
        console.error('  Error text:', emailErr.text);
        // Still allow success if Supabase worked
      }
    } else {
      emailSuccess = true;
    }

    if (dbSuccess || emailSuccess) {
      // Show success
      contactForm.style.display = 'none';
      successMessage.style.display = 'flex';
      successMessage.style.flexDirection = 'column';
      successMessage.style.alignItems = 'center';
    } else {
      throw new Error('Both Supabase and EmailJS failed.');
    }
  } catch (err) {
    console.error('Form submission error:', err);
    alert('Something went wrong. Please email us directly at skyvlfuturesoft@gmail.com');
  } finally {
    submitBtn.disabled = false;
    submitText.style.display = 'inline';
    submitLoader.style.display = 'none';
  }
});

// Send another message
sendAnotherBtn.addEventListener('click', () => {
  contactForm.reset();
  document.querySelectorAll('.field-error').forEach(e => e.textContent = '');
  document.querySelectorAll('.error').forEach(e => e.classList.remove('error'));
  successMessage.style.display = 'none';
  contactForm.style.display = 'flex';
  contactForm.style.flexDirection = 'column';
});

// Real-time validation
['contact-name', 'contact-email', 'contact-message'].forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener('blur', validateForm);
  el.addEventListener('input', () => {
    el.classList.remove('error');
    const errorEl = document.getElementById(id.replace('contact-', '') + '-error');
    if (errorEl) errorEl.textContent = '';
  });
});

// =============================================
// SMOOTH HOVER TILT ON CARDS
// =============================================
function addTiltEffect(selector) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

addTiltEffect('.service-card');
addTiltEffect('.why-card');

// =============================================
// PARALLAX ON HERO ORBS
// =============================================
window.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.hero-bg-orb');
  const xFactor = (e.clientX / window.innerWidth - 0.5) * 30;
  const yFactor = (e.clientY / window.innerHeight - 0.5) * 30;
  orbs.forEach((orb, i) => {
    const depth = (i + 1) * 0.4;
    orb.style.transform = `translate(${xFactor * depth}px, ${yFactor * depth}px)`;
  });
});

// =============================================
// NAVBAR SMOOTH SCROLL
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

console.log('%c🚀 Skyvl Future Soft', 'color: #4f8ef7; font-size: 20px; font-weight: 900;');
console.log('%cWe Build the Future of the Web', 'color: #7c3aed; font-size: 12px;');

/* ============================
   1. Toggle Menu Mobile
============================ */
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

/* ============================
   2. Dark Mode + LocalStorage
============================ */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Cek preferensi tersimpan
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark');
  themeToggle.textContent = '☀️';
} else if (savedTheme === 'light') {
  body.classList.remove('dark');
  themeToggle.textContent = '🌙';
} else {
  // Ikuti preferensi sistem
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) {
    body.classList.add('dark');
    themeToggle.textContent = '☀️';
  }
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

/* ============================
   3. Animasi Typing
============================ */
const typingEl = document.getElementById('typing');
const words = ['Developer', 'Designer', 'Freelancer', 'Creator'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];
  const speed = isDeleting ? 60 : 120;

  if (!isDeleting) {
    typingEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    typingEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(typeEffect, speed);
}
typeEffect();

/* ============================
   4. Form Submission ke Backend
   (Formspree - fetch AJAX)
============================ */
const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validasi sederhana
  const nama = form.nama.value.trim();
  const email = form.email.value.trim();
  const pesan = form.pesan.value.trim();

  if (!nama || !email || !pesan) {
    showMessage('Mohon isi semua field!', 'error');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showMessage('Format email tidak valid!', 'error');
    return;
  }

  // Kirim ke Formspree
  try {
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      showMessage('Pesan berhasil dikirim! Terima kasih 🙌', 'success');
      form.reset();
    } else {
      showMessage('Gagal mengirim pesan. Coba lagi ya.', 'error');
    }
  } catch (err) {
    showMessage('Terjadi kesalahan jaringan.', 'error');
  }
});

function showMessage(msg, type) {
  formMessage.textContent = msg;
  formMessage.className = type;

  setTimeout(() => {
    formMessage.textContent = '';
    formMessage.className = '';
  }, 4000);
}

/* ============================
   5. Animasi Scroll (Intersection Observer)
============================ */
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  section.style.opacity = 0;
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'all 0.8s ease-out';
  observer.observe(section);
});
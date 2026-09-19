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


  /* ============================
   1. Kamus Multi-Bahasa (ID/EN)
============================ */
const translations = {
  id: {
    logo: "MyPortfolio",
    nav_home: "Home",
    nav_about: "About",
    nav_projects: "Projects",
    nav_contact: "Contact",
    hero_greeting: "Halo, Saya",
    hero_role: "Web Developer | UI Designer | Freelancer",
    hero_btn: "Lihat Proyek",
    about_title: "Tentang Saya",
    about_desc: "Saya adalah seorang pengembang web yang berfokus pada pembuatan website modern, responsif, dan ramah pengguna.",
    projects_title: "Proyek Saya",
    proj1_title: "Website Company Profile",
    proj1_desc: "Website profil perusahaan dengan desain modern dan responsif.",
    proj2_title: "Aplikasi Todo List",
    proj2_desc: "Aplikasi sederhana untuk mencatat aktivitas harian.",
    proj3_title: "Landing Page Produk",
    proj3_desc: "Halaman promosi produk dengan animasi interaktif.",
    contact_title: "Kontak",
    form_name: "Nama",
    form_email: "Email",
    form_message: "Pesan",
    form_send: "Kirim",
    footer: "© 2025 MyPortfolio. All rights reserved.",
    msg_empty: "Mohon isi semua field!",
    msg_email: "Format email tidak valid!",
    msg_success: "Pesan berhasil dikirim! Terima kasih 🙌",
    msg_fail: "Gagal mengirim pesan. Coba lagi ya.",
    msg_network: "Terjadi kesalahan jaringan.",
    typing_words: ["Developer", "Designer", "Freelancer", "Creator"]
  },
  en: {
    logo: "MyPortfolio",
    nav_home: "Home",
    nav_about: "About",
    nav_projects: "Projects",
    nav_contact: "Contact",
    hero_greeting: "Hello, I'm",
    hero_role: "Web Developer | UI Designer | Freelancer",
    hero_btn: "View Projects",
    about_title: "About Me",
    about_desc: "I am a web developer focused on building modern, responsive, and user-friendly websites.",
    projects_title: "My Projects",
    proj1_title: "Company Profile Website",
    proj1_desc: "Company profile website with a modern and responsive design.",
    proj2_title: "Todo List App",
    proj2_desc: "A simple app to record daily activities.",
    proj3_title: "Product Landing Page",
    proj3_desc: "Product promotion page with interactive animations.",
    contact_title: "Contact",
    form_name: "Name",
    form_email: "Email",
    form_message: "Message",
    form_send: "Send",
    footer: "© 2025 MyPortfolio. All rights reserved.",
    msg_empty: "Please fill in all fields!",
    msg_email: "Invalid email format!",
    msg_success: "Message sent successfully! Thank you 🙌",
    msg_fail: "Failed to send message. Try again.",
    msg_network: "Network error occurred.",
    typing_words: ["Developer", "Designer", "Freelancer", "Creator"]
  }
};

let currentLang = localStorage.getItem('lang') || 'id';
const langToggle = document.getElementById('lang-toggle');
const langLabel = document.getElementById('lang-label');

function applyLanguage(lang) {
  currentLang = lang;
  const dict = translations[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.placeholder = dict[key];
  });

  document.documentElement.lang = lang;
  langLabel.textContent = lang.toUpperCase();
  localStorage.setItem('lang', lang);

  // Restart typing effect dengan kata baru
  restartTyping();
}

langToggle.addEventListener('click', () => {
  applyLanguage(currentLang === 'id' ? 'en' : 'id');
});

// Inisialisasi bahasa awal
applyLanguage(currentLang);
});
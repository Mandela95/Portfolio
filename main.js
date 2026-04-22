// ===== Page Loader =====
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.classList.add("hidden"), 600);
});

// ===== Dynamic Year =====
document.getElementById("currentYear").textContent = new Date().getFullYear();

// ===== i18n System =====
const translations = { en, ar };
let currentLang = localStorage.getItem("lang") || "en";

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  const t = translations[lang];

  // Set dir and lang on <html>
  document.documentElement.setAttribute("dir", t.dir);
  document.documentElement.setAttribute("lang", t.lang);

  // Update all data-i18n text content
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = getNestedValue(t, key);
    if (value) el.innerHTML = value;
  });

  // Update all data-i18n-placeholder
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    const value = getNestedValue(t, key);
    if (value) el.placeholder = value;
  });

  // Update lang toggle button text
  document.getElementById("langToggle").textContent =
    lang === "en" ? "AR" : "EN";

  // Re-set dynamic year (footer.copy innerHTML replaces the span)
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Restart typing effect with new roles
  roles = t.hero.roles;
  roleIndex = 0;
  charIndex = 0;
  isDeleting = false;
  if (prefersReducedMotion && typedTextEl) {
    typedTextEl.textContent = roles[0];
  }
  
  // Update chat placeholder
  if (typeof updateChatPlaceholder === "function") {
    updateChatPlaceholder();
  }
}

function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

// ===== Theme Toggle =====
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeToggle.innerHTML =
    theme === "dark"
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
}

// ===== Typing Variables (declared early so setLanguage can access them) =====
const typedTextEl = document.getElementById("typedText");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let roles = translations[currentLang].hero.roles;
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

// ===== Language Toggle =====
document.getElementById("langToggle").addEventListener("click", () => {
  const next = currentLang === "en" ? "ar" : "en";
  setLanguage(next);
});

// Initialize language
setLanguage(currentLang);

// ===== Hamburger Menu =====
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", nav.classList.contains("open"));
});

// Close menu when clicking a nav link
nav.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    nav.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove("active");
    nav.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  }
});

// ===== Header Scroll Effect =====
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
});

// ===== Active Nav Scroll Spy =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function activateNavLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + id) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", activateNavLink);

// ===== Scroll to Top =====
const scrollTop = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  scrollTop.classList.toggle("show", window.scrollY >= 400);
});

scrollTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== Scroll Reveal (IntersectionObserver) =====
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
);

reveals.forEach((el) => revealObserver.observe(el));

// ===== Counter Animation =====
const statNumbers = document.querySelectorAll(".stat-number");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-count"));
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

statNumbers.forEach((el) => counterObserver.observe(el));

function animateCounter(el, target) {
  let current = 0;
  const increment = target / 40;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 30);
}

// ===== Typing Effect =====
function typeEffect() {
  if (prefersReducedMotion) return;

  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typedTextEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedTextEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentRole.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

// ===== Project Filter =====
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");

    const filter = btn.getAttribute("data-filter");

    projectCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      if (filter === "all" || category === filter) {
        card.classList.remove("hidden");
        card.style.animation = "fadeIn 0.4s ease forwards";
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// Fade in animation for filtered cards
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleSheet);

// ===== Contact Form with EmailJS =====
// EmailJS Setup — replace these with your actual EmailJS credentials:
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Add an Email Service (Gmail, Outlook, etc.) — copy the Service ID
// 3. Create an Email Template with variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
// 4. Copy the Template ID and your Public Key from Account > API Keys
const EMAILJS_PUBLIC_KEY = "m26vm1miNAVSgjUwu"; // Replace with your EmailJS public key
const EMAILJS_SERVICE_ID = "service_0cs804k"; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = "template_2y4qh6f"; // Replace with your EmailJS template ID

let emailjsReady = false;
try {
  if (typeof emailjs !== "undefined" && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    emailjsReady = true;
  }
} catch (e) {
  console.warn("EmailJS not loaded:", e);
}

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const t = translations[currentLang].contact;

  const name = document.getElementById("formName").value.trim();
  const email = document.getElementById("formEmail").value.trim();
  const subject = document.getElementById("formSubject").value.trim();
  const message = document.getElementById("formMessage").value.trim();

  if (!name || !email || !message) return;

  if (!emailjsReady) {
    // Fallback: open mailto link
    const mailtoLink = `mailto:mohamedelseady247@gmail.com?subject=${encodeURIComponent(subject || "Portfolio Contact")}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    window.open(mailtoLink);
    return;
  }

  // Disable button and show sending state
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${t.sending}`;
  formStatus.textContent = "";
  formStatus.className = "form-status";

  emailjs
    .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      name: name,
      email: email,
      title: subject || "Portfolio Contact",
      message: message,
    })
    .then(() => {
      formStatus.textContent = t.success;
      formStatus.classList.add("success");
      contactForm.reset();
    })
    .catch(() => {
      formStatus.textContent = t.error;
      formStatus.classList.add("error");
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> <span data-i18n="contact.send">${t.send}</span>`;
    });
});

// ===== Timeline Animations =====
// Timeline items already have reveal animations from the intersection observer
// Additional hover effects are handled by CSS
const timelineItems = document.querySelectorAll(".timeline-item");
timelineItems.forEach(item => {
  if (reveals) {
    revealObserver.observe(item);
  }
});

// ===== Project Search =====
const searchInput = document.getElementById("projectSearchInput");
const searchResults = document.getElementById("searchResults");
const projectsGrid = document.querySelector(".projects .projects-grid");
const originalProjectCards = projectsGrid ? Array.from(projectsGrid.querySelectorAll(".project-card")) : [];

if (searchInput && searchResults) {
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (query === "") {
      projectsGrid.style.display = "grid";
      searchResults.style.display = "none";
      searchResults.innerHTML = "";
      return;
    }

    const filteredCards = originalProjectCards.filter((card) => {
      const text = card.textContent.toLowerCase();
      return text.includes(query);
    });

    if (filteredCards.length === 0) {
      const noResultsMessage =
        translations[currentLang]?.projectSearch?.noResults ||
        "No projects found matching your search.";

      projectsGrid.style.display = "none";
      searchResults.style.display = "grid";
      searchResults.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary); padding: 2rem;">${noResultsMessage}</p>`;
    } else {
      projectsGrid.style.display = "none";
      searchResults.style.display = "grid";
      searchResults.innerHTML = "";
      filteredCards.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.classList.add("reveal");
        searchResults.appendChild(clone);
        if (typeof revealObserver !== "undefined" && revealObserver) {
          revealObserver.observe(clone);
        }
      });
    }
  });
}

// ===== Analytics Counter Animation =====
const analyticsCards = document.querySelectorAll(".analytics-card");
const analyticsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        card.classList.add("active");
        analyticsObserver.unobserve(card);
      }
    });
  },
  { threshold: 0.5 }
);

analyticsCards.forEach((card) => analyticsObserver.observe(card));

// ===== AI Chat Assistant =====
document.addEventListener("DOMContentLoaded", () => {
  const chatWidget = document.getElementById("chatWidget");
  const chatButton = document.getElementById("chatButton");
  const chatClose = document.getElementById("chatClose");
  const chatModal = document.getElementById("chatModal");
  const chatInput = document.getElementById("chatInput");
  const chatSend = document.getElementById("chatSend");
  const chatMessages = document.getElementById("chatMessages");
  const suggestionBtns = document.querySelectorAll(".suggestion-btn");

  // Safety check - only initialize if chat elements exist
  if (!chatButton || !chatModal || !chatInput) return;

// Get language from current i18n
const getChatResponse = (message) => {
  const currentLang = document.documentElement.lang || "en";
  const responses =
    currentLang === "ar"
      ? translations.ar.chat.responses
      : translations.en.chat.responses;

  const lowerMessage = message.toLowerCase();
  const includesAny = (keywords) =>
    keywords.some((keyword) => lowerMessage.includes(keyword));

  if (includesAny(["skill", "skills", "tech", "مهارة", "مهارات", "تقنية", "تقنيات"])) {
    return responses.skills;
  } else if (includesAny(["project", "projects", "build", "مشروع", "مشاريع"])) {
    return responses.projects;
  } else if (
    includesAny([
      "experience",
      "work",
      "career",
      "job",
      "خبرة",
      "خبرتك",
      "وظيف",
      "عمل",
      "شغل",
    ])
  ) {
    return responses.experience;
  } else if (includesAny(["contact", "email", "phone", "تواصل", "بريد", "هاتف"])) {
    return responses.contact;
  }
  return responses.default;
};

const addMessage = (text, isBot = true) => {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", isBot ? "bot-message" : "user-message");

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("message-content");
  contentDiv.textContent = text;

  messageDiv.appendChild(contentDiv);
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

const sendMessage = () => {
  const message = chatInput.value.trim();
  if (message === "") return;

  // Add user message
  addMessage(message, false);
  chatInput.value = "";

  // Simulate bot response delay
  setTimeout(() => {
    const response = getChatResponse(message);
    addMessage(response, true);
  }, 500);
};

const setChatOpen = (isOpen) => {
  chatModal.classList.toggle("active", isOpen);
  chatModal.setAttribute("aria-hidden", String(!isOpen));
  chatModal.setAttribute("aria-modal", String(isOpen));
  chatButton.setAttribute("aria-expanded", String(isOpen));

  if (isOpen) {
    chatInput.focus();
  }
};

// Toggle chat modal
chatButton.addEventListener("click", () => {
  setChatOpen(!chatModal.classList.contains("active"));
});

// Close chat modal
chatClose.addEventListener("click", () => {
  setChatOpen(false);
  chatButton.focus();
});

// Close chat modal when clicking outside it
document.addEventListener("click", (e) => {
  if (!chatWidget.contains(e.target) && chatModal.classList.contains("active")) {
    setChatOpen(false);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && chatModal.classList.contains("active")) {
    setChatOpen(false);
    chatButton.focus();
  }
});

// Send message on button click
chatSend.addEventListener("click", sendMessage);

// Send message on Enter key
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// Handle suggestion buttons
suggestionBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const question = btn.getAttribute("data-question");
    const currentLang = document.documentElement.lang || "en";
    const questions = {
      skills: translations[currentLang].chat.suggestedSkills,
      projects: translations[currentLang].chat.suggestedProjects,
      experience: translations[currentLang].chat.suggestedExperience,
      contact: translations[currentLang].chat.suggestedContact,
    };
    chatInput.value = questions[question] || "";
    chatInput.focus();
  });
});

// Update chat placeholder on language change
const updateChatPlaceholder = () => {
  const currentLang = document.documentElement.lang || "en";
  const placeholder =
    currentLang === "ar"
      ? translations.ar.chat.inputPlaceholder
      : translations.en.chat.inputPlaceholder;
  chatInput.placeholder = placeholder;
};
});

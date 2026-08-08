// ===== Page Loader =====
// Hidden as soon as the document is usable. No artificial delay — the loader exists to cover
// the gap before first paint, not to add one.
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loader").classList.add("hidden");
});

// ===== Dynamic Year =====
document.getElementById("currentYear").textContent = new Date().getFullYear();

// ===== i18n System =====
const translations = { en, ar };
let currentLang = localStorage.getItem("lang") || "en";

// Tajawal is only needed for Arabic, so English visitors never pay for it.
function ensureArabicFont() {
  if (document.getElementById("tajawalFont")) return;
  const link = document.createElement("link");
  link.id = "tajawalFont";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap";
  document.head.appendChild(link);
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  const t = translations[lang];

  // Set dir and lang on <html>
  document.documentElement.setAttribute("dir", t.dir);
  document.documentElement.setAttribute("lang", t.lang);

  if (lang === "ar") ensureArabicFont();

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

  // Update lang toggle. The accessible name has to contain the visible label ("AR"/"EN"),
  // otherwise voice-control users can't activate it by saying what they see.
  const langToggle = document.getElementById("langToggle");
  langToggle.textContent = lang === "en" ? "AR" : "EN";
  langToggle.setAttribute(
    "aria-label",
    lang === "en" ? t.a11y.langToggleToAr : t.a11y.langToggleToEn,
  );

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

  // Re-apply the active filter so newly translated cards keep the right visibility
  applyProjectView();
}

function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

// ===== Theme Toggle =====
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme") || "dark";

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  updateThemeIcon(theme);
  updateGitHubStatsTheme(theme);
}

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  localStorage.setItem("theme", next);
  applyTheme(next);
});

function updateThemeIcon(theme) {
  // aria-hidden matters here too: the button's name comes from its aria-label, and a bare
  // icon glyph would otherwise leak into the accessible name.
  themeToggle.innerHTML =
    theme === "dark"
      ? '<i class="fas fa-sun" aria-hidden="true"></i>'
      : '<i class="fas fa-moon" aria-hidden="true"></i>';
}

// The GitHub stats cards are remote-rendered images, so their colours have to be
// requested from the API rather than styled with CSS.
const GH_THEMES = {
  dark: { bg: "0a0a0a", border: "2a2a2a", title: "ffffff", text: "a0a0a0", icon: "8b85ff" },
  light: { bg: "ffffff", border: "e0e0e0", title: "1a1a1a", text: "555555", icon: "4f46e5" },
};

function updateGitHubStatsTheme(theme) {
  const c = GH_THEMES[theme] || GH_THEMES.dark;
  document.querySelectorAll(".gh-stat").forEach((img) => {
    const path = img.getAttribute("data-gh-path");
    if (!path) return;
    img.src =
      `https://github-readme-stats.vercel.app/${path}` +
      `&hide_border=true&bg_color=${c.bg}&border_color=${c.border}` +
      `&title_color=${c.title}&text_color=${c.text}&icon_color=${c.icon}`;
  });
}

applyTheme(savedTheme);

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

// ===== Hamburger Menu =====
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

function setNavOpen(isOpen) {
  hamburger.classList.toggle("active", isOpen);
  nav.classList.toggle("open", isOpen);
  hamburger.setAttribute("aria-expanded", String(isOpen));
}

hamburger.addEventListener("click", () => {
  setNavOpen(!nav.classList.contains("open"));
});

nav.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => setNavOpen(false));
});

document.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
    setNavOpen(false);
  }
});

// ===== Scroll-driven UI =====
// One passive listener, coalesced into a single rAF callback. Both the header state and the
// scroll-to-top button read only window.scrollY, which never forces layout.
const header = document.getElementById("header");
const scrollTop = document.getElementById("scrollTop");
let scrollTicking = false;

function onScrollFrame() {
  const y = window.scrollY;
  header.classList.toggle("scrolled", y > 50);
  scrollTop.classList.toggle("show", y >= 400);
  scrollTicking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(onScrollFrame);
  },
  { passive: true },
);

onScrollFrame();

scrollTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== Active Nav Scroll Spy =====
// Replaces the old per-scroll offsetTop/offsetHeight reads, which forced a synchronous
// layout on every single scroll event.
const navLinks = document.querySelectorAll(".nav-link");
const spySections = document.querySelectorAll("main section[id]");

function setActiveNavLink(id) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + id);
  });
}

const spyObserver = new IntersectionObserver(
  (entries) => {
    // Pick the entry closest to the top of the viewport among those currently visible.
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible.length) setActiveNavLink(visible[0].target.id);
  },
  { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
);

spySections.forEach((section) => spyObserver.observe(section));

// ===== Scroll Reveal (IntersectionObserver) =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.05, rootMargin: "0px 0px -30px 0px" },
);

document.querySelectorAll(".reveal, .timeline-item").forEach((el) => {
  revealObserver.observe(el);
});

// ===== Counter Animation =====
const statNumbers = document.querySelectorAll(".stat-number");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        animateCounter(el, parseInt(el.getAttribute("data-count"), 10));
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 },
);

statNumbers.forEach((el) => counterObserver.observe(el));

function animateCounter(el, target) {
  if (!Number.isFinite(target)) return;
  if (prefersReducedMotion) {
    el.textContent = target;
    return;
  }

  const duration = 1200;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    // Ease-out so the number settles rather than stopping dead.
    el.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
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

// ===== Projects: filter + search =====
// Single source of truth for what's visible. The filter buttons and the search box both write
// into this state and then re-run one pass over the real cards — no cloning, no second grid,
// and the two controls compose instead of fighting each other.
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = Array.from(document.querySelectorAll(".project-card"));
const searchInput = document.getElementById("projectSearchInput");
const searchStatus = document.getElementById("searchResults");

let activeFilter = "all";
let activeQuery = "";

function applyProjectView() {
  let matches = 0;

  projectCards.forEach((card) => {
    const categoryOk =
      activeFilter === "all" || card.getAttribute("data-category") === activeFilter;
    const queryOk = activeQuery === "" || card.textContent.toLowerCase().includes(activeQuery);
    const show = categoryOk && queryOk;

    card.classList.toggle("hidden", !show);
    if (show) matches++;
  });

  if (!searchStatus) return;

  if (matches === 0) {
    const message =
      getNestedValue(translations[currentLang], "projectSearch.noResults") ||
      "No projects found matching your search.";
    searchStatus.textContent = message;
    searchStatus.hidden = false;
  } else {
    searchStatus.textContent = "";
    searchStatus.hidden = true;
  }
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");

    activeFilter = btn.getAttribute("data-filter");
    applyProjectView();
  });
});

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    activeQuery = e.target.value.toLowerCase().trim();
    applyProjectView();
  });
}

applyProjectView();

// ===== Contact Form with EmailJS =====
// The public key is safe to expose (that is what "public" means here), but the endpoint is
// still open, so the honeypot below drops the obvious automated submissions.
const EMAILJS_PUBLIC_KEY = "m26vm1miNAVSgjUwu";
const EMAILJS_SERVICE_ID = "service_0cs804k";
const EMAILJS_TEMPLATE_ID = "template_2y4qh6f";

let emailjsReady = false;
try {
  if (typeof emailjs !== "undefined") {
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

  // Honeypot: real users never see this field, so anything in it is a bot.
  // Report success so the bot doesn't retry with a different strategy.
  if (document.getElementById("formCompany").value !== "") {
    formStatus.textContent = t.success;
    formStatus.className = "form-status success";
    contactForm.reset();
    return;
  }

  const name = document.getElementById("formName").value.trim();
  const email = document.getElementById("formEmail").value.trim();
  const subject = document.getElementById("formSubject").value.trim();
  const message = document.getElementById("formMessage").value.trim();

  if (!name || !email || !message) return;

  if (!emailjsReady) {
    // Fallback: open mailto link
    const mailtoLink = `mailto:mohamedelseady247@gmail.com?subject=${encodeURIComponent(
      subject || "Portfolio Contact",
    )}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    window.open(mailtoLink);
    return;
  }

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

// ===== Quick Answers Dialog =====
// Keyword lookup over the localized canned answers — deliberately not billed as an AI model.
document.addEventListener("DOMContentLoaded", () => {
  const chatWidget = document.getElementById("chatWidget");
  const chatButton = document.getElementById("chatButton");
  const chatClose = document.getElementById("chatClose");
  const chatModal = document.getElementById("chatModal");
  const chatInput = document.getElementById("chatInput");
  const chatSend = document.getElementById("chatSend");
  const chatMessages = document.getElementById("chatMessages");
  const chatBadge = document.querySelector(".chat-badge");
  const suggestionBtns = document.querySelectorAll(".suggestion-btn");

  if (!chatButton || !chatModal || !chatInput) return;

  const chatBadgeDismissedKey = "chatBadgeDismissed";

  if (chatBadge && localStorage.getItem(chatBadgeDismissedKey) === "true") {
    chatBadge.classList.add("hidden");
  }

  const getChatResponse = (message) => {
    const responses = translations[currentLang].chat.responses;
    const lowerMessage = message.toLowerCase();
    const includesAny = (keywords) => keywords.some((keyword) => lowerMessage.includes(keyword));

    if (includesAny(["skill", "skills", "tech", "مهارة", "مهارات", "تقنية", "تقنيات"])) {
      return responses.skills;
    }
    if (includesAny(["project", "projects", "build", "مشروع", "مشاريع"])) {
      return responses.projects;
    }
    if (
      includesAny(["experience", "work", "career", "job", "خبرة", "خبرتك", "وظيف", "عمل", "شغل"])
    ) {
      return responses.experience;
    }
    if (includesAny(["contact", "email", "phone", "تواصل", "بريد", "هاتف"])) {
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

    addMessage(message, false);
    chatInput.value = "";

    setTimeout(() => addMessage(getChatResponse(message), true), 400);
  };

  // --- Focus management: a dialog that traps Tab and restores focus on close ---
  const FOCUSABLE = 'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])';
  let lastFocused = null;

  const trapFocus = (e) => {
    if (e.key !== "Tab") return;

    const items = Array.from(chatModal.querySelectorAll(FOCUSABLE)).filter(
      (el) => !el.disabled && el.offsetParent !== null,
    );
    if (!items.length) return;

    const first = items[0];
    const last = items[items.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const setChatOpen = (isOpen) => {
    chatModal.classList.toggle("active", isOpen);
    chatModal.setAttribute("aria-hidden", String(!isOpen));
    chatModal.setAttribute("aria-modal", String(isOpen));
    chatButton.setAttribute("aria-expanded", String(isOpen));

    if (isOpen) {
      lastFocused = document.activeElement;
      if (chatBadge) {
        chatBadge.classList.add("hidden");
        localStorage.setItem(chatBadgeDismissedKey, "true");
      }
      chatInput.focus();
      document.addEventListener("keydown", trapFocus);
    } else {
      document.removeEventListener("keydown", trapFocus);
      (lastFocused || chatButton).focus();
      lastFocused = null;
    }
  };

  chatButton.addEventListener("click", () => {
    setChatOpen(!chatModal.classList.contains("active"));
  });

  chatClose.addEventListener("click", () => setChatOpen(false));

  document.addEventListener("click", (e) => {
    if (!chatWidget.contains(e.target) && chatModal.classList.contains("active")) {
      setChatOpen(false);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && chatModal.classList.contains("active")) {
      setChatOpen(false);
    }
  });

  chatSend.addEventListener("click", sendMessage);

  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  suggestionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const question = btn.getAttribute("data-question");
      const chat = translations[currentLang].chat;
      const questions = {
        skills: chat.suggestedSkills,
        projects: chat.suggestedProjects,
        experience: chat.suggestedExperience,
        contact: chat.suggestedContact,
      };
      chatInput.value = questions[question] || "";
      chatInput.focus();
    });
  });
});

// ===== Boot =====
// Language last: it re-renders text and re-applies the project view, so everything it
// depends on must already be wired up.
setLanguage(currentLang);
typeEffect();

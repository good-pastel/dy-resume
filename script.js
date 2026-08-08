/* =========================================================
   DOM ELEMENTS
========================================================= */

const siteHeader = document.getElementById("siteHeader");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileNav = document.getElementById("mobileNav");

const experienceToggle = document.getElementById("experienceToggle");

const experienceSection = document.querySelector(".experience-section");

const backToTop = document.getElementById("backToTop");

const currentYear = document.getElementById("currentYear");

const navLinks = document.querySelectorAll(".nav-link");

const sections = document.querySelectorAll("main section[id]");

/* =========================================================
   CURRENT YEAR
========================================================= */

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

function handleHeaderScroll() {
  if (window.scrollY > 20) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleHeaderScroll);

handleHeaderScroll();

/* =========================================================
   MOBILE NAVIGATION
========================================================= */

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("open");

    const isOpen = mobileNav.classList.contains("open");

    mobileMenuBtn.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
  });
}

/* Close mobile navigation after clicking */

const mobileNavLinks = document.querySelectorAll(".mobile-nav a");

mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
  });
});

/* =========================================================
   EXPERIENCE EXPAND / COLLAPSE
========================================================= */

if (experienceToggle && experienceSection) {
  experienceToggle.addEventListener("click", () => {
    const expanded = experienceSection.classList.toggle("expanded");

    const text = experienceToggle.querySelector("span");

    if (expanded) {
      text.textContent = "Show Less Experience";
    } else {
      text.textContent = "View Full Experience";
    }
  });
}

/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function updateActiveNavigation() {
  const scrollPosition = window.scrollY + 140;

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;

    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    const target = link.getAttribute("href");

    if (target === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNavigation);

updateActiveNavigation();

/* =========================================================
   BACK TO TOP
========================================================= */

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/* =========================================================
   SIMPLE REVEAL ANIMATION
========================================================= */

const revealElements = document.querySelectorAll(
  ".experience-item, .skill-group, .project-card",
);

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("revealed");

      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.08,
  },
);

revealElements.forEach((element) => {
  element.classList.add("reveal-ready");

  revealObserver.observe(element);
});

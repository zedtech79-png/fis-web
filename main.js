document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Hero slider ---------- */
  const track = document.getElementById("heroTrack");
  if (!track) return;

  const slides = Array.from(track.querySelectorAll(".hero-slide"));
  const prevBtn = document.getElementById("heroPrev");
  const nextBtn = document.getElementById("heroNext");

  let current = 0;
  let timer = null;
  const AUTOPLAY_MS = 6500;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  function goTo(index) {
    slides[current].classList.remove("is-active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("is-active");
    resetAutoplay();
  }

  function next() {
    goTo(current + 1);
  }
  function prev() {
    goTo(current - 1);
  }

  function startAutoplay() {
    if (reduceMotion || slides.length < 2) return;
    timer = setInterval(next, AUTOPLAY_MS);
  }
  function resetAutoplay() {
    clearInterval(timer);
    startAutoplay();
  }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  const heroSection = document.getElementById("hero");
  heroSection.addEventListener("mouseenter", () => clearInterval(timer));
  heroSection.addEventListener("mouseleave", startAutoplay);

  startAutoplay();
});

/* ============================================================
   LEADERSHIP CAROUSEL
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const leadership = document.getElementById("leadership");

  if (!leadership) return;

  const mediaItems = Array.from(
    leadership.querySelectorAll(".leadership-media-item"),
  );

  const profiles = Array.from(
    leadership.querySelectorAll(".leadership-profile"),
  );

  const prevBtn = document.getElementById("leadershipPrev");
  const nextBtn = document.getElementById("leadershipNext");
  const currentDisplay = document.getElementById("leadershipCurrent");

  if (
    !mediaItems.length ||
    !profiles.length ||
    !prevBtn ||
    !nextBtn ||
    !currentDisplay
  ) {
    return;
  }

  let current = 0;

  function goTo(index) {
    mediaItems[current].classList.remove("is-active");
    profiles[current].classList.remove("is-active");

    current = (index + mediaItems.length) % mediaItems.length;

    mediaItems[current].classList.add("is-active");
    profiles[current].classList.add("is-active");

    currentDisplay.textContent = String(current + 1).padStart(2, "0");
  }

  function next() {
    goTo(current + 1);
  }

  function prev() {
    goTo(current - 1);
  }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  /* Keyboard navigation */
  leadership.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      next();
    }

    if (event.key === "ArrowLeft") {
      prev();
    }
  });
});

/* ============================================================
   GALLERY CAROUSEL + LIGHTBOX
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("galleryTrack");
  if (!track) return;

  const items = Array.from(track.querySelectorAll(".gallery-item"));
  const prevBtn = document.getElementById("galleryPrev");
  const nextBtn = document.getElementById("galleryNext");

  function getPerView() {
    if (window.innerWidth <= 560) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  let index = 0;

  function update() {
    const perView = getPerView();
    const maxIndex = Math.max(0, items.length - perView);
    index = Math.min(index, maxIndex);
    const itemWidth = items[0].getBoundingClientRect().width;
    const gap = 16;
    track.style.transform = `translateX(-${index * (itemWidth + gap)}px)`;
  }

  nextBtn.addEventListener("click", () => {
    const perView = getPerView();
    const maxIndex = Math.max(0, items.length - perView);
    index = Math.min(index + 1, maxIndex);
    update();
  });

  prevBtn.addEventListener("click", () => {
    index = Math.max(index - 1, 0);
    update();
  });

  window.addEventListener("resize", update);
  update();

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      lightboxImg.src = item.dataset.full;
      lightboxImg.alt = item.querySelector("img").alt;
      lightbox.classList.add("is-open");
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightboxImg.src = "";
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
});

/* ============================================================
   CONTACT MODAL
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("contactModal");
  const openBtn = document.getElementById("contactOpenBtn");
  const closeBtn = document.getElementById("contactModalClose");
  const backdrop = document.getElementById("contactModalBackdrop");
  const form = document.getElementById("contactForm");

  if (!modal || !openBtn) return;

  function openModal() {
    modal.classList.add("is-open");
  }
  function closeModal() {
    modal.classList.remove("is-open");
  }

  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const message = form.message.value;

    const subject = encodeURIComponent(`Website inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
    );

    window.location.href = `mailto:info@fis.com.ph?subject=${subject}&body=${body}`;
  });
});

/* ============================================================
   SCROLL REVEAL OBSERVER
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (reduceMotion) {
    reveals.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
  );

  reveals.forEach((el) => observer.observe(el));
});

/* ============================================================
   SCROLLSPY — highlight nav link for section in view
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".primary-nav a[data-nav]");
  if (!navLinks.length) return;

  const sectionIds = Array.from(navLinks).map((link) => link.dataset.nav);
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length) return;

  function setActive(id) {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.nav === id);
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-45% 0px -45% 0px", // triggers when section crosses the vertical middle of the viewport
      threshold: 0,
    },
  );

  sections.forEach((section) => observer.observe(section));

  // Default to Home when at the very top of the page
  window.addEventListener("scroll", () => {
    if (window.scrollY < 200) setActive("hero");
  });
});

/* ============================================================
   HERO INFO CARD — slides in/out with hero visibility
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const heroSection = document.getElementById("hero");
  const infoCard = document.querySelector(".hero-info-card");
  if (!heroSection || !infoCard) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (reduceMotion) {
    infoCard.classList.add("is-visible");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        infoCard.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    { threshold: 0.4 },
  );

  observer.observe(heroSection);
});

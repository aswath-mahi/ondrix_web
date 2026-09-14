// Mobile nav toggle + header scroll state + scroll reveal + contact form
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    links.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Header gains a background/shadow once the page scrolls
  const header = document.querySelector("header.site");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Stagger the hero panel rows on load
  document.querySelectorAll(".panel-row").forEach((el, i) => {
    el.style.animationDelay = `${0.15 + i * 0.2}s`;
  });

  // Scroll-triggered reveal animations
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll(".reveal, .reveal-group");
  if (revealEls.length) {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("in-view"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach((el) => io.observe(el));
    }
  }

  // Stagger children inside reveal-group elements
  document.querySelectorAll(".reveal-group").forEach((group) => {
    Array.from(group.children).forEach((child, i) => {
      child.classList.add("reveal-child");
      child.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  // Contact form (static demo — no backend wired up)
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const status = document.getElementById("form-status");
      status.textContent = "Thanks — we've got your message and will reply within one business day.";
      status.classList.add("ok");
      requestAnimationFrame(() => status.classList.add("show"));
      form.reset();
    });
  }
});

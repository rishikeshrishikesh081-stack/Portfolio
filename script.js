const nav = document.querySelector("[data-nav]");
const toggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
const sections = [...document.querySelectorAll("main section[id]")];

const onScroll = () => {
  nav.classList.toggle("is-scrolled", window.scrollY > 8);
};

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const setMenu = (open) => {
  toggle.setAttribute("aria-expanded", String(open));
  mobileMenu.hidden = !open;
  document.body.style.overflow = open ? "hidden" : "";
};

toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") !== "true";
  setMenu(open);
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
);

sections.forEach((section) => observer.observe(section));

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealItems = document.querySelectorAll(
    ".hero__copy, .hero__visual, .about__layout, .skill-groups, .feature, .timeline, .education__grid, .contact__panel"
  );
  revealItems.forEach((item) => item.classList.add("reveal"));
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.style.animationPlayState = "running";
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );
  revealItems.forEach((item) => {
    item.style.animationPlayState = "paused";
    revealObserver.observe(item);
  });
}
